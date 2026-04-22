export const colors = {
  // Primary colors
  primary: '#5B6FFF', // Blue/Purple
  primaryLight: '#E8EBFF',
  primaryDark: '#3D4FB8',

  // Secondary colors
  secondary: '#00D084', // Green
  secondaryLight: '#E8F8F1',
  secondaryDark: '#00A366',

  // Accent
  accent: '#FF6B6B', // Red
  accentLight: '#FFE8E8',

  // Neutral
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F8F9FA',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#6C757D',
  gray700: '#495057',
  gray800: '#343A40',
  gray900: '#212529',

  // Status colors
  success: '#10B981',
  successLight: '#ECFDF5',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Transparent
  transparent: 'transparent',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

export const typography = {
  heading1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  heading2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  heading3: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  heading4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  heading5: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export default theme;
