import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { VIDEO } from "../../design";

export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const opacity = interpolate(frame, [0, VIDEO.timing.fadeIn], [0, 1], {
    extrapolateRight: "clamp",
  });

  const translateY = spring({
    frame,
    fps,
    config: VIDEO.spring.gentle,
  });

  const y = interpolate(translateY, [0, 1], [40, 0]);

  // Staggered text reveal
  const line1Opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const line2Opacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });
  const line3Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });

  // Responsive sizes - based on smaller dimension for all formats
  const baseSize = Math.min(width, height);
  const mainSize = baseSize * 0.06;
  const websiteSize = baseSize * 0.045;

  return (
    <div
      className="tagline-container"
      style={{
        opacity,
        transform: `translate(-50%, -50%) translateY(${y}px)`,
      }}
    >
      <p className="tagline-main" style={{ opacity: line1Opacity, fontSize: mainSize }}>
        Products easier to sell.
      </p>
      <p className="tagline-main" style={{ opacity: line2Opacity, fontSize: mainSize }}>
        Assets easier to manage.
      </p>
      <p className="website" style={{ opacity: line3Opacity, fontSize: websiteSize }}>
        bimtly.com
      </p>
    </div>
  );
};
