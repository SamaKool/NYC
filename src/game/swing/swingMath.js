import { CatmullRomCurve3, Vector3 } from 'three';
import { SWING, TOWERS } from '../../config/constants.js';

export function computeSwingPath(startPos, targetTowerId) {
  const tower = TOWERS[targetTowerId];
  if (!tower) return null;

  const [tx, , tz] = tower.position;
  const landingY = tower.height + 2;
  const landingPos = new Vector3(tx, landingY, tz);

  const midX = (startPos.x + tx) / 2;
  const midZ = (startPos.z + tz) / 2;

  const lowestPoint = Math.min(startPos.y, landingY);
  const dipY = Math.max(8, lowestPoint - lowestPoint * SWING.ARC_DIP_FACTOR);

  const anchorY = Math.max(startPos.y, landingY) + 25;
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

  return { curve, anchorPoint, landingPos };
}

export function getSwingState(curve, t) {
  const position = curve.getPointAt(t);
  const tangent = curve.getTangentAt(t).normalize();
  const speed = 1 - 4 * Math.pow(t - 0.5, 2);

  return { position, tangent, speed };
}
