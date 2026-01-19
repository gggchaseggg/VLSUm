package grachev.lab7;

import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.util.HashMap;
import java.util.Map;

@Endpoint
public class StudentEndpoint {

    private static final String NAMESPACE_URI = "http://example.com/soap";

    private final Map<Integer, String> students = new HashMap<>();

    public StudentEndpoint() {
        initializeStudents();
    }

    private void initializeStudents() {
        students.put(1, "Иван Иванов, 1994-04-05");
        students.put(2, "Мария Петрова, 1995-06-15");
        students.put(3, "Алексей Сидоров, 1993-02-28");
        students.put(4, "Екатерина Смирнова, 1996-08-20");
        students.put(5, "Дмитрий Кузнецов, 1997-11-10");
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetAllStudentsRequest")
    @ResponsePayload
    public Element getAllStudents(@RequestPayload Element request) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.newDocument();

            // Создаем корневой элемент ответа
            Element response = doc.createElementNS(NAMESPACE_URI, "GetAllStudentsResponse");

            // Добавляем всех студентов из Map
            for (Map.Entry<Integer, String> entry : students.entrySet()) {
                Element studentElement = doc.createElement("student");

                // Формат: "ID: Имя, Дата"
                String studentInfo = String.format("%d: %s",
                        entry.getKey(), entry.getValue());
                studentElement.setTextContent(studentInfo);

                response.appendChild(studentElement);
            }

            return response;

        } catch (Exception e) {
            return createErrorResponse("Ошибка при получении списка студентов: " + e.getMessage());
        }
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetStudentRequest")
    @ResponsePayload
    public Element getStudent(@RequestPayload Element request) {
        try {
            // Получаем ID из запроса
            int studentId = extractStudentId(request);

            // Получаем данные студента из общего поля
            String studentInfo = students.getOrDefault(studentId,
                    "Неизвестный студент, 2000-01-01");

            Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();

            Element response = doc.createElementNS(NAMESPACE_URI, "GetStudentResponse");

            // Основная информация
            Element studentElement = doc.createElement("student");
            studentElement.setTextContent(studentInfo);
            response.appendChild(studentElement);

            // ID для наглядности
            Element idElement = doc.createElement("id");
            idElement.setTextContent(String.valueOf(studentId));
            response.appendChild(idElement);

            // Статус
            Element statusElement = doc.createElement("status");
            statusElement.setTextContent(students.containsKey(studentId) ? "FOUND" : "NOT_FOUND");
            response.appendChild(statusElement);

            return response;

        } catch (Exception e) {
            return createErrorResponse("Ошибка при получении студента: " + e.getMessage());
        }
    }

    // Вспомогательный метод для извлечения ID
    private int extractStudentId(Element request) throws Exception {
        Node idNode = request.getElementsByTagName("soap:id").item(0);
        if (idNode != null) {
            String idText = idNode.getTextContent().trim();
            return Integer.parseInt(idText);
        }
        return -1; // значение по умолчанию
    }

    // Вспомогательный метод для создания ошибки
    private Element createErrorResponse(String errorMessage) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.newDocument();

            Element errorResponse = doc.createElementNS(NAMESPACE_URI, "ErrorResponse");
            Element errorElement = doc.createElement("error");
            errorElement.setTextContent(errorMessage);
            errorResponse.appendChild(errorElement);

            Element timestamp = doc.createElement("timestamp");
            timestamp.setTextContent(java.time.LocalDateTime.now().toString());
            errorResponse.appendChild(timestamp);

            return errorResponse;
        } catch (Exception ex) {
            throw new RuntimeException("Не удалось создать ответ об ошибке", ex);
        }
    }
}