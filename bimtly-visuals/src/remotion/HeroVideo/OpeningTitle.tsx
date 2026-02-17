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

  // ── ENTRY ──────────────────────────────────────────────
  const entryScale = spring({
    frame,
    fps,
    config: VIDEO.spring.snappy,
  });

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle fades in delayed (last to arrive)
  const subtitleEnter = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── EXIT — subtitle leaves first, logo leaves after ────
  // Subtitle: opacity only, fully gone by frame 124
  const subtitleExit = interpolate(frame, [110, 124], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo/container: starts scaling AFTER subtitle is fully gone (frame 127+)
  const containerExit = interpolate(frame, [127, 143], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── COMBINED ───────────────────────────────────────────
  const scale = entryScale * containerExit;
  const subtitleOpacity = subtitleEnter * subtitleExit;

  const line2Size = Math.min(width, height) * 0.020;

  return (
    <div
      className="opening-title"
      style={{
        opacity: fadeIn * containerExit,
        transform: `translate(-50%, -50%) scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: height * 0.03,
      }}
    >
      <BimtlyLogo frame={frame} fps={fps} width={width} height={height} subtitleExitOpacity={subtitleExit} />
      <p style={{
        opacity: subtitleOpacity,
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
