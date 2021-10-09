<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AppointmentAvailable from './appointmentAvailable.vue'
import AppointmentReserved from  './appointmentReserved.vue'
import ModalCreateAppointment from './modalCreateAppointment.vue';


</script>

<template>

 <div id="search_result">

<ModalCreateAppointment :daterequired='daterequired' :hourCreate='hourCreate' :session_params='session_params' > </ModalCreateAppointment>

     <div class=" text-secondary d-flex  calendarlist" >
            
            <div class="display-2 p-1" >
                <i class="bi bi-smartwatch"></i>
            </div>
        
            <div class="w-100 display-5 p-1"  >
               Copiar dia <i class="bi bi-box-arrow-right"></i>
            </div>

            <div class="display-5 p-1 " >
            </div>

        </div>

    <div v-for="(hour) in hours" :key="hour" >
        <div class="d-flex mt-3" >
            
            <div class="text-secondary display-3" >
                {{ hour.app_start }}:00
            </div>
            <div class=" display-5 w-100   text-center" >
                <i class="text-secondary bi bi-slash-circle"></i>
            </div>

            <div class="display-5" >
                <i class="text-secondary bi bi-clipboard-plus" v-on:click="displayModalCreateApp(hour)" ></i>
            </div>

        </div>
        <hr/>
    </div>

    
    <div v-for="(appointment) in appointments" :key="appointment.id" >
        
        <div v-if="sameCenter(appointment.center_name)" >
        <!-- do Nothing --> 
        </div>
        
        <div v-else>
          <!-- INCLUDE CENTER NAME -->
          <br/>
            <div class="d-flex p-10 justify-content-between  mb-2 text-muted"  :style="{'background-color' : '#'+appointment.center_color }" >
                <div class="display-1 w-20">
                    <i class="fas fa-running "></i>    
                    <i class="fas fa-caret-right"></i>
                    <i class="fas fa-clinic-medical"></i>
                </div>
                <div class="w-80 ml-3 ">
                        {{appointment.center_name}} <br>
                        {{appointment.center_address}}
                </div>
            </div>
        </div>
        <div v-if="appointment.app_available == false ">
            <AppointmentReserved :appointment='appointment' :index="index" > </AppointmentReserved>
        </div>
        <div v-else>
            <AppointmentAvailable :appointment='appointment' :index="index" > </AppointmentAvailable>
        </div>
    
<!--
    <ModalAppointmentDetails :appointment="appointment" :index="index"></ModalAppointmentDetails> 
    <ModalReserve :appointment="appointment" :index="index"></ModalReserve> 
-->
    </div>

	<div class="mt-3 d-flex justify-content-between" >	
			<div class="m-2">
			</div>
			
			<div class="m-2 display-3 bg-success p-2 text-white"   data-bs-toggle="modal" data-bs-target="#add_hours_agenda"  >
			    <i class="bi bi-clipboard-plus" ></i> Agregar Horas
			</div>
			
			<div class="m-2">
			</div>
	</div>
    
    <!--
    <ModalAddHours :session_params="session_params" :centers="centers"  :daterequired="daterequired" ></ModalAddHours> 
	<ModalDuplicateDay :session_params="session_params"  :daterequired="daterequired" > </ModalDuplicateDay> 
	-->
</div>

</template>

<style scoped>

    .calendarlist {
    background-color:#DAEFF3
        }

</style>


<script>

export default {
   data : function() {
        return {
            hours : [
                {app_start:'00',  app_duration : '60' }, 
                {app_start:'01',  app_duration : '60' },
                 ]  ,
            
            //hr:'01', '02', '03', '04', '05','06','07','08','09','10', '11','12','13','14','15','16','17','18','19','20','21','22','23' ],
            hourCreate : null ,
        }   
    },
   	
   props: ['daterequired','session_params','appointments'],

	created () {
       // console.log("Appointments in listAppointments = "+JSON.stringify(appointments) );
	},

	methods :{

        displayModalCreateApp(ahour)
        {
            this.hourCreate = ahour ;
            console.log("Display Modal Create App:"+this.hourCreate+" Day:"+this.daterequired );
            
        },

 

    }
}
</script>

