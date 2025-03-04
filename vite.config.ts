import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import raw from 'vite-raw-plugin'

import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
  return {
    base: process.env.VITE_ROUTER_MODE === 'hash'
      ? ''
      : '/',
    server: {
      port: 2048,
      proxy: {
        '/spark': {
          target: 'https://spark-api-open.xf-yun.com',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/spark/, '')
        },
        '/siliconflow': {
          target: 'https://api.siliconflow.cn',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/siliconflow/, '')
        },
        '/moonshot': {
          target: 'https://api.moonshot.cn',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/moonshot/, '')
        },
        '/deepseek': {
          target: 'https://api.deepseek.com',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/deepseek/, '')
        }
      }
    },
    plugins: [
      UnoCSS(),
      vue(),
      raw({
        fileRegex: /\.md$/
      }),
      vueJsx(),
      AutoImport({
        include: [
          /\.[tj]sx?$/,
          /\.vue\??/
        ],
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          {
            'vue': [
              'createVNode',
              'render'
            ],
            'vue-router': [
              'createRouter',
              'createWebHistory',
              'useRouter',
              'useRoute'
            ],
            'uuid': [['v4', 'uuidv4']],
            'lodash-es': [
              ['*', '_']
            ],
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          },
          {
            from: 'vue',
            imports: [
              'App',
              'VNode',
              'ComponentInternalInstance',
              'GlobalComponents',
              'SetupContext',
              'PropType'
            ],
            type: true
          },
          {
            from: 'vue-router',
            imports: [
              'RouteRecordRaw',
              'RouteLocationRaw'
            ],
            type: true
          }
        ],
        resolvers:
          mode === 'development'
            ? []
            : [NaiveUiResolver()],
        dirs: [
          './src/hooks',
          './src/store/business',
          './src/store/transform'
        ],
        dts: './auto-imports.d.ts',
        eslintrc: {
          enabled: true
        },
        vueTemplate: true
      }),
      Components({
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        resolvers: [
          IconsResolver({
            prefix: 'auto-icon'
          }),
          NaiveUiResolver()
        ]
      }),
      // Auto use Iconify icon
      Icons({
        autoInstall: true,
        compiler: 'vue3',
        scale: 1.2,
        defaultStyle: '',
        defaultClass: 'unplugin-icon',
        jsx: 'react'
      })
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    },
    define: {
      'process.env': process.env
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use '@/styles/naive-variables.scss' as *;`
        }
      }
    }
  }
})
