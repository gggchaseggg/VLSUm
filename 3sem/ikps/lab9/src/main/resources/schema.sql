CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    birth_year INT,
    faculty VARCHAR(100),
    status VARCHAR(50)
);

INSERT INTO students (id, name, birth_year, faculty, status) VALUES
(1, 'Иван Иванов', 1994, 'Информатика', 'ACTIVE'),
(2, 'Мария Петрова', 1995, 'Математика', 'ACTIVE'),
(3, 'Алексей Сидоров', 1993, 'Физика', 'INACTIVE');