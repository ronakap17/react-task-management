import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import checker from 'vite-plugin-checker'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      '~Style': path.resolve(__dirname, "src/scss/"),
      "~": path.resolve(__dirname, "src/"),
    },
  },
});
