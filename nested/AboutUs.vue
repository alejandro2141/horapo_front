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


    <!-- DIV SHOW BIG IMAGE --> 
<!--
    <div v-if="showBigImg" class="bg-white p-3"  style="width : 100%; position: fixed;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <div class="d-flex justify-content-end m-3"> 
               
                <i @click="showBigImg=false"  class="text-primary display-1 bi bi-x-lg"></i>

            </div>
        
        <div class="d-flex justify-content-center">

            <img class="m-2" style="width : 20em ; "  :src="'/public/quees_horapo_graphic'+showBigImgN+'.png'" > 
        
        </div>
    
    </div>
-->


    <div v-if="showBigImg1" class="bg-white p-3"  style="width : 100%; position: fixed;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <p class="text-end"> 
                <i @click="showBigImg1=false"  class="text-primary display-1 bi bi-x-lg"></i>
        </p>
        <div class="d-flex justify-content-center">
            <img class="m-2" style="width : 20em ; "  src="/quees_horapo_graphic1.png" > 
        </div>
    </div>

    <div v-if="showBigImg2" class="bg-white p-3"  style="width : 100%; position: fixed;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <p class="text-end"> 
                <i @click="showBigImg2=false"  class="text-primary display-1 bi bi-x-lg"></i>
        </p>
        <div class="d-flex justify-content-center">
            <img class="m-2" style="width : 20em ; "  src="/quees_horapo_graphic2.png" > 
        </div>
    </div>

    <div v-if="showBigImg3" class="bg-white p-3"  style="width : 100%; position: fixed;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <p class="text-end"> 
                <i @click="showBigImg3=false"  class="text-primary display-1 bi bi-x-lg"></i>
        </p>
        <div class="d-flex justify-content-center">
            <img class="m-2" style="width : 20em ; "  src="/public/quees_horapo_graphic3.png" > 
        </div>
    </div>

    <div v-if="showBigImg4" class="bg-white p-3"  style="width : 100%; position: fixed;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <p class="text-end"> 
                <i @click="showBigImg4=false"  class="text-primary display-1 bi bi-x-lg"></i>
        </p>
        <div class="d-flex justify-content-center">
            <img class="m-2" style="width : 20em ; "  src="/public/quees_horapo_graphic4.png" > 
        </div>
    </div>

    <div v-if="showBigImg5" class="bg-white p-3"  style="width : 100%; position: fixed;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <p class="text-end"> 
                <i @click="showBigImg5=false"  class="text-primary display-1 bi bi-x-lg"></i>
        </p>
        <div class="d-flex justify-content-center">
            <img class="m-2" style="width : 20em ; "  src="/public/quees_horapo_graphic5.png" > 
        </div>
    </div>


    <div v-if="showBigImg6" class="bg-white p-3"  style="width : 100%; position: fixed;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <p class="text-end"> 
                <i @click="showBigImg6=false"  class="text-primary display-1 bi bi-x-lg"></i>
        </p>
        <div class="d-flex justify-content-center">
            <img class="m-2" style="width : 20em ; "  src="/public/quees_horapo_graphic6.png" > 
        </div>
    </div>

    <div v-if="showBigImg10" class="bg-white p-3"  style="width : 100%; position: fixed;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <p class="text-end"> 
                <i @click="showBigImg10=false"  class="text-primary display-1 bi bi-x-lg"></i>
        </p>
        <div class="d-flex justify-content-center">
            <img class="m-2" style="width : 20em ; "  src="/public/quees_horapo_graphic10.png" > 
        </div>
    </div>

    <div v-if="showBigImg11" class="bg-white p-3"  style="width : 100%; position: fixed;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <p class="text-end"> 
                <i @click="showBigImg11=false"  class="text-primary display-1 bi bi-x-lg"></i>
        </p>
        <div class="d-flex justify-content-center">
            <img class="m-2" style="width : 20em ; "  src="/public/quees_horapo_graphic11.png" > 
        </div>
    </div>

    <div v-if="showBigImg12" class="bg-white p-3"  style="width : 100%; position: fixed;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <p class="text-end"> 
                <i @click="showBigImg12=false"  class="text-primary display-1 bi bi-x-lg"></i>
        </p>
        <div class="d-flex justify-content-center">
            <img class="m-2" style="width : 20em ; "  src="/public/quees_horapo_graphic12.png" > 
        </div>
    </div>


    <div v-if="showBigImg13" class="bg-white p-3"  style="width : 100%; position: fixed;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <p class="text-end"> 
                <i @click="showBigImg13=false"  class="text-primary display-1 bi bi-x-lg"></i>
        </p>
        <div class="d-flex justify-content-center">
            <img class="m-2" style="width : 20em ; "  src="/public/quees_horapo_graphic13.png" > 
        </div>
    </div>

    <div v-if="showBigImg14" class="bg-white p-3"  style="width : 100%; position: fixed;   top: 50%;   left: 50%;   transform: translate(-50%, -50%); ">
        <p class="text-end"> 
                <i @click="showBigImg14=false"  class="text-primary display-1 bi bi-x-lg"></i>
        </p>
        <div class="d-flex justify-content-center">
            <img class="m-2" style="width : 20em ; "  src="/public/quees_horapo_graphic14.png" > 
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
        <img @click="showBigImg1 = true" class="m-2 text-center" style="width : 7em ; "  src="/quees_horapo_graphic1.png" >
        <img @click="showBigImg2 = true" class="m-2 text-center" style="width : 7em ; "  src="/quees_horapo_graphic2.png" >
    </div>

    <p class="align-items-star m-2">  <b>horapo</b> es la plataforma Web de búsqueda y reserva de horas de salud,  No es una App, y no requiere instalacion en tu smartphone
    </p>
    
    <p class="text-center h5">En Horapo Profesionales de la Salud</p>
    
    <div class="m-2 d-flex flex-column align-items-star">      
        
        
        <div class="d-flex justify-content-start">
            <div>
                <img @click="showBigImg10 = true" class="m-1" style="width : 5em ; "  src="/public/quees_horapo_graphic10.png" >     
            </div>
            <div class="d-flex align-items-center">
                <i class="bi bi-check2-square text-success h3"></i> Publican sus agendas de horas disponibles
            </div>
        </div>

        <div class="d-flex justify-content-start">
            
            <div>
                <img @click="showBigImg11 = true" class="m-1" style="width : 5em ; "  src="/public/quees_horapo_graphic11.png" >     
            </div>
            <div class="d-flex align-items-center">
                <i class="bi bi-check2-square text-success h3"></i> Envian a pacientes el LinkWeb de su Agenda para una busqueda de horas disponibles.
            </div>
            
        </div>

        <div class="d-flex justify-content-start">
            <div>
                <img @click="showBigImg12=true" class="m-1" style="width : 5em ; "  src="/public/quees_horapo_graphic12.png" >     
            </div>
            
            <div class="d-flex align-items-center">
                <i class="bi bi-check2-square text-success h3"></i> Solicitan confirmación de asistencia a pacientes con un solo click.
            </div>
            
            
        </div>

        <div class="d-flex justify-content-start">
            <div>
                <img @click="showBigImg13=true" class="m-1" style="width : 5em ; "  src="/public/quees_horapo_graphic13.png" >  
            </div>
            
            <div class="d-flex align-items-center">
                <i class="bi bi-check2-square text-success h3"></i> Gestionan sus consultas y agendas forma simple y rápida
            </div>
            
            
        </div>


        <div class="d-flex justify-content-start">
            <div>
                <img @click="showBigImg14=true" class="m-1" style="width : 5em ; "  src="/public/quees_horapo_graphic14.png" >  
            </div>
            
            <div class="d-flex align-items-center">
                <i class="bi bi-check2-square text-success h3"></i> Ven claramente las horas reservadas y si estas fueron confirmadas por sus pacientes.
            </div>
            
            
        </div>
        
      


       <br>
       <br>
       <p class="text-center">
        Pacientes
       </p>
        <text class="align-items-star"> <i class="bi bi-check2-square text-success h3"></i> Pacientes buscan y agendan citas de acuerdo a la disponibilidad, ubicacion, fecha, etc </text>
    </div>



<div class="m-2">
   
    <div class="d-flex flex-column align-items-center">
        <img @click="showBigImg3=true" class="m-2" style="width : 18em ; "  src="/public/specialties.png" > 
    </div>
</div>

<div  class="m-2">

    <div class="d-flex justify-content-start">
            <div>
            </div>
            
            <div class="d-flex align-items-center">
                <i class="bi bi-check2-square text-success h3"></i> Pacientes reservan horas forma simple y amigable.   
            </div>
            
            
    </div>
        
    <br>

    <div class="d-flex justify-content-around text-success " >
        <div class="text-center ">
            <div>
            Busca
            </div>
            <img @click="showBigImg4=true" class="m-1" style="width : 7em ; "  src="/public/quees_horapo_graphic4.png" > 
            
        </div>
        <div class="text-center">
            <div>
            Encuentra
            </div>
            <img @click="showBigImg5=true" class="m-1" style="width : 7em ; "  src="/public/quees_horapo_graphic5.png" > 
        </div>
        <div class="text-center">
            <div>
            Reserva
            </div>
            <img @click="showBigImg6=true" class="m-1" style="width : 7em ; "  src="/public/quees_horapo_graphic6.png" > 
        </div>
    </div>

</div>

<div class="d-flex justify-content-start">
            <div>
              
            </div>
            
            <div class="d-flex align-items-center">
                <i class="bi bi-check2-square text-success h3"></i> Pacientes reciben a su correo notificacion de su Citas y recordatorios.    
            </div>
            
            
</div>


<!-- 
<div class="m-2">
     Profesionales de la salud pueden gestionar sus horas y publicar sus calendarios de forma muy simple.   
    <br>
    <img @click="showImg(7)" class="m-1" style="width : 7em ; "  src="/public/quees_horapo_graphic7.png" > 
    <img @click="showImg(8)" class="m-1" style="width : 7em ; "  src="/public/quees_horapo_graphic8.png" > 
    <img @click="showImg(9)" class="m-1" style="width : 7em ; "  src="/public/quees_horapo_graphic9.png" > 
</div>
-->
<!--
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
-->
         <div class="text-center mt-2 pt-5 "> 
             <button  v-if="!showForm " type="button" @click="showForm  = !showForm " class="btn btn-secondary ">Registarme como Profesional</button>
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

       showBigImg1 : false ,
       showBigImg2 : false ,
       showBigImg3 : false ,
       showBigImg4 : false ,
       showBigImg5 : false ,
       showBigImg6 : false ,

       showBigImg10 : false ,
       showBigImg11 : false ,
       showBigImg12 : false ,
       showBigImg13 : false ,
       showBigImg14 : false ,

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
