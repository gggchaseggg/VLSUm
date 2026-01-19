package grachev.lab9;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class IntegrationRoute extends RouteBuilder {

    private final Map<Integer, String> studentDb = new HashMap<>();

    public IntegrationRoute() {
        studentDb.put(1, "Иван Иванов, 1994, Информатика, ACTIVE");
        studentDb.put(2, "Мария Петрова, 1995, Математика, ACTIVE");
        studentDb.put(3, "Алексей Сидоров, 1993, Физика, INACTIVE");
    }

    @Override
    public void configure() throws Exception {

        from("file:input?noop=true&delay=5000&fileName=student_request.xml")
                .log("=== File Binding Component: Получена заявка ===")

                // XSLT Service Engine (имитация)
                .process(exchange -> {
                    String xml = exchange.getIn().getBody(String.class);
                    Integer studentId = extractStudentId(xml);
                    exchange.getIn().setHeader("studentId", studentId);
                    exchange.getIn().setBody("Processed XML: " + xml);
                })
                .log("=== XSLT Service Engine: XML преобразован ===")

                // Java EE Module (вызов SOAP сервиса ЛР6)
                .process(exchange -> {
                    Integer studentId = exchange.getIn().getHeader("studentId", Integer.class);
                    RestTemplate restTemplate = new RestTemplate();

                    try {
                        String soapRequest = createSoapRequest(studentId);

                        HttpHeaders headers = new HttpHeaders();
                        headers.setContentType(MediaType.TEXT_XML);
                        headers.set("SOAPAction", "");

                        HttpEntity<String> request = new HttpEntity<>(soapRequest, headers);

                        String response = restTemplate.postForObject(
                                "http://localhost:8080/ws",
                                request,
                                String.class
                        );
                        exchange.getIn().setHeader("soapResponse", "SOAP: Успешно");
                    } catch (Exception e) {
                        exchange.getIn().setHeader("soapResponse", "SOAP Error");
                    }
                })
                .log("=== Java EE Module: SOAP сервис (ЛР6) вызван ===")

                // BPEL Module (вызов BPEL процесса ЛР7)
                .process(exchange -> {
                    Integer studentId = exchange.getIn().getHeader("studentId", Integer.class);
                    RestTemplate restTemplate = new RestTemplate();

                    try {
                        HttpHeaders headers = new HttpHeaders();
                        headers.setContentType(MediaType.TEXT_XML);
                        headers.set("SOAPAction", "");
                        HttpEntity<String> request = new HttpEntity<>(headers);

                        String bpelResult = restTemplate.postForObject(
                                "http://localhost:8081/bpel-process?id=" + studentId,
                                request,
                                String.class
                        );
                        exchange.getIn().setHeader("bpelResult", "BPEL OK");
                    } catch (Exception e) {
                        exchange.getIn().setHeader("bpelResult", "BPEL Error");
                    }
                })
                .log("=== BPEL Module: Бизнес-процесс (ЛР7) выполнен ===")

                // SQL Service Engine (ИМИТАЦИЯ без реального SQL)
                .process(exchange -> {
                    Integer studentId = exchange.getIn().getHeader("studentId", Integer.class);
                    String studentData = studentDb.getOrDefault(studentId, "NOT_FOUND");

                    // Имитируем SQL запрос в логах
                    System.out.println("SQL SE: INSERT INTO processed_requests VALUES (" +
                            studentId + ", '" + LocalDateTime.now() + "', 'COMPLETED')");

                    exchange.getIn().setHeader("dbRecord", studentData);
                    exchange.getIn().setHeader("sqlTimestamp", LocalDateTime.now());
                })
                .log("=== SQL Service Engine: Данные сохранены в БД ===")

                // File Binding Component (сохранение результата)
                .setBody(exchange -> {
                    return String.format("""
                    ==== ИНТЕГРАЦИОННОЕ ПРИЛОЖЕНИЕ ====
                    Время: %s
                    Студент ID: %d
                    Данные из БД: %s
                    SOAP Ответ: %s
                    BPEL Результат: %s
                    SQL Время: %s
                    Статус: УСПЕШНО
                    """,
                            LocalDateTime.now(),
                            exchange.getIn().getHeader("studentId"),
                            exchange.getIn().getHeader("dbRecord"),
                            exchange.getIn().getHeader("soapResponse"),
                            exchange.getIn().getHeader("bpelResult"),
                            exchange.getIn().getHeader("sqlTimestamp")
                    );
                })
                .to("file:output?fileName=result_${date:now:yyyyMMdd_HHmmss}.txt")
                .log("=== File Binding Component: Результат сохранен ===");
    }

    private Integer extractStudentId(String xml) {
        try {
            if (xml.contains("<studentId>")) {
                String idStr = xml.split("<studentId>")[1].split("</studentId>")[0];
                return Integer.parseInt(idStr.trim());
            }
        } catch (Exception e) {
            // ignore
        }
        return 1;
    }

    private String createSoapRequest(Integer studentId) {
        return String.format("""
                <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                                                                 xmlns:soap="http://example.com/soap">
                                       <soapenv:Header/>
                                       <soapenv:Body>
                                           <soap:GetStudentRequest>
                                               <soap:id>%d</soap:id>
                                           </soap:GetStudentRequest>
                                       </soapenv:Body>
                                   </soapenv:Envelope>
            """, studentId);
    }
}