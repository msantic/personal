import { Routes, Route, Navigate } from 'react-router-dom'
import Flyer from './pages/Flyer'
import FlyerV2 from './pages/FlyerV2'
import PitchDeck from './pages/PitchDeck'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/flyer-v2" replace />} />
      <Route path="/flyer" element={<Flyer />} />
      <Route path="/flyer-v2" element={<FlyerV2 />} />
      <Route path="/pitch-deck" element={<PitchDeck />} />
    </Routes>
  )
}

export default App
