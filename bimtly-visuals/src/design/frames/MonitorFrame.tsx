/**
 * MonitorFrame - Apple-style monitor mockup
 *
 * Renders children inside a realistic monitor with
 * aluminum bezel, stand neck, and base.
 */

interface MonitorFrameProps {
  children: React.ReactNode;
  width: number;
  height: number;
  /** Screen background color (default: #000) */
  screenBackground?: string;
}

export const MonitorFrame: React.FC<MonitorFrameProps> = ({
  children,
  width,
  height,
  screenBackground = '#000',
}) => {
  const bezelWidth = 12;
  const bezelRadius = 16;
  const standHeight = height * 0.18;
  const standWidth = width * 0.25;
  const baseWidth = width * 0.35;
  const baseHeight = 8;

  // Screen dimensions (inside bezel)
  const screenWidth = width - bezelWidth * 2;
  const screenHeight = height - bezelWidth * 2;

  return (
    <div>
      {/* Monitor body */}
      <div
        style={{
          width,
          height,
          background: 'linear-gradient(180deg, #e8e8e8 0%, #d4d4d4 100%)',
          borderRadius: bezelRadius,
          padding: bezelWidth,
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.15),
            0 8px 25px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `,
        }}
      >
        {/* Screen */}
        <div
          style={{
            position: 'relative',
            width: screenWidth,
            height: screenHeight,
            borderRadius: 4,
            overflow: 'hidden',
            background: screenBackground,
          }}
        >
          {children}
        </div>
      </div>

      {/* Stand neck */}
      <div
        style={{
          width: standWidth,
          height: standHeight,
          margin: '0 auto',
          background: 'linear-gradient(90deg, #d0d0d0 0%, #e8e8e8 50%, #d0d0d0 100%)',
          borderRadius: '0 0 4px 4px',
        }}
      />

      {/* Stand base */}
      <div
        style={{
          width: baseWidth,
          height: baseHeight,
          margin: '0 auto',
          background: 'linear-gradient(180deg, #c8c8c8 0%, #b8b8b8 100%)',
          borderRadius: '0 0 8px 8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      />
    </div>
  );
};

export default MonitorFrame;
