import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BrandingBadge } from "../../design/BrandingBadge";
import { IntroClip } from "../IntroClip";
import { OutroClip } from "../OutroClip";
import { VideoClip } from "./VideoClip";
import {
  CLIPS,
  CROSSFADE_DURATION,
  INTRO_DURATION,
  MUSIC_FADE_DURATION,
  OUTRO_DURATION,
} from "./clips";

export const PromoMaterialCatalog: React.FC = () => {
  // Timeline positions — each section overlaps the previous by CROSSFADE_DURATION
  const clip1Start = INTRO_DURATION - CROSSFADE_DURATION; // 120
  const clip2Start =
    clip1Start + CLIPS[0].durationInFrames - CROSSFADE_DURATION; // 540
  const clip3Start =
    clip2Start + CLIPS[1].durationInFrames - CROSSFADE_DURATION; // 810
  const clip4Start =
    clip3Start + CLIPS[2].durationInFrames - CROSSFADE_DURATION; // 1020
  const outroStart =
    clip4Start + CLIPS[3].durationInFrames - CROSSFADE_DURATION; // 1140

  // Music spans all content clips (from clip1 start to clip4 end)
  const musicStart = clip1Start; // 120
  const musicDuration =
    clip4Start + CLIPS[3].durationInFrames - clip1Start; // 1050

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      {/* ===== INTRO ===== */}
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <IntroClip />
      </Sequence>

      {/* ===== CLIP 1: Cutlist Walkthrough (2x, 15s) ===== */}
      <Sequence from={clip1Start} durationInFrames={CLIPS[0].durationInFrames}>
        <VideoClip
          src={CLIPS[0].src}
          playbackRate={CLIPS[0].playbackRate}
          durationInFrames={CLIPS[0].durationInFrames}
        />
      </Sequence>

      {/* ===== CLIP 2: Kitchen Web3D (2x, 10s) ===== */}
      <Sequence from={clip2Start} durationInFrames={CLIPS[1].durationInFrames}>
        <VideoClip
          src={CLIPS[1].src}
          playbackRate={CLIPS[1].playbackRate}
          durationInFrames={CLIPS[1].durationInFrames}
        />
      </Sequence>

      {/* ===== CLIP 3: Catalog Rendering (8s) ===== */}
      <Sequence from={clip3Start} durationInFrames={CLIPS[2].durationInFrames}>
        <VideoClip
          src={CLIPS[2].src}
          playbackRate={CLIPS[2].playbackRate}
          durationInFrames={CLIPS[2].durationInFrames}
        />
      </Sequence>

      {/* ===== CLIP 4: Material Catalog Gen (5s hard stop) ===== */}
      <Sequence from={clip4Start} durationInFrames={CLIPS[3].durationInFrames}>
        <VideoClip
          src={CLIPS[3].src}
          playbackRate={CLIPS[3].playbackRate}
          durationInFrames={CLIPS[3].durationInFrames}
        />
      </Sequence>

      {/* ===== OUTRO ===== */}
      <Sequence from={outroStart} durationInFrames={OUTRO_DURATION}>
        <OutroClip />
      </Sequence>

      {/* ===== BRANDING OVERLAY (content clips only, covers Veo watermark) ===== */}
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

/** Music with fade in/out envelope — only during content clips */
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
