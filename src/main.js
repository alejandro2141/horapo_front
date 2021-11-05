import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
//import { BKND_CONFIG, GLOBAL_COMUNAS } from '../config123.js'


const app = createApp(App)
app.mount('#app')

//app.config.globalProperties.BKND_CONFIG = BKND_CONFIG
/*
app.config.globalProperties.GLOBAL_REGIONS = GLOBAL_REGIONS
*/
//app.config.globalProperties.GLOBAL_COMUNAS = GLOBAL_COMUNAS


console.log(app.config) ;

//LOAD GLOBAL VARIABLES HERE in order to use later and avoid multiple calls to backend. 
/*
        let response_comunas = await axios.post(BKND_CONFIG.BKND_HOST+"/common_get_comuna_list");
        app.config.globalProperties.GLOBAL_COMUNA = response_comunas.data.rows;	
*/      
