<script setup>
import { ref } from 'vue'
import LoadProgress from '../loadProgress.vue'
import axios from 'axios'
import GeneralHeader from '../GeneralHeader.vue'
import appointmentAvailableSearchCalendar from './AppointmentAvailableSearchCalendar.vue'

/*
import patientAppointmentAvailable  from '../publicSearch/PatientAppointmentAvailable.vue'
import modalPublicViewAppointment from '../publicSearch/ModalPublicViewAppointment.vue'

*/
</script>

<template>
<div>
    
    
    <div >
        <loadProgress  :active_spinner="active_spinner" > </loadProgress>
        <GeneralHeader></GeneralHeader>
    

    <p  class="" >

        <text class="display-6 m-3">
             {{ cal_professional }}
        </text>
        <text class="display-6 m-3 text-center">
           {{ cal_specialty }}
        </text>

        <text class="display-6 m-3">
           {{ center.name }}
        </text>
      
        <text v-if="center.home_visit" class="display-6 m-3">
           Visita a Domicilio<br>
           {{center.home_comuna1}} 
           {{center.home_comuna2}} 
           {{center.home_comuna3}}
           {{center.home_comuna4}}
           {{center.home_comuna5}}
           {{center.home_comuna6}}
          
        </text>
         <text v-if="center.center_visit" class="display-6 m-3">
           En Centro <br>
            {{center.address}}<br>
            {{center.comuna}}
        </text>
         <text v-if="center.remote_care" class="display-6 m-3">
           Atencion Remota
        </text>
         
    </p>
    

    
    &nbsp; 

        <div v-if="showSearch" class="mt-4 ">
            <div   class="mt-4 d-flex justify-content-around">
                    
                    <text class="fs-3"><small>Citas Desde</small></text>
                    <div class="">
                        <input style="border-radius: 25px;" v-model="form_search_date" :min="form_minimum_date" type="date" id="app_date" name="app_date" class="form-control form-control-lg border border-primary" >
                    </div>
                
            </div>
        </div>

        <p class="text-center" v-if="!showSearch">
        <button @click="showSearch=!showSearch;searchAppointmentsCalendar()" type="button" class="mt-3 btn btn-primary"> Ver Citas Disponibles </button>
        </p>
        
           <hr>

       <div  v-for="appointment in appointments" :key="appointment.id" class="mt-3">
                <appointmentAvailableSearchCalendar class=""  v-if="appointment != null"  v-on:click="setModalReserve(appointment)" :appointment='appointment'  > </appointmentAvailableSearchCalendar>                  
        </div>

        <!--
        <loadProgress  :active_spinner="active_spinner" > </loadProgress>
        
        <div  v-if="appointments!= null" >
            <div class="mt-0 "  v-for="appointment in appointments" :key="appointment.id" >
                
                    <patientAppointmentAvailable :searchParameters="searchParameters" class=" m-2 "  v-if="appointment != null"  v-on:click="setModalReserve(appointment)" :appointment='appointment'  :global_comunas="global_comunas" :global_specialties="global_specialties"  > </patientAppointmentAvailable>            
             
            </div>
            <div style="height: 400px">
            </div>

        </div>	
        <modalPublicViewAppointment  :searchParameters="searchParameters" :app="app" :openModalEvent="openModalEvent"   v-on:updateLastSearch="updateLastSearch"  :global_comunas='global_comunas' :global_specialties="global_specialties"  > </modalPublicViewAppointment>
        -->
    </div>     

</div>
</template>

<style scoped>

</style>


<script>

export default {
 data : function() {
    return {
            cal_id : null ,
            token : null ,
            appointments : null ,
            center_id : null , 
            professional_id : null ,
            date : null ,
            center : null  ,

            form_search_date: null ,
            form_minimum_date : null ,

            active_spinner : false ,

            showSearch : false,

            metric_search : null ,
            /*
            app : null , 
            showModal : false , 
            showModalConfirmation : false , 
            appConfirmed : null, 
            appointment_list : null, 
          //  notificationMessage: null, 
            modalOpen : ref(false), 
            openModalEvent : null , 
            showLoaderProgress : false , 
            */
           
    }
  },

   props: ['searchParameters','session_params','daterequired','global_comunas', 'global_specialties', 'filter_center' , 'filter_home' , 'filter_remote' ],
   emits: ["updateLastSearch"],

 

    beforeCreate(){
      
    },
    activated(){
      
    },
   mounted () {    
        let uri = window.location.search.substring(1); 
        let params = new URLSearchParams(uri);
       
        this.date = new Date() 
        this.token=params.get("token")
        this.cal_id=params.get("cal_id")
        this.cal_specialty = null 
        this.cal_professional = null 
    
        console.log("URL PARAMETROS : cal_id:"+this.cal_id+ " Token:"+this.token+" Date:"+this.date  )
   
      // this.getProfessionalData();
      // this.getCenterData();
     
       },

    beforeUpdate(){
        /*
        this.showLoaderProgress = true  ;
        console.log("showloader progress BEFORE UPDATE !!!");
        */
        },

    updated()
        {
            /*
        this.showLoaderProgress = false  ;
        console.log("showloader progress UPDATE !!!");
        */
        },

    watch: {
            /*
            appointments(newAppointments, oldAppointments ) {
                this.appointment_list =  newAppointments ;   
             //   this.notificationMessage="Econtramos "+this.appointments.length+" resultados, desde dia "+this.daterequired +" ";	                 
            },
            */
        },

    methods: {
        

       
        async searchAppointmentsCalendar() {	
         
              if (  this.cal_id != null )
              {    
                          let metric = Date.now();
                          this.active_spinner = true ; 
                                                
                          const json = { 
                            date : this.date ,
                            token : this.token , 
                            cal_id :  this.cal_id,
                                };

                  console.log ("searchAppointmentsCalendar INPUT send JSON :"+ JSON.stringify(json)  );
                  let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/patient_get_appointments_calendar",json);
                  
                  this.appointments = response_json.data;
                  console.log ("searchAppointmentsCalendar RESPONSE:"+JSON.stringify(this.appointments)) ;

                  // this.notificationMessage="Econtramos "+this.appointments.length+" resultados, desde dia "+this.daterequired +" ";	
                    this.center_id = this.appointments[0].center_id;
                  

                          this.active_spinner = false ;

                    metric = (Date.now() - metric ) ;     
                    this.metric_search = metric ;
                    console.log("performance, searchAppointments , searchAppointments ,"+  this.metric_search  );
                    
                                
                    this.get_center() ;  
              }
              else 
              {
                  this.appointments = null;
              }
                        
           },

          async get_center()
           {

                const json_center = { 
                    center_id : this.appointments[0].center_id,
                    };
               console.log("get Center REQUEST "+JSON.stringify(json_center));
               let response = await axios.post(this.BKND_CONFIG.BKND_HOST+"/patient_get_center",json_center);
               this.center = response.data
               console.log("get Center RESPONSE "+JSON.stringify(this.center) );
              



           }



          /*
            setModalReserve(appointment)
            {
                console.log("Set Modal Reserve method in SearchApp Resutl"+JSON.stringify(appointment));
                this.app=appointment;
                //this.modalOpen = true; 
                this.openModalEvent = Math.random();
            },
          
            updateLastSearch()
            {
                console.log (" update search Result. ");
                //this.appointment_list=null ;
                this.$emit('updateLastSearch');
            },

            selectedInsuranceCode(code)
            {
            console.log("Insurance Code:"+code);
            this.form_patient_insurance_code = code;
            },
            */

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