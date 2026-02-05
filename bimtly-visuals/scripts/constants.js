/**
 * Shared constants for demo capture scripts
 */

export const BASE_URL = 'https://app.bimtly.com'

// Apple device presets
export const DEVICES = {
  // Desktop
  'macbook-pro-16': { width: 1728, height: 1117 },
  'macbook-pro-14': { width: 1512, height: 982 },
  'imac-24': { width: 2048, height: 1152 },
  // Tablet
  'ipad-pro-12': { width: 1024, height: 1366 },
  'ipad-pro-11': { width: 834, height: 1194 },
  'ipad-air': { width: 820, height: 1180 },
  'ipad-mini': { width: 744, height: 1133 },
  // Mobile
  'iphone-15-pro-max': { width: 430, height: 932 },
  'iphone-15-pro': { width: 393, height: 852 },
  'iphone-15': { width: 393, height: 852 },
  'iphone-se': { width: 375, height: 667 }
}

// Device group shortcuts
export const DEVICE_GROUPS = {
  desktop: ['macbook-pro-16'],
  tablet: ['ipad-pro-12'],
  mobile: ['iphone-15-pro'],
  all: ['macbook-pro-16', 'ipad-pro-12', 'iphone-15-pro']
}

// Resolution presets (16:9) - for thumbnail script legacy mode
export const RESOLUTIONS = {
  '1080p': { width: 1920, height: 1080 },
  '720p': { width: 1280, height: 720 },
  '480p': { width: 854, height: 480 },
  '360p': { width: 640, height: 360 }
}
export const DEFAULT_RESOLUTION = '720p'

// Default viewport for video script
export const DEFAULT_VIEWPORT = { width: 1920, height: 1080 }

// Authentication credentials
export const AUTH = {
  test: { user: 'test', pass: 'Zg9367jr' }
}

// Demo configurations
export const DEMOS = [
  { id: '3576', path: '/v/3576', name: 'fire-equipment', auth: null },
  { id: '4009', path: '/v/4009', name: 'engine', auth: 'test' },
  { id: '4657', path: '/v/4657', name: 'cnc-demo', auth: 'test' },
  { id: '1016', path: '/v/1016', name: 'tiny-house-homepage', auth: null },
  { id: '467', path: '/v/467', name: 'tiny-house-ar-vr', auth: null },
  { id: '585', path: '/v/585', name: 'tiny-house-2', auth: 'test' },
  { id: '998', path: '/v/998', name: 'knapp-connector', auth: null },
  { id: '978', path: '/v/978', name: 'knapp-timber', auth: null },
  { id: '950', path: '/v/950', name: 'pergola', auth: null },
  { id: '8434', path: '/v/8434/minimalistic-modern-bedroom', name: 'bedroom', auth: null },
  { id: '8194', path: '/v/8194', name: 'construction-prop', auth: null },
  { id: '8190', path: '/v/8190', name: 'warehouse-construction', auth: null },
  { id: '8292', path: '/v/8292', name: 'container-site', auth: null },
  { id: '8201', path: '/v/8201', name: 'garage-under-construction', auth: null },
  { id: '8232', path: '/v/8232', name: 'scaffold-stairs', auth: null },
  { id: '8236', path: '/v/8236', name: 'warehouse-building', auth: null },
  { id: '8267', path: '/v/8267', name: 'wooden-frame-house', auth: null },
  { id: '8315', path: '/v/8315', name: 'modular-building', auth: null },
  { id: '8305', path: '/v/8305', name: 'tent-canopy', auth: null },
  { id: '8373', path: '/v/8373/metal-fence-sidewalk', name: 'metal-fence', auth: null },
  { id: '8520', path: '/v/8520', name: '8520', auth: null },
  { id: '4696', path: '/v/4696/chair', name: 'chair', auth: null },
  { id: '4740', path: '/v/4740/dorisarmchairshetlandpink-1optimized', name: 'doris-armchair', auth: null },
  { id: '8606', path: '/v/8606/royalgourmet3grilloptimizedglb', name: 'royal-gourmet-grill', auth: null },
  // Special demo URLs
  { id: 'pergola-config', path: '/demo/pergola', name: 'pergola-configurator', auth: null },
  { id: 'feal', path: '/embed/204', name: 'feal', auth: null }
]

// Helper: get demo IDs only (for video script)
export const DEMO_IDS = DEMOS.filter(d => d.path.startsWith('/v/')).map(d => d.id)

/**
 * Parses --device argument value
 */
export function parseDeviceArg(args) {
  const idx = args.indexOf('--device')
  if (idx === -1) return null
  return args[idx + 1] || null
}

/**
 * Gets list of devices to capture based on --device value
 */
export function getDevicesToCapture(deviceArg) {
  if (DEVICE_GROUPS[deviceArg]) {
    return DEVICE_GROUPS[deviceArg]
  }
  if (DEVICES[deviceArg]) {
    return [deviceArg]
  }
  return null
}
