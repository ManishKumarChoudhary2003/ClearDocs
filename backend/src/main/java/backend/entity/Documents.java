package backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@Entity
@NoArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Documents {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @EqualsAndHashCode.Include
    private Long documentId;

    private String documentType;

    private String documentName;

    private String fileSize;

    private LocalDateTime issueDate;

    private String hashCode;

    @Lob
    private byte[] content;


    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;
}
