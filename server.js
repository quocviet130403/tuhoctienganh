import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/english-daily';

app.use(cors());
app.use(express.json());

// --- Mongoose Schema ---
const progressSchema = new mongoose.Schema({
  streak: {
    current: { type: Number, default: 0 },
    best: { type: Number, default: 0 },
    lastActiveDate: { type: String, default: null }
  },
  flashcards: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
  lessons: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
  dailyLog: { type: [String], default: [] },
  settings: {
    dailyGoal: { type: Number, default: 15 }
  }
}, { timestamps: true });

const Progress = mongoose.model('Progress', progressSchema);

// Helper: get or create the single progress document
async function getProgress() {
  let doc = await Progress.findOne();
  if (!doc) {
    doc = await Progress.create({});
  }
  return doc;
}

// GET — đọc tiến độ
app.get('/api/progress', async (req, res) => {
  try {
    const data = await getProgress();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST — cập nhật tiến độ
app.post('/api/progress', async (req, res) => {
  try {
    const doc = await getProgress();

    if (req.body.streak) Object.assign(doc.streak, req.body.streak);
    if (req.body.flashcards) {
      for (const [k, v] of Object.entries(req.body.flashcards)) {
        doc.flashcards.set(k, v);
      }
    }
    if (req.body.lessons) {
      for (const [k, v] of Object.entries(req.body.lessons)) {
        doc.lessons.set(k, v);
      }
    }
    if (req.body.settings) Object.assign(doc.settings, req.body.settings);

    await doc.save();
    res.json({ ok: true, data: doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST — ghi nhận học hôm nay (streak logic)
app.post('/api/streak/checkin', async (req, res) => {
  try {
    const doc = await getProgress();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (doc.streak.lastActiveDate === today) {
      return res.json({ ok: true, message: 'Đã check-in hôm nay rồi', data: doc.streak });
    }

    if (doc.streak.lastActiveDate === yesterday) {
      doc.streak.current += 1;
    } else {
      doc.streak.current = 1;
    }

    if (doc.streak.current > doc.streak.best) {
      doc.streak.best = doc.streak.current;
    }

    doc.streak.lastActiveDate = today;

    if (!doc.dailyLog.includes(today)) {
      doc.dailyLog.push(today);
    }

    await doc.save();
    res.json({ ok: true, data: doc.streak });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET — reset
app.get('/api/progress/reset', async (req, res) => {
  try {
    await Progress.deleteMany();
    const fresh = await Progress.create({});
    res.json({ ok: true, message: 'Đã reset tiến độ', data: fresh });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Production: serve built frontend from dist/
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Connect to MongoDB then start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`📚 English Daily API running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
