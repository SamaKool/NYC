import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import ScrollReveal from './ui/ScrollReveal';
import { experiences } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Career History"
        title="EXPERIENCE TIMELINE"
        subtitle="Tracking the trajectory of field missions, engineering roles, and technical milestones."
      />

      {/* Central Timeline Container */}
      <div className="relative mt-16 max-w-4xl mx-auto">
        
        {/* Vertical Silk Strand (Center Line) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#e23636] via-[#00f0ff] to-[#e23636] opacity-70" />

        <div className="flex flex-col gap-12">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node (Spider Emblem Indicator) */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0a0e27] border-2 border-[#e23636] flex items-center justify-center z-20 shadow-[0_0_15px_rgba(226,54,54,0.6)]">
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                  <ScrollReveal direction={isEven ? 'right' : 'left'} delay={idx * 0.15}>
                    <GlassCard glow={isEven ? 'red' : 'blue'} className="p-6 sm:p-8">
                      
                      {/* Period & Location Pill */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#e23636]/15 text-[#e23636] border border-[#e23636]/30">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-mono text-[#8892b0]">
                          <MapPin className="w-3 h-3 text-[#00f0ff]" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-[#00f0ff] font-mono mt-1">
                        {exp.company}
                      </p>

                      {/* Bullets */}
                      <ul className="mt-4 space-y-2.5">
                        {exp.description.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#8892b0] leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#e23636] shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Pills */}
                      <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                        {exp.tech.map((t) => (
                          <span 
                            key={t}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#060918] text-[#8892b0] border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                    </GlassCard>
                  </ScrollReveal>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
