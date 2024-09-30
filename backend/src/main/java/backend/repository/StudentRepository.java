package backend.repository;

import backend.entity.PlatformUser;
import backend.entity.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
@Transactional
public interface StudentRepository extends JpaRepository<Student, Long> {


}