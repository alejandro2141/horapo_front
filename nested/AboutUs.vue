<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import GeneralHeader from '../src/components/GeneralHeader.vue'
import RegisterForm from  '../src/components/publicSearch/RegisterForm.vue'
import { BKND_CONFIG } from '../config123.js'
</script>

<template>
<div>
    <GeneralHeader></GeneralHeader>

    <div v-if="showBigImg" class="bg-white"  style="width : 100%; position: absolute;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <div class="d-flex justify-content-end m-3"> 
               
                <i @click="showBigImg=false"  class="text-primary display-1 bi bi-x-lg"></i>

            </div>
        
        <div class="d-flex justify-content-center">

            <img class="m-2" style="width : 18em ; "  :src="'/public/quees_horapo_graphic'+showBigImgN+'.png'" > 
        
        </div>
    
    </div>

    <div class="bg-light">

        <!-- 
<div style="padding:0em;  display: flex;  align-items: center;  justify-content: center;  " > 
<div style="padding:0em;text-align: center; max-width:500px ;border-radius: 2em;" >      
-->

<div class="d-flex justify-content-center">
<div>


    <div class="m ">

        <div class="d-flex m-2 justify-content-end"> 
            <a HREF="/index.html" type="button" class=""><i class="display-5 bi bi-x-lg text-primary"></i></a>
        </div>

        
        <div class="d-flex justify-content-around"> 
            <text></text>
            <text class="display-5 p-2 text-decoration-none" style="color: rgb(46, 86, 104);" >¿Que es horapo? </text>
            <text></text>
        </div>
      
    <div class="d-flex justify-content-around">
        <img @click="showImg(1)" class="m-2 text-center" style="width : 10em ; "  src="/public/quees_horapo_graphic1.png" >
        <img @click="showImg(2)" class="m-2 text-center" style="width : 10em ; "  src="/public/quees_horapo_graphic2.png" >
    </div>

    <p class="align-items-star m-2">  <b>horapo</b> es la plataforma de búsqueda y reserva de horas de salud.</p>
       
    <div class="m-2 d-flex flex-column align-items-star">      
        <text class="align-items-star"> <i class="bi bi-check2-square text-success h3"></i> Profesionales de la salud publican sus agendas de horas disponibles</text>
        <text class="align-items-star"> <i class="bi bi-check2-square text-success h3"></i> Profesionales envian a sus pacientes un Link directo de su Agenda para una busqueda de horas dipsonibles.</text>
        <text class="align-items-star"> <i class="bi bi-check2-square text-success h3"></i> Profesionales envian a pacientes solicitudes de confirmación de asistencia con un solo click</text>
        <text class="align-items-star"> <i class="bi bi-check2-square text-success h3"></i> Profesionales hacen gestion sobre sus agendas de forma simple y rápida</text>


        <text class="align-items-star"> <i class="bi bi-check2-square text-success h3"></i> Pacientes buscan y agendan citas de acuerdo a la disponibilidad, ubicacion, fecha, etc </text>
        <text class="align-items-star"> <i class="bi bi-check2-square text-success h3"></i> Pacientes buscan de acuerdo a especialidad, disponibilidad, ubicacion, fechas, etc </text>
    </div>



<div class="m-2">
    Reunimos las siguientes especialidades:  
    <br>  
    <div class="d-flex flex-column align-items-center">
        <img class="m-2" style="width : 18em ; "  src="/public/specialties.png" > 
    </div>
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
       showBigImg : false,
       showBigImgN : 0,
    }
  },

  methods: {

    showImg(img)
    {
        console.log("Show Image:"+img)
        this.showBigImgN = img ; 
        this.showBigImg = true ; 

    },

  },
}
</script>
