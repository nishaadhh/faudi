/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "cursive", "sans-serif"],
        sub: ["var(--font-sub)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
        serif: ["var(--font-serif)", "serif"],
      },
      colors: {
        brand: {
          black: "#0F0F12",
          dark: "#16161A",
          cream: "#FAF7EE",
          offwhite: "#F5F2EB",
          yellow: "#FFE600",
          orange: "#FF5500",
          pink: "#FF3366",
          lime: "#D4FF00",
        },
        snacks: {
          bg: "#FFF5E9",
          card: "#FFFFFF",
          accent: "#FF4D00",
          amber: "#F79824",
          badge: "#1A1A1A",
        },
        buns: {
          bg: "#F9F5EC",
          card: "#FFFFFF",
          crust: "#653416",
          butter: "#FFF1C5",
          pistachio: "#709775",
        },
        chocolate: {
          bg: "#140D0B",
          card: "#1E1513",
          gold: "#D4AF37",
          caramel: "#E5A93C",
          cream: "#F7EFE2",
        }
      },
      borderRadius: {
        'faudi': '1.75rem',
        'faudi-lg': '2.5rem',
        'faudi-pill': '9999px',
      },
      boxShadow: {
        'bold': '6px 6px 0px 0px rgba(15, 15, 18, 1)',
        'bold-sm': '3px 3px 0px 0px rgba(15, 15, 18, 1)',
        'bold-lg': '10px 10px 0px 0px rgba(15, 15, 18, 1)',
        'bold-hover': '2px 2px 0px 0px rgba(15, 15, 18, 1)',
        'glow-orange': '0px 10px 30px -10px rgba(255, 85, 0, 0.4)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'wobble-subtle': 'wobble 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1.5deg)' },
        },
        wobble: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        }
      }
    },
  },
  plugins: [],
}
