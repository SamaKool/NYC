import { motion } from 'motion/react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experiences } from '../../data/experience.js';

export default function ExperiencePanel() {
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#e23636] before:via-[#00f0ff] before:to-[#e23636] before:opacity-60">
      {experiences.map((exp, idx) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.1 }}
          className="relative group"
        >
          {/* Timeline Spider Node */}
          <div className="absolute -left-[29px] top-4 w-4 h-4 rounded-full bg-[#0a0e27] border-2 border-[#e23636] flex items-center justify-center shadow-[0_0_10px_rgba(226,54,54,0.6)] group-hover:border-[#00f0ff] transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
          </div>

          {/* Content Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#060918]/80 border border-white/10 group-hover:border-[#00f0ff]/40 transition-colors">
            {/* Period & Location Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#e23636]/15 text-[#e23636] border border-[#e23636]/30">
                <Calendar className="w-3 h-3" />
                {exp.period}
              </span>

              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-400">
                <MapPin className="w-3 h-3 text-[#00f0ff]" />
                {exp.location}
              </span>
            </div>

            {/* Role & Company */}
            <h4 className="text-base font-bold font-['Orbitron'] text-white group-hover:text-[#00f0ff] transition-colors">
              {exp.role}
            </h4>
            <p className="text-xs font-mono text-[#00f0ff] font-semibold mt-0.5 mb-3">
              {exp.company}
            </p>

            {/* Bullet Points */}
            <ul className="space-y-2 mb-4">
              {exp.description.map((point, pIdx) => (
                <li
                  key={pIdx}
                  className="flex items-start gap-2 text-xs sm:text-sm text-gray-300 leading-relaxed font-['Rajdhani']"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e23636] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Tech Tags */}
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0e1638]/70 text-gray-400 border border-white/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

