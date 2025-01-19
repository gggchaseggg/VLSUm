const { Pool } = require('pg');
const { performance } = require('perf_hooks');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lab3',
  password: 'postgres',
  port: 5433,
});

const getRandomIds = (maxId, count) => {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * maxId) + 1);
  }
  return Array.from(ids);
};

const runTests = async () => {
  try {
    console.log("Starting PostgreSQL performance tests...");

    // 1. Получение книг по жанру
    let start = performance.now();
    const genre = 'Fiction'; // Замените на жанр, который есть в вашей базе
    const booksByGenre = await pool.query(`SELECT * FROM Book WHERE genre = $1`, [genre]);
    console.log(`Books by Genre (${genre}): ${booksByGenre.rowCount}, Time: ${(performance.now() - start).toFixed(2)}ms`);

    // 2. Выдачи книг конкретного читателя
    start = performance.now();
    const readerId = 1; // Замените на существующий reader_id
    const issuesByReader = await pool.query(
      `SELECT * FROM BookIssue WHERE reader_id = $1`,
      [readerId]
    );
    console.log(`Issues by Reader (${readerId}): ${issuesByReader.rowCount}, Time: ${(performance.now() - start).toFixed(2)}ms`);

    // 3. Подсчет книг за период
    start = performance.now();
    const startDate = '2023-01-01';
    const endDate = '2023-12-31';
    const booksInPeriod = await pool.query(
      `SELECT COUNT(*) FROM BookIssue WHERE issue_date BETWEEN $1 AND $2`,
      [startDate, endDate]
    );
    console.log(`Books issued in Period (${startDate} to ${endDate}): ${booksInPeriod.rows[0].count}, Time: ${(performance.now() - start).toFixed(2)}ms`);

    // 4. Количество не возвращенных книг
    start = performance.now();
    const unreturnedBooks = await pool.query(
      `SELECT COUNT(*) FROM BookIssue WHERE return_date IS NULL`
    );
    console.log(`Unreturned Books: ${unreturnedBooks.rows[0].count}, Time: ${(performance.now() - start).toFixed(2)}ms`);

    // 5. Среднее время прочтения книги
    start = performance.now();
    const avgReadingTime = await pool.query(
      `SELECT AVG(return_date - issue_date) AS avg_reading_time FROM BookIssue WHERE return_date IS NOT NULL`
    );
    console.log(`Average Reading Time: ${avgReadingTime.rows[0].avg_reading_time} days, Time: ${(performance.now() - start).toFixed(2)}ms`);

    // 6. Получение 100,000 случайных элементов по ID
    const randomIds = getRandomIds(1000000, 100000);
    start = performance.now();
    let books = [];
    for (const id of randomIds) {
      const book = await pool.query(
        `SELECT * FROM Book WHERE id = $1`,
        [id]
      );
      if (Object.keys(book).length > 0) books.push(book);
    }
    console.log(`Random 100,000 Books: Retrieved ${books.rowCount} rows, Time: ${(performance.now() - start).toFixed(2)}ms`);

    // 7. Получение 100,000 случайных элементов по ID
    start = performance.now();
    books = await pool.query(
      `SELECT * FROM Book WHERE id = ANY($1::int[])`,
      [randomIds]
    );
    console.log(`Random 100,000 Books: Retrieved ${books.rowCount} rows, Time: ${(performance.now() - start).toFixed(2)}ms`);
  } catch (err) {
    console.error("Error running tests:", err);
  } finally {
    await pool.end();
  }
};

runTests();
