package backend.repository;

import backend.entity.Documents;
import backend.entity.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@Transactional
public interface DocumentRepository extends JpaRepository<Documents, Long> {


    List<Documents> findByStudent(Student student);
}