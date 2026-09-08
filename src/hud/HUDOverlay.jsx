import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../store/gameStore.js';
import { TOWERS, TOWER_LIST } from '../config/constants.js';
import AboutPanel from './panels/AboutPanel.jsx';
import SkillsPanel from './panels/SkillsPanel.jsx';
import ProjectsPanel from './panels/ProjectsPanel.jsx';
import ExperiencePanel from './panels/ExperiencePanel.jsx';
import ContactPanel from './panels/ContactPanel.jsx';

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
          <button
            onClick={jumpOff}
            className={"px-3 py-1 text-xs font-mono rounded transition-all " + (!activeSection ? "bg-[#00f0ff]/25 text-[#00f0ff] border border-[#00f0ff]/60 shadow-[0_0_10px_rgba(0,240,255,0.3)]" : "text-gray-400 hover:text-white hover:bg-white/10")}
          >
            GROUND PLAZA
          </button>
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
              className="px-3 py-1 text-xs font-mono rounded bg-[#ff1e42]/20 border border-[#ff1e42] text-[#ff1e42] hover:bg-[#ff1e42] hover:text-white transition-all shadow-[0_0_10px_rgba(255,30,66,0.3)]"
            >
              JUMP OFF ↵
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
            <div className="max-h-[65vh] overflow-y-auto pr-2 text-sm text-gray-300">
              {activeSection === 'about' && <AboutPanel />}
              {activeSection === 'skills' && <SkillsPanel />}
              {activeSection === 'projects' && <ProjectsPanel />}
              {activeSection === 'experience' && <ExperiencePanel />}
              {activeSection === 'contact' && <ContactPanel />}
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
