import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteEslint from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve } from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import { visualizer } from 'rollup-plugin-visualizer';
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig({
  plugins: [
    vue(),
    viteEslint(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: 'src/components.d.ts',
      dirs: [],
      resolvers: [ElementPlusResolver()]
    }),
    vueJsx(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve('./src/assets/icons/')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    viteMockServe({
      mockPath: 'mock',
      supportTs: true,
      localEnabled: true
    }),
    visualizer({ open: true })
  ],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/style/variables.scss" as *;'
      }
    }
  }
});
