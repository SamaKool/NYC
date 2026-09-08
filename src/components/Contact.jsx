import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import SectionHeading from './ui/SectionHeading';


import GlassCard from './ui/GlassCard';
import ScrollReveal from './ui/ScrollReveal';
import SpiderWebBg from './ui/SpiderWebBg';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Spider-Man transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <SpiderWebBg position="bottom-left" opacity={0.15} />

      <SectionHeading
        badge="Direct Frequency"
        title="SEND A SPIDER-SIGNAL"
        subtitle="Have a project in mind, need technical leadership, or just want to talk tech? Drop a message."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-20">
        
        {/* Left Column: Direct Info & Social Signals */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <ScrollReveal direction="right">
            <GlassCard glow="red" className="p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-3">
                Let's Build Something Amazing
              </h3>
              <p className="text-sm text-[#8892b0] leading-relaxed mb-6">
                Whether you're looking for a full-stack engineer, frontend architect, or need advice on web animations and system performance, my comms channel is open.
              </p>

              {/* Direct Channels */}
              <div className="space-y-4">
                <a
                  href="mailto:peter.parker@example.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#060918]/60 border border-white/5 hover:border-[#e23636]/40 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-[#e23636]/15 text-[#e23636] group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-[#8892b0]">Direct Mail</span>
                    <span className="text-sm font-semibold text-white group-hover:text-[#e23636] transition-colors">
                      peter.parker@example.com
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#060918]/60 border border-white/5">
                  <div className="p-2 rounded-lg bg-[#00f0ff]/15 text-[#00f0ff]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-[#8892b0]">Base of Operations</span>
                    <span className="text-sm font-semibold text-white">
                      Queens, New York City // Remote Worldwide
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <span className="block text-xs font-mono text-[#8892b0] mb-3 uppercase tracking-wider">
                  External Channels
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#060918] border border-white/10 text-white hover:border-[#e23636] hover:text-[#e23636] hover:shadow-[0_0_15px_rgba(226,54,54,0.4)] transition-all"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#060918] border border-white/10 text-white hover:border-[#00f0ff] hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#060918] border border-white/10 text-white hover:border-[#e23636] hover:text-[#e23636] hover:shadow-[0_0_15px_rgba(226,54,54,0.4)] transition-all"
                    aria-label="Twitter"
                  >
                    <FaXTwitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </GlassCard>
          </ScrollReveal>
        </div>

        {/* Right Column: Interactive Signal Form */}
        <div className="lg:col-span-7">
          <ScrollReveal direction="left" delay={0.1}>
            <GlassCard glow="blue" className="p-6 sm:p-10 relative">
              
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00f0ff]" />
                Dispatch Direct Frequency
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                    Signal Transmitted!
                  </h4>
                  <p className="text-sm text-[#8892b0] max-w-md">
                    Your message was received on the secure Stark channel. Peter will respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#8892b0] mb-2">
                      Your Identity / Alias
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Tony Stark, Mary Jane"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#060918]/80 border border-white/10 text-white placeholder-[#8892b0]/50 text-sm focus:outline-none focus:border-[#e23636] focus:shadow-[0_0_15px_rgba(226,54,54,0.3)] transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#8892b0] mb-2">
                      Frequency / Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. tony@starkindustries.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#060918]/80 border border-white/10 text-white placeholder-[#8892b0]/50 text-sm focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#8892b0] mb-2">
                      Mission Brief / Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe your project, timeline, or inquiry..."
                      className="w-full px-4 py-3.5 rounded-xl bg-[#060918]/80 border border-white/10 text-white placeholder-[#8892b0]/50 text-sm focus:outline-none focus:border-[#e23636] focus:shadow-[0_0_15px_rgba(226,54,54,0.3)] transition-all font-mono resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-mono text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#e23636] to-[#ff4d4d] hover:from-[#ff3b3b] hover:to-[#ff5e5e] shadow-[0_0_20px_rgba(226,54,54,0.4)] hover:shadow-[0_0_30px_rgba(226,54,54,0.6)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Firing Web-Signal...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Shoot Web-Signal
                      </>
                    )}
                  </button>
                </form>
              )}

            </GlassCard>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
