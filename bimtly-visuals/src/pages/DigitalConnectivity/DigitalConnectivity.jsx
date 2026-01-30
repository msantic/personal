import {
  FileText,
  Box,
  Shapes,
  Image,
  Type,
  Plus,
  Database,
  Mail,
  CheckSquare,
  ShoppingCart,
  Presentation,
  Share2,
  Layout,
} from 'lucide-react'
import houseImage from './assets/drive.png'
import house3dImage from './assets/house3d.png'
import wordpressLogo from './assets/wordpress.svg'
import shopifyLogo from './assets/shopify.svg'
import gmailLogo from './assets/gmail.svg'
import whatsappLogo from './assets/whatsapp.svg'
import slackLogo from './assets/slack.svg'
import sapLogo from './assets/sap.svg'

const inputs = [
  { id: '3d', label: '3D models', icon: Box, highlighted: true },
  { id: 'cad', label: 'Technical drawings', icon: FileText },
  { id: 'doc', label: 'Documents & PDF', icon: Type },
  { id: 'vector', label: 'Images', icon: Shapes },
  { id: 'bim', label: 'BIM models (IFC)', icon: Image },
  { id: 'scratch', label: 'Create from scratch', icon: Plus },
]

const outputs = [
  { id: 'cms', label: 'CMS / Web publishing', icon: Layout },
  { id: 'social', label: 'Social Media', icon: Share2 },
  { id: 'email', label: 'E-mail and chat', icon: Mail },
  { id: 'plm', label: 'PLM', icon: Database },
  { id: 'productivity', label: 'Productivity tools', icon: CheckSquare },
  { id: 'ecomm', label: 'E-comm platforms', icon: ShoppingCart },
  { id: 'presentations', label: 'Presentations', icon: Presentation },
]

const toolLogos = [
  { name: 'WordPress', logo: wordpressLogo },
  { name: 'Shopify', logo: shopifyLogo },
  { name: 'Gmail', logo: gmailLogo },
  { name: 'WhatsApp', logo: whatsappLogo },
  { name: 'Slack', logo: slackLogo },
  { name: 'SAP', logo: sapLogo },
]

export default function DigitalConnectivity({ centerImage = null }) {
  // Fixed viewBox dimensions for consistent positioning
  const viewWidth = 1000
  const viewHeight = 500

  // Center point (where platform circle is)
  const centerX = viewWidth / 2
  const centerY = viewHeight / 2

  // Input positions (left side) - tighter spacing
  const inputX = 180 // X position for dots (right of input boxes)
  const inputItemSpacing = 48 // Pixels between items
  const inputTotalHeight = (inputs.length - 1) * inputItemSpacing
  const inputStartY = (viewHeight - inputTotalHeight) / 2

  // Output positions (right side) - tighter spacing
  const outputX = 780 // X position for dots (left of output boxes)
  const outputItemSpacing = 48 // Pixels between items
  const outputTotalHeight = (outputs.length - 1) * outputItemSpacing
  const outputStartY = (viewHeight - outputTotalHeight) / 2

  // Connection point on center (where lines meet)
  const centerLeftX = centerX - 100
  const centerRightX = centerX + 100

  // Generate curved paths for inputs (left to center)
  const generateInputPath = (index) => {
    const startY = inputStartY + index * inputItemSpacing
    const endY = centerY
    // Bezier control points for smooth S-curve
    const cp1x = inputX + 80
    const cp1y = startY
    const cp2x = centerLeftX - 60
    const cp2y = endY
    return `M ${inputX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${centerLeftX} ${endY}`
  }

  // Generate curved paths for outputs (center to right)
  const generateOutputPath = (index) => {
    const endY = outputStartY + index * outputItemSpacing
    const startY = centerY
    // Bezier control points for smooth S-curve
    const cp1x = centerRightX + 60
    const cp1y = startY
    const cp2x = outputX - 80
    const cp2y = endY
    return `M ${centerRightX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${outputX} ${endY}`
  }

  return (
    <div className="digital-connectivity">
      {/* Header */}
      <header className="connectivity-header">
        <h1 className="connectivity-title">Enhances Digital Connectivity</h1>
        <span className="connectivity-tagline">Connects with everything you already use</span>
      </header>

      {/* Main diagram container with fixed aspect ratio */}
      <div className="connectivity-diagram">
        {/* SVG layer for connection paths - using viewBox for consistent coordinates */}
        <svg
          className="connections-svg"
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Input connection paths */}
          {inputs.map((_, index) => (
            <path
              key={`input-path-${index}`}
              d={generateInputPath(index)}
              className="connection-path input-path"
              style={{ animationDelay: `${1.0 + index * 0.1}s, ${1.5 + index * 0.1}s` }}
            />
          ))}

          {/* Output connection paths */}
          {outputs.map((_, index) => (
            <path
              key={`output-path-${index}`}
              d={generateOutputPath(index)}
              className="connection-path output-path"
              style={{ animationDelay: `${1.0 + index * 0.08}s, ${1.5 + index * 0.08}s` }}
            />
          ))}

          {/* Small dots at connection endpoints */}
          {inputs.map((_, index) => {
            const y = inputStartY + index * inputItemSpacing
            return (
              <circle
                key={`input-dot-${index}`}
                cx={inputX}
                cy={y}
                r={4}
                className="connection-dot"
              />
            )
          })}

          {outputs.map((_, index) => {
            const y = outputStartY + index * outputItemSpacing
            return (
              <circle
                key={`output-dot-${index}`}
                cx={outputX}
                cy={y}
                r={4}
                className="connection-dot"
              />
            )
          })}
        </svg>

        {/* Left column: Inputs - positioned absolutely within the SVG coordinate space */}
        <div className="inputs-column">
          {inputs.map((item, index) => {
            const Icon = item.icon
            const topPercent = ((inputStartY + index * inputItemSpacing) / viewHeight) * 100
            return (
              <div
                key={item.id}
                className={`item-card input-item ${item.highlighted ? 'highlighted' : ''}`}
                style={{
                  top: `${topPercent}%`,
                  animationDelay: `${0.5 + index * 0.08}s`
                }}
              >
                <Icon className="item-icon" size={18} strokeWidth={1.5} />
                <span className="item-label">{item.label}</span>
              </div>
            )
          })}
        </div>

        {/* Platform circle - absolutely centered */}
        <div className="platform-circle">
          <span className="platform-title">BIMTLY</span>
          <span className="platform-subtitle">Platform</span>
        </div>

        {/* Center: Browser mockup */}
        <div className="center-column">
          {/* Center image in browser mockup */}
          <div className="center-image-container">
            <div className="browser-mockup">
              <div className="browser-header">
                <div className="browser-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="browser-url">bimtly.com</div>
              </div>
              <div className="browser-content">
                <img
                  src={centerImage || houseImage}
                  alt="BIMTLY product catalog and 3D visualization"
                  className="center-image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Outputs - positioned absolutely */}
        <div className="outputs-column">
          {outputs.map((item, index) => {
            const Icon = item.icon
            const topPercent = ((outputStartY + index * outputItemSpacing) / viewHeight) * 100
            return (
              <div
                key={item.id}
                className="item-card output-item"
                style={{
                  top: `${topPercent}%`,
                  animationDelay: `${0.5 + index * 0.08}s`
                }}
              >
                <Icon className="item-icon" size={18} strokeWidth={1.5} />
                <span className="item-label">{item.label}</span>
              </div>
            )
          })}
        </div>

        {/* Tool logos strip - far right */}
        <div className="tool-logos">
          {toolLogos.map((tool, index) => (
            <div
              key={tool.name}
              className="tool-logo"
              style={{ animationDelay: `${1.4 + index * 0.1}s` }}
              title={tool.name}
            >
              <img src={tool.logo} alt={tool.name} className="tool-logo-img" />
            </div>
          ))}
        </div>

        {/* 3D house image - bottom right */}
        <img
          src={house3dImage}
          alt="3D house visualization"
          className="corner-3d-image"
        />
      </div>
    </div>
  )
}
