//package backend.repository;
//
//
//import backend.entity.PlatformUser;
//import backend.entity.Student;
//import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface StudentElasticsearchRepository extends ElasticsearchRepository<Student, Long> {
//
//    Optional<Student> findByEnrollmentNumber(String enrollmentNumber);
//    boolean existsByEnrollmentNumber(String enrollmentNumber);
//    List<Student> findAllByPlatformUser(PlatformUser platformUser);
//}
