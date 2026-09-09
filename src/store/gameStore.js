import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { GAME_STATE, CAMERA_MODE, HERO } from '../config/constants.js';

export const useGameStore = create(
  subscribeWithSelector((set, get) => ({
    // ─── STATE ──────────────────
    gameState: GAME_STATE.INTRO,
    cameraMode: CAMERA_MODE.CINEMATIC,
    activeSection: null,
    previousSection: null,
    isPanelOpen: false,
    loadProgress: 0,
    landingImpact: 0,
    isAudioMuted: false,

    // ─── PLAYER ─────────────────
    playerPosition: [...HERO.spawnPoint],
    playerRotation: [0, 0, 0],
    isGrounded: true,
    viewMode: 'pov', // 'pov' (1st-person through Spider-Man's eyes) | 'third_person' (close chase cam)

    // ─── SWING ──────────────────
    swingTarget: null,
    swingProgress: 0,
    isSwinging: false,

    // ─── ACTIONS ────────────────
    startSwing: (targetTowerId) => {
      const state = get();
      if (state.isSwinging || state.gameState === GAME_STATE.FALLING || state.gameState === GAME_STATE.INTRO) return;

      // If already at this tower, don't swing! Just ensure panel is open.
      if (state.activeSection === targetTowerId && state.gameState === GAME_STATE.IDLE_ROOFTOP) {
        if (!state.isPanelOpen) {
          set({ isPanelOpen: true });
        }
        return;
      }

      set({
        swingTarget: targetTowerId,
        swingProgress: 0,
        isSwinging: true,
        isPanelOpen: false,
        gameState: GAME_STATE.SWINGING,
        cameraMode: CAMERA_MODE.SWING_CAM,
        previousSection: state.activeSection,
        activeSection: targetTowerId,
      });
    },

    endSwing: () => set({
      swingTarget: null,
      swingProgress: 1,
      isSwinging: false,
      isGrounded: true,
      gameState: GAME_STATE.IDLE_ROOFTOP,
      cameraMode: CAMERA_MODE.FOLLOW_ROOFTOP,
    }),

    jumpOff: () => set({
      isPanelOpen: false,
      isGrounded: false,
      gameState: GAME_STATE.FALLING,
      cameraMode: CAMERA_MODE.FALL_CAM,
      previousSection: get().activeSection,
      activeSection: null,
    }),

    land: () => {
      set({
        isGrounded: true,
        gameState: GAME_STATE.LANDING,
        cameraMode: CAMERA_MODE.FOLLOW_GROUND,
        playerPosition: [...HERO.spawnPoint],
        landingImpact: get().landingImpact + 1,
      });

      // Settle into idle ground after impact duration
      setTimeout(() => {
        if (get().gameState === GAME_STATE.LANDING) {
          set({ gameState: GAME_STATE.IDLE_GROUND });
        }
      }, 400);
    },

    skipIntro: () => set({
      gameState: GAME_STATE.IDLE_GROUND,
      cameraMode: CAMERA_MODE.FOLLOW_GROUND,
    }),

    endIntro: () => set({
      gameState: GAME_STATE.IDLE_GROUND,
      cameraMode: CAMERA_MODE.FOLLOW_GROUND,
    }),

    openPanel: () => set({ isPanelOpen: true }),
    closePanel: () => set({ isPanelOpen: false }),
    setGameState: (state) => set({ gameState: state }),
    setLoadProgress: (progress) => set({ loadProgress: progress }),
    updatePlayerPosition: (pos) => set({ playerPosition: pos }),
    setViewMode: (mode) => set({ viewMode: mode }),
    toggleViewMode: () => set((s) => ({ viewMode: s.viewMode === 'pov' ? 'third_person' : 'pov' })),
    toggleAudio: () => set((s) => ({ isAudioMuted: !s.isAudioMuted })),
  }))
);
