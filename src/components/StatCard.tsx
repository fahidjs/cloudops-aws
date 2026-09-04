interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

function StatCard({
  title,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span>{title}</span>
      </div>

      <h2>{value}</h2>

      <p>{description}</p>
    </div>
  );
}

export default StatCard;