import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { VIDEO, BimtlyLogo } from "../../design";

export const OpeningTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: VIDEO.spring.snappy,
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(frame, [60, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 1 staggered reveal
  const line1Opacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Line 2 staggered reveal (delayed after line 1)
  const line2Opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Responsive text sizes
  const line1Size = Math.min(width, height) * 0.032;
  const line2Size = Math.min(width, height) * 0.020;

  return (
    <div
      className="opening-title"
      style={{
        opacity: opacity * fadeOut,
        transform: `translate(-50%, -50%) scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: height * 0.03,
      }}
    >
      <BimtlyLogo frame={frame} fps={fps} width={width} height={height} />
      {/* <p style={{
        opacity: line1Opacity,
        fontSize: line1Size,
        fontWeight: 600,
        color: '#4b5563',
        margin: 0,
        letterSpacing: '0.05em',
      }}>
        Show. Configure. Sell.
      </p> */}
      <p style={{
        opacity: line2Opacity,
        fontSize: line2Size,
        fontWeight: 400,
        color: '#6b7280',
        margin: 0,
        letterSpacing: '0.03em',
      }}>
        Right in your browser, on any device
      </p>
    </div>
  );
};
