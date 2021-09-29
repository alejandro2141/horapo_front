<script setup>
import { ref } from 'vue'
import axios from 'axios';

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
    <div class="h2" >
    Busca una Hora profesional
    </div>
        <div>
            <div>
            <searchAppointmentForm  v-on:searchAppointments="searchAppointments"></searchAppointmentForm>
           
            <searchAppointmentResult  v-if="daterequired != null && appointments != null"  v-on:updateLastSearch="updateLastSearch"  :appointments="appointments" :daterequired="daterequired"  > </searchAppointmentResult> 	    
            </div>
     </div>
</template>

<style scoped>

</style>


<script>
//const showForm = ref(false)
import searchAppointmentForm  from './SearchAppointmentForm.vue' 
import searchAppointmentResult  from './SearchAppointmentResult.vue'

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
    }
  },

 mounted () {
             this.daterequired = new Date().toISOString().split('T')[0] ;

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
            this.params_bkp = params ; 
                console.log("search Appointments input "+JSON.stringify(params) )
                 const json = { 
				// agenda_id : this.par_agenda_id ,			 
				 date : this.daterequired ,
				 specialty : params.specialty ,
                 comuna : params.comuna ,
                 insurance : params.insurance,
                  		  };
				console.log ("getAppointments REQUEST :"+ JSON.stringify(json)  );
				//let response_json = await axios.post("http://192.168.0.110:8080/patient_get_appointments_day",json);
				let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/patient_get_appointments_day",json);
				console.log ("getAppointments RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
				this.appointments = response_json.data.rows;
               // this.notificationMessage="Econtramos "+this.appointments.length+" resultados, desde dia "+this.daterequired +" ";	
                this.notificationMessage_alert=	false ;

            },

            updateLastSearch()
            {
                console.log ("update Last Search") ;
                this.searchAppointments(this.params_bkp);
            }


        },

}
</script>