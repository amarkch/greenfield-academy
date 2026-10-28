import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["greenfield-academy.onrender.com", "greenfieldttb.com", "www.greenfieldttb.com"],
    host: '0.0.0.0',
    port: process.env.PORT || 4000,
    headers: {
      // Note: Vite will apply this to all assets served by the dev server.
      // Be careful, as setting 'immutable' in development can sometimes 
      // prevent you from seeing your live image edits without a hard refresh.
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
    },
  },
});
