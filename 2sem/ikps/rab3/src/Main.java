import javax.xml.transform.*;
import javax.xml.transform.sax.SAXSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.InputSource;
import org.xml.sax.ErrorHandler;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try {
            // 1. Чтение XML из стандартного ввода
            InputSource xmlInput = new InputSource(System.in);

            // 2. Настройка обработки ошибок для XML
            SAXParserFactory saxFactory = SAXParserFactory.newInstance();
            saxFactory.setNamespaceAware(true);
            SAXParser saxParser = saxFactory.newSAXParser();

            // 3. Загрузка XSLT-преобразования из файла
            File xsltFile = new File("/Users/daniilgrachev/VlSUm/VLSUm/2sem/ikps/rab3/transform.xsl");
            if (!xsltFile.exists()) {
                System.err.println("Ошибка: файл transform.xsl не найден!");
                return;
            }
            Source xsltSource = new StreamSource(xsltFile);

            // 4. Создание трансформатора
            TransformerFactory factory = TransformerFactory.newInstance();
            Transformer transformer = factory.newTransformer(xsltSource);

            // 5. Настройка обработки ошибок для XSLT
            factory.setErrorListener(new XSLTErrorListener());

            // 6. Создание SAXSource для XML и StreamResult для вывода
            SAXSource source = new SAXSource(saxParser.getXMLReader(), xmlInput);
            StreamResult result = new StreamResult(System.out);

            // 7. Выполнение преобразования
            transformer.transform(source, result);

        } catch (TransformerException e) {
            System.err.println("Ошибка XSLT-преобразования: " + e.getMessage());
            if (e.getLocationAsString() != null) {
                System.err.println("Местоположение: " + e.getLocationAsString());
            }
        } catch (Exception e) {
            System.err.println("Критическая ошибка: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Обработчик ошибок для XSLT
    static class XSLTErrorListener implements ErrorListener {
        public void warning(TransformerException e) throws TransformerException {
            System.err.println("XSLT Предупреждение: " + e.getMessage());
            if (e.getLocationAsString() != null) {
                System.err.println("Местоположение: " + e.getLocationAsString());
            }
            // Продолжаем выполнение при warning
        }

        public void error(TransformerException e) throws TransformerException {
            System.err.println("XSLT Ошибка: " + e.getMessage());
            if (e.getLocationAsString() != null) {
                System.err.println("Местоположение: " + e.getLocationAsString());
            }
            throw e; // Прекращаем выполнение при error
        }

        public void fatalError(TransformerException e) throws TransformerException {
            System.err.println("XSLT Критическая ошибка: " + e.getMessage());
            if (e.getLocationAsString() != null) {
                System.err.println("Местоположение: " + e.getLocationAsString());
            }
            throw e; // Прекращаем выполнение при fatal error
        }
    }

    // Обработчик ошибок для SAX (XML парсинга)
    static class SAXErrorHandler implements ErrorHandler {
        public void warning(SAXParseException e) throws SAXException {
            System.err.println("XML Предупреждение: " + e.getMessage());
            System.err.println("Строка " + e.getLineNumber() + ", столбец " + e.getColumnNumber());
            // Продолжаем выполнение при warning
        }

        public void error(SAXParseException e) throws SAXException {
            System.err.println("XML Ошибка: " + e.getMessage());
            System.err.println("Строка " + e.getLineNumber() + ", столбец " + e.getColumnNumber());
            throw e; // Прекращаем выполнение при error
        }

        public void fatalError(SAXParseException e) throws SAXException {
            System.err.println("XML Критическая ошибка: " + e.getMessage());
            System.err.println("Строка " + e.getLineNumber() + ", столбец " + e.getColumnNumber());
            throw e; // Прекращаем выполнение при fatal error
        }
    }
}