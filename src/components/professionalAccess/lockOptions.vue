<script setup>
import { ref } from 'vue'
import SwitchViewButton from './switchViewButton.vue'
import axios from 'axios';


</script>

<template>
        <div class="align-self-center  text-white " style="width:13%"  >
          <small>
            <!--
            <div @click='active_show_all=!active_show_all; active_reserved=false ; active_available=false; trigger_send_filter=Math.random()' style=" border-top-right-radius:10px ; border-bottom-right-radius:10px" class="p-2 mt-1 bg-secondary text-white" :class="{ 'w-100' : (active_show_all || (active_reserved==false && active_available==false ) ) , 'w-50' : (!active_show_all)  }"  >
              {{dayStatics.total}}<i v-if="active_show_all">Total</i>
            </div>

            <div @click='active_reserved=!active_reserved; active_show_all=false ; active_available=false ; trigger_send_filter=Math.random()' style=" border-top-right-radius:10px ; border-bottom-right-radius:10px" class="justify-content-start  bg-success p-2 mt-1 " :class="{'w-100' : active_reserved, 'w-50' : !active_reserved }"   >
              {{dayStatics.reserved}} <i v-if="active_reserved" class="bi bi-person"></i>
            </div>

            <div @click='active_available=!active_available; active_show_all=false ; active_reserved=false; trigger_send_filter=Math.random()' style=" border-top-right-radius:10px ; border-bottom-right-radius:10px" class="bg-warning text-dark p-2 mt-1" :class="{'w-100' : active_available, 'w-50' : !active_available }"   >
              {{dayStatics.available}}  <i v-if="active_available" class="bi bi-clock-history"></i>
            </div> 
            -->


          </small>
          
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
              trigger_send_filter : 0 ,

              active_reserved : false , 
              active_available : false , 
              active_show_all : true 

              }   
    },

  props : [  'isLockDay' , 'dayStatics', 'lock_dates', 'hours_block_list', 'session_params','daterequired'] ,
	emits : [ 'updateFilter','updateAppointmentList'  ]  ,

 	mounted () {
         },

    methods: {
        },
  
  watch :
  {
    trigger_send_filter(oldvl,newvl)
    {
      this.appFilterShow.reserved =  this.active_reserved
      this.appFilterShow.blocked = false 
      this.appFilterShow.available = this.active_available 
      
      this.$emit("updateFilter",this.appFilterShow);
    },
    //this.$emit("updateFilter",this.appFilterShow);
    
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