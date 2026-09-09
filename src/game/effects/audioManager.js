import { useGameStore } from '../../store/gameStore.js';

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.isInitialized = false;
    this.ambientNodes = [];
  }

  init() {
    if (this.isInitialized) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(
        useGameStore.getState().isAudioMuted ? 0 : 0.8,
        this.ctx.currentTime
      );
      this.masterGain.connect(this.ctx.destination);

      this.isInitialized = true;
      this.startAmbient();
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  ensureContext() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    if (!this.masterGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(muted ? 0 : 0.8, now + 0.1);
  }

  // ─── AMBIENT CITY WIND / SUB-DRONE ────────────────────────────
  startAmbient() {
    if (!this.ctx || this.ambientNodes.length > 0) return;

    const now = this.ctx.currentTime;
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.04, now);
    this.ambientGain.connect(this.masterGain);

    // Deep sub oscillator 1 (55Hz)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, now);

    // Deep sub oscillator 2 (110Hz with slight detune)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(110, now);
    osc2.detune.setValueAtTime(4, now);

    // Gentle low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, now);

    // Slow LFO for organic city breathing
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.08, now);
    lfoGain.gain.setValueAtTime(60, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(this.ambientGain);

    osc1.start(now);
    osc2.start(now);
    lfo.start(now);

    this.ambientNodes = [osc1, osc2, lfo, this.ambientGain];
  }

  // ─── WEB SHOOT EFFECT ─────────────────────────────────────────
  playWebShoot() {
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.12);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(3.0, now);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // ─── SWING WHOOSH EFFECT ──────────────────────────────────────
  playSwingWhoosh() {
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 1.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(2.5, now);
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.7);
    filter.frequency.exponentialRampToValueAtTime(350, now + 1.8);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.6);
    gain.gain.linearRampToValueAtTime(0.001, now + 1.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 1.8);
  }

  // ─── LANDING THUD EFFECT ──────────────────────────────────────
  playLandingThud() {
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.28);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // ─── UI CLICK EFFECT ──────────────────────────────────────────
  playClick() {
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.07);
  }
}

export const soundEngine = new SoundEngine();

// Auto-start on first user interaction anywhere in the window
let autoStartHandled = false;
export function setupAudioAutoStart() {
  if (typeof window === 'undefined' || autoStartHandled) return;

  const onFirstInteraction = () => {
    soundEngine.ensureContext();
    window.removeEventListener('pointerdown', onFirstInteraction);
    window.removeEventListener('keydown', onFirstInteraction);
    autoStartHandled = true;
  };

  window.addEventListener('pointerdown', onFirstInteraction, { once: true });
  window.addEventListener('keydown', onFirstInteraction, { once: true });

  // Subscribe to game store events
  useGameStore.subscribe(
    (state) => state.isAudioMuted,
    (muted) => soundEngine.setMuted(muted)
  );

  useGameStore.subscribe(
    (state) => state.isSwinging,
    (isSwinging) => {
      if (isSwinging) {
        soundEngine.playWebShoot();
        soundEngine.playSwingWhoosh();
      }
    }
  );

  useGameStore.subscribe(
    (state) => state.landingImpact,
    (impact) => {
      if (impact > 0) {
        soundEngine.playLandingThud();
      }
    }
  );
}

