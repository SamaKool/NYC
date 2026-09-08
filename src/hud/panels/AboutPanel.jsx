import { motion } from 'motion/react';
import { Terminal, Shield, Zap, Award, Code, HeartHandshake, MapPin } from 'lucide-react';

const stats = [
  { label: 'Missions Completed', value: '5', icon: Award, color: '#e23636' },
  { label: 'Wisdom', value: 'Master', icon: Zap, color: '#00f0ff' },
  { label: 'Lines of Code', value: '25K+', icon: Code, color: '#e23636' },
  { label: 'Client Satisfaction', value: '100%', icon: HeartHandshake, color: '#00f0ff' },
];

export default function AboutPanel() {
  return (
    <div className="space-y-6">
      {/* Top Profile Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="p-5 rounded-xl bg-[#060918]/80 border border-[#00f0ff]/30 shadow-[0_0_20px_rgba(0,240,255,0.1)] flex flex-col sm:flex-row items-center gap-5"
      >
        <div className="relative shrink-0 w-20 h-20 rounded-2xl bg-[#0a0e27] border-2 border-[#e23636] flex items-center justify-center shadow-[0_0_20px_rgba(226,54,54,0.4)]">
          <img
            src="/spider-logo.svg"
            alt="Spider Emblem"
            className="w-12 h-12 animate-pulse"
          />
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0a0e27]" />
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e23636]/15 border border-[#e23636]/30 text-[10px] font-mono text-[#e23636] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            OPERATIONAL // EARTH-616
          </div>
          <h3 className="text-xl font-bold font-['Orbitron'] text-white">
            SamaKool
          </h3>
          <p className="text-xs font-mono text-[#00f0ff] flex items-center justify-center sm:justify-start gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
            Pune, MH // Friendly Neighborhood Architect
          </p>
        </div>

        <div className="hidden md:block max-w-[200px] text-right">
          <span className="text-[10px] font-mono text-gray-400 italic">
            "Anyone can wear the mask. With great code comes great responsibility."
          </span>
        </div>
      </motion.div>

      {/* Narrative Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="p-5 rounded-xl bg-[#060918]/60 border border-white/10 space-y-3"
      >
        <div className="flex items-center gap-2 text-[#00f0ff]">
          <Terminal className="w-4 h-4" />
          <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
            Origin Story & Philosophy
          </h4>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-['Rajdhani']">
          By day, I engineer performant software systems and responsive interfaces. By night, I experiment with interactive 3D graphics, physics simulations, and cutting-edge WebGL pipelines.
        </p>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-['Rajdhani']">
          My development philosophy blends rock-solid backend reliability with playful, responsive visual storytelling. Every pixel, transition, and micro-interaction is tuned for maximum impact.
        </p>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0e1638]/50 border border-white/5 text-xs font-mono text-gray-200">
            <Shield className="w-4 h-4 text-[#e23636] shrink-0" />
            <span>Clean, Resilient Architecture</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0e1638]/50 border border-white/5 text-xs font-mono text-gray-200">
            <Zap className="w-4 h-4 text-[#00f0ff] shrink-0" />
            <span>Sub-100ms Interactions</span>
          </div>
        </div>
      </motion.div>

      {/* Field Metrics Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-3.5 rounded-xl bg-[#0e1638]/60 border border-white/10 flex flex-col items-center text-center group hover:border-[#00f0ff]/40 transition-colors"
            >
              <div
                className="p-1.5 rounded-lg mb-1.5"
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-lg sm:text-xl font-bold font-['Orbitron'] text-white">
                {stat.value}
              </span>
              <span className="text-[10px] font-mono text-gray-400 uppercase mt-0.5">
                {stat.label}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

