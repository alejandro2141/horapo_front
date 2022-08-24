<script setup>
import { ref } from 'vue'
import axios from 'axios'

import AppointmentBlockedProfessional from './appointmentBlockedByProfessional.vue'
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

    <div class="d-flex  justify-content-start fs-4" > 
       
        <div v-if="isLockDay"   >
            &nbsp;&nbsp;&nbsp;&nbsp;   <i @click="sendUnLock()" class=" m-2 fs-1 bi bi-lock-fill text-primary" ></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <text class=""><small><i> Dia Cerrado </i> </small></text>
        </div>
        <div v-else>
            &nbsp;&nbsp;&nbsp;&nbsp;  <i class=" m-2 fs-1 bi bi-unlock "  @click="sendLock()"> </i> 
        </div>    

        
       


    </div>
    
    <div v-if="appointments_data != null">
        <div v-for="hour in filteredAppList" :key="hour"  >
                
                <div class="m-1">

                    <div v-if="hour.app_available != null"  >
                        
                        <div v-if="hour.app_available ">
                            <AppointmentAvailable v-on:addToBlockList="addToBlockList"  v-on:displayModalAppAvailable="displayModalAppAvailable(hour)" :days_expired="days_expired" :appointment='hour'  :center_data="appointments_data.centers.find(elem => elem.id ==  hour.center_id  )" :calendar_data="appointments_data.calendars.find(elem => elem.id ==  hour.calendar_id  )" :index="hour.id" :global_specialties='global_specialties' :global_comunas='global_comunas' :session_params='session_params' > </AppointmentAvailable>
                        </div>

                         <!-- APP NOT AVAILABLE-->
                        <div v-else >
                            
                            <div v-if="hour.app_blocked==1" >
                                <AppointmentBlockedProfessional v-on:addToBlockList="addToBlockList"  v-on:displayModalAppAvailable="displayModalAppAvailable(hour)" :days_expired="days_expired" :appointment='hour'  :center_data="appointments_data.centers.find(elem => elem.id ==  hour.center_id  )" :calendar_data="appointments_data.calendars.find(elem => elem.id ==  hour.calendar_id  )" :index="hour.id" :global_specialties='global_specialties' :global_comunas='global_comunas' :session_params='session_params' > </AppointmentBlockedProfessional>
                            </div>
                            <div v-else>    
                                <AppointmentReserved   v-on:click="displayModalReservedDetails(hour)" :appointment='hour'  :index="hour.id" :global_specialties='global_specialties' :global_comunas='global_comunas' :session_params='session_params' > </AppointmentReserved>
                            </div>

                        </div>

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

            isLockDay : null ,

            filteredAppList : [] , 
        }   
    },
   	
   props: [ 'filterApps' , 'lock_dates' , 'appointments_data' , 'day_expired' , 'daterequired', 'session_params' ,  'calendars_marks' , 'global_specialties', 'global_comunas'  ],
   emits: [ 'updateAppointmentList' , 'switchView' , 'addToBlockList' ] , 

	created () {
            // console.log("Appointments in listAppointments = "+JSON.stringify(appointments) );
	},
    
    watch : {
        // NO SE ACTUALIZAAAA
          filterApps(filter)
          {
              console.log("filterAPpps changed here too :"+JSON.stringify(filter) )
              if (filter.reserved)
              {
              this.filteredAppList =  this.appointments_data.appointments.filter(app => app.app_blocked != 1 && app.app_available == false )
              }
              else 
              {
                this.filteredAppList = this.appointments_data.appointments ; 
              }
              
          },

          appointments_data(newValue){        
            //check if Day is expired
            this.days_expired = (new Date(this.daterequired).getTime() - new Date().getTime() ) < -120000000  ;
            console.log("DAY EXPIRED:"+this.days_expired);
          
            if (newValue !=null )
            {
                this.appointments_n = newValue.appointments.length
                this.filteredAppList = this.appointments_data.appointments ;
                //IF Filter Only Reserved
               
                
            }
            //check if date is a blocked date
            if (this.lock_dates!=null)
            {
                if (this.lock_dates.includes(this.daterequired)){
                this.isLockDay=true
                }
                else{
                this.isLockDay=false
                }
            } 

         },


        },

	methods :{

        filterReserved(apps)
        {   
         this.filteredAppList =  apps.filter(app => app.app_blocked !=1 && app.app_available == false   )
        },

        async  sendLock(hour)
            {
              console.log("professional_send Lock");
              if (this.hours_block_list !=null && this.hours_block_list.length > 0   )
              {
                var r = confirm("Esta seguro que desea bloquear estas Horas? Pacientes no podran agendar horas en este dia");               
                             if (r == true) {
                                const json = {  
                                    token: 'apsfdnwe', 
                                    appointment_date : this.daterequired ,                         
                                    lock_apps :   this.hours_block_list , 
                                    professional_id  : this.session_params.professional_id 	, 
                                };

                                console.log ("professional_lock_apps  REQUEST :"+ JSON.stringify(json)  );
                                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_block_appointments",json );
                                //console.log ("RESPONSE save_appointmentJSON.stringify(response_json) :"+JSON.stringify(response_json)) ;
                                console.log ("RESPONSE professional_lock_apps :"+JSON.stringify(response_json)) ;
                                //this.appointment_confirm = response_json.data ;
                                this.$emit('updateAppointmentList');
                                }
              
              }
              else
              {                
                var r = confirm("Esta seguro que desea bloquear este dia? Pacientes no podran agendar horas en este dia");
                            if (r == true) {
                                const json = {  
                                    token: 'apsfdnwe',                         
                                    appointment_date : this.daterequired , 
                                    appointment_professional_id  : this.session_params.professional_id 	, 
                                };

                                console.log ("professional_lock_day  REQUEST :"+ JSON.stringify(json)  );
                                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_lock_day",json );
                                //console.log ("RESPONSE save_appointmentJSON.stringify(response_json) :"+JSON.stringify(response_json)) ;
                                console.log ("RESPONSE professional_lock_day :"+JSON.stringify(response_json.data)) ;
                                this.appointment_confirm = response_json.data ;
                                //console.log ("We should display a Confirmation Modal now"+JSON.stringify(appointment_confirm) );
                                this.$emit('updateAppointmentList');
                                }
              }

              this.hours_block_list = []

            },

            async  sendUnLock(hour)
            {
                console.log("professional_UN lock");
                var r =confirm("DESBLOQUEAR este dia? Pacientes SI podrán agendar horas en este dia");
                            if (r == true) {
                                const json = {  
                                    token: 'apsfdnwe',                         
                                    appointment_date : this.daterequired , 
                                    appointment_professional_id  : this.session_params.professional_id 	, 
                                };

                                console.log ("professional_lock_day  REQUEST :"+ JSON.stringify(json)  );
                                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_unlock_day",json );
                                //console.log ("RESPONSE save_appointmentJSON.stringify(response_json) :"+JSON.stringify(response_json)) ;
                                console.log ("RESPONSE professional_lock_day :"+JSON.stringify(response_json.data)) ;
                                this.appointment_confirm = response_json.data ;
                                //console.log ("We should display a Confirmation Modal now"+JSON.stringify(appointment_confirm) );
                                this.$emit('updateAppointmentList');
                                }
            },

        addToBlockList(hour)
        {
            console.log("PROCESS BLOCK LIST");
            let index = this.hours_block_list.findIndex(hour_list=> (hour_list.start_time == hour.start_time) )
            console.log ("FOUND : "+index)
            if ( index > -1) { // only splice array when item is found
               this.hours_block_list.splice(index, 1); // 2nd parameter means remove one item only
               console.log("PROCESS BLOCK LIST -- REMOVE:");
            }
            else
            {
              this.hours_block_list.push(hour)  
               console.log("PROCESS BLOCK LIST -- ADD :");
            }  
            console.log("PROCESS BLOCK LIST:"+JSON.stringify(this.hours_block_list) );
           // this.$emit('addToBlockList',hour)
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

