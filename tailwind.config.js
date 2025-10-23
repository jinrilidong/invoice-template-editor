/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 扩展颜色系统 - 基于设计系统
      colors: {
        // 品牌颜色
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
        // 云灰色系统
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
        // 语义化颜色
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
        // 边框颜色
        border: {
          default: '#c1ccd6',
          hover: '#7a909e',
          focus: '#ff5b05',
          disabled: '#e7ecef',
          brand: '#ff5b05',
          secondary: '#c1ccd6',
        },
        // 背景颜色
        surface: {
          primary: '#ffffff',
          secondary: '#f8f9fa',
          tertiary: '#f2f5f7',
          hover: '#e7ecef',
          disabled: '#dce3e8',
          brand: '#ff761f',
          brandHover: '#ff5b05',
        }
      },
      
      // 扩展间距系统 - 基于设计系统的8px网格
      spacing: {
        '0.5': '2px',   // 0.125rem
        '1': '4px',     // 0.25rem
        '1.5': '6px',   // 0.375rem
        '2': '8px',     // 0.5rem
        '2.5': '10px',  // 0.625rem
        '3': '12px',    // 0.75rem
        '3.5': '14px',  // 0.875rem
        '4': '16px',    // 1rem
        '5': '20px',    // 1.25rem
        '6': '24px',    // 1.5rem
        '7': '28px',    // 1.75rem
        '8': '32px',    // 2rem
        '9': '36px',    // 2.25rem
        '10': '40px',   // 2.5rem
        '11': '44px',   // 2.75rem
        '12': '48px',   // 3rem
        '14': '56px',   // 3.5rem
        '16': '64px',   // 4rem
        '18': '72px',   // 4.5rem
        '20': '80px',   // 5rem
        '24': '96px',   // 6rem
        '28': '112px',  // 7rem
        '32': '128px',  // 8rem
        '36': '144px',  // 9rem
        '40': '160px',  // 10rem
        '44': '176px',  // 11rem
        '48': '192px',  // 12rem
        '52': '208px',  // 13rem
        '56': '224px',  // 14rem
        '60': '240px',  // 15rem
        '64': '256px',  // 16rem
        '72': '288px',  // 18rem
        '80': '320px',  // 20rem
        '96': '384px',  // 24rem
      },
      
      // 扩展字体系统
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // 扩展字体大小
      fontSize: {
        'xs': ['14px', '16px'],
        'sm': ['14px', '16px'],
        'base': ['14px', '16px'],
        'md': ['14px', '20px'],
        'lg': ['16px', '24px'],
        'xl': ['18px', '20px'],
        '2xl': ['20px', '24px'],
        '3xl': ['24px', '32px'],
        '4xl': ['28px', '32px'],
        '5xl': ['32px', '36px'],
        '6xl': ['40px', '44px'],
        '7xl': ['48px', '52px'],
      },
      
      // 扩展圆角
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '10px',
        '2xl': '12px',
        '3xl': '16px',
        'full': '9999px',
      },
      
      // 扩展阴影
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },
      
      // 扩展动画
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'scale-in': 'scaleIn 0.2s ease-out',
        'scale-out': 'scaleOut 0.2s ease-in',
      },
      
      // 扩展关键帧
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10px)', opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
      
      // 扩展过渡
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      
      // 扩展z-index
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'auto': 'auto',
      },
    },
  },
  plugins: [
    // 添加自定义插件
    function({ addUtilities, addComponents, theme }) {
      // 添加间距工具类
      addUtilities({
        '.spacing-xs': {
          padding: theme('spacing.1'),
          margin: theme('spacing.1'),
        },
        '.spacing-sm': {
          padding: theme('spacing.2'),
          margin: theme('spacing.2'),
        },
        '.spacing-md': {
          padding: theme('spacing.4'),
          margin: theme('spacing.4'),
        },
        '.spacing-lg': {
          padding: theme('spacing.6'),
          margin: theme('spacing.6'),
        },
        '.spacing-xl': {
          padding: theme('spacing.8'),
          margin: theme('spacing.8'),
        },
        '.spacing-2xl': {
          padding: theme('spacing.12'),
          margin: theme('spacing.12'),
        },
      })
      
      // 添加组件样式
      addComponents({
        '.btn-base': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme('borderRadius.lg'), // 8px - 基于 Figma 设计
          fontWeight: theme('fontWeight.semibold'), // 600 - 基于 Figma 设计
          transition: 'all 0.2s ease-in-out',
          cursor: 'pointer',
          border: '1px solid',
          fontFamily: theme('fontFamily.inter'),
          lineHeight: '1',
          gap: '2px',
          '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${theme('colors.border.focus')}`,
          },
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },
        '.input-base': {
          width: '100%',
          padding: `${theme('spacing.2')} ${theme('spacing.3')}`,
          border: `1px solid ${theme('colors.border.default')}`,
          borderRadius: theme('borderRadius.DEFAULT'),
          fontSize: theme('fontSize.base[0]'),
          lineHeight: theme('fontSize.base[1]'),
          transition: 'all 0.2s ease-in-out',
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.border.focus'),
            boxShadow: `0 0 0 1px ${theme('colors.border.focus')}`,
          },
          '&:disabled': {
            backgroundColor: theme('colors.surface.disabled'),
            cursor: 'not-allowed',
          },
        },
        '.card-base': {
          backgroundColor: theme('colors.surface.primary'),
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.sm'),
          border: `1px solid ${theme('colors.border.default')}`,
        },
      })
    }
  ],
}