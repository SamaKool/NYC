import { motion } from 'motion/react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { projects } from '../../data/projects.js';

export default function ProjectsPanel() {
  return (
    <div className="space-y-4">
      {projects.map((project, idx) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.08 }}
          className="p-4 sm:p-5 rounded-xl bg-[#060918]/80 border border-white/10 hover:border-[#e23636]/50 hover:shadow-[0_0_20px_rgba(226,54,54,0.2)] transition-all duration-300 flex flex-col justify-between group"
        >
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider block">
                {project.subtitle}
              </span>
              <h4 className="text-base sm:text-lg font-bold font-['Orbitron'] text-white group-hover:text-[#e23636] transition-colors">
                {project.title}
              </h4>
            </div>

            {project.badge && (
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0e1638] border border-[#00f0ff]/40 text-[#00f0ff] text-[10px] font-mono shrink-0">
                <Sparkles className="w-3 h-3 text-[#00f0ff]" />
                {project.badge}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 font-['Rajdhani']">
            {project.description}
          </p>

          {/* Bottom Row: Tags & Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0e1638]/60 text-gray-300 border border-white/5 group-hover:border-[#00f0ff]/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider bg-[#e23636] hover:bg-[#ff3b3b] text-white shadow-[0_0_12px_rgba(226,54,54,0.4)] transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-[#0e1638] border border-white/10 hover:border-[#00f0ff] text-gray-300 hover:text-white transition-colors"
                  aria-label={`GitHub Repository for ${project.title}`}
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

