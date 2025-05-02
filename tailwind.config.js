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
      spacing: {
        // --vh 변수 그대로 쓰기
        "screen-vh": "calc(var(--vh))",
      },
      height: {
        // --vh 변수 그대로 height로 쓰기
        "screen-vh": "calc(var(--vh))",
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
  borderColor: {
    DEFAULT: "#313131",
    focus: "#E1E1E1",
  },
};
