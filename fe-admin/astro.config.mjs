// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  server: {
      host: true,
      allowedHosts: ['fe-admin'],
      // hmr: {
      // 	host: "localhost",
      // 	protocol: "ws",
      // },
	},

  vite: {
      plugins: [tailwindcss()]
	},

  integrations: [react()]
});