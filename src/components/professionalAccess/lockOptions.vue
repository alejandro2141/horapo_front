<script setup>
import { ref } from 'vue'
import SwitchViewButton from './switchViewButton.vue'
import axios from 'axios';


</script>

<template>
        <div class="align-self-center  text-white w-25" >
        <small>

          <div @click='appFilterShow.reserved  = false ; appFilterShow.blocked = false ; appFilterShow.available=false ; trigger_filter=Math.random()' class=" border border-1 p-1 text-dark w-25" :class="{ 'w-75' : appFilterShow.available }" >
            {{dayStatics.total}}
          </div>
          
          <div @click='appFilterShow.reserved  = !appFilterShow.reserved ; appFilterShow.blocked=false; appFilterShow.available=false ; trigger_filter=Math.random()' class="bg-success mt-1 p-1 w-25" :class="{ 'w-75' : appFilterShow.reserved }" >
           {{dayStatics.reserved}} <i v-if="appFilterShow.reserved" class="m-0 p-0 h1 bi bi-eyeglasses"></i>
          </div>
          <!--
          <div @click="appFilterShow.blocked = !appFilterShow.blocked ; appFilterShow.reserved=false; appFilterShow.available=false ; trigger_filter=Math.random()" class="mt-1 text-white p-1  w-25" :class="{ 'w-75' : appFilterShow.blocked }"  style="background : repeating-linear-gradient( -45deg, #000, #888 1px, #333 5px, #333 10px ) ;  opacity: 1 ; " >
            {{dayStatics.blocked}} <i v-if="appFilterShow.blocked" class="m-0 p-0 h1 bi bi-eyeglasses"></i>
          </div>
          -->
          <div @click="appFilterShow.available = !appFilterShow.available ; appFilterShow.reserved=false; appFilterShow.blocked=false ; trigger_filter=Math.random()" class=" bg-warning text-dark mt-1 p-1  w-25" :class="{ 'w-75' : appFilterShow.available }" >
          {{dayStatics.available}} <i v-if="appFilterShow.available" class="m-0 p-0 h1 bi bi-eyeglasses"></i>
          </div>

        </small>
          
           <!-- <i class=" m-2 fs-2 bi bi-unlock" @click="showLockOptions=!showLockOptions"> </i> -->
          <!--
            <div class="text-primary"  >    
              <div v-if="isLockDay">
                  <i  class=" m-2 fs-2 bi bi-lock-fill " @click="sendUnLock()"></i> <br>
                  <text class="fs-7"><small>Dia Cerrado</small></text>
              </div>
              <div v-else>
                <i class=" m-2 fs-2 bi bi-unlock "  @click="sendLock()"> </i> 
              </div>
          </div>
        
           <Transition>
            <div v-if="showLockOptions">
               
              <hr>
             <text @click="sendLockDay()" >Dia </text>
              <hr>
             <text @click="lockWeek()" >Semana </text>
            </div>
           </Transition>
        -->

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
              appFilterShow : { reserved  : false , blocked : false ,  available : false },
              trigger_filter : 0 ,
              }   
    },

  props : [  'isLockDay' , 'dayStatics', 'lock_dates', 'hours_block_list', 'session_params','daterequired'] ,
	emits : [ 'updateFilter','updateAppointmentList'  ]  ,

 	mounted () {
         
    },

    methods: {
    
            async  sendLock(hour)
            {
              /*
              console.log("professional_send Lock");
              if (this.hours_block_list !=null && this.hours_block_list.length > 0   )
              {
                var r = confirm("Esta seguro que desea bloquear estas Horas? Pacientes no podran agendar horas en este dia");               
                             if (r == true) {
                                const json = {  
                                    token: 'apsfdnwe', 
                                    appointment_date : this.daterequired ,                         
                                    lock_apps :   this.hours_block_list , 
                                    professional_id  : this.session_params.professional_id 	, 
                                };

                                console.log ("professional_lock_apps  REQUEST :"+ JSON.stringify(json)  );
                                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_block_appointments",json );
                                //console.log ("RESPONSE save_appointmentJSON.stringify(response_json) :"+JSON.stringify(response_json)) ;
                                console.log ("RESPONSE professional_lock_apps :"+JSON.stringify(response_json)) ;
                                //this.appointment_confirm = response_json.data ;
                                this.$emit('updateAppointmentList');
                                }
              
              }
              else
              {                
                var r = confirm("Esta seguro que desea bloquear este dia? Pacientes no podran agendar horas en este dia");
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
              }

            },

            async  sendUnLock(hour)
            {
                console.log("professional_UN lock");
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
            */

        },
    },
  
  watch :
  {
    trigger_filter(newVal,oldVal)
    {
      console.log ("appFilterShow CHANGE!!! to "+JSON.stringify(this.appFilterShow));
      this.$emit("updateFilter",this.appFilterShow);
    },

    daterequired(newVal,oldVal)
    {
    /*  
       console.log("Check if DATE:"+newVal+" is in LockDates"+JSON.stringify(this.lock_dates))

          if (this.lock_dates!=null)
          {
            if (this.lock_dates.includes(this.daterequired))
            {this.isLockDay=true}
            else{
              this.isLockDay=false
            }
          }     
      */
    }

  },

}


</script>