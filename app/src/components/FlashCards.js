// Flashcard component — Anki-like SM-2 spaced repetition with 3D flip
// Features: SM-2 algorithm, 4-level rating, review scheduling, stats

import { vocabulary, categories } from '../data/vocabulary.js';
import { getProgress, saveProgress } from '../api.js';

let currentCards = [];
let currentIndex = 0;
let isFlipped = false;
let activeCategory = 'all';
let viewMode = 'review'; // 'review' | 'all' | 'stats'
let progress = {};
let fcData = {}; // { [id]: { ease, interval, repetitions, nextReview, lastReview } }

// ==========================================
// SM-2 SPACED REPETITION ALGORITHM
// ==========================================

function sm2(card, quality) {
  // quality: 0=Quên, 1=Khó, 2=Tốt, 3=Dễ
  let { ease = 2.5, interval = 0, repetitions = 0 } = card || {};

  if (quality === 0) {
    // Quên: reset completely
    repetitions = 0;
    interval = 0; // repeat in this session
  } else if (quality === 1) {
    // Khó: short interval
    if (repetitions === 0) {
      interval = 1;
    } else {
      interval = Math.max(1, Math.round(interval * 0.7));
    }
    repetitions = Math.max(1, repetitions);
  } else if (quality === 2) {
    // Tốt: normal progression
    if (repetitions === 0) interval = 3;
    else if (repetitions === 1) interval = 7;
    else interval = Math.round(interval * ease);
    repetitions += 1;
  } else {
    // Dễ: accelerated progression
    if (repetitions === 0) interval = 5;
    else if (repetitions === 1) interval = 14;
    else interval = Math.round(interval * ease * 1.3);
    repetitions += 1;
  }

  // Adjust ease factor
  const easeChange = [-.3, -.15, 0, .15];
  ease = Math.max(1.3, ease + easeChange[quality]);

  const now = new Date();
  const nextReview = new Date(now.getTime() + interval * 86400000).toISOString().split('T')[0];

  return {
    ease: Math.round(ease * 100) / 100,
    interval,
    repetitions,
    nextReview,
    lastReview: now.toISOString().split('T')[0],
    quality
  };
}

function isDueToday(cardData) {
  if (!cardData || !cardData.nextReview) return true; // New card
  const today = new Date().toISOString().split('T')[0];
  return cardData.nextReview <= today;
}

function getCardStatus(cardData) {
  if (!cardData || cardData.repetitions === undefined) return 'new';
  if (cardData.repetitions === 0) return 'learning';
  if (cardData.interval >= 21) return 'mature';
  return 'young';
}

// ==========================================
// CARD FILTERING & SORTING
// ==========================================

function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.85;
    window.speechSynthesis.speak(utter);
  }
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getCardsByFilter(cat, fc, mode) {
  let words = cat === 'all' ? vocabulary : vocabulary.filter(v => v.category === cat);

  if (mode === 'review') {
    // Only due cards (new + due for review)
    const due = words.filter(w => isDueToday(fc[w.id]));
    const newCards = due.filter(w => !fc[w.id]);
    const reviewCards = due.filter(w => fc[w.id]);
    // New first (max 20 per session), then due reviews
    return [...shuffleArray(newCards).slice(0, 20), ...shuffleArray(reviewCards)];
  }

  // 'all' mode: show everything, new first
  const newCards = words.filter(w => !fc[w.id]);
  const learning = words.filter(w => fc[w.id] && getCardStatus(fc[w.id]) === 'learning');
  const young = words.filter(w => fc[w.id] && getCardStatus(fc[w.id]) === 'young');
  const mature = words.filter(w => fc[w.id] && getCardStatus(fc[w.id]) === 'mature');
  return [...shuffleArray(newCards), ...shuffleArray(learning), ...shuffleArray(young), ...shuffleArray(mature)];
}

function getStats(fc) {
  const total = vocabulary.length;
  const newCount = vocabulary.filter(w => !fc[w.id]).length;
  const learning = vocabulary.filter(w => fc[w.id] && getCardStatus(fc[w.id]) === 'learning').length;
  const young = vocabulary.filter(w => fc[w.id] && getCardStatus(fc[w.id]) === 'young').length;
  const mature = vocabulary.filter(w => fc[w.id] && getCardStatus(fc[w.id]) === 'mature').length;
  const dueToday = vocabulary.filter(w => isDueToday(fc[w.id])).length;
  return { total, newCount, learning, young, mature, dueToday };
}

function getNextIntervalPreview(cardData, quality) {
  const result = sm2(cardData, quality);
  if (result.interval === 0) return 'Lại ngay';
  if (result.interval === 1) return '1 ngày';
  if (result.interval < 30) return `${result.interval} ngày`;
  return `${Math.round(result.interval / 30)} tháng`;
}

// ==========================================
// RENDER
// ==========================================

export async function renderFlashCards() {
  const main = document.getElementById('main-content');
  const data = await getProgress();
  progress = data || {};
  fcData = progress.flashcards || {};
  currentCards = getCardsByFilter(activeCategory, fcData, viewMode);
  currentIndex = 0;
  isFlipped = false;

  renderPage(main);
}

function renderPage(main) {
  if (viewMode === 'stats') {
    renderStats(main);
    return;
  }

  const stats = getStats(fcData);

  if (currentCards.length === 0) {
    main.innerHTML = `
      <div class="page-title">🃏 Flashcards</div>
      ${renderHeader(stats)}
      <div class="empty-state">
        <div class="empty-icon">🎉</div>
        <p style="font-size: var(--fs-lg); font-weight: 600;">Đã ôn xong hôm nay!</p>
        <p style="color: var(--text-secondary); margin-top: var(--space-2);">
          ${viewMode === 'review' ? `${stats.dueToday === 0 ? 'Không có từ nào cần ôn. Quay lại mai nhé!' : 'Tất cả từ đã được ôn!'}` : 'Không có từ nào trong danh mục này'}
        </p>
        <div style="display:flex;gap:var(--space-3);margin-top:var(--space-6);justify-content:center;">
          <button class="streak-checkin-btn" id="btn-all-mode">📚 Xem tất cả từ</button>
          <button class="streak-checkin-btn" id="btn-stats" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);">📊 Thống kê</button>
        </div>
      </div>
    `;
    bindHeaderEvents(main);
    document.getElementById('btn-all-mode')?.addEventListener('click', () => {
      viewMode = 'all';
      currentCards = getCardsByFilter(activeCategory, fcData, 'all');
      currentIndex = 0;
      isFlipped = false;
      renderPage(main);
    });
    document.getElementById('btn-stats')?.addEventListener('click', () => {
      viewMode = 'stats';
      renderPage(main);
    });
    return;
  }

  const card = currentCards[currentIndex];
  const cardData = fcData[card.id];
  const status = getCardStatus(cardData);
  const statusMap = { new: '🆕 Mới', learning: '📖 Đang học', young: '🌱 Quen', mature: '✅ Thuộc' };
  const pct = Math.round(((currentIndex + 1) / currentCards.length) * 100);

  main.innerHTML = `
    <div class="page-title">🃏 Flashcards</div>
    ${renderHeader(stats)}

    <div class="fc-counter">
      ${currentIndex + 1} / ${currentCards.length} — ${statusMap[status]}
      ${cardData?.interval ? ` — ôn sau ${cardData.interval} ngày` : ''}
    </div>
    <div class="fc-progress"><div class="fc-progress-bar" style="width: ${pct}%"></div></div>

    <div class="flashcard-container">
      <div class="flashcard ${isFlipped ? 'flipped' : ''}" id="flashcard">
        <div class="flashcard-face flashcard-front">
          <div class="flashcard-word">${card.word}</div>
          <div class="flashcard-ipa">${card.ipa}</div>
          <button class="flashcard-speak-btn" id="speak-btn" title="Nghe phát âm">🔊</button>
          <div class="flashcard-hint">Bấm thẻ để lật</div>
        </div>
        <div class="flashcard-face flashcard-back">
          <div class="flashcard-meaning">${card.meaning}</div>
          <div class="flashcard-ipa">${card.ipa}</div>
          <div class="flashcard-example">"${card.example}"</div>
          <button class="flashcard-speak-btn" id="speak-btn-back" title="Nghe phát âm">🔊</button>
        </div>
      </div>
    </div>

    <div class="sm2-actions">
      <button class="sm2-btn sm2-again" id="btn-again">
        <span class="sm2-label">😵 Quên</span>
        <span class="sm2-interval">${getNextIntervalPreview(cardData, 0)}</span>
      </button>
      <button class="sm2-btn sm2-hard" id="btn-hard">
        <span class="sm2-label">😓 Khó</span>
        <span class="sm2-interval">${getNextIntervalPreview(cardData, 1)}</span>
      </button>
      <button class="sm2-btn sm2-good" id="btn-good">
        <span class="sm2-label">😊 Tốt</span>
        <span class="sm2-interval">${getNextIntervalPreview(cardData, 2)}</span>
      </button>
      <button class="sm2-btn sm2-easy" id="btn-easy">
        <span class="sm2-label">🤩 Dễ</span>
        <span class="sm2-interval">${getNextIntervalPreview(cardData, 3)}</span>
      </button>
    </div>
  `;

  // Event listeners
  document.getElementById('flashcard').addEventListener('click', (e) => {
    if (e.target.closest('.flashcard-speak-btn')) return;
    isFlipped = !isFlipped;
    document.getElementById('flashcard').classList.toggle('flipped');
  });

  document.getElementById('speak-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    speak(card.word);
  });
  document.getElementById('speak-btn-back')?.addEventListener('click', (e) => {
    e.stopPropagation();
    speak(card.word);
  });

  // SM-2 rating buttons
  [0, 1, 2, 3].forEach(q => {
    const btnId = ['btn-again', 'btn-hard', 'btn-good', 'btn-easy'][q];
    document.getElementById(btnId)?.addEventListener('click', async () => {
      const updated = sm2(fcData[card.id], q);
      fcData[card.id] = updated;
      await saveProgress({ flashcards: { [card.id]: updated } });
      nextCard(main);
    });
  });

  bindHeaderEvents(main);
}

function renderHeader(stats) {
  return `
    <div class="sm2-stats-bar">
      <div class="sm2-stat">
        <span class="sm2-stat-num sm2-due">${stats.dueToday}</span>
        <span class="sm2-stat-label">Cần ôn</span>
      </div>
      <div class="sm2-stat">
        <span class="sm2-stat-num sm2-new">${stats.newCount}</span>
        <span class="sm2-stat-label">Mới</span>
      </div>
      <div class="sm2-stat">
        <span class="sm2-stat-num sm2-young">${stats.young}</span>
        <span class="sm2-stat-label">Quen</span>
      </div>
      <div class="sm2-stat">
        <span class="sm2-stat-num sm2-mature">${stats.mature}</span>
        <span class="sm2-stat-label">Thuộc</span>
      </div>
    </div>

    <div class="sm2-mode-toggle">
      <button class="sm2-mode-btn ${viewMode === 'review' ? 'active' : ''}" id="mode-review">📅 Ôn hôm nay</button>
      <button class="sm2-mode-btn ${viewMode === 'all' ? 'active' : ''}" id="mode-all">📚 Tất cả</button>
      <button class="sm2-mode-btn ${viewMode === 'stats' ? 'active' : ''}" id="mode-stats">📊 Thống kê</button>
    </div>

    <div class="fc-category-filter">
      ${Object.entries(categories).map(([key, label]) => `
        <button class="fc-filter-btn ${key === activeCategory ? 'active' : ''}" data-cat="${key}">${label}</button>
      `).join('')}
    </div>
  `;
}

function bindHeaderEvents(main) {
  // Category filter
  document.querySelectorAll('.fc-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      currentCards = getCardsByFilter(activeCategory, fcData, viewMode);
      currentIndex = 0;
      isFlipped = false;
      renderPage(main);
    });
  });

  // Mode toggle
  document.getElementById('mode-review')?.addEventListener('click', () => {
    viewMode = 'review';
    currentCards = getCardsByFilter(activeCategory, fcData, 'review');
    currentIndex = 0; isFlipped = false;
    renderPage(main);
  });
  document.getElementById('mode-all')?.addEventListener('click', () => {
    viewMode = 'all';
    currentCards = getCardsByFilter(activeCategory, fcData, 'all');
    currentIndex = 0; isFlipped = false;
    renderPage(main);
  });
  document.getElementById('mode-stats')?.addEventListener('click', () => {
    viewMode = 'stats';
    renderPage(main);
  });
}

function renderStats(main) {
  const stats = getStats(fcData);
  const reviewed = vocabulary.filter(w => fcData[w.id]).length;
  const pct = Math.round((stats.mature / stats.total) * 100);

  // Category breakdown
  const catStats = Object.entries(categories)
    .filter(([k]) => k !== 'all')
    .map(([key, label]) => {
      const words = vocabulary.filter(v => v.category === key);
      const known = words.filter(w => fcData[w.id] && getCardStatus(fcData[w.id]) === 'mature').length;
      const total = words.length;
      return { key, label, known, total, pct: total > 0 ? Math.round((known / total) * 100) : 0 };
    })
    .sort((a, b) => b.total - a.total);

  main.innerHTML = `
    <div class="page-title">🃏 Flashcards</div>
    ${renderHeader(stats)}

    <div class="sm2-stats-detail">
      <h3 style="margin-bottom:var(--space-4);">📊 Tổng quan</h3>
      <div class="sm2-overview">
        <div class="sm2-pie">
          <div class="sm2-pie-circle" style="background: conic-gradient(
            #22c55e ${stats.mature / stats.total * 360}deg,
            #3b82f6 ${stats.mature / stats.total * 360}deg ${(stats.mature + stats.young) / stats.total * 360}deg,
            #f59e0b ${(stats.mature + stats.young) / stats.total * 360}deg ${(stats.mature + stats.young + stats.learning) / stats.total * 360}deg,
            rgba(255,255,255,0.1) ${(stats.mature + stats.young + stats.learning) / stats.total * 360}deg
          )">
            <div class="sm2-pie-inner">${pct}%</div>
          </div>
        </div>
        <div class="sm2-legend">
          <div class="sm2-legend-item"><span class="sm2-dot" style="background:#22c55e"></span> Thuộc: ${stats.mature}</div>
          <div class="sm2-legend-item"><span class="sm2-dot" style="background:#3b82f6"></span> Quen: ${stats.young}</div>
          <div class="sm2-legend-item"><span class="sm2-dot" style="background:#f59e0b"></span> Đang học: ${stats.learning}</div>
          <div class="sm2-legend-item"><span class="sm2-dot" style="background:rgba(255,255,255,0.2)"></span> Mới: ${stats.newCount}</div>
          <div class="sm2-legend-item" style="margin-top:var(--space-2);font-weight:600;"><span class="sm2-dot" style="background:#ef4444"></span> Cần ôn hôm nay: ${stats.dueToday}</div>
        </div>
      </div>

      <h3 style="margin:var(--space-6) 0 var(--space-4);">📂 Theo danh mục</h3>
      <div class="sm2-cat-list">
        ${catStats.map(c => `
          <div class="sm2-cat-row">
            <div class="sm2-cat-name">${c.label}</div>
            <div class="sm2-cat-bar-wrap">
              <div class="sm2-cat-bar" style="width:${c.pct}%"></div>
            </div>
            <div class="sm2-cat-count">${c.known}/${c.total}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  bindHeaderEvents(main);
}

function nextCard(main) {
  currentIndex++;
  if (currentIndex >= currentCards.length) {
    // Refresh cards after completing session
    currentCards = getCardsByFilter(activeCategory, fcData, viewMode);
    currentIndex = 0;
    if (currentCards.length === 0) {
      renderPage(main);
      return;
    }
  }
  isFlipped = false;
  renderPage(main);
}
