1. Скачиваем и устанавливаем Pentaho Data Integration (Community Edition) https://sourceforge.net/projects/pentaho/files/Data%20Integration/

2. Запускаем Spoon.sh (Linux/Mac)

3. Создаем новый transformation (.ktr файл)


```sql
-- Подготавливаем целевую БД - выполняем этот скрипт в PostgreSQL
CREATE TABLE IF NOT EXISTS csv_import_evsd (
    issue_date DATE,
    ship_enterprise VARCHAR(255),
    ship_region VARCHAR(100),
    delivery_enterprise VARCHAR(255),
    delivery_region VARCHAR(100),
    product_type VARCHAR(100),
    product_category VARCHAR(100),
    product_name VARCHAR(100),
    evsd_type VARCHAR(10),
    source_type VARCHAR(10),
    status VARCHAR(20),
    volume DECIMAL(15,2),
    unit VARCHAR(20),
    issuer_name VARCHAR(255),
    cancel_date DATE,
    receiver_name VARCHAR(255)
);
```

#### Процесс в Pentaho PDI:
1. **CSV File Input** - читаем CSV файл
2. **Select Values** - выбираем и переименовываем поля
3. **Table Output** - записываем в таблицу `csv_import_evsd`

#### Настройки шагов:

#### CSV File Input:
- Filename: `path/to/your/evsd_data.csv`
- Delimiter: `,`
- Encoding: `UTF-8`

#### Select Values (переименование полей согласно структуре):
- Дата оформления → issue_date
- Место отгрузки → ship_enterprise
- Регион отгрузки → ship_region
- Место доставки → delivery_enterprise
- Регион доставки → delivery_region
- Тип продукции → product_type
- Продукция → product_category
- Вид продукции → product_name
- Тип эВСД → evsd_type
- Источник → source_type
- Статус → status
- Объем → volume
- Единица измерения → unit
- Кто оформил → issuer_name
- Дата гашения → cancel_date
- Кто погасил → receiver_name

#### Table Output:
- Connection: ваше подключение к PostgreSQL
- Target table: `csv_import_evsd`
- Specify database fields: ✔️
- Truncate table: ✔️ (если нужно очистить перед загрузкой)

#### Запуск:
1. Сохранить transformation
2. Нажать "Play" (запуск)
3. Проверить логи выполнения
4. Проверить данные в БД: `SELECT COUNT(*) FROM csv_import_evsd;`
