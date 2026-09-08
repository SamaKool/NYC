import { motion } from 'motion/react';

export default function WebDivider() {
  return (
    <div className="relative w-full py-12 flex items-center justify-center overflow-hidden pointer-events-none">
      <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#e23636]/40 to-transparent relative">
        {/* Descending Hanging Spider */}
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 12,
            delay: 0.2 
          }}
          className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center"
        >
          {/* Vertical Silk Web Strand */}
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#e23636] to-white/70" />
          
          {/* Hanging Spider Icon */}
          <div className="w-5 h-5 rounded-full bg-[#0e1638] border border-[#e23636] flex items-center justify-center p-0.5 shadow-[0_0_10px_rgba(226,54,54,0.6)]">
            <svg viewBox="0 0 100 100" fill="none" className="w-3.5 h-3.5">
              <ellipse cx="50" cy="45" rx="10" ry="14" fill="#e23636" />
              <ellipse cx="50" cy="68" rx="14" ry="20" fill="#e23636" />
              <path d="M 40 45 Q 15 20 8 35" stroke="#e23636" strokeWidth="6" fill="none" />
              <path d="M 40 50 Q 10 40 5 60" stroke="#e23636" strokeWidth="6" fill="none" />
              <path d="M 60 45 Q 85 20 92 35" stroke="#e23636" strokeWidth="6" fill="none" />
              <path d="M 60 50 Q 90 40 95 60" stroke="#e23636" strokeWidth="6" fill="none" />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
