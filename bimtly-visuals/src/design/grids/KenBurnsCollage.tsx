/**
 * KenBurnsCollage - Slow zoom and pan across a collage of images
 *
 * Creates a large collage and applies Ken Burns effect
 * (gradual zoom with panning).
 */

import { Img, staticFile, interpolate } from 'remotion';

interface KenBurnsCollageProps {
  images: string[];
  frame: number;
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
  columns?: number;
  zoomAmount?: number; // 1.0 = no zoom, 1.3 = 30% zoom
  gap?: number;
}

export const KenBurnsCollage: React.FC<KenBurnsCollageProps> = ({
  images,
  frame,
  fps,
  width,
  height,
  durationInFrames,
  columns = 5,
  zoomAmount = 1.25,
  gap = 4,
}) => {
  // Calculate collage dimensions (larger than viewport for panning)
  const rows = Math.ceil(images.length / columns);
  const collageScale = 1.5; // Collage is 1.5x viewport size
  const collageWidth = width * collageScale;
  const collageHeight = height * collageScale;

  // Calculate image sizes in collage
  const imageWidth = (collageWidth - gap * (columns + 1)) / columns;
  const imageHeight = imageWidth * 0.65;

  // Ken Burns animation
  const progress = frame / durationInFrames;

  // Zoom interpolation
  const scale = interpolate(progress, [0, 1], [1, zoomAmount], {
    extrapolateRight: 'clamp',
  });

  // Pan interpolation - move from top-left to bottom-right
  const panX = interpolate(progress, [0, 1], [0, -(collageWidth * zoomAmount - width) * 0.3], {
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(progress, [0, 1], [0, -(collageHeight * zoomAmount - height) * 0.3], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        overflow: 'hidden',
      }}
    >
      {/* Collage container */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: collageWidth,
          height: collageHeight,
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
          padding: gap,
          transform: `
            translate(-50%, -50%)
            translate(${panX}px, ${panY}px)
            scale(${scale})
          `,
          transformOrigin: 'center center',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              width: imageWidth,
              height: imageHeight,
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
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
        ))}
      </div>

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(
              ellipse at center,
              transparent 50%,
              rgba(255, 255, 255, 0.5) 100%
            )
          `,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default KenBurnsCollage;
