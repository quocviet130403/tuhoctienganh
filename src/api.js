// API client — fast local-first with backend sync
// Uses localStorage as primary storage, syncs to backend when available

const API_BASE = '/api';
const STORAGE_KEY = 'english_daily_progress';
const API_TIMEOUT = 1500; // 1.5s timeout — never block UI

// ==========================================
// LOCAL STORAGE (primary — instant, offline)
// ==========================================

function getLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaults();
  } catch {
    return getDefaults();
  }
}

function saveLocal(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage save failed', e);
  }
}

function getDefaults() {
  return {
    streak: { current: 0, best: 0, lastActiveDate: null },
    flashcards: {},
    lessons: {},
    dailyLog: [],
    settings: { dailyGoal: 15 }
  };
}

// ==========================================
// API WITH TIMEOUT (secondary — async sync)
// ==========================================

function fetchWithTimeout(url, options = {}, timeout = API_TIMEOUT) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
  ]);
}

async function syncToBackend(data) {
  try {
    await fetchWithTimeout(`${API_BASE}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch {
    // Silent fail — local storage is the source of truth
  }
}

// ==========================================
// PUBLIC API — fast, local-first
// ==========================================

export async function getProgress() {
  // Always return local data instantly
  const local = getLocal();

  // Try to sync from backend in background (non-blocking)
  try {
    const res = await fetchWithTimeout(`${API_BASE}/progress`);
    if (res.ok) {
      const remote = await res.json();
      // Merge: keep whichever has more progress
      const merged = mergeProgress(local, remote);
      saveLocal(merged);
      return merged;
    }
  } catch {
    // Backend unavailable — use local data (instant)
  }

  return local;
}

export async function saveProgress(data) {
  // Save locally first (instant)
  const current = getLocal();
  const updated = { ...current };

  if (data.streak) updated.streak = { ...current.streak, ...data.streak };
  if (data.flashcards) updated.flashcards = { ...current.flashcards, ...data.flashcards };
  if (data.lessons) updated.lessons = { ...current.lessons, ...data.lessons };
  if (data.dailyLog) updated.dailyLog = [...new Set([...(current.dailyLog || []), ...data.dailyLog])];

  saveLocal(updated);

  // Sync to backend in background (non-blocking)
  syncToBackend(updated);

  return { ok: true, data: updated };
}

export async function checkinStreak() {
  const data = getLocal();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (data.streak.lastActiveDate === today) {
    return { ok: true, message: 'Đã check-in hôm nay rồi', data: data.streak };
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
  if (!data.dailyLog) data.dailyLog = [];
  if (!data.dailyLog.includes(today)) data.dailyLog.push(today);

  saveLocal(data);
  syncToBackend(data);

  return { ok: true, data: data.streak };
}

export async function resetProgress() {
  const defaults = getDefaults();
  saveLocal(defaults);
  syncToBackend(defaults);
  return { ok: true, message: 'Đã reset tiến độ' };
}

// Merge: pick whichever has more data
function mergeProgress(local, remote) {
  if (!remote) return local;
  const merged = { ...local };

  // Streak: keep higher
  if (remote.streak) {
    merged.streak = {
      current: Math.max(local.streak?.current || 0, remote.streak?.current || 0),
      best: Math.max(local.streak?.best || 0, remote.streak?.best || 0),
      lastActiveDate: local.streak?.lastActiveDate > remote.streak?.lastActiveDate
        ? local.streak.lastActiveDate : remote.streak.lastActiveDate
    };
  }

  // Flashcards: merge all
  merged.flashcards = { ...(remote.flashcards || {}), ...(local.flashcards || {}) };

  // Lessons: merge all
  merged.lessons = { ...(remote.lessons || {}), ...(local.lessons || {}) };

  // DailyLog: union
  merged.dailyLog = [...new Set([...(local.dailyLog || []), ...(remote.dailyLog || [])])];

  return merged;
}
