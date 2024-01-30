import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    name: 'Roulette',
    environment: 'jsdom',
    coverage: {
      include: ['src/index.ts', 'src/builders'],
    },
  },
})
