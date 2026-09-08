import { Terminal, Shield, Zap, Award, Code, HeartHandshake } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import ScrollReveal from './ui/ScrollReveal';

export default function About() {
  const stats = [
    { label: "Missions Completed", value: "5", icon: Award, color: "#e23636" },
    { label: "Wisdom", value: "Master", icon: Zap, color: "#00f0ff" },
    { label: "Lines of Code", value: "25K+", icon: Code, color: "#e23636" },
    { label: "My Satisfaction", value: "100%", icon: HeartHandshake, color: "#00f0ff" },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Origin Story"
        title="ABOUT THE SLINGER"
        subtitle="Bridging the gap between creative visual frontends and high-performance backend architecture."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Stylized Spider-Card Profile */}
        <div className="lg:col-span-5 flex justify-center">
          <ScrollReveal direction="right" className="w-full max-w-md">
            <GlassCard glow="red" className="relative group overflow-hidden">
              
              {/* Outer Glowing Hexagon Frame */}
              <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 p-1.5 rounded-3xl bg-gradient-to-tr from-[#e23636] via-[#1565c0] to-[#00f0ff] shadow-[0_0_30px_rgba(226,54,54,0.3)]">
                <div className="w-full h-full rounded-[22px] bg-[#0a0e27] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  
                  {/* Subtle Web Grid Inside */}
                  <div className="absolute inset-0 bg-web-pattern opacity-60 pointer-events-none" />

                  {/* Spider Emblem Logo in Profile Frame */}
                  <div className="w-24 h-24 mb-4 rounded-2xl bg-[#e23636]/10 border border-[#e23636]/40 flex items-center justify-center shadow-[0_0_20px_rgba(226,54,54,0.4)] group-hover:scale-105 transition-transform">
                    <img src="/spider-logo.svg" alt="Spider Logo" className="w-16 h-16 animate-spider-pulse" />
                  </div>

                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                    SamaKool
                  </h3>
                  <p className="text-xs font-mono text-[#00f0ff] mt-1">
                    Pune, MH // EARTH-616
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e23636]/10 border border-[#e23636]/30 text-[11px] font-mono text-[#e23636]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Contracts
                  </div>
                </div>
              </div>

              {/* Spider Quote Badge */}
              <div className="mt-6 p-4 rounded-xl bg-[#060918]/60 border border-white/5 text-center">
                <p className="text-xs italic text-[#8892b0]">
                  "Anyone can wear the mask. You can wear the mask. If you didn't know that before, I hope you do now."
                </p>
              </div>

            </GlassCard>
          </ScrollReveal>
        </div>

        {/* Right Column: Bio Narrative & Stats */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <ScrollReveal direction="left" delay={0.1}>
            <GlassCard glow="blue" className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  Full Stack Engineer & Web Architect
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#8892b0] leading-relaxed">
                By day, I'm a software developer solving complex computational challenges and optimizing digital products. By night, I experiment with interactive 3D web engines, micro-interactions, and high-performance serverless backends.
              </p>

              <p className="text-sm sm:text-base text-[#8892b0] leading-relaxed">
                My approach blends bulletproof reliability with playful, responsive visual storytelling. Whether it's architecting real-time WebSocket protocols or creating silky-smooth UI transitions, I build products that leave lasting impressions.
              </p>

              {/* Technical Core Beliefs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#060918]/50 border border-white/5">
                  <Shield className="w-4 h-4 text-[#e23636]" />
                  <span className="text-xs font-mono text-white">Clean, Scalable Architecture</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#060918]/50 border border-white/5">
                  <Zap className="w-4 h-4 text-[#00f0ff]" />
                  <span className="text-xs font-mono text-white">Sub-100ms Interactions</span>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={stat.label} direction="up" delay={0.2 + idx * 0.1}>
                  <div className="p-4 rounded-xl bg-[#0e1638]/60 border border-white/10 flex flex-col items-center text-center group hover:border-[#e23636]/40 transition-colors">
                    <div 
                      className="p-2 rounded-lg mb-2 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-white">
                      {stat.value}
                    </span>
                    <span className="text-[11px] font-mono text-[#8892b0] mt-1">
                      {stat.label}
                    </span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
