package backend.service;

import backend.entity.Documents;
import backend.entity.PlatformUser;
import backend.entity.Student;
import backend.messaging.KafkaProducer;
import backend.repository.jpa.DocumentRepository;
import backend.repository.jpa.PlatformUserRepository;
import backend.repository.jpa.StudentRepository;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class DocumentService {
    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PlatformUserRepository platformUserRepository;

    @Autowired
    private KafkaProducer kafkaProducer;

    @Autowired
    private AuditService auditService;

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
//        document.setFileSize(convertToReadableSize(fileSize));
        document.setFileSize(file.getSize());

        try {
            document.setContent(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file content", e);
        }

        if (kafkaProducer != null){
            kafkaProducer.producerForDocumentUpload(student.getEmail(), documentType);
        }

        return documentRepository.save(document);
    }

    public List<Documents> getDocumentsByStudentId(Long studentId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isEmpty()) {
            throw new RuntimeException("Student not found with ID: " + studentId);
        }

        return studentOptional.get().getDocuments().stream().toList();
    }

    public List<Documents> getDocumentsByEmailAndUserId(String email, Long userId) {
        PlatformUser platformUser = platformUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        Student student = studentRepository.findByEmailAndPlatformUser(email, platformUser)
                .orElseThrow(() -> new IllegalArgumentException("No student found with the given email and user ID"));

        return documentRepository.findByStudent(student);
    }

    public Documents getDocumentById(Long documentId) {
        return documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found with ID: " + documentId));
    }

    public void deleteDocument(Long documentId) {
        Optional<Documents> documentOptional = documentRepository.findById(documentId);
        if (documentOptional.isEmpty()) {
            throw new RuntimeException("Document not found with ID: " + documentId);
        }
        Documents document = documentOptional.get();
        Student student = document.getStudent();
        student.getDocuments().remove(document);
        if (kafkaProducer != null){
            kafkaProducer.producerForDocumentDeletion(student.getEmail(), document.getDocumentType());
        }
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
            document.setFileSize(file.getSize());
//            document.setFileSize(convertToReadableSize(fileSize));
            try {
                document.setContent(file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Failed to read file content", e);
            }
        }

        if (documentType != null && !documentType.isEmpty()) {
            document.setDocumentType(documentType);
        }

        return documentRepository.save(document);
    }

//    public String verifyDocument(String enrollmentNumber, MultipartFile file) {
//        Optional<Student> studentOptional = studentRepository.findByEnrollmentNumber(enrollmentNumber);
//        if (studentOptional.isEmpty()) {
//            throw new RuntimeException("Student not found with Enrollment Number: " + enrollmentNumber);
//        }
//
//        Student student = studentOptional.get();
//        String fileHash = generateSHA256Hash(file);
//
//        boolean documentExists = student.getDocuments().stream()
//                .anyMatch(doc -> doc.getHashCode().equals(fileHash));
//
//        if (documentExists) {
//            if (kafkaProducer != null){
//                kafkaProducer.producerForDocumentVerification(student.getEmail(), file.getOriginalFilename());
//            }
//            return "Document is verified.";
//        } else {
//            return "Document is not verified.";
//        }
//    }

    public String verifyDocument(String enrollmentNumber, MultipartFile file, Long userId) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be null or empty.");
        }

        Optional<Student> studentOptional = studentRepository.findByEnrollmentNumber(enrollmentNumber);
        if (studentOptional.isEmpty()) {
            throw new RuntimeException("Student not found with Enrollment Number: " + enrollmentNumber);
        }

        Student student = studentOptional.get();
        String fileHash = generateSHA256Hash(file);

        if (fileHash == null || fileHash.isEmpty()) {
            throw new RuntimeException("Failed to generate file hash.");
        }

        Optional<Documents> matchedDocument = student.getDocuments().stream()
                .filter(doc -> fileHash.equals(doc.getHashCode()))
                .findFirst();

        PlatformUser platformUser = platformUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));

        if (matchedDocument.isPresent()) {
            Documents document = matchedDocument.get();
            document.setVerified(true);
            documentRepository.save(document);

            if (kafkaProducer != null) {
                kafkaProducer.producerForDocumentVerification(student.getEmail(), file.getOriginalFilename());
            }

            auditService.generateLogAudit(platformUser, "DOCUMENT_VERIFICATION_SUCCESS", document.getDocumentId());
            return "Document is verified.";
        } else {
            auditService.generateLogAudit(platformUser, "DOCUMENT_VERIFICATION_FAILED", null);
            return "Document is not verified.";
        }
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
