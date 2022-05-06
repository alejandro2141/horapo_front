<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AppointmentAvailable from './appointmentAvailable.vue'
import AppointmentReserved from  './appointmentReserved.vue'
import ModalCreateAppointment from './modalCreateAppointment.vue';
import ModalShowAppointmentDetails from './modalShowAppointmentDetails.vue';
import ModalShowAppointmentTaken  from './modalShowAppointmentTaken.vue';
import ModalProfessionalReserveAppointment from './modalProfessionalReserveAppointment.vue';
import ModalDuplicateDay from './modalDuplicateDay.vue';



</script>

<template>

 <div id="search_result" class="border">
<ModalDuplicateDay :session_params='session_params' :daterequired='daterequired' :openModalDuplicateDay='openModalDuplicateDay' :appointments_day='appointments_day' :global_comunas='global_comunas' :global_specialties='global_specialties' > </ModalDuplicateDay>

<ModalCreateAppointment  v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourCreate='hourCreate' :session_params='session_params'  v-on:switchView='switchView' :global_comunas="global_comunas" :global_specialties='global_specialties'  :openModalCreateAppEvent='openModalCreateAppEvent' > </ModalCreateAppointment>
<ModalShowAppointmentDetails v-on:showReserveModal="showReserveModal" v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourDetails='hourDetails' :session_params='session_params' :openModalShowDetailsEvent="openModalShowDetailsEvent" :global_comunas='global_comunas' :global_specialties='global_specialties'  > </ModalShowAppointmentDetails>

<ModalProfessionalReserveAppointment  v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourToReserve='hourToReserve' :session_params='session_params' :openModalReserveAppEvent='openModalReserveAppEvent' :global_comunas='global_comunas' :global_specialties='global_specialties'> </ModalProfessionalReserveAppointment>

<ModalShowAppointmentTaken v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourTaken='hourTaken' :session_params='session_params' :openModalShowAppTakenEvent='openModalShowAppTakenEvent' :global_comunas='global_comunas' :global_specialties='global_specialties'  > </ModalShowAppointmentTaken>


 <!--
    <div class="d-flex justify-content-around  listHoursHeader" >

      
            <div class="display-6" style="margin-left : 1em" >
             
            </div>
            
            <div>
            </div>
        
            
            <div @click="duplicateDay(daterequired)" class=" text-primary"  >
             Duplicar dia  <i class="bi bi-box-arrow-right"></i>
            </div>
          

    </div>
<hr>
-->


    <div v-for="(hour) in hours" :key="hour"  >
      
                <div v-if="hour.app_available != null"  >
                    <div v-if="!hour.app_available">
                        <AppointmentReserved v-on:click="displayModalReservedDetails(hour)" :appointment='hour' :index="hour.id" :global_specialties='global_specialties' :global_comunas='global_comunas' :session_params='session_params' > </AppointmentReserved>
                    </div>
                    <!--
                    <div v-else>
                        <AppointmentAvailable  v-on:click="displayModalViewAppDetails(hour)" :appointment='hour' :index="hour.id"  :global_specialties='global_specialties' :global_comunas='global_comunas' > </AppointmentAvailable>
                    </div>
                    -->
                </div>
       
                <div v-else class="d-flex justify-content-between mt-1  text-secondary border border-secondary" :style="{ 'background-color' : hour.center_color  }"  style="border-radius: 15px;" @click="displayModalAppAvailable(hour)" >
                    
                    <div class="d-flex justify-content-start display-6"  >
                             <text class="p-1" >
                                        <i v-if="hour.center_visit" class=" bi bi-building"></i>      
                                        <i v-if="hour.home_visit"  class=" bi bi-house-door" > </i>                                  
                                        <i v-if="hour.remote_care" class=" bi bi-camera-video"></i> 
                             </text> 
                             <text class="p-1  "> {{ hour.start_time.substring(0,5) }} </text>
                             
                             <text class="p-1  "><small> {{specialtyId2name(hour.specialty)}} </small> </text>
                     </div>    

                    <text></text>        

                    <i class="display-4 bi bi-plus"></i>

                </div>

       <!--    <hr :style="{'width': calculateLineExtension(hour)+'rem'}" style="margin: 0rem; height:0.5px ; text-align:left; margin-left:0 ; border : 1px solid black; " > -->
         <!--   <hr style="margin-top: 0.0rem; margin-bottom: 0.1rem;" />   -->
    </div>


    <div v-if="hours.length == 0 " class="d-flex justify-content-between mt-1  "  style="border-radius: 15px;" >
            
                <div class="p-4 text-center" >    
                    <i class="display-1 bi bi-emoji-expressionless"></i><br>
                  No existen Horarios o  Citas Reservadas para este dia
                </div>

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
    background-color:#ffffff
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
            openModalShowDetailsEvent : null ,
            openModalShowAppTakenEvent : null ,
            openModalCreateAppEvent : null,
            openModalReserveAppEvent : null,
            openModalDuplicateDay : null ,
            appointments_day : null ,
        }   
    },
   	
   props: ['daterequired','session_params','appointments',  'calendars_marks' , 'global_specialties', 'global_comunas'  ],
   emits: ['updateAppointmentList','switchView' ] , 
	created () {
       // console.log("Appointments in listAppointments = "+JSON.stringify(appointments) );
	},
    
    watch : {
        appointments(newValue){
                //copy array including only app to be display in Modal duplicate day
                this.appointments_day = [].concat(newValue);

            console.log("appointment_day:"+JSON.stringify(this.appointments_day));  
            
            this.hours = [] ;          
 
            this.showModalCreateApp= true ;
            console.log ("appointments change !!!");
            let poped = newValue.pop() ;
      
            while ( poped != null )
            {  
            
             let appointment_taken = {
                 id :  poped.id ,
                 calendar_id : poped.calendar_id,
                 date : poped.date ,
                 start_time :  poped.start_time , 
                 duration : poped.duration ,
                 patient_doc_id : poped.patient_doc_id ,
                 patient_name : poped.patient_name ,
                 patient_email : poped.patient_email ,
                 patient_phone1 : poped.patient_phone1 ,
                 patient_phone2 : poped.patient_phone2 ,
                 app_status : poped.app_status , 

                 patient_notification_email_reserved : poped.patient_notification_email_reserved ,
                 patient_address : poped.patient_address , 
                 patient_age  : poped.patient_age ,  
                 specialty : poped.specialty1 , 
            
                  home_visit : poped.home_visit ,
                  center_visit :poped.center_visit ,
                  remote_care : poped.remote_care ,
            
                  center_id :poped.center_id ,
                  center_color : poped.center_color ,
                  app_available : poped.app_available , 
                  symbol1 : "" ,
                  message1 : poped.message1 
                }
            
            
            this.hours.push( appointment_taken )    
            console.log( "StartTime POP="+JSON.stringify(poped.start_time ) ) 
            poped = newValue.pop() ;
            } 
            //this.hours.sort();
            //paint based in Calendar Color. 

             this.hours.sort(function(a, b){
            let x = a.start_time;
            let y = b.start_time
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
            });

            console.log("HOURS="+JSON.stringify(this.hours) ) 
            

        }
    },

	methods :{
        displayModalAppAvailable(hour)
        {
            console.log("display Modal App Available Start TIme: "+hour.start_time.substring(0,5));
            this.hourToReserve=hour;
            this.openModalReserveAppEvent = Math.random();
        },

        duplicateDay(date){
            console.log("duplicate day in list appointments "+date) ; 
            console.log("Session Params "+JSON.stringify(this.session_params) ) ;
            this.openModalDuplicateDay= Math.random(); 
        },

        switchView(){
            this.$emit('switchView');
         },

        showReserveModal(hour)
        {
            console.log ("show Reserve Modal in ListAppointment ")
            this.hourToReserve = hour;
            this.openModalReserveAppEvent = Math.random(); 
        },
        
       displayModalReservedDetails(hour)
       {
            console.log ("Display Modal Reserved APP!")
            this.hourTaken=hour ;
            this.openModalShowAppTakenEvent = Math.random();
       },


        displayModalViewAppDetails(hour)
        {
            console.log("Display Modal View App Details :"+JSON.stringify(hour));
            this.hourDetails = hour; 
            this.openModalShowDetailsEvent = Math.random();
        },

        displayModalCreateApp(ahour)
        {
            this.hourCreate = ahour ;
            console.log("Display Modal Create App:"+this.hourCreate.start_time+" Day:"+this.daterequired );
            this.openModalCreateAppEvent = Math.random();
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

        specialtyId2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },

 

    }
}
</script>

