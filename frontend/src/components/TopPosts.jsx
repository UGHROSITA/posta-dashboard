import { PLATFORMS } from '../data/platforms.js';

const n = (v) => new Intl.NumberFormat('es-MX').format(v);

export default function TopPosts({ posts }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Publicación</th>
            <th>Plataforma</th>
            <th>Fecha</th>
            <th className="num">Vistas</th>
            <th className="num">Likes</th>
            <th className="num">Comentarios</th>
            <th className="num">Compartidos</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id}>
              <td>
                <a href={p.url} target="_blank" rel="noreferrer">
                  {p.title}
                </a>
              </td>
              <td>
                <span className="pill" style={{ '--c': PLATFORMS[p.platform].color }}>
                  {PLATFORMS[p.platform].label}
                </span>
              </td>
              <td>{p.date}</td>
              <td className="num">{n(p.views)}</td>
              <td className="num">{n(p.likes)}</td>
              <td className="num">{n(p.comments)}</td>
              <td className="num">{n(p.shares)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
