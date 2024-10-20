package backend.repository;

import backend.entity.Student;
import org.springframework.data.solr.repository.SolrCrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudentSolrRepository extends SolrCrudRepository<Student, Long> {

    List<Student> findByNameOrEnrollmentNumberOrEmail(String name, String enrollmentNumber, String email);

    void save(Student savedStudent);
}
