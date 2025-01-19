const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const serve = require('koa-static');
const multer = require('koa-multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./database');

const app = new Koa();
const router = new Router();
const SECRET = 'supersecretkey';
const PORT = 3000;

// Настройка загрузки файлов
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Middleware для проверки токена
async function authenticateToken(ctx, next) {
  const authHeader = ctx.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized' };
    return;
  }

  try {
    const user = jwt.verify(token, SECRET);
    ctx.state.user = user;
    await next();
  } catch (err) {
    ctx.status = 403;
    ctx.body = { error: 'Forbidden' };
  }
}

// Middleware для проверки роли
function authorizeRole(role) {
  return async (ctx, next) => {
    if (ctx.state.user.role !== role) {
      ctx.status = 403;
      ctx.body = { error: 'Access denied' };
      return;
    }
    await next();
  };
}

// Регистрация пользователя
router.post('/register', koaBody(), async (ctx) => {
  const { username, password, role } = ctx.request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
    [username, hashedPassword, role || 'user'],
    (err) => {
      if (err) {
        ctx.status = 400;
        ctx.body = { error: 'User already exists' };
        return;
      }
      ctx.status = 201;
      ctx.body = { message: 'User registered' };
    }
  );
});

// Логин
router.post('/login', koaBody(), async (ctx) => {
  const { username, password } = ctx.request.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      ctx.status = 401;
      ctx.body = { error: 'Invalid credentials' };
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
    ctx.body = { token };
  });
});

// Получение списка пользователей (только для администраторов)
router.get('/users', authenticateToken, authorizeRole('admin'), async (ctx) => {
  db.all(`SELECT id, username, role FROM users`, [], (err, rows) => {
    if (err) {
      ctx.status = 500;
      ctx.body = { error: 'Database error' };
      return;
    }
    ctx.body = rows;
  });
});

// Загрузка аватарки
router.post('/upload', authenticateToken, upload.single('avatar'), (ctx) => {
  ctx.body = { message: 'File uploaded', filePath: `/uploads/${ctx.file.filename}` };
});

// Скачивание аватарки
router.get('/download/:filename', authenticateToken, async (ctx) => {
  const filePath = path.join(__dirname, 'uploads', ctx.params.filename);
  ctx.attachment(filePath);
  ctx.body = require('fs').createReadStream(filePath);
});

// Подключаем роуты
app.use(serve(path.join(__dirname, 'uploads')));
app.use(router.routes()).use(router.allowedMethods());

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
