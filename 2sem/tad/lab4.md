#### 1. Установка необходимых библиотек
```bash
pip install pandas matplotlib seaborn numpy scipy
```

#### 2. Базовый анализ данных (main.py)
```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Загрузка данных
df = pd.read_csv('evsd_data.csv', encoding='utf-8')

# Просмотр структуры данных
print("Первые 5 строк:")
print(df.head())

print("\nИнформация о данных:")
print(df.info())

print("\nОсновные статистики:")
print(df.describe())

# Анализ объемов перевозок по регионам
region_volume = df.groupby('Регион отгрузки')['Объем'].agg(['sum', 'mean', 'count'])
print("\nОбъемы перевозок по регионам:")
print(region_volume)

# Анализ по типам продукции
product_stats = df['Тип продукции'].value_counts()
print("\nРаспределение по типам продукции:")
print(product_stats)
```

#### 3. Визуализация данных
```python
# Настройка стиля графиков
plt.style.use('default')
plt.rcParams['figure.figsize'] = (12, 6)
plt.rcParams['font.size'] = 12

# График 1: Объемы перевозок по регионам
plt.figure(figsize=(14, 7))
region_volume['sum'].sort_values(ascending=False).plot(kind='bar')
plt.title('Суммарный объем перевозок по регионам')
plt.ylabel('Объем')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('region_volume.png')
plt.show()

# График 2: Распределение типов продукции
plt.figure(figsize=(10, 8))
df['Тип продукции'].value_counts().plot(kind='pie', autopct='%1.1f%%')
plt.title('Распределение типов продукции')
plt.ylabel('')
plt.savefig('product_distribution.png')
plt.show()

# График 3: Время доставки по типам ЭВСД
if 'Дата оформления' in df.columns and 'Дата гашения' in df.columns:
    df['Длительность'] = (pd.to_datetime(df['Дата гашения']) - 
                         pd.to_datetime(df['Дата оформления'])).dt.days
    
    plt.figure(figsize=(10, 6))
    df.boxplot(column='Длительность', by='Тип эВСД')
    plt.title('Длительность доставки по типам ЭВСД')
    plt.suptitle('')
    plt.savefig('delivery_time.png')
    plt.show()
```

#### 4. Анализ временных рядов (если есть даты)
```python
# Анализ временных рядов
if 'Дата оформления' in df.columns:
    # Преобразование даты
    df['Дата'] = pd.to_datetime(df['Дата оформления'])
    df['Месяц'] = df['Дата'].dt.to_period('M')
    
    # Агрегация по месяцам
    monthly_data = df.groupby('Месяц').agg({
        'Объем': 'sum',
        'Тип продукции': 'count'
    }).rename(columns={'Тип продукции': 'Количество'})
    
    # График временного ряда
    plt.figure(figsize=(14, 7))
    monthly_data['Объем'].plot()
    plt.title('Динамика объемов перевозок по месяцам')
    plt.ylabel('Объем')
    plt.grid(True)
    plt.savefig('time_series.png')
    plt.show()
```

#### 5. Корреляционный анализ
```python
# Корреляционный анализ (если есть числовые данные)
numeric_columns = df.select_dtypes(include=['number']).columns
if len(numeric_columns) > 1:
    correlation_matrix = df[numeric_columns].corr()
    
    plt.figure(figsize=(10, 8))
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
    plt.title('Матрица корреляций')
    plt.savefig('correlation_matrix.png')
    plt.show()
```

#### 6. Сохранение результатов
```python
# Сохранение результатов анализа в файл
with open('analysis_results.txt', 'w', encoding='utf-8') as f:
    f.write("РЕЗУЛЬТАТЫ АНАЛИЗА ДАННЫХ ЭВСД\n")
    f.write("=" * 50 + "\n\n")
    
    f.write("1. ОСНОВНЫЕ СТАТИСТИКИ:\n")
    f.write(str(df.describe()) + "\n\n")
    
    f.write("2. ОБЪЕМЫ ПЕРЕВОЗОК ПО РЕГИОНАМ:\n")
    f.write(str(region_volume) + "\n\n")
    
    f.write("3. РАСПРЕДЕЛЕНИЕ ПО ТИПАМ ПРОДУКЦИИ:\n")
    f.write(str(product_stats) + "\n\n")
    
    f.write("4. ИНФОРМАЦИЯ О ДАННЫХ:\n")
    f.write(f"Всего записей: {len(df)}\n")
    f.write(f"Колонки: {list(df.columns)}\n")
    f.write(f"Период данных: от {df['Дата'].min()} до {df['Дата'].max() if 'Дата' in df.columns else 'N/A'}\n")

print("Анализ завершен! Результаты сохранены в файлы:")
print("- analysis_results.txt")
print("- region_volume.png")
print("- product_distribution.png")
print("- delivery_time.png (если есть данные)")
print("- time_series.png (если есть даты)")
print("- correlation_matrix.png (если есть числовые данные)")
```
