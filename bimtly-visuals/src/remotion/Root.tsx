import { Composition } from "remotion";
import { HeroVideo } from "./HeroVideo";
import { IntroClip } from "./IntroClip";
import { OutroClip } from "./OutroClip";

/**
 * Platform Video Configurations
 *
 * All platforms render from the same HeroVideo component.
 * The component adapts its layout based on the aspect ratio.
 */

// Platform presets with recommended dimensions
const PLATFORMS = {
  // 16:9 Landscape
  web: { width: 1920, height: 1080, fps: 30, duration: 38 },
  youtube: { width: 1920, height: 1080, fps: 30, duration: 38 },
  linkedin: { width: 1920, height: 1080, fps: 30, duration: 38 },
  facebook: { width: 1920, height: 1080, fps: 30, duration: 38 },

  // 1:1 Square
  instagramFeed: { width: 1080, height: 1080, fps: 30, duration: 38 },
  linkedinSquare: { width: 1080, height: 1080, fps: 30, duration: 38 },
  facebookSquare: { width: 1080, height: 1080, fps: 30, duration: 38 },

  // 9:16 Vertical
  instagramReels: { width: 1080, height: 1920, fps: 30, duration: 38 },
  tiktok: { width: 1080, height: 1920, fps: 30, duration: 38 },
  youtubeShorts: { width: 1080, height: 1920, fps: 30, duration: 38 },

  // 4:5 Portrait (Instagram optimal)
  instagramPortrait: { width: 1080, height: 1350, fps: 30, duration: 38 },

  // Standalone clips — 1080p (default preview)
  introClip: { width: 1920, height: 1080, fps: 30, duration: 5 },    // 150 frames
  outroClip: { width: 1920, height: 1080, fps: 30, duration: 4 },    // 120 frames

  // Standalone clips — 4K (for high-res renders)
  introClip4K: { width: 3840, height: 2160, fps: 30, duration: 5 },  // 150 frames
  outroClip4K: { width: 3840, height: 2160, fps: 30, duration: 4 },  // 120 frames
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ===== 16:9 LANDSCAPE ===== */}

      {/* Web Hero - Default */}
      <Composition
        id="HeroVideo"
        component={HeroVideo}
        durationInFrames={PLATFORMS.web.duration * PLATFORMS.web.fps}
        fps={PLATFORMS.web.fps}
        width={PLATFORMS.web.width}
        height={PLATFORMS.web.height}
      />

      {/* YouTube */}
      <Composition
        id="HeroVideo-YouTube"
        component={HeroVideo}
        durationInFrames={PLATFORMS.youtube.duration * PLATFORMS.youtube.fps}
        fps={PLATFORMS.youtube.fps}
        width={PLATFORMS.youtube.width}
        height={PLATFORMS.youtube.height}
      />

      {/* LinkedIn Landscape */}
      <Composition
        id="HeroVideo-LinkedIn"
        component={HeroVideo}
        durationInFrames={PLATFORMS.linkedin.duration * PLATFORMS.linkedin.fps}
        fps={PLATFORMS.linkedin.fps}
        width={PLATFORMS.linkedin.width}
        height={PLATFORMS.linkedin.height}
      />

      {/* Facebook Landscape */}
      <Composition
        id="HeroVideo-Facebook"
        component={HeroVideo}
        durationInFrames={PLATFORMS.facebook.duration * PLATFORMS.facebook.fps}
        fps={PLATFORMS.facebook.fps}
        width={PLATFORMS.facebook.width}
        height={PLATFORMS.facebook.height}
      />

      {/* ===== 1:1 SQUARE ===== */}

      {/* Instagram Feed */}
      <Composition
        id="HeroVideo-Instagram"
        component={HeroVideo}
        durationInFrames={PLATFORMS.instagramFeed.duration * PLATFORMS.instagramFeed.fps}
        fps={PLATFORMS.instagramFeed.fps}
        width={PLATFORMS.instagramFeed.width}
        height={PLATFORMS.instagramFeed.height}
      />

      {/* LinkedIn Square */}
      <Composition
        id="HeroVideo-LinkedIn-Square"
        component={HeroVideo}
        durationInFrames={PLATFORMS.linkedinSquare.duration * PLATFORMS.linkedinSquare.fps}
        fps={PLATFORMS.linkedinSquare.fps}
        width={PLATFORMS.linkedinSquare.width}
        height={PLATFORMS.linkedinSquare.height}
      />

      {/* ===== 9:16 VERTICAL ===== */}

      {/* Instagram Reels */}
      <Composition
        id="HeroVideo-Reels"
        component={HeroVideo}
        durationInFrames={PLATFORMS.instagramReels.duration * PLATFORMS.instagramReels.fps}
        fps={PLATFORMS.instagramReels.fps}
        width={PLATFORMS.instagramReels.width}
        height={PLATFORMS.instagramReels.height}
      />

      {/* TikTok */}
      <Composition
        id="HeroVideo-TikTok"
        component={HeroVideo}
        durationInFrames={PLATFORMS.tiktok.duration * PLATFORMS.tiktok.fps}
        fps={PLATFORMS.tiktok.fps}
        width={PLATFORMS.tiktok.width}
        height={PLATFORMS.tiktok.height}
      />

      {/* YouTube Shorts */}
      <Composition
        id="HeroVideo-Shorts"
        component={HeroVideo}
        durationInFrames={PLATFORMS.youtubeShorts.duration * PLATFORMS.youtubeShorts.fps}
        fps={PLATFORMS.youtubeShorts.fps}
        width={PLATFORMS.youtubeShorts.width}
        height={PLATFORMS.youtubeShorts.height}
      />

      {/* ===== 4:5 PORTRAIT ===== */}

      {/* Instagram Portrait (optimal engagement) */}
      <Composition
        id="HeroVideo-Portrait"
        component={HeroVideo}
        durationInFrames={PLATFORMS.instagramPortrait.duration * PLATFORMS.instagramPortrait.fps}
        fps={PLATFORMS.instagramPortrait.fps}
        width={PLATFORMS.instagramPortrait.width}
        height={PLATFORMS.instagramPortrait.height}
      />
      {/* ===== STANDALONE CLIPS ===== */}

      {/* Intro Clip - Logo + subtitle animation */}
      <Composition
        id="IntroClip"
        component={IntroClip}
        durationInFrames={PLATFORMS.introClip.duration * PLATFORMS.introClip.fps}
        fps={PLATFORMS.introClip.fps}
        width={PLATFORMS.introClip.width}
        height={PLATFORMS.introClip.height}
      />

      {/* Outro Clip - Tagline staggered reveal */}
      <Composition
        id="OutroClip"
        component={OutroClip}
        durationInFrames={PLATFORMS.outroClip.duration * PLATFORMS.outroClip.fps}
        fps={PLATFORMS.outroClip.fps}
        width={PLATFORMS.outroClip.width}
        height={PLATFORMS.outroClip.height}
      />

      {/* ===== 4K STANDALONE CLIPS ===== */}

      {/* Intro Clip 4K */}
      <Composition
        id="IntroClip-4K"
        component={IntroClip}
        durationInFrames={PLATFORMS.introClip4K.duration * PLATFORMS.introClip4K.fps}
        fps={PLATFORMS.introClip4K.fps}
        width={PLATFORMS.introClip4K.width}
        height={PLATFORMS.introClip4K.height}
      />

      {/* Outro Clip 4K */}
      <Composition
        id="OutroClip-4K"
        component={OutroClip}
        durationInFrames={PLATFORMS.outroClip4K.duration * PLATFORMS.outroClip4K.fps}
        fps={PLATFORMS.outroClip4K.fps}
        width={PLATFORMS.outroClip4K.width}
        height={PLATFORMS.outroClip4K.height}
      />
    </>
  );
};
