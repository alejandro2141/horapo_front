<script setup>

import LandingPage from './components/LandingPage.vue'
import axios from 'axios'
import { BKND_CONFIG } from '../config123.js'


</script>

<template>

    <LandingPage ></LandingPage>
   
</template>


<style scoped>
body {
/* background-image : url(assets/images/background_patient.JPG); height: 100%; width: 100%; border: 0px solid black
*/
}

</style>

<script>

export default {
 data : function() {
        return {
            global_specialties : [],
            global_comunas : [],  
        }
    },  
    props: [], 
    emits: [],


created() {
    /*
   console.log("APP Fill Global variables");
        this.loadGlobalSpecialties();
        this.loadGlobalComunas();
    */
},

watch: {
    },//end watch

methods: {
        /*
        async loadGlobalSpecialties() {
                let metric=Date.now()  ; 
              	let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/common_get_specialty_list");
                this.global_specialties = response_json.data.rows;
               // console.log("APP Specialty list: "+JSON.stringify(this.global_specialties) );
                console.log("GET SPECIALTY LIST METHOD, performance , "+ (Date.now() - metric) );
            },
        async loadGlobalComunas() {
                let metric=Date.now()  ; 
               	let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/common_get_comuna_list");
                this.global_comunas = response_json.data.rows;
              // console.log("APP Comuna list: "+JSON.stringify(this.global_comunas) );
                console.log("APP GET COMUNA LIST METHOD, performance , "+ (Date.now() - metric));
            },
        */

        },

}

</script>