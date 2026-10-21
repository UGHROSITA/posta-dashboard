// Datos de ejemplo para las plataformas que aún no tienen credenciales.
// Misma forma que el resto de servicios:
// { platform, followers, reach, views, interactions, daily: [{date, views, interactions}], topPosts: [...] }

export function mockPlatform(platform, days, seed = 1) {
  let s = seed * 7919;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const base = 800 + seed * 450;
  const today = new Date();

  const daily = Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    const views = Math.round(base * (0.6 + rand() * 0.9));
    return { date: d.toISOString().slice(0, 10), views, interactions: Math.round(views * (0.04 + rand() * 0.06)) };
  });

  const views = daily.reduce((n, d) => n + d.views, 0);
  const interactions = daily.reduce((n, d) => n + d.interactions, 0);

  const topPosts = Array.from({ length: 5 }, (_, i) => ({
    id: `${platform}-${i + 1}`,
    title: `Publicación ${i + 1} de ${platform}`,
    date: daily[Math.max(0, days - 1 - i * 3)].date,
    views: Math.round(base * (4 - i * 0.6)),
    likes: Math.round(base * (0.5 - i * 0.07)),
    comments: 60 - i * 8,
    shares: 40 - i * 6,
    url: '#',
  }));

  return { platform, followers: base * 12, reach: Math.round(views * 0.72), views, interactions, daily, topPosts };
}
