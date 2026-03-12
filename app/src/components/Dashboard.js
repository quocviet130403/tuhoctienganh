// Dashboard — Home page

import { getProgress, checkinStreak } from '../api.js';
import { getAllLessons } from '../data/lessons.js';
import { vocabulary } from '../data/vocabulary.js';

export async function renderDashboard() {
  const main = document.getElementById('main-content');
  const progress = await getProgress() || {
    streak: { current: 0, best: 0, lastActiveDate: null },
    flashcards: {},
    lessons: {},
    dailyLog: []
  };

  const today = new Date().toISOString().split('T')[0];
  const checkedIn = progress.streak.lastActiveDate === today;
  const totalLessons = getAllLessons().length;
  const completedLessons = Object.values(progress.lessons).filter(Boolean).length;
  const knownWords = Object.values(progress.flashcards).filter(v => v === 'known').length;

  // Build heatmap for last 28 days
  const heatmapDays = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    const isActive = progress.dailyLog?.includes(dateStr);
    const isToday = dateStr === today;
    heatmapDays.push({ date: dateStr, isActive, isToday, dayName: d.toLocaleDateString('vi', { weekday: 'narrow' }) });
  }

  const dayLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  main.innerHTML = `
    <div class="streak-display">
      <div class="streak-fire">${checkedIn ? '🔥' : '💤'}</div>
      <div class="streak-count">${progress.streak.current}</div>
      <div class="streak-label">ngày liên tiếp</div>
      <div class="streak-best">Kỷ lục: ${progress.streak.best} ngày 🏆</div>
      <button class="streak-checkin-btn ${checkedIn ? 'checked' : ''}" id="checkin-btn">
        ${checkedIn ? '✅ Đã học hôm nay!' : '📚 Check-in hôm nay'}
      </button>
    </div>

    <div class="stats-row">
      <div class="card stat-card">
        <div class="stat-value">${completedLessons}/${totalLessons}</div>
        <div class="stat-label">Bài học</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value">${knownWords}</div>
        <div class="stat-label">Từ thuộc</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value">${vocabulary.length}</div>
        <div class="stat-label">Tổng từ</div>
      </div>
    </div>

    <div class="card" style="margin-top: var(--space-5);">
      <div class="section-title">📅 Hoạt động 4 tuần qua</div>
      <div class="heatmap-labels">
        ${dayLabels.map(d => `<span>${d}</span>`).join('')}
      </div>
      <div class="heatmap">
        ${heatmapDays.map(d => `
          <div class="heatmap-day ${d.isActive ? 'active' : ''} ${d.isToday ? 'today' : ''}" title="${d.date}"></div>
        `).join('')}
      </div>
    </div>

    <div class="card card-accent" style="margin-top: var(--space-5); cursor: pointer;" onclick="window.location.hash='/lesson/${getNextLesson(progress)}'">
      <div class="section-title">📚 Bài học tiếp theo</div>
      <div style="font-size: var(--fs-sm); color: var(--text-secondary); margin-top: var(--space-2);">
        Day ${getNextLesson(progress)} — Bấm để bắt đầu học →
      </div>
    </div>
  `;

  // Check-in button handler
  if (!checkedIn) {
    document.getElementById('checkin-btn').addEventListener('click', async () => {
      const result = await checkinStreak();
      if (result?.ok) {
        showToast('🔥 Check-in thành công! Cố lên!');
        renderDashboard(); // Re-render
      }
    });
  }
}

function getNextLesson(progress) {
  const lessons = getAllLessons();
  for (const l of lessons) {
    if (!progress.lessons[l.day]) return l.day;
  }
  return 1;
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => toast.classList.remove('show'), 3000);
}
