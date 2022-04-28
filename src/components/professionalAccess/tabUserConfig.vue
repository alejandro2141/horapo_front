<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
    <div class="p-3 mb-2 bg-light text-dark border border-dark " style="border-radius: 15px;">
    <p class="text-center " > <i class="bi bi-person-circle display-1 text-primary"></i> </p>
         <p class="h4 text-center text-primary"> Su Información</p>
        <p class=""> Nombre : <br> {{ professional_data.name }} </p>
        <p class=""> Numero Doc :  {{ professional_data.document_number }} </p>
        <p class=""> license_number :  {{ professional_data.license_number }} </p>
        <p class=""> Dirección Personal : <br> {{ professional_data.address }} </p>
        <p class=""> Teléfono :  {{ professional_data.phone }} </p>
        <p class=""> Activo :  {{ professional_data.active }} </p>
        <p class=""> Primer Login  :  {{ professional_data.first_time }} </p>
        


          <hr>
        <p> Especialidades Registradas  :  
            <text  v-for="specialty in global_professional_specialties"  :key='specialty.id' >
                    <br> <i class="bi bi-heart"></i>  {{specialty.name}} 
            </text>
        </p>



    </div>
</template>

<style scoped>
</style>


<script>

export default {
data: function () {

		return {
			data: null ,
            global_professional_specialties : [] ,
            professional_data : [] ,

		 }
	
    },
	props: ['session_params','global_comunas'],

    created () {
        console.log("Tab User Config"+this.session_params.professional_id);
        console.log("Tab User Config JSON "+JSON.stringify(this.session_params));
        this.loadProfessionalEspecialties() ;
        this.loadProfessionalData() ; 
        },
 
    methods: {


        async loadProfessionalEspecialties() {             
                console.log ("getSpecialties :" );
                const json = { 
                   professional_id: this.session_params.professional_id ,
                  // professional_id : 1 ,
                   };

                console.log("REQUEST get_professional_specialty :"+JSON.stringify(json));
                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/get_professional_specialty",json);
                console.log ("RESPONSE  get_professional_specialty:"+JSON.stringify(response_json.data.rows)) ;
                this.global_professional_specialties= response_json.data.rows ; 
            },


        async loadProfessionalData() {             
                console.log ("loadProfessionalData :" );
                const json = { 
                   professional_id: this.session_params.professional_id ,
                  // professional_id : 1 ,
                   };

                console.log("REQUEST professional_get_data :"+JSON.stringify(json));
                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_data",json);
                console.log ("RESPONSE  professional_get_data:"+JSON.stringify(response_json.data)) ;
                this.professional_data= response_json.data ; 
            },



      	},
  

}
</script>

