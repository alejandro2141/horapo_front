<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
    <div class="p-3 mb-2 text-dark  " style="border-radius: 15px;">
   
    <div class="d-flex justify-content-between mt-3">
        
         <i class="bi bi-person-circle display-1 "></i> 
           <p class="h4 text-center  mt-3 "> Su Información </p> 
        
         <i class="display-1 bi bi-x-lg ml-0 text-primary"   aria-label="Close" v-on:click="closeTabUserConfig()" ></i> 
    </div>
   
    <p class="text-center " > 
       
   
    </p>
        
        <p class=""> Nombre : <br> {{ professional_data.name }} </p>
        <p class=""> Numero Doc :  {{ professional_data.document_number }} </p>
        <p class=""> license_number :  {{ professional_data.license_number }} </p>
        <p class=""> Dirección Personal : <br> {{ professional_data.address }} </p>

        <p class=""> Información Certificada Professional : <br> To be completed </p>

        <p class=""> Teléfono :  {{ professional_data.phone }} </p>
        <p class=""> Activo :  {{ professional_data.active }} </p>
        <p class=""> Primer Login  :  {{ professional_data.first_time }} </p>
        

        <div class="d-flex justify-content-between"> 

            <a class="mt-4" target="_blank" rel="noopener noreferrer" :href="'/nested/publicSiteProfessional.html?prof_id='+professional_data.id">Ver Su Sitio Profesional</a>
            <text class="">
                <text class="text-center">Compartir </text>
                <p>
               &nbsp; <i class="text-primary fs-1 bi bi-whatsapp "> </i> &nbsp; &nbsp;
               &nbsp; <i class="text-primary fs-1 bi bi-facebook"></i> &nbsp;
                </p>
            </text>

        </div>

        <p>
            
        </p>
        <p>
            
        </p>

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

	props : ['session_params','global_comunas'],
  	emits : ['switchViewTo'] ,

    created () {
        console.log("Tab User Config"+this.session_params.professional_id);
        console.log("Tab User Config JSON "+JSON.stringify(this.session_params));
        this.loadProfessionalEspecialties() ;
        this.loadProfessionalData() ; 
        },
 
    methods: {

        closeTabUserConfig()
        {
            console.log("close config")
            this.$emit('switchViewTo',2 ) ;
        },

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

