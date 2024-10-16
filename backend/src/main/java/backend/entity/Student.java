package backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@Entity
@NoArgsConstructor
@Data
@EqualsAndHashCode(exclude = {"platformUser", "documents"})
//@Document(indexName = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long studentId;

    private String name;

    private String email;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateOfBirth;

    private String enrollmentNumber;

    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER, orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Documents> documents;

    @ManyToOne
    @JoinColumn(name = "platform_user_id")
    @JsonIgnore
    private PlatformUser platformUser;
}
