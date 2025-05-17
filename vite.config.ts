import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 📌 별칭 등록
    },
  },
  server: {
    host: true, // 또는 '0.0.0.0'
    allowedHosts: [
      "macproui-macbookpro.tail202951.ts.net", // 너 Tailscale 주소 그대로 넣기
    ],
  },
});
