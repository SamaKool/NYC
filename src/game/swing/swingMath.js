import { CatmullRomCurve3, Vector3 } from 'three';
import { SWING, TOWERS } from '../../config/constants.js';

export function computeSwingPath(startPos, targetTowerId) {
  const tower = TOWERS[targetTowerId];
  if (!tower) return null;

  const [tx, , tz] = tower.position;
  const targetTopY = tower.height + 2; // Exact top of the building
  let landingY = targetTopY;
  let landingPos = new Vector3(tx, landingY, tz);
  let crawlTarget = null;

  if (targetTopY > startPos.y) {
    // Destination is higher: Swing to side, then crawl up.
    const dx = startPos.x - tx;
    const dz = startPos.z - tz;
    const dist = Math.sqrt(dx * dx + dz * dz) || 1;

    // Push out to the edge of the tower
    const radius = Math.max(tower.width, tower.depth) * 0.5 + 0.5;
    const edgeX = tx + (dx / dist) * radius;
    const edgeZ = tz + (dz / dist) * radius;

    landingY = tower.height * 0.9;
    landingPos = new Vector3(edgeX, landingY, edgeZ);
    crawlTarget = new Vector3(tx, targetTopY, tz);
  }

  const midX = (startPos.x + landingPos.x) / 2;
  const midZ = (startPos.z + landingPos.z) / 2;

  const lowestPoint = Math.min(startPos.y, landingY);
  const dipY = Math.max(8, lowestPoint - lowestPoint * SWING.ARC_DIP_FACTOR);

  const anchorY = Math.max(startPos.y, targetTopY) + 25;
  const anchorPoint = new Vector3(midX, anchorY, midZ);

  const P0 = startPos.clone();
  const P1 = new Vector3(
    startPos.x + (midX - startPos.x) * 0.25,
    startPos.y + 10,
    startPos.z + (midZ - startPos.z) * 0.25
  );
  const P2 = new Vector3(midX, dipY, midZ);
  const P3 = landingPos.clone();

  const curve = new CatmullRomCurve3([P0, P1, P2, P3], false, 'centripetal');

  return { curve, anchorPoint, landingPos, crawlTarget };
}

export function getSwingState(curve, t) {
  const position = curve.getPointAt(t);
  const tangent = curve.getTangentAt(t).normalize();
  const speed = 1 - 4 * Math.pow(t - 0.5, 2);

  return { position, tangent, speed };
}
