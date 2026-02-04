import { Book, Box, Wrench, Globe, GraduationCap, ShoppingCart, LucideIcon } from 'lucide-react'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import { useAnimationValues, type AnimationValues } from './useAnimationValues'
import { type DiagramMode } from './animation-config'
import './platform-diagram.css'

interface Feature {
  icon: LucideIcon
  title: string
  title2?: string
  subtitle: string
  subtitle2?: string
  angle: number
  labelOffset?: number
}

const features: Feature[] = [
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
    title: 'E-commerce Ready',
    subtitle: 'Storefront & Integrations',
    angle: 210, // top-left
  },
]

interface PlatformDiagramProps {
  mode?: DiagramMode
}

export default function PlatformDiagram({ mode = 'web' }: PlatformDiagramProps) {
  // Get frame/fps for video mode (hooks must be called unconditionally)
  let frame = 0
  let fps = 30

  // Only call Remotion hooks in video mode
  if (mode === 'video') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    frame = useCurrentFrame()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const config = useVideoConfig()
    fps = config.fps
  }

  const anim = useAnimationValues(mode, frame, fps)

  // Coordinate system - viewSize includes margin for labels
  const viewSize = 550
  const centerX = viewSize / 2
  const centerY = viewSize / 2
  const orbitRadius = 145
  const labelRadius = 235 // Labels positioned further out

  const getPosition = (angleDeg: number, radius: number) => {
    const angleRad = (angleDeg * Math.PI) / 180
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
    }
  }

  // CSS class modifier for disabling CSS animations in video/static mode
  const noAnim = mode !== 'web' ? ' no-css-anim' : ''

  // Container class - add mode for video/static sizing
  const containerClass = mode !== 'web' ? 'platform-diagram platform-diagram--fullsize' : 'platform-diagram'

  return (
    <div className={containerClass}>
      <svg className="diagram-svg" viewBox={`0 0 ${viewSize} ${viewSize}`}>
        {/* Radiating pulse wave from center - hidden in video mode */}
        {mode === 'web' && (
          <circle cx={centerX} cy={centerY} r="65" className="pulse-wave" />
        )}

        {/* Orbit circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          className={`orbit-ring${noAnim}`}
          style={mode === 'video' ? {
            opacity: anim.orbitOpacity,
            strokeDasharray: '1000',
            strokeDashoffset: anim.orbitDashOffset,
          } : undefined}
        />

        {/* Connection lines from center to orbit */}
        {features.map((feature, index) => {
          const pos = getPosition(feature.angle, orbitRadius)
          const videoStyle = mode === 'video' ? {
            opacity: anim.getLineOpacity(index),
            strokeDashoffset: anim.getLineDashOffset(index),
          } : undefined

          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={pos.x}
              y2={pos.y}
              className={`connection-line${noAnim}`}
              style={videoStyle || { animationDelay: `${0.8 + index * 0.1}s, ${1.5 + index * 0.1}s` }}
            />
          )
        })}

        {/* Small connector dots on the orbit */}
        {features.map((feature, index) => {
          const pos = getPosition(feature.angle, orbitRadius)
          const videoStyle = mode === 'video' ? {
            opacity: anim.getDotOpacity(index),
          } : undefined

          return (
            <circle
              key={`dot-${index}`}
              cx={pos.x}
              cy={pos.y}
              r={mode === 'video' ? anim.getDotR(index) : 4}
              className={`connector-dot${noAnim}`}
              style={videoStyle || { animationDelay: `${1.2 + index * 0.1}s, ${2 + index * 0.1}s` }}
            />
          )
        })}
      </svg>

      {/* Center node */}
      <div
        className={`center-node${noAnim}`}
        style={mode === 'video' ? {
          opacity: anim.centerOpacity,
          transform: `translate(-50%, -50%) scale(${anim.centerScale})`,
        } : undefined}
      >
        <span className="center-title">BIMTLY</span>
        <span className="center-subtitle">Platform</span>
        <span className="center-desc">All-in-one online platform</span>
      </div>

      {/* Feature nodes - icons on orbit, labels outside */}
      {features.map((feature, index) => {
        const iconPos = getPosition(feature.angle, orbitRadius)
        const labelPos = getPosition(feature.angle, feature.labelOffset || labelRadius)
        const Icon = feature.icon

        const iconVideoStyle = mode === 'video' ? {
          opacity: anim.getIconOpacity(index),
          transform: `translate(-50%, -50%) scale(${anim.getIconScale(index)})`,
        } : undefined

        const labelVideoStyle = mode === 'video' ? {
          opacity: anim.getLabelOpacity(index),
          transform: `translate(-50%, -50%) translateY(${anim.getLabelY(index)}px)`,
        } : undefined

        return (
          <div key={index} className="feature-node">
            {/* Icon on the orbit */}
            <div
              className={`feature-icon-wrapper${noAnim}`}
              style={{
                left: `${(iconPos.x / viewSize) * 100}%`,
                top: `${(iconPos.y / viewSize) * 100}%`,
                ...(iconVideoStyle || { animationDelay: `${1.4 + index * 0.15}s, ${3 + index * 4}s` }),
              }}
            >
              <Icon className="feature-icon" size={22} strokeWidth={1.5} />
            </div>

            {/* Label outside the orbit */}
            <div
              className={`feature-label${noAnim}`}
              style={{
                left: `${(labelPos.x / viewSize) * 100}%`,
                top: `${(labelPos.y / viewSize) * 100}%`,
                ...(labelVideoStyle || { animationDelay: `${1.7 + index * 0.15}s` }),
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
