// ============================================================
// BACKGROUND CITY — Non-interactive filler buildings
// These provide the NYC skyline atmosphere. They are rendered
// via InstancedMesh with a single draw call.
// ============================================================

import { WORLD } from './constants.js';

// ─── GENERATION CONFIG CONSTANTS ────────────────────────────
const CLEARANCE_RADIUS = 60; // Skip positions that overlap with section towers
const HEIGHT_EXPONENT = 1.8; // Taller in center, shorter at edges
const BASE_SEED = 42; // Fixed seed for reproducible city generation

/**
 * Simple 32-bit PRNG (Mulberry32) for deterministic, fast pseudo-random values.
 * @param {number} a Seed
 * @returns {() => number} Returns a random float in [0, 1)
 */
function createPrng(a) {
  let s = a >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates a grid of background building data for InstancedMesh rendering.
 * Each building is a { position: [x,y,z], scale: [w,h,d], seed: number } object.
 *
 * @param {number} [seed=BASE_SEED] - Optional seed for generation
 * @returns {Array<{position: number[], scale: number[], seed: number}>}
 */
export function generateBackgroundBuildings(seed = BASE_SEED) {
  const rand = createPrng(seed);
  const buildings = [];
  const {
    BG_GRID_ROWS: rows,
    BG_GRID_COLS: cols,
    BG_BLOCK_SIZE: blockSize,
    BG_STREET_WIDTH: streetW,
    BG_MIN_HEIGHT: minH,
    BG_MAX_HEIGHT: maxH,
  } = WORLD;

  const totalW = cols * (blockSize + streetW);
  const totalD = rows * (blockSize + streetW);
  const maxDist = Math.sqrt(totalW * totalW + totalD * totalD) / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const posX = c * (blockSize + streetW) + blockSize / 2 - totalW / 2;
      const posZ = r * (blockSize + streetW) + blockSize / 2 - totalD / 2;

      // Skip positions that overlap with section towers
      const dist = Math.sqrt(posX * posX + posZ * posZ);
      if (dist < CLEARANCE_RADIUS) continue;

      // Taller in center, shorter at edges (Manhattan skyline profile)
      const distFactor = Math.max(0, 1 - dist / (maxDist * 0.85));
      const height = minH + Math.pow(distFactor, HEIGHT_EXPONENT) * (maxH - minH) * (0.6 + rand() * 0.8);
      const width = blockSize * (0.6 + rand() * 0.3);
      const depth = blockSize * (0.6 + rand() * 0.3);

      buildings.push({
        position: [posX, 0, posZ],
        scale: [width, height, depth],
        seed: rand() * 1000,
      });
    }
  }

  return buildings;
}

export const BACKGROUND_BUILDINGS = Object.freeze(generateBackgroundBuildings());

