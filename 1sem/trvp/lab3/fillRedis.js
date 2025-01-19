const Redis = require('ioredis');
const { faker } = require('@faker-js/faker');

const redis = new Redis();

const insertData = async () => {
  console.log("Starting Redis data insertion...");

  try {
    for (let i = 0; i < 1000000; i++) {
      // Генерация данных для книги
      const bookKey = `book:${i}`;
      const title = faker.lorem.words(3);
      const author = faker.person.firstName();
      const yearPublished = faker.date.past(30).getFullYear();
      const genre = faker.music.genre();

      await redis.hmset(bookKey, {
        title,
        author,
        yearPublished,
        genre,
      });

      // Генерация данных для читателя
      const readerKey = `reader:${i}`;
      const readerName = faker.person.firstName();
      const email = faker.internet.email();
      const phoneNumber = faker.phone.number({ style: 'international' });
      const membershipDate = faker.date.past(5).toISOString().split('T')[0];

      await redis.hmset(readerKey, {
        name: readerName,
        email,
        phoneNumber,
        membershipDate,
      });

      // Генерация данных для выдачи книги
      const issueKey = `issue:${i}`;
      const issueDate = faker.date.past(2).toISOString().split('T')[0];
      const returnDate = faker.date.future(1, issueDate).toISOString().split('T')[0];

      await redis.hmset(issueKey, {
        bookId: i,
        readerId: i,
        issueDate,
        returnDate,
      });

      if (i % 10000 === 0) {
        console.log(`${i} records inserted`);
      }
    }
    console.log("Redis data insertion completed.");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    redis.quit();
  }
};

const main = async () => {
  console.time('[insert]')
  await insertData();
  console.timeEnd('[insert]')
}

main()