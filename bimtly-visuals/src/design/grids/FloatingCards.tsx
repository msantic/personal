/**
 * FloatingCards - Images as 3D cards floating in space
 *
 * Cards have gentle floating animation with subtle rotation.
 * Creates depth with varying z-positions.
 */

import { Img, staticFile, interpolate } from 'remotion';

interface FloatingCardsProps {
  images: string[];
  frame: number;
  fps: number;
  width: number;
  height: number;
  cardWidth?: number;
  cardHeight?: number;
}

// Seeded random for consistent positions
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export const FloatingCards: React.FC<FloatingCardsProps> = ({
  images,
  frame,
  fps,
  width,
  height,
  cardWidth: customCardWidth,
  cardHeight: customCardHeight,
}) => {
  // Calculate card size based on viewport
  const baseSize = Math.min(width, height) * 0.14;
  const cardWidth = customCardWidth || baseSize * 1.4;
  const cardHeight = customCardHeight || baseSize;

  // Grid-based distribution for better spread
  const cols = 5;
  const rows = Math.ceil(images.length / cols);
  const cellWidth = width / cols;
  const cellHeight = height / rows;

  // Generate card positions and animations
  const cards = images.map((image, index) => {
    // Grid position
    const col = index % cols;
    const row = Math.floor(index / cols);

    // Seeded random offset within cell (with some jitter)
    const seed = index * 7 + 42;
    const jitterX = (seededRandom(seed) - 0.5) * cellWidth * 0.5;
    const jitterY = (seededRandom(seed + 1) - 0.5) * cellHeight * 0.5;

    // Center in cell + jitter
    const x = col * cellWidth + cellWidth * 0.5 - cardWidth * 0.5 + jitterX;
    const y = row * cellHeight + cellHeight * 0.5 - cardHeight * 0.5 + jitterY;
    const z = seededRandom(seed + 2) * 80 - 40; // -40 to 40
    const rotateY = (seededRandom(seed + 3) - 0.5) * 16; // -8 to 8 degrees

    // Floating animation
    const floatOffset = Math.sin((frame + index * 20) * 0.05) * 15;
    const rotateOffset = Math.sin((frame + index * 15) * 0.03) * 5;

    // Entry animation
    const entryDelay = index * 5;
    const entryProgress = interpolate(frame - entryDelay, [0, 30], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const entryScale = interpolate(entryProgress, [0, 0.8, 1], [0.5, 1.05, 1]);
    const entryOpacity = interpolate(entryProgress, [0, 0.5], [0, 1], {
      extrapolateRight: 'clamp',
    });

    return {
      image,
      x,
      y: y + floatOffset,
      z,
      rotateY: rotateY + rotateOffset,
      scale: entryScale,
      opacity: entryOpacity,
    };
  });

  // Sort by z for proper layering
  const sortedCards = [...cards].sort((a, b) => a.z - b.z);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        perspective: 1000,
        perspectiveOrigin: '50% 50%',
      }}
    >
      {sortedCards.map((card, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: card.x,
            top: card.y,
            width: cardWidth,
            height: cardHeight,
            transformStyle: 'preserve-3d',
            transform: `
              translateZ(${card.z}px)
              rotateY(${card.rotateY}deg)
              scale(${card.scale})
            `,
            opacity: card.opacity,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: `
                0 ${10 + card.z * 0.1}px ${30 + card.z * 0.2}px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.1)
              `,
              background: 'white',
            }}
          >
            <Img
              src={staticFile(card.image)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingCards;
