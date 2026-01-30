import { Book, Box, Wrench, Globe, GraduationCap, ShoppingCart } from 'lucide-react'
import './platform-diagram.css'

const features = [
  {
    icon: Book,
    title: 'Centralized',
    title2: 'Knowledge Hub',
    subtitle: 'Online Catalog &',
    subtitle2: 'Documentation',
    angle: -90, // top
    labelOffset: 215, // closer to icon
  },
  {
    icon: Box,
    title: 'Immersive 3D',
    subtitle: 'Visualization',
    angle: -30, // top-right
  },
  {
    icon: Wrench,
    title: 'Interactive 3D',
    subtitle: 'configurators & auto quotation',
    angle: 30, // bottom-right
  },
  {
    icon: Globe,
    title: 'Unified',
    subtitle: 'Web portal',
    angle: 90, // bottom
    labelOffset: 200, // closer to icon
  },
  {
    icon: GraduationCap,
    title: 'Guided Support',
    subtitle: '& Education',
    angle: 150, // bottom-left
  },
  {
    icon: ShoppingCart,
    title: 'Seamless Sales',
    subtitle: 'Channels',
    angle: 210, // top-left
  },
]

export default function PlatformDiagram() {
  // Coordinate system - viewSize includes margin for labels
  const viewSize = 550
  const centerX = viewSize / 2
  const centerY = viewSize / 2
  const orbitRadius = 145
  const labelRadius = 235 // Labels positioned further out

  const getPosition = (angleDeg, radius) => {
    const angleRad = (angleDeg * Math.PI) / 180
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
    }
  }

  return (
    <div className="platform-diagram">
      <svg className="diagram-svg" viewBox={`0 0 ${viewSize} ${viewSize}`}>
        {/* Radiating pulse wave from center */}
        <circle cx={centerX} cy={centerY} r="65" className="pulse-wave" />

        {/* Orbit circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          className="orbit-ring"
        />

        {/* Connection lines from center to orbit */}
        {features.map((feature, index) => {
          const pos = getPosition(feature.angle, orbitRadius)
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={pos.x}
              y2={pos.y}
              className="connection-line"
              style={{ animationDelay: `${0.8 + index * 0.1}s, ${1.5 + index * 0.1}s` }}
            />
          )
        })}

        {/* Small connector dots on the orbit */}
        {features.map((feature, index) => {
          const pos = getPosition(feature.angle, orbitRadius)
          return (
            <circle
              key={`dot-${index}`}
              cx={pos.x}
              cy={pos.y}
              r={4}
              className="connector-dot"
              style={{ animationDelay: `${1.2 + index * 0.1}s, ${2 + index * 0.1}s` }}
            />
          )
        })}
      </svg>

      {/* Center node */}
      <div className="center-node">
        <span className="center-title">BIMTLY</span>
        <span className="center-subtitle">Platform</span>
        <span className="center-desc">All-in-one online platform</span>
      </div>

      {/* Feature nodes - icons on orbit, labels outside */}
      {features.map((feature, index) => {
        const iconPos = getPosition(feature.angle, orbitRadius)
        const labelPos = getPosition(feature.angle, feature.labelOffset || labelRadius)
        const Icon = feature.icon

        return (
          <div key={index} className="feature-node">
            {/* Icon on the orbit */}
            <div
              className="feature-icon-wrapper"
              style={{
                left: `${(iconPos.x / viewSize) * 100}%`,
                top: `${(iconPos.y / viewSize) * 100}%`,
                animationDelay: `${1.4 + index * 0.15}s, ${3 + index * 4}s`,
              }}
            >
              <Icon className="feature-icon" size={22} strokeWidth={1.5} />
            </div>

            {/* Label outside the orbit */}
            <div
              className="feature-label"
              style={{
                left: `${(labelPos.x / viewSize) * 100}%`,
                top: `${(labelPos.y / viewSize) * 100}%`,
                animationDelay: `${1.7 + index * 0.15}s`,
              }}
            >
              <span className="feature-title">
                {feature.title}
                {feature.title2 && <><br />{feature.title2}</>}
              </span>
              <span className="feature-subtitle">
                {feature.subtitle}
                {feature.subtitle2 && <><br />{feature.subtitle2}</>}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
