import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.ErrorHandler;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import java.io.InputStream;
import java.io.StringReader;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Main {
    public static void main(String[] args) {
        try {
            // Читаем XML из стандартного ввода
            InputStream xmlInput = System.in;

            // 1. Парсим XML
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setNamespaceAware(true);
            DocumentBuilder builder = factory.newDocumentBuilder();

            // Настраиваем обработку ошибок
            builder.setErrorHandler(new SimpleErrorHandler());

            Document doc = builder.parse(xmlInput);

            // 2. Валидация по схеме
            try {
                SchemaFactory schemaFactory = SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema");
                Schema schema = schemaFactory.newSchema(Main.class.getResource("shop.xsd"));
                Validator validator = schema.newValidator();
                validator.setErrorHandler(new SimpleErrorHandler());
                validator.validate(new DOMSource(doc));
            } catch (Exception e) {
                System.err.println("Ошибка валидации: " + e.getMessage());
                return;
            }

            // 3. Генерируем HTML
            String html = generateHTML(doc);
            System.out.println(html);

        } catch (Exception e) {
            System.err.println("Критическая ошибка: " + e.getMessage());
        }
    }

    private static String generateHTML(Document doc) {
        StringBuilder html = new StringBuilder();

        // Начало HTML-документа
        html.append("<!DOCTYPE html>\n");
        html.append("<html>\n");
        html.append("<head>\n");
        html.append("    <title>Заказы интернет-магазина</title>\n");
        html.append("    <style>\n");
        html.append("        table { border-collapse: collapse; width: 100%; margin: 20px 0; }\n");
        html.append("        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }\n");
        html.append("        th { background-color: #f2f2f2; }\n");
        html.append("        .total-row { font-weight: bold; background-color: #e6f7ff; }\n");
        html.append("    </style>\n");
        html.append("</head>\n");
        html.append("<body>\n");
        html.append("    <h1>Список заказов</h1>\n");

        // Получаем все заказы
        NodeList orders = doc.getElementsByTagNameNS("http://www.example.com/online-shop", "Order");

        // Перебираем заказы
        for (int i = 0; i < orders.getLength(); i++) {
            Element order = (Element) orders.item(i);

            // Основная информация о заказе
            String orderId = order.getAttribute("id");
            String orderDate = getTextContent(order, "OrderDate");
            String status = getTextContent(order, "Status");

            html.append("    <h2>Заказ #").append(orderId).append("</h2>\n");
            html.append("    <p><strong>Дата:</strong> ").append(orderDate).append("</p>\n");
            html.append("    <p><strong>Статус:</strong> ").append(status).append("</p>\n");

            // Таблица товаров в заказе
            html.append("    <table>\n");
            html.append("        <tr>\n");
            html.append("            <th>Товар</th>\n");
            html.append("            <th>Цена за шт.</th>\n");
            html.append("            <th>Количество</th>\n");
            html.append("            <th>Стоимость</th>\n");
            html.append("        </tr>\n");

            Element items = (Element) order.getElementsByTagNameNS("http://www.example.com/online-shop", "Items").item(0);
            NodeList itemList = items.getElementsByTagNameNS("http://www.example.com/online-shop", "Item");

            BigDecimal orderTotal = BigDecimal.ZERO;

            // Перебираем товары в заказе
            for (int j = 0; j < itemList.getLength(); j++) {
                Element item = (Element) itemList.item(j);

                String productId = item.getAttribute("productId");
                int quantity = Integer.parseInt(item.getAttribute("quantity"));
                BigDecimal pricePerUnit = new BigDecimal(item.getAttribute("pricePerUnit"));

                // Вычисляем стоимость позиции
                BigDecimal itemTotal = pricePerUnit.multiply(new BigDecimal(quantity));
                orderTotal = orderTotal.add(itemTotal);

                // Находим название товара по ID
                String productName = findProductName(doc, productId);

                html.append("        <tr>\n");
                html.append("            <td>").append(productName).append("</td>\n");
                html.append("            <td>").append(pricePerUnit).append(" руб.</td>\n");
                html.append("            <td>").append(quantity).append("</td>\n");
                html.append("            <td>").append(itemTotal).append(" руб.</td>\n");
                html.append("        </tr>\n");
            }

            // Итоговая строка для заказа
            html.append("        <tr class=\"total-row\">\n");
            html.append("            <td colspan=\"3\"><strong>Итого по заказу:</strong></td>\n");
            html.append("            <td><strong>").append(orderTotal).append(" руб.</strong></td>\n");
            html.append("        </tr>\n");
            html.append("    </table>\n");
        }

        html.append("</body>\n");
        html.append("</html>");

        return html.toString();
    }

    private static String getTextContent(Element parent, String tagName) {
        NodeList nodes = parent.getElementsByTagNameNS("http://www.example.com/online-shop", tagName);
        if (nodes.getLength() > 0) {
            return nodes.item(0).getTextContent();
        }
        return "";
    }

    private static String findProductName(Document doc, String productId) {
        NodeList products = doc.getElementsByTagNameNS("http://www.example.com/online-shop", "Product");

        for (int i = 0; i < products.getLength(); i++) {
            Element product = (Element) products.item(i);
            if (product.getAttribute("id").equals(productId)) {
                return getTextContent(product, "Name");
            }
        }

        return "Неизвестный товар (ID: " + productId + ")";
    }

    // Обработчик ошибок
    static class SimpleErrorHandler implements ErrorHandler {
        public void warning(SAXParseException e) throws SAXException {
            System.err.println("Предупреждение: " + e.getMessage());
            System.err.println("Строка " + e.getLineNumber() + ", столбец " + e.getColumnNumber());
        }

        public void error(SAXParseException e) throws SAXException {
            System.err.println("Ошибка: " + e.getMessage());
            System.err.println("Строка " + e.getLineNumber() + ", столбец " + e.getColumnNumber());
            throw e;
        }

        public void fatalError(SAXParseException e) throws SAXException {
            System.err.println("Критическая ошибка: " + e.getMessage());
            System.err.println("Строка " + e.getLineNumber() + ", столбец " + e.getColumnNumber());
            throw e;
        }
    }
}