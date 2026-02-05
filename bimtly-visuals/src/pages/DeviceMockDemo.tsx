/**
 * DeviceMockDemo - Demo page for device mockup components
 */

import { DeviceMock, IMacMock, IPadMock, IPhoneMock } from '../design/frames/DeviceMock';
import { DeviceShowcase } from '../design/frames/DeviceShowcase';

const DeviceMockDemo = () => {
  // Use the captured demo videos
  const desktopVideo = '/videos/8520-macbook-pro-16.mp4';
  const tabletVideo = '/videos/8520-ipad-pro-12.mp4';
  const mobileVideo = '/videos/8520-iphone-15-pro.mp4';

  return (
    <div style={{ padding: 40, background: '#1a1a2e', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', marginBottom: 40 }}>Device Mockups</h1>

      {/* Section: Individual Devices */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{ color: '#888', marginBottom: 24 }}>Individual Devices</h2>
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: '#666', marginBottom: 8 }}>iMac (scale: 0.4)</p>
            <IMacMock videoSrc={desktopVideo} scale={0.4} />
          </div>
          <div>
            <p style={{ color: '#666', marginBottom: 8 }}>iPad (scale: 0.5)</p>
            <IPadMock videoSrc={tabletVideo} scale={0.5} />
          </div>
          <div>
            <p style={{ color: '#666', marginBottom: 8 }}>iPhone (scale: 0.5)</p>
            <IPhoneMock videoSrc={mobileVideo} scale={0.5} />
          </div>
        </div>
      </section>

      {/* Section: Horizontal Layout */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{ color: '#888', marginBottom: 24 }}>Showcase: Horizontal</h2>
        <DeviceShowcase
          desktopVideo={desktopVideo}
          tabletVideo={tabletVideo}
          mobileVideo={mobileVideo}
          layout="horizontal"
          scale={0.35}
        />
      </section>

      {/* Section: Perspective Layout */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{ color: '#888', marginBottom: 24 }}>Showcase: Perspective</h2>
        <DeviceShowcase
          desktopVideo={desktopVideo}
          tabletVideo={tabletVideo}
          mobileVideo={mobileVideo}
          layout="perspective"
          scale={0.4}
        />
      </section>

      {/* Section: Stacked Layout */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{ color: '#888', marginBottom: 24 }}>Showcase: Stacked</h2>
        <div style={{ height: 600 }}>
          <DeviceShowcase
            desktopVideo={desktopVideo}
            tabletVideo={tabletVideo}
            mobileVideo={mobileVideo}
            layout="stacked"
            scale={0.5}
          />
        </div>
      </section>

      {/* Section: With Images */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{ color: '#888', marginBottom: 24 }}>With Thumbnails</h2>
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end' }}>
          <DeviceMock
            device="imac"
            imageSrc="/thumbnails/8520-macbook-pro-16.png"
            scale={0.35}
          />
          <DeviceMock
            device="ipad"
            imageSrc="/thumbnails/8520-ipad-pro-12.png"
            scale={0.45}
          />
          <DeviceMock
            device="iphone"
            imageSrc="/thumbnails/8520-iphone-15-pro.png"
            scale={0.45}
          />
        </div>
      </section>
    </div>
  );
};

export default DeviceMockDemo;
