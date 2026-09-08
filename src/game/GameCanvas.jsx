import { Canvas } from '@react-three/fiber';
import { COLORS, PERF } from '../config/constants.js';

export default function GameCanvas({ children }) {
  return (
    <Canvas
      camera={{ position: [0, 6, 18], fov: 60, near: 0.1, far: 500 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      dpr={[1, PERF.MAX_DPR]}
      shadows
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      onCreated={({ gl }) => {
        gl.setClearColor(COLORS.SKY_DARK, 1);
      }}
    >
      {children}
    </Canvas>
  );
}
