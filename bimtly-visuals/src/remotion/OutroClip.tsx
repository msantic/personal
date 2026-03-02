import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { BACKGROUNDS } from "../design";
import { Tagline } from "./HeroVideo/Tagline";
import "./HeroVideo/styles.css";

const OUTRO_SFX = {
  stinger: staticFile("audio/out/grumpynora-pleasing-5-sec-edit-stinger-467228.mp3"),
};

export const OutroClip: React.FC = () => {
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
        <Tagline />
      </AbsoluteFill>

      {/* Pleasing stinger — plays from start, matches tagline reveal */}
      <Html5Audio src={OUTRO_SFX.stinger} volume={0.6} />
    </AbsoluteFill>
  );
};
