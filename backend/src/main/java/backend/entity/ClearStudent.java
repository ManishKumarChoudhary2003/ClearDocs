package backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.solr.client.solrj.beans.Field;
import org.springframework.data.solr.core.mapping.SolrDocument;

import java.time.LocalDateTime;
import java.util.Set;

@SolrDocument(collection = "ClearStudent")
public class ClearStudent {

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

    @Field
    @JsonIgnore
    private Set<Documents> documents;

    @Field
    @JsonIgnore
    private PlatformUser platformUser;


    public ClearStudent() {
    }

    public ClearStudent(Long studentId, String name, String email, LocalDateTime dateOfBirth, String enrollmentNumber, Set<Documents> documents, PlatformUser platformUser) {
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.enrollmentNumber = enrollmentNumber;
        this.documents = documents;
        this.platformUser = platformUser;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDateTime dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEnrollmentNumber() {
        return enrollmentNumber;
    }

    public void setEnrollmentNumber(String enrollmentNumber) {
        this.enrollmentNumber = enrollmentNumber;
    }

    public Set<Documents> getDocuments() {
        return documents;
    }

    public void setDocuments(Set<Documents> documents) {
        this.documents = documents;
    }

    public PlatformUser getPlatformUser() {
        return platformUser;
    }

    public void setPlatformUser(PlatformUser platformUser) {
        this.platformUser = platformUser;
    }
}
