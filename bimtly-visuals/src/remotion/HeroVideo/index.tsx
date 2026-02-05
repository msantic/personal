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
import { VIDEO, getScaleFactor, BACKGROUNDS, BimtlyLogo, ImageShowcase, DeviceShowcase } from "../../design";
// import PlatformDiagram from "../../pages/PlatformDiagram/PlatformDiagram";
import "./styles.css";

// Industries to showcase
const INDUSTRIES = [
  { image: "hero-prefab.png", label: "Prefab & Modular Construction" },
  { image: "hero-window.png", label: "Windows & Building Components" },
];

// Thumbnail images for showcase - real app screenshots
const THUMBNAILS = [
  'thumbnails/1016.png',
  'thumbnails/3576.png',
  'thumbnails/4009.png',
  'thumbnails/4657.png',
  'thumbnails/467.png',
  'thumbnails/585.png',
  'thumbnails/4696.png',
  'thumbnails/4740.png',
  'thumbnails/8190.png',
  'thumbnails/8194.png',
  'thumbnails/8201.png',
  'thumbnails/8232.png',
  'thumbnails/8236.png',
  'thumbnails/8267.png',
  'thumbnails/8292.png',
  'thumbnails/8305.png',
  'thumbnails/8315.png',
  'thumbnails/8373.png',
  'thumbnails/8434.png',
  'thumbnails/8606.png',
  'thumbnails/950.png',
  'thumbnails/978.png',
  'thumbnails/998.png',
  'thumbnails/feal.png',
  'thumbnails/pergola-config.png',
];

export const HeroVideo: React.FC = () => {
  const { width, height } = useVideoConfig();

  // CSS variables from design tokens (single source of truth)
  const heroVars = {
    '--hero-grid-color': BACKGROUNDS.grid.light.color,
    '--hero-indigo': BACKGROUNDS.hero.indigoColor,
    '--hero-orange': BACKGROUNDS.hero.orangeColor,
    '--hero-flare-opacity': String(BACKGROUNDS.hero.flareOpacity),
    '--flare-x': '20%',
    '--flare-y': '80%',
  } as React.CSSProperties;

  // Responsive logo sizing
  const logoHeight = Math.min(width, height) * 0.05;

  return (
    <AbsoluteFill className="hero-container" style={heroVars}>
      {/* Hero background layers - classes from design/backgrounds.css */}
      <div className="hero-bg-grid" />
      <div className="hero-bg-warm-flare" />
      <div className="hero-bg-top-glow" />

      {/* Content layer - above background */}
      <AbsoluteFill className="hero-bg-content">
        {/* Opening title - 90 frames (3s) */}
        <Sequence from={0} durationInFrames={90}>
          <OpeningTitle />
        </Sequence>

        {/* Screenshot showcase - animated grid of real app screenshots */}
        <Sequence from={90} durationInFrames={120}>
          <ScreenshotShowcase />
        </Sequence>

        {/* Hero images showcase - starts after screenshot showcase */}
        <Sequence from={210}>
          <HeroShowcase />
        </Sequence>

        {/* Industry labels - same start as showcase so timing aligns */}
        <Sequence from={210}>
          <IndustryLabels />
        </Sequence>

        {/* Device showcase - multi-device video display (20s = 600 frames) */}
        <Sequence from={425} durationInFrames={600}>
          <DeviceShowcaseSection />
        </Sequence>

        {/* Final tagline - at the end */}
        <Sequence from={1025}>
          <Tagline />
        </Sequence>

        {/* Persistent logo at bottom - always visible */}
        {/* <div
          style={{
            position: 'absolute',
            bottom: logoHeight * 0.8,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
          }}
        >
          <Img
            src={staticFile('branding/logo_with_name_black.svg')}
            style={{ height: logoHeight }}
          />
        </div> */}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const OpeningTitle: React.FC = () => {
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

  return (
    <div
      className="opening-title"
      style={{
        opacity: opacity * fadeOut,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <BimtlyLogo frame={frame} fps={fps} width={width} height={height} />
    </div>
  );
};

const ScreenshotShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Fade in/out
  const opacity = interpolate(
    frame,
    [0, 20, 100, 120],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div style={{ opacity }}>
      <ImageShowcase
        images={THUMBNAILS}
        style="staggered-reveal"  // Easy to switch: 'scrolling-grid' | 'staggered-reveal' | 'floating-cards' | 'ken-burns'
        frame={frame}
        fps={fps}
        width={width}
        height={height}
        durationInFrames={120}
      />
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

const DeviceShowcaseSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Fade in/out (600 frames total = 20s)
  const opacity = interpolate(
    frame,
    [0, 30, 570, 600],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Entry scale
  const entryScale = spring({
    frame,
    fps,
    config: VIDEO.spring.gentle,
  });

  // Scale to fit cascade layout within video frame
  // Cascade base dimensions: 300 + 1842 = 2142w, 1777*0.8 = 1421.6h (at scale=1)
  const cascadeBaseW = 300 + 1842;
  const cascadeBaseH = 1777 * 0.8;
  const scaleByWidth = width / cascadeBaseW;
  const scaleByHeight = height / cascadeBaseH;
  const deviceScale = Math.min(scaleByWidth, scaleByHeight) * 0.85; // 0.85 for padding

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      <div style={{ transform: `scale(${entryScale})` }}>
      <DeviceShowcase
        desktopVideo={staticFile('videos/8520-macbook-pro-16.mp4')}
        tabletVideo={staticFile('videos/8520-ipad-pro-12.mp4')}
        mobileVideo={staticFile('videos/8520-iphone-15-pro.mp4')}
        frameImages={{
          imac: staticFile('mocks/imac.png'),
          ipad: staticFile('mocks/ipadpro13.png'),
          iphone: staticFile('mocks/iphone11.png'),
        }}
        layout="cascade"
        scale={deviceScale}
      />
      </div>
    </div>
  );
};
