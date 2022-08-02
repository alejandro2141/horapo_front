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
            center_data : null , 
            calendar_data : null,
        }   
    },
   	
    props: ['days_expired','daterequired','appointment','index','global_specialties', 'global_comunas', 'session_params' ],

	created () {
        this.center_data = this.session_params.centers.find(elem => elem.id == this.appointment.center_id )
        this.calendar_data = this.session_params.calendars.find(elem => elem.id == this.appointment.calendar_id )
    },
    
    /*
    watch : {

        appointment(newVal)
        {
           this.center_data = this.session_params.centers.find(elem => elem.id == newVal.center_id )
           console.log("New Appointment, get CENTER:"+JSON.stringify(this.center_data));
        }
    },
    */

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
        getCenterData(id){
            let temp= this.session_params.centers.find(elem => elem.id ==  id  )
            if (temp != null) { return temp }
            else { return "No Existe Centro" }
        },
       
       

    }
}

</script>

