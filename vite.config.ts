import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import cssnano from "cssnano";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: "/",
    plugins: [
      preact({
        prerender: {
          enabled: true,
          renderTarget: "#root",
        },
      }),
      tailwindcss(),
      visualizer({
        template: "treemap",
        open: true, // Automatically open the report in your browser after build
        filename: "stats.html", // Output file name
        gzipSize: true, // Show gzip size
        brotliSize: true, // Show brotli size
      }),
    ],
  });
};
