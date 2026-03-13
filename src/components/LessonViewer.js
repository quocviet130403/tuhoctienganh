// Lesson Viewer — displays daily lessons organized by month

import { getLessonByDay, getAllLessons, getLessonsByMonth, getMonthInfo } from '../data/lessons.js';
import { getVocabByDay } from '../data/vocabulary.js';
import { getProgress, saveProgress } from '../api.js';

function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.85;
    window.speechSynthesis.speak(utter);
  }
}

export async function renderLessonList() {
  const main = document.getElementById('main-content');
  const progress = await getProgress();
  const completedLessons = progress?.lessons || {};

  let html = '<div class="page-title">📖 Bài Học</div><p class="section-subtitle">Lộ trình 180 ngày — IT English</p>';

  for (let m = 1; m <= 6; m++) {
    const info = getMonthInfo(m);
    const lessons = getLessonsByMonth(m);
    const completedCount = lessons.filter(l => completedLessons[l.day]).length;

    html += `
      <div class="card month-card" style="margin-bottom: var(--space-4); cursor: pointer;" onclick="document.getElementById('month-${m}').classList.toggle('collapsed')">
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <div style="font-size: 1.8rem;">${info.icon}</div>
          <div style="flex: 1;">
            <div style="font-weight: 700; font-size: var(--fs-base);">${info.name}: ${info.subtitle}</div>
            <div style="font-size: var(--fs-xs); color: var(--text-muted); margin-top: 2px;">${info.desc}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 700; color: var(--accent-light); font-size: var(--fs-sm);">${completedCount}/${lessons.length}</div>
            <div style="font-size: var(--fs-xs); color: var(--text-muted);">hoàn thành</div>
          </div>
        </div>
        <div class="month-progress" style="margin-top: var(--space-3);"><div class="month-progress-bar" style="width: ${Math.round(completedCount/lessons.length*100)}%; height: 4px; background: var(--accent); border-radius: 2px;"></div></div>
      </div>
      <div id="month-${m}" class="${m > 1 ? 'collapsed' : ''} lesson-month-list">
        ${lessons.map(l => `
          <div class="lesson-list-item" onclick="window.location.hash='/lesson/${l.day}'">
            <div class="lesson-list-num ${completedLessons[l.day] ? 'completed' : ''}">${completedLessons[l.day] ? '✓' : l.day}</div>
            <div class="lesson-list-info">
              <div class="lesson-list-title">${l.title}</div>
              <div class="lesson-list-sub">Day ${l.day} · ${l.checklist.length} mục tiêu${l.exercises?.length ? ' · 📝 Bài tập' : ''}</div>
            </div>
            <div class="lesson-list-arrow">›</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  main.innerHTML = html;
}

export async function renderLesson(day) {
  const main = document.getElementById('main-content');
  const dayNum = parseInt(day);
  const lesson = getLessonByDay(dayNum);

  if (!lesson) {
    main.innerHTML = `
      <div class="page-title">📖 Bài Học</div>
      <div class="empty-state">
        <div class="empty-icon">🚧</div>
        <p>Bài học Day ${day} đang được xây dựng</p>
        <button class="streak-checkin-btn" style="margin-top: var(--space-6);" onclick="window.location.hash='/lessons'">← Quay lại</button>
      </div>
    `;
    return;
  }

  const progress = await getProgress();
  const checklistState = progress?.lessons?.[`checklist_${dayNum}`] || {};

  let sectionsHTML = '';
  for (const section of (lesson.sections || [])) {
    if (section.type === 'pronunciation' || section.type === 'grammar') {
      sectionsHTML += renderPronunciationSection(section);
    } else if (section.type === 'vocabulary') {
      sectionsHTML += renderVocabSection(section);
    } else if (section.type === 'listening') {
      sectionsHTML += renderListeningSection(section);
    }
  }

  // Exercises section
  let exercisesHTML = '';
  if (lesson.exercises && lesson.exercises.length > 0) {
    exercisesHTML = renderExercisesSection(lesson.exercises);
  }

  const totalLessons = getAllLessons().length;

  main.innerHTML = `
    <div class="lesson-header">
      <div class="lesson-day-badge">DAY ${dayNum}</div>
      <div class="lesson-title">${lesson.title}</div>
      <div class="lesson-objective">🎯 ${lesson.objective}</div>
    </div>

    ${sectionsHTML}
    ${exercisesHTML}

    <div class="lesson-section">
      <div class="section-title">✅ Checklist hoàn thành</div>
      <ul class="lesson-checklist">
        ${lesson.checklist.map((item, i) => `
          <li class="checklist-item ${checklistState[i] ? 'done' : ''}" data-index="${i}">
            <div class="checklist-check">${checklistState[i] ? '✓' : ''}</div>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div class="lesson-nav">
      <button class="lesson-nav-btn" ${dayNum <= 1 ? 'disabled' : ''} onclick="window.location.hash='/lesson/${dayNum - 1}'">← Day ${dayNum - 1}</button>
      <button class="lesson-nav-btn" onclick="window.location.hash='/lessons'">📋 Danh sách</button>
      <button class="lesson-nav-btn" ${dayNum >= 180 ? 'disabled' : ''} onclick="window.location.hash='/lesson/${dayNum + 1}'">Day ${dayNum + 1} →</button>
    </div>
  `;

  // Checklist event listeners
  document.querySelectorAll('.checklist-item').forEach(item => {
    item.addEventListener('click', async () => {
      const idx = parseInt(item.dataset.index);
      const newState = !checklistState[idx];
      checklistState[idx] = newState;
      item.classList.toggle('done');
      item.querySelector('.checklist-check').textContent = newState ? '✓' : '';

      const allDone = lesson.checklist.every((_, i) => checklistState[i]);
      const lessonUpdate = { [`checklist_${dayNum}`]: checklistState };
      if (allDone) lessonUpdate[dayNum] = true;

      await saveProgress({ lessons: lessonUpdate });
    });
  });

  // Vocab word speak
  document.querySelectorAll('.vocab-word').forEach(el => {
    el.addEventListener('click', () => speak(el.textContent));
  });

  // Exercise handlers
  setupExerciseHandlers();
}

function renderPronunciationSection(section) {
  let html = `<div class="lesson-section"><div class="section-title">${section.title}</div>`;

  for (const item of (section.content || [])) {
    html += `
      <div class="card" style="margin-bottom: var(--space-3);">
        <div style="display: flex; align-items: baseline; gap: var(--space-3); margin-bottom: var(--space-2);">
          <span style="font-size: var(--fs-xl); font-weight: 700; font-family: monospace; color: var(--accent-light);">${item.phoneme}</span>
          <span style="color: var(--text-secondary); font-size: var(--fs-sm);">${item.name}</span>
        </div>
        <p style="font-size: var(--fs-sm); color: var(--text-secondary); margin-bottom: var(--space-3);">${item.desc}</p>
        <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
          ${item.words.map(w => `<span class="vocab-word" style="padding: 4px 10px; background: var(--bg-glass); border-radius: var(--radius-sm); font-size: var(--fs-sm); cursor: pointer;" title="Click để nghe">${w}</span>`).join('')}
        </div>
      </div>
    `;
  }

  if (section.minimalPairs) {
    html += `
      <div class="card" style="margin-top: var(--space-3);">
        <div style="font-weight: 600; margin-bottom: var(--space-3);">Minimal Pairs</div>
        <table style="width: 100%;">
          ${section.minimalPairs.map(([a, b]) => `
            <tr>
              <td class="vocab-word" style="padding: 8px 12px; cursor: pointer;">${a}</td>
              <td style="padding: 8px 12px; text-align: center; color: var(--text-muted);">vs</td>
              <td class="vocab-word" style="padding: 8px 12px; cursor: pointer;">${b}</td>
            </tr>
          `).join('')}
        </table>
      </div>
    `;
  }

  html += '</div>';
  return html;
}

function renderVocabSection(section) {
  let allVocab = [];
  for (const day of (section.vocabDays || [])) {
    allVocab = allVocab.concat(getVocabByDay(day));
  }

  if (allVocab.length === 0) return '';

  return `
    <div class="lesson-section">
      <div class="section-title">${section.title}</div>
      <table class="vocab-table">
        <thead><tr><th>Từ</th><th>Phiên âm</th><th>Nghĩa</th></tr></thead>
        <tbody>
          ${allVocab.map(v => `
            <tr>
              <td class="vocab-word" title="Click để nghe">${v.word}</td>
              <td class="vocab-ipa">${v.ipa}</td>
              <td>${v.meaning}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderListeningSection(section) {
  return `
    <div class="lesson-section">
      <div class="section-title">${section.title}</div>
      <div class="card">
        <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2);">
          ${(section.instructions || []).map(i => `
            <li style="font-size: var(--fs-sm); color: var(--text-secondary); padding-left: var(--space-4); position: relative;">
              <span style="position: absolute; left: 0;">•</span>${i}
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}

function renderExercisesSection(exercises) {
  let html = '<div class="lesson-section"><div class="section-title">📝 Bài Tập</div>';

  exercises.forEach((ex, exIdx) => {
    html += `<div class="card exercise-card" style="margin-bottom: var(--space-3);">`;
    html += `<div style="font-weight: 600; margin-bottom: var(--space-3); color: var(--accent-light);">${ex.title}</div>`;
    if (ex.instructions) html += `<p style="font-size: var(--fs-sm); color: var(--text-secondary); margin-bottom: var(--space-3);">${ex.instructions}</p>`;

    (ex.items || []).forEach((item, itemIdx) => {
      const qId = `ex-${exIdx}-${itemIdx}`;
      html += `
        <div class="exercise-question" id="${qId}" data-answer="${item.answer}" style="margin-bottom: var(--space-4); padding: var(--space-3); border-radius: var(--radius-sm); background: rgba(255,255,255,0.03);">
          <div style="font-size: var(--fs-sm); font-weight: 500; margin-bottom: var(--space-2);">${item.question || item.sentence}</div>
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
            ${item.options.map((opt, optIdx) => `
              <button class="exercise-option" data-qid="${qId}" data-opt="${optIdx}" style="padding: 6px 14px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg-glass); color: var(--text-primary); cursor: pointer; font-size: var(--fs-sm); transition: all 0.2s;">${opt}</button>
            `).join('')}
          </div>
          <div class="exercise-feedback" style="display: none; margin-top: var(--space-2); font-size: var(--fs-sm);"></div>
        </div>
      `;
    });

    html += '</div>';
  });

  html += '</div>';
  return html;
}

function setupExerciseHandlers() {
  document.querySelectorAll('.exercise-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const qId = btn.dataset.qid;
      const chosen = parseInt(btn.dataset.opt);
      const question = document.getElementById(qId);
      const correct = parseInt(question.dataset.answer);
      const feedback = question.querySelector('.exercise-feedback');

      // Disable all options for this question
      question.querySelectorAll('.exercise-option').forEach(b => {
        b.style.pointerEvents = 'none';
        if (parseInt(b.dataset.opt) === correct) {
          b.style.background = 'rgba(16, 185, 129, 0.2)';
          b.style.borderColor = '#10b981';
          b.style.color = '#10b981';
        }
      });

      if (chosen === correct) {
        btn.style.background = 'rgba(16, 185, 129, 0.2)';
        feedback.textContent = '✅ Chính xác!';
        feedback.style.color = '#10b981';
      } else {
        btn.style.background = 'rgba(239, 68, 68, 0.2)';
        btn.style.borderColor = '#ef4444';
        feedback.textContent = '❌ Sai rồi! Đáp án đúng đã được tô xanh.';
        feedback.style.color = '#ef4444';
      }
      feedback.style.display = 'block';
    });
  });
}
