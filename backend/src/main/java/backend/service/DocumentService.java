package backend.service;

import backend.entity.Documents;
import backend.entity.Student;
import backend.repository.DocumentRepository;
import backend.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {
    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Documents addDocument(Long studentId, MultipartFile file, String documentType) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isEmpty()) {
            throw new RuntimeException("Student not found with ID: " + studentId);
        }

        Student student = studentOptional.get();

        Documents document = new Documents();
        document.setDocumentType(documentType);
        document.setDocumentName(file.getOriginalFilename());
        document.setIssueDate(LocalDateTime.now());
        document.setStudent(student);
        String hash = generateSHA256Hash(file);
        document.setHashCode(hash);
        long fileSize = file.getSize();
        document.setFileSize(convertToReadableSize(fileSize));

        return documentRepository.save(document);
    }

    public List<Documents> getDocumentsByStudentId(Long studentId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isEmpty()) {
            throw new RuntimeException("Student not found with ID: " + studentId);
        }

        return studentOptional.get().getDocuments().stream().toList();
    }

    public void deleteDocument(Long documentId) {
        Optional<Documents> documentOptional = documentRepository.findById(documentId);
        if (documentOptional.isEmpty()) {
            throw new RuntimeException("Document not found with ID: " + documentId);
        }
        Documents document = documentOptional.get();
        Student student = document.getStudent();
        student.getDocuments().remove(document);
        studentRepository.save(student);
    }

    public Documents updateDocument(Long documentId, MultipartFile file, String documentType) {
        Optional<Documents> documentOptional = documentRepository.findById(documentId);
        if (documentOptional.isEmpty()) {
            throw new RuntimeException("Document not found with ID: " + documentId);
        }

        Documents document = documentOptional.get();

        if (file != null && !file.isEmpty()) {
            document.setDocumentName(file.getOriginalFilename());
            document.setHashCode(generateSHA256Hash(file));
            long fileSize = file.getSize();
            document.setFileSize(convertToReadableSize(fileSize));
        }

        if (documentType != null && !documentType.isEmpty()) {
            document.setDocumentType(documentType);
        }

        return documentRepository.save(document);
    }


    private static String convertToReadableSize(long sizeInBytes) {
        if (sizeInBytes <= 0) return "0 B";
        final String[] units = new String[]{"B", "KB", "MB", "GB", "TB"};
        int digitGroups = (int) (Math.log10(sizeInBytes) / Math.log10(1024));
        return new DecimalFormat("#,##0.#").format(sizeInBytes / Math.pow(1024, digitGroups)) + " " + units[digitGroups];
    }

    private String generateSHA256Hash(MultipartFile file) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] fileBytes = file.getBytes();
            byte[] hashBytes = digest.digest(fileBytes);
            return Base64.getEncoder().encodeToString(hashBytes);
        } catch (NoSuchAlgorithmException | IOException e) {
            throw new RuntimeException("Error generating SHA-256 hash for document", e);
        }
    }
}
