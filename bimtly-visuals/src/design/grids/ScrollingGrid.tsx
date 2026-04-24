/**
 * ScrollingGrid - Infinite seamless scrolling grid of images
 *
 * Uses a virtual-window approach like old-school tile scrolling:
 * the scroll offset increases forever, and we only render the rows
 * that are currently visible. Each row's content wraps via modulo
 * on the row index — no position reset, no jump.
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
  aspectRatio?: number; // height/width ratio (default 0.75)
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
  aspectRatio = 0.75,
}) => {
  const isVertical = direction === 'up' || direction === 'down';
  const imageWidth = isVertical
    ? (width - gap * (columns + 1)) / columns
    : (height - gap * (columns + 1)) / columns;
  const imageHeight = imageWidth * aspectRatio;

  // Build rows from one set of images
  const singleRows: string[][] = [];
  for (let i = 0; i < images.length; i += columns) {
    singleRows.push(images.slice(i, i + columns));
  }
  const totalContentRows = singleRows.length;
  const rowHeight = imageHeight + gap;

  // Continuous scroll offset — never resets
  const scrollY = frame * speed;

  // How many rows fit in the viewport (plus buffer above and below)
  const visibleCount = Math.ceil(height / rowHeight) + 2;

  // Which "global" row index is at the top of the viewport
  const isReverse = direction === 'down' || direction === 'right';
  const firstVisibleRow = isReverse
    ? Math.floor(-scrollY / rowHeight) - 1
    : Math.floor(scrollY / rowHeight) - 1;

  // Render each visible row, positioned absolutely
  const rows: React.ReactNode[] = [];
  for (let i = 0; i < visibleCount; i++) {
    const globalRow = firstVisibleRow + i;

    // Position in pixels relative to viewport top
    const yPos = isReverse
      ? globalRow * rowHeight + scrollY
      : globalRow * rowHeight - scrollY;

    // Wrap content index so it cycles through images forever
    const contentIdx =
      ((globalRow % totalContentRows) + totalContentRows) % totalContentRows;
    const row = singleRows[contentIdx];

    rows.push(
      <div
        key={globalRow}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transform: isVertical
            ? `translateY(${yPos}px)`
            : `translateX(${yPos}px)`,
          display: 'flex',
          flexDirection: isVertical ? 'row' : 'column',
          gap,
          justifyContent: 'center',
        }}
      >
        {row.map((image, colIndex) => (
          <div
            key={colIndex}
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
      </div>,
    );
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
      }}
    >
      {rows}

      {/* Fade edges */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: height * 0.15,
          background: 'linear-gradient(to bottom, white 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
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
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default ScrollingGrid;
