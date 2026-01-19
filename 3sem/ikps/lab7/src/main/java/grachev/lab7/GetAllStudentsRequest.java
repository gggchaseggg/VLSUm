package grachev.lab7;

import jakarta.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "")
@XmlRootElement(name = "GetAllStudentsRequest", namespace = "http://example.com/soap")
public class GetAllStudentsRequest {

    // Пустой конструктор (обязательно для JAXB)
    public GetAllStudentsRequest() {
    }

    // Этот класс пустой, так как запрос не содержит параметров
    // JAXB требует хотя бы один public метод, поэтому добавим toString

    @Override
    public String toString() {
        return "GetAllStudentsRequest{}";
    }
}
