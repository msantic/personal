import Header from '../components/Header'
import Hero from '../components/Hero'
import Pillars from '../components/Pillars'
import Benefits from '../components/Benefits'
import Features from '../components/Features'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import '../styles/flyer.css'

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
