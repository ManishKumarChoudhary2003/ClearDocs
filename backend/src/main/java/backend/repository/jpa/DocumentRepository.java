package backend.repository.jpa;

import backend.entity.Documents;
import backend.entity.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@Transactional
public interface DocumentRepository extends JpaRepository<Documents, Long> {


    List<Documents> findByStudent(Student student);

    @Modifying
    @Query("DELETE FROM Documents d WHERE d.student.studentId = :studentId")
    void deleteByStudentId(Long studentId);

    @Query("SELECT COUNT(d) FROM Documents d WHERE d.isVerified = :isVerified")
    Long countByIsVerified(Boolean isVerified);

}