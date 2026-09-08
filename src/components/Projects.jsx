import Tilt from 'react-parallax-tilt';
import { ExternalLink, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import SectionHeading from './ui/SectionHeading';



import ScrollReveal from './ui/ScrollReveal';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Field Ops"
        title="FEATURED MISSIONS"
        subtitle="A selection of high-impact web applications, developer tools, and scalable digital architectures."
      />

      {/* Projects Grid with 3D Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {projects.map((project, idx) => (
          <ScrollReveal key={project.id} direction="up" delay={idx * 0.12}>
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1200}
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="#e23636"
              glarePosition="all"
              className="h-full rounded-2xl"
            >
              <div className="h-full rounded-2xl bg-[#0e1638]/70 backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-[#e23636]/50 hover:shadow-[0_15px_40px_-10px_rgba(226,54,54,0.35)] transition-all duration-300">
                
                {/* Project Image Banner */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1638] via-[#0e1638]/40 to-transparent" />

                  {/* Badge */}
                  {project.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0a0e27]/90 border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                      <Sparkles className="w-3 h-3 text-[#00f0ff]" />
                      {project.badge}
                    </div>
                  )}

                  {/* Corner Spider Web Accent */}
                  <div className="absolute top-2 right-2 w-10 h-10 opacity-60">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#e23636]">
                      <line x1="100" y1="0" x2="0" y2="100" strokeWidth="2" />
                      <line x1="100" y1="0" x2="50" y2="100" strokeWidth="1.5" />
                      <path d="M 100 40 Q 60 40 60 0" strokeWidth="1.5" />
                      <path d="M 100 80 Q 20 80 20 0" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider block mb-1">
                      {project.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] group-hover:text-[#e23636] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#8892b0] leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#060918]/80 text-[#8892b0] border border-white/5 group-hover:border-[#e23636]/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs font-mono uppercase tracking-wider bg-[#e23636] text-white hover:bg-[#ff3b3b] shadow-[0_0_15px_rgba(226,54,54,0.3)] hover:shadow-[0_0_25px_rgba(226,54,54,0.5)] transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-[#060918] text-[#8892b0] hover:text-white border border-white/10 hover:border-[#00f0ff]/40 transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <FaGithub className="w-4 h-4" />
                      </a>
                    </div>

                  </div>
                </div>

              </div>
            </Tilt>
          </ScrollReveal>
        ))}
      </div>

      {/* GitHub Callout Footer */}
      <div className="mt-16 text-center">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0e1638] border border-white/10 text-sm font-mono text-[#8892b0] hover:text-white hover:border-[#e23636]/40 transition-colors shadow-lg"
        >
          <FaGithub className="w-4 h-4 text-[#e23636]" />
          View Complete Mission Archive on GitHub &rarr;
        </a>
      </div>

    </section>
  );
}
