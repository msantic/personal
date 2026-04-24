#!/usr/bin/env node
/**
 * merge-intro.js
 *
 * Renders the IntroClip (and optionally OutroClip) from Remotion and
 * concatenates them with a main video: [intro] + [main] + [outro]
 *
 * Usage:
 *   node scripts/merge-intro.js --main "output/video2.mp4"
 *   node scripts/merge-intro.js --main "output/video2.mp4" --outro
 *   node scripts/merge-intro.js --4k --outro --main "output/video2.mp4"
 *   node scripts/merge-intro.js --skip-render --outro   # reuse existing clips
 *
 * Flags:
 *   --intro <path>     Intro clip output path (auto-set by --4k)
 *   --main  <path>     Main video to append after intro
 *   --outro-path <p>   Outro clip output path (auto-set by --4k)
 *   --out   <path>     Final merged output path (default: output/final-with-intro.mp4)
 *   --outro            Also append OutroClip after the main video
 *   --skip-render      Skip Remotion render, reuse existing clips
 *   --4k               Use 4K compositions (3840×2160)
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

const IS_4K      = args.includes('--4k');
const WITH_OUTRO = args.includes('--outro');
const SKIP_RENDER = args.includes('--skip-render');

const SCALE = IS_4K ? '3840:2160' : '1920:1080';

const INTRO_COMP    = IS_4K ? 'IntroClip-4K' : 'IntroClip';
const INTRO_DEFAULT = IS_4K ? 'output/clips/intro-3840x2160.mp4' : 'output/clips/intro-1920x1080.mp4';
const INTRO_PATH    = getArg('--intro', INTRO_DEFAULT);

const OUTRO_COMP    = IS_4K ? 'OutroClip-4K' : 'OutroClip';
const OUTRO_DEFAULT = IS_4K ? 'output/clips/outro-3840x2160.mp4' : 'output/clips/outro-1920x1080.mp4';
const OUTRO_PATH    = getArg('--outro-path', OUTRO_DEFAULT);

const MAIN_PATH   = getArg('--main',  'output/3dstudio/BIMTLY 3D STUDIO - normalized.mp4');
const OUTPUT_PATH = getArg('--out',   'output/3dstudio/final-with-intro.mp4');

const introAbs  = resolve(ROOT, INTRO_PATH);
const mainAbs   = resolve(ROOT, MAIN_PATH);
const outroAbs  = resolve(ROOT, OUTRO_PATH);
const outputAbs = resolve(ROOT, OUTPUT_PATH);

console.log(`\nMode: ${IS_4K ? '4K (3840×2160)' : '1080p (1920×1080)'}${WITH_OUTRO ? ' + outro' : ''}`);

// --- Step 1: Render clips ---
if (!SKIP_RENDER) {
  console.log(`\nRendering ${INTRO_COMP}...`);
  execSync(
    `npx remotion render src/remotion/index.ts ${INTRO_COMP} "${INTRO_PATH}"`,
    { cwd: ROOT, stdio: 'inherit' }
  );
  console.log(`${INTRO_COMP} rendered:`, INTRO_PATH);

  if (WITH_OUTRO) {
    console.log(`\nRendering ${OUTRO_COMP}...`);
    execSync(
      `npx remotion render src/remotion/index.ts ${OUTRO_COMP} "${OUTRO_PATH}"`,
      { cwd: ROOT, stdio: 'inherit' }
    );
    console.log(`${OUTRO_COMP} rendered:`, OUTRO_PATH);
  }
} else {
  console.log('Skipping render, using existing clips');
}

// --- Validate inputs ---
if (!existsSync(introAbs)) { console.error('Intro clip not found:', introAbs); process.exit(1); }
if (!existsSync(mainAbs))  { console.error('Main video not found:', mainAbs);  process.exit(1); }
if (WITH_OUTRO && !existsSync(outroAbs)) { console.error('Outro clip not found:', outroAbs); process.exit(1); }

// --- Step 2: Concat with ffmpeg filter_complex ---
console.log('\nMerging clips...');
console.log('  Intro:', INTRO_PATH);
console.log('  Main: ', MAIN_PATH);
if (WITH_OUTRO) console.log('  Outro:', OUTRO_PATH);
console.log('  Out:  ', OUTPUT_PATH);
console.log('  Scale:', SCALE);

let filterComplex;
let inputArgs;

if (WITH_OUTRO) {
  // 3-way concat: intro(0) + main(1) + outro(2)
  inputArgs = `-i "${introAbs}" -i "${mainAbs}" -i "${outroAbs}"`;
  filterComplex = [
    `[0:v]fps=30,scale=${SCALE},setsar=1[v0]`,
    `[1:v]fps=30,scale=${SCALE},setsar=1[v1]`,
    `[2:v]fps=30,scale=${SCALE},setsar=1[v2]`,
    '[1:a]aresample=async=1[a1]',
    '[v0][0:a][v1][a1][v2][2:a]concat=n=3:v=1:a=1[outv][outa]',
  ].join('; ');
} else {
  // 2-way concat: intro(0) + main(1)
  inputArgs = `-i "${introAbs}" -i "${mainAbs}"`;
  filterComplex = [
    `[0:v]fps=30,scale=${SCALE},setsar=1[v0]`,
    `[1:v]fps=30,scale=${SCALE},setsar=1[v1]`,
    '[1:a]aresample=async=1[a1]',
    '[v0][0:a][v1][a1]concat=n=2:v=1:a=1[outv][outa]',
  ].join('; ');
}

execSync(
  `ffmpeg -y ${inputArgs} -filter_complex "${filterComplex}" -map "[outv]" -map "[outa]" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k "${outputAbs}"`,
  { cwd: ROOT, stdio: 'inherit' }
);

console.log('\nDone:', OUTPUT_PATH);
