import { defineConfig } from 'vite'
import { vitePluginOSSLicenses } from './packages/vite-plugin-oss-licenses/src/vitePluginOssLicenses'

export default defineConfig({
  plugins: [vitePluginOSSLicenses()],
})