// Navigation component

import { navigate } from '../router.js';

export function renderNavigation() {
  const nav = document.getElementById('bottom-nav');
  nav.innerHTML = `
    <button class="nav-item active" data-href="/" onclick="window.location.hash='/'">
      <span class="nav-icon">🏠</span>
      <span>Trang chủ</span>
    </button>
    <button class="nav-item" data-href="/lessons" onclick="window.location.hash='/lessons'">
      <span class="nav-icon">📖</span>
      <span>Bài học</span>
    </button>
    <button class="nav-item" data-href="/flashcards" onclick="window.location.hash='/flashcards'">
      <span class="nav-icon">🃏</span>
      <span>Flashcard</span>
    </button>
    <button class="nav-item" data-href="/pronunciation" onclick="window.location.hash='/pronunciation'">
      <span class="nav-icon">🗣️</span>
      <span>Phát âm</span>
    </button>
  `;
}
