import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandingBadge } from "../../design/BrandingBadge";
import { IntroClip } from "../IntroClip";
import { OutroClip } from "../OutroClip";
import { VideoClip } from "../PromoMaterialCatalog/VideoClip";

/** Timeline constants (30fps) */
const CROSSFADE_DURATION = 30; // 1s
const INTRO_DURATION = 150; // 5s
const OUTRO_DURATION = 120; // 4s
const CLIP1_DURATION = 840; // 28s (56s source at 2x)
const CLIP2_DURATION = 372; // 12.4s (24.8s source at 2x)
const MUSIC_FADE_DURATION = 45; // 1.5s

export const PromoCncDemo: React.FC = () => {
  const clip1Start = INTRO_DURATION - CROSSFADE_DURATION; // 120
  const clip2Start = clip1Start + CLIP1_DURATION - CROSSFADE_DURATION; // 930
  const outroStart = clip2Start + CLIP2_DURATION - CROSSFADE_DURATION; // 1272

  const musicStart = clip1Start; // 120
  const musicDuration = clip2Start + CLIP2_DURATION - clip1Start; // 1182

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      {/* ===== INTRO ===== */}
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <IntroClip />
      </Sequence>

      {/* ===== CLIP 1: CNC Demo (2x speed, 28s) ===== */}
      <Sequence from={clip1Start} durationInFrames={CLIP1_DURATION}>
        <VideoClip
          src={staticFile("videos/cnc-demo.mp4")}
          playbackRate={2}
          durationInFrames={CLIP1_DURATION}
        />
      </Sequence>

      {/* ===== CLIP 2: Share, Explode & Data (2x speed, 12.4s) ===== */}
      <Sequence from={clip2Start} durationInFrames={CLIP2_DURATION}>
        <VideoClip
          src={staticFile("videos/cnc-demo-share.mp4")}
          playbackRate={2}
          durationInFrames={CLIP2_DURATION}
          objectFit="contain"
        />
      </Sequence>

      {/* ===== OUTRO ===== */}
      <Sequence from={outroStart} durationInFrames={OUTRO_DURATION}>
        <OutroClip />
      </Sequence>

      {/* ===== TEXT OVERLAYS ===== */}

      {/* Clip 1 overlays (dark theme → white text) */}
      <Sequence from={120} durationInFrames={120}>
        <TextOverlay
          headline="See Every Product. From Every Angle."
          subline="Immersive 3D exploration that brings complex machines to life."
          theme="dark"
          durationInFrames={120}
        />
      </Sequence>
      <Sequence from={240} durationInFrames={120}>
        <TextOverlay
          headline="Turn Complexity Into Clarity."
          subline="Instantly reveal internal components with smooth X-ray views."
          theme="dark"
          durationInFrames={120}
        />
      </Sequence>
      <Sequence from={360} durationInFrames={120}>
        <TextOverlay
          headline="Zoom In. Drill Down. Discover Details."
          subline="From full systems to individual parts in seconds."
          theme="dark"
          durationInFrames={120}
        />
      </Sequence>
      <Sequence from={480} durationInFrames={120}>
        <TextOverlay
          headline="Make Technical Products Easy to Understand."
          subline="For customers, partners, sales teams, and service departments."
          theme="dark"
          durationInFrames={120}
        />
      </Sequence>
      <Sequence from={600} durationInFrames={120}>
        <TextOverlay
          headline="Sell With Confidence."
          subline="Show value visually instead of explaining it with words."
          theme="dark"
          durationInFrames={120}
        />
      </Sequence>
      <Sequence from={720} durationInFrames={90}>
        <TextOverlay
          headline="Reduce Sales Cycles. Increase Engagement."
          subline="Interactive experiences convert faster than static brochures."
          theme="dark"
          durationInFrames={90}
        />
      </Sequence>

      {/* Clip 2 overlays (light theme → dark text) */}
      <Sequence from={960} durationInFrames={120}>
        <TextOverlay
          headline="Break It Down. Effortlessly."
          subline="Explode assemblies to show how everything fits together."
          theme="light"
          durationInFrames={120}
        />
      </Sequence>
      <Sequence from={1080} durationInFrames={180}>
        <ClosingOverlay durationInFrames={180} />
      </Sequence>

      {/* ===== BRANDING OVERLAY (content clips only) ===== */}
      <Sequence from={musicStart} durationInFrames={musicDuration}>
        <BrandingBadge durationInFrames={musicDuration} />
      </Sequence>

      {/* ===== BACKGROUND MUSIC (content clips only) ===== */}
      <Sequence from={musicStart} durationInFrames={musicDuration}>
        <MusicTrack durationInFrames={musicDuration} />
      </Sequence>
    </AbsoluteFill>
  );
};

/** Premium text overlay — top-right, blur-in reveal with brand accent */
const ENTER_FRAMES = 20; // 0.67s entrance
const EXIT_FRAMES = 12; // 0.4s exit
const FONT_FAMILY =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const TextOverlay: React.FC<{
  headline: string;
  subline?: string;
  theme: "dark" | "light";
  durationInFrames: number;
}> = ({ headline, subline, theme, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  // Entrance: blur-in + slide + fade
  const enterProgress = interpolate(frame, [0, ENTER_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Exit: fade + slight scale down
  const exitProgress = interpolate(
    frame,
    [durationInFrames - EXIT_FRAMES, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const opacity = enterProgress * exitProgress;

  // Slide in from right (entrance only)
  const translateX = interpolate(frame, [0, ENTER_FRAMES], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text blur reveal (starts blurred, becomes sharp)
  const textBlur = interpolate(frame, [0, ENTER_FRAMES], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle scale on exit
  const exitScale = interpolate(
    frame,
    [durationInFrames - EXIT_FRAMES, durationInFrames],
    [1, 0.98],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const s = width / 1920;
  const isDark = theme === "dark";

  return (
    <div
      style={{
        position: "absolute",
        top: 48 * s,
        right: 48 * s,
        maxWidth: "44%",
        opacity,
        transform: `translateX(${translateX}px) scale(${exitScale})`,
        textAlign: "right",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          padding: `${22 * s}px ${30 * s}px`,
          borderRadius: 14 * s,
          background: isDark
            ? "rgba(0, 0, 0, 0.65)"
            : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          boxShadow: isDark
            ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)"
            : "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 26 * s,
            fontWeight: 700,
            color: isDark ? "#FCD34D" : "#1d4ed8",
            lineHeight: 1.3,
            letterSpacing: -0.5,
            filter: `blur(${textBlur}px)`,
          }}
        >
          {headline}
        </p>
        {subline && (
          <p
            style={{
              margin: `${10 * s}px 0 0`,
              fontSize: 17 * s,
              fontWeight: 500,
              color: isDark ? "rgba(255,255,255,0.9)" : "#4B5563",
              lineHeight: 1.45,
              letterSpacing: 0,
              filter: `blur(${textBlur}px)`,
            }}
          >
            {subline}
          </p>
        )}
      </div>
    </div>
  );
};

/** High-impact closing statement — centered, large type, cinematic */
const ClosingOverlay: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const enterProgress = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitProgress = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = enterProgress * exitProgress;

  // Blur reveal
  const textBlur = interpolate(frame, [0, 25], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slide in from right
  const translateX = interpolate(frame, [0, 25], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline staggers in slightly after headline
  const taglineOpacity = interpolate(frame, [12, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const s = width / 1920;

  return (
    <div
      style={{
        position: "absolute",
        top: 48 * s,
        right: 48 * s,
        maxWidth: "48%",
        opacity,
        transform: `translateX(${translateX}px)`,
        textAlign: "right",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          padding: `${30 * s}px ${36 * s}px`,
          borderRadius: 16 * s,
          background: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(30px) saturate(1.5)",
          WebkitBackdropFilter: "blur(30px) saturate(1.5)",
          boxShadow:
            "0 12px 48px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 34 * s,
            fontWeight: 800,
            color: "#1d4ed8",
            lineHeight: 1.25,
            letterSpacing: -0.8,
            filter: `blur(${textBlur}px)`,
          }}
        >
          The Future of Product Sales Is Interactive.
        </p>
        <p
          style={{
            margin: `${16 * s}px 0 0`,
            fontSize: 22 * s,
            fontWeight: 500,
            color: "#4B5563",
            lineHeight: 1.5,
            opacity: taglineOpacity,
            filter: `blur(${textBlur * 0.8}px)`,
          }}
        >
          {"Because products that can be explored\u2026"}
          <br />
          <span style={{ fontWeight: 700, color: "#2563EB" }}>get sold.</span>
        </p>
      </div>
    </div>
  );
};

/** Music with fade in/out envelope */
const MusicTrack: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const volume = () => {
    const fadeIn = interpolate(frame, [0, MUSIC_FADE_DURATION], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const fadeOut = interpolate(
      frame,
      [durationInFrames - MUSIC_FADE_DURATION, durationInFrames],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    return fadeIn * fadeOut;
  };

  return (
    <Audio
      src={staticFile("videos/promo/background-music.mp3")}
      volume={volume()}
    />
  );
};
