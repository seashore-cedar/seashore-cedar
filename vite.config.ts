import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ isSsrBuild }) => ({
  envPrefix: ["VITE_", "SITE_"],

  plugins: [react()],

  resolve: {
    dedupe: ["react", "react-dom", "react-router-dom"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },

  ssr: {
    noExternal: isSsrBuild ? true : undefined,
  },

  server: {
    host: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT || "5173"),
    strictPort: !!process.env.PORT,
    hmr: { overlay: false },
  },

  preview: {
    host: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT || "5173"),
    strictPort: !!process.env.PORT,
  },

  build: isSsrBuild
    ? {
        outDir: "dist",
        emptyOutDir: false,
        copyPublicDir: false,
        ssr: "src/server/entry.ts",
        rollupOptions: {
          output: {
            format: "es",
            entryFileNames: "server.bundle.mjs",
            chunkFileNames: "bin/[name]-[hash].js",
            banner: "import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);",
          },
        },
      }
    : {
        outDir: "dist/client",
        emptyOutDir: true,
        copyPublicDir: true,
        rollupOptions: {
          output: {
            manualChunks: {
              "react-vendor": ["react", "react-dom"],
              "radix-ui": [
                "@radix-ui/react-accordion",
                "@radix-ui/react-alert-dialog",
                "@radix-ui/react-aspect-ratio",
                "@radix-ui/react-avatar",
                "@radix-ui/react-checkbox",
                "@radix-ui/react-collapsible",
                "@radix-ui/react-context-menu",
                "@radix-ui/react-dialog",
                "@radix-ui/react-dropdown-menu",
                "@radix-ui/react-hover-card",
                "@radix-ui/react-label",
                "@radix-ui/react-menubar",
                "@radix-ui/react-navigation-menu",
                "@radix-ui/react-popover",
                "@radix-ui/react-progress",
                "@radix-ui/react-scroll-area",
                "@radix-ui/react-select",
                "@radix-ui/react-separator",
                "@radix-ui/react-slider",
                "@radix-ui/react-slot",
                "@radix-ui/react-switch",
                "@radix-ui/react-tabs",
                "@radix-ui/react-toast",
                "@radix-ui/react-toggle",
                "@radix-ui/react-toggle-group",
                "@radix-ui/react-tooltip",
              ],
              query: ["@tanstack/react-query"],
            },
          },
        },
      },
}));
