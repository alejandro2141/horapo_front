<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>
<template>
    <div class="">
        Lista todas sus citas reservadas

        <p v-for="app in appsTaken" :key='app.id' >
            {{ formatDate(app.date)  }} - {{ formatTime(app.start_time) }} - {{ app.duration }} - CalendarId:{{ app.calendar_id }}
            <br> 
            {{ app.patient_name  }} {{ app.patient_doc_id  }} {{ app.patient_doc_id  }}  {{ app.patient_email  }} {{app.patient_phone1}}
            <br>
         </p>


    </div>     
</template>

<style scoped>

</style>


<script>

export default {
 
data: function () {
		return {
            appsTaken : []
          		 }
	},
	

    props : ['session_params'] ,
	emits : [],

    beforeCreate () {
         console.log("TAB AppointmentsListReserved BegoreCReate");  
        },

    created () {  
          console.log("TAB AppointmentsListReserved Created");  
         },
   

    updated () {
        console.log("TAB AppointmentsListReserved Updated");
            },

    destroyed() {
        console.log("TAB AppointmentsListReserved Destroyed");
    },

    mounted () {
        console.log("TAB AppointmentsListReserved Mounted");
        this.getAppTaken()
    },

 
    methods: {
            formatDate(obj)
            {
                let adate = new Date (obj)
                return (adate.getDate()+"/"+(adate.getMonth()+1)+"/"+adate.getFullYear() )
            },
            formatTime(obj)
            {
                let atime = new Date (obj)
                return (atime.getHours()+":"+atime.getMinutes() )

            },

            async getAppTaken() {
                const json = { 
                    //professional_id : this.session_params.professional_id ,			   
                    professional_id : this.session_params.professional_id ,			   
                      
                            };
                    console.log ("professional_get_appointments_taken :"+ JSON.stringify(json)  );
                    let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_appointments_taken",json);
                    this.appsTaken = response_json.data;
                    console.log ("professional_get_appointments_taken  RESPONSE:"+JSON.stringify(this.appsTaken)) ;                       
            },	


		},
  

}
</script>

