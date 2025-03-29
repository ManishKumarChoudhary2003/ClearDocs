package backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = {"platformUser", "documents"})
@EqualsAndHashCode(exclude = {"platformUser", "documents"})
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long studentId;

    private String name;

    private String email;

    private String studentElasticId;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateOfBirth;

    private String enrollmentNumber;

    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Documents> documents;

    @ManyToOne
    @JoinColumn(name = "platform_user_id")
    @JsonIgnore
    private PlatformUser platformUser;

    public Long getDateOfBirthAsLong() {
        return dateOfBirth == null ? null : dateOfBirth.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }

    public void setDateOfBirthFromLong(Long timestamp) {
        this.dateOfBirth = timestamp == null ? null : LocalDateTime.ofInstant(Instant.ofEpochMilli(timestamp), ZoneId.systemDefault());
    }
}
