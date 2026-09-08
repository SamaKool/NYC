import { motion } from 'motion/react';

export default function SectionHeading({ 
  title, 
  subtitle, 
  badge,
  align = 'center' 
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center' : 'text-left'}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#e23636]/10 text-[#e23636] border border-[#e23636]/30"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#e23636] animate-ping" />
          {badge}
        </motion.div>
      )}

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold tracking-tight text-white font-['Space_Grotesk']"
      >
        {title}
      </motion.h2>

      {/* Spider Web Line Indicator */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`flex items-center gap-2 mt-4 ${isCenter ? 'justify-center' : 'justify-start'}`}
      >
        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#e23636]" />
        <div className="w-2.5 h-2.5 rotate-45 border border-[#e23636] bg-[#0a0e27]" />
        <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#e23636]" />
      </motion.div>

      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-base md:text-lg text-[#8892b0] max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
