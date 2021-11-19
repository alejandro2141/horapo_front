<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AppointmentAvailable from './appointmentAvailable.vue'
import AppointmentReserved from  './appointmentReserved.vue'
import ModalCreateAppointment from './modalCreateAppointment.vue';
import ModalShowAppointmentDetails from './modalShowAppointmentDetails.vue';
import ModalShowAppointmentTaken  from './modalShowAppointmentTaken.vue';
import ModalProfessionalReserveAppointment from './modalProfessionalReserveAppointment.vue';



</script>

<template>

 <div id="search_result" class="border">

<ModalCreateAppointment  v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourCreate='hourCreate' :session_params='session_params'  v-on:switchView='switchView' :global_comunas="global_comunas" > </ModalCreateAppointment>
<ModalShowAppointmentDetails v-on:showReserveModal="showReserveModal" v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourDetails='hourDetails' :session_params='session_params' > </ModalShowAppointmentDetails>
<ModalShowAppointmentTaken v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourTaken='hourTaken' :session_params='session_params' > </ModalShowAppointmentTaken>
<ModalProfessionalReserveAppointment  v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourToReserve='hourToReserve' :session_params='session_params' > </ModalProfessionalReserveAppointment>

     <div class="d-flex justify-content-around  listHoursHeader" >
            
            <div class="display-6" style="margin-left : 1em" >
                <i class="bi bi-smartwatch"></i>
            </div>
            
            <div>

            </div>
        
        
            <div @click="duplicateDay(daterequired)" class=" text-primary"  >
             Duplicar dia  <i class="bi bi-box-arrow-right"></i>
            </div>



        </div>

    <div v-for="(hour) in hours" :key="hour"  >
      
                 <div v-if="hour.app_available != null" >
                
                    <div v-if="hour.app_available == false ">
                        <AppointmentReserved v-on:click="displayModalReservedDetails(hour)" :appointment='hour' :index="hour.id" :global_specialties='global_specialties' > </AppointmentReserved>
                    </div>
                    <div v-else>
                        <AppointmentAvailable  v-on:click="displayModalViewAppDetails(hour)" :appointment='hour' :index="hour.id"  :global_specialties='global_specialties' > </AppointmentAvailable>
                    </div>

                </div>
       
                <div v-else class="d-flex justify-content-around">

                    <div class="text-secondary display-5" >
                        {{ hour.start_time.substring(0,5) }}
                    </div>
                    
                    <div class="  text-center" >
                        <!--  <i class="text-secondary bi bi-slash-circle"></i> -->
                    </div>

                    <div class="h1 m-2" >
                        <i class="text-primary bi bi-clipboard-plus" v-on:click="displayModalCreateApp(hour)" > </i>
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

    .listHoursHeader {
    background-color:#d3d3d3
        }

</style>


<script>

export default {
   data : function() {
        return {
            hours : [] ,
            
            //hr:'01', '02', '03', '04', '05','06','07','08','09','10', '11','12','13','14','15','16','17','18','19','20','21','22','23' ],
            hourCreate : null ,
            hourDetails : null ,
            hourTaken : null ,
            hourToReserve : null ,
            prevCenterName : 'NoSet' ,
        }   
    },
   	
   props: ['daterequired','session_params','appointments','global_specialties', 'global_comunas'  ],
   emits: ['updateAppointmentList','switchView' ] , 
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
                            { "start_time" : "15:00" }, 
                            { "start_time" : "16:00" }, 
                            { "start_time" : "17:00" }, 
                            { "start_time" : "18:00" }, 
                            { "start_time" : "19:00" }, 
                            { "start_time" : "20:00" }, 
                            { "start_time" : "21:00" }, 
                            { "start_time" : "22:00" }, 
                            { "start_time" : "23:00" }, 
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
        duplicateDay(date){
            console.log("duplicate day in list appointments "+date) ; 
        },
        switchView(){
            this.$emit('switchView');
         },

        showReserveModal(hour)
        {
            console.log ("show Reserve Modal in ListAppointment ")
            this.hourToReserve = hour;
        },
        
       displayModalReservedDetails(hour)
       {
            console.log ("Display Modal Reserved APP!")
            this.hourTaken=hour ;
       },


        displayModalViewAppDetails(hour)
        {
        console.log("Display Modal View App Details :"+JSON.stringify(hour));
        this.hourDetails = hour; 
        },

        displayModalCreateApp(ahour)
        {
            this.hourCreate = ahour ;
            console.log("Display Modal Create App:"+this.hourCreate.start_time+" Day:"+this.daterequired );
            
        },
        updateAppList()
        {
            console.log("Update App List in List Appointments");
            this.$emit('updateAppointmentList');
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

