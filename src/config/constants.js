// ============================================================
// SPIDER-VERSE PORTFOLIO — SHARED CONSTANTS
// Every component in the project MUST import from this file.
// DO NOT hardcode colors, positions, or dimensions elsewhere.
// ============================================================

// ─── COLOR PALETTE (Three.js hex integers) ───────────────────
export const COLORS = {
  // Background & atmosphere
  SKY_DARK:         0x0a0e27,  // Deep midnight navy
  GROUND:           0x04060f,  // Near-black street level
  FOG:              0x0a0e27,  // Matches sky for seamless depth fade

  // Spider-Man theme accents
  SPIDER_RED:       0xe23636,  // Primary red (suits, danger, action)
  SPIDER_RED_NEON:  0xff1e42,  // Bright neon red (emissive, bloom-friendly)
  SPIDER_BLUE:      0x1a3a6e,  // Dark suit blue
  SPIDER_CYAN:      0x00f0ff,  // Electric cyan (web lines, UI accents)

  // City lighting
  MOON_BLUE:        0x8ec5fc,  // Cool directional moonlight
  WARM_WINDOW:      0xffe873,  // Warm office window glow
  COOL_WINDOW:      0x99d9ff,  // Cool fluorescent window
  SODIUM_AMBER:     0xffaa33,  // Street lamp amber
  NEON_PINK:        0xff3388,  // Billboard pink accent

  // Building materials
  WALL_DARK:        0x0a0d14,  // Dark concrete/glass wall base
  ROOF_CONCRETE:    0x111827,  // Rooftop floor
  METAL_DARK:       0x1c1f2e,  // Water tank / AC unit metal

  // HUD (CSS hex strings for Tailwind)
  HUD_BG:           '#0a0e27cc',  // Semi-transparent navy
  HUD_BORDER:       '#00f0ff44',  // Cyan border glow
  HUD_TEXT:         '#e2e8f0',    // Light gray text
  HUD_ACCENT:       '#00f0ff',    // Cyan accent
  HUD_DANGER:       '#ff1e42',    // Red accent
};

// ─── CSS COLOR STRINGS (for HUD / Tailwind) ─────────────────
export const CSS_COLORS = {
  bg:             'rgba(10, 14, 39, 0.8)',
  bgSolid:        '#0a0e27',
  border:         'rgba(0, 240, 255, 0.25)',
  borderActive:   'rgba(0, 240, 255, 0.6)',
  text:           '#e2e8f0',
  textMuted:      '#94a3b8',
  accent:         '#00f0ff',
  danger:         '#ff1e42',
  glass:          'rgba(10, 14, 39, 0.65)',
};

// ─── WORLD DIMENSIONS ────────────────────────────────────────
export const WORLD = {
  // Playable area (centered at origin)
  SIZE: 300,                    // Total world width/depth in Three.js units
  GROUND_Y: 0,                 // Ground plane Y position
  FOG_DENSITY: 0.008,          // Exponential fog density

  // Background city grid (non-interactive filler buildings)
  BG_GRID_ROWS: 10,
  BG_GRID_COLS: 10,
  BG_BLOCK_SIZE: 14,
  BG_STREET_WIDTH: 8,
  BG_MIN_HEIGHT: 15,
  BG_MAX_HEIGHT: 80,
};

// ─── SECTION TOWER DEFINITIONS ───────────────────────────────
export const TOWERS = {
  about: {
    id: 'about',
    label: 'ABOUT',
    position: [-45, 0, -15],    // West
    width: 16,
    depth: 16,
    height: 55,
    beaconColor: COLORS.SPIDER_CYAN,
    rooftopProps: ['waterTank', 'acUnit'],
    cameraOrbitRadius: 12,
    cameraOrbitHeight: 4,
  },
  skills: {
    id: 'skills',
    label: 'SKILLS',
    position: [45, 0, -15],     // East
    width: 18,
    depth: 16,
    height: 60,
    beaconColor: COLORS.SPIDER_CYAN,
    rooftopProps: ['antenna', 'acUnit', 'acUnit'],
    cameraOrbitRadius: 14,
    cameraOrbitHeight: 4,
  },
  projects: {
    id: 'projects',
    label: 'PROJECTS',
    position: [30, 0, -50],     // North-East
    width: 20,
    depth: 18,
    height: 70,
    beaconColor: COLORS.SPIDER_RED_NEON,
    rooftopProps: ['waterTank', 'satelliteDish', 'bulkhead'],
    cameraOrbitRadius: 16,
    cameraOrbitHeight: 5,
  },
  experience: {
    id: 'experience',
    label: 'EXPERIENCE',
    position: [-30, 0, -50],    // North-West
    width: 18,
    depth: 16,
    height: 65,
    beaconColor: COLORS.SPIDER_RED_NEON,
    rooftopProps: ['antenna', 'waterTank'],
    cameraOrbitRadius: 14,
    cameraOrbitHeight: 4,
  },
  contact: {
    id: 'contact',
    label: 'CONTACT',
    position: [0, 0, 35],       // South
    width: 14,
    depth: 14,
    height: 45,
    beaconColor: COLORS.NEON_PINK,
    rooftopProps: ['satelliteDish', 'acUnit'],
    cameraOrbitRadius: 10,
    cameraOrbitHeight: 3,
  },
};

export const TOWER_LIST = Object.values(TOWERS);

// ─── HERO PLAZA ──────────────────────────────────────────────
export const HERO = {
  position: [0, 0, 0],           // Center of the world
  radius: 20,                    // Circular plaza radius
  platformHeight: 0.5,           // Slightly raised platform
  spawnPoint: [0, 1.5, 8],       // Where the player starts (standing on plaza)
  cameraStart: [0, 6, 18],       // Initial camera position looking at plaza
  cameraLookAt: [0, 3, 0],       // Camera target
};

// ─── PLAYER ──────────────────────────────────────────────────
export const PLAYER = {
  HEIGHT: 1.8,                   // Capsule height (meters)
  RADIUS: 0.35,                  // Capsule radius
  MOVE_SPEED: 8,                 // Walking speed (units/sec)
  FALL_SPEED: 25,                // Terminal velocity when jumping off
  FALL_DECEL_HEIGHT: 10,         // Start decelerating this many units above ground
  COLOR: COLORS.SPIDER_RED,      // Player capsule color
  SILHOUETTE_COLOR: 0x111111,    // Dark silhouette base
};

// ─── SWING SYSTEM ────────────────────────────────────────────
export const SWING = {
  DURATION: 2.2,                 // Total swing duration in seconds
  EASE: 'power2.inOut',          // GSAP ease for swing progress (t: 0→1)
  ARC_DIP_FACTOR: 0.35,          // How far below start/end the arc dips
  ARC_OVERSHOOT: 1.15,           // Slight overshoot past target for drama
  FOV_REST: 60,                  // Normal FOV
  FOV_SWING_MAX: 82,             // FOV at max speed (bottom of arc)
  CAMERA_PULL_BACK: 15,          // Camera distance during swing
  CAMERA_HEIGHT_OFFSET: 3,       // Camera Y offset above player during swing
  WEB_COLOR: COLORS.SPIDER_CYAN,
  WEB_OPACITY: 0.8,
  WEB_SEGMENTS: 20,              // Tube geometry segments
  TRAIL_PARTICLE_COUNT: 50,
  TRAIL_COLOR: COLORS.SPIDER_CYAN,
  TRAIL_LIFETIME: 0.4,          // Seconds before trail fades
};

// ─── FALL (Jump Off) ─────────────────────────────────────────
export const FALL = {
  DURATION: 1.8,                 // Fall animation duration
  EASE: 'power2.in',             // Accelerating fall
  CAMERA_SPIN: Math.PI * 0.5,    // Camera does a half-rotation during fall
  LAND_SHAKE_INTENSITY: 0.3,     // Camera shake on landing
  LAND_SHAKE_DURATION: 0.4,      // Shake duration
};

// ─── BEACON ──────────────────────────────────────────────────
export const BEACON = {
  RADIUS: 1.2,                   // Beacon sphere radius
  PULSE_SPEED: 2.0,              // Pulsing animation speed
  PULSE_SCALE_MIN: 0.9,          // Min scale during pulse
  PULSE_SCALE_MAX: 1.3,          // Max scale during pulse
  GLOW_INTENSITY: 3.0,           // Emissive intensity (drives bloom)
  RING_RADIUS: 2.5,              // Ring around beacon base
  RING_TUBE: 0.08,               // Ring tube thickness
  LABEL_HEIGHT_OFFSET: 4.0,      // Height of text label above rooftop
  LABEL_FONT_SIZE: 2.5,          // 3D text size
};

// ─── HUD / UI ────────────────────────────────────────────────
export const HUD = {
  MINIMAP_SIZE: 160,             // Minimap square size in pixels
  MINIMAP_POSITION: 'top-right', // CSS corner
  PANEL_MAX_WIDTH: 480,          // Content panel max width in pixels
  PANEL_PADDING: 24,             // Content panel padding
  PANEL_BORDER_RADIUS: 12,       // Border radius
  TRANSITION_DURATION: 0.5,      // Panel entry/exit duration in seconds
  BACKDROP_BLUR: 12,             // Glassmorphism blur in pixels
};

// ─── LIGHTING ────────────────────────────────────────────────
export const LIGHTING = {
  MOON_POSITION: [80, 140, -60],
  MOON_INTENSITY: 1.4,
  MOON_COLOR: COLORS.MOON_BLUE,
  MOON_SHADOW_MAP_SIZE: 1024,

  HEMISPHERE_SKY: 0x1a254f,
  HEMISPHERE_GROUND: 0x050711,
  HEMISPHERE_INTENSITY: 0.65,

  AMBIENT_INTENSITY: 0.15,
  AMBIENT_COLOR: 0x1a1a3e,
};

// ─── POST-PROCESSING ─────────────────────────────────────────
export const POST_PROCESSING = {
  BLOOM_THRESHOLD: 0.85,
  BLOOM_SMOOTHING: 0.15,
  BLOOM_INTENSITY: 1.2,
  VIGNETTE_OFFSET: 0.3,
  VIGNETTE_DARKNESS: 0.7,
  CHROMATIC_OFFSET: [0.0012, 0.0012],
};

// ─── PERFORMANCE ─────────────────────────────────────────────
export const PERF = {
  MAX_DPR: 1.5,                  // Clamp device pixel ratio
  SHADOW_MAP_SIZE: 1024,         // Shadow resolution
  MAX_DRAW_CALLS: 35,            // Performance budget
  TARGET_FPS: 60,
};

// ─── GAME STATES ─────────────────────────────────────────────
export const GAME_STATE = {
  LOADING: 'loading',
  INTRO: 'intro',               // Camera cinematic pan
  IDLE_GROUND: 'idle_ground',   // Player on hero plaza
  IDLE_ROOFTOP: 'idle_rooftop', // Player on a tower rooftop
  SWINGING: 'swinging',         // Mid web-swing
  FALLING: 'falling',           // Jumping off rooftop
  LANDING: 'landing',           // Landing impact + camera shake
};

// ─── CAMERA MODES ────────────────────────────────────────────
export const CAMERA_MODE = {
  CINEMATIC: 'cinematic',       // Scripted intro sequence
  FOLLOW_GROUND: 'follow_ground', // Following player at ground level
  FOLLOW_ROOFTOP: 'follow_rooftop', // Orbiting player on rooftop
  SWING_CAM: 'swing_cam',       // Dynamic during web-swing
  FALL_CAM: 'fall_cam',         // Looking down during fall
};
