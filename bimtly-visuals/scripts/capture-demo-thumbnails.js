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

// Resolution presets (16:9)
const RESOLUTIONS = {
  '1080p': { width: 1920, height: 1080 },
  '720p': { width: 1280, height: 720 },
  '480p': { width: 854, height: 480 },
  '360p': { width: 640, height: 360 }
}
const DEFAULT_RESOLUTION = '720p'

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
  // Special demo URLs
  { id: 'pergola-config', path: '/demo/pergola', name: 'pergola-configurator', auth: null },
  { id: 'feal', path: '/embed/204', name: 'feal', auth: null }
]

// Track logged in auth types
const loggedInAs = new Set()

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
  await new Promise(resolve => setTimeout(resolve, 2000))

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

async function captureDemo(browser, demo, resolution, fitToScreen) {
  const { id, path, name, auth } = demo
  const page = await browser.newPage()

  try {
    // Set viewport to specified resolution
    await page.setViewport({
      width: resolution.width,
      height: resolution.height,
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
    const filename = `${id}.png`
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

async function main() {
  const args = process.argv.slice(2)
  const targetId = args[0]
  const resArg = args[1] || DEFAULT_RESOLUTION
  const fitToScreen = args.includes('--fit')

  // Parse resolution
  const resolution = RESOLUTIONS[resArg]
  if (!resolution) {
    console.error(`Unknown resolution: ${resArg}`)
    console.log('Available resolutions:', Object.keys(RESOLUTIONS).join(', '))
    process.exit(1)
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

  console.log(`Capturing ${demosToCapture.length} demo thumbnails at ${resArg} (${resolution.width}x${resolution.height})${fitToScreen ? ' with fit-to-screen' : ''}...`)
  console.log(`Output directory: ${outputDir}\n`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  })

  let succeeded = 0
  let failed = 0

  for (const demo of demosToCapture) {
    console.log(`[${succeeded + failed + 1}/${demosToCapture.length}] ${demo.name}`)

    const success = await captureDemo(browser, demo, resolution, fitToScreen)
    if (success) {
      succeeded++
    } else {
      failed++
    }
    console.log('')
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
