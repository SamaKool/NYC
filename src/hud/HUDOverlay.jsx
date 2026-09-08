import { useEffect } from 'react';
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
  const viewMode = useGameStore((s) => s.viewMode);
  const toggleViewMode = useGameStore((s) => s.toggleViewMode);

  // Keyboard shortcut 'V' to toggle POV / 3rd Person view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'v' || e.key === 'V') {
        toggleViewMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleViewMode]);

  const currentTower = activeSection ? TOWERS[activeSection] : null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-6">
      {/* Top Header HUD */}
      <div className="flex justify-between items-start pointer-events-auto gap-4 flex-wrap">
        <div className="bg-[#0a0e27]/80 backdrop-blur-md border border-[#00f0ff]/30 p-3 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <div className="text-[10px] tracking-widest text-[#00f0ff] uppercase font-mono">STATUS // ONLINE</div>
          <div className="text-xl font-bold font-['Orbitron'] text-white">SPIDER-MAN POV</div>
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <span>LOCATION: {currentTower ? currentTower.label + ' ROOFTOP' : 'HERO GROUND PLAZA'}</span>
            <span className="text-[#00f0ff] font-mono font-bold">[{viewMode === 'pov' ? '1ST PERSON POV' : '3RD PERSON'}]</span>
          </div>
        </div>

        {/* Quick Nav & View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 bg-[#0a0e27]/80 backdrop-blur-md border border-[#00f0ff]/20 p-2 rounded-lg">
          {/* View Mode Toggle Button */}
          <button
            onClick={toggleViewMode}
            className="px-3 py-1 text-xs font-mono rounded bg-cyan-950/60 border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.25)]"
            title="Toggle between First-Person POV and Third-Person Chase (Shortcut: V)"
          >
            <span>{viewMode === 'pov' ? '👁 1ST PERSON POV' : '🎮 3RD PERSON CHASE'}</span>
            <span className="text-[9px] bg-black/50 px-1 py-0.2 rounded border border-[#00f0ff]/30">V</span>
          </button>

          <button
            onClick={jumpOff}
            className={"px-3 py-1 text-xs font-mono rounded transition-all cursor-pointer " + (!activeSection ? "bg-[#00f0ff]/25 text-[#00f0ff] border border-[#00f0ff]/60 shadow-[0_0_10px_rgba(0,240,255,0.3)]" : "text-gray-400 hover:text-white hover:bg-white/10")}
          >
            GROUND PLAZA
          </button>
          {TOWER_LIST.map((t) => (
            <button
              key={t.id}
              onClick={() => startSwing(t.id)}
              className={"px-3 py-1 text-xs font-mono rounded transition-all cursor-pointer " + (activeSection === t.id ? "bg-[#e23636] text-white shadow-[0_0_10px_rgba(226,54,54,0.5)]" : "text-gray-300 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10")}
            >
              {t.label}
            </button>
          ))}
          {activeSection && (
            <button
              onClick={jumpOff}
              className="px-3 py-1 text-xs font-mono rounded bg-[#ff1e42]/20 border border-[#ff1e42] text-[#ff1e42] hover:bg-[#ff1e42] hover:text-white transition-all shadow-[0_0_10px_rgba(255,30,66,0.3)] cursor-pointer"
            >
              JUMP OFF ↵
            </button>
          )}
        </div>
      </div>

      {/* Center Swing notification */}
      {isSwinging && (
        <div className="self-center bg-[#00f0ff]/10 border border-[#00f0ff] px-6 py-2 rounded-full text-[#00f0ff] font-['Orbitron'] text-sm tracking-widest animate-pulse shadow-[0_0_20px_rgba(0,240,255,0.4)]">
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
            className="pointer-events-auto self-center w-full max-w-3xl bg-[#0a0e27]/95 backdrop-blur-2xl border border-[#00f0ff]/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.25)] text-white"
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
                  className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#ff1e42] text-white hover:bg-red-600 transition-all shadow-[0_0_15px_rgba(255,30,66,0.5)] cursor-pointer"
                >
                  JUMP OFF (GROUND)
                </button>
                <button
                  onClick={closePanel}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/10 hover:bg-white/20 text-gray-300 cursor-pointer"
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
        Controls: Click any skyscraper beacon/rooftop to swing • [V] Toggle 1st/3rd Person View • Jump off anytime to return to plaza
      </div>
    </div>
  );
}
