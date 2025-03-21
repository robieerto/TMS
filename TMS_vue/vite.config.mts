// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE')
  return {
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL),
    },
    plugins: [
      VueRouter({
        dts: 'src/typed-router.d.ts',
      }),
      Layouts(),
      AutoImport({
        imports: [
          'vue',
          'pinia',
          VueRouterAutoImports,
          {
            vuetify: ['useTheme', 'useRtl', 'useLocale', 'useDisplay', 'useLayout'],
          },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/stores'],
        eslintrc: {
          enabled: true,
        },
        vueTemplate: true,
      }),
      Components({
        dts: 'src/components.d.ts',
      }),
      Vue({
        template: { transformAssetUrls },
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
      Vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss',
        },
      }),
      Fonts({
        google: {
          families: [
            {
              name: 'Roboto',
              styles: 'wght@100;300;400;500;700;900',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    server: {
      port: 3000,
    },
  }
})
