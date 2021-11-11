<script setup>
import { ref } from 'vue'
import axios from 'axios'
import searchAppointmentForm  from './SearchAppointmentForm.vue' 
import searchAppointmentResult  from './SearchAppointmentResult.vue'

</script>

<template>
    <div class="h2 bg-white p-2" >
    Busca tu Hora 
    </div>
        <div>
            <div>
            <searchAppointmentForm  v-on:searchAppointments="searchAppointments"  :global_specialties="global_specialties" :global_comunas="global_comunas" ></searchAppointmentForm>
           
            <searchAppointmentResult  :searchParameters='searchParameters' v-if="daterequired != null && appointments != null"  v-on:updateLastSearch="updateLastSearch"  :appointments="appointments" :daterequired="daterequired"  :global_comunas="global_comunas" > </searchAppointmentResult> 	    
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
    }
  },

    props: ['global_specialties','global_comunas'], 

 mounted () {
             this.daterequired = new Date().toISOString().split('T')[0] ;
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
           
                console.log("search Appointments input params :"+JSON.stringify(params) )
                
                let specialty_code = null ;
                if (params.specialty != null)
                { 
                    specialty_code = params.specialty.id ; 
                }

                 const json = { 
				// agenda_id : this.par_agenda_id ,			 
				 date : this.daterequired ,
				 specialty : specialty_code ,
                 comuna : params.comuna ,
                 insurance : params.insurance,
                  		  };
				console.log ("searchAppointments input to send JSON :"+ JSON.stringify(json)  );
				//let response_json = await axios.post("http://192.168.0.110:8080/patient_get_appointments_day",json);
				let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/patient_get_appointments_day",json);
				console.log ("getAppointments RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
				this.appointments = response_json.data.rows;
               // this.notificationMessage="Econtramos "+this.appointments.length+" resultados, desde dia "+this.daterequired +" ";	
                this.notificationMessage_alert=	false ;
                this.searchParameters = params ;


            },

            updateLastSearch()
            {
                console.log ("update Last Search") ;
                this.searchAppointments(this.params_bkp);
            }


        },

}
</script>