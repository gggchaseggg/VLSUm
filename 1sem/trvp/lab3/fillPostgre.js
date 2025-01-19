const { Pool } = require('pg');
const { faker } = require('@faker-js/faker');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lab3',
  password: 'postgres',
  port: 5433,
});

const insertData = async () => {
  console.log("Starting PostgreSQL data insertion...");

  try {
    for (let i = 0; i < 1000000; i++) {
      // Генерация данных для таблицы Book
      const title = faker.lorem.words(3);
      const author = faker.person.firstName();
      const yearPublished = faker.date.past(30).getFullYear();
      const genre = faker.music.genre();

      const bookResult = await pool.query(
        `INSERT INTO Book (title, author, year_published, genre) VALUES ($1, $2, $3, $4) RETURNING id`,
        [title, author, yearPublished, genre]
      );
      const bookId = bookResult.rows[0].id;

      // Генерация данных для таблицы Reader
      const readerName = faker.person.firstName();
      const email = faker.internet.email();
      const phoneNumber = faker.phone.number({ style: 'international' });
      const membershipDate = faker.date.past(5).toISOString().split('T')[0];

      const readerResult = await pool.query(
        `INSERT INTO Reader (name, email, phone_number, membership_date) VALUES ($1, $2, $3, $4) RETURNING id`,
        [readerName, email, phoneNumber, membershipDate]
      );
      const readerId = readerResult.rows[0].id;

      // Генерация данных для таблицы BookIssue
      const issueDate = faker.date.past(2).toISOString().split('T')[0];
      const returnDate = faker.date.future(1, issueDate).toISOString().split('T')[0];

      await pool.query(
        `INSERT INTO BookIssue (book_id, reader_id, issue_date, return_date) VALUES ($1, $2, $3, $4)`,
        [bookId, readerId, issueDate, returnDate]
      );

      if (i % 10000 === 0) {
        console.log(`${i} records inserted`);
      }
    }
    console.log("PostgreSQL data insertion completed.");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    await pool.end();
  }
};

const main = async () => {
  console.time('[insert]')
  await insertData();
  console.timeEnd('[insert]')
}

main()