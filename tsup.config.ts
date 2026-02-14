import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/lib/index.ts', 'src/lib/fonts.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  injectStyle: false,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
    // Handle font files as data URLs or copy them
    options.loader = {
      '.woff2': 'dataurl',
      '.woff': 'dataurl',
      '.ttf': 'dataurl',
    }
  },
})
