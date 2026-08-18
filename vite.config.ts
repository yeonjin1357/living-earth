import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/living-earth/',
  plugins: [react()],
  build: {
    // three.js 코어만으로 500KB를 넘으므로 경고 기준을 현실화
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        advancedChunks: {
          groups: [
            // 그룹이 모듈을 잡으면 의존성까지 재귀 포획하므로, three 코어를 먼저 배정해야 한다
            {
              name: 'three',
              test: /node_modules[\\/]three[\\/]/,
            },
            {
              name: 'three-eco',
              test: /node_modules[\\/](@react-three|postprocessing|maath|detect-gpu|its-fine|zustand|suspend-react)/,
            },
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            },
            {
              name: 'geo',
              test: /node_modules[\\/](world-atlas|topojson-client)[\\/]/,
            },
          ],
        },
      },
    },
  },
})
