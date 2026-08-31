import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["greenfield-academy.onrender.com", "greenfieldttb.com"],
    host: '0.0.0.0',
    port: process.env.PORT || 4000,
  },
});
