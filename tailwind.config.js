// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],

  theme: {
    extend: {
      colors: {
        background: "#0f172a", // 어두운 배경
        foreground: "#f8fafc", // 밝은 텍스트
        primary: "#2563eb", // 예시 색상
      },
    },
  },

  plugins: [
    // 노치 · 홈바 안전 패딩
    ({ addUtilities }) => {
      addUtilities({
        ".safe-top": { paddingTop: "env(safe-area-inset-top)" },
        ".safe-bottom": { paddingBottom: "env(safe-area-inset-bottom)" },
      });
    },
  ],
};
