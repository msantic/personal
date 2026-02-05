/**
 * RapidShowcase - Quick animated switching of full-screen images
 *
 * Images rapidly cycle through with slide transitions.
 * Optional device frames: browser, monitor, or both combined.
 */

import { Img, staticFile, interpolate } from 'remotion';
import { BrowserFrame } from '../frames/BrowserFrame';
import { MonitorFrame } from '../frames/MonitorFrame';

export type FrameType = 'none' | 'browser' | 'monitor' | 'browser-in-monitor';

interface RapidShowcaseProps {
  images: string[];
  frame: number;
  width: number;
  height: number;
  framesPerImage?: number;
  transitionFrames?: number;
  /** Device frame style */
  frameType?: FrameType;
  /** @deprecated Use frameType instead */
  deviceFrame?: boolean;
}

export const RapidShowcase: React.FC<RapidShowcaseProps> = ({
  images,
  frame,
  width,
  height,
  framesPerImage = 12,
  transitionFrames = 6,
  frameType: frameTypeProp,
  deviceFrame = false,
}) => {
  // Support legacy deviceFrame prop
  const frameType: FrameType = frameTypeProp ?? (deviceFrame ? 'browser' : 'none');

  const totalCycleFrames = framesPerImage;
  const currentIndex = Math.floor(frame / totalCycleFrames) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;
  const localFrame = frame % totalCycleFrames;

  // Current image slides out to left
  const currentSlide = interpolate(
    localFrame,
    [framesPerImage - transitionFrames, framesPerImage],
    [0, -100],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Next image slides in from right
  const nextSlide = interpolate(
    localFrame,
    [framesPerImage - transitionFrames, framesPerImage],
    [100, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Frame dimensions based on type
  const getFrameDimensions = () => {
    switch (frameType) {
      case 'monitor':
        return {
          frameWidth: width * 0.75,
          frameHeight: width * 0.75 * 0.625,
        };
      case 'browser':
        return {
          frameWidth: width * 0.8,
          frameHeight: width * 0.8 * 0.625,
        };
      case 'browser-in-monitor':
        return {
          frameWidth: width * 0.7,
          frameHeight: width * 0.7 * 0.625,
        };
      default:
        return {
          frameWidth: width * 0.88,
          frameHeight: height * 0.85,
        };
    }
  };

  const { frameWidth, frameHeight } = getFrameDimensions();

  // Render image with slide animation
  const renderImage = (imageSrc: string, slidePercent: number) => (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: `${slidePercent}%`,
        width: '100%',
        height: '100%',
      }}
    >
      <Img
        src={staticFile(imageSrc)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );

  // Image content (used inside frames)
  const imageContent = (
    <>
      {renderImage(images[nextIndex], nextSlide)}
      {renderImage(images[currentIndex], currentSlide)}
    </>
  );

  // Wrap content in appropriate frame(s)
  const renderFramedContent = () => {
    switch (frameType) {
      case 'browser':
        return (
          <BrowserFrame width={frameWidth} height={frameHeight}>
            {imageContent}
          </BrowserFrame>
        );

      case 'monitor':
        return (
          <MonitorFrame width={frameWidth} height={frameHeight}>
            {imageContent}
          </MonitorFrame>
        );

      case 'browser-in-monitor': {
        // Browser inside monitor - browser is smaller to fit in monitor screen
        const browserWidth = frameWidth - 24; // Account for monitor bezel
        const browserHeight = frameHeight - 24;
        return (
          <MonitorFrame width={frameWidth} height={frameHeight} screenBackground="#e8e8e8">
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}>
              <BrowserFrame width={browserWidth} height={browserHeight}>
                {imageContent}
              </BrowserFrame>
            </div>
          </MonitorFrame>
        );
      }

      default:
        // No frame - simple card
        return (
          <div
            style={{
              width: frameWidth,
              height: frameHeight,
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1)',
              position: 'relative',
            }}
          >
            {imageContent}
          </div>
        );
    }
  };

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
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {renderFramedContent()}
    </div>
  );
};

export default RapidShowcase;
