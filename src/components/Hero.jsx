import { motion } from 'motion/react';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, ArrowRight } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

import SpiderWebBg from './ui/SpiderWebBg';

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Spider Web Backgrounds */}
      <SpiderWebBg position="top-right" opacity={0.2} />
      <SpiderWebBg position="bottom-left" opacity={0.12} />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Status HUD Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0e1638]/90 border border-[#e23636]/40 shadow-[0_0_20px_rgba(226,54,54,0.2)] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e23636] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e23636]"></span>
          </span>
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider">
            STARK HUD // SPIDER-SENSE ONLINE
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white font-['Space_Grotesk'] leading-tight"
        >
          YOUR FRIENDLY <br />
          <span className="bg-gradient-to-r from-[#e23636] via-[#ff4d4d] to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(226,54,54,0.4)]">
            NEIGHBORHOOD
          </span> <br />
          DEVELOPER
        </motion.h1>

        {/* Dynamic Typewriter Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-[#8892b0] font-mono h-12 flex items-center justify-center gap-2"
        >
          <span className="text-[#e23636]">&gt;</span>
          <TypeAnimation
            sequence={[
              'Crafting responsive full-stack applications',
              2000,
              'Web-slinging with React, Node & TypeScript',
              2000,
              'Building scalable, high-performance systems',
              2000,
              'Turning complex problems into clean solutions',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-white"
          />
        </motion.div>

        {/* Mission Briefing / Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-2xl text-sm sm:text-base text-[#8892b0] leading-relaxed"
        >
          With great code comes great responsibility. I architect modern digital experiences, 
          harnessing the power of clean code, interactive physics, and resilient architectures.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#projects" variant="primary">
            Explore Missions
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton href="#contact" variant="secondary">
            Send Signal
          </MagneticButton>
        </motion.div>

        {/* Tech Badges Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-[#8892b0]"
        >
          <div className="flex items-center gap-2 bg-[#0e1638]/50 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            REACT 19 READY
          </div>
          <div className="flex items-center gap-2 bg-[#0e1638]/50 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#e23636]" />
            TAILWIND V4 ENGINE
          </div>
          <div className="flex items-center gap-2 bg-[#0e1638]/50 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            OPEN FOR OPPORTUNITIES
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 1, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
          className="mt-16 flex flex-col items-center gap-2 text-xs font-mono text-[#8892b0] hover:text-[#e23636] transition-colors"
        >
          <span>SWIPE DOWN</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#e23636]" />
        </motion.a>

      </div>
    </section>
  );
}
