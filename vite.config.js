import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    federation({
      name: 'repro',
      remotes: {},
      shared: [],
    }),
  ],
})
