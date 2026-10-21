import express from 'express';
import cors from 'cors';
import { getAllStats, connectionStatus } from './services/index.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Qué plataformas tienen credenciales configuradas (el resto devuelve datos de ejemplo)
app.get('/api/platforms', (_req, res) => res.json(connectionStatus()));

app.get('/api/stats', async (req, res) => {
  const days = Math.min(Math.max(parseInt(req.query.days, 10) || 30, 1), 365);
  try {
    res.json(await getAllStats(days));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudieron obtener las estadísticas' });
  }
});

app.listen(port, () => console.log(`API de Posta en http://localhost:${port}`));
