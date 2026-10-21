import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PLATFORMS } from '../data/platforms.js';

export default function ViewsChart({ series, platforms }) {
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={series} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} stroke="var(--muted)" fontSize={12} />
          <YAxis stroke="var(--muted)" fontSize={12} width={48} />
          <Tooltip />
          <Legend />
          {platforms.map((id) => (
            <Line
              key={id}
              type="monotone"
              dataKey={id}
              name={PLATFORMS[id].label}
              stroke={PLATFORMS[id].color}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
