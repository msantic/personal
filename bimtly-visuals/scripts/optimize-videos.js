/**
 * optimize-videos.js
 *
 * Optimizes MP4 videos for web delivery using FFmpeg.
 * Adds faststart, optimizes bitrate, and ensures browser compatibility.
 *
 * Features:
 *   - Web-optimized H.264 encoding with faststart
 *   - Configurable quality (CRF) and preset
 *   - Single file or batch processing
 *   - Preserves original files (outputs to separate directory)
 *
 * Usage:
 *   node scripts/optimize-videos.js <input> [options]
 *
 * Arguments:
 *   input        - Single file, directory, or glob pattern
 *   --output     - Output directory (default: public/videos)
 *   --crf        - Quality (0-51, lower=better, default: 23)
 *   --preset     - Encoding speed (ultrafast|fast|medium|slow, default: medium)
 *   --overwrite  - Overwrite existing files (default: skip)
 *
 * Examples:
 *   node scripts/optimize-videos.js output/videos/8520.mp4
 *   node scripts/optimize-videos.js output/videos
 *   node scripts/optimize-videos.js output/videos --crf 20 --preset slow
 *   node scripts/optimize-videos.js output/videos --output public/videos
 *
 * Output:
 *   Optimized videos saved to output directory with same filename
 *
 * Requirements:
 *   FFmpeg must be installed and available in PATH
 */

import { execSync, spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join, basename, extname } from 'path'
import { existsSync, mkdirSync, readdirSync, statSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')

// Default settings
const DEFAULTS = {
  output: join(rootDir, 'public', 'videos'),
  crf: 23,        // Quality: 0-51 (18-28 is good range, 23 is default)
  preset: 'medium' // Speed/quality tradeoff
}

// Valid presets (faster = larger file, slower = smaller file)
const VALID_PRESETS = ['ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow']

/**
 * Check if FFmpeg is available
 */
function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

/**
 * Get video duration and size info
 */
function getVideoInfo(inputPath) {
  try {
    const result = execSync(
      `ffprobe -v quiet -print_format json -show_format -show_streams "${inputPath}"`,
      { encoding: 'utf8' }
    )
    const info = JSON.parse(result)
    return {
      duration: parseFloat(info.format?.duration || 0),
      size: parseInt(info.format?.size || 0),
      width: info.streams?.[0]?.width,
      height: info.streams?.[0]?.height
    }
  } catch {
    return null
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
}

/**
 * Optimize a single video file
 */
function optimizeVideo(inputPath, outputPath, options) {
  return new Promise((resolve, reject) => {
    const { crf, preset } = options

    // FFmpeg args for web-optimized output
    const args = [
      '-i', inputPath,
      '-c:v', 'libx264',           // H.264 codec
      '-profile:v', 'high',        // High profile for quality
      '-level', '4.0',             // Compatibility level
      '-crf', crf.toString(),      // Quality
      '-preset', preset,           // Speed/quality tradeoff
      '-movflags', '+faststart',   // Web optimization (metadata at start)
      '-pix_fmt', 'yuv420p',       // Pixel format for compatibility
      '-an',                       // Remove audio (our videos are silent)
      '-y',                        // Overwrite output
      outputPath
    ]

    const ffmpeg = spawn('ffmpeg', args)

    let stderr = ''
    ffmpeg.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`FFmpeg exited with code ${code}: ${stderr}`))
      }
    })

    ffmpeg.on('error', (err) => {
      reject(err)
    })
  })
}

/**
 * Get list of video files from input path
 */
function getVideoFiles(inputPath) {
  const files = []

  if (!existsSync(inputPath)) {
    return files
  }

  const stat = statSync(inputPath)

  if (stat.isFile()) {
    if (extname(inputPath).toLowerCase() === '.mp4') {
      files.push(inputPath)
    }
  } else if (stat.isDirectory()) {
    const entries = readdirSync(inputPath)
    for (const entry of entries) {
      if (extname(entry).toLowerCase() === '.mp4') {
        files.push(join(inputPath, entry))
      }
    }
  }

  return files
}

/**
 * Parse CLI arguments
 */
function parseArgs(args) {
  const input = args[0]

  const getArgValue = (flag) => {
    const idx = args.indexOf(flag)
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : null
  }

  const outputArg = getArgValue('--output')
  const crfArg = getArgValue('--crf')
  const presetArg = getArgValue('--preset')
  const overwrite = args.includes('--overwrite')

  return {
    input,
    output: outputArg ? (outputArg.startsWith('/') ? outputArg : join(rootDir, outputArg)) : DEFAULTS.output,
    crf: crfArg ? parseInt(crfArg) : DEFAULTS.crf,
    preset: presetArg || DEFAULTS.preset,
    overwrite
  }
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args.includes('--help')) {
    console.log(`
Usage: node scripts/optimize-videos.js <input> [options]

Arguments:
  input        - Single file, directory, or glob pattern

Options:
  --output     - Output directory (default: public/videos)
  --crf        - Quality 0-51, lower=better (default: 23)
  --preset     - Encoding speed (default: medium)
               - Options: ${VALID_PRESETS.join(', ')}
  --overwrite  - Overwrite existing files (default: skip)

Examples:
  node scripts/optimize-videos.js output/videos/8520.mp4
  node scripts/optimize-videos.js output/videos
  node scripts/optimize-videos.js output/videos --crf 20 --preset slow
`)
    process.exit(0)
  }

  // Check FFmpeg
  if (!checkFFmpeg()) {
    console.error('Error: FFmpeg not found. Please install FFmpeg first.')
    console.error('  macOS: brew install ffmpeg')
    console.error('  Ubuntu: apt install ffmpeg')
    process.exit(1)
  }

  const options = parseArgs(args)

  // Validate options
  if (options.crf < 0 || options.crf > 51) {
    console.error('Error: CRF must be between 0 and 51')
    process.exit(1)
  }

  if (!VALID_PRESETS.includes(options.preset)) {
    console.error(`Error: Invalid preset. Choose from: ${VALID_PRESETS.join(', ')}`)
    process.exit(1)
  }

  // Resolve input path
  const inputPath = options.input.startsWith('/')
    ? options.input
    : join(rootDir, options.input)

  // Get video files
  const videoFiles = getVideoFiles(inputPath)

  if (videoFiles.length === 0) {
    console.error(`No MP4 files found in: ${inputPath}`)
    process.exit(1)
  }

  // Ensure output directory exists
  if (!existsSync(options.output)) {
    mkdirSync(options.output, { recursive: true })
  }

  console.log('Video Optimization')
  console.log('==================')
  console.log(`Input:   ${inputPath}`)
  console.log(`Output:  ${options.output}`)
  console.log(`Quality: CRF ${options.crf} (${options.crf <= 18 ? 'high' : options.crf <= 23 ? 'good' : options.crf <= 28 ? 'medium' : 'low'})`)
  console.log(`Preset:  ${options.preset}`)
  console.log(`Files:   ${videoFiles.length}`)
  console.log('')

  let succeeded = 0
  let skipped = 0
  let failed = 0
  let totalInputSize = 0
  let totalOutputSize = 0

  for (let i = 0; i < videoFiles.length; i++) {
    const inputFile = videoFiles[i]
    const filename = basename(inputFile)
    const outputFile = join(options.output, filename)

    console.log(`[${i + 1}/${videoFiles.length}] ${filename}`)

    // Check if output exists
    if (existsSync(outputFile) && !options.overwrite) {
      console.log('  ⏭ Skipped (exists, use --overwrite to replace)')
      skipped++
      continue
    }

    // Get input info
    const inputInfo = getVideoInfo(inputFile)
    if (inputInfo) {
      console.log(`  Input:  ${formatBytes(inputInfo.size)} (${inputInfo.width}x${inputInfo.height})`)
      totalInputSize += inputInfo.size
    }

    try {
      await optimizeVideo(inputFile, outputFile, options)

      // Get output info
      const outputInfo = getVideoInfo(outputFile)
      if (outputInfo) {
        totalOutputSize += outputInfo.size
        const ratio = ((1 - outputInfo.size / inputInfo.size) * 100).toFixed(1)
        console.log(`  Output: ${formatBytes(outputInfo.size)} (${ratio}% smaller)`)
      }

      console.log('  ✓ Done')
      succeeded++
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`)
      failed++
    }
  }

  console.log('')
  console.log('==================')
  console.log(`Done! ✓ ${succeeded} optimized, ⏭ ${skipped} skipped, ✗ ${failed} failed`)

  if (totalInputSize > 0 && totalOutputSize > 0) {
    const totalRatio = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(1)
    console.log(`Total:   ${formatBytes(totalInputSize)} → ${formatBytes(totalOutputSize)} (${totalRatio}% smaller)`)
  }
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
