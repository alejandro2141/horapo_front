<script setup>
import { ref } from 'vue'
import axios from 'axios'
import searchAppointmentForm  from './SearchAppointmentForm.vue' 
import searchAppointmentResult  from './SearchAppointmentResult.vue'
import loadProgress from '../loadProgress.vue'
import suggestedSearch from './SuggestedSearch.vue'

</script>

<template>
  <div class="bg-white p-2">
  <loadProgress  :active_spinner="active_spinner" > </loadProgress> 
   
      <div class="display-4 bg-white  pb-4 text-center"  > 
        <a HREF="/index.html" class="text-decoration-none" style="color :#2e5668"> 
        <i class="bi bi-arrow-left-square"></i> 
        123Hora  
        </a> 
      </div> 

      <div>
            <div>
            <searchAppointmentForm  v-on:searchAppointments="searchAppointments"  v-on:form_app_type_center_emit="form_app_type_center_emit" v-on:form_app_type_home_emit="form_app_type_home_emit" v-on:form_app_type_remote_emit="form_app_type_remote_emit"    :currentDate="currentDate" :global_specialties="global_specialties" :global_comunas="global_comunas" :n_appointments_found="n_appointments_found"></searchAppointmentForm>
            
            <div v-if="appointments !=null && appointments.length > 0">
                
                En {{metric_search/1000}} Seg encontramos {{appointments.length}} resultados
                
                <searchAppointmentResult  :filter_home="filter_home" :filter_center="filter_center" :filter_remote="filter_remote" :searchParameters='searchParameters' v-if="daterequired != null && appointments != null"  v-on:updateLastSearch="updateLastSearch"  :appointments="appointments" :daterequired="daterequired"  :global_comunas="global_comunas" :global_specialties="global_specialties"  > </searchAppointmentResult> 	    
           
            </div>

           
            <p v-if="appointments !=null && appointments.length == 0" class="text-center p-2"  > 
                <i class="bi bi-emoji-dizzy display-1">
                </i>
                <br>
                Sin horas disponibles. Quizas mas tarde se generen nuevos cupos.    
                {{metric_search/1000}} Seg 
              <hr>
            <suggestedSearch></suggestedSearch>
            </p>

            <p v-if="appointments == null">
                <suggestedSearch></suggestedSearch>
            </p>
            
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
           
            appointments : null ,
            appointment : null ,
            show_modal : null ,
            appointment_confirm : null ,
            key : 0 ,

            notificationMessage : null,
            notificationMessage_alert : false,
            searchParameters : Object , 

            active_spinner : false ,
            metric_search : 0,

            filter_center : false ,
            filter_home : false ,
            filter_remote: false ,

            n_appointments_found : 0 ,
    }
  },

    props: ['global_specialties','global_comunas'], 

 mounted () {
             this.daterequired = new Date().toISOString().split('T')[0] ;
             this.currentDate =  new Date().toISOString().split('T')[0] ;
             console.log('Search Appointment global_specialties'+this.global_specialties);
        },

methods: {

        ///debo incluir los metodos para capturar los eventos de
/*
      form_app_type_center_emit 
      form_app_type_home_emit
      form_app_type_remote_emit
*/
     
        form_app_type_center_emit(value)
        {
          this. filter_center = value
        },

        form_app_type_home_emit(value)
        {
           this. filter_home = value
        },

        form_app_type_remote_emit(value)
        {
           this. filter_remote = value
        },


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
         
     if (  params.specialty != null)
                { 
                  
                let metric = Date.now();
                this.active_spinner = true ; 
                console.log("search Appointments input params :"+JSON.stringify(params) )
                
                let specialty_code = null ;
                specialty_code = params.specialty.id ; 
               

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
           
                        if (this.appointments != null)
                        {
                          this.n_appointments_found = this.appointments.length ;
                        }
                        else
                        {
                          this.n_appointments_found = 0 ;
                        }


           
            }
                else 
                {
                  this.appointments = null;
                  this.n_appointments_found = 0 ;
                }
           
           
           },







            updateLastSearch()
            {
                console.log ("update Last Search") ;
                this.searchAppointments(this.params_bkp);
            }




        },

}
</script>