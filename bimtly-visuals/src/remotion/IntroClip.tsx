import { AbsoluteFill, Html5Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BACKGROUNDS } from "../design";
import { OpeningTitle } from "./HeroVideo/OpeningTitle";
import "./HeroVideo/styles.css";

const INTRO_SFX = {
  logoReveal: staticFile("audio/breakzstudios-piano-logo-reveal-201060.mp3"),
  exitWhoosh: staticFile("audio/universfield-fast-swish-transition-noise-352756 soft whoosh.mp3"),
};

export const IntroClip: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade out the logo reveal audio towards the end so it doesn't cut abruptly
  // (the file is 7.5s but our clip is 5s)
  const logoVolume = interpolate(frame, [110, 143], [0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heroVars = {
    '--hero-grid-color': BACKGROUNDS.grid.light.color,
    '--hero-indigo': BACKGROUNDS.hero.indigoColor,
    '--hero-orange': BACKGROUNDS.hero.orangeColor,
    '--hero-flare-opacity': String(BACKGROUNDS.hero.flareOpacity),
    '--flare-x': '20%',
    '--flare-y': '80%',
  } as React.CSSProperties;

  return (
    <AbsoluteFill className="hero-container" style={heroVars}>
      <div className="hero-bg-grid" />
      <div className="hero-bg-warm-flare" />
      <div className="hero-bg-top-glow" />
      <AbsoluteFill className="hero-bg-content">
        <OpeningTitle />
      </AbsoluteFill>

      {/* Piano logo reveal — starts at frame 0, fades out with exit animation */}
      <Html5Audio src={INTRO_SFX.logoReveal} volume={logoVolume} />

      {/* Soft whoosh on exit — starts when subtitle fades out (frame 110) */}
      <Sequence from={110}>
        <Html5Audio src={INTRO_SFX.exitWhoosh} volume={0.5} />
      </Sequence>
    </AbsoluteFill>
  );
};
