<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>

                    <div class="d-flex justify-content-between m-1"  style="background-color: #D4D4D4;  border-radius: 15px;">
                    
                        <div class="p-2"  >
                            <text class="fs-3 fw-light"> {{ appointment.start_time.substring(0,5) }} </text><br>
                            <text class="fs-3 fw-light text-muted" >
                                <i v-if="appointment.center_visit" class=" bi bi-building"></i>      
                                <i v-if="appointment.home_visit"  class=" bi bi-house-door" > </i>                                  
                                <i v-if="appointment.remote_care" class=" bi bi-camera-video"></i>                         
                            </text> 
                        </div>
                       
                                <div  class="w-100 text-white display-6 p-2" :style="[ {'background-color' : appointment.calendar_color} , days_expired==true ? { 'background-color': '#444' }:{ 'opacity': '1' }  ]"  style="border-radius: 15px;"  >
                                    
                                    <div class=""  >
                                        <text class="" ><small> {{specialtyId2name(appointment.specialty)}} </small> </text>
                                    </div>  
                                
                                    <div class="">
                                        <text class="" > 
                                            <small> <small> {{ getCenterName(appointment.center_id) }} </small> </small>
                                        </text>
                                    </div>
                                    
                                </div>
                        

                    </div>

</template>

<style scoped>
</style>


<script>

export default {
   data : function() {
        return {
        }   
    },
   	
    props: ['days_expired','daterequired','appointment','index','global_specialties', 'global_comunas', 'session_params' ],

	created () {
	},
	methods :{
      	
       specialtyId2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },
         getCenterName(id){
            let temp= this.session_params.centers.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return "No Existe Centro" }
        },
       

    }
}

</script>

