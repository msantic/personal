import Header from './Header'
import Hero from './Hero'
import Pillars from './Pillars'
import Benefits from './Benefits'
import Features from './Features'
import CTASection from './CTASection'
import Footer from './Footer'
import './flyer.css'

export default function Flyer() {
  return (
    <div className="flyer">
      <div className="accent-line" />
      <div className="grid-pattern" />

      <div className="content">
        <Header />
        <Hero />
        <Pillars />
        <Benefits />
        <Features />
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}
