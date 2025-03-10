package backend.controller;

import backend.entity.Documents;
import backend.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/doc")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<Documents> uploadDocument(
            @RequestParam Long studentId,
            @RequestParam MultipartFile file,
            @RequestParam String documentType
    ) {
        Documents document = documentService.addDocument(studentId, file, documentType);
        return ResponseEntity.status(HttpStatus.CREATED).body(document);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Documents>> getDocumentsByStudentId(@PathVariable Long studentId) {
        List<Documents> documents = documentService.getDocumentsByStudentId(studentId);
        return ResponseEntity.ok(documents);
    }


    @GetMapping("/student-documents")
    public ResponseEntity<List<Documents>> getDocumentsByEmailAndUserId(
            @RequestParam String email,
            @RequestParam Long userId) {
        List<Documents> documents = documentService.getDocumentsByEmailAndUserId(email, userId);
        return ResponseEntity.ok(documents);
    }


    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long documentId) {
        documentService.deleteDocument(documentId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<Documents> updateDocument(
            @PathVariable Long documentId,
            @RequestParam(required = false) MultipartFile file,
            @RequestParam(required = false) String documentType) {
        Documents updatedDocument = documentService.updateDocument(documentId, file, documentType);
        return ResponseEntity.ok(updatedDocument);
    }

    @PostMapping("/verify-document")
    public ResponseEntity<String> verifyDocument(
            @RequestParam("enrollmentNumber") String enrollmentNumber,
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId) {

        try {
            String verificationResult = documentService.verifyDocument(enrollmentNumber, file, userId);
            return ResponseEntity.ok(verificationResult);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadDocument(@RequestParam Long documentId) {
        Documents document = documentService.getDocumentById(documentId);

        if (document == null || document.getContent() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=\"" + document.getDocumentName() + "\"")
                .body(document.getContent());
    }

}
