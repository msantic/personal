import puppeteer from 'puppeteer'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync, mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const outputDir = join(rootDir, 'output')

// Use different port than npm run dev (5173)
const PDF_PORT = 5174

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true })
}

const routes = {
  flyer: { path: '/flyer', filename: 'flyer-en.pdf' },
  'flyer-v2': { path: '/flyer-v2', filename: 'flyer-v2-en.pdf' },
  deck: { path: '/pitch-deck', filename: 'pitch-deck-en.pdf' }
}

async function startDevServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['vite', 'dev', '--port', String(PDF_PORT)], {
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

async function generatePDF(browser, route, filename) {
  const page = await browser.newPage()

  await page.goto(`http://localhost:${PDF_PORT}${route}`, {
    waitUntil: 'networkidle0'
  })

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

  console.log(`Starting dev server on port ${PDF_PORT}...`)
  const server = await startDevServer()
  console.log(`Dev server ready`)

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
      console.log('Available targets: flyer, flyer-v2, deck, all')
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
