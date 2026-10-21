# Posta Dashboard

Dashboard de estadísticas de publicaciones en Instagram, Facebook, YouTube y TikTok.

- `frontend/` — React + Vite + Recharts
- `backend/` — Node + Express (conectores por plataforma; sin credenciales devuelve datos de ejemplo)

## Requisitos

- [Node.js](https://nodejs.org/) 20 o superior (`node -v`)
- [Git](https://git-scm.com/)

## Primeros pasos

```bash
git clone <URL-DEL-REPO>
cd posta-dashboard
npm install
npm run dev
```

- Front: http://localhost:5173
- API: http://localhost:4000/api/stats

Solo el front: `npm run dev:front` (usa datos de ejemplo si no hay backend).

## Credenciales de las APIs (opcional por ahora)

```bash
cp backend/.env.example backend/.env
```

Llena las claves en `backend/.env`. **Nunca subas `.env` a git** (ya está en `.gitignore`); pásense las claves por un canal privado.

## Forma de los datos

Cada plataforma devuelve (`GET /api/stats?days=30`):

```json
{
  "platform": "instagram",
  "followers": 0, "reach": 0, "views": 0, "interactions": 0,
  "daily": [{ "date": "2026-10-01", "views": 0, "interactions": 0 }],
  "topPosts": [{ "id": "", "title": "", "date": "", "views": 0, "likes": 0, "comments": 0, "shares": 0, "url": "" }]
}
```

Para conectar una red real, edita `getStats` en `backend/src/services/<plataforma>.js` y devuelve esta forma.

## Flujo de trabajo en equipo

```bash
git pull                      # antes de empezar
git checkout -b mi-cambio     # una rama por tarea
# ...trabajar...
git add .
git commit -m "Describe el cambio"
git push -u origin mi-cambio  # y abrir Pull Request en GitHub
```
