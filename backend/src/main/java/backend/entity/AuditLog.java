package backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action;

    private String name;

    private String email;

    private String mobileNumber;

    private Long documentId;

    private String verifiedBy;

    private String systemOS;

    private String systemUserName;

    private String systemUserIp;

    private LocalDateTime timestamp;
}
