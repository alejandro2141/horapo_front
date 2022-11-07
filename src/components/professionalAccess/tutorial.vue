<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
<div>
  
        <div class="text-center" >
        
        </div>

        <div class=" border  m-2 p-3">
            <p class="display-1 text-center">
                Bienvenid<i class="display-4 bi bi-emoji-wink"></i> 
            </p>
            
            <p class="text-center">
                Para iniciar debes crear tu primera consulta. 
            </p>

            <p class="text-center">            
                Puedes hacer click aqui, o en el menu superior 
                <img @click='switchToCenter()' class="" width=""  src="/public/professional_center_bar.png" >
            </p>

            <p class="text-start">
            Una Consulta es un lugar fisico o remoto/Virtual donde atiendes a tus pacientes, y donde asisten a las citas.
            </p>

            <div class="display-4 text-center text-primary" @click='finishTutorial()' >
                Finalizar Tutorial
            </div>
<!--
        <div class="display-4 text-center text-primary" @click='switchToCenter()' >
            Crear mi primera Consulta
        </div>
-->
        </div>


</div>

</template>

<style scoped>
</style>


<script>

export default {

data: function () {
		return {
		 }
	},
	props: ['session_params'],

    created () {
        console.log("Tutorial Created ");
         },

    mounted () {
        console.log("Tutorial Mounted");
         },

  
    methods: {

        tutorialCenters()
        {

        },
        tutorialCalendars()
        {

        },

        async finishTutorial()
        {
           const json = { 
           //name    : this.form_center_name ,
           //address : this.form_center_address ,
           //locations      : this.form_comuna_codes ,
           //home_comuna  : this.form_comuna_codes ,
           //center_region  :  this.form_center_region, 
          // phone1  : this.form_center_phone1 ,
          // phone2  : this.form_center_phone2 ,
           professional_id: this.session_params.professional_id ,
          // app_type       : this.form_app_type , 
          // center_color   : randomColor ,
           };

            let restemp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_shutdown_firstlogin",json);
            this.session_params.first_time = false ;   
        },
 

        switchToCenter()
        {
            console.log("switch to centers");
            this.$emit('switchToCenters');
        }


     	},

}
</script>

