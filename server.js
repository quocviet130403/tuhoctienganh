import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'data', 'user-progress.json');

app.use(cors());
app.use(express.json());

// Đảm bảo thư mục data tồn tại
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Khởi tạo file DB nếu chưa có
const defaultProgress = {
  streak: { current: 0, best: 0, lastActiveDate: null },
  flashcards: {},
  lessons: {},
  dailyLog: [],
  settings: { dailyGoal: 15 }
};

function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultProgress, null, 2));
      return { ...defaultProgress };
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { ...defaultProgress };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// GET — đọc tiến độ
app.get('/api/progress', (req, res) => {
  const data = readDB();
  res.json(data);
});

// POST — cập nhật tiến độ
app.post('/api/progress', (req, res) => {
  const current = readDB();
  const updated = { ...current, ...req.body };

  // Merge nested objects
  if (req.body.streak) updated.streak = { ...current.streak, ...req.body.streak };
  if (req.body.flashcards) updated.flashcards = { ...current.flashcards, ...req.body.flashcards };
  if (req.body.lessons) updated.lessons = { ...current.lessons, ...req.body.lessons };

  writeDB(updated);
  res.json({ ok: true, data: updated });
});

// POST — ghi nhận học hôm nay (streak logic)
app.post('/api/streak/checkin', (req, res) => {
  const data = readDB();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (data.streak.lastActiveDate === today) {
    return res.json({ ok: true, message: 'Đã check-in hôm nay rồi', data: data.streak });
  }

  if (data.streak.lastActiveDate === yesterday) {
    data.streak.current += 1;
  } else {
    data.streak.current = 1;
  }

  if (data.streak.current > data.streak.best) {
    data.streak.best = data.streak.current;
  }

  data.streak.lastActiveDate = today;

  if (!data.dailyLog.includes(today)) {
    data.dailyLog.push(today);
  }

  writeDB(data);
  res.json({ ok: true, data: data.streak });
});

// GET — reset
app.get('/api/progress/reset', (req, res) => {
  writeDB({ ...defaultProgress });
  res.json({ ok: true, message: 'Đã reset tiến độ' });
});

app.listen(PORT, () => {
  console.log(`📚 English Daily API running on http://localhost:${PORT}`);
});
