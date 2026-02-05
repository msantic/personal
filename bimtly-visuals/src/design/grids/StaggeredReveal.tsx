/**
 * StaggeredReveal - Images appear one by one with staggered timing
 *
 * Each image fades in and scales with spring physics.
 * Builds into a grid formation.
 */

import { Img, staticFile, spring, interpolate } from 'remotion';

interface StaggeredRevealProps {
  images: string[];
  frame: number;
  fps: number;
  width: number;
  height: number;
  columns?: number;
  staggerDelay?: number; // frames between each image
  gap?: number;
}

export const StaggeredReveal: React.FC<StaggeredRevealProps> = ({
  images,
  frame,
  fps,
  width,
  height,
  columns = 4,
  staggerDelay = 3,
  gap = 12,
}) => {
  // Calculate grid dimensions
  const rows = Math.ceil(images.length / columns);
  const maxImages = columns * rows;

  // Calculate image size to fill entire viewport
  const padding = gap * 2;
  const availableWidth = width - padding;
  const availableHeight = height - padding;

  const imageWidth = (availableWidth - gap * (columns - 1)) / columns;
  const imageHeight = (availableHeight - gap * (rows - 1)) / rows;

  // Use dimensions that fill the space (landscape cards)
  const cardWidth = imageWidth;
  const cardHeight = imageHeight;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, ${cardWidth}px)`,
          gridTemplateRows: `repeat(${rows}, ${cardHeight}px)`,
          gap,
        }}
      >
        {images.slice(0, maxImages).map((image, index) => {
          // Calculate staggered timing
          const startFrame = index * staggerDelay;
          const localFrame = frame - startFrame;

          // Spring animation for scale
          const scale = spring({
            frame: localFrame,
            fps,
            config: {
              damping: 12,
              stiffness: 100,
              mass: 0.5,
            },
          });

          // Opacity fade in
          const opacity = interpolate(localFrame, [0, 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          // Slight Y offset for entry
          const translateY = interpolate(localFrame, [0, 15], [20, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={index}
              style={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(37, 99, 235, 0.15)',
                opacity,
                transform: `scale(${scale}) translateY(${translateY}px)`,
              }}
            >
              <Img
                src={staticFile(image)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StaggeredReveal;
