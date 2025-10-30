import { defineConfig } from '@rsbuild/core'
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginVue } from '@rsbuild/plugin-vue'
import AutoImport from 'unplugin-auto-import/rspack'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/rspack'

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
    pluginLess(),
  ],
  tools: {
    rspack: {
      plugins: [
        AutoImport({
          imports: [
            'vue',
            {
              'naive-ui': [
                'useDialog',
                'useMessage',
                'useNotification',
                'useLoadingBar',
              ],
            },
          ],
        }),
        Components({
          resolvers: [NaiveUiResolver()],
        }),
      ],
    },
  },
})
