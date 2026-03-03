import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CROSSFADE_DURATION } from "./clips";

interface VideoClipProps {
  src: string;
  playbackRate?: number;
  durationInFrames: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
  /** How the video fills the frame. Default "cover" (crop to fill). Use "contain" to show full video. */
  objectFit?: React.CSSProperties["objectFit"];
}

export const VideoClip: React.FC<VideoClipProps> = ({
  src,
  playbackRate = 1,
  durationInFrames,
  fadeIn = true,
  fadeOut = true,
  objectFit = "cover",
}) => {
  const frame = useCurrentFrame();

  const fadeInOpacity = fadeIn
    ? interpolate(frame, [0, CROSSFADE_DURATION], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const fadeOutOpacity = fadeOut
    ? interpolate(
        frame,
        [durationInFrames - CROSSFADE_DURATION, durationInFrames],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 1;

  const opacity = fadeInOpacity * fadeOutOpacity;

  // Subtle scale-up during fade-out for depth effect
  const scale = fadeOut
    ? interpolate(
        frame,
        [durationInFrames - CROSSFADE_DURATION, durationInFrames],
        [1, 1.02],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 1;

  return (
    <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>
      <OffthreadVideo
        src={src}
        playbackRate={playbackRate}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit,
        }}
      />
    </AbsoluteFill>
  );
};
