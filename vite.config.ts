import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: [
        "public/android/android-launchericon-48-48.png",
        "public/android/android-launchericon-192-192.png",
        "public/android/android-launchericon-512-512.png",
      ],
      manifest: {
        theme_color: "#2563eb",
        background_color: "#1e293b",
        icons: [
          {
            sizes: "512x512",
            src: "/android/android-launchericon-512-512.png",
            type: "image/png",
          },
          {
            sizes: "192x192",
            src: "/android/android-launchericon-192-192.png",
            type: "image/png",
          },
          {
            sizes: "96x96",
            src: "/android/android-launchericon-96-96.png",
            type: "image/png",
          },
          {
            sizes: "48x48",
            src: "/android/android-launchericon-48-48.png",
            type: "image/png",
          },
        ],
        orientation: "portrait",
        display: "standalone",
        lang: "en-US",
        name: "IISER Bhopal GPT",
        short_name: "IISERB GPT",
        start_url: "/",
        description: "IISER Bhopal's own Virtual Assisstant",
      },
    }),
  ],
});
