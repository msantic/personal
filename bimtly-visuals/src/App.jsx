import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Flyer from './pages/Flyer'
import FlyerV2 from './pages/FlyerV2'
import PitchDeck from './pages/PitchDeck'
import PlatformPage from './pages/PlatformDiagram'
import ConnectivityPage from './pages/DigitalConnectivity'
import HeroBackgroundTest from './pages/HeroBackgroundTest'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flyer" element={<Flyer />} />
      <Route path="/flyer-v2" element={<FlyerV2 />} />
      <Route path="/pitch-deck" element={<PitchDeck />} />
      <Route path="/platform" element={<PlatformPage />} />
      <Route path="/connectivity" element={<ConnectivityPage />} />
      <Route path="/hero-bg" element={<HeroBackgroundTest />} />
    </Routes>
  )
}

export default App
