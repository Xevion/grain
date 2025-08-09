import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import cssnano from "cssnano";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: "/",
    plugins: [
      react(),
      tsconfigPaths(),
      tailwindcss(),
      cssnano(),

      visualizer({
        template: "treemap",
        open: true, // Automatically open the report in your browser after build
        filename: "stats.html", // Output file name
        gzipSize: true, // Show gzip size
        brotliSize: true, // Show brotli size
      }),
    ],
    build: {
      rollupOptions: {
        treeshake: {
          // Remove unused module exports
          moduleSideEffects: false,
          // Optimize property access
          propertyReadSideEffects: false,
          // Remove unused imports
          tryCatchDeoptimization: false,
        },
      },
    },
  });
};
