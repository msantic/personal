import { Composition } from "remotion";
import { HeroVideo } from "./HeroVideo";

/**
 * Platform Video Configurations
 *
 * All platforms render from the same HeroVideo component.
 * The component adapts its layout based on the aspect ratio.
 */

// Platform presets with recommended dimensions
const PLATFORMS = {
  // 16:9 Landscape
  web: { width: 1920, height: 1080, fps: 30, duration: 12 },
  youtube: { width: 1920, height: 1080, fps: 30, duration: 12 },
  linkedin: { width: 1920, height: 1080, fps: 30, duration: 12 },
  facebook: { width: 1920, height: 1080, fps: 30, duration: 12 },

  // 1:1 Square
  instagramFeed: { width: 1080, height: 1080, fps: 30, duration: 12 },
  linkedinSquare: { width: 1080, height: 1080, fps: 30, duration: 12 },
  facebookSquare: { width: 1080, height: 1080, fps: 30, duration: 12 },

  // 9:16 Vertical
  instagramReels: { width: 1080, height: 1920, fps: 30, duration: 12 },
  tiktok: { width: 1080, height: 1920, fps: 30, duration: 12 },
  youtubeShorts: { width: 1080, height: 1920, fps: 30, duration: 12 },

  // 4:5 Portrait (Instagram optimal)
  instagramPortrait: { width: 1080, height: 1350, fps: 30, duration: 12 },
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
    </>
  );
};
