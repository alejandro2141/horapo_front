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
       // getappointments: resolve(__dirname, './nested/getAppointments.html'),
        publicsearch: resolve(__dirname, './nested/publicSearch.html'),
        professionalaccess: resolve(__dirname, './nested/professionalAccess.html'),
        publicSearchCalendar: resolve(__dirname, './nested/publicSearchCalendar.html'),
        publicSiteProfessional: resolve(__dirname, './nested/publicSiteProfessional.html'),
        confirmApp: resolve(__dirname, './nested/confirmApp.html'),
        adminMonitoring: resolve(__dirname, './nested/adminMonitoring.html'),

      }
    }
  },
  plugins: [vue()]
})





