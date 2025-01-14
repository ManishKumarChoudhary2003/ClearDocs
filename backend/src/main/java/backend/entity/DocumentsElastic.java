package backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Document(indexName = "documentselastic")
public class DocumentsElastic {


    @Id
    private String documentId;

    private String documentType;

    private String documentName;

    private String fileSize;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime issueDate;

    private String hashCode;

    @Lob
    private byte[] content;
}
