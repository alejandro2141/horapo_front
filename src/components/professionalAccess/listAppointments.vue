<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AppointmentAvailable from './appointmentAvailable2.vue'
import AppointmentReserved from  './appointmentReserved.vue'
import ModalCreateAppointment from './modalCreateAppointment.vue';
import ModalShowAppointmentDetails from './modalShowAppointmentDetails.vue';
import ModalShowAppointmentTaken  from './modalShowAppointmentTaken.vue';
import ModalProfessionalReserveAppointment from './modalProfessionalReserveAppointment.vue';


</script>

<template>

 <div id="search_result" class="">
<!--
<ModalCreateAppointment  v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourCreate='hourCreate' :session_params='session_params'  v-on:switchView='switchView' :global_comunas="global_comunas" :global_specialties='global_specialties'  :openModalCreateAppEvent='openModalCreateAppEvent' > </ModalCreateAppointment>

<ModalShowAppointmentDetails v-on:showReserveModal="showReserveModal" v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourDetails='hourDetails' :session_params='session_params' :openModalShowDetailsEvent="openModalShowDetailsEvent" :global_comunas='global_comunas' :global_specialties='global_specialties'  > </ModalShowAppointmentDetails>
-->

<ModalProfessionalReserveAppointment  v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourToReserve='hourToReserve' :session_params='session_params' :openModalReserveAppEvent='openModalReserveAppEvent' :global_comunas='global_comunas' :global_specialties='global_specialties'> </ModalProfessionalReserveAppointment>
<ModalShowAppointmentTaken v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourTaken='hourTaken' :session_params='session_params' :openModalShowAppTakenEvent='openModalShowAppTakenEvent' :global_comunas='global_comunas' :global_specialties='global_specialties'  > </ModalShowAppointmentTaken>

    <div v-if="appointments_data != null">
        <div v-for="hour in appointments_data.appointments" :key="hour"  >
                
                <div class="m-1">
                    <div v-if="hour.app_available != null"  >
                        <div v-if="!hour.app_available">
                            <AppointmentReserved   v-on:click="displayModalReservedDetails(hour)" :appointment='hour'  :index="hour.id" :global_specialties='global_specialties' :global_comunas='global_comunas' :session_params='session_params' > </AppointmentReserved>
                        </div>
                    </div>

                    <div v-else >
                            <AppointmentAvailable v-on:addToBlockList="addToBlockList"  v-on:displayModalAppAvailable="displayModalAppAvailable(hour)" :days_expired="days_expired" :appointment='hour'  :center_data="appointments_data.centers.find(elem => elem.id ==  hour.center_id  )" :calendar_data="appointments_data.calendars.find(elem => elem.id ==  hour.calendar_id  )" :index="hour.id" :global_specialties='global_specialties' :global_comunas='global_comunas' :session_params='session_params' > </AppointmentAvailable>
                            <!-- @click="displayModalAppAvailable(hour)" -->
                    </div>
                </div>
        </div>
    </div>

    


    <div v-if="appointments_n <= 0 " class="d-flex justify-content-between mt-1  "  style="border-radius: 15px;" >
               
                <div class="p-4 text-center" >    
                    <i class="display-2"></i><br>
                  No existen Horarios o  Citas Reservadas para este dia
                </div>
               
    </div>

    





   
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
            appointments_n : 0 ,

            hours_block_list : [],
        }   
    },
   	
   props: [ 'appointments_data' , 'day_expired' , 'daterequired', 'session_params' ,  'calendars_marks' , 'global_specialties', 'global_comunas'  ],
   emits: ['updateAppointmentList','switchView' , 'addToBlockList' ] , 

	created () {
            // console.log("Appointments in listAppointments = "+JSON.stringify(appointments) );
	},
    
    watch : {
          appointments_data(newValue){
            this.days_expired = (new Date(this.daterequired).getTime() - new Date().getTime() ) < -120000000  ;
            console.log("DAY EXPIRED:"+this.days_expired);
            if (newValue !=null )
            {
                this.appointments_n = newValue.appointments.length
            }
         

          }
    },

	methods :{

        addToBlockList(hour)
        {
            this.$emit('addToBlockList',hour)
            /* 
            console.log("Add to BLock List ")
            let index = this.hours_block_list.findIndex(hour_list=> (hour_list.start_time == hour.start_time) )
            console.log ("FOUND : "+index)
            if ( index > -1) { // only splice array when item is found
               this.hours_block_list.splice(index, 1); // 2nd parameter means remove one item only
            }
            else
            {
              this.hours_block_list.push(hour)  
            }
            */
        },

        getCenter(id){
            let temp= this.centers.find(elem => elem.id ==  id  )
            if (temp != null) { return temp }
            else { return null }
        },
        getCenterName(id){
            let temp= this.centers.find(elem => elem.id ==  id  )
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
/*
        displayModalCreateApp(ahour)
        {
            this.hourCreate = ahour ;
            console.log("Display Modal Create App:"+this.hourCreate.start_time+" Day:"+this.daterequired );
            this.openModalCreateAppEvent = Math.random();
        },
        */
        updateAppList()
        {
            console.log("Update App List in List Appointments");
            this.$emit('updateAppointmentList');
        },

        /*
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
        */  

        specialtyId2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },

 

    }
}
</script>

