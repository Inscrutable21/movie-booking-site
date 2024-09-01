module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      perspective: {
        '1000': '1000px',
      },
      rotate: {
        '10': '10deg',
      },
      fontFamily: {
        sans: ['Rubik Bubbles'],
      },
    },
    
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
