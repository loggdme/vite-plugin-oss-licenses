import { vitePluginOSSLicenses } from "@loggd/vite-plugin-oss-licenses";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), vitePluginOSSLicenses(), viteTsConfigPaths({ projects: ["./tsconfig.json"] })],
});
