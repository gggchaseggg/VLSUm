package grachev.lab7;

import jakarta.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {"student"})
@XmlRootElement(name = "GetStudentResponse")
public class GetStudentResponse {
    @XmlElement(required = true)
    protected Student student;
    public Student getStudent() { return student; }
    public void setStudent(Student value) { this.student = value; }
}
