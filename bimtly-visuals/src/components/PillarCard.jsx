export default function PillarCard({ icon, title, desc }) {
  return (
    <div className="pillar">
      <div className="pillar-icon">{icon}</div>
      <div className="pillar-title">{title}</div>
      <div className="pillar-desc">{desc}</div>
    </div>
  )
}
