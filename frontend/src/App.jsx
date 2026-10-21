import { useEffect, useMemo, useState } from 'react';
import { fetchStats } from './api.js';
import { PLATFORMS, PLATFORM_IDS } from './data/platforms.js';
import KpiCard from './components/KpiCard.jsx';
import ViewsChart from './components/ViewsChart.jsx';
import PlatformBars from './components/PlatformBars.jsx';
import TopPosts from './components/TopPosts.jsx';

const RANGES = [7, 14, 30, 90];
const fmt = (n) => new Intl.NumberFormat('es-MX', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

export default function App() {
  const [days, setDays] = useState(30);
  const [platform, setPlatform] = useState('all');
  const [data, setData] = useState({ stats: [], source: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchStats(days).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [days]);

  const selected = useMemo(
    () => (platform === 'all' ? data.stats : data.stats.filter((s) => s.platform === platform)),
    [data, platform]
  );

  const totals = useMemo(() => {
    const sum = (key) => selected.reduce((n, s) => n + s[key], 0);
    const rate = sum('views') ? (sum('interactions') / sum('views')) * 100 : 0;
    return {
      followers: sum('followers'),
      reach: sum('reach'),
      views: sum('views'),
      interactions: sum('interactions'),
      rate,
    };
  }, [selected]);

  // Serie diaria: una línea por plataforma seleccionada
  const series = useMemo(() => {
    const byDate = new Map();
    selected.forEach((s) =>
      s.daily.forEach((d) => {
        const row = byDate.get(d.date) ?? { date: d.date };
        row[s.platform] = d.views;
        byDate.set(d.date, row);
      })
    );
    return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
  }, [selected]);

  const posts = useMemo(
    () =>
      selected
        .flatMap((s) => s.topPosts.map((p) => ({ ...p, platform: s.platform })))
        .sort((a, b) => b.views - a.views)
        .slice(0, 8),
    [selected]
  );

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="logo">P</span>
          <div>
            <h1>Posta</h1>
            <p>Estadísticas de redes sociales</p>
          </div>
        </div>
        <div className="controls">
          <div className="segmented" role="group" aria-label="Periodo">
            {RANGES.map((r) => (
              <button key={r} className={r === days ? 'active' : ''} onClick={() => setDays(r)}>
                {r} días
              </button>
            ))}
          </div>
        </div>
      </header>

      <nav className="tabs" aria-label="Plataforma">
        <button className={platform === 'all' ? 'active' : ''} onClick={() => setPlatform('all')}>
          Todas
        </button>
        {PLATFORM_IDS.map((id) => (
          <button key={id} className={platform === id ? 'active' : ''} onClick={() => setPlatform(id)}>
            <i style={{ background: PLATFORMS[id].color }} />
            {PLATFORMS[id].label}
          </button>
        ))}
      </nav>

      {data.source === 'mock' && (
        <div className="banner">Mostrando datos de ejemplo — el backend no está conectado.</div>
      )}

      {loading ? (
        <p className="loading">Cargando…</p>
      ) : (
        <main>
          <section className="kpis">
            <KpiCard label="Seguidores" value={fmt(totals.followers)} />
            <KpiCard label="Alcance" value={fmt(totals.reach)} />
            <KpiCard label="Vistas" value={fmt(totals.views)} />
            <KpiCard label="Interacciones" value={fmt(totals.interactions)} />
            <KpiCard label="Tasa de interacción" value={`${totals.rate.toFixed(1)}%`} />
          </section>

          <section className="grid">
            <div className="card wide">
              <h2>Vistas por día</h2>
              <ViewsChart series={series} platforms={selected.map((s) => s.platform)} />
            </div>
            <div className="card">
              <h2>Vistas por plataforma</h2>
              <PlatformBars stats={data.stats} />
            </div>
          </section>

          <section className="card">
            <h2>Mejores publicaciones</h2>
            <TopPosts posts={posts} />
          </section>
        </main>
      )}
    </div>
  );
}
