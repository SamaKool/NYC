import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Zap } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = navItems.map(item => item.href.substring(1));
      const scrollY = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Scroll Progress Bar at very top */}
      <div 
        className="h-[2px] bg-gradient-to-r from-[#e23636] via-[#ff4d4d] to-[#00f0ff] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className={`
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300
        ${scrolled ? 'py-3' : 'py-5'}
      `}>
        <div className={`
          flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300
          ${scrolled 
            ? 'bg-[#0a0e27]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent'}
        `}>
          {/* Logo with Spider Silhouette */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#e23636]/10 border border-[#e23636]/40 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(226,54,54,0.5)]">
              <img src="/spider-logo.svg" alt="Spider Logo" className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-wider text-white font-['Space_Grotesk'] group-hover:text-[#e23636] transition-colors">
                SAMAKOOL
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#00f0ff] uppercase">
                WEB DEV // SUIT v4.2
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-[#0e1638]/40 border border-white/5 rounded-full px-3 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`
                    relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors
                    ${isActive ? 'text-white' : 'text-[#8892b0] hover:text-white'}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-[#e23636] rounded-full -z-10 shadow-[0_0_12px_rgba(226,54,54,0.6)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Action CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#e23636]/20 border border-[#e23636]/50 hover:bg-[#e23636] hover:shadow-[0_0_20px_rgba(226,54,54,0.5)] transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-[#00f0ff]" />
              Signal Hero
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#0e1638] border border-white/10 text-white hover:text-[#e23636] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mx-4 my-2 rounded-2xl bg-[#0a0e27]/95 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-base font-medium text-white hover:bg-[#e23636]/15 hover:text-[#e23636] transition-all"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-3 rounded-xl font-mono text-sm font-semibold uppercase bg-[#e23636] text-white shadow-[0_0_15px_rgba(226,54,54,0.4)]"
                >
                  Signal Hero
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
