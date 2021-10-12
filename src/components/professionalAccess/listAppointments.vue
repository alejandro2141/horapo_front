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

    <div v-for="(hour) in hours" :key="hour"  >
      
                 <div v-if="hour.app_available != null" >
                
                    <div v-if="hour.app_available == false ">
                        <AppointmentReserved :appointment='hour' :index="hour.id" > </AppointmentReserved>
                    </div>
                    <div v-else>
                        <AppointmentAvailable :appointment='hour' :index="hour.id" > </AppointmentAvailable>
                    </div>

                </div>
       
                <div v-else class="d-flex mt-0">

                    <div class="text-secondary" >
                        {{ hour.start_time.substring(0,5) }}
                    </div>
                    <div class=" display-6 w-100   text-center" >
                      ---  <!--  <i class="text-secondary bi bi-slash-circle"></i> -->
                    </div>

                    <div class="display-6" >
                        <i class="text-secondary bi bi-clipboard-plus" v-on:click="displayModalCreateApp(hour)" ></i>
                    </div>


                </div>


        
        <hr style="margin-top: 0.0rem; margin-bottom: 0.1rem;" />
    </div>

    <!-- 
    <div v-for="(hour) in hours" :key="hour.id" >

        <div v-if="hour.app_available != null" >
           
            <div v-if="hour.app_available == false ">
                <AppointmentReserved :appointment='hour' :index="hour.id" > </AppointmentReserved>
            </div>
            <div v-else>
                <AppointmentAvailable :appointment='hour' :index="hour.id" > </AppointmentAvailable>
            </div>

        </div>
    -->
<!--
    <ModalAppointmentDetails :appointment="appointment" :index="index"></ModalAppointmentDetails> 
    <ModalReserve :appointment="appointment" :index="index"></ModalReserve> 
-->
   
<!--
	<div class="mt-3 d-flex justify-content-between" >	
			<div class="m-2">
			</div>
			
			<div class="m-2 display-3 bg-success p-2 text-white"   data-bs-toggle="modal" data-bs-target="#add_hours_agenda"  >
			    <i class="bi bi-clipboard-plus" ></i> Agregar Horas
			</div>
			
			<div class="m-2">
			</div>
	</div>
    -->
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
            hours : [] ,
            
            //hr:'01', '02', '03', '04', '05','06','07','08','09','10', '11','12','13','14','15','16','17','18','19','20','21','22','23' ],
            hourCreate : null ,
            prevCenterName : 'NoSet' ,
        }   
    },
   	
   props: ['daterequired','session_params','appointments'],

	created () {
       // console.log("Appointments in listAppointments = "+JSON.stringify(appointments) );
	},
    
    watch : {
        appointments(newValue){         
            this.hours = [  { "start_time" : "00:00" },
                            { "start_time" : "01:00" },
                            { "start_time" : "02:00" },
                            { "start_time" : "03:00" },   
                            { "start_time" : "04:00" },
                            { "start_time" : "05:00" },
                            { "start_time" : "06:00" },
                            { "start_time" : "07:00" },   
                            { "start_time" : "08:00" },
                            { "start_time" : "09:00" },
                            { "start_time" : "10:00" },   
                            { "start_time" : "11:00" },
                            { "start_time" : "12:00" },
                            { "start_time" : "13:00" },
                            { "start_time" : "14:00" },   
                            
                            ];

            this.showModalCreateApp= true ;
            console.log ("appointments change !!!");
            let poped = newValue.pop() ;
            
            console.log ("appointments change !!!");
            
            while ( poped != null )
            {  
            this.hours.push( poped )    
            console.log( "StartTime POP="+JSON.stringify(poped.start_time ) ) 
            poped = newValue.pop() ;
            } 
            //this.hours.sort();

             this.hours.sort(function(a, b){
            let x = a.start_time;
            let y = b.start_time
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
            });

            

        }
    },

	methods :{

        displayModalCreateApp(ahour)
        {
            this.hourCreate = ahour ;
            console.log("Display Modal Create App:"+this.hourCreate.start_time+" Day:"+this.daterequired );
            
        },

        sameCenter(center){
        console.log ("Compare cen Name  center:"+center+" prevCenterName:"+this.prevCenterName+" resultComparison "+center.localeCompare(this.prevCenterName)   );
           if (center.localeCompare(this.prevCenterName) === 0 )
            {   
                return true ;
            }
            else{
                this.prevCenterName=center;
                return false;
            //  this.prevCenterName=center;
            }
        },  

 

    }
}
</script>

