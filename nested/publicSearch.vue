<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import axios from 'axios'
import { BKND_CONFIG } from '../config123.js'
import GeneralHeader from '../src/components/GeneralHeader.vue'
import SearchAppointment from '../src/components/publicSearch/SearchAppointment.vue'
    

</script>

<template>


<GeneralHeader></GeneralHeader>
    <div id="app" class="m-4" >     
          
        <SearchAppointment :global_specialties="global_specialties" :global_comunas="global_comunas" ></SearchAppointment>
    </div>

</template>


<style scoped>


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
        console.log("NESTED PUBLIC SEARCH Fill Global variables");
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
                console.log("APP global_specialties: "+JSON.stringify(this.global_specialties) );
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
