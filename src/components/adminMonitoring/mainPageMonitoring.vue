<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { BKND_CONFIG } from '../../../config123.js'


</script>

<template>
<div>

    MAIN PAGE MONITORING


    <div class="border border-1">
        
        <button  @click="getProfessionalRegisters()" type="button" class="btn btn-secondary">show</button>
        <div v-for="reg of p_register">
        {{ reg.email }}  {{ reg.name }}<br>

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
            p_register : null 
		 }
	},

	props : [],
  	emits : [] ,


    created () {
        
         },
    mounted () {
        //this.getProfessionalRegisters()
         },

 
    methods: {
        
        //GET Center List
        async getProfessionalRegisters() {
                        const json = { 
                      			   
                                      };

                        console.log ("GET PROFESIONAL REGISTERS :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/monitoring_get_professional_registers",json);
                        this.p_register = response_json.data.rows;
                        console.log ("RESPONSE PROFESIONAL REGISERS:"+JSON.stringify(this.p_register)) ;                       
                    },	


		},
  

}
</script>

