import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export default function ContactPanel() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
      {/* Left Column: Direct Channels */}
      <div className="md:col-span-5 space-y-4">
        <div className="p-4 rounded-xl bg-[#060918]/80 border border-white/10 space-y-3">
          <h4 className="text-sm font-bold font-['Orbitron'] text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#00f0ff]" />
            Direct Comms Channel
          </h4>

          <p className="text-xs text-gray-300 leading-relaxed font-['Rajdhani']">
            Whether you need engineering leadership, interactive web development, or advice on 3D graphics, my channel is active.
          </p>

          <div className="space-y-2 pt-2">
            <a
              href="mailto:peter.parker@example.com"
              className="flex items-center gap-3 p-2.5 rounded-lg bg-[#0e1638]/50 border border-white/5 hover:border-[#e23636]/40 transition-colors group"
            >
              <div className="p-1.5 rounded-md bg-[#e23636]/15 text-[#e23636] group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-[10px] font-mono text-gray-400">Direct Email</span>
                <span className="text-xs font-mono font-semibold text-white group-hover:text-[#e23636] transition-colors truncate block">
                  peter.parker@example.com
                </span>
              </div>
            </a>

            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#0e1638]/50 border border-white/5">
              <div className="p-1.5 rounded-md bg-[#00f0ff]/15 text-[#00f0ff]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-gray-400">Base</span>
                <span className="text-xs font-mono font-semibold text-white">
                  Queens, NYC // Earth-616
                </span>
              </div>
            </div>
          </div>

          {/* Social Icons Row */}
          <div className="pt-3 border-t border-white/5 flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#0e1638] border border-white/10 text-gray-300 hover:text-white hover:border-[#e23636] transition-all"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#0e1638] border border-white/10 text-gray-300 hover:text-white hover:border-[#00f0ff] transition-all"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#0e1638] border border-white/10 text-gray-300 hover:text-white hover:border-[#e23636] transition-all"
              aria-label="Twitter Profile"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Dispatch Form */}
      <div className="md:col-span-7">
        <div className="p-4 sm:p-5 rounded-xl bg-[#060918]/80 border border-white/10">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-['Orbitron'] text-white">
                Signal Transmitted!
              </h4>
              <p className="text-xs text-gray-300 max-w-xs font-['Rajdhani']">
                Your message reached the secure terminal. A response will be dispatched within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Alias / Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Tony Stark, Mary Jane"
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0e27] border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-[#e23636] focus:shadow-[0_0_10px_rgba(226,54,54,0.3)] transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Frequency / Email
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="e.g. tony@starkindustries.com"
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0e27] border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Transmission Brief
                </label>
                <textarea
                  rows={3}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your inquiry, mission, or timeline..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0e27] border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-[#e23636] focus:shadow-[0_0_10px_rgba(226,54,54,0.3)] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#e23636] to-[#ff4d4d] hover:from-[#ff3b3b] hover:to-[#ff5e5e] shadow-[0_0_15px_rgba(226,54,54,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Fire Spider-Signal
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

