<script setup>
import { ref } from 'vue'
import axios from 'axios';

import CalendarPickerMinimal from './calendarPickerMinimal.vue'
import DateRequiredActions from './dateRequiredActions.vue'
import ListAppointments from './listAppointments.vue'
import FirstTimeLogin from './firstTimeLogin.vue'
import loadProgress from '../loadProgress.vue'

</script>

<template>
<loadProgress  :active_spinner="active_spinner" > </loadProgress>
      <div v-if='!session_params.first_time' >

            <CalendarPickerMinimal  v-on:set_daterequired="set_daterequired"  > </CalendarPickerMinimal>
          <!-- <DateRequiredActions :daterequired="daterequired" ></DateRequiredActions> --> 
           <ListAppointments  v-on:updateAppointmentList="updateAppointmentList" v-if="session_params" :daterequired="daterequired" :appointments="appointments" :session_params="session_params" v-on:switchView='switchView' :global_specialties='global_specialties' :global_comunas="global_comunas" ></ListAppointments>

            <div id='footer' style='height : 800px'>
            </div>
	    </div>

      <div v-else>
        <FirstTimeLogin v-on:switchToCenters='switchToCenters' ></FirstTimeLogin>
      </div>

</template>

<style scoped>
</style>


<script>

export default {
data: function () {
		return {
			//prevCenterId : 'NoSet' ,
			//centers: null ,
            daterequired: null ,
            appointments: null, 
            active_spinner : false , 
		 }
	},
	props: ['session_params','global_specialties', 'global_comunas' ],
  emits: ['switchView','switchToCenters' ] ,
    created () {
            //this.daterequired="12-12-2021";
            //this.getCenters();
            console.log("TAB APPOINTMENT session_params "+ this.session_params.professional_id );   
            this.daterequired = new Date().toISOString().split('T')[0] ;
           // this.updateAppointmentList();
         },
 
    methods: {

        switchView(){
            this.$emit('switchView');
         },

        switchToCenters(){
            this.$emit('switchToCenters');
        },

        set_daterequired : function (year_month_day) {
            console.log("TAB HOME GoToDay "+year_month_day);
           // this.getAppointments(year_month_day);
            this.daterequired = year_month_day ;
            //this.showSpinner(1000);
            this.updateAppointmentList();
            },

        async updateAppointmentList() {
          this.active_spinner = true ;  	
              const json = { 
              // agenda_id : this.par_agenda_id ,			 
              date : this.daterequired ,
              professional_id : this.session_params.professional_id , 
                    };
              console.log ("getAppointments REQUEST :"+ JSON.stringify(json)  );
              let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_appointments_day",json);
              console.log ("getAppointments RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
              this.appointments = response_json.data.rows;		
          this.active_spinner = false ;  
		    },
  },

}
</script>

