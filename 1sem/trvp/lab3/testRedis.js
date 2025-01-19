const Redis = require('ioredis');
const { performance } = require('perf_hooks');

const redis = new Redis();

const getRandomIds = (maxId, count) => {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * maxId) + 1);
  }
  return Array.from(ids);
};

const runTests = async () => {
  try {
    console.log("Starting Redis performance tests...");

    // 1. Получение книг по жанру
    let start = performance.now();
    const genre = 'Fiction'; // Замените на жанр, который есть в вашей базе
    const booksKeys = await redis.keys('book:*');
    const booksByGenre = [];
    for (const key of booksKeys) {
      const bookGenre = await redis.hget(key, 'genre');
      if (bookGenre === genre) booksByGenre.push(key);
    }
    console.log(`Books by Genre (${genre}): ${booksByGenre.length}, Time: ${(performance.now() - start).toFixed(2)}ms`);

    // 2. Выдачи книг конкретного читателя
    start = performance.now();
    const readerId = '1'; // Замените на существующий reader_id
    const issuesKeys = await redis.keys('issue:*');
    const issuesByReader = [];
    for (const key of issuesKeys) {
      const issueReaderId = await redis.hget(key, 'readerId');
      if (issueReaderId === readerId) issuesByReader.push(key);
    }
    console.log(`Issues by Reader (${readerId}): ${issuesByReader.length}, Time: ${(performance.now() - start).toFixed(2)}ms`);

    // 3. Подсчет книг за период
    start = performance.now();
    const startDate = '2023-01-01';
    const endDate = '2023-12-31';
    let booksInPeriod = 0;
    for (const key of issuesKeys) {
      const issueDate = await redis.hget(key, 'issueDate');
      if (issueDate >= startDate && issueDate <= endDate) booksInPeriod++;
    }
    console.log(`Books issued in Period (${startDate} to ${endDate}): ${booksInPeriod}, Time: ${(performance.now() - start).toFixed(2)}ms`);

    // 4. Количество не возвращенных книг
    start = performance.now();
    let unreturnedBooks = 0;
    for (const key of issuesKeys) {
      const returnDate = await redis.hget(key, 'returnDate');
      if (!returnDate) unreturnedBooks++;
    }
    console.log(`Unreturned Books: ${unreturnedBooks}, Time: ${(performance.now() - start).toFixed(2)}ms`);

    // 5. Среднее время прочтения книги
    start = performance.now();
    let totalReadingTime = 0;
    let completedBooks = 0;
    for (const key of issuesKeys) {
      const issueDate = await redis.hget(key, 'issueDate');
      const returnDate = await redis.hget(key, 'returnDate');
      if (returnDate) {
        totalReadingTime += new Date(returnDate) - new Date(issueDate);
        completedBooks++;
      }
    }
    const avgReadingTime = totalReadingTime / (completedBooks * 1000 * 60 * 60 * 24); // Перевод в дни
    console.log(`Average Reading Time: ${avgReadingTime.toFixed(2)} days, Time: ${(performance.now() - start).toFixed(2)}ms`);

    // 6. Получение 100,000 случайных элементов по ID
    const randomIds = getRandomIds(1000000, 100000);
    start = performance.now();
    const books = [];
    for (const id of randomIds) {
      const book = await redis.hgetall(`book:${id}`);
      if (Object.keys(book).length > 0) books.push(book);
    }
    console.log(`Random 100,000 Books: Retrieved ${books.length} rows, Time: ${(performance.now() - start).toFixed(2)}ms`);
  } catch (err) {
    console.error("Error running tests:", err);
  } finally {
    redis.quit();
  }
};

runTests();
