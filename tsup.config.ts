import { defineConfig } from 'tsup'

export default defineConfig([
  // Standard builds for npm package
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: [
      'react', 
      'react-dom',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dropdown-menu', 
      '@radix-ui/react-label',
      '@radix-ui/react-popover',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-slot'
    ],
    minify: false,
    target: 'es2020',
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      }
    }
  },
  // IIFE build for HTML demos
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    globalName: 'EnhancedDataTableLibrary',
    outDir: 'demo/dist',
    external: ['react', 'react-dom'],
    minify: false,
    target: 'es2020',
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      }
      // Map externals to global variables
      options.globalName = 'EnhancedDataTableLibrary'
      options.footer = {
        js: `
// Make components available globally for easy access in demos
if (typeof window !== 'undefined') {
  window.EnhancedDataTableLibrary = EnhancedDataTableLibrary;
}
        `.trim()
      }
    }
  }
])
