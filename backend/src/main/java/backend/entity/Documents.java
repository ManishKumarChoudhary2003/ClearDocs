package backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@Entity
@NoArgsConstructor
@Data
public class Documents {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long documentId;

    private String documentType;

    private String documentName;

    private LocalDateTime issueDate;


    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}
