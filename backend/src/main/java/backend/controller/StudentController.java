package backend.controller;

import backend.entity.Student;
import backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<Student> addStudent(@RequestBody Student student, @RequestParam Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authenticated user: " + authentication.getName());
        System.out.println("Authorities: " + authentication.getAuthorities());

        Student createdStudent = studentService.addStudent(student, userId);
        if (createdStudent != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long studentId) {
        Optional<Student> student = studentService.findStudentById(studentId);
        return student.map(value -> ResponseEntity.ok().body(value))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/update/{studentId}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long studentId, @RequestBody Student studentDetails) {
        Student updatedStudent = studentService.updateStudent(studentId, studentDetails);
        if (updatedStudent != null) {
            return ResponseEntity.ok().body(updatedStudent);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/delete/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long studentId) {
        boolean isDeleted = studentService.deleteStudent(studentId);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<Student>> getAllStudentsByUser(@PathVariable Long userId) {
//        List<Student> students = studentService.getAllStudentsByUser(userId);
//        if (!students.isEmpty()) {
//            return ResponseEntity.ok().body(students);
//        }
//        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
//    }
}
