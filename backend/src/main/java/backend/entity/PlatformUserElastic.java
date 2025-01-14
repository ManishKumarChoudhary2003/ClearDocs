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
@Document(indexName = "platformuserelastic")
public class PlatformUserElastic {

    @Id
    private String id;

    private String username;

    private String email;

    private String mobileNumber;

    private String password;


}
