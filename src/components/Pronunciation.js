// Pronunciation reference page — IPA chart + quiz

function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.8;
    window.speechSynthesis.speak(utter);
  }
}

const vowels = [
  { symbol: '/iː/', example: 'key', desc: 'ee dài', speakWord: 'key' },
  { symbol: '/ɪ/', example: 'bit', desc: 'i ngắn', speakWord: 'bit' },
  { symbol: '/e/', example: 'test', desc: 'e ngắn', speakWord: 'test' },
  { symbol: '/æ/', example: 'app', desc: 'a rộng', speakWord: 'app' },
  { symbol: '/ʌ/', example: 'bug', desc: 'uh ngắn', speakWord: 'bug' },
  { symbol: '/ɑː/', example: 'start', desc: 'a dài', speakWord: 'start' },
  { symbol: '/ɒ/', example: 'log', desc: 'o ngắn', speakWord: 'log' },
  { symbol: '/ɔː/', example: 'port', desc: 'o dài', speakWord: 'port' },
  { symbol: '/ʊ/', example: 'push', desc: 'u ngắn', speakWord: 'push' },
  { symbol: '/uː/', example: 'tool', desc: 'oo dài', speakWord: 'tool' },
  { symbol: '/eɪ/', example: 'data', desc: 'ay', speakWord: 'data' },
  { symbol: '/aɪ/', example: 'file', desc: 'ai', speakWord: 'file' },
  { symbol: '/ɔɪ/', example: 'deploy', desc: 'oy', speakWord: 'deploy' },
  { symbol: '/aʊ/', example: 'cloud', desc: 'ao', speakWord: 'cloud' },
  { symbol: '/əʊ/', example: 'code', desc: 'oh', speakWord: 'code' },
  { symbol: '/ɪə/', example: 'engineer', desc: 'ia', speakWord: 'engineer' },
];

const consonants = [
  { symbol: '/θ/', example: 'think', desc: 'th vô thanh', speakWord: 'think' },
  { symbol: '/ð/', example: 'this', desc: 'th hữu thanh', speakWord: 'this' },
  { symbol: '/ʃ/', example: 'ship', desc: 'sh', speakWord: 'ship' },
  { symbol: '/ʒ/', example: 'measure', desc: 'zh', speakWord: 'measure' },
  { symbol: '/tʃ/', example: 'check', desc: 'ch', speakWord: 'check' },
  { symbol: '/dʒ/', example: 'job', desc: 'j', speakWord: 'job' },
  { symbol: '/r/', example: 'run', desc: 'r', speakWord: 'run' },
  { symbol: '/l/', example: 'log', desc: 'l', speakWord: 'log' },
];

const minimalPairsQuiz = [
  { pair: ['beat', 'bit'], correct: 0, phonemes: '/iː/ vs /ɪ/' },
  { pair: ['set', 'sat'], correct: 0, phonemes: '/e/ vs /æ/' },
  { pair: ['sheep', 'ship'], correct: 0, phonemes: '/iː/ vs /ɪ/' },
  { pair: ['feel', 'fill'], correct: 1, phonemes: '/iː/ vs /ɪ/' },
  { pair: ['leave', 'live'], correct: 0, phonemes: '/iː/ vs /ɪ/' },
  { pair: ['think', 'this'], correct: 0, phonemes: '/θ/ vs /ð/' },
  { pair: ['cloud', 'code'], correct: 1, phonemes: '/aʊ/ vs /əʊ/' },
];

let quizIndex = 0;
let quizScore = 0;

export function renderPronunciation() {
  const main = document.getElementById('main-content');
  quizIndex = 0;
  quizScore = 0;

  main.innerHTML = `
    <div class="page-title">🗣️ Phát Âm IPA</div>
    <p class="section-subtitle">Bấm vào ô để nghe phát âm</p>

    <div class="lesson-section">
      <div class="section-title">🔤 Nguyên Âm (Vowels)</div>
      <div class="ipa-grid">
        ${vowels.map(v => `
          <div class="ipa-cell" data-word="${v.speakWord}">
            <div class="ipa-symbol">${v.symbol}</div>
            <div class="ipa-example">${v.example}</div>
            <div class="ipa-desc">${v.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="lesson-section">
      <div class="section-title">🔤 Phụ Âm Khó (Consonants)</div>
      <div class="ipa-grid">
        ${consonants.map(c => `
          <div class="ipa-cell" data-word="${c.speakWord}">
            <div class="ipa-symbol">${c.symbol}</div>
            <div class="ipa-example">${c.example}</div>
            <div class="ipa-desc">${c.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="lesson-section mp-quiz">
      <div class="section-title">🎯 Quiz: Minimal Pairs</div>
      <p style="font-size: var(--fs-sm); color: var(--text-secondary); margin-bottom: var(--space-4);">Nghe và chọn từ đúng với âm được yêu cầu</p>
      <div id="quiz-area"></div>
    </div>
  `;

  // IPA cell click → speak
  document.querySelectorAll('.ipa-cell').forEach(cell => {
    cell.addEventListener('click', () => speak(cell.dataset.word));
  });

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const area = document.getElementById('quiz-area');
  if (quizIndex >= minimalPairsQuiz.length) {
    area.innerHTML = `
      <div class="card" style="text-align: center;">
        <div style="font-size: 2rem;">🎉</div>
        <div style="font-size: var(--fs-lg); font-weight: 600; margin-top: var(--space-2);">Hoàn thành!</div>
        <div style="color: var(--text-secondary); margin-top: var(--space-2);">${quizScore}/${minimalPairsQuiz.length} đúng</div>
        <button class="streak-checkin-btn" style="margin-top: var(--space-4);" id="quiz-restart">🔄 Làm lại</button>
      </div>
    `;
    document.getElementById('quiz-restart')?.addEventListener('click', () => {
      quizIndex = 0;
      quizScore = 0;
      renderQuizQuestion();
    });
    return;
  }

  const q = minimalPairsQuiz[quizIndex];
  area.innerHTML = `
    <div class="card" style="margin-bottom: var(--space-3);">
      <div style="text-align: center; margin-bottom: var(--space-3);">
        <span style="color: var(--accent-light); font-weight: 600;">${q.phonemes}</span>
        <span style="color: var(--text-muted); font-size: var(--fs-sm);"> — Câu ${quizIndex + 1}/${minimalPairsQuiz.length}</span>
      </div>
      <div class="mp-pair">
        ${q.pair.map((word, i) => `
          <button class="mp-btn" data-idx="${i}">${word}</button>
        `).join('')}
      </div>
    </div>
  `;

  // Speak the correct word
  speak(q.pair[q.correct]);

  document.querySelectorAll('.mp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      const correct = idx === q.correct;
      if (correct) {
        btn.classList.add('correct');
        quizScore++;
      } else {
        btn.classList.add('wrong');
        document.querySelector(`.mp-btn[data-idx="${q.correct}"]`).classList.add('correct');
      }
      // Disable all buttons
      document.querySelectorAll('.mp-btn').forEach(b => b.style.pointerEvents = 'none');
      // Next after delay
      setTimeout(() => {
        quizIndex++;
        renderQuizQuestion();
      }, 1200);
    });
  });
}
