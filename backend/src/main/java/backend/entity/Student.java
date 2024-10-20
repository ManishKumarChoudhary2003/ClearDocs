package backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.apache.solr.client.solrj.beans.Field;
import org.springframework.data.solr.core.mapping.SolrDocument;

import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@Entity
@NoArgsConstructor
@Data
@EqualsAndHashCode(exclude = {"platformUser", "documents"})
@SolrDocument(collection = "ClearStudent")
//@Document(indexName = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Field
    private Long studentId;

    @Field
    private String name;

    @Field
    private String email;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Field
    private LocalDateTime dateOfBirth;

    @Field
    private String enrollmentNumber;

    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER, orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Documents> documents;

    @ManyToOne
    @JoinColumn(name = "platform_user_id")
    @JsonIgnore
    private PlatformUser platformUser;
}
