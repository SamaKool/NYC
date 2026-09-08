// ============================================================
// BACKGROUND CITY — Non-interactive filler buildings
// These provide the NYC skyline atmosphere. They are rendered
// via InstancedMesh with a single draw call.
// ============================================================

import { WORLD } from './constants.js';

/**
 * Generates a grid of background building data for InstancedMesh rendering.
 * Each building is a { position: [x,y,z], scale: [w,h,d], seed: number } object.
 *
 * @returns {Array<{position: number[], scale: number[], seed: number}>}
 */
export function generateBackgroundBuildings() {
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

      // Skip positions that overlap with section towers (give them a 60-unit clearance)
      const dist = Math.sqrt(posX * posX + posZ * posZ);
      if (dist < 60) continue;

      // Taller in center, shorter at edges (Manhattan skyline profile)
      const distFactor = Math.max(0, 1 - dist / (maxDist * 0.85));
      const height = minH + Math.pow(distFactor, 1.8) * (maxH - minH) * (0.6 + Math.random() * 0.8);
      const width = blockSize * (0.6 + Math.random() * 0.3);
      const depth = blockSize * (0.6 + Math.random() * 0.3);

      buildings.push({
        position: [posX, 0, posZ],
        scale: [width, height, depth],
        seed: Math.random() * 1000,
      });
    }
  }

  return buildings;
}
