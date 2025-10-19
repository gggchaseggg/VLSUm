<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:os="http://www.example.com/online-shop"
                exclude-result-prefixes="os">

    <xsl:output method="html" version="4.01" encoding="UTF-8" indent="yes"/>
    <xsl:strip-space elements="*"/>

    <!-- Главный шаблон -->
    <xsl:template match="/">
        <html>
            <head>
                <title>Система управления заказами интернет-магазина</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; font-weight: bold; }
                    .order-header { background-color: #e8f4ff; padding: 15px; margin: 20px 0; border-radius: 5px; }
                    .item-total { font-weight: bold; }
                    .order-total { font-weight: bold; background-color: #e6f7ff; }
                </style>
            </head>
            <body>
                <h1>Система управления заказами интернет-магазина</h1>

                <xsl:apply-templates select="os:OnlineShop/os:Orders/os:Order"/>

            </body>
        </html>
    </xsl:template>

    <!-- Шаблон для обработки каждого заказа -->
    <xsl:template match="os:Order">
        <div class="order-header">
            <h2>Заказ #<xsl:value-of select="@id"/></h2>
            <p><strong>Дата заказа:</strong> <xsl:value-of select="os:OrderDate"/></p>
            <p><strong>Статус:</strong> <xsl:value-of select="os:Status"/></p>
            <p><strong>Способ оплаты:</strong> <xsl:value-of select="os:PaymentMethod"/></p>
        </div>

        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Товар</th>
                    <th>Цена за единицу</th>
                    <th>Количество</th>
                    <th>Стоимость</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="os:Items/os:Item">
                    <xsl:variable name="price" select="number(@pricePerUnit)"/>
                    <xsl:variable name="quantity" select="number(@quantity)"/>
                    <xsl:variable name="itemTotal" select="$price * $quantity"/>

                    <tr>
                        <td><xsl:value-of select="position()"/></td>
                        <td>
                            <xsl:variable name="productId" select="@productId"/>
                            <xsl:value-of select="//os:Product[@id=$productId]/os:Name"/>
                        </td>
                        <td><xsl:value-of select="$price"/> руб.</td>
                        <td><xsl:value-of select="$quantity"/></td>
                        <td class="item-total">
                            <xsl:value-of select="$itemTotal"/> руб.
                        </td>
                    </tr>
                </xsl:for-each>
            </tbody>
            <tfoot>
                <tr class="order-total">
                    <td colspan="4" align="right"><strong>Итого по заказу:</strong></td>
                    <td>
                        <strong>
                            <xsl:variable name="total">
                                <xsl:call-template name="calculate-order-total">
                                    <xsl:with-param name="items" select="os:Items/os:Item"/>
                                </xsl:call-template>
                            </xsl:variable>
                            <xsl:value-of select="$total"/> руб.
                        </strong>
                    </td>
                </tr>
            </tfoot>
        </table>
    </xsl:template>

    <!-- Шаблон для расчета общей суммы заказа -->
    <xsl:template name="calculate-order-total">
        <xsl:param name="items"/>
        <xsl:param name="runningTotal" select="0"/>

        <xsl:choose>
            <xsl:when test="$items">
                <xsl:variable name="firstItem" select="$items[1]"/>
                <xsl:variable name="itemTotal" select="number($firstItem/@pricePerUnit) * number($firstItem/@quantity)"/>

                <xsl:call-template name="calculate-order-total">
                    <xsl:with-param name="items" select="$items[position() > 1]"/>
                    <xsl:with-param name="runningTotal" select="$runningTotal + $itemTotal"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$runningTotal"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <!-- Шаблон для скрытия нежелательных элементов -->
    <xsl:template match="text()"/>

</xsl:stylesheet>