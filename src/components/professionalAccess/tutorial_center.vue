<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
<div>
  
       
    <div  class="text-dark m-2 p-2 border border-rounded" style="border-radius: 15px;" >
        <p class="text-center">Tutorial</p>
        <p class="text-center">
             Aqui puedes crear tus consultas   <br>
        
        Una consulta es un lugar fisico o virtual donde usted entrega sus servicios profesionales, <br>
        Existen tres tipos de consultas profesionales: <br> 
       
        </p>

       <div class="d-flex justify-content-between">
            <div>
                <b>Consulta En consulta</b><br>
                Es su consulta fisica, debe indicar una dirección donde el paciente debe asistir
            </div>
            <div>
                <button type="button" class="btn  m-1 btn-outline-primary"  >
                    <i class="h3 bi bi-building m-0 p-0"></i><br>
                    <text class="fs-6 m-0 p-0" style="font-size: 0.7em;">En Consulta</text> 
                </button>
            </div>
       </div>

       <div class="d-flex justify-content-between">
            <div>
                <b>Consulta a Domicilio</b><br>
                Se indican las comunas donde usted atiende a domicilio.
            </div>
            <div>
                <button type="button" class="btn m-1 btn-outline-primary"  >
                              <i class="h3 bi bi-house-door m-0 p-0"></i><br>
                               <text class="fs-6 m-0 p-0">A Domicilio</text> 
                </button>
            </div>
       </div>

       <div class="d-flex justify-content-between">
            <div>
                <b>Consulta Remota</b><br>
                Se entrega el servicio de forma remota telefonica en el telefono indicado. 
            </div>
            <div>
                <button type="button" class="btn m-0 btn-outline-primary"  >
                              <i class="h3 bi bi-camera-video m-0 p-0"></i><br>
                              <text class="fs-6 m-0 p-0">Tele Atenc. </text> 
                </button>
            </div>
       </div>

        <p class="text-center mt-3">
            Puede crear tantas consultas como usted quiera,estas consultas estarán disponibles para sus calendarios.  
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

