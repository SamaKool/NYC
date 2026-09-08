import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function WebShooterCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      );
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Targeting Reticle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isPointer ? 1.6 : 1,
          borderColor: isPointer ? '#00f0ff' : '#e23636'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.1 }}
      >
        <div className="w-8 h-8 rounded-full border border-[#e23636] opacity-70 flex items-center justify-center">
          <div className="w-1 h-1 bg-[#e23636] rounded-full" />
        </div>
      </motion.div>

      {/* Center Web-Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 rounded-full bg-[#ffffff] shadow-[0_0_8px_#e23636]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.05 }}
      />
    </>
  );
}
