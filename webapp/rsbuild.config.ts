import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'

export default defineConfig({
  html: {
    template: './index.html',
  },
  source: {
    entry: {
      index: './src/main.ts',
    },
  },
  output: {
    dataUriLimit: {
      svg: 4 * 1024,
    },
  },
  plugins: [
    pluginVue(),
  ],
})
