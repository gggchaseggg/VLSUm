# Книга
HMSET book:1 title "Book Title" author "Author Name" year_published 2021 genre "Fiction"

# Читатель
HMSET reader:1 name "Reader Name" email "email@example.com" phone_number "123456789" membership_date "2023-01-01"

# Выдача
HMSET issue:1 book_id "1" reader_id "1" issue_date "2023-01-15" return_date "2023-02-15"
