package backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@Entity
@NoArgsConstructor
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long studentId;

    private String name;

    private String email;

    private LocalDateTime dateOfBirth;

    private String enrollmentNumber;

    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER, orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Documents> documents;

    @ManyToOne
    @JoinColumn(name = "id")
    private PlatformUser platformUser;
}
