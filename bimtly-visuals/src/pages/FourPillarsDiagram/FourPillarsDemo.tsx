/**
 * Demo page for Four Pillars Diagram
 */

import FourPillarsDiagram from './FourPillarsDiagram';

export default function FourPillarsDemo() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      padding: '60px 40px',
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 700,
        color: '#1f2937',
        marginBottom: 16,
        fontFamily: 'Inter, sans-serif',
      }}>
        Show → Configure → Quote → Sell
      </h1>
      <p style={{
        textAlign: 'center',
        fontSize: 18,
        color: '#6b7280',
        marginBottom: 60,
        fontFamily: 'Inter, sans-serif',
      }}>
        The BIMTLY customer journey
      </p>

      <FourPillarsDiagram mode="web" />
    </div>
  );
}
