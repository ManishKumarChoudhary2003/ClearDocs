package backend.service;

import backend.entity.PlatformUser;
import backend.entity.Student;
import backend.repository.PlatformUserRepository;
//import backend.repository.StudentElasticsearchRepository;
import backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PlatformUserRepository platformUserRepository;

    @Autowired
    private EmailService emailService;

//    @Autowired
//    private StudentElasticsearchRepository studentElasticsearchRepository;


//    public Student addStudent(Student student, Long userId) {
//        Optional<PlatformUser> platformUser = platformUserRepository.findById(userId);
//
//        if (platformUser.isPresent()) {
//            // Check if the student already exists by enrollment number
//            if (studentElasticsearchRepository.existsByEnrollmentNumber(student.getEnrollmentNumber())) {
//                throw new IllegalArgumentException("Student with this enrollment number already exists.");
//            }
//
//            student.setPlatformUser(platformUser.get());
//            emailService.sendRegistrationSuccessEmailToStudent(student.getEmail(), student.getEnrollmentNumber());
//            return studentElasticsearchRepository.save(student);
//        }
//        return null;
//    }
//
//    public Optional<Student> findStudentById(Long studentId) {
//        return studentElasticsearchRepository.findById(studentId);
//    }
//
//    public Student updateStudent(Long studentId, Student studentDetails) {
//        Optional<Student> studentOptional = studentElasticsearchRepository.findById(studentId);
//        if (studentOptional.isPresent()) {
//            Student student = studentOptional.get();
//            student.setName(studentDetails.getName());
//            student.setEmail(studentDetails.getEmail());
//            student.setDateOfBirth(studentDetails.getDateOfBirth());
//            student.setEnrollmentNumber(studentDetails.getEnrollmentNumber());
//
//            emailService.sendUpdationEmailToStudent(student.getEmail());
//            return studentElasticsearchRepository.save(student);
//        }
//        return null;
//    }
//
//    public boolean deleteStudent(Long studentId) {
//        Optional<Student> studentOptional = studentElasticsearchRepository.findById(studentId);
//        if (studentOptional.isPresent()) {
//            emailService.sendDeletionEmailToStudent(studentOptional.get().getEmail());
//            studentElasticsearchRepository.deleteById(studentId);
//            return true;
//        }
//
//        return false;
//    }
//
//    public List<Student> getAllStudentsByUser(Long userId) {
//        Optional<PlatformUser> platformUser = platformUserRepository.findById(userId);
//        if (platformUser.isPresent()) {
//            return studentElasticsearchRepository.findAllByPlatformUser(platformUser.get());
//        }
//        return List.of();
//    }


    public Student addStudent(Student student, Long userId) {
        Optional<PlatformUser> platformUser = platformUserRepository.findById(userId);

        if (platformUser.isPresent()) {
            // Check if the student already exists by enrollment number
            if (studentRepository.existsByEnrollmentNumber(student.getEnrollmentNumber())) {
                throw new IllegalArgumentException("Student with this enrollment number already exists.");
            }

            student.setPlatformUser(platformUser.get());
            emailService.sendRegistrationSuccessEmailToStudent(student.getEmail(), student.getEnrollmentNumber());
            return studentRepository.save(student);
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

            emailService.sendUpdationEmailToStudent(student.getEmail());
            return studentRepository.save(student);
        }
        return null;
    }

    public boolean deleteStudent(Long studentId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            emailService.sendDeletionEmailToStudent(studentOptional.get().getEmail());
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
