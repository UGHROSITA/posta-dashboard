import { Bar, BarChart, Cell, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PLATFORMS } from '../data/platforms.js';

export default function PlatformBars({ stats }) {
  const rows = stats.map((s) => ({ id: s.platform, name: PLATFORMS[s.platform].label, views: s.views }));

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={rows} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" horizontal={false} />
          <XAxis type="number" stroke="var(--muted)" fontSize={12} />
          <YAxis type="category" dataKey="name" stroke="var(--muted)" fontSize={12} width={80} />
          <Tooltip />
          <Bar dataKey="views" name="Vistas" radius={[0, 4, 4, 0]}>
            {rows.map((r) => (
              <Cell key={r.id} fill={PLATFORMS[r.id].color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
