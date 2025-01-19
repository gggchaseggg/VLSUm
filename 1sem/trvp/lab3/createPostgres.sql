CREATE TABLE Book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    year_published INT,
    genre VARCHAR(50)
);

CREATE TABLE Reader (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(15),
    membership_date DATE
);

CREATE TABLE BookIssue (
    id SERIAL PRIMARY KEY,
    book_id INT REFERENCES Book(id),
    reader_id INT REFERENCES Reader(id),
    issue_date DATE,
    return_date DATE
);
