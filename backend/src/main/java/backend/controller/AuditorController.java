package backend.controller;

import backend.entity.AuditLog;
import backend.service.AuditService;
import jakarta.servlet.ServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/audit")
public class AuditorController {

    @Autowired
    private AuditService auditorService;

    @GetMapping("/get-all")
    public ResponseEntity<List<AuditLog>> getAllAuditors() {
        return ResponseEntity.ok(auditorService.getAllAuditLogs());
    }



}
