package backend.controller;

import backend.entity.Student;
import backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

//    @GetMapping("/search")
//    public ResponseEntity<List<Student>> searchStudents(
//            @RequestParam(required = false) String name,
//            @RequestParam(required = false) String enrollmentNumber,
//            @RequestParam(required = false) String email) {
//
//        List<Student> students = studentService.searchStudents(name, enrollmentNumber, email);
//        return ResponseEntity.ok(students);
//    }

//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add/{userId}")
    public ResponseEntity<Student> addStudent(@RequestBody Student student, @PathVariable Long userId) {
        try {
            Student createdStudent = studentService.addStudent(student, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // 409 Conflict
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


//    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long studentId) {
        Optional<Student> student = studentService.findStudentById(studentId);
        return student.map(value -> ResponseEntity.ok().body(value))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{studentId}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long studentId, @RequestBody Student studentDetails) {
        Student updatedStudent = studentService.updateStudent(studentId, studentDetails);
        if (updatedStudent != null) {
            return ResponseEntity.ok().body(updatedStudent);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long studentId) {
        boolean isDeleted = studentService.deleteStudent(studentId);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

//    @DeleteMapping("/delete/{enrollmentNumber}")
//    public ResponseEntity<Void> deleteStudent(@PathVariable String enrollmentNumber) {
//        boolean isDeleted = studentService.deleteStudent(enrollmentNumber);
//        if (isDeleted) {
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
//        }
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//    }



    //    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Student>> getAllStudentsByUser(@PathVariable Long userId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        authorities.forEach(role -> System.out.println(role.getAuthority()));

        List<Student> students = studentService.getAllStudentsByUser(userId);
        if (!students.isEmpty()) {
            return ResponseEntity.ok().body(students);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
