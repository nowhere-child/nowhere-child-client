/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      /* 📌 ③ 라이트/다크 공통 색 변수 예시 */
      colors: {
        primary: { DEFAULT: "#2563eb" },
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
