package backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(indexName = "studentelastic")
public class StudentElastic {

    @Id
    private String studentId;

    private String name;

    private String email;

    private Long dateOfBirth;


    private String enrollmentNumber;

}
