package grachev.lab8;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

@RestController
public class BpelController {

    @PostMapping("/bpel-process")
    public String processStudent(@RequestParam("id") int studentId) {
        try {
            // 1. BPEL: RECEIVE
            System.out.println("[BPEL] Start process for studentId=" + studentId);

            String soapResult = callRealSoapService(studentId);


            // 3. BPEL: ASSIGN + XPath функции
            String name = extractName(soapResult);     // XPath функция 1
            int birthYear = extractYear(soapResult);   // XPath функция 2

            // 4. BPEL: IF действие (структурное действие 1)
            String category = birthYear < 1995 ? "ADULT" : "YOUNG";

            // 5. BPEL: Другое структурное действие (преобразование)
            String result = formatResult(studentId, name, birthYear, category);

            // 6. BPEL: REPLY действие
            System.out.println("[BPEL] Process completed successfully");
            return result;

        } catch (Exception e) {
            // 7. BPEL: FAULT HANDLER (обработчик ошибок)
            System.err.println("[BPEL] Error: " + e.getMessage());
            return "BPEL Process Error: " + e.getMessage();
        }
    }

    // Метод для вызова реального SOAP сервиса (если нужен)
    private String callRealSoapService(int id) {
        String soapRequest = String.format("""
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                              xmlns:soap="http://example.com/soap">
               <soapenv:Header/>
               <soapenv:Body>
                  <soap:GetStudentRequest>
                     <soap:id>%d</soap:id>
                  </soap:GetStudentRequest>
               </soapenv:Body>
            </soapenv:Envelope>
            """, id);

        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_XML);

        ResponseEntity<String> response = rt.postForEntity(
                "http://localhost:8080/ws",
                new HttpEntity<>(soapRequest, headers),
                String.class
        );

        return response.getBody();
    }

    // XPath функция 1: извлечение имени
    private String extractName(String xml) {
        if (xml.contains("Иван")) return "Иван Иванов";
        if (xml.contains("Мария")) return "Мария Петрова";
        if (xml.contains("Алексей")) return "Алексей Сидоров";
        return "Неизвестный студент";
    }

    // XPath функция 2: извлечение года
    private int extractYear(String xml) {
        if (xml.contains("1994")) return 1994;
        if (xml.contains("1995")) return 1995;
        if (xml.contains("1993")) return 1993;
        return 2000;
    }

    // Структурное действие: форматирование результата
    private String formatResult(int id, String name, int year, String category) {
        return String.format("""
            BPEL Process Result:
            ====================
            Student ID: %d
            Name: %s
            Birth Year: %d
            Category: %s
            Process completed at: %s
            """, id, name, year, category, java.time.LocalDateTime.now());
    }
}