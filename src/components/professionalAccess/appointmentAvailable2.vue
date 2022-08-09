<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
                    <div class="d-flex justify-content-between m-1"  style="background-color: #D4D4D4;  border-radius: 15px;">
                    
                        <div class="p-2"  >
                            <text class="fs-3 fw-light"> {{ appointment.start_time.substring(0,5) }} </text><br>
                            <text class="fs-3 fw-light text-muted" >
                                <i v-if="center_data.center_visit" class=" bi bi-building"></i>      
                                <i v-if="center_data.home_visit"  class=" bi bi-house-door" > </i>                                  
                                <i v-if="center_data.remote_care" class=" bi bi-camera-video"></i>                         
                            </text> 
                        </div>
                       
                                <div  class="w-100 text-white display-6 p-2" :style="[ {'background-color' : calendar_data.color} , (days_expired ) ? { 'background-color': '#444'}:{ } , (appointment.lock_day ) ? { 'background-color': '#444', 'background' : 'repeating-linear-gradient( -45deg, #000, #888 1px, #333 5px, #333 10px )' }:{ 'opacity': '1' }  ]"  style="border-radius: 15px;"  >
                                    
                                    <div class=""  >
                                        <text class="" ><small>  {{specialtyId2name(appointment.specialty)}} </small> </text>
                                    </div>  
                                
                                    <div class="">
                                        <text class="" > 
                                            <small> <small> {{center_data.name}} </small> </small>
                                        </text>
                                    </div>
                                </div>                        
                    </div>
</template>

<style scoped>

/*
background-color: #e5e5f7;
opacity: 0.8;
background: repeating-linear-gradient( -45deg, #444cf7, #444cf7 5px, #e5e5f7 5px, #e5e5f7 25px );
*/
</style>


<script>

export default {
   data : function() {
        return {
          
        }   
    },
   	
    props: [ 'appointment', 'calendar_data', 'center_data' , 'days_expired','daterequired','index','global_specialties', 'global_comunas', 'session_params' ],

	created () {
         },

	methods :{
      	
       specialtyId2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },
       
       

    }
}

</script>