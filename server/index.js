require('dotenv').config();
const express = require("express");
const helmet = require('helmet');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(helmet());

//--- Инициализация условной БД
const PAGE_SIZE = 20;
const DB = {};
DB.items = new Array(1_000_000);
for (let i = 0; i < DB.items.length; i++) {
  DB.items[i] = {
    value: i + 1,
    selected: false,
  }
}

// --- Вспомогательные методы
const findItemByValue = (value) => DB.items.find((e) => e.value === value);

// --- Endpoints
app.get('/api/items', (req, res) => {
  const { search = '' } = req.query;
  const page = Number(req.query.page ?? 1);
  if (isNaN(page)) return res.sendStatus(400);

  const startIndex = PAGE_SIZE * (page - 1);
  const itemsByPage = search
    ? DB.items.filter((e) => e.value.toString().startsWith(search)).slice(startIndex, startIndex + PAGE_SIZE)
    : DB.items.slice(startIndex, startIndex + PAGE_SIZE);
  res.json(itemsByPage);
});

app.patch('/api/items/:value/select', (req, res) => {
  const value = Number(req.params.value);
  if (isNaN(value)) return res.sendStatus(400);
  const item = findItemByValue(value);
  if (!item) return res.sendStatus(404);

  item.selected = true;
  res.json(item);
});

app.patch('/api/items/:value/deselect', (req, res) => {
  const value = Number(req.params.value);
  if (isNaN(value)) return res.sendStatus(400);
  const item = findItemByValue(value);
  if (!item) return res.sendStatus(404);

  item.selected = false;
  res.json(item);
});

app.post('/api/items/sort', (req, res) => {
  const { descending = false } = req.body ?? {};
  if (descending) DB.items.sort((a, b) => b.value - a.value);
  else DB.items.sort((a, b) => a.value - b.value);
  res.sendStatus(204);
});

app.post('/api/items/move', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const { value, placeAfter } = req.body;
  if (value === placeAfter) return res.sendStatus(400);

  // Клиент не может прислать готовые индексы, т.к. у него может быть отфильтрованный поиском массив
  // а мы хотим чтобы Drag N Drop менял порядок в полном списке, а не фильтрованном
  // Это сомнительно для реального проекта, но как я понял по ТЗ - нужно было именно такое поведение
  const indexFrom = DB.items.findIndex((e) => e.value === value);
  const indexTo = DB.items.findIndex((e) => e.value === placeAfter);
  if (indexTo === -1 || indexTo === -1) return res.sendStatus(400);

  const [movedItem] = DB.items.splice(indexFrom, 1);
  DB.items.splice(indexTo, 0, movedItem);

  res.sendStatus(204);
});

app.get('*path', (req, res) => {
  // В public будем заливать собранное frontend-приложение
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- Запуск сервера
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Start listening on http://localhost:${port}`);
});