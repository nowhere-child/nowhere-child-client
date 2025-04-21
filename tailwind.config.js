module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".safe-top": { paddingTop: "env(safe-area-inset-top)" },
        ".safe-bottom": { paddingBottom: "env(safe-area-inset-bottom)" },
      });
    },
  ],
};
