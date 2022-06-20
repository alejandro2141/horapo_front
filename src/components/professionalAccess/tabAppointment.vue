<script setup>
import { ref } from 'vue'
import axios from 'axios';

import CalendarPickerMinimal2 from './calendarPickerMinimal2.vue'
import DateRequiredActions from './dateRequiredActions.vue'
import ListAppointments from './listAppointments.vue'
import FirstTimeLogin from './firstTimeLogin.vue'
import loadProgress from '../loadProgress.vue'

</script>

<template>
<div>
  <loadProgress  :active_spinner="active_spinner" > </loadProgress>
      <div v-if='!session_params.first_time' >

           <CalendarPickerMinimal2 class="mt-3" v-on:set_daterequired="set_daterequired"  > </CalendarPickerMinimal2>
          <!-- <DateRequiredActions :daterequired="daterequired" ></DateRequiredActions> --> <br>
           <ListAppointments  v-on:updateAppointmentList="updateAppointmentList" v-if="session_params" :daterequired="daterequired" :appointments="appointments" :calendars_marks="calendars_marks" :session_params="session_params" v-on:switchView='switchView' :global_specialties='global_specialties' :global_comunas="global_comunas" ></ListAppointments>

            <div id='footer' style='height : 800px'>
            </div>
	    </div>

      <div v-else >
        <FirstTimeLogin v-on:switchToCenters='switchToCenters' > </FirstTimeLogin>
      </div>

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
            calendars_marks : null ,
		 }
	},
	props: ['session_params','global_specialties', 'global_comunas' ],
  emits: ['switchView','switchToCenters' ] ,
    created () {
         this.active_spinner = true ;  	
            //this.daterequired="12-12-2021";
            //this.getCenters();
            console.log("TAB APPOINTMENT session_params "+ this.session_params.professional_id );   
            this.daterequired = new Date().toISOString().split('T')[0] ;
            this.updateAppointmentList();
         this.active_spinner = false ;  	
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
              console.log ("professional_get_appointments_day2 REQUEST :"+ JSON.stringify(json)  );
              let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_appointments_day2",json);
              console.log ("/professional_get_appointments_day2 RESPONSE:"+JSON.stringify(response_json.data)) ;
              //this.updateCalendarsMarks();
              this.appointments = response_json.data;	
            
          this.active_spinner = false ;  
		    },

        async updateCalendarsMarks() {
                        const json = { 
                        //professional_id : this.session_params.professional_id ,			   
                        professional_id : this.session_params.professional_id ,			   
                                     };

                        console.log ("GET CALENDARS REQUEST :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/rofessional_get_calendars",json);
                        this.calendars_marks = response_json.data.rows;
                        
                        //console.log ("RESPONSE Calendars:"+JSON.stringify(this.calendars)) ;                       
        },	




  },

}
</script>

