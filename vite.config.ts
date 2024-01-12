// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from 'path'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     host: 'localhost', // 指定服务器主机名
//     port: 8880, // 指定服务器端口
//     hmr: true, // 开启热更新
//     open: true // 在服务器启动时自动在浏览器中打开应用程序
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, './src')
//     }
//   }
// })
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

export default ({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_PROXY } = viteEnv
  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/'
        },
        {
          find: '@',
          replacement: pathResolve('src') + '/'
        }
      ],
      dedupe: ['vue']
    },
    plugins: [vue()],
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    }
  }
}
