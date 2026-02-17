import { AbsoluteFill } from "remotion";
import { BACKGROUNDS } from "../design";
import { Tagline } from "./HeroVideo/Tagline";
import "./HeroVideo/styles.css";

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
    </AbsoluteFill>
  );
};
