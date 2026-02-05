/**
 * FourPillarsDiagram - Simplified platform diagram showing the 4 pillars:
 * Show → Configure → Quote → Sell
 *
 * Central blue circle with 4 pillars animating one after another.
 */

import { Eye, Settings, FileText, ShoppingBag } from 'lucide-react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import './four-pillars.css';

interface Pillar {
  id: string;
  icon: React.ElementType;
  stage: string;
  title: string;
  subtitle: string;
  angle: number; // Position around center (degrees)
}

const PILLARS: Pillar[] = [
  {
    id: 'show',
    icon: Eye,
    stage: 'Show',
    title: '3D Product Experience',
    subtitle: 'Help buyers understand products faster and choose with confidence.',
    angle: -45, // top-right
  },
  {
    id: 'configure',
    icon: Settings,
    stage: 'Configure',
    title: 'Product Configuration',
    subtitle: 'Rules-based configuration that prevents errors and invalid combinations.',
    angle: 45, // bottom-right
  },
  {
    id: 'quote',
    icon: FileText,
    stage: 'Quote',
    title: 'Instant Pricing & Quotes',
    subtitle: 'Accurate, automated quotes generated in minutes, not days.',
    angle: 135, // bottom-left
  },
  {
    id: 'sell',
    icon: ShoppingBag,
    stage: 'Sell',
    title: 'From Quote to Order',
    subtitle: 'Close deals and turn approved quotes into orders.',
    angle: -135, // top-left
  },
];

interface FourPillarsDiagramProps {
  mode?: 'web' | 'video';
}

export default function FourPillarsDiagram({ mode = 'web' }: FourPillarsDiagramProps) {
  // Remotion hooks (only used in video mode)
  let frame = 0;
  let fps = 30;

  if (mode === 'video') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    frame = useCurrentFrame();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const config = useVideoConfig();
    fps = config.fps;
  }

  // Layout dimensions
  const viewSize = 600;
  const centerX = viewSize / 2;
  const centerY = viewSize / 2;
  const orbitRadius = 160;
  const labelRadius = 250;

  const getPosition = (angleDeg: number, radius: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
    };
  };

  // Animation values for video mode
  const getCenterAnim = () => {
    if (mode !== 'video') return { opacity: 1, scale: 1 };

    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
    const scaleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
    return { opacity, scale: scaleSpring };
  };

  const getOrbitAnim = () => {
    if (mode !== 'video') return { opacity: 0.25, dashOffset: 0 };

    const opacity = interpolate(frame, [15, 35], [0, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const dashOffset = interpolate(frame, [15, 60], [1200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return { opacity, dashOffset };
  };

  const getPillarAnim = (index: number) => {
    if (mode !== 'video') return { opacity: 1, scale: 1, labelOpacity: 1, labelY: 0 };

    // Each pillar appears with stagger: 90 frames apart (3 seconds each)
    const pillarDelay = 60 + index * 90; // Start after center, stagger by 3s

    // Icon animation
    const iconOpacity = interpolate(
      frame,
      [pillarDelay, pillarDelay + 20],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    const iconScale = spring({
      frame: Math.max(0, frame - pillarDelay),
      fps,
      config: { damping: 10, stiffness: 120 },
    });

    // Label animation (slightly after icon)
    const labelDelay = pillarDelay + 15;
    const labelOpacity = interpolate(
      frame,
      [labelDelay, labelDelay + 25],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    const labelY = interpolate(
      frame,
      [labelDelay, labelDelay + 25],
      [20, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return { opacity: iconOpacity, scale: iconScale, labelOpacity, labelY };
  };

  const getLineAnim = (index: number) => {
    if (mode !== 'video') return { opacity: 1, dashOffset: 0 };

    const lineDelay = 50 + index * 90;
    const opacity = interpolate(
      frame,
      [lineDelay, lineDelay + 20],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    const dashOffset = interpolate(
      frame,
      [lineDelay, lineDelay + 30],
      [200, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    return { opacity, dashOffset };
  };

  const centerAnim = getCenterAnim();
  const orbitAnim = getOrbitAnim();
  const noAnim = mode !== 'web' ? ' no-css-anim' : '';

  return (
    <div className={`four-pillars ${mode === 'video' ? 'four-pillars--video' : ''}`}>
      <svg className="pillars-svg" viewBox={`0 0 ${viewSize} ${viewSize}`}>
        {/* Orbit circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          className={`pillars-orbit${noAnim}`}
          style={mode === 'video' ? {
            opacity: orbitAnim.opacity,
            strokeDasharray: '1200',
            strokeDashoffset: orbitAnim.dashOffset,
          } : undefined}
        />

        {/* Connection lines */}
        {PILLARS.map((pillar, index) => {
          const pos = getPosition(pillar.angle, orbitRadius);
          const lineAnim = getLineAnim(index);

          return (
            <line
              key={`line-${pillar.id}`}
              x1={centerX}
              y1={centerY}
              x2={pos.x}
              y2={pos.y}
              className={`pillars-line${noAnim}`}
              style={mode === 'video' ? {
                opacity: lineAnim.opacity,
                strokeDashoffset: lineAnim.dashOffset,
              } : { animationDelay: `${0.8 + index * 0.15}s` }}
            />
          );
        })}

        {/* Connector dots on orbit */}
        {PILLARS.map((pillar, index) => {
          const pos = getPosition(pillar.angle, orbitRadius);
          const anim = getPillarAnim(index);

          return (
            <circle
              key={`dot-${pillar.id}`}
              cx={pos.x}
              cy={pos.y}
              r={mode === 'video' ? 5 * anim.scale : 5}
              className={`pillars-dot${noAnim}`}
              style={mode === 'video' ? { opacity: anim.opacity } : { animationDelay: `${1 + index * 0.15}s` }}
            />
          );
        })}
      </svg>

      {/* Center node */}
      <div
        className={`pillars-center${noAnim}`}
        style={mode === 'video' ? {
          opacity: centerAnim.opacity,
          transform: `translate(-50%, -50%) scale(${centerAnim.scale})`,
        } : undefined}
      >
        <span className="pillars-center-title">BIMTLY</span>
        <span className="pillars-center-subtitle">Platform</span>
      </div>

      {/* Pillar nodes */}
      {PILLARS.map((pillar, index) => {
        const iconPos = getPosition(pillar.angle, orbitRadius);
        const labelPos = getPosition(pillar.angle, labelRadius);
        const Icon = pillar.icon;
        const anim = getPillarAnim(index);

        // Adjust label position based on angle for better layout
        const isVertical = pillar.angle === -90 || pillar.angle === 90;
        const isLeft = pillar.angle === 180;
        const isRight = pillar.angle === 0;

        return (
          <div key={pillar.id} className="pillar-node">
            {/* Icon on orbit */}
            <div
              className={`pillar-icon${noAnim}`}
              style={{
                left: `${(iconPos.x / viewSize) * 100}%`,
                top: `${(iconPos.y / viewSize) * 100}%`,
                ...(mode === 'video' ? {
                  opacity: anim.opacity,
                  transform: `translate(-50%, -50%) scale(${anim.scale})`,
                } : { animationDelay: `${1.2 + index * 0.15}s` }),
              }}
            >
              <Icon size={24} strokeWidth={1.5} />
            </div>

            {/* Label outside orbit */}
            <div
              className={`pillar-label${noAnim} pillar-label--${pillar.id}`}
              style={{
                left: `${(labelPos.x / viewSize) * 100}%`,
                top: `${(labelPos.y / viewSize) * 100}%`,
                textAlign: isLeft ? 'right' : isRight ? 'left' : 'center',
                ...(mode === 'video' ? {
                  opacity: anim.labelOpacity,
                  transform: `translate(-50%, -50%) translateY(${anim.labelY}px)`,
                } : { animationDelay: `${1.5 + index * 0.15}s` }),
              }}
            >
              <span className="pillar-stage">{pillar.stage}</span>
              <span className="pillar-title">{pillar.title}</span>
              <span className="pillar-subtitle">{pillar.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
