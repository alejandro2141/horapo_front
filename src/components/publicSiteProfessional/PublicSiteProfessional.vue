<script setup>
import { ref } from 'vue'
import LoadProgress from '../loadProgress.vue'
import axios from 'axios'
import GeneralHeader from '../GeneralHeader.vue'
import appointmentAvailableSearchCalendar from './AppointmentAvailableSearchCalendar.vue'
//import ModalPublicReserveAppForm from './modalPublicReserveAppForm.vue';
//import modalPublicViewAppointment from '../publicSearch/ModalPublicViewAppointment.vue';

import modalPublicViewAppointment from '../publicSearch/ModalPublicViewAppointment.vue' 


/*
import patientAppointmentAvailable  from '../publicSearch/PatientAppointmentAvailable.vue'
import modalPublicViewAppointment from '../publicSearch/ModalPublicViewAppointment.vue'
*/

</script>

<template>
<div>
    
    <modalPublicViewAppointment  :searchParameters="searchParameters" :app="app" :center_data="center_data"    :openModalEvent="openModalEvent"   v-on:updateLastSearch="updateLastSearch"  :global_comunas='comunas' :global_specialties="specialties"  > </modalPublicViewAppointment>
   
    <div >
        <!--
        <ModalPublicReserveAppForm :global_comunas="global_comunas" :professional_data="professional_data" :center_data="center_data" :searchParameters='searchParameters'   v-on:updateLastSearch='updateLastSearch' :appToReserve='appToReserve'  :eventShowModalPubicReserve='eventShowModalPubicReserve' :global_specialties='global_specialties' ></ModalPublicReserveAppForm>
        -->

        <loadProgress  :active_spinner="active_spinner" > </loadProgress>
    <!--
        <GeneralHeader></GeneralHeader>
    -->
            <p class="fs-3 text-center">
              Agenda del profesional 
            </p>

            <div class="d-flex justify-content-start">
                <i class="display-1 m-4 bi bi-person-bounding-box"></i>
                <text class="mt-4 fs-3">
                   
                    <text v-if="professional_data!=null" > {{ professional_data.name}} </text>

                  <!--  Activo:{{ professional.active }} -->
                </text>
            </div>
<!--
            <p class="fs-3 mt-1 pt-1">
            Calendarios Disponibles
            </p>
-->
            <hr>

            <div v-if="calendars!=null && calendars.length>0">
                <div  v-for="calendar in calendars" :key="calendar.id" >
                    
                    <div class="d-flex justify-content-between mt-3">
                        <div>
                            <text class="fs-3 text-success" >{{ id2specialtyName(calendar.specialty1) }}</text> <br>
                            <text v-if="getCenterData(calendar.center_id).home_visit" > Visita a Domicilio <i class="h1 bi bi-house-door"></i> </text>
                            <text v-if="getCenterData(calendar.center_id).center_visit" > Cita en Consulta <i class="h1 bi bi-building"></i> </text>
                            <text v-if="getCenterData(calendar.center_id).remote_care" > Atención Remota <i class="h1 bi bi-camera-video"></i> </text>
                            
                        <br> {{getCenterData(calendar.center_id).address}}
                        </div>
                        <!--
                        <div>
                             <a :href="'/nested/publicSearchCalendar.html?cal_id='+calendar.calendar_id"> <i  class="display-1 fw-light text-primary p-2 bi bi-arrow-right-square"></i> </a>
                        </div>
                        -->
                    </div>
                    <hr>
                    
                    <div class="d-flex justify-content-center">
                        <button   @click="showAppAvailable(calendar.id)"  type="button" class="btn btn-primary">Ver Horas Disponibles <i class="bi bi-arrow-down-short"></i> </button>
                    </div>
                </div>
            </div>


            <div>
                <div  v-for="appointment in appointments"  :key="appointment.id"  class="mt-3" >
                    <appointmentAvailableSearchCalendar class=""  v-if="appointment != null"  v-on:click="setModalReserve(appointment)" :appointment='appointment'  > </appointmentAvailableSearchCalendar>       
                </div>
            </div>    


            <div class="mt-5 pt-5">
               
            </div>
      
    </div>     

</div>
</template>

<style scoped>
</style>

<script>
export default {
 data : function() {
    return {

        calendars : [],
        cdate : null,
        active_spinner : null ,

        professional_data : null ,
        calendars : null ,
        centers   : null ,
        specialties : null ,

        appointments : [] ,

        //form modal data
        searchParameters : [] ,
        app : [] ,
        center_data : [] ,
        openModalEvent : 0 ,
        comunas: [],
 
        }
  },

   props: ['session_data'],
   emits: [],

    beforeCreate(){
      
    },
    activated(){
      
    },
   mounted () {    
        this.active_spinner = true 
        let uri = window.location.search.substring(1); 
        let params = new URLSearchParams(uri);
        this.token=params.get("token")
        this.prof_id=params.get("prof_id")
        this.cal_id=params.get("cal_id")
        console.log("URL PARAMETROS :  prof_id:"+this.prof_id+" cal_id:"+this.cal_id+ " Token:"+this.token+" Date:"+this.date  )
    
        this.cdate = new Date();
       
        this.get_professional_data(this.prof_id,this.cal_id);        
        this.active_spinner = false 
       },

    beforeUpdate(){
        },

    updated()
        {
        },

    watch: {
        },

    methods: {
            updateLastSearch()
            {
                console.log("update Last Search")
                this.showAppAvailable(this.cal_id) 
            },

            async showAppAvailable(calid)
            {
                const json_request = { 
                    calendar_id : calid,
                    date  :  new Date()
                        };

                console.log("professional_pwsite_get_appointments_calendar REQUEST:"+JSON.stringify(json_request))
                let response = await axios.post(this.session_data.BKND_HOST+"/professional_pwsite_get_appointments_calendar",json_request);
                console.log("professional_pwsite_get_appointments_calendar RESPONSE :"+JSON.stringify(response.data) )   
                this.appointments = response.data.appointments     
            },

            async get_professional_data(pid,cid)
            {
                let aux_date = new Date();

                const json_center = { 
                    professional_id : pid,
                    calendar_id : cid,
                    date  :  aux_date
                        };

               console.log("professional_pwsite_get_calendar REQUEST "+JSON.stringify(json_center));
               let response = await axios.post(this.session_data.BKND_HOST+"/professional_pwsite_get_calendar",json_center);
               
               this.professional_data= response.data.professional_data 
               this.calendars = response.data.calendars 
               this.centers= response.data.centers 
               this.specialties = response.data.specialties 
               
               console.log("professional_pwsite_get_calendar RESPONSE "+JSON.stringify(response) );
            },

            id2comunaName(id)
            {
             /*
            let temp= this.global_comunas.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
            */
            },

            id2specialtyName(id)
            {
            let temp= this.specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
            },
         
            getCenterData(id)
            {
            let temp= this.centers.find(elem => elem.id ==  id  )
            if (temp != null) { return temp }
            else { return null }
            },
         
            setModalReserve(appointment)
            {
                console.log("Set Modal Reserve method in SearchApp Resutl"+JSON.stringify(appointment));
                this.app = appointment;
                this.center_data = this.getCenterData(appointment.center_id)
            
                this.openModalEvent = Math.random() ;
    
                /*
                this.app['professional_name']=this.professional.name ; 
                this.app['specialty1']=new String(this.app.specialty) ; 
                this.app['home_visit']=this.center.home_visit ; 
                this.app['center_visit']=this.center.center_visit ; 
                
                this.app['center_name']=this.center.name ; 
                this.app['center_address']=this.center.address ; 

                this.app['remote_care']=this.center.remote_care ; 

               this.app['home_visit_location1']=this.center.home_comuna1 ; 
               this.app['home_visit_location2']=this.center.home_comuna2 ; 
               this.app['home_visit_location3']=this.center.home_comuna3 ; 
               this.app['home_visit_location4']=this.center.home_comuna4 ; 
               this.app['home_visit_location5']=this.center.home_comuna5 ; 
               this.app['home_visit_location6']=this.center.home_comuna6 ; 
               
               this.app['center_visit_location']=this.center.comuna ; 
                
               this.searchParameters=this.app.specialty ;


                console.log("Set Modal Reserve method in app for modal"+JSON.stringify(this.app));
                
               //this.searchParameters = { 'specialty' : this.appointments[0].specialty } 
               //this.modalOpen = true; 
               this.openModalEvent = Math.random() ;
               */

            },
          
        

        },
  
    watch : {
        form_search_date(newValue)
        {
            console.log("Date New Value:"+newValue);
            this.date = new Date(newValue);
            this.searchAppointmentsCalendar() ;
        }

    }



}

</script>