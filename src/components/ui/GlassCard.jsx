export default function GlassCard({ 
  children, 
  className = '', 
  glow = 'red', 
  hoverEffect = true,
  onClick
}) {
  const glowBorder = glow === 'red' 
    ? 'hover:border-[#e23636]/60 hover:shadow-[0_0_25px_rgba(226,54,54,0.25)]' 
    : 'hover:border-[#00f0ff]/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]';

  return (
    <div 
      onClick={onClick}
      className={`
        relative rounded-2xl bg-[#0e1638]/70 backdrop-blur-xl
        border border-white/10 p-6 md:p-8
        transition-all duration-300 ease-out
        ${hoverEffect ? `${glowBorder} hover:-translate-y-1` : ''}
        ${className}
      `}
    >
      {/* Corner Spider Web Accent Line */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-40">
        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full stroke-[#e23636]">
          <path d="M 0 0 L 32 0 L 32 32" strokeWidth="1" />
          <path d="M 8 0 L 32 24" strokeWidth="0.8" opacity="0.6" />
        </svg>
      </div>

      {children}
    </div>
  );
}
