package backend.repository.jpa;

import backend.entity.PlatformUser;
import backend.entity.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
@Transactional
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEnrollmentNumber(String enrollmentNumber);
    List<Student> findAllByPlatformUser(PlatformUser platformUser);
    boolean existsByEnrollmentNumber(String enrollmentNumber);

    @Transactional
    @Modifying
    @Query("DELETE FROM Student s WHERE s.enrollmentNumber = ?1")
    void deleteByEnrollmentNumber(String enrollmentNumber);

    @Query("SELECT COUNT(DISTINCT s) FROM Student s " +
            "JOIN s.documents d " +
            "GROUP BY s.studentId " +
            "HAVING COUNT(CASE WHEN d.isVerified = false THEN 1 END) = 0")
    Long countStudentsWithAllVerifiedDocs();

    // Count students having at least one PENDING document (verified = false)
    @Query("SELECT COUNT(DISTINCT s) FROM Student s " +
            "JOIN s.documents d " +
            "WHERE d.isVerified = false")
    Long countStudentsWithPendingDocs();

    Optional<Student> findByEmailAndPlatformUser(String email, PlatformUser platformUser);

    @Transactional
    @Modifying
    @Query("DELETE FROM Student s WHERE s.studentId = ?1")
    void deleteStudent(Long studentId);
}