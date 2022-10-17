<script setup>
import { ref } from 'vue'
import axios from 'axios'

import AppointmentBlockedProfessional from './appointmentBlockedByProfessional.vue'
import AppointmentAvailable from './appointmentAvailable2.vue'
import AppointmentReserved from  './appointmentReserved.vue'
import ModalCreateAppointment from './modalCreateAppointment_eliminar.vue';
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

    <div class="m-1 d-flex  justify-content-start fs-4 d-flex justify-content-between" > 
        <div>
            <!-- <div v-if="isLockDay"   > -->
             <div v-if="isLockDay"   >    
                &nbsp; <i @click="sendUnLock()" class=" fs-1 bi bi-lock-fill text-primary" > </i><small></small> 
            </div>
            <div v-else>
                &nbsp; <i class=" fs-1 bi bi-unlock "  @click="sendLock()"> </i> 
            </div>   
        </div>
        <div class="d-flex justify-content-around" >
                <small>
                <small>
                    <text @click="apply_filter_reserved  =! apply_filter_reserved " class=""  :class="{ 'activeFilter' : apply_filter_reserved }" >   Reserv {{dayStatics.reserved}} </text>  &nbsp;&nbsp;&nbsp;&nbsp;
                    <text @click="apply_filter_available =! apply_filter_available" class=""  :class="{ 'activeFilter' : apply_filter_available }" >  Disp {{dayStatics.available}} </text>  &nbsp;&nbsp;&nbsp;&nbsp;
                    <text @click="apply_filter_total =! apply_filter_total" class=""  :class="{ 'activeFilter' : apply_filter_total }"  >  Total {{dayStatics.total}} </text>  &nbsp;&nbsp;&nbsp;&nbsp;
                </small>    
                </small>   
        </div> 
        <div>
          
        </div> 

    </div>
    
    <div v-if="filteredAppList != null && filteredAppList.length >0 && appointments_data.calendars != null && appointments_data.calendars.length > 0 ">
        <div v-for="hour in filteredAppList" :key="hour"  >
                
                <div class="m-1">

                    <div v-if="hour.app_available != null"  >
                        
                        <div v-if="hour.app_available">
                            <AppointmentAvailable v-on:addToBlockList="addToBlockList"  v-on:displayModalAppAvailable="displayModalAppAvailable(hour)" :days_expired="days_expired" :appointment='hour' :specialty_data="appointments_data.specialties.find(elem => elem.id ==  hour.specialty  )" :center_data="appointments_data.centers.find(elem => elem.id ==  hour.center_id  )" :calendar_data="appointments_data.calendars.find(elem => elem.id ==  hour.calendar_id  )"  :session_params='session_params' > </AppointmentAvailable>
                        </div>

                         <!-- APP NOT AVAILABLE-->
                        <div v-else >
                            
                            <div v-if="hour.app_blocked==1" >
                                <AppointmentBlockedProfessional v-on:addToBlockList="addToBlockList"  v-on:displayModalAppAvailable="displayModalAppAvailable(hour)" :days_expired="days_expired" :appointment='hour'  :center_data="appointments_data.centers.find(elem => elem.id ==  hour.center_id  )" :calendar_data="appointments_data.calendars.find(elem => elem.id ==  hour.calendar_id  )" :index="hour.id" :global_specialties='global_specialties' :global_comunas='global_comunas' :session_params='session_params' > </AppointmentBlockedProfessional>
                            </div>
                            <div v-else>    
                                <AppointmentReserved   v-on:displayModalReservedDetails="displayModalReservedDetails" :appointment='hour'  :index="hour.id" :global_specialties='global_specialties' :global_comunas='global_comunas' :session_params='session_params' > </AppointmentReserved>
                            </div>

                        </div>

                    </div>

                </div>
        </div>
    </div>

    <div v-if="isLockDay "   >    
    
    Is a lock day
    
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

    .activeFilter {
    text-decoration: underline;
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
            //**** to filter
            apply_filter_reserved: false ,
            apply_filter_available : false ,
            apply_filter_total : false ,
            filterApps : { reserved  : false , blocked : false ,  available : false },
            //********** */
            dayStatics : {'total' : 0 , 'reserved' : 0 , 'cancelled' : 0 , 'blocked' : 0  , 'available' : 0  } ,

        }   
    },
   	
   props: [   'lock_dates' , 'appointments_data' , 'day_expired' , 'daterequired', 'session_params' ,  'calendars_marks' , 'global_specialties', 'global_comunas'  ],
   emits: [ 'updateAppointmentList' , 'switchView' , 'addToBlockList' ] , 

	created () {
            // console.log("Appointments in listAppointments = "+JSON.stringify(appointments) );
	},
    
    watch : {
         // NO SE ACTUALIZAAAA
          apply_filter_reserved(oldval,newval)
          { console.log("FILTER RESERVED");
              if (oldval)
              {
              this.filterApps.available = false ;
              this.filterApps.reserved = true ;
              this.filterApps.total = false ;
              this.run_filter();
              }
              else
               {
              this.filterApps.available = false ;
              this.filterApps.reserved = false ; 
              this.filterApps.total = false ;
              this.run_filter();
               }
          },
          apply_filter_available(oldval,newval)
          {   console.log("FILTER AVAILABLE");
              if (oldval)
              {
              this.filterApps.available = true ;
              this.filterApps.reserved = false ;
              this.filterApps.total = false ;
              this.run_filter();
              }
              else
               {
              this.filterApps.available = false ;
              this.filterApps.reserved = false ; 
              this.filterApps.total = false ;
              this.run_filter();
               }
          },
          apply_filter_total(oldval,newval)
          {   console.log("FILTER AVAILABLE");
              if (oldval)
              {
              this.filterApps.available = false ;
              this.filterApps.total = true ;
              this.filterApps.reserved = false ;
              this.run_filter();
              }
              else
               {
              this.filterApps.available = false ;
              this.filterApps.reserved = false ; 
              this.filterApps.total = false ;
              this.run_filter();
               }
          },

        
          appointments_data(newValue){
             
             console.log("------------------appointments_data:"+JSON.stringify(newValue));
        
             this.filterApps.available = false ;
             this.filterApps.reserved = false  ;
            //check if Day is expired
            this.days_expired = (new Date(this.daterequired).getTime() - new Date().getTime() ) < -120000000  ;
            console.log("DAY EXPIRED:"+this.days_expired);
            this.setDayStatics(newValue)
          
            if (newValue !=null && newValue.appointments_list !=null && newValue.appointments_list.appointments != null  )
            {
                this.appointments_n = newValue.appointments_list.length
                this.filteredAppList = newValue.appointments_list.appointments ;
                //IF Filter Only Reserved    
            }
            //check if date is a blocked date
            console.log("APPS LOCK DATES:"+newValue.lock_dates );
             let aux_date_required = new Date(this.daterequired)
            aux_date_required.setHours(0,0,0,0)
            console.log("APPS DATE REQUIRED :"+aux_date_required.toISOString() );
            /*
            const lock_date_found = newValue.lock_dates.find(element => new Date(element).getTime() === aux_date_required.getTime()  );
            
            if (lock_date_found != null )
            {
             this.isLockDay=true ; 
            }
            else
            {
            this.isLockDay=false ; 
            }
            */
            this.isLockDay = newValue.lock_date
            console.log("Is a Lock Date ?  :"+ this.isLockDay );

           this.run_filter();
        },


        },

	methods :{

        setDayStatics(appointments_data)
            {
            /*
            this.dayStatics.total = appointments_data.appointments_list.length ;
            //how many cancelled ? 
            let filtered_blocked = appointments_data.appointments_list[0].appointments.filter(app =>  app.app_blocked === 1 ) 
            this.dayStatics.blocked = filtered_blocked.length ;
                //how Reserved ? 
            let filtered_reserved = appointments_data.appointments_list[0].appointments.filter(app =>  app.app_available === false && app.app_blocked != 1  ) 
            this.dayStatics.reserved = filtered_reserved.length ;
                //Available ? 
            this.dayStatics.available =  this.dayStatics.total  - ( this.dayStatics.blocked +  this.dayStatics.reserved ) ;

                if (this.isLockDay)
                {   this.dayStatics.available = "0"
                    this.dayStatics.blocked = ""
                    this.dayStatics.reserved = "0"
                    this.dayStatics.total = appointments_data.appointments_list.appointments.length
                }
            console.log("LIST APPOITNMENTS SET DAY STATICS.........:"+JSON.stringify(this.dayStatics) );
            */
        },

        run_filter()
            {
                if (this.appointments_data !=null && this.appointments_data.appointments_list[0] !=null && this.appointments_data.appointments_list[0].appointments != null  )
                { 
                    console.log("List Appointments Filter :"+JSON.stringify(this.filterApps) )
                    
                    if ( this.filterApps!=null && this.filterApps.reserved !=null && this.filterApps.reserved)
                    {
                    this.filteredAppList =  this.appointments_data.appointments_list[0].appointments.filter(app => app.app_blocked != 1 && app.app_available == false )
                    }

                    if (this.filterApps!=null && this.filterApps.available !=null && this.filterApps.available)
                    {
                    this.filteredAppList =  this.appointments_data.appointments_list[0].appointments.filter(app => app.app_available == true && app.lock_day == false)
                    }

                    if (this.filterApps!=null && this.filterApps.blocked !=null && this.filterApps.blocked)
                    {
                    this.filteredAppList =  this.appointments_data.appointments_list[0].appointments.filter(app => app.app_blocked == 1 )
                    }
                    
                    if (this.filterApps!=null && !this.filterApps.blocked && !this.filterApps.available && !this.filterApps.reserved )
                    {
                        this.filteredAppList =this.appointments_data.appointments_list[0].appointments
                    }
                }

        },

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

                                let aux_date_required = new Date(this.daterequired)
                                aux_date_required.setHours(0,0,0,0)
                                
                                const json = {  
                                    token: 'apsfdnwe',                         
                                    appointment_date : aux_date_required , 
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

                                let aux_date_required = new Date(this.daterequired)
                                aux_date_required.setHours(0,0,0,0)

                                const json = {  
                                    token: 'apsfdnwe',                         
                                    appointment_date :  aux_date_required , 
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

