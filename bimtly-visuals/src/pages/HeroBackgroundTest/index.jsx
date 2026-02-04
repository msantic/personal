import { useState } from 'react'
import { HeroBackground } from '../../design'
import './hero-background-test.css'

const presets = [
  { name: 'Default (Centered)', position: '50% 50%' },
  { name: 'Bottom Right', position: '80% 80%' },
  { name: 'Top Right', position: '80% 20%' },
  { name: 'Bottom Left', position: '20% 80%' },
]

export default function HeroBackgroundTest() {
  const [flarePosition, setFlarePosition] = useState('50% 50%')
  const [showGrid, setShowGrid] = useState(true)
  const [showTopGlow, setShowTopGlow] = useState(true)
  const [showWarmFlare, setShowWarmFlare] = useState(true)
  const [gridSize, setGridSize] = useState(12)

  return (
    <div className="hero-test-page">
      {/* Controls */}
      <div className="hero-test-controls">
        <h2>HeroBackground Test</h2>

        <div className="control-group">
          <label>Flare Position:</label>
          <div className="preset-buttons">
            {presets.map((preset) => (
              <button
                key={preset.position}
                className={flarePosition === preset.position ? 'active' : ''}
                onClick={() => setFlarePosition(preset.position)}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label>Grid Size: {gridSize}px</label>
          <input
            type="range"
            min="8"
            max="32"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
          />
        </div>

        <div className="control-group toggles">
          <label>
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
            />
            Show Grid
          </label>
          <label>
            <input
              type="checkbox"
              checked={showTopGlow}
              onChange={(e) => setShowTopGlow(e.target.checked)}
            />
            Show Top Glow
          </label>
          <label>
            <input
              type="checkbox"
              checked={showWarmFlare}
              onChange={(e) => setShowWarmFlare(e.target.checked)}
            />
            Show Warm Flare
          </label>
        </div>
      </div>

      {/* Demo Area */}
      <HeroBackground
        className="hero-test-demo"
        showGrid={showGrid}
        showTopGlow={showTopGlow}
        showWarmFlare={showWarmFlare}
        gridSize={gridSize}
        flarePosition={flarePosition}
      >
        <div className="hero-test-content">
          <h1>Engage your customers with realistic, interactive product experiences</h1>
          <p>Right in your browser, on any device</p>
        </div>
      </HeroBackground>
    </div>
  )
}
