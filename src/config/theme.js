// ============================================================
// HUD THEME — CSS design tokens for all HTML overlay components
// Every HUD component MUST use these tokens. DO NOT use
// arbitrary Tailwind classes for colors or sizing.
// ============================================================

export const FONTS = {
  heading: 'Orbitron, Rajdhani, monospace',
  body: 'Rajdhani, Inter, sans-serif',
  mono: 'JetBrains Mono, Fira Code, monospace',
};

export const GLASS_PANEL = {
  background: 'rgba(10, 14, 39, 0.65)',
  border: '1px solid rgba(0, 240, 255, 0.25)',
  borderRadius: '12px',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 0 30px rgba(0, 240, 255, 0.1), inset 0 0 30px rgba(0, 240, 255, 0.05)',
  padding: '24px',
};
