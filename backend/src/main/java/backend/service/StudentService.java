package backend.service;

import backend.entity.PlatformUser;
import backend.entity.Student;
import backend.repository.PlatformUserRepository;
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


    public Student addStudent(Student student, Long userId) {
        Optional<PlatformUser> platformUser = platformUserRepository.findById(userId);
        if (platformUser.isPresent()) {
            student.setPlatformUser(platformUser.get());
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
            return studentRepository.save(student);
        }
        return null;
    }

    public boolean deleteStudent(Long studentId) {
        if (studentRepository.existsById(studentId)) {
            studentRepository.deleteById(studentId);
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
