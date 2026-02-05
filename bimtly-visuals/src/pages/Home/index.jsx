import { Link } from 'react-router-dom'
import './home.css'

const pages = [
  { path: '/flyer', name: 'Flyer', description: 'Original marketing flyer with i18n' },
  { path: '/flyer-v2', name: 'Flyer V2', description: 'Redesigned marketing flyer' },
  { path: '/pitch-deck', name: 'Pitch Deck', description: 'Investor pitch deck (placeholder)' },
  { path: '/platform', name: 'Platform Diagram', description: 'Interactive platform features diagram' },
  { path: '/connectivity', name: 'Digital Connectivity', description: 'Input/output integration flow diagram' },
  { path: '/hero-bg', name: 'Hero Background', description: 'Test page for reusable hero background component' },
  { path: '/showcase', name: 'Image Showcase', description: 'Animated image grid/collage demo with multiple styles' },
  { path: '/devices', name: 'Device Mocks', description: 'Apple device mockups with video/image content' },
]

export default function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>BIMTLY Visuals</h1>
        <p>Marketing materials and visual assets</p>
      </header>

      <nav className="pages-grid">
        {pages.map((page) => (
          <Link key={page.path} to={page.path} className="page-card">
            <h2>{page.name}</h2>
            <p>{page.description}</p>
            <span className="page-path">{page.path}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
