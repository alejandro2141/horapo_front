import { createApp } from 'vue'
import App from './publicSearchCalendar.vue'
import { BKND_CONFIG } from '../config123.js'

const app = createApp(App)
app.mount('#app')
app.config.globalProperties.BKND_CONFIG = BKND_CONFIG

console.log(app.config)

