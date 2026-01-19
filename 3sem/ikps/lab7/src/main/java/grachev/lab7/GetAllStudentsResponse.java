package grachev.lab7;

import jakarta.xml.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "students"
})
@XmlRootElement(name = "GetAllStudentsResponse", namespace = "http://example.com/soap")
public class GetAllStudentsResponse {

    @XmlElement(required = true)
    protected List<Student> students;

    // Геттер для списка студентов
    public List<Student> getStudents() {
        if (students == null) {
            students = new ArrayList<Student>();
        }
        return this.students;
    }

    // Сеттер для списка студентов
    public void setStudents(List<Student> students) {
        this.students = students;
    }

    // Метод для добавления студента в список
    public GetAllStudentsResponse addStudent(Student student) {
        getStudents().add(student);
        return this;
    }

    @Override
    public String toString() {
        return "GetAllStudentsResponse{" +
                "students=" + students +
                '}';
    }
}
