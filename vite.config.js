import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue2 from '@vitejs/plugin-vue2';
import vueJsx from '@vitejs/plugin-vue2-jsx';
import { resolve } from 'node:path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import compressPlugin from 'vite-plugin-compression';

// compress: 'gzip' | 'brotli' | 'none'
function configCompressPlugin(isBuild, compress) {
  const plugins = [];
  if (!isBuild) return plugins;
  const compressList = compress.split(',');
  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    );
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
    );
  }
  return plugins;
}

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isBuild = mode === 'production';
  const port = loadEnv(mode, process.cwd()).PORT || 9528;
  return defineConfig({
    base: './',
    assetsDir: 'src',
    plugins: [
      vue2(),
      vueJsx(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]',
      }),
      ...configCompressPlugin(isBuild, 'gzip'),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@index': fileURLToPath(new URL('./src/pages/index', import.meta.url)),
        path: 'path-browserify',
      },
    },
    server: {
      https: false,
      port,
      host: '0.0.0.0',
      open: true,
      cors: true,
      proxy: {},
      hmr: { overlay: false },
    },
    build: {
      target: 'es2015',
      sourcemap: false,
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      rollupOptions: {
        input: {
          // 配置所有页面路径，使得所有页面都会被打包
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          chunkFileNames: 'src/js/[name]-[hash].js',
          entryFileNames: 'src/js/[name]-[hash].js',
          assetFileNames: 'src/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            // 静态资源分拆打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isBuild, // 打包时删除log
          drop_debugger: isBuild, // 打包时删除debugger
          pure_funcs: isBuild ? ['console.log'] : [],
        },
        output: {
          comments: isBuild, // 去掉注释
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          modifyVars: {
            hack: `'true; @import (reference) "${resolve('src/style/variables.module.scss')}";`,
          },
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },
  });
};
