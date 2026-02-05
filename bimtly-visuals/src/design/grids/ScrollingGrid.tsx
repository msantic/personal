/**
 * ScrollingGrid - Continuous scrolling grid of images
 *
 * Images arranged in columns that scroll vertically (or horizontally).
 * Seamlessly loops by duplicating images.
 */

import { Img, staticFile } from 'remotion';

interface ScrollingGridProps {
  images: string[];
  frame: number;
  width: number;
  height: number;
  columns?: number;
  speed?: number; // pixels per frame
  direction?: 'up' | 'down' | 'left' | 'right';
  gap?: number;
}

export const ScrollingGrid: React.FC<ScrollingGridProps> = ({
  images,
  frame,
  width,
  height,
  columns = 4,
  speed = 2,
  direction = 'up',
  gap = 8,
}) => {
  // Calculate image dimensions based on grid
  const isVertical = direction === 'up' || direction === 'down';
  const imageWidth = isVertical
    ? (width - gap * (columns + 1)) / columns
    : (height - gap * (columns + 1)) / columns;
  const imageHeight = imageWidth * 0.6; // 5:3 aspect ratio for screenshots

  // Duplicate images to create seamless loop
  const duplicatedImages = [...images, ...images, ...images];

  // Calculate total scroll distance for one loop
  const rows = Math.ceil(images.length / columns);
  const totalHeight = rows * (imageHeight + gap);

  // Calculate scroll offset
  const scrollDirection = direction === 'up' || direction === 'left' ? -1 : 1;
  const scrollOffset = (frame * speed * scrollDirection) % totalHeight;

  // Arrange images into rows
  const imageRows: string[][] = [];
  for (let i = 0; i < duplicatedImages.length; i += columns) {
    imageRows.push(duplicatedImages.slice(i, i + columns));
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Grid container */}
      <div
        style={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          gap,
          transform: isVertical
            ? `translateY(${scrollOffset}px)`
            : `translateX(${scrollOffset}px)`,
        }}
      >
        {imageRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: 'flex',
              flexDirection: isVertical ? 'row' : 'column',
              gap,
              justifyContent: 'center',
            }}
          >
            {row.map((image, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  width: imageWidth,
                  height: imageHeight,
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  flexShrink: 0,
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
        ))}
      </div>

      {/* Fade edges for depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: height * 0.15,
          background: 'linear-gradient(to bottom, white 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: height * 0.15,
          background: 'linear-gradient(to top, white 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default ScrollingGrid;
