<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import axios from 'axios'
//import { BKND_CONFIG } from '../config123.js'
/*
import GeneralHeader from '../src/components/GeneralHeader.vue'
*/
/*import PublicSearchOnCalendar from '../src/components/publicSearchCalendar/PublicSearchOnCalendar.vue'
  */  

</script>

<template>
<div>
    <div id="app" class="p-3" >    
      <!--  <PublicSearchOnCalendar :global_specialties="global_specialties" :global_comunas="global_comunas" ></PublicSearchOnCalendar>
    -->
    </div>

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
/*
        console.log("NESTED PUBLIC SEARCH Fill Global variables");
        this.loadGlobalSpecialties();
        this.loadGlobalComunas();
*/
},
mounted() {},

watch: {
    },//end watch

methods: {

        /*
        async loadGlobalSpecialties() {
                let metric=Date.now()  ; 
				let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/common_get_specialty_list");
                this.global_specialties = response_json.data.rows;
                //console.log("APP GET COMUNA LIST METHOD, "+JSON.stringify(this.global_specialties) );
                 console.log("performance , Public Search ,loadGlobalSpecialties, "+ (Date.now() - metric));
            },

        async loadGlobalComunas() {
                let metric=Date.now()  ; 
				let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/common_get_comuna_list");
                this.global_comunas = response_json.data.rows;
                //console.log("APP Comuna list: "+JSON.stringify(this.global_comunas) );
                 console.log("performance , Public Search , loadGlobalComunas , "+ (Date.now() - metric));
            },
            */

        },

}

</script>
