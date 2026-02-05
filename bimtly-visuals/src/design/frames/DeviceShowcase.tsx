/**
 * DeviceShowcase - Displays iMac, iPad, and iPhone mockups together
 *
 * Arranges devices in a visually appealing layout to show
 * the app running across different device types.
 */

import { CSSProperties } from 'react';
import { DeviceMock } from './DeviceMock';

interface DeviceShowcaseProps {
  /** Video source for desktop (iMac) */
  desktopVideo?: string;
  /** Video source for tablet (iPad) */
  tabletVideo?: string;
  /** Video source for mobile (iPhone) */
  mobileVideo?: string;
  /** Override frame images (for Remotion staticFile) */
  frameImages?: {
    imac?: string;
    ipad?: string;
    iphone?: string;
  };
  /** Overall scale (default: 0.5) */
  scale?: number;
  /** Gap between devices (default: 40) */
  gap?: number;
  /** Layout arrangement */
  layout?: 'horizontal' | 'perspective' | 'stacked' | 'cascade';
  /** Additional styles */
  style?: CSSProperties;
  /** Additional class name */
  className?: string;
}

export const DeviceShowcase: React.FC<DeviceShowcaseProps> = ({
  desktopVideo,
  tabletVideo,
  mobileVideo,
  frameImages,
  scale = 0.5,
  gap = 40,
  layout = 'horizontal',
  style,
  className,
}) => {
  if (layout === 'perspective') {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap,
          perspective: '1500px',
          ...style,
        }}
      >
        {/* iPad - left, rotated */}
        {tabletVideo && (
          <div
            style={{
              transform: 'rotateY(25deg)',
              transformOrigin: 'right center',
            }}
          >
            <DeviceMock device="ipad" videoSrc={tabletVideo} frameImage={frameImages?.ipad} scale={scale * 0.8} />
          </div>
        )}

        {/* iMac - center, front */}
        {desktopVideo && (
          <DeviceMock device="imac" videoSrc={desktopVideo} frameImage={frameImages?.imac} scale={scale} />
        )}

        {/* iPhone - right, rotated */}
        {mobileVideo && (
          <div
            style={{
              transform: 'rotateY(-25deg)',
              transformOrigin: 'left center',
            }}
          >
            <DeviceMock device="iphone" videoSrc={mobileVideo} frameImage={frameImages?.iphone} scale={scale * 0.9} />
          </div>
        )}
      </div>
    );
  }

  if (layout === 'stacked') {
    return (
      <div
        className={className}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
      >
        {/* iMac - back center */}
        {desktopVideo && (
          <DeviceMock device="imac" videoSrc={desktopVideo} frameImage={frameImages?.imac} scale={scale} />
        )}

        {/* iPad - front left */}
        {tabletVideo && (
          <div
            style={{
              position: 'absolute',
              left: '5%',
              bottom: '5%',
              transform: 'rotate(-5deg)',
              zIndex: 1,
            }}
          >
            <DeviceMock device="ipad" videoSrc={tabletVideo} frameImage={frameImages?.ipad} scale={scale * 0.6} />
          </div>
        )}

        {/* iPhone - front right */}
        {mobileVideo && (
          <div
            style={{
              position: 'absolute',
              right: '10%',
              bottom: '10%',
              transform: 'rotate(5deg)',
              zIndex: 2,
            }}
          >
            <DeviceMock device="iphone" videoSrc={mobileVideo} frameImage={frameImages?.iphone} scale={scale * 0.7} />
          </div>
        )}
      </div>
    );
  }

  if (layout === 'cascade') {
    // Marketing hero layout - fixed positions for proper overlap
    // iMac: 1842x1777, iPad: 846x1083, iPhone: 406x791
    const s = scale;

    // Scale factors for iMac compression
    const imacScaleX = 0.9;
    const imacScaleY = 0.8;

    // Actual element dimensions (layout space)
    const imacW = 1842 * s;
    const imacH = 1777 * s;
    const ipadH = 1083 * s * 0.65;

    // Container sized to fit all devices at their layout positions
    const containerW = 300 * s + imacW; // iMac offset + full width
    const containerH = Math.max(imacH * imacScaleY, ipadH);

    return (
      <div
        className={className}
        style={{
          position: 'relative',
          width: containerW,
          height: containerH,
          ...style,
        }}
      >
        {/* iMac - back right */}
        {desktopVideo && (
          <div style={{
            position: 'absolute',
            left: 300 * s,
            top: 0,
            zIndex: 1,
            transform: `scaleX(${imacScaleX}) scaleY(${imacScaleY})`,
            transformOrigin: 'top left',
          }}>
            <DeviceMock device="imac" videoSrc={desktopVideo} frameImage={frameImages?.imac} scale={s} objectFit="cover" />
          </div>
        )}

        {/* iPad - front left, overlapping iMac */}
        {tabletVideo && (
          <div style={{ position: 'absolute', left: 0, bottom: 30 * s, zIndex: 2 }}>
            <DeviceMock device="ipad" videoSrc={tabletVideo} frameImage={frameImages?.ipad} scale={s * 0.65} objectFit="cover" />
          </div>
        )}

        {/* iPhone - front center-right */}
        {mobileVideo && (
          <div style={{ position: 'absolute', left: 500 * s, bottom: 0, zIndex: 3 }}>
            <DeviceMock device="iphone" videoSrc={mobileVideo} frameImage={frameImages?.iphone} scale={s * 0.5} objectFit="cover" />
          </div>
        )}
      </div>
    );
  }

  // Default: horizontal layout
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap,
        ...style,
      }}
    >
      {desktopVideo && (
        <DeviceMock device="imac" videoSrc={desktopVideo} frameImage={frameImages?.imac} scale={scale} />
      )}
      {tabletVideo && (
        <DeviceMock device="ipad" videoSrc={tabletVideo} frameImage={frameImages?.ipad} scale={scale * 0.7} />
      )}
      {mobileVideo && (
        <DeviceMock device="iphone" videoSrc={mobileVideo} frameImage={frameImages?.iphone} scale={scale * 0.6} />
      )}
    </div>
  );
};

export default DeviceShowcase;
