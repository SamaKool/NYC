import { Float, Html } from '@react-three/drei';
import { useGameStore } from '../../../store/gameStore.js';

export default function RooftopHologram({ towerId, label, color, position = [0, 0, 0] }) {
  const activeSection = useGameStore((s) => s.activeSection);
  const isPanelOpen = useGameStore((s) => s.isPanelOpen);

  const hexColor = typeof color === 'number'
    ? `#${color.toString(16).padStart(6, '0')}`
    : (color || '#00f0ff');

  const isCurrentTower = activeSection === towerId;

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <Html
          center
          distanceFactor={45}
          style={{
            pointerEvents: 'auto',
            userSelect: 'none',
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              useGameStore.getState().openPanel();
            }}
            className="group cursor-pointer flex flex-col items-center justify-center p-3 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'rgba(10, 14, 39, 0.85)',
              borderColor: isCurrentTower ? hexColor : 'rgba(0, 240, 255, 0.4)',
              boxShadow: `0 0 25px ${hexColor}44, inset 0 0 15px ${hexColor}22`,
              minWidth: '180px',
            }}
          >
            {/* Top Scanning Line */}
            <div
              className="w-full h-[2px] mb-2 rounded-full animate-pulse"
              style={{ backgroundColor: hexColor }}
            />

            {/* Sub-label */}
            <span
              className="text-[9px] font-mono tracking-widest uppercase font-bold"
              style={{ color: hexColor }}
            >
              // SECTOR ARCHIVE
            </span>

            {/* Main Section Header */}
            <h3 className="text-sm font-black text-white font-['Orbitron'] tracking-wider my-0.5">
              {label}
            </h3>

            {/* Action Button Badge */}
            <div
              className="mt-1.5 px-2.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wider transition-colors"
              style={{
                backgroundColor: isCurrentTower && isPanelOpen ? 'rgba(255, 30, 66, 0.25)' : `${hexColor}25`,
                color: isCurrentTower && isPanelOpen ? '#ff4d6d' : '#ffffff',
                border: `1px solid ${hexColor}66`,
              }}
            >
              {isCurrentTower && isPanelOpen ? 'CLOSE DATA' : 'ACCESS DATA ▶'}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

