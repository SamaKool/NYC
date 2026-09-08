import { useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function MagneticButton({ 
  children, 
  className = '', 
  onClick, 
  href,
  variant = 'primary' 
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * 0.25;
    const deltaY = (clientY - centerY) * 0.25;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: "bg-[#e23636] hover:bg-[#ff3b3b] text-white shadow-[0_0_20px_rgba(226,54,54,0.4)] hover:shadow-[0_0_30px_rgba(226,54,54,0.6)] border border-[#ff6b6b]/40",
    secondary: "bg-[#0e1638]/80 hover:bg-[#131f4f] text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]",
    outline: "bg-transparent text-white border border-white/20 hover:border-[#e23636] hover:text-[#e23636]"
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.2 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative inline-flex items-center justify-center gap-2 
        px-6 py-3.5 rounded-xl font-medium tracking-wide text-sm md:text-base
        transition-colors cursor-pointer select-none
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
