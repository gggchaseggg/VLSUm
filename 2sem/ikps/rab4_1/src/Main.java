import java.io.*;
import java.math.BigDecimal;
import java.util.*;
import javax.xml.parsers.*;

import generated.*;
import org.w3c.dom.*;
import org.xml.sax.*;

public class Main {
    public static void main(String[] args) {
        try {
            // 1. Чтение XML из стандартного ввода
            InputStream xmlInput = System.in;

            // 2. Ручной парсинг XML
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setNamespaceAware(true);
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(xmlInput);

            // 3. Создаем объекты вручную
            OnlineShop onlineShop = parseOnlineShop(doc);

            // 4. Изменяем данные
            modifyData(onlineShop);

            // 5. Генерируем HTML
            String html = generateHTML(onlineShop);
            System.out.println(html);

        } catch (Exception e) {
            System.err.println("Ошибка: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Ручной парсинг XML в объекты
    private static OnlineShop parseOnlineShop(Document doc) {
        OnlineShop shop = new OnlineShop();

        // Парсим продукты
        NodeList productNodes = doc.getElementsByTagNameNS("http://www.example.com/online-shop", "Product");
        Products products = new Products();
        for (int i = 0; i < productNodes.getLength(); i++) {
            Element productElem = (Element) productNodes.item(i);
            ProductType product = new ProductType();
            product.setId(productElem.getAttribute("id"));
            product.setName(getElementText(productElem, "Name"));
            product.setPrice(new BigDecimal(getElementText(productElem, "Price")));
            products.getProduct().add(product);
        }
        shop.setProducts(products);

        // Парсим заказы
        NodeList orderNodes = doc.getElementsByTagNameNS("http://www.example.com/online-shop", "Order");
        Orders orders = new Orders();
        for (int i = 0; i < orderNodes.getLength(); i++) {
            Element orderElem = (Element) orderNodes.item(i);
            OrderType order = new OrderType();
            order.setId(orderElem.getAttribute("id"));
            order.setOrderDate(getElementText(orderElem, "OrderDate"));
            order.setStatus(getElementText(orderElem, "Status"));
            order.setItems(parseItems(orderElem));
            orders.getOrder().add(order);
        }
        shop.setOrders(orders);

        return shop;
    }

    private static Items parseItems(Element orderElem) {
        Items items = new Items();
        Element itemsElem = (Element) orderElem.getElementsByTagNameNS("http://www.example.com/online-shop", "Items").item(0);
        if (itemsElem != null) {
            NodeList itemNodes = itemsElem.getElementsByTagNameNS("http://www.example.com/online-shop", "Item");
            for (int i = 0; i < itemNodes.getLength(); i++) {
                Element itemElem = (Element) itemNodes.item(i);
                OrderItemType item = new OrderItemType();
                item.setProductId(itemElem.getAttribute("productId"));
                item.setQuantity(Integer.parseInt(itemElem.getAttribute("quantity")));
                item.setPricePerUnit(new BigDecimal(itemElem.getAttribute("pricePerUnit")));
                items.getItem().add(item);
            }
        }
        return items;
    }

    private static String getElementText(Element parent, String tagName) {
        NodeList nodes = parent.getElementsByTagNameNS("http://www.example.com/online-shop", tagName);
        if (nodes.getLength() > 0) {
            return nodes.item(0).getTextContent();
        }
        return "";
    }

    // Остальные методы modifyData и generateHTML остаются без изменений
    // (такие же как в предыдущей версии JAXBProcessor)

    private static void modifyData(OnlineShop onlineShop) {
        if (onlineShop.getOrders() != null && onlineShop.getOrders().getOrder() != null) {
            for (OrderType order : onlineShop.getOrders().getOrder()) {
                if (order.getItems() != null && order.getItems().getItem() != null) {
                    for (OrderItemType item : order.getItems().getItem()) {
                        BigDecimal currentPrice = item.getPricePerUnit();
                        if (currentPrice != null) {
                            BigDecimal newPrice = currentPrice.multiply(new BigDecimal("1.1"));
                            item.setPricePerUnit(newPrice.setScale(2, BigDecimal.ROUND_HALF_UP));
                        }
                    }
                }

                if ("Pending".equals(order.getStatus())) {
                    order.setStatus("Processing");
                }
            }
        }
    }

    private static String generateHTML(OnlineShop onlineShop) {
        StringBuilder html = new StringBuilder();

        html.append("<!DOCTYPE html>\n");
        html.append("<html>\n");
        html.append("<head>\n");
        html.append("    <title>Заказы интернет-магазина</title>\n");
        html.append("    <style>\n");
        html.append("        body { font-family: Arial, sans-serif; margin: 20px; }\n");
        html.append("        table { border-collapse: collapse; width: 100%; margin: 20px 0; }\n");
        html.append("        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }\n");
        html.append("        th { background-color: #f2f2f2; }\n");
        html.append("        .total-row { font-weight: bold; background-color: #e6f7ff; }\n");
        html.append("    </style>\n");
        html.append("</head>\n");
        html.append("<body>\n");
        html.append("    <h1>Список заказов (обработано JAXB)</h1>\n");

        if (onlineShop.getOrders() != null && onlineShop.getOrders().getOrder() != null) {
            for (OrderType order : onlineShop.getOrders().getOrder()) {
                html.append("    <h2>Заказ #").append(order.getId()).append("</h2>\n");
                html.append("    <p><strong>Дата:</strong> ").append(order.getOrderDate()).append("</p>\n");
                html.append("    <p><strong>Статус:</strong> ").append(order.getStatus()).append("</p>\n");

                html.append("    <table>\n");
                html.append("        <tr>\n");
                html.append("            <th>Товар</th>\n");
                html.append("            <th>Цена за шт.</th>\n");
                html.append("            <th>Количество</th>\n");
                html.append("            <th>Стоимость</th>\n");
                html.append("        </tr>\n");

                BigDecimal orderTotal = BigDecimal.ZERO;

                if (order.getItems() != null && order.getItems().getItem() != null) {
                    for (OrderItemType item : order.getItems().getItem()) {
                        String productName = findProductName(onlineShop, item.getProductId());
                        BigDecimal itemTotal = item.getPricePerUnit().multiply(
                                new BigDecimal(item.getQuantity().toString()));
                        orderTotal = orderTotal.add(itemTotal);

                        html.append("        <tr>\n");
                        html.append("            <td>").append(productName).append("</td>\n");
                        html.append("            <td>").append(item.getPricePerUnit()).append(" руб.</td>\n");
                        html.append("            <td>").append(item.getQuantity()).append("</td>\n");
                        html.append("            <td>").append(itemTotal).append(" руб.</td>\n");
                        html.append("        </tr>\n");
                    }
                }

                html.append("        <tr class=\"total-row\">\n");
                html.append("            <td colspan=\"3\"><strong>Итого по заказу:</strong></td>\n");
                html.append("            <td><strong>").append(orderTotal).append(" руб.</strong></td>\n");
                html.append("        </tr>\n");
                html.append("    </table>\n");
            }
        }

        html.append("</body>\n");
        html.append("</html>");

        return html.toString();
    }

    private static String findProductName(OnlineShop onlineShop, String productId) {
        if (onlineShop.getProducts() != null && onlineShop.getProducts().getProduct() != null) {
            for (ProductType product : onlineShop.getProducts().getProduct()) {
                if (productId.equals(product.getId())) {
                    return product.getName();
                }
            }
        }
        return "Неизвестный товар (ID: " + productId + ")";
    }
}