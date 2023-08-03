<script setup>
import { ref } from 'vue'
import RecoverAppointmentsForm from './RecoverAppointmentsForm.vue'
//import PublicShareSite from '  ';
import PublicShareSite from './publicSearch/PublicShareSite.vue';

</script>

<template>
<div >
    <!-- style="background-color:#2f3e44"--> 
  	
    <div  class="d-flex justify-content-between  mt-0 pt-0 text-secondary"> 

        
        <div class="p-1"  >
            <!-- 
            <i  @click="show_sub_menu = !show_sub_menu" class="fs-2 bi bi-list text-secondary"></i>
            -->
            <text v-if="!show_sub_menu" class="p-2" @click="closeAllDialog();show_sub_menu = !show_sub_menu; showRecoverApp=false ;showShareSite=false" style="font-size: 1.5em ; "> <i class="bi bi-water"></i> </text>
            <text v-else class="p-2" @click="show_sub_menu = !show_sub_menu" style="font-size: 1.5em ; "> <i class="bi bi-x-lg text-primary"></i> </text>

        </div>
 
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>

        <div class="p-1   text-center text-success" style="font-size: 1.7em ; ">
            <div>
                <i class="bi bi-bug"></i> 
                <text @click="showShareSite=!showShareSite ; show_sub_menu=false; showRecoverAppointment=false" class=""  >
                horapo
                </text> 
            </div>
            <!--  <text class="m-0 p-0" style="font-size: 0.8em">Mejores consultas un solo lugar</text>
            -->
        </div>
        
            <!--
            <a HREF="/nested/publicSearch.html" class="text-decoration-none m-2" style="color :#ffffff"> 
                <text class="">horapo</text>  
            </a>
            -->

        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
     

        <div class="p-1 "   style="">
            <text v-if="true" @click="showRecoverAppointment=!showRecoverAppointment ; show_sub_menu=false  ; showShareSite=false   " class="p-2 mt-2  text-center" style="font-size: 1.7em; ">
            
                <i class="bi bi-clock-history"></i>
            
            </text>
            <!--
            <text v-if="!showRecoverAppointment" @click="show_sub_menu=false  ; showShareSite=false ;showRecoverAppointment=true;  " class="p-2 mt-2 text-primary" style="font-size: 1em; ">citas</text>
            <text v-else class="p-2" @click=" showRecoverAppointment = false ; showShareSite=false ; show_sub_menu=false" style="font-size: 1em ; "> <i class="bi bi-x-lg text-primary p-2"></i> </text>
            -->
        </div>

       
 <!--------------------
          SUB MENU        
    <div class="d-flex justify-content-end"><a href="/index.html" class=""><i class="display-3 bi bi-x-lg"></i></a></div>
---------------------->
       
    
    
    <div v-if="show_sub_menu"   class=" text-primary bg-white border w-100 p-1"  style="font-size: 1.4em ;  position: absolute; top: 2em;  z-index: 999;  border-bottom-left-radius: 10px 10px;border-radius: 15px;"> 
            <!--
                <div class="p-4 ">
                        <a href="/nested/aboutUs.html" class="m-1 text-decoration-none btn-floating "  role="button">
                            &nbsp;&nbsp;<text class="text-decoration-none text-secondary" >¿Que es Horapo? </text>
                        </a>
                </div>
            -->
                    <!--
                    <text class="text-secondary " >|</text>
                    -->
                <div class="p-4 text-start">
                        <a HREF="/nested/professionalAccess.html" class="  text-decoration-none btn-floating "  role="button">
                            <i class="bi bi-key text-primary  "></i> &nbsp;&nbsp;<text class=" text-decoration-none text-secondary" >Acceso Profesionales</text>
                        </a>
                </div>

                <div class="p-4 text-start ">
                        <a HREF="/nested/register.html" class=" text-decoration-none btn-floating m-1"  role="button">
                            <i class="bi bi-balloon-heart"></i>   &nbsp;&nbsp;<text class="text-decoration-none text-secondary" > Registrarme </text>&nbsp;&nbsp;&nbsp;&nbsp;
                        </a>
                </div>

                    <!--
                    <text class="text-secondary " >|</text>
                    -->
                <div class="p-4 text-start">
                        <a HREF="/nested/aboutUs.html" class=" text-decoration-none btn-floating m-1"  role="button">
                            <i class="bi bi-info-square text-primary"></i>   &nbsp;&nbsp;<text class="text-decoration-none text-secondary" >¿ Que es Horapo ?</text>&nbsp;&nbsp;&nbsp;&nbsp;
                        </a>
                </div>

                <div class="p-4 text-start">
                        <a HREF="/nested/contactUs.html" class=" text-decoration-none btn-floating m-1"  role="button">
                            <i class="bi bi-envelope-open-heart"></i>    &nbsp;&nbsp;<text class="text-decoration-none text-secondary" >Contactanos</text>&nbsp;&nbsp;&nbsp;&nbsp;
                        </a>
                </div>

                <div style="height: 16em">

                </div>


    </div>


    </div>


    <div class="d-flex justify-content-center">
      <PublicShareSite v-on:closePublicShareSite="closePublicShareSite"  v-if="showShareSite" style="position: absolute; top: 3em;  z-index: 9;  border-bottom-left-radius: 10px 10px;border-radius: 15px;" ></PublicShareSite>
      <RecoverAppointmentsForm v-on:closeRecoverAppointmentForm="closeRecoverAppointmentForm" v-if="showRecoverAppointment" style="position: absolute; top: 3em;  z-index: 9;  border-radius: 15px;"></RecoverAppointmentsForm>
      
    </div>
    

      

</div>

</template>

<style scoped>

</style>

<script>
//const showForm = ref(false)


export default {
 data : function() {
    return {
        show_sub_menu : false,
        showRecoverAppointment: false ,
        showShareSite : false ,
        }
  },

 props: [],
 emits: [] , 
      
    computed: {
	},

	watch: {
    },

	methods: {
        closePublicShareSite()
        { 
            this.showShareSite = false 
        },  

        showRecoverAppFunction()
        {
            console.log("show recover appointment")
            this.showRecoverAppointment = true 
        },  

        closeRecoverAppointmentForm()
        {
            this.showRecoverAppointment = false 
        },

        closeAllDialog()
        {
        this.show_sub_menu = false 
        this.showRecoverApp = false 
        this.showShareSite = false 
        },

	},

}
</script>