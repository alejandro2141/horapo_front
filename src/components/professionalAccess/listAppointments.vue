<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AppointmentAvailable from './appointmentAvailable2.vue'
import AppointmentReserved from  './appointmentReserved.vue'
import ModalCreateAppointment from './modalCreateAppointment.vue';
import ModalShowAppointmentDetails from './modalShowAppointmentDetails.vue';
import ModalShowAppointmentTaken  from './modalShowAppointmentTaken.vue';
import ModalProfessionalReserveAppointment from './modalProfessionalReserveAppointment.vue';
import ModalDuplicateDay from './modalDuplicateDay.vue';



</script>

<template>

 <div id="search_result" class="">
<ModalDuplicateDay :session_params='session_params' :daterequired='daterequired' :openModalDuplicateDay='openModalDuplicateDay' :appointments_day='appointments_day' :global_comunas='global_comunas' :global_specialties='global_specialties' > </ModalDuplicateDay>

<ModalCreateAppointment  v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourCreate='hourCreate' :session_params='session_params'  v-on:switchView='switchView' :global_comunas="global_comunas" :global_specialties='global_specialties'  :openModalCreateAppEvent='openModalCreateAppEvent' > </ModalCreateAppointment>
<ModalShowAppointmentDetails v-on:showReserveModal="showReserveModal" v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourDetails='hourDetails' :session_params='session_params' :openModalShowDetailsEvent="openModalShowDetailsEvent" :global_comunas='global_comunas' :global_specialties='global_specialties'  > </ModalShowAppointmentDetails>

<ModalProfessionalReserveAppointment  v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourToReserve='hourToReserve' :session_params='session_params' :openModalReserveAppEvent='openModalReserveAppEvent' :global_comunas='global_comunas' :global_specialties='global_specialties'> </ModalProfessionalReserveAppointment>

<ModalShowAppointmentTaken v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourTaken='hourTaken' :session_params='session_params' :openModalShowAppTakenEvent='openModalShowAppTakenEvent' :global_comunas='global_comunas' :global_specialties='global_specialties'  > </ModalShowAppointmentTaken>



    <div v-for="(hour) in hours" :key="hour"  >
      
            <div>

                <div v-if="hour.app_available != null"  >
                    <div v-if="!hour.app_available">
                        <AppointmentReserved  v-on:click="displayModalReservedDetails(hour)" :appointment='hour' :index="hour.id" :global_specialties='global_specialties' :global_comunas='global_comunas' :session_params='session_params' > </AppointmentReserved>
                    </div>
                    <!--
                    <div v-else>
                        <AppointmentAvailable  v-on:click="displayModalViewAppDetails(hour)" :appointment='hour' :index="hour.id"  :global_specialties='global_specialties' :global_comunas='global_comunas' > </AppointmentAvailable>
                    </div>
                    -->
                </div>

                <div v-else >
                        <AppointmentAvailable :days_expired="days_expired" @click="displayModalAppAvailable(hour)" :appointment='hour' :index="hour.id" :global_specialties='global_specialties' :global_comunas='global_comunas' :session_params='session_params' > </AppointmentAvailable>
                  
                    <!--
                    <div class="d-flex justify-content-between mb-3">
                    
                        <div class="p-2">
                            <text class="fs-1"> {{ hour.start_time.substring(0,5) }} </text><br>
                            <text class="fs-5" >
                                <i v-if="hour.center_visit" class=" bi bi-building"></i>      
                                <i v-if="hour.home_visit"  class=" bi bi-house-door" > </i>                                  
                                <i v-if="hour.remote_care" class=" bi bi-camera-video"></i>                         
                            </text> 
                        </div>
                    
                        <div  class="w-100 text-white display-6 p-2" :style="{ 'background-color' : hour.calendar_color  }"  style="border-radius: 15px;" @click="displayModalAppAvailable(hour)" >
                            
                            <div class=""  >
                                <text class="" ><small> {{specialtyId2name(hour.specialty)}} </small> </text>
                            </div>  
                           
                            <div class="">
                                <text class="" > 
                                     <small> <small> {{ getCenterName(hour.center_id) }} </small> </small>
                                </text>
                            </div>
                        </div>
                    </div>
                    -->
                 </div>

            </div>

      
    </div>


    <div v-if="hours.length == 0  && !this.showSpinner" class="d-flex justify-content-between mt-1  "  style="border-radius: 15px;" >
                <!--
                <div class="p-4 text-center" >    
                    <i class="display-1 bi bi-emoji-expressionless"></i><br>
                  No existen Horarios o  Citas Reservadas para este dia
                </div>
                -->

    </div>

    





   
</div>

</template>

<style scoped>

    .listHoursHeader {
    background-color:#ffffff
    }

.patron1 {
    background:url(
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAADdJREFUKFNjZCASMCKrm7635D8yP9O5By4PZ6ArgmmAKQYrxKUIWfFAK8TnThTPwBxNVPAQCncADZ8gC5x6AJ4AAAAASUVORK5CYII=       )
              }

.patron2 {
    background:url(
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAADBJREFUKFNjZCASMKKrm7635D9ILNO5B0WORgph1uFyLsgZYKuJVohsEp09Q0yYAwDC8CALmx4W/gAAAABJRU5ErkJggg==)
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

            days_expired :false ,
        }   
    },
   	
   props: ['day_expired','daterequired','session_params','appointments',  'calendars_marks' , 'global_specialties', 'global_comunas'  ],
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
                  calendar_color : poped.calendar_color ,

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
            this.days_expired = (new Date(this.daterequired).getTime() - new Date().getTime() ) < -120000000  ;
            console.log("DAY EXPIRED:"+this.days_expired);


        }
    },

	methods :{

        getCenter(id){
            let temp= this.session_params.centers.find(elem => elem.id ==  id  )
            if (temp != null) { return temp }
            else { return null }
        },
        getCenterName(id){
            let temp= this.session_params.centers.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return "No Existe Centro" }
        },
        displayModalAppAvailable(hour)
        {
            if (!this.days_expired )
            {
            console.log("display Modal App Available Start TIme: "+hour.start_time.substring(0,5));

            this.hourToReserve=hour;
            this.openModalReserveAppEvent = Math.random();
            }

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
           if (this.display)
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

