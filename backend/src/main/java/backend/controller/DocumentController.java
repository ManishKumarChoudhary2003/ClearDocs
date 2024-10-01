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

}
