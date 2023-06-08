<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import GeneralHeader from '../src/components/GeneralHeader.vue'
import RegisterForm from  '../src/components/publicSearch/RegisterForm.vue'

</script>

<template>
<div>
    <GeneralHeader></GeneralHeader>

    <div class="bg-light">

<div style="padding:0em;  display: flex;  align-items: center;  justify-content: center;  " > 
<div style="padding:0em;text-align: center; max-width:500px ;border-radius: 2em;" >      

    <div class="m text-center">

        <div class="d-flex m-2 justify-content-end"> 
            <a HREF="/index.html" type="button" class=""><i class="display-5 bi bi-x-lg text-primary"></i></a>
        </div>

        
        <div class="d-flex justify-content-around"> 
            <text></text>
            <text class="display-5 p-2 text-decoration-none" style="color: rgb(46, 86, 104);" >¿Que es horapo? </text>
            <text></text>
        </div>
      
        <img class="m-2" style="width : 20em ; "  src="/public/horapo_graphic1.png" >
       <br>
      
<div class="m-2">  

<b>horapo</b> es una plataforma de búsqueda y reserva de horas professionales de salud. 
Aquí sus horas estarán disponibles para que pacientes busquen y agenden citas de acuerdo a la disponibilidad, ubicacion geografica, fecha, etc 
<br>

</div>

<div class="m-2">
    Actualmente reunimos las horas profesionales de las siguientes especialidades de salud:  
    <br>  
    <img class="m-2" style="width : 18em ; "  src="/public/specialties.png" > 

</div>

<div  class="m-2">
    Pacientes pueden buscar y reservar horas de salud de forma simple y amigable.   
    <br>
    <img class="m-2" style="width : 8em ; "  src="/public/public_main_search.png" > 
    <img class="m-2" style="width : 8em ; "  src="/public/public_search_main_result.png" > 

</div>


<div class="m-2">
    Y Profesionales de la salud pueden gestionar sus horas y publicar sus calendarios de forma muy simple.   
    <br>
    <img class="m-2" style="width : 8em ; "  src="/public/professional_main_view.png" > 
    <img class="m-2" style="width : 8em ; "  src="/public/professional_main_page_calendar.png" > 
</div>

<div class="m-3 mb-5 pb-1">
   
    <button v-if="!showKnowMore1" type="button" @click="showKnowMore1=true " class="btn btn-secondary ">
        Quiero conocer más
    </button>
       
</div>

<div v-if="showKnowMore1" class="m-2" >
    En <b>horapo</b> un Profesional de salud registrado puede 
    crear <b>Consultas</b> y <b>Calenarios</b>, que generan horas de atención. <br>    
    En horapo los pacientes pueden buscar horas disponibles y agendar citas.<br> 
    Un profesional puede realizar gestion sobre su citas <br>
    Un profesional puede tambien solicitar al paciente confirmacion de su asistencia con <b>un solo click</b> 
    <br>
    <img class="m-2" style="width : 5em ; "  src="/public/professional_appointment_details.png" > 
    <img class="m-2" style="width : 10em ; "  src="/public/professional_calendar.png" > 

    <br>
    
</div>
         <div class="text-center mt-2 pt-5 "> 
             <button  v-if="!showForm && showKnowMore1" type="button" @click="showForm  = !showForm " class="btn btn-secondary ">Si, deseo Registarme</button>
        </div>
    </div>

    <div v-if="showForm" >
        <RegisterForm></RegisterForm>
    </div>

</div>

</div>

<p>
<br>
<br>
<br>
</p>

</div>



    <!--
    <RegisterForm></RegisterForm>
    -->

</div>
</template>


<style scoped>


</style>

<script>
//const showForm = ref(false)


export default {
  data : function() {
    return {
       showKnowMore1 : false ,
       showForm:false ,
    }
  },

  methods: {
  },
}
</script>
