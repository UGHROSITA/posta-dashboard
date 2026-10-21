import { mockStats } from './data/mock.js';

// Intenta el backend; si no está disponible, cae a datos de ejemplo
// para poder trabajar el front sin levantar nada más.
export async function fetchStats(days = 30) {
  try {
    const res = await fetch(`/api/stats?days=${days}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const stats = await res.json();
    return { stats, source: 'api' };
  } catch {
    return { stats: mockStats(days), source: 'mock' };
  }
}
