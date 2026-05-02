export const COLORS = {
  background: '#0A0A0F', // Deep black base
  primary: '#FF2D4B', // Electric crimson (danger accent)
  active: '#00C2FF', // Electric blue (live/active accent)
  warning: '#FFB830', // Warm amber
  surface: '#1A1A24', // Glassmorphism card base
  surfaceLight: '#2A2A35',
  text: '#FFFFFF',
  textMuted: '#8A8A93',
  border: '#2A2A35',
  dangerGlow: 'rgba(255, 45, 75, 0.3)',
  activeGlow: 'rgba(0, 194, 255, 0.3)',
};

export const FONTS = {
  display: 'BebasNeue_400Regular',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodyBold: 'DMSans_700Bold',
  mono: 'JetBrainsMono_400Regular',
};

export const SHADOWS = {
  glowDanger: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  glowActive: {
    shadowColor: COLORS.active,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
};

export const SIZES = {
  base: 8,
  cardRadius: 12,
  pillRadius: 999,
  padding: 16,
};
