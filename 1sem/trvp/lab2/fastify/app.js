const fastify = require('fastify')({ logger: true });
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const db = require('./database');

// Плагины
fastify.register(require('@fastify/jwt'), { secret: 'supersecretkey' });
fastify.register(require('@fastify/multipart'));
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'uploads'),
  prefix: '/uploads/', // Доступ к файлам
});

// Middleware для проверки токена
fastify.decorate('authenticate', async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
});

// Middleware для проверки роли
fastify.decorate('authorizeRole', (role) => {
  return async (request, reply) => {
    if (request.user.role !== role) {
      reply.code(403).send({ error: 'Access denied' });
    }
  };
});

// Регистрация пользователя
fastify.post('/register', async (request, reply) => {
  const { username, password, role } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
    [username, hashedPassword, role || 'user'],
    (err) => {
      if (err) {
        reply.code(400).send({ error: 'User already exists' });
      } else {
        reply.code(201).send({ message: 'User registered' });
      }
    }
  );
});

// Логин пользователя
fastify.post('/login', async (request, reply) => {
  const { username, password } = request.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      reply.code(401).send({ error: 'Invalid credentials' });
    } else {
      const token = fastify.jwt.sign({ id: user.id, role: user.role }, { expiresIn: '1h' });
      reply.send({ token });
    }
  });
});

// Получение списка пользователей (только для администраторов)
fastify.get('/users', { preHandler: [fastify.authenticate, fastify.authorizeRole('admin')] }, async (request, reply) => {
  db.all(`SELECT id, username, role FROM users`, [], (err, rows) => {
    if (err) {
      reply.code(500).send({ error: 'Database error' });
    } else {
      reply.send(rows);
    }
  });
});

// Загрузка аватарки
fastify.post('/upload', { preHandler: fastify.authenticate }, async (request, reply) => {
  const data = await request.file();
  const filePath = path.join(__dirname, 'uploads', `${Date.now()}-${data.filename}`);

  await new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath);
    data.file.pipe(stream);
    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  reply.send({ message: 'File uploaded', filePath: `/uploads/${path.basename(filePath)}` });
});

// Скачивание аватарки
fastify.get('/download/:filename', { preHandler: fastify.authenticate }, async (request, reply) => {
  const filePath = path.join(__dirname, 'uploads', request.params.filename);

  if (!fs.existsSync(filePath)) {
    reply.code(404).send({ error: 'File not found' });
    return;
  }

  reply.sendFile(request.params.filename);
});

// Запуск сервера
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
