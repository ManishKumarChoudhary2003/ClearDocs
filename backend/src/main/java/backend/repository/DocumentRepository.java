package backend.repository;

import backend.entity.Documents;
import backend.entity.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
@Transactional
public interface DocumentRepository extends JpaRepository<Documents, Long> {


}