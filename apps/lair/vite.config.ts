import tailwindcss from '@tailwindcss/vite';
import {devtools} from '@tanstack/devtools-vite';
import {tanstackStart} from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config = defineConfig({
  plugins: [
    devtools(),
    tsconfigPaths({projects: ['./tsconfig.app.json']}),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: '../../dist/apps/lair',
    emptyOutDir: true,
  },
});

export default config;
