const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

// Создаем таблицы
db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  // Создаем пользователя-админа
  const hashedPassword = require('bcrypt').hashSync('admin', 10);
  db.run(`INSERT INTO users (username, password, role) VALUES ('admin', ?, 'admin')`, hashedPassword);
});

module.exports = db;
