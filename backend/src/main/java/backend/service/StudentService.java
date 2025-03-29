package backend.service;

import backend.entity.PlatformUser;
import backend.entity.Student;
import backend.entity.StudentElastic;
import backend.mapper.StudentMapper;
import backend.messaging.KafkaProducer;
import backend.repository.elastic.StudentElasticsearchRepository;
import backend.repository.jpa.DocumentRepository;
import backend.repository.jpa.PlatformUserRepository;
import backend.repository.jpa.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PlatformUserRepository platformUserRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private KafkaProducer kafkaProducer;

    @Autowired
    private StudentElasticsearchRepository studentElasticsearchRepository;


    @Transactional
    public Student addStudent(Student student, Long userId) {
        Optional<PlatformUser> platformUser = platformUserRepository.findById(userId);

        if (platformUser.isPresent()) {
            if (studentRepository.existsByEnrollmentNumber(student.getEnrollmentNumber())) {
                throw new IllegalArgumentException("Student with this enrollment number already exists.");
            }

            student.setPlatformUser(platformUser.get());
            StudentElastic studentElastic = new StudentElastic();
            StudentElastic elasticStudent = StudentMapper.mapToElastic(student, studentElastic);
            StudentElastic saved = studentElasticsearchRepository.save(elasticStudent);
            student.setStudentElasticId(saved.getStudentId());

            Student savedStudent = studentRepository.save(student);
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

            Optional<StudentElastic> studentElasticOptional = studentElasticsearchRepository.findById(student.getStudentElasticId());
            StudentElastic savedStudentElastic = null;

            if (studentElasticOptional.isPresent()) {
                StudentElastic toBeUpdatedElastic = studentElasticOptional.get();

                toBeUpdatedElastic.setName(studentDetails.getName());
                toBeUpdatedElastic.setEmail(studentDetails.getEmail());
                toBeUpdatedElastic.setEnrollmentNumber(studentDetails.getEnrollmentNumber());

                if (studentDetails.getDateOfBirth() != null) {
                    toBeUpdatedElastic.setDateOfBirth(studentDetails.getDateOfBirth()
                            .atZone(ZoneId.systemDefault())
                            .toInstant()
                            .toEpochMilli());
                }

                savedStudentElastic = studentElasticsearchRepository.save(toBeUpdatedElastic);
            }

            student.setName(studentDetails.getName());
            student.setEmail(studentDetails.getEmail());
            student.setEnrollmentNumber(studentDetails.getEnrollmentNumber());

            if (studentDetails.getDateOfBirth() != null) {
                student.setDateOfBirth(studentDetails.getDateOfBirth());
            }

            if (savedStudentElastic != null) {
                student.setStudentElasticId(savedStudentElastic.getStudentId());
            }

            if (kafkaProducer != null) {
                kafkaProducer.producerForStudentUpdation(student.getEmail());
            }

            return studentRepository.save(student);
        }
        return null;
    }


    @Transactional
    public boolean deleteStudent(Long studentId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);

        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();

            documentRepository.deleteByStudentId(studentId);

            studentElasticsearchRepository.deleteById(student.getStudentElasticId());

            studentRepository.deleteStudent(studentId);

            if (kafkaProducer != null){
                kafkaProducer.producerForStudentDeletion(student.getEmail());
            }
            return true;
        }
        return false;
    }



    public List<Student> getAllStudentsByUser(Long userId) {
        Optional<PlatformUser> platformUser = platformUserRepository.findById(userId);
        if (platformUser.isPresent()) {
            return studentRepository.findAllByPlatformUser(platformUser.get());
        }
        return List.of();
    }
}
