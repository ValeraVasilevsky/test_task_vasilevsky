import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
  server: {
    port: 8080,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@assets/styles/font.scss";
          @import "@assets/styles/colors.scss";
          @import "@assets/styles/variables.scss";
        `,
      },
    },
  },
});
