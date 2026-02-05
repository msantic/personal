/**
 * BrowserFrame - macOS-style browser window mockup
 *
 * Renders children inside a realistic browser chrome with
 * traffic light buttons and address bar.
 */

interface BrowserFrameProps {
  children: React.ReactNode;
  width: number;
  height: number;
  url?: string;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  children,
  width,
  height,
  url = 'www.bimtly.com',
}) => {
  const toolbarHeight = 28;
  const borderRadius = 8;
  const contentHeight = height - toolbarHeight;

  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        overflow: 'hidden',
        boxShadow: `
          0 25px 80px rgba(0, 0, 0, 0.2),
          0 10px 30px rgba(0, 0, 0, 0.15)
        `,
      }}
    >
      {/* Browser toolbar */}
      <div
        style={{
          height: toolbarHeight,
          background: 'linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 100%)',
          borderBottom: '1px solid #d0d0d0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          gap: 10,
        }}
      >
        {/* Traffic light buttons */}
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>

        {/* Address bar */}
        <div
          style={{
            flex: 1,
            height: 18,
            background: '#fff',
            borderRadius: 4,
            border: '1px solid #d0d0d0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            gap: 6,
          }}
        >
          {/* Lock icon */}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span style={{ fontSize: 11, color: '#555', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {url}
          </span>
        </div>
      </div>

      {/* Browser content */}
      <div
        style={{
          position: 'relative',
          width,
          height: contentHeight,
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BrowserFrame;
