import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Handle Node.js specific imports using our shims
      '#alloc': resolve(__dirname, 'shims/uint8arrays-shim.js'),
      '#util/as-uint8array': resolve(__dirname, 'shims/uint8arrays-shim.js'),
      '#bytes/concat': resolve(__dirname, 'shims/uint8arrays-shim.js'),
      '#bytes/equals': resolve(__dirname, 'shims/uint8arrays-shim.js'),
      '#bytes/to-string': resolve(__dirname, 'shims/uint8arrays-shim.js'),
      '#bytes/from-string': resolve(__dirname, 'shims/uint8arrays-shim.js'),
      '#util': resolve(__dirname, 'shims/uint8arrays-shim.js'),
      // Add other Node.js built-ins if needed
      stream: 'stream-browserify',
      buffer: 'buffer',
      util: 'util',
      process: 'process/browser',
      path: 'path-browserify',
      crypto: 'crypto-browserify',
      os: 'os-browserify/browser',
      fs: false,
    }
  },
  
  //I made my configurations of the unit here
  optimizeDeps: { // 👈 optimizedeps
    esbuildOptions: {
      target: "esnext", 
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      supported: { 
        bigint: true 
      },
    },
    include: [
      'buffer', 
      'process/browser',
      'util'
    ]
  }, 
  
  build: {
    target: ["esnext"], // 👈 build.target
    rollupOptions: {
      external: [],
      // Polyfill Node.js built-ins
      plugins: []
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  define: {
    'process.env': {}
  }
})
