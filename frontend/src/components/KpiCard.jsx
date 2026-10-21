export default function KpiCard({ label, value }) {
  return (
    <div className="card kpi">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
