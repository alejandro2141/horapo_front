<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>


                    <div class="d-flex justify-content-between border border-3"  :class="{ ' border-primary': selectApp }"  style="background-color: #D4D4D4;  border-bottom-left-radius: 25px; border-top-right-radius: 25px;">
                    
                        <div @click="selectApp=!selectApp; $emit('addToBlockList',appointment) " class="p-2 "  >
                            <text class="fs-3 fw-light"> {{ appointment.start_time.substring(0,5) }} </text><br>
                            <text class="fs-3 fw-light text-muted" >
                                <i v-if="center_data.center_visit" class=" bi bi-building"></i>      
                                <i v-if="center_data.home_visit"  class=" bi bi-house-door" > </i>                                  
                                <i v-if="center_data.remote_care" class=" bi bi-camera-video"></i>                         
                            </text> 
                        </div>

                         <div class="d-flex justify-content-between w-100" style="background: repeating-linear-gradient(-45deg, rgb(0, 0, 0), rgb(136, 136, 136) 1px, rgb(51, 51, 51) 5px, rgb(51, 51, 51) 10px); border-top-right-radius: 25px;" >       
                                <div @click="selectApp=!selectApp; $emit('addToBlockList',appointment) " class="w-100 text-white display-6 p-2"  >
                                    
                                    <div class=""  >
                                        <text class="" ><small>  {{specialtyId2name(appointment.specialty)}} </small> </text>
                                    </div>  
                                
                                    <div class="">
                                        <text class="" > 
                                            <small> <small> {{center_data.name}} </small> </small>
                                        </text>
                                    </div>
                                </div>    
                                
                                <div @click="$emit('displayModalAppAvailable', center_data )" style="background-color: #000 ; opacity: 0.6;  border-top-right-radius:25px" >
                                    <i style="font-size: 60px; padding:0px ; margin:-5px ; border:0px" class="bi bi-chevron-compact-right text-white" ></i> 
                                </div>   
                        </div> 

                                <!--
                                <div @click="$emit('displayModalAppAvailable', center_data )" class="w-100 text-white display-6 p-2" style="background: repeating-linear-gradient(-45deg, rgb(0, 0, 0), rgb(136, 136, 136) 1px, rgb(51, 51, 51) 5px, rgb(51, 51, 51) 10px); border-radius: 15px;"   >
                                    
                                    <div class=""  >
                                        <text class="" ><small>  {{specialtyId2name(appointment.specialty)}} </small> </text>
                                    </div> 
                                                                   
                                    <div class="">
                                        <text class="" > 
                                            <small> <small> {{center_data.name}} </small> </small>
                                        </text>
                                    </div>

                                </div>   
                                -->
                                                     
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
            selectApp : false ,
          
        }   
    },
   	
    props: [ 'appointment', 'calendar_data', 'center_data' , 'days_expired','daterequired','index','global_specialties', 'global_comunas', 'session_params' ],
    emits:  ['displayModalAppAvailable', 'addToBlockList' ] ,

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