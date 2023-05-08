import { defineConfig } from 'vite';
import { fileURLToPath, URL } from "node:url";
import path from "path";
import vue from '@vitejs/plugin-vue';
import analyze from "rollup-plugin-analyzer";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
      eslintrc: {
        enabled: true
      },
      dts: path.resolve(__dirname, "./src/declarations/auto-imports.d.ts"),
    }),
    Components({
      dirs: ["src/components", "src/pages"],
      dts: path.resolve(__dirname, "./src/declarations/components.d.ts"),
    }),
  ],
  root: path.resolve(__dirname, "."),
  resolve: {
    extensions: [".ts", ".vue", ".scss"],
    alias: {
      '@': path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      plugins: [analyze()]
    }
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`
      }
    }
  },
})
