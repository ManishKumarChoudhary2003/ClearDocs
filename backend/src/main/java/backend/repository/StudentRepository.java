package backend.repository;

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
}