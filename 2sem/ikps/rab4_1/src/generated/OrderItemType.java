package generated;

import java.math.BigDecimal;

public class OrderItemType {

    private String productId;

    private Integer quantity;

    private BigDecimal pricePerUnit;

    // Геттеры и сеттеры
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public BigDecimal getPricePerUnit() { return pricePerUnit; }
    public void setPricePerUnit(BigDecimal pricePerUnit) { this.pricePerUnit = pricePerUnit; }
}