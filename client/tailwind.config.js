module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        display: ["Metropolis", "Oswald"],
        mono: ["ui-monospace", "SFMono-Regular"],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
    },
  },
  plugins: [],
};
