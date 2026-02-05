/**
 * capture-demo-thumbnails.js
 *
 * Automated screenshot capture for BIMTLY demo pages using Puppeteer.
 * Captures 3D viewer thumbnails for use in promotional videos/collages.
 *
 * Usage:
 *   node scripts/capture-demo-thumbnails.js [target] [resolution] [--fit] [--device <device>]
 *
 * Arguments:
 *   target      - Demo ID or "all" (default: all)
 *   resolution  - 1080p | 720p | 480p | 360p (default: 720p, ignored if --device used)
 *   --fit       - Click "fit to screen" before capture (default: off)
 *   --device    - Apple device preset or group (desktop|tablet|mobile|all|<device-name>)
 *
 * Resolution mode (legacy):
 *   node scripts/capture-demo-thumbnails.js all              # All demos at 720p
 *   node scripts/capture-demo-thumbnails.js all 1080p        # All demos at 1080p
 *   node scripts/capture-demo-thumbnails.js 4009 720p --fit  # Single demo with fit
 *
 * Device mode (Apple presets):
 *   node scripts/capture-demo-thumbnails.js all --device desktop   # MacBook Pro 16"
 *   node scripts/capture-demo-thumbnails.js all --device tablet    # iPad Pro 12.9"
 *   node scripts/capture-demo-thumbnails.js all --device mobile    # iPhone 15 Pro
 *   node scripts/capture-demo-thumbnails.js all --device all       # All 3 devices
 *   node scripts/capture-demo-thumbnails.js all --device ipad-air  # Specific device
 *
 * Available devices:
 *   Desktop: macbook-pro-16, macbook-pro-14, imac-24
 *   Tablet:  ipad-pro-12, ipad-pro-11, ipad-air, ipad-mini
 *   Mobile:  iphone-15-pro-max, iphone-15-pro, iphone-15, iphone-se
 *
 * Output:
 *   Resolution mode: public/thumbnails/{id}.png
 *   Device mode:     public/thumbnails/{id}-{device}.png
 *
 * npm script:
 *   npm run capture:thumbnails
 */

import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync, mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const outputDir = join(rootDir, 'public', 'thumbnails')

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true })
}

const BASE_URL = 'https://app.bimtly.com'

// Resolution presets (16:9) - legacy behavior
const RESOLUTIONS = {
  '1080p': { width: 1920, height: 1080 },
  '720p': { width: 1280, height: 720 },
  '480p': { width: 854, height: 480 },
  '360p': { width: 640, height: 360 }
}
const DEFAULT_RESOLUTION = '720p'

// Apple device presets
const DEVICES = {
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
const DEVICE_GROUPS = {
  desktop: ['macbook-pro-16'],
  tablet: ['ipad-pro-12'],
  mobile: ['iphone-15-pro'],
  all: ['macbook-pro-16', 'ipad-pro-12', 'iphone-15-pro']
}

// Authentication credentials
const AUTH = {
  test: { user: 'test', pass: 'Zg9367jr' }
}

// Demo configurations
const DEMOS = [
  // Public viewer URLs (/v/)
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
  // Special demo URLs
  { id: 'pergola-config', path: '/demo/pergola', name: 'pergola-configurator', auth: null },
  { id: 'feal', path: '/embed/204', name: 'feal', auth: null }
]

// Track logged in auth types (session persists across page navigations)
const loggedInAs = new Set()

/**
 * Logs into BIMTLY app with specified credentials
 * @param {Page} page - Puppeteer page instance
 * @param {string} authType - Auth key from AUTH object (e.g., 'test')
 */
async function login(page, authType) {
  if (loggedInAs.has(authType)) {
    return // Already logged in
  }

  const creds = AUTH[authType]
  if (!creds) {
    console.error(`Unknown auth type: ${authType}`)
    return
  }

  console.log(`  Logging in as ${creds.user}...`)

  // Navigate to login page
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2', timeout: 30000 })

  // Wait a bit for React/client-side rendering
  await new Promise(resolve => setTimeout(resolve, 3000))

  // Wait for any input element to appear (login form)
  await page.waitForSelector('input', { timeout: 15000 })

  // Get all inputs on page
  const inputs = await page.$$('input')

  // Find username and password inputs by type or order
  let usernameInput = null
  let passwordInput = null

  for (const input of inputs) {
    const type = await input.evaluate(el => el.type)
    if (type === 'password') {
      passwordInput = input
    } else if (type === 'text' || type === 'email') {
      usernameInput = input
    }
  }

  if (usernameInput) {
    await usernameInput.click()
    await usernameInput.type(creds.user)
  } else {
    console.log('  Warning: Could not find username input')
  }

  if (passwordInput) {
    await passwordInput.click()
    await passwordInput.type(creds.pass)
  } else {
    console.log('  Warning: Could not find password input')
  }

  // Submit form - look for button
  const submitButton = await page.$('button[type="submit"], button')
  if (submitButton) {
    await submitButton.click()
  } else {
    // Try pressing Enter on password field
    if (passwordInput) {
      await passwordInput.press('Enter')
    }
  }

  // Wait for navigation after login
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 20000 }).catch(() => {
    // Navigation might not happen if already on dashboard
  })

  // Additional wait to ensure session is established
  await new Promise(resolve => setTimeout(resolve, 1000))

  loggedInAs.add(authType)
  console.log(`  ✓ Logged in as ${creds.user}`)
}

/**
 * Captures a screenshot of a single demo page
 * @param {Browser} browser - Puppeteer browser instance
 * @param {Object} demo - Demo config { id, path, name, auth }
 * @param {Object} viewport - { width, height }
 * @param {boolean} fitToScreen - Whether to click fit-to-screen button
 * @param {string|null} deviceSuffix - Device name for filename suffix (null = no suffix)
 * @returns {Promise<boolean>} - Success status
 */
async function captureDemo(browser, demo, viewport, fitToScreen, deviceSuffix = null) {
  const { id, path, name, auth } = demo
  const page = await browser.newPage()

  try {
    // Set viewport to specified size
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1
    })

    // Login if required
    if (auth) {
      await login(page, auth)
    }

    const url = `${BASE_URL}${path}`
    console.log(`  Navigating to ${url}...`)

    // Navigate to demo page
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })

    // Wait for canvas (3D viewer) to appear
    try {
      await page.waitForSelector('canvas', { timeout: 15000 })
    } catch {
      console.log(`  Warning: No canvas found for ${name}, taking screenshot anyway`)
    }

    // Wait for 3D model to render
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Click "Fit to screen" button if enabled
    if (fitToScreen) {
      try {
        const fitButton = await page.$('button[data-cy="fit-to-screen"]')
        if (fitButton) {
          await fitButton.click()
          await new Promise(resolve => setTimeout(resolve, 500))
          console.log(`  ✓ Clicked fit-to-screen`)
        }
      } catch {
        // Button not found, continue
      }
    }

    // Take screenshot
    const filename = deviceSuffix ? `${id}-${deviceSuffix}.png` : `${id}.png`
    const outputPath = join(outputDir, filename)

    await page.screenshot({
      path: outputPath,
      type: 'png'
    })

    console.log(`  ✓ Saved: ${filename}`)
    return true
  } catch (error) {
    console.error(`  ✗ Failed ${name}: ${error.message}`)
    return false
  } finally {
    await page.close()
  }
}

/**
 * Parses --device argument value
 * @param {string[]} args - CLI arguments
 * @returns {string|null} - Device value or null
 */
function parseDeviceArg(args) {
  const idx = args.indexOf('--device')
  if (idx === -1) return null
  return args[idx + 1] || null
}

/**
 * Gets list of devices to capture based on --device value
 * @param {string} deviceArg - Device argument value
 * @returns {string[]} - Array of device names
 */
function getDevicesToCapture(deviceArg) {
  // Check if it's a group shortcut
  if (DEVICE_GROUPS[deviceArg]) {
    return DEVICE_GROUPS[deviceArg]
  }
  // Check if it's a specific device
  if (DEVICES[deviceArg]) {
    return [deviceArg]
  }
  return null
}

/**
 * Main entry point - parses CLI args and runs capture loop
 */
async function main() {
  const args = process.argv.slice(2)
  const targetId = args[0]
  const fitToScreen = args.includes('--fit')
  const deviceArg = parseDeviceArg(args)

  // Determine capture mode: device presets or legacy resolution
  let viewportsToCapture = []

  if (deviceArg) {
    // Device mode
    const deviceNames = getDevicesToCapture(deviceArg)
    if (!deviceNames) {
      console.error(`Unknown device: ${deviceArg}`)
      console.log('Available devices:', Object.keys(DEVICES).join(', '))
      console.log('Shortcuts: desktop, tablet, mobile, all')
      process.exit(1)
    }
    viewportsToCapture = deviceNames.map(name => ({
      name,
      ...DEVICES[name],
      suffix: deviceNames.length > 1 || deviceArg !== 'desktop' ? name : null
    }))
    console.log(`Device mode: ${deviceArg} → ${deviceNames.join(', ')}`)
  } else {
    // Legacy resolution mode
    const resArg = args[1] || DEFAULT_RESOLUTION
    const resolution = RESOLUTIONS[resArg]
    if (!resolution) {
      console.error(`Unknown resolution: ${resArg}`)
      console.log('Available resolutions:', Object.keys(RESOLUTIONS).join(', '))
      process.exit(1)
    }
    viewportsToCapture = [{ name: resArg, ...resolution, suffix: null }]
    console.log(`Resolution mode: ${resArg} (${resolution.width}x${resolution.height})`)
  }

  // Filter demos if specific ID provided
  let demosToCapture = DEMOS
  if (targetId && targetId !== 'all') {
    demosToCapture = DEMOS.filter(d => d.id === targetId)
    if (demosToCapture.length === 0) {
      console.error(`Unknown demo ID: ${targetId}`)
      console.log('Available IDs:', DEMOS.map(d => d.id).join(', '))
      process.exit(1)
    }
  }

  const totalCaptures = demosToCapture.length * viewportsToCapture.length
  console.log(`Capturing ${demosToCapture.length} demos × ${viewportsToCapture.length} viewport(s) = ${totalCaptures} screenshots${fitToScreen ? ' with fit-to-screen' : ''}`)
  console.log(`Output directory: ${outputDir}\n`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  })

  let succeeded = 0
  let failed = 0
  let current = 0

  for (const demo of demosToCapture) {
    for (const viewport of viewportsToCapture) {
      current++
      const label = viewport.suffix ? `${demo.name} (${viewport.name})` : demo.name
      console.log(`[${current}/${totalCaptures}] ${label}`)

      const success = await captureDemo(browser, demo, viewport, fitToScreen, viewport.suffix)
      if (success) {
        succeeded++
      } else {
        failed++
      }
      console.log('')
    }
  }

  await browser.close()

  console.log('Done!')
  console.log(`  ✓ Succeeded: ${succeeded}`)
  if (failed > 0) {
    console.log(`  ✗ Failed: ${failed}`)
  }
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
