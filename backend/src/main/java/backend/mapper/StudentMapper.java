package backend.mapper;

import backend.entity.PlatformUser;
import backend.entity.PlatformUserElastic;
import backend.entity.Student;
import backend.entity.StudentElastic;
import backend.utils.DateUtils;

import java.time.ZoneId;

public class StudentMapper {

    public static StudentElastic mapToElastic(Student student, StudentElastic studentElastic) {
        studentElastic.setName(student.getName());
        studentElastic.setEmail(student.getEmail());
//        studentElastic.setDateOfBirth(student.getDateOfBirth());
        if (student.getDateOfBirth() != null) {
            studentElastic.setDateOfBirth(student.getDateOfBirth()
                    .atZone(ZoneId.systemDefault())
                    .toInstant()
                    .toEpochMilli());
        }
        studentElastic.setEnrollmentNumber(student.getEnrollmentNumber());
        return studentElastic;
    }

    public static StudentElastic updateStudentElastic(StudentElastic newStudent, StudentElastic toBeUpdate) {
        newStudent.setStudentId(toBeUpdate.getStudentId());
        newStudent.setName(toBeUpdate.getName());
        newStudent.setEmail(toBeUpdate.getEmail());
        newStudent.setDateOfBirth(toBeUpdate.getDateOfBirth());
        newStudent.setEnrollmentNumber(toBeUpdate.getEnrollmentNumber());
        return newStudent;
    }
}
