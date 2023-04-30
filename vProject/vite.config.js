import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import Components from 'unplugin-vue-components/vite'
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Components({
    //   resolvers: [AntDesignVueResolver({ importStyle: "less" })],
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../vProject/src'),
    }
  },
  css: {
    devSourcemap:true,
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // customize ant-design-vue theme
        modifyVars: {
          "text-color": "#666",
          "primary-color": "#4cc764",
        },
      },
      scss: {
        // global variables for scss
        additionalData: `@import "@/assets/scss/var.scss";`
      },
    },
  },
})
