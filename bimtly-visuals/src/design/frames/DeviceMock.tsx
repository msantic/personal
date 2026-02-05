/**
 * DeviceMock - Renders video/content inside Apple device PNG mockups
 *
 * Uses PNG device frames with transparent screen areas.
 * Video is positioned behind the frame at the correct screen coordinates.
 */

import { CSSProperties } from 'react';

// Screen area definitions for each device mockup
// Coordinates are relative to the PNG dimensions (top, left, width, height)
const DEVICE_CONFIGS = {
  imac: {
    image: '/mocks/imac.png',
    width: 1842,
    height: 1777, // Stretched proportionally to match MacBook Pro 16" video aspect ratio
    screen: {
      top: 115,
      left: 75,
      width: 1691,
      height: 1093,
    },
  },
  ipad: {
    image: '/mocks/ipadpro13.png',
    width: 846,
    height: 1083,
    screen: {
      top: 70,
      left: 69,
      width: 708,
      height: 944,
    },
  },
  iphone: {
    image: '/mocks/iphone11.png',
    width: 406,
    height: 791,
    screen: {
      top: 38,
      left: 38,
      width: 330,
      height: 715,
    },
  },
} as const;

export type DeviceType = keyof typeof DEVICE_CONFIGS;

interface DeviceMockProps {
  /** Device type */
  device: DeviceType;
  /** Video source URL */
  videoSrc?: string;
  /** Image source URL (alternative to video) */
  imageSrc?: string;
  /** Override frame image path (for Remotion staticFile) */
  frameImage?: string;
  /** Scale factor (default: 1) */
  scale?: number;
  /** Whether video should autoplay (default: true) */
  autoPlay?: boolean;
  /** Whether video should loop (default: true) */
  loop?: boolean;
  /** Whether video should be muted (default: true) */
  muted?: boolean;
  /** How content fits in screen area (default: 'contain') */
  objectFit?: 'contain' | 'cover' | 'fill';
  /** Additional styles for the container */
  style?: CSSProperties;
  /** Additional class name */
  className?: string;
  /** Children to render inside screen (alternative to video/image) */
  children?: React.ReactNode;
}

export const DeviceMock: React.FC<DeviceMockProps> = ({
  device,
  videoSrc,
  imageSrc,
  frameImage,
  scale = 1,
  autoPlay = true,
  loop = true,
  muted = true,
  objectFit = 'contain',
  style,
  className,
  children,
}) => {
  const config = DEVICE_CONFIGS[device];
  const { screen } = config;
  const frameSrc = frameImage || config.image;

  const containerWidth = config.width * scale;
  const containerHeight = config.height * scale;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        ...style,
      }}
    >
      {/* Screen content (video, image, or children) */}
      <div
        style={{
          position: 'absolute',
          top: screen.top * scale,
          left: screen.left * scale,
          width: screen.width * scale,
          height: screen.height * scale,
          overflow: 'hidden',
          background: '#000',
          borderRadius: device === 'iphone' ? 20 * scale : 0,
        }}
      >
        {videoSrc && (
          <video
            src={videoSrc}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit,
            }}
          />
        )}
        {imageSrc && !videoSrc && (
          <img
            src={imageSrc}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit,
            }}
          />
        )}
        {children && !videoSrc && !imageSrc && children}
      </div>

      {/* Device frame (on top) */}
      <img
        src={frameSrc}
        alt={`${device} frame`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: containerWidth,
          height: containerHeight,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

// Convenience components for each device
export const IMacMock: React.FC<Omit<DeviceMockProps, 'device'>> = (props) => (
  <DeviceMock device="imac" {...props} />
);

export const IPadMock: React.FC<Omit<DeviceMockProps, 'device'>> = (props) => (
  <DeviceMock device="ipad" {...props} />
);

export const IPhoneMock: React.FC<Omit<DeviceMockProps, 'device'>> = (props) => (
  <DeviceMock device="iphone" {...props} />
);

export default DeviceMock;
