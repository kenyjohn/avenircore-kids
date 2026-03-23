const stats = [
  { num: '500+', label: 'Waitlist signups' },
  { num: '6–14', label: 'Age range served' },
  { num: '10+', label: 'Free activities' },
  { num: '100%', label: 'COPPA compliant' },
];

const StatsStrip = () => (
  <div className="stats-strip">
    <div className="container">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StatsStrip;
