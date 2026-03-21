/// <reference types="vitest/config" />
import {defineConfig} from 'vite';

export default defineConfig({
  test: {
    passWithNoTests: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
