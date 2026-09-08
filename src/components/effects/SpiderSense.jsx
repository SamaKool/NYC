import { useEffect, useState } from 'react';

export default function SpiderSense() {
  const [position, setPosition] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500 overflow-hidden"
      style={{
        background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(226, 54, 54, 0.07), rgba(0, 240, 255, 0.03) 40%, transparent 80%)`
      }}
    />
  );
}

