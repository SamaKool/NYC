import { useState } from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { skillCategories } from '../../data/skills.js';

export default function SkillsPanel() {
  const [activeCategory, setActiveCategory] = useState(0);

  const currentCategory = skillCategories[activeCategory] || skillCategories[0];

  return (
    <div className="space-y-5">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/10">
        {skillCategories.map((cat, idx) => {
          const isActive = activeCategory === idx;
          return (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#e23636] text-white shadow-[0_0_15px_rgba(226,54,54,0.5)] border border-[#ff6b6b]/50'
                  : 'bg-[#0e1638]/70 text-gray-400 border border-white/10 hover:text-white hover:border-[#00f0ff]/30'
              }`}
            >
              {cat.category}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {currentCategory.skills.map((skill, idx) => {
          const IconComponent = Icons[skill.icon] || Icons.Code2;
          const isEven = idx % 2 === 0;
          const accentColor = isEven ? '#e23636' : '#00f0ff';

          return (
            <div
              key={skill.name}
              className="p-3.5 rounded-xl bg-[#060918]/70 border border-white/10 flex flex-col justify-between group hover:border-[#00f0ff]/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                    style={{
                      backgroundColor: `${accentColor}18`,
                      border: `1px solid ${accentColor}40`,
                      color: accentColor,
                    }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold font-['Orbitron'] text-white">
                    {skill.name}
                  </span>
                </div>

                <span className="font-mono text-xs font-bold text-[#00f0ff]">
                  {skill.level}%
                </span>
              </div>

              {/* Spider-Web Strand Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-[#0a0e27] overflow-hidden p-[1px] border border-white/10 mt-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: 'easeOut' }}
                  className="h-full rounded-full relative"
                  style={{
                    background: 'linear-gradient(90deg, #e23636 0%, #00f0ff 100%)',
                  }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                </motion.div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

