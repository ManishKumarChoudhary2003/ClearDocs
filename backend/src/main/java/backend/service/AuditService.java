package backend.service;

import backend.entity.AuditLog;
import backend.entity.PlatformUser;
import backend.repository.jpa.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public void generateLogAudit(PlatformUser platformUser,String action, Long documentId) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setDocumentId(documentId);
        log.setEmail(platformUser.getEmail());
        log.setMobileNumber(platformUser.getMobileNumber());
        log.setName(platformUser.getUsername());
        log.setTimestamp(LocalDateTime.now());
        log.setSystemOS(getSystemOS());
        log.setSystemUserName(getSystemUserName());
        log.setSystemUserIp(getSystemUserIp());

        auditLogRepository.save(log);
    }

    private String getSystemUserIp() {
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return "UNKNOWN";
    }

    private String getSystemUserName() {
        return System.getProperty("user.name");
    }

    private String getSystemOS() {
        return System.getProperty("os.name");
    }

    private String getSystemInfo() {
        String os = System.getProperty("os.name");
        String user = System.getProperty("user.name");
        String ip = "UNKNOWN";

        try {
            ip = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }

        return "OS: " + os + ", User: " + user + ", IP: " + ip;
    }


    public List<AuditLog> getAllAuditors() {
        return auditLogRepository.findAll();
    }
}
