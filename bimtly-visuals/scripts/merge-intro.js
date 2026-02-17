#!/usr/bin/env node
/**
 * merge-intro.js
 *
 * Renders the IntroClip from Remotion and concatenates it with a main video.
 *
 * Usage:
 *   node scripts/merge-intro.js
 *   node scripts/merge-intro.js --main "output/BIMTLY 3D STUDIO - normalized.mp4"
 *   node scripts/merge-intro.js --out "output/final.mp4"
 *   node scripts/merge-intro.js --skip-render   # reuse existing rendered intro
 *
 * Flags:
 *   --intro <path>     Intro clip output path (default: output/intro-1920x1080.mp4)
 *   --main  <path>     Main video to append after intro (default: output/BIMTLY 3D STUDIO - normalized.mp4)
 *   --out   <path>     Final merged output path (default: output/final-with-intro.mp4)
 *   --skip-render      Skip the Remotion render step and use an existing intro clip
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// --- Parse CLI args ---
const args = process.argv.slice(2);
const getArg = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const INTRO_PATH  = getArg('--intro', 'output/intro-1920x1080.mp4');
const MAIN_PATH   = getArg('--main',  'output/BIMTLY 3D STUDIO - normalized.mp4');
const OUTPUT_PATH = getArg('--out',   'output/final-with-intro.mp4');
const SKIP_RENDER = args.includes('--skip-render');

const introAbs  = resolve(ROOT, INTRO_PATH);
const mainAbs   = resolve(ROOT, MAIN_PATH);
const outputAbs = resolve(ROOT, OUTPUT_PATH);

// --- Step 1: Render IntroClip ---
if (!SKIP_RENDER) {
  console.log('\nRendering IntroClip from Remotion...');
  execSync(
    `npx remotion render src/remotion/index.ts IntroClip "${INTRO_PATH}"`,
    { cwd: ROOT, stdio: 'inherit' }
  );
  console.log('IntroClip rendered:', INTRO_PATH);
} else {
  console.log('Skipping render, using existing intro:', INTRO_PATH);
}

// --- Validate inputs ---
if (!existsSync(introAbs)) {
  console.error('Intro clip not found:', introAbs);
  process.exit(1);
}
if (!existsSync(mainAbs)) {
  console.error('Main video not found:', mainAbs);
  process.exit(1);
}

// --- Step 2: Concat with ffmpeg filter_complex ---
// Uses filter_complex to normalize fps + resolution before concat.
// This handles mismatches like 60fps studio video + 30fps intro clip.
console.log('\nMerging intro + main video...');
console.log('  Intro:', INTRO_PATH);
console.log('  Main: ', MAIN_PATH);
console.log('  Out:  ', OUTPUT_PATH);

const filterComplex = [
  '[0:v]fps=30,scale=1920:1080,setsar=1[v0]',
  '[1:v]fps=30,scale=1920:1080,setsar=1[v1]',
  '[1:a]aresample=async=1[a1]',
  '[v0][0:a][v1][a1]concat=n=2:v=1:a=1[outv][outa]',
].join('; ');

execSync(
  `ffmpeg -y \
    -i "${introAbs}" \
    -i "${mainAbs}" \
    -filter_complex "${filterComplex}" \
    -map "[outv]" -map "[outa]" \
    -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
    -c:a aac -b:a 192k \
    "${outputAbs}"`,
  { cwd: ROOT, stdio: 'inherit' }
);

console.log('\nDone:', OUTPUT_PATH);
