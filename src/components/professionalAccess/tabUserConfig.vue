<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
    <div class="p-3 mb-2 text-white bg-secondary" >
   
    <div class="d-flex justify-content-between mt-3">
        
         <i class="bi bi-person-bounding-box display-1 "></i>
           <p class="h4 text-center  mt-3  "> {{ professional_data.name }} </p> 
           <text></text>        
    <!--     <i class="display-1 bi bi-x-lg ml-0 text-primary"   aria-label="Close" v-on:click="closeTabUserConfig()" ></i> 
    -->
    </div>
   
    <p class="text-center " > 
    </p>

         <div class="d-flex justify-content-between m-1">
            <text>Nº Documento</text> 
            <text>{{ professional_data.document_number }} </text> 
        </div>
         <div class="d-flex justify-content-between m-1">
            <text>Nº Licencia  </text> 
            <text> {{ professional_data.license_number }}</text> 
        </div>

        <div class="d-flex justify-content-between m-1">
            <text>Dirección Personal </text> 
            <text> {{ professional_data.address }}</text> 
        </div>

        <div class="d-flex justify-content-between m-1">
            <text>Información Certificada Professional </text> 
            <text> -- </text> 
        </div>

        <div class="d-flex justify-content-between  m-1">
            <text>Teléfono  </text> 
            <text> {{professional_data.phone }} </text> 
        </div>

        <div class="d-flex justify-content-between m-1">
            <text>Estado Activo  </text> 
            <text> {{ professional_data.active }} </text> 
        </div>

        <!--
        <div class="m-1 d-flex justify-content-between  m-1">
            <a class="text-white" target="_blank" rel="noopener noreferrer" :href="'/nested/publicSiteProfessional.html?prof_id='+professional_data.id">Ver Su Sitio Profesional</a>
            <i class="bi bi-arrow-right-square" ></i>
        </div>          
        

        
        <div class="d-flex justify-content-between  m-1"> 

             <text class="">
                <text class="text-center">Compartir su sitio en redes sociales </text>
                <p>
               &nbsp; <i class=" fs-1 bi bi-whatsapp "> </i> &nbsp; &nbsp;
               &nbsp; <i class=" fs-1 bi bi-facebook"></i> &nbsp;
                </p>
            </text>

        </div>
        -->

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

