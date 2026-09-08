import { useState } from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import ScrollReveal from './ui/ScrollReveal';
import { skillCategories } from '../data/skills';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Suit Tech & Arsenal"
        title="SUPERPOWERS & SKILLS"
        subtitle="A versatile tech stack engineered for responsiveness, performance, and aesthetic precision."
      />

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {skillCategories.map((cat, idx) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(idx)}
            className={`
              relative px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider
              transition-all duration-300 cursor-pointer
              ${activeCategory === idx 
                ? 'bg-[#e23636] text-white shadow-[0_0_20px_rgba(226,54,54,0.4)] border border-[#ff6b6b]/40' 
                : 'bg-[#0e1638]/60 text-[#8892b0] border border-white/10 hover:text-white hover:border-white/20'}
            `}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories[activeCategory].skills.map((skill, idx) => {
          // Dynamic Lucide Icon Resolution
          const IconComponent = Icons[skill.icon] || Icons.Code;

          return (
            <ScrollReveal key={skill.name} direction="up" delay={idx * 0.08}>
              <GlassCard 
                glow={idx % 2 === 0 ? "red" : "blue"} 
                className="group p-6 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Icon & Level Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                      style={{ 
                        backgroundColor: `${skill.color}15`, 
                        border: `1px solid ${skill.color}40`,
                        color: skill.color 
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-lg font-bold text-white">
                        {skill.level}%
                      </span>
                      <span className="block text-[10px] font-mono text-[#8892b0] uppercase">
                        Proficiency
                      </span>
                    </div>
                  </div>

                  {/* Skill Title */}
                  <h4 className="text-lg font-bold text-white font-['Space_Grotesk'] group-hover:text-[#00f0ff] transition-colors">
                    {skill.name}
                  </h4>
                </div>

                {/* Progress Bar (Spider-Web Strand Style) */}
                <div className="mt-6">
                  <div className="w-full h-2 rounded-full bg-[#060918] overflow-hidden p-[1px] border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + idx * 0.05, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#e23636] to-[#00f0ff] relative"
                    >
                      {/* Leading Glow Dot */}
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                    </motion.div>
                  </div>
                </div>

              </GlassCard>
            </ScrollReveal>
          );
        })}
      </div>

    </section>
  );
}
