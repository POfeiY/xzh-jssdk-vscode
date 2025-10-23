import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetTypography from '@unocss/preset-typography'
import presetWind3 from '@unocss/preset-wind3'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      mode: 'vue-scoped',
      shortcuts: [
        { logo: 'i-logos-webcomponents w-6em h-6em transform transition-800 hover:rotate-180' },
      ],
      presets: [
        presetWind3(),
        presetAttributify(),
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          },
        }),
        presetTypography(),
      ],
      inspector: false,
    }),
  ],
})
