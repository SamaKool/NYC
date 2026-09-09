import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../store/gameStore.js';
import { GAME_STATE } from '../config/constants.js';

export default function IntroScreen() {
  const gameState = useGameStore((s) => s.gameState);
  const skipIntro = useGameStore((s) => s.skipIntro);

  const isIntro = gameState === GAME_STATE.INTRO;

  useEffect(() => {
    if (!isIntro) return;

    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        skipIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIntro, skipIntro]);

  return (
    <AnimatePresence>
      {isIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-30 pointer-events-auto flex flex-col justify-between p-8 bg-gradient-to-b from-[#0a0e27]/80 via-transparent to-[#0a0e27]/90 backdrop-blur-[2px]"
        >
          {/* Top telemetry bar */}
          <div className="flex justify-between items-center text-xs font-mono text-[#00f0ff] tracking-widest">
            <span className="animate-pulse">● NYC SKYLINE DRONE FEED // LIVE</span>
            <span className="text-gray-400">STATUS: INITIALIZING SUIT SYSTEMS</span>
          </div>

          {/* Center Title Card */}
          <div className="self-center text-center max-w-2xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-[#ff1e42]/20 border border-[#ff1e42] text-[#ff1e42] font-mono text-xs tracking-widest mb-3 shadow-[0_0_15px_rgba(255,30,66,0.4)]">
                MARVEL'S SPIDER-MAN • INTERACTIVE EXPERIENCE
              </div>
              <h1 className="text-4xl sm:text-6xl font-black font-['Orbitron'] tracking-wider text-white drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                SPIDER-MAN
              </h1>
              <p className="text-lg sm:text-xl font-['Orbitron'] text-[#00f0ff] tracking-widest mt-1">
                PORTFOLIO ARCHIVES
              </p>
              <p className="text-sm font-mono text-gray-300 mt-4 max-w-lg mx-auto">
                Explore skills, projects, and career milestones through first-person web-swinging across the New York City skyline.
              </p>
            </motion.div>
          </div>

          {/* Bottom Controls / Skip */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs font-mono text-gray-400 flex items-center gap-4">
              <span>CONTROLS: [V] TOGGLE POV</span>
              <span>•</span>
              <span>CLICK TOWERS TO SWING</span>
            </div>

            <button
              onClick={skipIntro}
              className="px-6 py-2.5 rounded-xl bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-mono font-bold text-xs tracking-widest transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] cursor-pointer"
            >
              SKIP INTRO [SPACE ↵]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

