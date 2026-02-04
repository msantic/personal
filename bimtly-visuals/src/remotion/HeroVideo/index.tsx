import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Img,
  staticFile,
} from "remotion";
import { VIDEO, getScaleFactor } from "../../design";
import "./styles.css";

// Industries to showcase
const INDUSTRIES = [
  { image: "hero-prefab.png", label: "Prefab & Modular Construction" },
  { image: "hero-window.png", label: "Windows & Building Components" },
];

export const HeroVideo: React.FC = () => {
  return (
    <AbsoluteFill className="hero-container">
      {/* Background grid */}
      <div className="grid-background" />

      {/* Opening title */}
      <Sequence from={0} durationInFrames={75}>
        <OpeningTitle />
      </Sequence>

      {/* Hero images showcase - starts after logo fades out */}
      <Sequence from={75}>
        <HeroShowcase />
      </Sequence>

      {/* Industry labels - same start as showcase so timing aligns */}
      <Sequence from={75}>
        <IndustryLabels />
      </Sequence>

      {/* Final tagline - after images fade out */}
      <Sequence from={290}>
        <Tagline />
      </Sequence>
    </AbsoluteFill>
  );
};

const OpeningTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Responsive scaling using design tokens
  const scaleFactor = getScaleFactor(width, height);

  const scale = spring({
    frame,
    fps,
    config: VIDEO.spring.snappy,
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade out at end (within 75 frame duration)
  const fadeOut = interpolate(frame, [50, 75], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowIntensity = 0.3 + Math.sin(frame * 0.08) * 0.1;

  // Responsive sizes using design token base values
  const logoSize = 220 * scaleFactor;
  const titleSize = 42 * scaleFactor;
  const subtitleSize = 24 * scaleFactor;

  return (
    <div
      className="opening-title"
      style={{
        opacity: opacity * fadeOut,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <div
        className="logo-circle"
        style={{
          width: logoSize,
          height: logoSize,
          boxShadow: `
            0 4px 60px rgba(37, 99, 235, ${glowIntensity}),
            0 0 120px rgba(37, 99, 235, ${glowIntensity * 0.5})
          `,
        }}
      >
        <span className="logo-title" style={{ fontSize: titleSize }}>BIMTLY</span>
        <span className="logo-subtitle" style={{ fontSize: subtitleSize }}>Platform</span>
      </div>
      <p className="opening-subtitle" style={{ opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }) }}>
        One Platform. Every Industry.
      </p>
    </div>
  );
};

const HeroShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Detect aspect ratio
  const aspectRatio = width / height;
  const isVertical = aspectRatio < 1;
  const isSquare = aspectRatio === 1;

  // Entry animation using design token spring config
  const entryScale = spring({
    frame,
    fps,
    config: VIDEO.spring.gentle,
  });

  // Linear timeline - no looping
  // Image 1 (prefab): frames 0-120 (fade in 0-30, hold 30-90, fade out 90-120)
  // Image 2 (windows): frames 90-210 (fade in 90-120, hold 120-180, fade out 180-210)

  const image1Opacity = interpolate(
    frame,
    [0, 30, 90, 120],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const image2Opacity = interpolate(
    frame,
    [90, 120, 180, 210],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Responsive image sizing based on aspect ratio
  const imageStyle = {
    maxWidth: isVertical ? "100%" : "95%",
    maxHeight: isVertical ? "50%" : isSquare ? "70%" : "85%",
    objectFit: "contain" as const,
  };

  return (
    <>
      {/* Image 1: Prefab */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: image1Opacity,
          transform: `scale(${entryScale})`,
        }}
      >
        <Img
          src={staticFile(INDUSTRIES[0].image)}
          style={imageStyle}
        />
      </div>

      {/* Image 2: Windows */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: image2Opacity,
          transform: `scale(${entryScale})`,
        }}
      >
        <Img
          src={staticFile(INDUSTRIES[1].image)}
          style={imageStyle}
        />
      </div>
    </>
  );
};

const IndustryLabels: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Responsive scaling using design tokens
  const scaleFactor = getScaleFactor(width, height);
  const isVertical = width / height < 1;

  // Label 1 timing: frames 30-120 (appears after image settles, fades with image)
  const label1Opacity = interpolate(
    frame,
    [30, 50, 100, 120],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const label1Y = interpolate(frame, [30, 50], [20, 0], { extrapolateRight: "clamp" });

  // Label 2 timing: frames 120-210 (appears after image 2 settles, fades with image)
  const label2Opacity = interpolate(
    frame,
    [120, 140, 190, 210],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const label2Y = interpolate(frame, [120, 140], [20, 0], { extrapolateRight: "clamp" });

  const labelSize = 26 * scaleFactor;
  const iconSize = 18 * scaleFactor;
  const padding = isVertical ? "12px 24px" : "16px 36px";

  return (
    <div className="industry-labels">
      {/* Label 1: Prefab */}
      <div
        className="industry-label"
        style={{
          opacity: label1Opacity,
          transform: `translateY(${label1Y}px)`,
          position: "absolute",
          padding,
        }}
      >
        <span className="industry-icon" style={{ fontSize: iconSize }}>◆</span>
        <span className="industry-text" style={{ fontSize: labelSize }}>{INDUSTRIES[0].label}</span>
      </div>

      {/* Label 2: Windows */}
      <div
        className="industry-label"
        style={{
          opacity: label2Opacity,
          transform: `translateY(${label2Y}px)`,
          position: "absolute",
          padding,
        }}
      >
        <span className="industry-icon" style={{ fontSize: iconSize }}>◆</span>
        <span className="industry-text" style={{ fontSize: labelSize }}>{INDUSTRIES[1].label}</span>
      </div>
    </div>
  );
};

const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Responsive scaling using design tokens
  const scaleFactor = getScaleFactor(width, height);

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

  // Responsive sizes
  const mainSize = 38 * scaleFactor;
  const websiteSize = 28 * scaleFactor;

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
