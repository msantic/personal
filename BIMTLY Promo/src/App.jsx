import { Routes, Route, Navigate } from 'react-router-dom'
import Flyer from './pages/Flyer'
import PitchDeck from './pages/PitchDeck'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/flyer" replace />} />
      <Route path="/flyer" element={<Flyer />} />
      <Route path="/pitch-deck" element={<PitchDeck />} />
    </Routes>
  )
}

export default App
