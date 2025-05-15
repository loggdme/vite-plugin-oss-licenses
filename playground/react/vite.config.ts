import { resolve } from 'path';

import { vitePluginOSSLicenses } from '@loggd/vite-plugin-oss-licenses';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // @ts-expect-error Currently there is an bun linking issue with vite plugins
  plugins: [react(), tailwindcss(), vitePluginOSSLicenses()],
  resolve: { alias: { $: resolve(__dirname, './src') } },
});
