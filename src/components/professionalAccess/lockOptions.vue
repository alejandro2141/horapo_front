<script setup>
import { ref } from 'vue'
import SwitchViewButton from './switchViewButton.vue'
import axios from 'axios';


</script>

<template>
        <div class="align-self-end p-2" >
           <!-- <i class=" m-2 fs-2 bi bi-unlock" @click="showLockOptions=!showLockOptions"> </i> -->
            <div class="text-primary"  >    
              
              <i v-if="isLockDay" class=" m-2 fs-2 bi bi-lock-fill " @click="sendUnLockDay()"> </i> 
              <i v-else class=" m-2 fs-2 bi bi-unlock "  @click="sendLockDay()"> </i> 
            </div>


           <Transition>
            <div v-if="showLockOptions">
               
              <hr>
             <text @click="sendLockDay()" >Dia </text>
              <hr>
             <text @click="lockWeek()" >Semana </text>
            </div>
           </Transition>
        </div>	
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<script>

export default {
   data : function() {
        return {
              showLockOptions : false ,
              isLockDay : false ,
        }   
    },
  props : [ 'lock_dates', 'session_params','daterequired'] ,
	emits : ['updateAppList']  ,

 	mounted () {
         
    },

    methods: {
        lockDay(){
            console.log("Lock Day");
            },
    
            async  sendLockDay(hour)
            {
                console.log("professional_lock_day");
                var r =confirm("Esta seguro que desea bloquear este dia? Pacientes no podran agendar horas en este dia");
                            if (r == true) {
                                const json = {  
                                    token: 'apsfdnwe',                         
                                    appointment_date : this.daterequired , 
                                    appointment_professional_id  : this.session_params.professional_id 	, 
                                };

                                console.log ("professional_lock_day  REQUEST :"+ JSON.stringify(json)  );
                                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_lock_day",json );
                                //console.log ("RESPONSE save_appointmentJSON.stringify(response_json) :"+JSON.stringify(response_json)) ;
                                console.log ("RESPONSE professional_lock_day :"+JSON.stringify(response_json.data)) ;
                                this.appointment_confirm = response_json.data ;
                                //console.log ("We should display a Confirmation Modal now"+JSON.stringify(appointment_confirm) );
                                this.$emit('updateAppointmentList');
                                }
            },

            async  sendUnLockDay(hour)
            {
                console.log("professional_UN lock_day");
                var r =confirm("DESBLOQUEAR este dia? Pacientes SI podrán agendar horas en este dia");
                            if (r == true) {
                                const json = {  
                                    token: 'apsfdnwe',                         
                                    appointment_date : this.daterequired , 
                                    appointment_professional_id  : this.session_params.professional_id 	, 
                                };

                                console.log ("professional_lock_day  REQUEST :"+ JSON.stringify(json)  );
                                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_unlock_day",json );
                                //console.log ("RESPONSE save_appointmentJSON.stringify(response_json) :"+JSON.stringify(response_json)) ;
                                console.log ("RESPONSE professional_lock_day :"+JSON.stringify(response_json.data)) ;
                                this.appointment_confirm = response_json.data ;
                                //console.log ("We should display a Confirmation Modal now"+JSON.stringify(appointment_confirm) );
                                this.$emit('updateAppointmentList');
                                }
            },

        },
  
  watch :
  {
    daterequired(newVal,oldVal)
    {
    
       console.log("Check if DATE:"+newVal+" is in LockDates"+JSON.stringify(this.lock_dates))

          if (this.lock_dates!=null)
          {
            if (this.lock_dates.includes(this.daterequired))
            {this.isLockDay=true}
            else{
              this.isLockDay=false
            }
          }     


    }

  },

}


</script>