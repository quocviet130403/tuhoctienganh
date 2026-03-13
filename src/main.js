// Main entry point — wire up router and render app

import { route, startRouter } from './router.js';
import { renderNavigation } from './components/Navigation.js';
import { renderDashboard } from './components/Dashboard.js';
import { renderFlashCards } from './components/FlashCards.js';
import { renderLessonList, renderLesson } from './components/LessonViewer.js';
import { renderPronunciation } from './components/Pronunciation.js';

// Setup routes
route('/', () => renderDashboard());
route('/flashcards', () => renderFlashCards());
route('/lessons', () => renderLessonList());
route('/lesson/:day', (day) => renderLesson(day));
route('/pronunciation', () => renderPronunciation());

// Initialize
renderNavigation();
startRouter();
