import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
/*
export default defineConfig({
  plugins: [vue()]
})
*/
const { resolve } = require('path')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        aboutUs: resolve(__dirname, './nested/aboutUs.html'),
        register: resolve(__dirname, './nested/register.html'),
        getappointments: resolve(__dirname, './nested/getAppointments.html'),
        publicsearch: resolve(__dirname, './nested/publicSearch.html')
        

      }
    }
  },
  plugins: [vue()]
})
