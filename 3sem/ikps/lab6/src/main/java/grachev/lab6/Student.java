package grachev.lab6;

import java.time.LocalDate;

public class Student {
    public Integer id;
    public String name;
    public LocalDate birthdate;

    public Student() {}

    public Student(Integer id, String name, LocalDate birthdate) {
        this.id = id;
        this.name = name;
        this.birthdate = birthdate;
    }
}
