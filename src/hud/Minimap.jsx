import { useRef, useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore.js';
import { TOWERS, TOWER_LIST, HERO } from '../config/constants.js';

const MAP_SIZE = 160;
const CENTER = MAP_SIZE / 2;
const WORLD_RADIUS = 68;
const SCALE = 60 / WORLD_RADIUS;

export default function Minimap() {
  const canvasRef = useRef(null);
  const [hoveredTower, setHoveredTower] = useState(null);

  const startSwing = useGameStore((s) => s.startSwing);

  // Convert world coordinates [x, y, z] to canvas pixel coordinates
  const worldToMap = (wx, wz) => {
    return {
      x: CENTER + wx * SCALE,
      y: CENTER + wz * SCALE,
    };
  };

  useEffect(() => {
    let animationFrameId;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { playerPosition, activeSection, isSwinging } = useGameStore.getState();
      const time = performance.now() * 0.002;

      // ─── 1. CLEAR & BACKGROUND ──────────────────────────────────
      ctx.clearRect(0, 0, MAP_SIZE, MAP_SIZE);

      // Circular radar clipping mask
      ctx.save();
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, CENTER - 2, 0, Math.PI * 2);
      ctx.clip();

      // Background fill
      ctx.fillStyle = 'rgba(10, 14, 39, 0.92)';
      ctx.fillRect(0, 0, MAP_SIZE, MAP_SIZE);

      // Subtle grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 20; i < MAP_SIZE; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, MAP_SIZE);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(MAP_SIZE, i);
        ctx.stroke();
      }

      // Concentric range rings
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, 25, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(CENTER, CENTER, 50, 0, Math.PI * 2);
      ctx.stroke();

      // Radar Crosshair
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.beginPath();
      ctx.moveTo(CENTER, 5);
      ctx.lineTo(CENTER, MAP_SIZE - 5);
      ctx.moveTo(5, CENTER);
      ctx.lineTo(MAP_SIZE - 5, CENTER);
      ctx.stroke();

      // Sweeping radar scan line
      const sweepAngle = time % (Math.PI * 2);
      const sweepX = CENTER + Math.cos(sweepAngle) * (CENTER - 5);
      const sweepY = CENTER + Math.sin(sweepAngle) * (CENTER - 5);
      const grad = ctx.createRadialGradient(CENTER, CENTER, 5, CENTER, CENTER, CENTER - 5);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      grad.addColorStop(1, 'rgba(0, 240, 255, 0.1)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(CENTER, CENTER);
      ctx.arc(CENTER, CENTER, CENTER - 5, sweepAngle - 0.4, sweepAngle);
      ctx.closePath();
      ctx.fill();

      // Hero Plaza outline
      const plazaPos = worldToMap(HERO.position[0], HERO.position[2]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.arc(plazaPos.x, plazaPos.y, HERO.radius * SCALE, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // ─── 2. TOWERS ──────────────────────────────────────────────
      TOWER_LIST.forEach((tower) => {
        const { x, y } = worldToMap(tower.position[0], tower.position[2]);
        const isActive = activeSection === tower.id;
        const colorHex = '#' + tower.beaconColor.toString(16).padStart(6, '0');

        // Active tower pulsing ring
        if (isActive) {
          const pulse = (Math.sin(time * 3) + 1) * 0.5;
          ctx.strokeStyle = colorHex;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, 6 + pulse * 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Tower beacon dot
        ctx.fillStyle = colorHex;
        ctx.shadowColor = colorHex;
        ctx.shadowBlur = isActive ? 10 : 5;
        ctx.beginPath();
        ctx.arc(x, y, isActive ? 4.5 : 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Tower label abbreviation
        ctx.fillStyle = isActive ? '#ffffff' : 'rgba(226, 232, 240, 0.7)';
        ctx.font = 'bold 8px Orbitron, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(tower.id.slice(0, 3).toUpperCase(), x, y + 10);
      });

      // ─── 3. PLAYER MARKER ───────────────────────────────────────
      const playerPos = worldToMap(playerPosition[0], playerPosition[2]);

      // Player pulse
      const playerPulse = (Math.sin(time * 4) + 1) * 0.5;
      ctx.strokeStyle = isSwinging ? '#00f0ff' : '#ff1e42';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(playerPos.x, playerPos.y, 5 + playerPulse * 3, 0, Math.PI * 2);
      ctx.stroke();

      // Player central blip
      ctx.fillStyle = isSwinging ? '#00f0ff' : '#ff1e42';
      ctx.shadowColor = isSwinging ? '#00f0ff' : '#ff1e42';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(playerPos.x, playerPos.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      // Outer bezel ring
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, CENTER - 2, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Handle click on canvas to trigger swing to tower
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (const tower of TOWER_LIST) {
      const { x, y } = worldToMap(tower.position[0], tower.position[2]);
      const dist = Math.hypot(mouseX - x, mouseY - y);
      if (dist <= 12) {
        startSwing(tower.id);
        break;
      }
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let found = null;
    for (const tower of TOWER_LIST) {
      const { x, y } = worldToMap(tower.position[0], tower.position[2]);
      if (Math.hypot(mouseX - x, mouseY - y) <= 12) {
        found = tower;
        break;
      }
    }
    setHoveredTower(found);
  };

  return (
    <div className="relative group pointer-events-auto">
      <div className="bg-[#0a0e27]/85 backdrop-blur-md border border-[#00f0ff]/30 p-2 rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.15)] flex flex-col items-center">
        <div className="w-full flex justify-between items-center px-1 mb-1 text-[9px] font-mono tracking-widest text-[#00f0ff]">
          <span>TACTICAL RADAR</span>
          <span className="text-gray-400 text-[8px]">{hoveredTower ? hoveredTower.label : 'LIVE'}</span>
        </div>

        <canvas
          ref={canvasRef}
          width={MAP_SIZE}
          height={MAP_SIZE}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredTower(null)}
          className="rounded-xl cursor-crosshair transition-transform active:scale-[0.98]"
          title="Click any tower on the radar to swing directly to it"
        />

        <div className="w-full text-center mt-1 text-[8px] font-mono text-gray-400">
          {hoveredTower ? `CLICK TO SWING: ${hoveredTower.label}` : 'CLICK TOWER TO SWING'}
        </div>
      </div>
    </div>
  );
}

