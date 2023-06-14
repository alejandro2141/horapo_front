<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { BKND_CONFIG } from '../../../config123.js'


</script>

<template>
<div>

    <text class="m-5 p-5">MAIN PAGE MONITORING</text>
    
    <div class="border border-1">
        <p class="mt-5"> 
            <button  @click="getProfessionalRegisters()" type="button" class="btn btn-secondary">Professional Registers</button>
        </p>
    
        <div class="border border-1">
            <div v-for="reg of p_register">
            {{ reg.email }}  {{ reg.name }}<br>
            </div>
        </div>
    
    </div>

    <div class="border border-1">
        <p class="mt-5"> 
            <button  @click="getSessionsActive()" type="button" class="btn btn-secondary">Session Active</button>
        </p>
    
        <div class="border border-1">
            <div v-for="reg of p_sessions">
            {{ reg.name }}  {{ reg.last_activity_time }}<br>
            </div>
        </div>
    </div>

    <div class="border border-1">
        <p class="mt-5"> 
            <button  @click="getPublicComments()" type="button" class="btn btn-secondary">Get Public Comments</button>
        </p>
    
        <div class="border border-1">
            <div v-for="reg of p_comments">
                {{ reg.date}}  {{ reg.email}}  {{ reg.message}}<br>
            </div>
        </div>
    </div>



</div>
</template>

<style scoped>
</style>


<script>

export default {

data: function () {
		return {
            p_register : null ,
            p_sessions : null ,
            p_comments : null
		 }
	},

	props : [],
  	emits : [] ,


    created () {
        
         },
    mounted () {
        this.getProfessionalRegisters()
        this.getSessionsActive()
         },

 
    methods: {
        
        //GET Session Active
        async getSessionsActive() {
                        const json = { 
                      			   
                                      };

                        console.log ("GET SESSIONS ACTIVE :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/monitoring_get_professional_sessions_active",json);
                        this.p_sessions = response_json.data.rows;
                        console.log ("RESPONSE GET SESSIONS ACTIVE:"+JSON.stringify(this.p_sessions)) ;                       
                    },	

        //GET Center List
        async getProfessionalRegisters() {
                        const json = { 
                      			   
                                      };

                        console.log ("GET PROFESIONAL REGISTERS :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/monitoring_get_professional_registers",json);
                        this.p_register = response_json.data.rows;
                        console.log ("RESPONSE PROFESIONAL REGISERS:"+JSON.stringify(this.p_register)) ;                       
                    },

        //GET Center List
        async getPublicComments() {
                        const json = { 
                      			   
                                      };

                        console.log ("GET PUBLIC COMMENTS :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/monitoring_get_public_comments",json);
                        this.p_comments = response_json.data.rows;
                        console.log ("GET PUBLIC COMMENTS:"+JSON.stringify(this.p_comments)) ;                       
                    },




		},
  

}
</script>

