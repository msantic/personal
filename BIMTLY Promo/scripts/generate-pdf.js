import puppeteer from 'puppeteer'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync, mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const outputDir = join(rootDir, 'output')

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true })
}

const routes = {
  flyer: { path: '/flyer', filename: 'flyer-en.pdf' },
  deck: { path: '/pitch-deck', filename: 'pitch-deck-en.pdf' }
}

async function startDevServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npm', ['run', 'dev', '--', '--port', '5199'], {
      cwd: rootDir,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true
    })

    let started = false

    server.stdout.on('data', (data) => {
      const output = data.toString()
      if (output.includes('Local:') && !started) {
        started = true
        setTimeout(() => resolve(server), 1000) // Give it a moment to stabilize
      }
    })

    server.stderr.on('data', (data) => {
      console.error('Server error:', data.toString())
    })

    server.on('error', reject)

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!started) {
        server.kill()
        reject(new Error('Server startup timeout'))
      }
    }, 30000)
  })
}

async function generatePDF(browser, route, filename) {
  const page = await browser.newPage()

  await page.goto(`http://localhost:5199${route}`, {
    waitUntil: 'networkidle0'
  })

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready')

  const outputPath = join(outputDir, filename)

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true
  })

  console.log(`✓ Generated: ${outputPath}`)
  await page.close()
}

async function main() {
  const args = process.argv.slice(2)
  const target = args[0] || 'all'

  console.log('Starting dev server...')
  const server = await startDevServer()
  console.log('Dev server started on port 5199')

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    if (target === 'all') {
      for (const [key, config] of Object.entries(routes)) {
        await generatePDF(browser, config.path, config.filename)
      }
    } else if (routes[target]) {
      await generatePDF(browser, routes[target].path, routes[target].filename)
    } else {
      console.error(`Unknown target: ${target}`)
      console.log('Available targets: flyer, deck, all')
    }

    await browser.close()
  } finally {
    server.kill()
    console.log('Done!')
  }
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
