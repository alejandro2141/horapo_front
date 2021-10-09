<script setup>
import { ref } from 'vue'
import axios from 'axios';

import CalendarPickerMinimal from './calendarPickerMinimal.vue'
import DateRequiredActions from './dateRequiredActions.vue'
import ListAppointments from './listAppointments.vue'


</script>

<template>
     
      <div>
            <CalendarPickerMinimal  v-on:set_daterequired="set_daterequired"  > </CalendarPickerMinimal>
          <!-- <DateRequiredActions :daterequired="daterequired" ></DateRequiredActions> --> 
           <ListAppointments v-if="session_params" :daterequired="daterequired" :appointments="appointments" :session_params="session_params" ></ListAppointments>

            <div id='footer' style='height : 800px'>
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
		 }
	},
	props: ['session_params'],

    created () {
        //this.daterequired="12-12-2021";
            //this.getCenters();
            this.daterequired = new Date().toISOString().split('T')[0] ;
            this.updateAppointmentList();
         },
 
    methods: {

        set_daterequired : function (year_month_day) {
            console.log("TAB HOME GoToDay "+year_month_day);
           // this.getAppointments(year_month_day);
            this.daterequired = year_month_day ;
            //this.showSpinner(1000);
            this.updateAppointmentList();
            },

        async updateAppointmentList() {
			
				const json = { 
				// agenda_id : this.par_agenda_id ,			 
				 date : this.daterequired ,
				 professional_id : this.session_params.professional_id , 
						  };
				console.log ("getAppointments REQUEST :"+ JSON.stringify(json)  );
				let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_appointments_day",json);
				console.log ("getAppointments RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
				this.appointments = response_json.data.rows;		
		    },
  },

}
</script>

