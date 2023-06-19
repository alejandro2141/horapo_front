<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
<div>
  
       
    <div  class=" m-2 p-2 border border-rounded bg-warning text-dark " style="border-radius: 15px;" >
        <p class="text-center">Información</p>
        <p class="text-left">
             Aqui puedes crear tus calendarios   <br>
       
             Para crear un calendario debe existir al menos una consulta.<br>

        Un Calendario es un periodo de tiempo en el que entregas tus servicios para una especialidad y Consulta (antes creada). 
        Durante la creación de un calendario, debe indicar:<br>
        Fecha de Inicio y Termino de este calendario <br>
        dias de la semana en que atiende (recurrencia)<br>
        Duracion de cada cita<br>
        hora de inicio y fin<br>
        Un color de referencia.<br>
        otra informacion.<br>
       
        </p>



        <p class="text-left mt-3">
            Puede crear hasta 5 calendarios  
        </p>
        
        <br>
        <!-- 
        <div class="text-center p-1 m-1"> 
            <text @click="addNewCenter()"  class="m-3 btn btn-primary" style="border-radius: 55px;"> <i class="bi bi-plus-lg"></i> Nueva Consulta </text>
        </div>
        

            <p class="text-primary text-center mt-4 pt-4" @click='finishTutorial()' >
                Cerrar este Tutorial
            </p>
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
            showInfoCreate: true 
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
        async finishTutorial()
        {
           const json = { 
                     professional_id: this.session_params.professional_id ,
                     tutorial: 2,
           };
            let restemp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_shutdown_tutorial",json);
            this.session_params.tutorial_center = false ;   
        },

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
              tutorial : 2
           };

            let restemp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_shutdown_tutorial",json);
            this.session_params.tutorial_center = false ;   
        },
 

        switchToCenter()
        {
            console.log("switch to centers");
            this.$emit('switchToCenters');
        }


     	},

}
</script>

