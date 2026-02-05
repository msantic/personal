/**
 * ImageShowcase - Animated image grid/collage with multiple style options
 *
 * Wrapper component for displaying image collections with various animation styles.
 * Switch styles easily via the `style` prop for A/B testing different presentations.
 *
 * Usage:
 *   <ImageShowcase
 *     images={['thumbnails/1.png', 'thumbnails/2.png', ...]}
 *     style="scrolling-grid"
 *     frame={frame}
 *     fps={fps}
 *     width={width}
 *     height={height}
 *   />
 */

import {
  ScrollingGrid,
  StaggeredReveal,
  FloatingCards,
  KenBurnsCollage,
} from './grids';

export type ImageShowcaseStyle =
  | 'scrolling-grid'
  | 'staggered-reveal'
  | 'floating-cards'
  | 'ken-burns';

interface ImageShowcaseProps {
  images: string[];
  style: ImageShowcaseStyle;
  frame: number;
  fps: number;
  width: number;
  height: number;
  durationInFrames?: number;
}

export const ImageShowcase: React.FC<ImageShowcaseProps> = ({
  images,
  style,
  frame,
  fps,
  width,
  height,
  durationInFrames = 120,
}) => {
  switch (style) {
    case 'scrolling-grid':
      return (
        <ScrollingGrid
          images={images}
          frame={frame}
          width={width}
          height={height}
          columns={4}
          speed={1.5}
          direction="up"
          gap={8}
        />
      );

    case 'staggered-reveal':
      return (
        <StaggeredReveal
          images={images}
          frame={frame}
          fps={fps}
          width={width}
          height={height}
          columns={5}
          staggerDelay={3}
          gap={10}
        />
      );

    case 'floating-cards':
      return (
        <FloatingCards
          images={images}
          frame={frame}
          fps={fps}
          width={width}
          height={height}
        />
      );

    case 'ken-burns':
      return (
        <KenBurnsCollage
          images={images}
          frame={frame}
          fps={fps}
          width={width}
          height={height}
          durationInFrames={durationInFrames}
          columns={5}
          zoomAmount={1.25}
          gap={4}
        />
      );

    default:
      return null;
  }
};

export default ImageShowcase;
