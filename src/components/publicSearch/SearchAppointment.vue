<script setup>
import { ref } from 'vue'
import axios from 'axios'
import searchAppointmentForm  from './SearchAppointmentForm.vue' 
import searchAppointmentResult  from './SearchAppointmentResult.vue'
import loadProgress from '../loadProgress.vue'

</script>

<template>
  <div>
  <loadProgress  :active_spinner="active_spinner" > </loadProgress> 
   
    <div class="h2 bg-white p-2" >
   

    Busca tu Hora 
    </div>
      <div>
            <div>
            <searchAppointmentForm  v-on:searchAppointments="searchAppointments" :currentDate="currentDate" :global_specialties="global_specialties" :global_comunas="global_comunas" ></searchAppointmentForm>
            <text v-if="appointments.length>0" >En {{metric_search/1000}} Seg encontramos {{appointments.length}} resultados </text>
            <searchAppointmentResult  :searchParameters='searchParameters' v-if="daterequired != null && appointments != null"  v-on:updateLastSearch="updateLastSearch"  :appointments="appointments" :daterequired="daterequired"  :global_comunas="global_comunas" :global_specialties="global_specialties"  > </searchAppointmentResult> 	    
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
            daterequired : null,
            currentDate : null,
            specialty: null,
            location: null,
            insurance: null,
            params_bkp: null, 
           
            appointments : [] ,
            appointment : null ,
            show_modal : null ,
            appointment_confirm : null ,
            key : 0 ,

            notificationMessage : null,
            notificationMessage_alert : false,
            searchParameters : Object , 

            active_spinner : false ,
            metric_search : 0,
    }
  },

    props: ['global_specialties','global_comunas'], 

 mounted () {
             this.daterequired = new Date().toISOString().split('T')[0] ;
             this.currentDate =  new Date().toISOString().split('T')[0] ;
             console.log('Search Appointment global_specialties'+this.global_specialties);
        },

methods: {
        show_modal_appointment_confirm(param)
        {
            console.log("Modal Confirmation: show_modal_appointment_confirm:"+JSON.stringify(param) )
            this.appointment_confirm = param ;
        },

        set_daterequired : function (year_month_day) {
            console.log("TAB HOME GoToDay "+year_month_day);
           // this.getAppointments(year_month_day);
            this.daterequired = year_month_day ;
            },

        async searchAppointments(params) {	
          let metric = Date.now();
                this.active_spinner = true ; 
                console.log("search Appointments input params :"+JSON.stringify(params) )
                
                let specialty_code = null ;
                if (  params.specialty != null)
                { 
                    specialty_code = params.specialty.id ; 
                }

                 const json = { 
				// agenda_id : this.par_agenda_id ,			 
				    date : params.date ,
				    specialty : specialty_code ,
                 location : params.comuna ,
                 home_visit : params.home_visit,
                 type_home : params.type_home,
                 type_center : params.type_center,
                 type_remote : params.type_remote,
                  		  };
				console.log ("searchAppointments2 input to send JSON :"+ JSON.stringify(json)  );
				//let response_json = await axios.post("http://192.168.0.110:8080/patient_get_appointments_day",json);
				let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/patient_get_appointments_day2",json);
			
				this.appointments = response_json.data;
      	console.log ("getAppointments2 RESPONSE:"+JSON.stringify(this.appointments)) ;

        // this.notificationMessage="Econtramos "+this.appointments.length+" resultados, desde dia "+this.daterequired +" ";	
                this.notificationMessage_alert=	false ;
                this.searchParameters = params ;
                this.params_bkp = params ; 
                this.active_spinner = false ;

          metric = (Date.now() - metric ) ;     
          this.metric_search = metric ;
          console.log("performance, searchAppointments , searchAppointments ,"+  this.metric_search  );
            },

            updateLastSearch()
            {
                console.log ("update Last Search") ;
                this.searchAppointments(this.params_bkp);
            }


        },

}
</script>