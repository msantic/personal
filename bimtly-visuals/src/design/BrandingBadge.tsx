/**
 * BrandingBadge — Frosted-glass logo overlay for video watermarking
 *
 * Renders the white BIMTLY logo (icon + wordmark) inside a blurred pill,
 * positioned in the bottom-right corner. Scales proportionally to output width.
 *
 * Usage:
 *   <BrandingBadge durationInFrames={totalFrames} />
 *
 * Fade behavior:
 *   - Fades in over CROSSFADE_DURATION at the start of its Sequence
 *   - Fades out over CROSSFADE_DURATION at the end
 *   - Set fadeIn={false} or fadeOut={false} to disable
 */

import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const BADGE_CROSSFADE = 30; // 1s at 30fps — default fade duration

interface BrandingBadgeProps {
  durationInFrames: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
  /** Logo width as fraction of output width (default 0.09) */
  sizeRatio?: number;
  /** Edge padding as fraction of output width (default 0.01) */
  paddingRatio?: number;
}

export const BrandingBadge: React.FC<BrandingBadgeProps> = ({
  durationInFrames,
  fadeIn = true,
  fadeOut = true,
  sizeRatio = 0.09,
  paddingRatio = 0.01,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const fadeInOpacity = fadeIn
    ? interpolate(frame, [0, BADGE_CROSSFADE], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  const fadeOutOpacity = fadeOut
    ? interpolate(
        frame,
        [durationInFrames - BADGE_CROSSFADE, durationInFrames],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 1;
  const opacity = fadeInOpacity * fadeOutOpacity;

  const logoWidth = width * sizeRatio;
  const padding = width * paddingRatio;
  const badgePadding = width * 0.008;

  return (
    <div
      style={{
        position: "absolute",
        bottom: padding + 6,
        right: padding,
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: `${badgePadding * 0.6}px ${badgePadding}px`,
        borderRadius: badgePadding * 0.8,
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <Img
        src={staticFile("branding/logo_with_name_white.svg")}
        style={{ width: logoWidth, height: "auto" }}
      />
    </div>
  );
};
