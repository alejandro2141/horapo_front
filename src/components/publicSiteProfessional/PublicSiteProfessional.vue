<script setup>
import { ref } from 'vue'
import LoadProgress from '../publicSearch/loadProgressPatient.vue'
import axios from 'axios'
import GeneralHeader from '../GeneralHeader.vue'
import appointmentAvailableSearchCalendar from './AppointmentAvailableSearchCalendar.vue'
import modalPublicViewAppointment from '../publicSearch/ModalPublicViewAppointment.vue' 

import ModalPublicReserveAppForm from '../publicSearch/modalPublicReserveAppForm.vue';

</script>

<template>
<div>
   
    <!--
    <modalPublicViewAppointment  :searchParameters="searchParameters" :app="app" :center_data="center_data"    :openModalEvent="openModalEvent"   v-on:updateLastSearch="updateLastSearch"  :global_comunas='comunas' :global_specialties="specialties"  > </modalPublicViewAppointment>
    -->
    <!-- <ModalPublicReserveAppForm  :professional_data="professional_data" :center_data="center_data" :searchParameters='searchParameters'   v-on:updateLastSearch='updateLastSearch' :appToReserve='appToReserve'  :eventShowModalPubicReserve='eventShowModalPubicReserve' :global_specialties='global_specialties' :global_comunas="global_comunas" ></ModalPublicReserveAppForm>
    -->
    
    <ModalPublicReserveAppForm  :searchParameters='searchParameters' :appToReserve='appToReserve' :center_data="center" :calendar_data="calendar"   :eventShowModalPubicReserve='openModalEvent'   v-on:updateLastSearch='updateLastSearch'   :global_comunas="global_comunas" :global_specialties='global_specialties'       ></ModalPublicReserveAppForm>

    <div >
        <!--
        <ModalPublicReserveAppForm :global_comunas="global_comunas" :professional_data="professional_data" :center_data="center_data" :searchParameters='searchParameters'   v-on:updateLastSearch='updateLastSearch' :appToReserve='appToReserve'  :eventShowModalPubicReserve='eventShowModalPubicReserve' :global_specialties='global_specialties' ></ModalPublicReserveAppForm>
        -->

        <loadProgress  :active_spinner="active_spinner" > </loadProgress>

        
<!-- SHOW TITLE -->
            <div class=" d-flex d-flex justify-content-center">
               
                <div>

                    <p class="text-center ">
                        <GeneralHeader></GeneralHeader>
                        <text class="">Agenda Cloud</text> <i style="font-size: 2em;" class="bi bi-cloudy"></i>
                        
                        <br>
                        <text class="text-secondary ">
                        Busca horas disponibles directamente en agenda profesional. 
                        </text>
                        
                    </p>
                    

                </div>
            </div>

<!-- SHOW PROFESSIONAL INFO -->
            <div class="d-flex justify-content-center">
                <!-- 
                <i class="display-1 m-4 bi bi-person-bounding-box"></i>
                -->
                <text class="mt-4 fs-3">
                   
                    <text v-if="professional_data!=null" > {{ professional_data.name}} </text>

                  <!--  Activo:{{ professional.active }} -->
                </text>
            </div>           

<!-- START SHOW CALENDAR DATA -->
                    <div v-if="calendar!=null && center!=null" class="mt-0">
                        
                           <div  class="fs-1 text-success d-flex justify-content-center" >{{ id2specialtyName(calendar.specialty1) }}</div> 
                           <div  class="fs-3 d-flex justify-content-center text-secondary"> En: {{center.name }}</div>
                           <div  class="d-flex justify-content-center " > 
                                <text class="fs-3"> Precio ${{ priceFormatter(calendar.price) }}</text>
                            </div> 

                            <!-- HOME VISIT  -->
                            <div class="d-flex justify-content-center" v-if="center.home_visit"  > 
                                <div>
                                <p class="text-center">
                                    Visita a Domicilio <i class="h1 bi bi-house-door"></i> 
                                </p>
                                
                                <p >
                                    <text class="text-primary fs-5">
                                    {{ id2comunaName(center.home_comuna1) }}  
                                    {{ id2comunaName(center.home_comuna2) }} 
                                    {{ id2comunaName(center.home_comuna3) }} 
                                    {{ id2comunaName(center.home_comuna4) }} 
                                    {{ id2comunaName(center.home_comuna5) }} 
                                    {{ id2comunaName(center.home_comuna6) }}
                                    </text>
                                </p>
                                </div>
                            
                            </div>
                             <!-- IN CENTER  -->
                            <div class="text-center" v-if="center.center_visit" > 
                                <div class="text-center"> Cita en Consulta 
                                    <i class="h1 bi bi-building"></i> 
                                </div>
                               
                                <p>
                                    <text class="text-primary fs-5">
                                    {{ id2comunaName(center.comuna) }}
                                    </text><br>
                                    <text>
                                    {{center.address}}
                                    </text>
                                </p>
                            </div>

                            <!-- REMOTE CARE -->
                            <div v-if="center.remote_care" > 
                                <p class="text-center">
                                Atención Remota <i class="h1 bi bi-camera-video"></i> 
                                </p>
                                <p class="text-center">
                                Todas las comunas
                                </p>
                            </div>
                            
                            <br> 
  
                       
                        <br>
                           
                      <!-- CALENDAR ERROR STATUS -->
                            

                    <div v-if="!calendar.active" class="text-center h2">
                        <i class="bi bi-exclamation-triangle text-warning"></i>  Este Calendario No esta activo 
                    </div>
                    <div v-if="(new Date(calendar.date_end).getTime() < new Date().getTime() )" class="text-center h2">
                        <i class="bi bi-exclamation-triangle text-warning"></i>  Este Calendario Esta expirado
                    </div>

                    <div v-if="calendar.active &&  (new Date(calendar.date_end).getTime() > new Date().getTime() ) " >
                        
                        <div class="d-flex justify-content-center">
                            <input class="p-3" type="date" id="start" name="trip-start"
                             v-model="selected_search_date" 
                            :min="search_date.toISOString().split('T')[0]" max="2024-12-31"  >
                        </div>
                                                
                        <div class="d-flex justify-content-center">
                            <button   @click="showAppAvailable(calendar.id)"  type="button" class="m-2 btn btn-primary">Ver Horas Disponibles <i class="bi bi-arrow-down-short"></i>  </button>
                        </div>

                    </div>
                    

                    <div v-else class="d-flex justify-content-center">
                       Ir a buscar horas disponibles en <a href="/">Nuestro sitio de busqueda</a>
                    </div>
                



                    </div>
                   

                   
             
            <!-- SI CALENDAR TIENE ERROR  -->
            <div v-else class="text-center">
                <div class="h2">
                    <i class="bi bi-exclamation-triangle text-warning"></i> Calendario no Existe
                </div>
                
                <div>
                    Busca otras horas disponibles en <a href="/">HoraPO Busqueda de Horas Profesionales</a>
                </div>
            </div>
<!-- END SHOW CALENDAR DATA -->


<!-- START LIST APPOINTMENTS --->
        <div v-if="appointments !=null && !appointments.error"  class="w-100 d-flex justify-content-center"  >
            
            <hr>
        
            <div style="width: 25em;">     
                <p v-if="appointments.length > 0" class="text-center">
                Resultados de la busqueda <!--{{appointments.length}} dias. -->
                </p>

                <div  v-for="appointment in appointments"  :key="appointment.id"  class="mt-3" >
                    <!-- <text> {{appointment.date}} </text> --> 
                    <!-- List app of a day -->
                    <div  v-for="app in appointment.appointments"  :key="app.id"  class="mt-3" >
                        <div class="">
                        <appointmentAvailableSearchCalendar    class=""  v-if="app != null"  @click="setModalReserve(app)"  :appointment='app'  > </appointmentAvailableSearchCalendar>       
                        </div>
                    </div>
                </div>
             
                <div v-if="appointments.lenght == 0  ">
                    <div class="w-100 text-center">
                        <i class="m-0 p-0 bi bi-wind display-1" ></i>
                        <br> Sin Horas disponible 
                    </div>
                </div>

            </div>

        </div>
<!-- END LIST APPOINTMENTS --->
       

      
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
       
        centers   : null ,
        specialties : null ,
        locations: null ,

        appointments : [] ,
        search_date : null ,

        //form modal data
        searchParameters : [] ,
        app : [] ,
       
        openModalEvent : 0 ,
        comunas: [],
        

        selected_search_date : null ,
        req_params:null,

        appToReserve : null , 
        eventShowModalPubicReserve:null, 

        global_specialties : null ,
        global_comunas : null ,
        center : null  ,
        calendar : null  ,

 
        }
  },

   props: ['session_data'],
   emits: [],

    beforeCreate(){
      
    },
    activated(){
      
    },
   async mounted () {    
        this.active_spinner = true 
        let uri = window.location.search.substring(1); 
        let params = new URLSearchParams(uri);
        this.token=params.get("token")
        this.prof_id=params.get("prof_id")
        this.cal_id=params.get("cal_id")
        
        this.req_params = params.get("params")
        let auxparams =  this.req_params.split("_")
        this.prof_id=auxparams[0]
        this.cal_id=auxparams[1]

        console.log("URL PARAMETROS :  prof_id:"+this.prof_id+" cal_id:"+this.cal_id+ " Token:"+this.token+" Date:"+this.date  )
    
        this.cdate = new Date()
        this.search_date = new Date()
        this.selected_search_date = new Date()
       
        //GET ALL START DATA
        await this.get_start_data(this.prof_id,this.cal_id);        
        this.active_spinner = false 

        this.loadGlobalSpecialties();
        this.loadGlobalComunas();
       },

    beforeUpdate(){
        },

    updated()
        {
        },

    watch: {
        },

    methods: {

        priceFormatter(amount) 
        {
            return   amount.toLocaleString('es-cl');
        },

        
        async get_start_data(pid,cid)
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
               this.calendar = response.data.calendars[0] 
               this.center= response.data.centers[0] 
               this.specialties = response.data.specialties 
               this.locations = response.data.locations
            
               
               
               console.log("professional_pwsite_get_calendar RESPONSE "+JSON.stringify(response) );
            },

        async loadGlobalSpecialties() {
                let metric=Date.now()  ; 
				let response_json = await axios.post(this.session_data.BKND_HOST+"/common_get_specialty_list");
                this.global_specialties = response_json.data.rows;
                //console.log("APP GET COMUNA LIST METHOD, "+JSON.stringify(this.global_specialties) );
                 console.log("performance , Public Search ,loadGlobalSpecialties, "+ (Date.now() - metric));
            },

        async loadGlobalComunas() {
                let metric=Date.now()  ; 
				let response_json = await axios.post(this.session_data.BKND_HOST+"/common_get_comuna_list");
                this.global_comunas = response_json.data.rows;
                //console.log("APP Comuna list: "+JSON.stringify(this.global_comunas) );
                 console.log("performance , Public Search , loadGlobalComunas , "+ (Date.now() - metric));
            },

        //TO OPEN MODAL 
        reserveHour(hour)
		{
			console.log("Public Reserve Hour ... display Modal");
			
			//this.showModalPublicAppDetails = false ;
			this.appToReserve = hour ;
			this.eventShowModalPubicReserve = Math.random() ;
		},

            updateLastSearch()
            {
                console.log("update Last Search")
                this.showAppAvailable(this.cal_id) 
            },

            async showAppAvailable(calid)
            {
                const json_request = { 
                    calendar_id : calid,
                    date  :  this.selected_search_date
                    
                        };

                console.log("professional_pwsite_get_appointments_calendar REQUEST:"+JSON.stringify(json_request))
                let response = await axios.post(this.session_data.BKND_HOST+"/professional_pwsite_get_appointments_calendar",json_request);
                console.log("professional_pwsite_get_appointments_calendar RESPONSE :"+JSON.stringify(response.data) )   
                this.appointments = response.data.appointments     
            },

            id2specialtyName(id)
            {
            let temp= this.specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
            },

            id2comunaName(id)
            {    
            let temp= this.locations.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
            },

           
  /*       
            getCenterData(id)
            {
            let temp= this.centers.find(elem => elem.id ==  id  )
            if (temp != null) { return temp }
            else { return null }
            },
*/
         
            setModalReserve(appointment)
            {
                console.log("Set Modal Reserve method in SearchApp Resutl"+JSON.stringify(appointment));
                this.appToReserve = appointment;
                //this.professional_data = this.getProfessionalData(appointment.professional_id)
                //this.modalOpen = true; 
                this.openModalEvent = Math.random();
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