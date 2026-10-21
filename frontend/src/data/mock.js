import { PLATFORM_IDS } from './platforms.js';

// Datos de ejemplo con la misma forma que devuelve el backend (GET /api/stats).
// Se usan cuando el backend no está corriendo.

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function buildPlatform(id, index, days) {
  const rand = seeded(1000 + index * 77);
  const base = 800 + index * 450;
  const today = new Date();

  const daily = Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    const views = Math.round(base * (0.6 + rand() * 0.9));
    return {
      date: d.toISOString().slice(0, 10),
      views,
      interactions: Math.round(views * (0.04 + rand() * 0.06)),
    };
  });

  const views = daily.reduce((n, d) => n + d.views, 0);
  const interactions = daily.reduce((n, d) => n + d.interactions, 0);

  const topPosts = Array.from({ length: 5 }, (_, i) => ({
    id: `${id}-${i + 1}`,
    title: `Publicación ${i + 1} de ${id}`,
    date: daily[Math.max(0, days - 1 - i * 3)].date,
    views: Math.round(base * (4 - i * 0.6) * (0.8 + rand() * 0.4)),
    likes: Math.round(base * (0.5 - i * 0.07) * (0.8 + rand() * 0.4)),
    comments: Math.round(60 - i * 8 + rand() * 20),
    shares: Math.round(40 - i * 6 + rand() * 15),
    url: '#',
  }));

  return {
    platform: id,
    followers: Math.round(base * 12 + rand() * 500),
    reach: Math.round(views * 0.72),
    views,
    interactions,
    daily,
    topPosts,
  };
}

export function mockStats(days = 30) {
  return PLATFORM_IDS.map((id, i) => buildPlatform(id, i, days));
}
