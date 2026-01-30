import puppeteer from 'puppeteer'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const outputDir = join(rootDir, 'output')

// Use different port than npm run dev (5173) and pdf (5174)
const PNG_PORT = 5175

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true })
}

const routes = {
  connectivity: {
    path: '/connectivity',
    filename: 'digital-connectivity.png',
    selector: '.digital-connectivity',
    scale: 2 // 2x for retina/high quality
  },
  platform: {
    path: '/platform',
    filename: 'platform-diagram.png',
    selector: '.platform-diagram',
    scale: 1,
    transparent: true
  }
}

async function startDevServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['vite', 'dev', '--port', String(PNG_PORT)], {
      env: { ...process.env, BROWSER: 'none' },
      cwd: rootDir,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
      detached: false
    })

    let started = false

    server.stdout.on('data', (data) => {
      const output = data.toString()
      if (output.includes('Local:') && !started) {
        started = true
        setTimeout(() => resolve(server), 500)
      }
    })

    server.stderr.on('data', () => {
      // Ignore stderr
    })

    server.on('error', reject)

    setTimeout(() => {
      if (!started) {
        server.kill()
        reject(new Error('Server startup timeout'))
      }
    }, 30000)
  })
}

async function generatePNG(browser, config) {
  const { path, filename, selector, scale, transparent = false } = config
  const page = await browser.newPage()

  // Set viewport for consistent rendering
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: scale
  })

  await page.goto(`http://localhost:${PNG_PORT}${path}`, {
    waitUntil: 'networkidle0'
  })

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready')

  // Inject CSS to force all animations to final state
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0.001s !important;
        animation-iteration-count: 1 !important;
        animation-fill-mode: forwards !important;
        transition-duration: 0s !important;
      }
      /* Digital Connectivity elements */
      .connection-path, .connection-dot, .corner-3d-image {
        opacity: 1 !important;
      }
      /* Platform Diagram elements */
      .orbit-ring, .connection-line, .connector-dot,
      .center-node, .feature-icon-wrapper, .feature-label {
        opacity: 1 !important;
      }
      /* Hide radiant wave animation for static export */
      .pulse-wave {
        display: none !important;
      }
      ${transparent ? `
      /* Transparent background for PNG export */
      html, body, #root, .platform-page, .platform-diagram {
        background: transparent !important;
      }
      ` : ''}
    `
  })

  // Wait for forced animations to complete
  await new Promise(resolve => setTimeout(resolve, 500))

  // Find the element to capture
  const element = await page.$(selector)

  if (!element) {
    console.error(`Element not found: ${selector}`)
    await page.close()
    return
  }

  const outputPath = join(outputDir, filename)

  // Screenshot just the element
  await element.screenshot({
    path: outputPath,
    type: 'png',
    omitBackground: transparent
  })

  console.log(`✓ Generated: ${outputPath}`)

  // Convert to WebP for web optimization
  const webpFilename = filename.replace('.png', '.webp')
  const webpPath = join(outputDir, webpFilename)

  await sharp(outputPath)
    .webp({ quality: 85, alphaQuality: 100 })
    .toFile(webpPath)

  console.log(`✓ Generated: ${webpPath}`)

  await page.close()
}

async function main() {
  const args = process.argv.slice(2)
  const target = args[0] || 'connectivity'

  console.log(`Starting dev server on port ${PNG_PORT}...`)
  const server = await startDevServer()
  console.log(`Dev server ready`)

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    if (target === 'all') {
      for (const [key, config] of Object.entries(routes)) {
        await generatePNG(browser, config)
      }
    } else if (routes[target]) {
      await generatePNG(browser, routes[target])
    } else {
      console.error(`Unknown target: ${target}`)
      console.log('Available targets: connectivity, platform, all')
    }

    await browser.close()
  } finally {
    server.kill('SIGTERM')
    console.log('Done!')
  }
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
