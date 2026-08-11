import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "capacitor",
  base: "./",
  build: {
    outDir: "../dist/capacitor",
    emptyOutDir: true,
  },
  plugins: [react(), tsconfigPaths(), tailwindcss()],
});
