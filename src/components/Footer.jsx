import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060918] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Spider-Web Accent at top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-[#e23636] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Spider Emblem */}
        <div className="w-14 h-14 rounded-2xl bg-[#0a0e27] border border-[#e23636]/50 flex items-center justify-center shadow-[0_0_25px_rgba(226,54,54,0.3)] mb-6 hover:scale-110 transition-transform">
          <img src="/spider-logo.svg" alt="Spider Emblem" className="w-8 h-8" />
        </div>

        {/* Famous Spider-Man Quote */}
        <p className="text-sm md:text-base font-['Space_Grotesk'] text-white font-medium max-w-lg mb-2">
          "With great power comes great responsibility."
        </p>

        <p className="text-xs font-mono text-[#8892b0] mb-8">
          Engineered by SamaKool // Friendly Neighborhood Developer
        </p>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-[#8892b0] mb-10">
          <a href="#hero" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#projects" className="hover:text-white transition-colors">Missions</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8892b0]">
          <div>
            &copy; {new Date().getFullYear()} SamaKool. All rights reserved. Earth-616.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e1638] border border-white/10 hover:border-[#e23636] text-white hover:text-[#e23636] transition-all cursor-pointer"
          >
            <span>Swing to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
