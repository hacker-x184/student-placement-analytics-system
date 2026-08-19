/**
 * CareerLens Design Tokens — Master System
 * High-performance, professional SaaS & college placement intelligence tokens
 */

export const colors = {
  // Core Brand & Surfaces
  primary: '#0A66C2',
  primaryDark: '#004182',
  primaryLight: '#E8F3FF',

  background: '#F3F6F8',
  surface: '#FFFFFF',
  surfaceSubtle: '#F8FAFB',

  // Typography
  textPrimary: '#1D2226',
  textSecondary: '#5E6670',
  textMuted: '#7A828A',

  // Borders
  border: '#D9DEE3',
  borderSubtle: '#E8ECEF',
  borderDark: '#B2BAC2',

  // Status & Feedback
  success: {
    DEFAULT: '#057642',
    bg: '#E7F5EE',
    text: '#057642',
    border: '#A2DCBF',
  },
  warning: {
    DEFAULT: '#915907',
    bg: '#FFF4DF',
    text: '#915907',
    border: '#FED99B',
  },
  danger: {
    DEFAULT: '#CC1016',
    bg: '#FDECEC',
    text: '#CC1016',
    border: '#F6B5B7',
  },
  info: {
    DEFAULT: '#0A66C2',
    bg: '#E8F3FF',
    text: '#0A66C2',
    border: '#B3D7FF',
  },
} as const;

export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  styles: {
    pageTitle: {
      fontSize: '28px',
      fontWeight: '600',
      lineHeight: '32px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '28px',
    },
    cardTitle: {
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '24px',
    },
    body: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '22px',
    },
    small: {
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '18px',
    },
    button: {
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '20px',
    },
    kpiValue: {
      fontSize: '30px',
      fontWeight: '600',
      lineHeight: '36px',
    },
  },
} as const;

export const rounded = {
  btn: '6px',
  input: '6px',
  card: '8px',
  surface: '10px',
  full: '9999px',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const layoutConstraints = {
  sidebarWidth: '250px',
  contentMaxWidth: '1280px',
  navbarHeight: '56px',
  bottomNavHeight: '56px',
} as const;

export const tokens = {
  colors,
  typography,
  rounded,
  breakpoints,
  layoutConstraints,
};

export default tokens;


