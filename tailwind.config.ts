/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      xs: { max: '350px' },
      web: '500px',
    },
    extend: {
      minWidth: {
        280: '280px',
      },
      maxWidth: {
        500: '500px',
      },
      padding: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
        page: '1.25rem',
      },
      margin: {
        page: '1.25rem',
      },
      borderWidth: {
        DEFAULT: '0.5px',
        form: '0.8px',
        1: '1px',
      },
      backgroundImage: {
        'gradient-pattern': 'url("/images/bg.webp")',
        'gradient-pattern-sm': 'url("/images/small-bg.webp")',
      },
      backgroundPosition: {
        'top-right': 'right 0px',
      },
      dropShadow: {
        tab: '0px -5px 20px rgba(219, 219, 219, 0.25)',
      },
      boxShadow: {
        tab: '0px -2px 5px 0px rgba(0, 0, 0, 0.06)',
      },
      colors: {
        black: {
          DEFAULT: '#000',
          50: 'rgb(var(--app-black-50))',
          100: 'rgb(var(--app-black-100))',
          200: 'rgb(var(--app-black-200))',
          300: 'rgb(var(--app-black-300))',
          400: 'rgb(var(--app-black-400))',
          500: 'rgb(var(--app-black-500))',
          600: 'rgb(var(--app-black-600))',
          700: 'rgb(var(--app-black-700))',
          800: 'rgb(var(--app-black-800))',
          900: 'rgb(var(--app-black-900))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: 'rgb(var(--app-primary-50))',
          100: 'rgb(var(--app-primary-100))',
          200: 'rgb(var(--app-primary-200))',
          300: 'rgb(var(--app-primary-300))',
          400: 'rgb(var(--app-primary-400))',
          500: 'rgb(var(--app-primary-500))',
          600: 'rgb(var(--app-primary-600))',
          700: 'rgb(var(--app-primary-700))',
          800: 'rgb(var(--app-primary-800))',
          900: 'rgb(var(--app-primary-900))',
          light: {
            50: 'rgba(var(--app-primary-light-50))',
            100: 'rgba(var(--app-primary-light-100))',
          },
        },
        gray: {
          50: 'rgb(var(--app-gray-50))',
          100: 'rgb(var(--app-gray-100))',
          200: 'rgb(var(--app-gray-200))',
          300: 'rgb(var(--app-gray-300))',
        },
        orange: {
          50: 'rgb(var(--app-orange-50))',
          100: 'rgb(var(--app-orange-100))',
        },
        blue: {
          50: 'rgb(var(--app-blue-50))',
          100: 'rgb(var(--app-blue-100))',
          200: 'rgb(var(--app-blue-200))',
          300: 'rgb(var(--app-blue-300))',
        },
        purple: {
          50: 'rgb(var(--app-purple-50))',
          100: 'rgb(var(--app-purple-100))',
        },
        mint: {
          50: 'rgb(var(--app-mint-50))',
          100: 'rgb(var(--app-mint-100))',
        },
        body: 'rgb(var(--app-web-bg))',
        alert: 'rgba(var(--app-alert))',
        toast: 'rgba(var(--app-toast))',
        tooltip: 'rgba(var(--app-tooltip))',
        border: 'rgb(var(--app-black-100))',
        input: 'rgb(var(--app-black-100))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontSize: {
        0.6: '0.6rem',
        0.7: '0.7rem',
        0.75: '0.75rem',
        0.8: '0.8rem',
        0.85: '0.85rem',
        0.9: '0.9rem',
        0.95: '0.95rem',
        1: '1rem',
        1.1: '1.1rem',
        1.2: '1.2rem',
        1.3: '1.3rem',
        1.5: '1.5rem',
      },
      borderRadius: {
        large: '15px',
        medium: '10px',
        small: '5px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        mount: {
          '0%': { opacity: 0, transform: 'translateY(50%)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        unmount: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        jumpDown: {
          '0%, 100%': { transform: 'translateY(1rem)' },
          '50%': { transform: 'translateY(-1rem)' },
        },
        jumpUp: {
          '0%, 100%': { transform: 'translateY(-1rem)' },
          '50%': { transform: 'translateY(1rem)' },
        },
        loading: {
          '0%': { transform: 'translateX(-10%)' },
          '50%, 100%': { transform: ' translateX(120%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        mount: 'mount 0.2s linear',
        unmount: 'unmount 0.2s ease-in-out',
        wiggle: 'wiggle 1s ease-in-out infinite',
        jumpDown: 'jumpDown 0.7s linear infinite',
        jumpUp: 'jumpUp 0.7s linear infinite',
        loading: 'loading 1.5s infinite linear;',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
