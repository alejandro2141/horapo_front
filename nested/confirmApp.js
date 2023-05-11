import { createApp } from 'vue'
import App from './confirmApp.vue'
import { BKND_CONFIG } from '../config123.js'

const app = createApp(App)
app.mount('#app')
//app.config.globalProperties.BKND_CONFIG = BKND_CONFIG

//console.log("confirmApp app config "+JSON.stringify(app.config))
//console.log("confirmApp app BKND_CONFIG "+JSON.stringify(BKND_CONFIG))
