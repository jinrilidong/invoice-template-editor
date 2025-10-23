/**
 * Design System Utility Functions
 * BTDS Foundation 3.0 - Enhanced for Invoice Template Editor
 */

// ============================================
// Spacing System - 8px Grid
// ============================================
export const spacing = {
  '0': '0px',
  '0.5': '2px',
  '1': '4px',
  '1.5': '6px',
  '2': '8px',
  '2.5': '10px',
  '3': '12px',
  '3.5': '14px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '7': '28px',
  '8': '32px',
  '9': '36px',
  '10': '40px',
  '11': '44px',
  '12': '48px',
  '14': '56px',
  '16': '64px',
  '18': '72px',
  '20': '80px',
  '24': '96px',
  '28': '112px',
  '32': '128px',
  '36': '144px',
  '40': '160px',
  '44': '176px',
  '48': '192px',
  '52': '208px',
  '56': '224px',
  '60': '240px',
  '64': '256px',
  '72': '288px',
  '80': '320px',
  '96': '384px',
} as const

// ============================================
// Color System
// ============================================
export const colors = {
  // Brand Colors
  brand: {
    50: '#fff7f3',
    100: '#ffd3b8',
    200: '#ffc5a1',
    300: '#ffb181',
    400: '#ff9757',
    500: '#ff761f',
    600: '#ff5b05',
    700: '#eb5100',
    800: '#b04300',
    900: '#953900',
    990: '#722c00',
  },
  // Cloudy Gray System
  cloudy: {
    50: '#f2f7f7',
    100: '#e2eaea',
    200: '#d3ddde',
    300: '#b7c2c4',
    400: '#9ca8aa',
    500: '#828e91',
    600: '#697579',
    700: '#505d62',
    800: '#3a464c',
    900: '#243037',
    990: '#0e171f',
    999: '#090f14',
  },
  // Semantic Colors
  semantic: {
    primary: '#0e171f',
    secondary: '#3e5463',
    tertiary: '#7a909e',
    disabled: '#c1ccd6',
    placeholder: '#9fb1bd',
    success: '#077d55',
    warning: '#b3870e',
    error: '#a1160a',
    info: '#186ade',
  },
  // Surface Colors
  surface: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    tertiary: '#f2f5f7',
    hover: '#e7ecef',
    disabled: '#dce3e8',
    brand: '#ff761f',
    brandHover: '#ff5b05',
  },
  // Border Colors
  border: {
    default: '#c1ccd6',
    hover: '#7a909e',
    focus: '#ff5b05',
    disabled: '#e7ecef',
    brand: '#ff5b05',
    secondary: '#c1ccd6',
  }
} as const

// ============================================
// Typography System
// ============================================
export const typography = {
  fontFamily: {
    primary: 'Inter, system-ui, sans-serif',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSize: {
    xs: '10px',
    sm: '11px',
    base: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '28px',
    '5xl': '32px',
    '6xl': '40px',
    '7xl': '48px',
  },
  lineHeight: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    md: '20px',
    lg: '24px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '32px',
    '5xl': '36px',
    '6xl': '44px',
    '7xl': '52px',
  },
} as const

// ============================================
// Border Radius System
// ============================================
export const borderRadius = {
  none: '0px',
  sm: '2px',
  base: '4px',
  md: '6px',
  lg: '8px',
  xl: '10px',
  '2xl': '12px',
  '3xl': '16px',
  full: '9999px',
} as const

// ============================================
// Shadow System
// ============================================
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
} as const

// ============================================
// Transition System
// ============================================
export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
  slower: '500ms ease-in-out',
} as const

// ============================================
// Z-Index System
// ============================================
export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  60: 60,
  70: 70,
  80: 80,
  90: 90,
  100: 100,
} as const

// ============================================
// Utility Functions
// ============================================

/**
 * Generate spacing classes for margin and padding
 */
export const getSpacingClasses = (size: keyof typeof spacing) => ({
  margin: `m-${size}`,
  padding: `p-${size}`,
  marginX: `mx-${size}`,
  marginY: `my-${size}`,
  paddingX: `px-${size}`,
  paddingY: `py-${size}`,
  marginTop: `mt-${size}`,
  marginBottom: `mb-${size}`,
  marginLeft: `ml-${size}`,
  marginRight: `mr-${size}`,
  paddingTop: `pt-${size}`,
  paddingBottom: `pb-${size}`,
  paddingLeft: `pl-${size}`,
  paddingRight: `pr-${size}`,
})

/**
 * Generate color classes
 */
export const getColorClasses = (color: string, variant?: string) => ({
  text: `text-${color}${variant ? `-${variant}` : ''}`,
  background: `bg-${color}${variant ? `-${variant}` : ''}`,
  border: `border-${color}${variant ? `-${variant}` : ''}`,
})

/**
 * Generate typography classes
 */
export const getTypographyClasses = (size: keyof typeof typography.fontSize) => ({
  fontSize: `text-${size}`,
  lineHeight: `leading-${size}`,
})

/**
 * Generate component classes
 */
export const getComponentClasses = {
  button: {
    base: 'btn-base',
    primary: 'btn-base bg-brand-500 text-white hover:bg-brand-600',
    secondary: 'btn-base bg-cloudy-200 text-cloudy-900 hover:bg-cloudy-300',
    outline: 'btn-base border border-brand-500 text-brand-500 hover:bg-brand-50',
    ghost: 'btn-base text-brand-500 hover:bg-brand-50',
  },
  input: {
    base: 'input-base',
    error: 'input-base border-error focus:border-error',
    disabled: 'input-base bg-disabled text-disabled cursor-not-allowed',
  },
  card: {
    base: 'card-base',
    elevated: 'card-base shadow-lg',
    interactive: 'card-base hover:shadow-md transition-shadow',
  },
}

/**
 * Generate responsive classes
 */
export const getResponsiveClasses = {
  container: {
    sm: 'container-sm',
    base: 'container',
    lg: 'container-lg',
    full: 'container-full',
  },
  grid: {
    auto: 'grid-auto-fit',
    '2': 'grid-2',
    '3': 'grid-3',
    '4': 'grid-4',
  },
  flex: {
    center: 'flex-center',
    between: 'flex-between',
    start: 'flex-start',
    end: 'flex-end',
    colCenter: 'flex-col-center',
    colStart: 'flex-col-start',
  },
}

/**
 * Generate spacing utilities for common patterns
 */
export const spacingUtils = {
  // Common spacing patterns
  section: getSpacingClasses('6'), // 24px
  component: getSpacingClasses('4'), // 16px
  element: getSpacingClasses('2'), // 8px
  tight: getSpacingClasses('1'), // 4px
  loose: getSpacingClasses('8'), // 32px
  
  // Specific spacing for different contexts
  header: getSpacingClasses('4'),
  content: getSpacingClasses('6'),
  footer: getSpacingClasses('4'),
  sidebar: getSpacingClasses('4'),
  modal: getSpacingClasses('6'),
  form: getSpacingClasses('4'),
  button: getSpacingClasses('2'),
  input: getSpacingClasses('2'),
}

/**
 * Generate common layout patterns
 */
export const layoutUtils = {
  // Page layouts
  page: 'min-h-screen flex flex-col',
  pageHeader: 'flex-shrink-0',
  pageContent: 'flex-1 overflow-hidden',
  pageFooter: 'flex-shrink-0',
  
  // Panel layouts
  panel: 'bg-primary border border-default rounded-lg shadow-sm',
  panelHeader: 'border-b border-default p-4',
  panelContent: 'p-4',
  panelFooter: 'border-t border-default p-4',
  
  // Form layouts
  form: 'space-y-4',
  formGroup: 'space-y-2',
  formRow: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  formActions: 'flex justify-end space-x-2 pt-4',
  
  // List layouts
  list: 'space-y-2',
  listItem: 'flex items-center justify-between p-2 hover:bg-hover rounded',
  listHeader: 'font-semibold text-secondary border-b border-default pb-2',
  
  // Card layouts
  card: 'bg-primary border border-default rounded-lg shadow-sm p-4',
  cardHeader: 'font-semibold text-primary mb-2',
  cardContent: 'text-secondary',
  cardActions: 'flex justify-end space-x-2 mt-4',
}

/**
 * Generate animation classes
 */
export const animationUtils = {
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  slideIn: 'animate-slide-in',
  slideOut: 'animate-slide-out',
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  transition: 'transition',
  transitionFast: 'transition-fast',
  transitionSlow: 'transition-slow',
}

// ============================================
// Export all utilities
// ============================================
export default {
  spacing,
  colors,
  typography,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  getSpacingClasses,
  getColorClasses,
  getTypographyClasses,
  getComponentClasses,
  getResponsiveClasses,
  spacingUtils,
  layoutUtils,
  animationUtils,
}

// ============================================
// Type definitions
// ============================================
export type SpacingSize = keyof typeof spacing
export type ColorVariant = keyof typeof colors.brand | keyof typeof colors.cloudy
export type TypographySize = keyof typeof typography.fontSize
export type BorderRadiusSize = keyof typeof borderRadius
export type ShadowSize = keyof typeof shadows
export type TransitionSpeed = keyof typeof transitions
export type ZIndexLevel = keyof typeof zIndex
