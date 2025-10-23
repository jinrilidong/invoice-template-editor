/**
 * Design System Configuration
 * Based on Figma Design System - BTDS Foundation 3.0
 * Extracted from: https://www.figma.com/design/K417GOWdISjE4nPWuZVD31/BTDS-Foundation---3.0?node-id=15140-373464
 */

// Font Family Configuration
export const FONT_FAMILIES = {
  inter: {
    regular: "font-['Inter:Regular',_sans-serif]",
    medium: "font-['Inter:Medium',_sans-serif]", 
    semibold: "font-['Inter:Semibold',_sans-serif]",
    bold: "font-['Inter:Bold',_sans-serif]"
  }
}

// Text Styles Configuration
export const TEXT_STYLES = {
  // Heading Styles
  heading: {
    '4xl': {
      fontFamily: FONT_FAMILIES.inter.bold,
      fontSize: 'text-[48px]',
      fontWeight: 'font-bold',
      lineHeight: 'leading-[52px]',
      color: 'text-[rgba(0,0,0,0.8)]',
      className: 'font-[\'Inter:Bold\',_sans-serif] font-bold leading-[52px] text-[48px] text-[rgba(0,0,0,0.8)]'
    },
    '3xl': {
      fontFamily: FONT_FAMILIES.inter.bold,
      fontSize: 'text-[40px]',
      fontWeight: 'font-bold', 
      lineHeight: 'leading-[44px]',
      color: 'text-[rgba(0,0,0,0.8)]',
      className: 'font-[\'Inter:Bold\',_sans-serif] font-bold leading-[44px] text-[40px] text-[rgba(0,0,0,0.8)]'
    },
    'xxl': {
      fontFamily: FONT_FAMILIES.inter.bold,
      fontSize: 'text-[32px]',
      fontWeight: 'font-bold',
      lineHeight: 'leading-[36px]', 
      color: 'text-[rgba(0,0,0,0.8)]',
      className: 'font-[\'Inter:Bold\',_sans-serif] font-bold leading-[36px] text-[32px] text-[rgba(0,0,0,0.8)]'
    },
    'xl': {
      fontFamily: FONT_FAMILIES.inter.bold,
      fontSize: 'text-[28px]',
      fontWeight: 'font-bold',
      lineHeight: 'leading-[32px]',
      color: 'text-[rgba(0,0,0,0.8)]',
      className: 'font-[\'Inter:Bold\',_sans-serif] font-bold leading-[32px] text-[28px] text-[rgba(0,0,0,0.8)]'
    },
    'lg': {
      fontFamily: FONT_FAMILIES.inter.bold,
      fontSize: 'text-[24px]',
      fontWeight: 'font-bold',
      lineHeight: 'leading-[32px]',
      color: 'text-[rgba(0,0,0,0.8)]',
      className: 'font-[\'Inter:Bold\',_sans-serif] font-bold leading-[32px] text-[24px] text-[rgba(0,0,0,0.8)]'
    },
    'md': {
      fontFamily: FONT_FAMILIES.inter.bold,
      fontSize: 'text-[20px]',
      fontWeight: 'font-bold',
      lineHeight: 'leading-[24px]',
      color: 'text-[rgba(0,0,0,0.8)]',
      className: 'font-[\'Inter:Bold\',_sans-serif] font-bold leading-[24px] text-[20px] text-[rgba(0,0,0,0.8)]'
    },
    'sm': {
      fontFamily: FONT_FAMILIES.inter.bold,
      fontSize: 'text-[18px]',
      fontWeight: 'font-bold',
      lineHeight: 'leading-[20px]',
      color: 'text-[rgba(0,0,0,0.8)]',
      className: 'font-[\'Inter:Bold\',_sans-serif] font-bold leading-[20px] text-[18px] text-[rgba(0,0,0,0.8)]'
    },
    'xsm': {
      fontFamily: FONT_FAMILIES.inter.bold,
      fontSize: 'text-[16px]',
      fontWeight: 'font-bold',
      lineHeight: 'leading-[20px]',
      color: 'text-[rgba(0,0,0,0.8)]',
      className: 'font-[\'Inter:Bold\',_sans-serif] font-bold leading-[20px] text-[16px] text-[rgba(0,0,0,0.8)]'
    }
  },

  // Body Text Styles
  body: {
    lg: {
      default: {
        fontFamily: FONT_FAMILIES.inter.regular,
        fontSize: 'text-[16px]',
        fontWeight: 'font-normal',
        lineHeight: 'leading-[24px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Regular\',_sans-serif] font-normal leading-[24px] text-[16px] text-[rgba(0,0,0,0.8)]'
      },
      underline: {
        fontFamily: FONT_FAMILIES.inter.regular,
        fontSize: 'text-[16px]',
        fontWeight: 'font-normal',
        lineHeight: 'leading-[24px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        textDecoration: 'underline',
        className: 'font-[\'Inter:Regular\',_sans-serif] font-normal leading-[24px] text-[16px] text-[rgba(0,0,0,0.8)] underline'
      },
      medium: {
        fontFamily: FONT_FAMILIES.inter.medium,
        fontSize: 'text-[16px]',
        fontWeight: 'font-medium',
        lineHeight: 'leading-[24px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Medium\',_sans-serif] font-medium leading-[24px] text-[16px] text-[rgba(0,0,0,0.8)]'
      },
      semibold: {
        fontFamily: FONT_FAMILIES.inter.semibold,
        fontSize: 'text-[16px]',
        fontWeight: 'font-semibold',
        lineHeight: 'leading-[24px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Semibold\',_sans-serif] font-semibold leading-[24px] text-[16px] text-[rgba(0,0,0,0.8)]'
      }
    },
    md: {
      default: {
        fontFamily: FONT_FAMILIES.inter.regular,
        fontSize: 'text-[14px]',
        fontWeight: 'font-normal',
        lineHeight: 'leading-[20px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Regular\',_sans-serif] font-normal leading-[20px] text-[14px] text-[rgba(0,0,0,0.8)]'
      },
      underline: {
        fontFamily: FONT_FAMILIES.inter.regular,
        fontSize: 'text-[14px]',
        fontWeight: 'font-normal',
        lineHeight: 'leading-[20px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        textDecoration: 'underline',
        className: 'font-[\'Inter:Regular\',_sans-serif] font-normal leading-[20px] text-[14px] text-[rgba(0,0,0,0.8)] underline'
      },
      medium: {
        fontFamily: FONT_FAMILIES.inter.medium,
        fontSize: 'text-[14px]',
        fontWeight: 'font-medium',
        lineHeight: 'leading-[20px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Medium\',_sans-serif] font-medium leading-[20px] text-[14px] text-[rgba(0,0,0,0.8)]'
      },
      'medium-underline': {
        fontFamily: FONT_FAMILIES.inter.medium,
        fontSize: 'text-[14px]',
        fontWeight: 'font-medium',
        lineHeight: 'leading-[20px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        textDecoration: 'underline',
        className: 'font-[\'Inter:Medium\',_sans-serif] font-medium leading-[20px] text-[14px] text-[rgba(0,0,0,0.8)] underline'
      },
      semibold: {
        fontFamily: FONT_FAMILIES.inter.semibold,
        fontSize: 'text-[14px]',
        fontWeight: 'font-semibold',
        lineHeight: 'leading-[20px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Semibold\',_sans-serif] font-semibold leading-[20px] text-[14px] text-[rgba(0,0,0,0.8)]'
      },
      bold: {
        fontFamily: FONT_FAMILIES.inter.bold,
        fontSize: 'text-[14px]',
        fontWeight: 'font-bold',
        lineHeight: 'leading-[20px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Bold\',_sans-serif] font-bold leading-[20px] text-[14px] text-[rgba(0,0,0,0.8)]'
      },
      numeric: {
        fontFamily: FONT_FAMILIES.inter.regular,
        fontSize: 'text-[14px]',
        fontWeight: 'font-normal',
        lineHeight: 'leading-[20px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Regular\',_sans-serif] font-normal leading-[20px] text-[14px] text-[rgba(0,0,0,0.8)]'
      },
      'numeric-medium': {
        fontFamily: FONT_FAMILIES.inter.medium,
        fontSize: 'text-[14px]',
        fontWeight: 'font-medium',
        lineHeight: 'leading-[20px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Medium\',_sans-serif] font-medium leading-[20px] text-[14px] text-[rgba(0,0,0,0.8)]'
      },
      'numeric-semibold': {
        fontFamily: FONT_FAMILIES.inter.semibold,
        fontSize: 'text-[14px]',
        fontWeight: 'font-semibold',
        lineHeight: 'leading-[20px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Semibold\',_sans-serif] font-semibold leading-[20px] text-[14px] text-[rgba(0,0,0,0.8)]'
      },
      'default-underline': {
        fontFamily: FONT_FAMILIES.inter.regular,
        fontSize: 'text-[14px]',
        fontWeight: 'font-normal',
        lineHeight: 'leading-[20px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        textDecoration: 'underline',
        className: 'font-[\'Inter:Regular\',_sans-serif] font-normal leading-[20px] text-[14px] text-[rgba(0,0,0,0.8)] underline'
      },
      mono: {
        fontFamily: 'font-mono',
        fontSize: 'text-[14px]',
        fontWeight: 'font-normal',
        lineHeight: 'leading-[20px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-mono font-normal leading-[20px] text-[14px] text-[rgba(0,0,0,0.8)]'
      }
    },
    sm: {
      default: {
        fontFamily: FONT_FAMILIES.inter.regular,
        fontSize: 'text-[12px]',
        fontWeight: 'font-normal',
        lineHeight: 'leading-[16px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Regular\',_sans-serif] font-normal leading-[16px] text-[12px] text-[rgba(0,0,0,0.8)]'
      },
      'default-underline': {
        fontFamily: FONT_FAMILIES.inter.regular,
        fontSize: 'text-[12px]',
        fontWeight: 'font-normal',
        lineHeight: 'leading-[16px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        textDecoration: 'underline',
        className: 'font-[\'Inter:Regular\',_sans-serif] font-normal leading-[16px] text-[12px] text-[rgba(0,0,0,0.8)] underline'
      },
      medium: {
        fontFamily: FONT_FAMILIES.inter.medium,
        fontSize: 'text-[12px]',
        fontWeight: 'font-medium',
        lineHeight: 'leading-[16px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Medium\',_sans-serif] font-medium leading-[16px] text-[12px] text-[rgba(0,0,0,0.8)]'
      },
      'medium-underline': {
        fontFamily: FONT_FAMILIES.inter.medium,
        fontSize: 'text-[12px]',
        fontWeight: 'font-medium',
        lineHeight: 'leading-[16px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        textDecoration: 'underline',
        className: 'font-[\'Inter:Medium\',_sans-serif] font-medium leading-[16px] text-[12px] text-[rgba(0,0,0,0.8)] underline'
      },
      semibold: {
        fontFamily: FONT_FAMILIES.inter.semibold,
        fontSize: 'text-[12px]',
        fontWeight: 'font-semibold',
        lineHeight: 'leading-[16px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Semibold\',_sans-serif] font-semibold leading-[16px] text-[12px] text-[rgba(0,0,0,0.8)]'
      },
      numeric: {
        fontFamily: FONT_FAMILIES.inter.regular,
        fontSize: 'text-[12px]',
        fontWeight: 'font-normal',
        lineHeight: 'leading-[16px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Regular\',_sans-serif] font-normal leading-[16px] text-[12px] text-[rgba(0,0,0,0.8)]'
      }
    },
    xs: {
      default: {
        fontFamily: FONT_FAMILIES.inter.regular,
        fontSize: 'text-[11px]',
        fontWeight: 'font-normal',
        lineHeight: 'leading-[14px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Regular\',_sans-serif] font-normal leading-[14px] text-[11px] text-[rgba(0,0,0,0.8)]'
      },
      medium: {
        fontFamily: FONT_FAMILIES.inter.medium,
        fontSize: 'text-[11px]',
        fontWeight: 'font-medium',
        lineHeight: 'leading-[14px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Medium\',_sans-serif] font-medium leading-[14px] text-[11px] text-[rgba(0,0,0,0.8)]'
      },
      semibold: {
        fontFamily: FONT_FAMILIES.inter.semibold,
        fontSize: 'text-[11px]',
        fontWeight: 'font-semibold',
        lineHeight: 'leading-[14px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Semibold\',_sans-serif] font-semibold leading-[14px] text-[11px] text-[rgba(0,0,0,0.8)]'
      }
    },
    xxs: {
      default: {
        fontFamily: FONT_FAMILIES.inter.regular,
        fontSize: 'text-[10px]',
        fontWeight: 'font-normal',
        lineHeight: 'leading-[12px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Regular\',_sans-serif] font-normal leading-[12px] text-[10px] text-[rgba(0,0,0,0.8)]'
      },
      medium: {
        fontFamily: FONT_FAMILIES.inter.medium,
        fontSize: 'text-[10px]',
        fontWeight: 'font-medium',
        lineHeight: 'leading-[12px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Medium\',_sans-serif] font-medium leading-[12px] text-[10px] text-[rgba(0,0,0,0.8)]'
      },
      semibold: {
        fontFamily: FONT_FAMILIES.inter.semibold,
        fontSize: 'text-[10px]',
        fontWeight: 'font-semibold',
        lineHeight: 'leading-[12px]',
        color: 'text-[rgba(0,0,0,0.8)]',
        className: 'font-[\'Inter:Semibold\',_sans-serif] font-semibold leading-[12px] text-[10px] text-[rgba(0,0,0,0.8)]'
      }
    }
  },

  // Button Text Styles
  button: {
    default: {
      fontFamily: FONT_FAMILIES.inter.medium,
      fontSize: 'text-[14px]',
      fontWeight: 'font-medium',
      lineHeight: 'leading-[16px]',
      color: 'text-[rgba(0,0,0,0.8)]',
      className: 'font-[\'Inter:Medium\',_sans-serif] font-medium leading-[16px] text-[14px] text-[rgba(0,0,0,0.8)]'
    },
    md: {
      fontFamily: FONT_FAMILIES.inter.medium,
      fontSize: 'text-[12px]',
      fontWeight: 'font-medium',
      lineHeight: 'leading-[14px]',
      color: 'text-[rgba(0,0,0,0.8)]',
      className: 'font-[\'Inter:Medium\',_sans-serif] font-medium leading-[14px] text-[12px] text-[rgba(0,0,0,0.8)]'
    },
    sm: {
      fontFamily: FONT_FAMILIES.inter.medium,
      fontSize: 'text-[11px]',
      fontWeight: 'font-medium',
      lineHeight: 'leading-[13px]',
      color: 'text-[rgba(0,0,0,0.8)]',
      className: 'font-[\'Inter:Medium\',_sans-serif] font-medium leading-[13px] text-[11px] text-[rgba(0,0,0,0.8)]'
    },
    xs: {
      fontFamily: FONT_FAMILIES.inter.medium,
      fontSize: 'text-[10px]',
      fontWeight: 'font-medium',
      lineHeight: 'leading-[12px]',
      color: 'text-[rgba(0,0,0,0.8)]',
      className: 'font-[\'Inter:Medium\',_sans-serif] font-medium leading-[12px] text-[10px] text-[rgba(0,0,0,0.8)]'
    }
  }
}

// Effect Styles Configuration
export const EFFECT_STYLES = {
  shadow: {
    '50': {
      name: 'shadow-50',
      description: 'Light shadow for subtle elevation',
      className: 'shadow-sm'
    },
    '100': {
      name: 'shadow-100', 
      description: 'Medium light shadow',
      className: 'shadow-md'
    },
    '200': {
      name: 'shadow-200',
      description: 'Medium shadow',
      className: 'shadow-lg'
    },
    '300': {
      name: 'shadow-300',
      description: 'Medium strong shadow',
      className: 'shadow-xl'
    },
    '400': {
      name: 'shadow-400',
      description: 'Strong shadow',
      className: 'shadow-2xl'
    },
    '500': {
      name: 'shadow-500',
      description: 'Very strong shadow',
      className: 'shadow-2xl'
    },
    '500-1': {
      name: 'shadow-500-1',
      description: 'Alternative strong shadow variant',
      className: 'shadow-2xl'
    },
    '600': {
      name: 'shadow-600',
      description: 'Maximum shadow',
      className: 'shadow-2xl'
    },
    '0': {
      name: 'shadow-0',
      description: 'No shadow',
      className: 'shadow-none'
    }
  },
  border: {
    focus: {
      name: 'border-focus',
      description: 'Focus state border',
      className: 'border-2 border-blue-500'
    }
  }
}

// Color Configuration - Comprehensive color system from Figma
export const COLORS = {
  // Primitive Colors
  primitives: {
    blue: {
      900: '#11294d', 800: '#103a75', 700: '#0d4ea6', 600: '#186ade', 500: '#3d8df5',
      400: '#75b1ff', 300: '#adccf7', 200: '#d4e4fa', 100: '#f0f4fa', 990: '#0d1826'
    },
    cloudyGray: {
      999: '#090f14', 990: '#0e171f', 900: '#243037', 800: '#3a464c', 700: '#505d62',
      600: '#697579', 500: '#828e91', 400: '#9ca8aa', 300: '#b7c2c4', 200: '#d3ddde',
      100: '#e2eaea', 50: '#f2f7f7'
    },
    cyan: {
      900: '#102d33', 800: '#0c424d', 700: '#09596b', 600: '#067a91', 500: '#159ab2',
      400: '#45bcd1', 300: '#81d8e5', 200: '#c7e8ed', 100: '#ebf5f4', 50: '#f6fffe', 990: '#0f181a'
    },
    gray: {
      900: '#1c2b36', 800: '#2a3f4d', 700: '#3e5463', 600: '#5b7282', 500: '#7a909e',
      400: '#9fb1bd', 300: '#c1ccd6', 200: '#dce3e8', 100: '#e7ecef', 50: '#f2f5f7',
      10: '#fafafa', 990: '#0e171f', 999: '#090f14'
    },
    green: {
      900: '#092e25', 800: '#094536', 700: '#075e45', 600: '#077d55', 500: '#16a163',
      400: '#43c478', 300: '#88dba8', 200: '#c7ebd1', 100: '#ebf7ed', 990: '#081a15'
    },
    lime: {
      900: '#1c2e10', 800: '#254211', 700: '#2e5c0e', 600: '#3c7d0e', 500: '#52a31d',
      400: '#78bf39', 300: '#aad971', 200: '#d5f0b1', 100: '#ebf7da', 50: '#f6fdec', 990: '#121a0d'
    },
    orange: {
      500: '#ff761f', 50: '#ffdeca', 900: '#953900', 800: '#b04300', 700: '#eb5100',
      600: '#ff5b05', 400: '#ff9757', 300: '#ffb181', 200: '#ffc5a1', 100: '#ffd3b8',
      10: '#fff7f3', 990: '#722c00', 25: '#ffece0'
    },
    pink: {
      100: '#fcf0f8', 200: '#f7daed', 300: '#f7b7e2', 400: '#fa87d4', 500: '#ed4cb7',
      600: '#cc1d92', 700: '#961574', 800: '#6b155a', 900: '#47153f', 990: '#241020'
    },
    purple: {
      900: '#331f4d', 800: '#4c277d', 700: '#6b30ab', 600: '#8f49de', 500: '#ac71f0',
      400: '#c89afc', 300: '#dabefa', 200: '#eadcfc', 100: '#f7f2fc', 990: '#1c1229'
    },
    red: {
      900: '#4f150f', 800: '#75160c', 700: '#a1160a', 600: '#d91f11', 500: '#fa5343',
      400: '#fc9086', 300: '#fabbb4', 200: '#fadcd9', 100: '#fcf3f2', 990: '#24120c'
    },
    teal: {
      100: '#ebf5f4', 200: '#beebe7', 300: '#86d9d4', 400: '#4ebfb9', 500: '#279c9c',
      600: '#167b7d', 700: '#155c5e', 800: '#124241', 900: '#102e2d', 990: '#0c1a19'
    },
    yellow: {
      900: '#38251b', 800: '#54341f', 700: '#70491c', 600: '#946613', 500: '#b3870e',
      400: '#d9a514', 300: '#f5c518', 200: '#f7e379', 100: '#faf6cf', 990: '#1c1613'
    },
    white: '#ffffff',
    black: '#000000'
  },

  // Semantic Color Tokens
  tokens: {
    border: {
      brand: '#ff5b05',
      brandHover: '#eb5100',
      brandActive: '#ff5b05',
      brandDisabled: '#e7ecef',
      secondary: '#c1ccd6',
      secondaryHover: '#7a909e',
      secondaryHighlight: '#ff5b05',
      info: '#067a91',
      success: '#075e45',
      warning: '#ff5b05',
      critical: '#75160c',
      secondaryDisabled: '#dce3e8',
      tonal: '#067a91',
      divider: '#e7ecef',
      tonalButton: '#186ade',
      light: '#e7ecef'
    },
    borderCheckbox: {
      border: '#828e91',
      hover: '#3a464c',
      error: '#75160c'
    },
    borderInput: {
      border: '#c1ccd6',
      borderHover: '#7a909e',
      borderHighlight: '#ff5b05',
      borderError: '#75160c'
    },
    icon: {
      primary: '#2a3f4d',
      primaryDisabled: '#dce3e8',
      primaryHover: '#1c2b36',
      primaryPlaceholder: '#c1ccd6',
      secondary: '#5b7282',
      secondaryHover: '#2a3f4d',
      secondaryActive: '#ff5b05',
      tertiary: '#9fb1bd',
      onDark: '#ffffff',
      info: '#067a91',
      success: '#16a163',
      warning: '#d9a514',
      critical: '#d91f11',
      tonal: '#eb5100',
      tonalButton: '#ffffff'
    },
    iconStatus: {
      gray: '#c1ccd6',
      blue: '#186ade',
      green: '#16a163',
      orange: '#ff5b05',
      red: '#d91f11',
      yellow: '#d9a514',
      cyan: '#45bcd1'
    },
    iconStop: {
      pickup: '#ff5b05',
      delivery: '#159ab2',
      dropTrailer: '#186ade',
      pickupTrailer: '#52a31d',
      workSite: '#946613'
    },
    iconTickets: {
      invoice: '#186ade',
      driverPay: '#6b30ab',
      load: '#52a31d',
      order: '#eb5100',
      trip: '#167b7d'
    },
    table: {
      hover: '#f2f5f7',
      background: '#ebf5f4'
    },
    tag: {
      grayText: '#3e5463', grayBg: '#e7ecef',
      blueText: '#0d4ea6', blueBg: '#d4e4fa',
      redText: '#a1160a', redBg: '#fadcd9',
      greenText: '#075e45', greenBg: '#c7ebd1',
      yellowText: '#3e5463', yellowBg: '#faf6cf',
      limeText: '#2e5c0e', limeBg: '#d5f0b1',
      orangeText: '#b04300', orangeBg: '#ffdeca',
      tealText: '#155c5e', tealBg: '#beebe7',
      purpleText: '#6b30ab', purpleBg: '#eadcfc',
      pinkText: '#961574', pinkBg: '#f7daed',
      cyanText: '#09596b', cyanBg: '#c7e8ed'
    },
    text: {
      primary: '#0e171f',
      secondary: '#3e5463',
      disabled: '#c1ccd6',
      link: '#159ab2',
      linkHover: '#067a91',
      linkActive: '#09596b',
      brand: '#eb5100',
      brandHover: '#ff5b05',
      onDark: '#ffffff',
      success: '#077d55',
      warning: '#b3870e',
      critical: '#a1160a',
      placeholder: '#9fb1bd',
      tonalButton: '#ffffff',
      tertiary: '#7a909e',
      inProgress: '#186ade'
    }
  },

  // Background Colors
  background: {
    bg: '#c1ccd6',
    bgSurface: '#ffffff',
    bgSurfaceDisabled: '#dce3e8',
    bgSurfaceNone: '#3a464c',
    bgSurfaceSuccess: '#3c7d0e',
    bgSurfaceWarning: '#f5c518',
    bgSurfaceCritical: '#d91f11',
    bgSurfaceTransparent: '#5b7282',
    bgFillTertiary: '#ffffff',
    bgFillTertiaryHover: '#9fb1bd',
    bgFillTertiaryActive: '#ffdeca',
    bgFillTertiaryFocus: '#9fb1bd',
    bgFillPrimary: '#ff5b05',
    bgFillPrimaryHover: '#ff9757',
    bgFillPrimaryActive: '#ff5b05',
    bgFillSecondary: '#ffdeca',
    bgFillSecondaryHover: '#ffdeca',
    bgFillSecondaryActive: '#ff5b05',
    bgFillSecondaryDisabled: '#9fb1bd',
    inputBgFillEnabled: '#ffffff',
    inputBgFillDisabled: '#e7ecef',
    bgSurfaceHover: '#e7ecef',
    bgSurfaceInactive: '#f2f5f7',
    checkboxBgFill: '#ffffff',
    checkboxBgFillDisabled: '#e7ecef',
    checkboxBgFillError: '#fabbb4',
    checkboxBgFillChecked: '#2a3f4d',
    bgFill: '#ffffff',
    bgFillDisabled: '#e7ecef',
    bgFillActive: '#2a3f4d',
    bgFillError: '#fabbb4',
    inputBgFillError: '#fcf3f2',
    noticeSurfaceNone: '#3a464c',
    noticeSurfaceSuccess: '#3c7d0e',
    noticeSurfaceCritical: '#d91f11',
    rowHover: '#f2f5f7',
    dropdownSurfaceHover: '#f2f5f7',
    bgFillTonalButton: '#3d8df5'
  },

  // Radius values
  radius: {
    200: '8px',
    300: '10px',
    100: '4px',
    0: '0px'
  },

  // Spacing values
  spacing: {
    0: '0px',
    100: '4px',
    200: '8px',
    300: '12px',
    400: '16px',
    800: '32px',
    1000: '40px',
    1200: '48px',
    600: '24px',
    1600: '64px',
    2000: '80px',
    2400: '96px',
    3200: '160px',
    50: '2px',
    1: '1px',
    150: '6px',
    500: '20px',
    250: '10px'
  },

  // Legacy color support (for backward compatibility)
  text: {
    primary: 'text-[rgba(0,0,0,0.8)]',
    secondary: 'text-[rgba(0,0,0,0.6)]',
    tertiary: 'text-[rgba(0,0,0,0.4)]',
    disabled: 'text-[rgba(0,0,0,0.3)]'
  },
  background: {
    white: 'bg-white',
    gray: {
      50: 'bg-gray-50',
      100: 'bg-gray-100',
      200: 'bg-gray-200'
    }
  },
  border: {
    default: 'border-[#c1ccd6]',
    hover: 'border-[#7a909e]',
    focus: 'border-[#ff5b05]',
    disabled: 'border-[#e7ecef]'
  }
}

// Utility Functions
export const getTextStyle = (category, variant, weight = 'default') => {
  if (category === 'heading') {
    return TEXT_STYLES.heading[variant]?.className || ''
  }
  if (category === 'body') {
    return TEXT_STYLES.body[variant]?.[weight]?.className || ''
  }
  if (category === 'button') {
    return TEXT_STYLES.button[variant]?.className || ''
  }
  return ''
}

export const getEffectStyle = (type, variant) => {
  return EFFECT_STYLES[type]?.[variant]?.className || ''
}

export const getColorStyle = (category, variant) => {
  return COLORS[category]?.[variant] || ''
}

// New utility functions for the comprehensive color system
export const getPrimitiveColor = (color, shade) => {
  return COLORS.primitives[color]?.[shade] || ''
}

export const getTokenColor = (category, variant) => {
  return COLORS.tokens[category]?.[variant] || ''
}

export const getBackgroundColor = (variant) => {
  return COLORS.background[variant] || ''
}

export const getRadiusValue = (size) => {
  return COLORS.radius[size] || ''
}

export const getSpacingValue = (size) => {
  return COLORS.spacing[size] || ''
}

// Export all styles for easy access
export default {
  FONT_FAMILIES,
  TEXT_STYLES,
  EFFECT_STYLES,
  COLORS,
  getTextStyle,
  getEffectStyle,
  getColorStyle,
  getPrimitiveColor,
  getTokenColor,
  getBackgroundColor,
  getRadiusValue,
  getSpacingValue
}
