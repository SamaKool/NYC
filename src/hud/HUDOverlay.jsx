import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../store/gameStore.js';
import { TOWERS, TOWER_LIST } from '../config/constants.js';

export default function HUDOverlay() {
  const isPanelOpen = useGameStore((s) => s.isPanelOpen);
  const activeSection = useGameStore((s) => s.activeSection);
  const isSwinging = useGameStore((s) => s.isSwinging);
  const closePanel = useGameStore((s) => s.closePanel);
  const jumpOff = useGameStore((s) => s.jumpOff);
  const startSwing = useGameStore((s) => s.startSwing);

  const currentTower = activeSection ? TOWERS[activeSection] : null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-6">
      {/* Top Header HUD */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="bg-[#0a0e27]/80 backdrop-blur-md border border-[#00f0ff]/30 p-3 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <div className="text-[10px] tracking-widest text-[#00f0ff] uppercase font-mono">STATUS // ONLINE</div>
          <div className="text-xl font-bold font-['Orbitron'] text-white">SPIDER-MAN POV</div>
          <div className="text-xs text-gray-400">
            LOCATION: {currentTower ? currentTower.label + ' ROOFTOP' : 'HERO GROUND PLAZA'}
          </div>
        </div>

        {/* Quick Nav Bar */}
        <div className="flex gap-2 bg-[#0a0e27]/80 backdrop-blur-md border border-[#00f0ff]/20 p-2 rounded-lg">
          {TOWER_LIST.map((t) => (
            <button
              key={t.id}
              onClick={() => startSwing(t.id)}
              className={"px-3 py-1 text-xs font-mono rounded transition-all " + (activeSection === t.id ? "bg-[#e23636] text-white shadow-[0_0_10px_rgba(226,54,54,0.5)]" : "text-gray-300 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10")}
            >
              {t.label}
            </button>
          ))}
          {activeSection && (
            <button
              onClick={jumpOff}
              className="px-3 py-1 text-xs font-mono rounded bg-[#ff1e42]/20 border border-[#ff1e42] text-[#ff1e42] hover:bg-[#ff1e42] hover:text-white transition-all"
            >
              JUMP OFF
            </button>
          )}
        </div>
      </div>

      {/* Center Swing notification */}
      {isSwinging && (
        <div className="self-center bg-[#00f0ff]/10 border border-[#00f0ff] px-6 py-2 rounded-full text-[#00f0ff] font-['Orbitron'] text-sm tracking-widest animate-pulse">
          SWINGING THROUGH SKYLINE...
        </div>
      )}

      {/* Bottom Rooftop Content Slide-over Panel */}
      <AnimatePresence>
        {isPanelOpen && currentTower && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto self-center w-full max-w-2xl bg-[#0a0e27]/90 backdrop-blur-xl border border-[#00f0ff]/40 rounded-xl p-6 shadow-[0_0_40px_rgba(0,240,255,0.2)] text-white"
          >
            <div className="flex justify-between items-center border-b border-[#00f0ff]/20 pb-3 mb-4">
              <div>
                <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest">
                  SECTOR DATABASE // {currentTower.label}
                </span>
                <h2 className="text-2xl font-bold font-['Orbitron'] text-white">
                  {currentTower.label} ARCHIVES
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={jumpOff}
                  className="px-4 py-1.5 rounded text-xs font-mono font-bold bg-[#ff1e42] text-white hover:bg-red-600 transition-all shadow-[0_0_15px_rgba(255,30,66,0.5)]"
                >
                  JUMP OFF (GROUND)
                </button>
                <button
                  onClick={closePanel}
                  className="px-3 py-1.5 rounded text-xs font-mono bg-white/10 hover:bg-white/20 text-gray-300"
                >
                  CLOSE [X]
                </button>
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto pr-2 text-sm text-gray-300 space-y-3">
              {activeSection === 'about' && (
                <div>
                  <p className="text-base text-white font-semibold mb-2">Friendly Neighborhood Full-Stack Developer</p>
                  <p>
                    Passionate about crafting interactive web experiences, real-time 3D environments, and cutting-edge software.
                    Armed with great power and great responsibility for clean architecture and pixel-perfect design.
                  </p>
                </div>
              )}
              {activeSection === 'skills' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/5 rounded border border-cyan-500/20">
                    <div className="font-bold text-[#00f0ff] mb-1">Frontend Engineering</div>
                    <div className="text-xs text-gray-400">React 19, Three.js, R3F, Tailwind CSS, GSAP, WebGL</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-cyan-500/20">
                    <div className="font-bold text-[#00f0ff] mb-1">Backend & Cloud</div>
                    <div className="text-xs text-gray-400">Node.js, Express, PostgreSQL, REST/GraphQL APIs</div>
                  </div>
                </div>
              )}
              {activeSection === 'projects' && (
                <div className="space-y-2">
                  <div className="p-3 bg-white/5 rounded border border-red-500/30">
                    <div className="font-bold text-white">Interactive 3D Spider-Verse Portfolio</div>
                    <div className="text-xs text-gray-400">Next-generation gamified portfolio built in R3F, React 19, and GLSL.</div>
                  </div>
                </div>
              )}
              {activeSection === 'experience' && (
                <div className="space-y-2">
                  <div className="border-l-2 border-[#00f0ff] pl-3 py-1">
                    <div className="font-bold text-white">Full Stack Software Engineer</div>
                    <div className="text-xs text-gray-400">Building ambitious interactive web applications and distributed architectures.</div>
                  </div>
                </div>
              )}
              {activeSection === 'contact' && (
                <div>
                  <p className="mb-2">Need a high-octane developer on your squad?</p>
                  <p className="font-mono text-[#00f0ff]">Send a signal beacon to discuss collaborations or roles.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom status line */}
      <div className="text-center text-xs font-mono text-gray-500 pointer-events-auto">
        Controls: Click a rooftop beacon to swing • Quick-navigate via top HUD • Jump off anytime to return to plaza
      </div>
    </div>
  );
}
