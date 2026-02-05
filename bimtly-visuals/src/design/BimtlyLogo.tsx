/**
 * BimtlyLogo - Reusable animated logo component for videos
 *
 * Responsive sizing based on video dimensions. Fills available space.
 *
 * Usage:
 *   <BimtlyLogo frame={frame} fps={fps} width={width} height={height} />
 */

import { interpolate } from 'remotion';

interface BimtlyLogoProps {
  frame: number;
  fps: number;
  width: number;
  height: number;
  showSubtitle?: boolean;
  /** Size as percentage of smaller dimension (0-1). Default 0.45 */
  sizeRatio?: number;
}

export const BimtlyLogo: React.FC<BimtlyLogoProps> = ({
  frame,
  fps,
  width,
  height,
  showSubtitle = true,
  sizeRatio = 0.45,
}) => {
  // Animated glow intensity
  const glowIntensity = 0.3 + Math.sin(frame * 0.08) * 0.1;

  // Responsive sizing: logo fills percentage of smaller dimension
  const smallerDim = Math.min(width, height);
  const logoSize = smallerDim * sizeRatio;

  // Text sizes proportional to logo
  const titleSize = logoSize * 0.19;  // ~42px at 220px logo
  const subtitleSize = logoSize * 0.11;  // ~24px at 220px logo
  const taglineSize = logoSize * 0.13;  // ~28px at 220px logo

  // Subtitle fade in
  const subtitleOpacity = showSubtitle
    ? interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' })
    : 0;

  return (
    <>
      <div
        className="logo-circle"
        style={{
          width: logoSize,
          height: logoSize,
          boxShadow: `
            0 4px 60px rgba(37, 99, 235, ${glowIntensity}),
            0 0 120px rgba(37, 99, 235, ${glowIntensity * 0.5})
          `,
        }}
      >
        <span className="logo-title" style={{ fontSize: titleSize }}>BIMTLY</span>
        <span className="logo-subtitle" style={{ fontSize: subtitleSize }}>Platform</span>
      </div>
      {showSubtitle && (
        <p className="opening-subtitle" style={{ opacity: subtitleOpacity, fontSize: taglineSize, marginTop: logoSize * 0.14, textAlign: 'center' }}>
          One Platform. Every Industry.
        </p>
      )}
    </>
  );
};

export default BimtlyLogo;
