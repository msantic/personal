import { useState, useEffect, useCallback } from 'react';
import { ImageShowcase } from '../../design';
import './image-showcase-demo.css';

// All thumbnail images
const THUMBNAILS = [
  'thumbnails/1016.png',
  'thumbnails/3576.png',
  'thumbnails/4009.png',
  'thumbnails/4657.png',
  'thumbnails/467.png',
  'thumbnails/585.png',
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
  'thumbnails/950.png',
  'thumbnails/978.png',
  'thumbnails/998.png',
  'thumbnails/feal.png',
  'thumbnails/pergola-config.png',
];

const STYLES = [
  { id: 'scrolling-grid', name: 'Scrolling Grid', description: 'Continuous vertical scroll' },
  { id: 'staggered-reveal', name: 'Staggered Reveal', description: 'Images appear one by one' },
  { id: 'floating-cards', name: 'Floating Cards', description: '3D cards in space' },
  { id: 'ken-burns', name: 'Ken Burns', description: 'Slow zoom and pan' },
  { id: 'rapid-showcase', name: 'Rapid Showcase', description: 'Quick full-screen slideshow' },
  { id: 'rapid-browser', name: 'Browser Frame', description: 'Slideshow in macOS browser' },
  { id: 'rapid-monitor', name: 'Monitor Frame', description: 'Slideshow in Apple monitor' },
  { id: 'rapid-combined', name: 'Combined', description: 'Browser inside monitor' },
];

export default function ImageShowcaseDemo() {
  const [style, setStyle] = useState('floating-cards');
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [fps] = useState(30);
  const [durationInFrames] = useState(120);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % durationInFrames);
    }, 1000 / (fps * speed));

    return () => clearInterval(interval);
  }, [isPlaying, fps, speed, durationInFrames]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.code === 'ArrowRight') {
        setFrame((f) => Math.min(f + 1, durationInFrames - 1));
      } else if (e.code === 'ArrowLeft') {
        setFrame((f) => Math.max(f - 1, 0));
      } else if (e.code === 'Digit1') setStyle('scrolling-grid');
      else if (e.code === 'Digit2') setStyle('staggered-reveal');
      else if (e.code === 'Digit3') setStyle('floating-cards');
      else if (e.code === 'Digit4') setStyle('ken-burns');
      else if (e.code === 'Digit5') setStyle('rapid-showcase');
      else if (e.code === 'Digit6') setStyle('rapid-browser');
      else if (e.code === 'Digit7') setStyle('rapid-monitor');
      else if (e.code === 'Digit8') setStyle('rapid-combined');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [durationInFrames]);

  return (
    <div className="showcase-demo-page">
      {/* Controls */}
      <div className="showcase-demo-controls">
        <h2>Image Showcase Demo</h2>

        <div className="control-group">
          <label>Animation Style (1-8):</label>
          <div className="style-buttons">
            {STYLES.map((s, i) => (
              <button
                key={s.id}
                className={style === s.id ? 'active' : ''}
                onClick={() => setStyle(s.id)}
                title={s.description}
              >
                {i + 1}. {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label>
            Frame: {frame} / {durationInFrames - 1}
            <span className="time">({(frame / fps).toFixed(1)}s)</span>
          </label>
          <input
            type="range"
            min="0"
            max={durationInFrames - 1}
            value={frame}
            onChange={(e) => setFrame(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>Speed: {speed}x</label>
          <input
            type="range"
            min="0.25"
            max="3"
            step="0.25"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>

        <div className="control-group playback">
          <button onClick={() => setFrame(0)}>Reset</button>
          <button onClick={() => setIsPlaying((p) => !p)}>
            {isPlaying ? 'Pause' : 'Play'} (Space)
          </button>
        </div>

        <div className="shortcuts">
          <strong>Shortcuts:</strong> Space = play/pause, 1-8 = styles, ←/→ = frame step
        </div>
      </div>

      {/* Demo Area */}
      <div className="showcase-demo-area">
        <ImageShowcase
          images={THUMBNAILS}
          style={style}
          frame={frame}
          fps={fps}
          width={1000}
          height={563}
          durationInFrames={durationInFrames}
        />
      </div>
    </div>
  );
}
