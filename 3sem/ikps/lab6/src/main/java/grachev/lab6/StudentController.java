package grachev.lab6;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @GetMapping
    public Student getStudent() {
        return new Student(1, "Иван Иванов", LocalDate.of(1994, 4, 5));
    }

    @GetMapping("/all")
    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();
        students.add(new Student(1, "Иван Иванов", LocalDate.of(1994, 4, 5)));
        students.add(new Student(2, "Мария Петрова", LocalDate.of(1995, 6, 15)));
        students.add(new Student(3, "Алексей Сидоров", LocalDate.of(1993, 2, 28)));
        return students;
    }
}
