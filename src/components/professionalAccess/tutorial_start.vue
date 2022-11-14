<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
<div>
  
        <div class="text-center" >
        
        </div>

        <div class=" border  m-2 p-3"  style="border-radius: 15px;">
            <p class="display-1 text-center">
                Bienvenid<i class="display-4 bi bi-emoji-wink"></i> 
            </p>
            
            <p class="text-center">
                Para iniciar debes crear tu primera consulta.   
            </p>

            <div class="text-center">            
                Puedes Ver tus consultas en el menu superior.   
                 <i  class=" text-dark fs-4 bi bi-geo-alt rounded-circle p-1 " :class="{'border border-4 border-danger':session_params.first_time}" ></i>
		      <!--
                <div  class="rounded-circle p-1 bg-secondary" :class="{'border border-4 border-danger':session_params.first_time}" >	
			        <i  class=" text-dark fs-4 bi bi-geo-alt" :class="{'border border-4 border-danger':session_params.first_time}" ></i>
		        </div>
                -->

            </div>

            

            <div class="text-primary mt-4 pt-4" @click='finishTutorial()' >
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

hr.style-eight {
    overflow: visible; /* For IE */
    padding: 0;
    border: none;
    border-top: medium double #333;
    color: #333;
    text-align: center;
}
hr.style-eight:after {
    content: "§";
    display: inline-block;
    position: relative;
    top: -0.7em;
    font-size: 1.5em;
    padding: 0 0.25em;
    background: white;
}

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
              professional_id: this.session_params.professional_id ,
              tutorial : 1
           };

            let restemp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_shutdown_tutorial",json);
            this.session_params.tutorial_start = false ;   
        },
 

        switchToCenter()
        {
            console.log("switch to centers");
            this.$emit('switchToCenters');
        }


     	},

}
</script>

