// Lessons index — aggregates all months into a single dataset
// 180 days total across 6 months

import { month1Lessons } from './lessons-month1.js';
import { month2Lessons, month3Lessons, month4Lessons, month5Lessons, month6Lessons } from './lessons-months2to6.js';

const allLessons = [
  ...month1Lessons,
  ...month2Lessons,
  ...month3Lessons,
  ...month4Lessons,
  ...month5Lessons,
  ...month6Lessons,
];

export function getAllLessons() {
  return allLessons;
}

export function getLessonByDay(day) {
  return allLessons.find(l => l.day === day) || null;
}

export function getLessonsByMonth(month) {
  const ranges = { 1: [1, 30], 2: [31, 60], 3: [61, 90], 4: [91, 120], 5: [121, 150], 6: [151, 180] };
  const [start, end] = ranges[month] || [1, 30];
  return allLessons.filter(l => l.day >= start && l.day <= end);
}

export function getMonthInfo(month) {
  const info = {
    1: { name: 'Tháng 1', subtitle: 'Nền Tảng Phát Âm', icon: '🔤', desc: 'IPA, nguyên âm, phụ âm, trọng âm, ngữ pháp cơ bản' },
    2: { name: 'Tháng 2', subtitle: 'Giao Tiếp IT Hàng Ngày', icon: '💬', desc: 'Standup, meetings, email, tech talks, feedback' },
    3: { name: 'Tháng 3', subtitle: 'Backend Stack Chuyên Sâu', icon: '🔧', desc: 'Go, NestJS, MySQL, MongoDB, Redis, Kafka, Docker, AWS, Linux/VPS' },
    4: { name: 'Tháng 4', subtitle: 'Senior Backend Communication', icon: '🏢', desc: 'Code review, system design (Go+Kafka+Redis+MySQL), architecture decisions' },
    5: { name: 'Tháng 5', subtitle: 'Phỏng Vấn Behavioral — Backend', icon: '🎯', desc: 'STAR stories: Go bugs, DB migration, microservices refactoring' },
    6: { name: 'Tháng 6', subtitle: 'Phỏng Vấn Technical — Backend', icon: '🚀', desc: 'Go coding, system design (URL shortener, chat, e-commerce), mock interviews' },
  };
  return info[month] || info[1];
}
