/**
 * ScrollingGridVideo - Standalone infinite scrolling grid composition
 *
 * Just the scrolling grid, full frame, no fade in/out.
 * Duration is computed so that last frame + 1 === first frame,
 * making the video a perfect seamless loop.
 */

import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { ScrollingGrid } from '../design/grids/ScrollingGrid';

const THUMBNAILS = [
  'thumbnails/housevr.webp',
  'thumbnails/engine.webp',
  'thumbnails/cnc.webp',
  'thumbnails/prefab.webp',
  'thumbnails/knapp.webp',
  'thumbnails/bedroom.webp',
  'thumbnails/metal-construction.webp',
  'thumbnails/wooden-house.webp',
  'thumbnails/window.webp',
  'thumbnails/roof-construction-details.webp',
  'thumbnails/metal-fence-system.webp',
  'thumbnails/chair.webp',
  'thumbnails/family-house-frame-only.webp',
  'thumbnails/6haus.webp',
  'thumbnails/stone-cabin.webp',
  'thumbnails/modularhouse.webp',
  'thumbnails/container-paradise-cafe.webp',
  'thumbnails/4740.png',
  'thumbnails/8232.png',
  'thumbnails/8305.png',
];

// Grid config — kept in sync between component and duration calc
const GRID = {
  columns: 5,
  gap: 6,
  aspectRatio: 0.75,
  speed: 2,
  width: 1920,
};

/**
 * Compute exact frame count for one full scroll cycle.
 * After this many frames the grid is back to its starting position.
 */
function computeLoopFrames(gridWidth: number): number {
  const imageWidth = (gridWidth - GRID.gap * (GRID.columns + 1)) / GRID.columns;
  const imageHeight = imageWidth * GRID.aspectRatio;
  const rowHeight = imageHeight + GRID.gap;
  const totalRows = Math.ceil(THUMBNAILS.length / GRID.columns);
  const oneSetHeight = totalRows * rowHeight;
  return Math.round(oneSetHeight / GRID.speed);
}

/** Exact frame count for a perfect loop at 1920 wide */
export const SCROLLING_GRID_LOOP_FRAMES = computeLoopFrames(GRID.width);

export const ScrollingGridVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: 'white' }}>
      <ScrollingGrid
        images={THUMBNAILS}
        frame={frame}
        width={width}
        height={height}
        columns={GRID.columns}
        speed={GRID.speed}
        direction="up"
        gap={GRID.gap}
        aspectRatio={GRID.aspectRatio}
      />
    </AbsoluteFill>
  );
};
