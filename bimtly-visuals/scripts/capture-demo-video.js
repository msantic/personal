/**
 * capture-demo-video.js
 *
 * Records video of BIMTLY demos cycling through all camera views.
 * Creates seamless looping videos by returning to view 1 at the end.
 *
 * Features:
 *   - Auto-detects number of views and cycles through all of them
 *   - Seamless loop: ends on view 1 (same as start) for smooth looping
 *   - Device sync: settle time ensures all device videos have identical timing
 *   - Multi-device capture: record desktop, tablet, mobile in one command
 *
 * Usage:
 *   node scripts/capture-demo-video.js <demo-id|all> [options]
 *
 * Arguments:
 *   demo-id      - Demo ID (e.g., "8520") or "all" to record all demos
 *   --duration   - Seconds to hold each view (default: 2)
 *   --device     - Apple device preset or group (see below)
 *   --settle     - Milliseconds to wait after view change (default: 1500)
 *                  Absorbs variable 3D loading times for cross-device sync
 *
 * Device options:
 *   Groups:   desktop, tablet, mobile, all
 *   Desktop:  macbook-pro-16, macbook-pro-14, imac-24
 *   Tablet:   ipad-pro-12, ipad-pro-11, ipad-air, ipad-mini
 *   Mobile:   iphone-15-pro-max, iphone-15-pro, iphone-15, iphone-se
 *
 * Examples:
 *   node scripts/capture-demo-video.js 8520                   # Single demo, 1920x1080
 *   node scripts/capture-demo-video.js 8520 --device mobile   # iPhone 15 Pro size
 *   node scripts/capture-demo-video.js 8520 --device all      # All 3 devices (synced)
 *   node scripts/capture-demo-video.js 8520 --duration 3      # 3s per view
 *   node scripts/capture-demo-video.js 8520 --settle 2000     # 2s settle for slower 3D
 *   node scripts/capture-demo-video.js all --device desktop   # All demos, MacBook size
 *
 * Output:
 *   Default:      public/videos/{id}.mp4
 *   With device:  public/videos/{id}-{device}.mp4
 *
 * Sync behavior:
 *   When using --device all, videos are synced by:
 *   1. Same settle time before/after each view change
 *   2. Identical view duration across all devices
 *   3. All videos end on view 1 for seamless loop
 */

import puppeteer from 'puppeteer'
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import {
  BASE_URL,
  DEVICES,
  DEFAULT_VIEWPORT,
  DEMO_IDS,
  parseDeviceArg,
  getDevicesToCapture
} from './constants.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const outputDir = join(rootDir, 'public', 'videos')

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true })
}

/**
 * Creates recorder config for given viewport
 */
function createRecorderConfig(viewport) {
  return {
    followNewTab: false,
    fps: 30,
    videoFrame: {
      width: viewport.width,
      height: viewport.height
    }
  }
}

/**
 * Counts number of views by clicking "Next view" until cycling back
 */
async function countViews(page) {
  // Get initial view name
  const getViewName = async () => {
    const btn = await page.$('button[data-slot="dropdown-menu-trigger"]')
    if (btn) {
      return await btn.evaluate(el => el.textContent.trim())
    }
    return null
  }

  const initialView = await getViewName()
  if (!initialView) {
    console.log('  Could not find view selector, assuming 1 view')
    return 1
  }

  console.log(`  Initial view: "${initialView}"`)

  let count = 1
  const maxClicks = 20 // Safety limit

  for (let i = 0; i < maxClicks; i++) {
    // Click next view
    const nextBtn = await page.$('button[title="Next view"]')
    if (!nextBtn) break

    await nextBtn.click()
    await new Promise(resolve => setTimeout(resolve, 500))

    const currentView = await getViewName()
    console.log(`  View ${count + 1}: "${currentView}"`)

    if (currentView === initialView) {
      // We've cycled back
      break
    }
    count++
  }

  return count
}

/**
 * Records video while cycling through all views
 * @param {string} demoId - Demo ID
 * @param {number} durationPerView - Seconds per view
 * @param {Object} viewport - { width, height }
 * @param {string|null} deviceSuffix - Device name for filename suffix
 * @param {number} settleTime - Milliseconds to wait after view change before recording
 */
async function recordDemo(demoId, durationPerView = 2, viewport = DEFAULT_VIEWPORT, deviceSuffix = null, settleTime = 1500) {
  const url = `${BASE_URL}/v/${demoId}`
  const label = deviceSuffix ? `${demoId} (${deviceSuffix})` : demoId
  console.log(`Recording demo: ${label}`)
  console.log(`URL: ${url}`)
  console.log(`Viewport: ${viewport.width}x${viewport.height}\n`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  })

  const page = await browser.newPage()

  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1
  })

  console.log('Navigating to demo...')
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })

  // Wait for canvas
  try {
    await page.waitForSelector('canvas', { timeout: 15000 })
  } catch {
    console.log('Warning: No canvas found')
  }

  // Wait for 3D to render
  await new Promise(resolve => setTimeout(resolve, 5000))

  // Click fit-to-screen
  try {
    const fitBtn = await page.$('button[data-cy="fit-to-screen"]')
    if (fitBtn) {
      await fitBtn.click()
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('✓ Clicked fit-to-screen')
    }
  } catch {
    // Ignore
  }

  // Wait for UI to settle
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Count views
  console.log('\nCounting views...')
  const viewCount = await countViews(page)
  console.log(`\nTotal views: ${viewCount}`)

  // Reset to first view (click "Previous view" viewCount times)
  console.log('Resetting to first view...')
  for (let i = 0; i < viewCount; i++) {
    const prevBtn = await page.$('button[title="Previous view"]')
    if (prevBtn) {
      await prevBtn.click()
      await new Promise(resolve => setTimeout(resolve, 300))
    }
  }
  await new Promise(resolve => setTimeout(resolve, 500))

  // Start recording
  const recorderConfig = createRecorderConfig(viewport)
  const recorder = new PuppeteerScreenRecorder(page, recorderConfig)
  const filename = deviceSuffix ? `${demoId}-${deviceSuffix}.mp4` : `${demoId}.mp4`
  const outputPath = join(outputDir, filename)

  console.log(`\nStarting recording (settle: ${settleTime}ms per view)...`)

  // Wait for scene to settle before starting recording
  await new Promise(resolve => setTimeout(resolve, settleTime))

  await recorder.start(outputPath)

  // Cycle through all views
  for (let i = 0; i < viewCount; i++) {
    console.log(`  Recording view ${i + 1}/${viewCount}...`)

    // Hold on this view for exact duration
    await new Promise(resolve => setTimeout(resolve, durationPerView * 1000))

    // Click next to transition to next view
    const nextBtn = await page.$('button[title="Next view"]')
    if (nextBtn) {
      await nextBtn.click()
      // Settle time: wait for 3D to fully render before recording next view
      await new Promise(resolve => setTimeout(resolve, settleTime))
    }
  }

  // Video now ends on view 1 (seamless loop)
  console.log(`  ✓ Returned to view 1 for seamless loop`)

  // Stop recording
  await recorder.stop()
  console.log(`\n✓ Saved: ${outputPath}`)

  await browser.close()
}

// Parse args
const args = process.argv.slice(2)
const target = args[0]

if (!target) {
  console.error('Usage: node scripts/capture-demo-video.js <demo-id|all> [--duration <seconds>] [--device <device>]')
  process.exit(1)
}

const durationIdx = args.indexOf('--duration')
const duration = durationIdx !== -1 ? parseInt(args[durationIdx + 1]) || 2 : 2
const settleIdx = args.indexOf('--settle')
const settleTime = settleIdx !== -1 ? parseInt(args[settleIdx + 1]) || 1500 : 1500
const deviceArg = parseDeviceArg(args)

async function main() {
  const demosToRecord = target === 'all' ? DEMO_IDS : [target]

  // Determine viewports
  let viewportsToCapture = []

  if (deviceArg) {
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
      suffix: name
    }))
    console.log(`Device mode: ${deviceArg} → ${deviceNames.join(', ')}`)
  } else {
    // Default: 1920x1080
    viewportsToCapture = [{ name: 'default', ...DEFAULT_VIEWPORT, suffix: null }]
    console.log(`Default mode: ${DEFAULT_VIEWPORT.width}x${DEFAULT_VIEWPORT.height}`)
  }

  const totalRecordings = demosToRecord.length * viewportsToCapture.length
  console.log(`Recording ${demosToRecord.length} demo(s) × ${viewportsToCapture.length} viewport(s) = ${totalRecordings} videos`)
  console.log(`Duration: ${duration}s per view, Settle: ${settleTime}ms\n`)

  let succeeded = 0
  let failed = 0
  let current = 0

  for (const demoId of demosToRecord) {
    for (const viewport of viewportsToCapture) {
      current++
      const label = viewport.suffix ? `${demoId} (${viewport.name})` : demoId
      console.log(`\n[${current}/${totalRecordings}] ========================================`)
      console.log(`${label}\n`)

      try {
        await recordDemo(demoId, duration, viewport, viewport.suffix, settleTime)
        succeeded++
      } catch (err) {
        console.error(`Failed ${label}: ${err.message}`)
        failed++
      }
    }
  }

  console.log('\n========================================')
  console.log(`Done! ✓ ${succeeded} succeeded, ✗ ${failed} failed`)
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
