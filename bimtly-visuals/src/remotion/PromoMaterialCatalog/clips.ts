import { staticFile } from "remotion";

export interface ClipDefinition {
  id: string;
  src: string;
  /** Total duration this clip occupies in the timeline (frames at 30fps) */
  durationInFrames: number;
  /** 1 = normal, 2 = double speed */
  playbackRate: number;
}

/** Crossfade overlap between adjacent sections (1s at 30fps) */
export const CROSSFADE_DURATION = 30;

/** Intro = 5s (OpeningTitle animation) */
export const INTRO_DURATION = 150;

/** Outro = 4s (Tagline animation) */
export const OUTRO_DURATION = 120;

/** Music fade in/out duration (1.5s at 30fps) */
export const MUSIC_FADE_DURATION = 45;

export const CLIPS: ClipDefinition[] = [
  {
    id: "cutlist-walkthrough",
    src: staticFile("videos/promo/cutlist-walkthrough.mp4"),
    durationInFrames: 450, // 15s at 2x speed
    playbackRate: 2,
  },
  {
    id: "kitchen-web3d",
    src: staticFile("videos/promo/kitchen-area-web3d.mp4"),
    durationInFrames: 300, // 10s at 2x speed
    playbackRate: 2,
  },
  {
    id: "catalog-rendering",
    src: staticFile("videos/promo/catalog-rendering.mp4"),
    durationInFrames: 240, // 8s full
    playbackRate: 1,
  },
  {
    id: "material-catalog-gen",
    src: staticFile("videos/promo/material-catalog-gen.mp4"),
    durationInFrames: 150, // 5s hard stop
    playbackRate: 1,
  },
];
