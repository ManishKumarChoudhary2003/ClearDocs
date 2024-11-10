package backend.service;

import backend.entity.PlatformUser;
import backend.entity.Student;
import backend.messaging.KafkaProducer;
import backend.repository.jpa.PlatformUserRepository;
//import backend.repository.StudentElasticsearchRepository;
import backend.repository.jpa.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PlatformUserRepository platformUserRepository;

    @Autowired
    private KafkaProducer kafkaProducer;

//    @Autowired
//    private StudentSolrRepository studentSolrRepository;

//    public List<Student> searchStudents(String name, String enrollmentNumber, String email) {
//        return studentSolrRepository.findByNameOrEnrollmentNumberOrEmail(name, enrollmentNumber, email);
//    }

    @Transactional
    public Student addStudent(Student student, Long userId) {
        Optional<PlatformUser> platformUser = platformUserRepository.findById(userId);

        if (platformUser.isPresent()) {
            if (studentRepository.existsByEnrollmentNumber(student.getEnrollmentNumber())) {
                throw new IllegalArgumentException("Student with this enrollment number already exists.");
            }

            student.setPlatformUser(platformUser.get());
            Student savedStudent = studentRepository.save(student);
//            ClearStudent clearStudent = new ClearStudent();
//            clearStudent.setName(student.getName());
//            clearStudent.setEmail(student.getEmail());
//            clearStudent.setDateOfBirth(student.getDateOfBirth());
//            clearStudent.setEnrollmentNumber(student.getEnrollmentNumber());
//            clearStudent.setPlatformUser(platformUser.get());
//            studentSolrRepository.save(clearStudent, Duration.ofSeconds(2));
            if (kafkaProducer != null){
                kafkaProducer.producerForStudentRegistration(student.getEmail(), student.getEnrollmentNumber());
            }
            return savedStudent;
        }
        return null;
    }

    public Optional<Student> findStudentById(Long studentId) {
        return studentRepository.findById(studentId);
    }

    public Student updateStudent(Long studentId, Student studentDetails) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            student.setName(studentDetails.getName());
            student.setEmail(studentDetails.getEmail());
            student.setDateOfBirth(studentDetails.getDateOfBirth());
            student.setEnrollmentNumber(studentDetails.getEnrollmentNumber());

            if (kafkaProducer != null){
                kafkaProducer.producerForStudentUpdation(student.getEmail());
            }
            return studentRepository.save(student);
        }
        return null;
    }

    public boolean deleteStudent(Long studentId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            if (kafkaProducer != null){
                kafkaProducer.producerForStudentDeletion(studentOptional.get().getEmail());
            }
            studentRepository.deleteById(studentId);
            return true;
        }

        return false;
    }


//    public boolean deleteStudent(String enrollmentNumber) {
//        if (studentRepository.existsByEnrollmentNumber(enrollmentNumber)) {
//            studentRepository.deleteByEnrollmentNumber(enrollmentNumber);
//            return true;
//        }
//        return false;
//    }

    public List<Student> getAllStudentsByUser(Long userId) {
        Optional<PlatformUser> platformUser = platformUserRepository.findById(userId);
        if (platformUser.isPresent()) {
            return studentRepository.findAllByPlatformUser(platformUser.get());
        }
        return List.of();
    }
}
