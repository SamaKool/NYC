export default function SpiderWebBg({ position = 'top-right', opacity = 0.12, className = '' }) {
  const isTopRight = position === 'top-right';
  const isBottomLeft = position === 'bottom-left';
  
  return (
    <div 
      className={`pointer-events-none absolute z-0 overflow-hidden select-none ${
        isTopRight ? 'top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px]' : 
        isBottomLeft ? 'bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px]' : 
        'w-full h-full'
      } ${className}`}
      style={{ opacity }}
    >
      <svg 
        viewBox="0 0 500 500" 
        className={`w-full h-full ${isBottomLeft ? 'rotate-180' : ''}`}
        fill="none" 
        stroke="currentColor"
      >
        {/* Radiating Spokes from corner */}
        <line x1="500" y1="0" x2="0" y2="500" stroke="#e23636" strokeWidth="1.2" />
        <line x1="500" y1="0" x2="0" y2="250" stroke="#e23636" strokeWidth="1.2" />
        <line x1="500" y1="0" x2="0" y2="100" stroke="#e23636" strokeWidth="1.2" />
        <line x1="500" y1="0" x2="100" y2="500" stroke="#e23636" strokeWidth="1.2" />
        <line x1="500" y1="0" x2="250" y2="500" stroke="#e23636" strokeWidth="1.2" />
        <line x1="500" y1="0" x2="0" y2="380" stroke="#e23636" strokeWidth="1.2" />
        <line x1="500" y1="0" x2="380" y2="500" stroke="#e23636" strokeWidth="1.2" />
        
        {/* Concentric Connecting Spiral Arcs */}
        <path d="M 500,50 Q 450,50 450,0" stroke="#00f0ff" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M 500,100 Q 400,100 400,0" stroke="#e23636" strokeWidth="1.2" fill="none" />
        <path d="M 500,160 Q 340,160 340,0" stroke="#00f0ff" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M 500,230 Q 270,230 270,0" stroke="#e23636" strokeWidth="1.2" fill="none" />
        <path d="M 500,310 Q 190,310 190,0" stroke="#00f0ff" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M 500,400 Q 100,400 100,0" stroke="#e23636" strokeWidth="1.2" fill="none" />
        <path d="M 500,500 Q 0,500 0,0" stroke="#00f0ff" strokeWidth="1.5" fill="none" opacity="0.8" />
      </svg>
    </div>
  );
}
