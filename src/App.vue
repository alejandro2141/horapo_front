<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import LandingPage from './components/LandingPage.vue'
import axios from 'axios'
import { BKND_CONFIG } from '../config123.js'


</script>

<template>

    <LandingPage nameTitle="123Hora"   ></LandingPage>
   
</template>


<style scoped>
body {
 background-image : url(assets/images/background_patient.JPG); height: 100%; width: 100%; border: 0px solid black
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
        console.log("APP Fill Global variables");
        this.loadGlobalSpecialties();
        this.loadGlobalComunas();
},
mounted() {},

watch: {
    },//end watch

methods: {
        async loadGlobalSpecialties() {
                console.log ("APP GET SPECIALTY LIST METHOD"); 
				let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/common_get_specialty_list");
                this.global_specialties = response_json.data.rows;
                console.log("APP Specialty list: "+JSON.stringify(this.global_specialties) );

            },
        async loadGlobalComunas() {
                 console.log ("APP GET COMUNA LIST METHOD"); 
				let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/common_get_comuna_list");
                this.global_comunas = response_json.data.rows;
                console.log("APP Comuna list: "+JSON.stringify(this.global_comunas) );

            },




        },

}

</script>