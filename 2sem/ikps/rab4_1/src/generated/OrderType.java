package generated;

import java.math.BigDecimal;

public class OrderType {

    private String id;

    private String orderDate;

    private String status;

    private Items items;

    // Геттеры и сеттеры
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getOrderDate() { return orderDate; }
    public void setOrderDate(String orderDate) { this.orderDate = orderDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Items getItems() { return items; }
    public void setItems(Items items) { this.items = items; }
}