import '../styles/flyer-v2.css'

export default function FlyerV2() {
  return (
    <div className="flyer-v2">
      <div className="accent-line" />
      <div className="grid-pattern" />

      <div className="content">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <img src="/assets/LOGO + BIMTLY - white.svg" alt="BIMTLY" className="logo-img" />
          </div>
          <div className="header-right">
            <span className="industry-tag">Construction & Modular Building</span>
          </div>
        </header>

        {/* Hero */}
        <section className="hero">
          <h1 className="hero-title">
            Stop Losing Deals to <span className="highlight">Outdated Catalogs</span>
          </h1>
          <p className="hero-subtitle">
            Your competitors respond in hours. You're still emailing PDFs and spreadsheets.
            BIMTLY connects your 3D models, parts catalog, and quotes in one platform.
          </p>
        </section>

        {/* Old vs New */}
        <section className="comparison">
          <div className="comparison-col old">
            <h3 className="comparison-title">The Old Way</h3>
            <ul className="comparison-list">
              <li>Static PDF catalogs outdated on arrival</li>
              <li>Quote turnaround: days, not minutes</li>
              <li>3D files locked in Revit/SketchUp</li>
              <li>Sales reps = "catalog lookup service"</li>
            </ul>
          </div>
          <div className="comparison-arrow">→</div>
          <div className="comparison-col new">
            <h3 className="comparison-title">With BIMTLY</h3>
            <ul className="comparison-list">
              <li>Interactive 3D configurators online</li>
              <li>Instant quotes with real pricing</li>
              <li>Browser-based 3D — no plugins</li>
              <li>Self-service product exploration</li>
            </ul>
          </div>
        </section>

        {/* Core Modules */}
        <section className="modules">
          <h2 className="section-title">Everything You Need, Connected</h2>
          <div className="modules-grid">
            <div className="module">
              <div className="module-icon">3D</div>
              <h4 className="module-title">3D Studio</h4>
              <p className="module-desc">Interactive 3D & AR configurators. Customers explore products themselves.</p>
            </div>
            <div className="module">
              <div className="module-icon">PC</div>
              <h4 className="module-title">Parts Catalog</h4>
              <p className="module-desc">Organized product database. Update once, sync everywhere.</p>
            </div>
            <div className="module">
              <div className="module-icon">QS</div>
              <h4 className="module-title">Quotation System</h4>
              <p className="module-desc">Generate accurate quotes instantly. Close deals faster.</p>
            </div>
          </div>
        </section>

        {/* Target Industries */}
        <section className="industries">
          <h3 className="industries-title">Built For</h3>
          <div className="industries-list">
            <span className="industry">Prefab Houses</span>
            <span className="industry">Modular Construction</span>
            <span className="industry">Windows & Doors</span>
            <span className="industry">Facade Systems</span>
            <span className="industry">Outdoor Structures</span>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2 className="cta-title">See It In Action</h2>
          <div className="cta-buttons">
            <a href="https://bimtly.com/demo" className="btn btn-primary">Book a Demo</a>
            <a href="https://bimtly.com" className="btn btn-secondary">14-Day Free Trial</a>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="contact-row">
            <span>marko@bimtly.com</span>
            <span>+385 98 569 604</span>
            <span>www.bimtly.com</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
