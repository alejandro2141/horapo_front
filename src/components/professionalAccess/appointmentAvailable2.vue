<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>

                    <div class="d-flex justify-content-start border border-2"  :class="{ 'border-primary': selectApp }"  style="background-color: #fff;  border-bottom-left-radius: 35px; border-top-right-radius: 25px;">
                    
                        <div @click="selectApp=!selectApp; $emit('addToBlockList',appointment) " class="p-2 "  >
                            <text class="fs-3 fw-light"> {{getLocalTime()}} </text><br>
                              <text class="fs-3 fw-light"><small><small><small><small><small><small> <small><small> {{getLocalDate()}} </small></small></small></small></small></small></small></small> </text><br>
                            <text class="fs-3 fw-light text-muted" >
                                <i v-if="center_data.center_visit" class=" bi bi-building"></i>      
                                <i v-if="center_data.home_visit"  class=" bi bi-house-door" > </i>                                  
                                <i v-if="center_data.remote_care" class=" bi bi-camera-video"></i>                         
                            </text> 
                        </div>

                        <div class="d-flex justify-content-between w-100"  :style="[ {'background-color' : calendar_data.color} , (days_expired ) ? { 'background-color': '#eee'  }:{ } , (appointment.lock_day ) ? { 'background-color': '#444', 'background' : 'repeating-linear-gradient( -45deg, #000, #888 1px, #333 5px, #333 10px )' }:{ 'opacity': '1' }  ]"  style="border-top-right-radius: 25px;" >       
                                <div @click="selectApp=!selectApp; $emit('addToBlockList',appointment) " class="w-100 text-dark display-6 p-2" :class="{ 'text-white' : appointment.lock_day}"  style=""  >
                                    
                                    <div class=""  >
                                        <text class="" ><small>  {{specialtyId2name(appointment.specialty)}} </small> </text>
                                    </div>  
                                
                                    <div class="">
                                        <text class="" > 
                                            <small> <small> {{center_data.name}} </small> </small>
                                        </text>
                                    </div>
                                </div>    
                                
                                <div @click="$emit('displayModalAppAvailable', center_data )" style="background-color: #ffff ; opacity: 0.5;  border-top-right-radius:25px" >
                                    <i style="font-size: 60px; padding:0px ; margin:-5px ; border:0px" class="bi bi-chevron-compact-right text-primary"  ></i> 
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
            selectApp : false ,
            hours : null ,
            minutes : null ,
          
        }   
    },
   	
    props: [ 'appointment', 'calendar_data', 'center_data' , 'days_expired','daterequired','index','global_specialties', 'global_comunas', 'session_params' ],
    emits:  ['displayModalAppAvailable', 'addToBlockList' ] ,

	created () {
        //transform UTC to Local get Hour and Minute
       
         },

	methods :{
      	
        specialtyId2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
        },

        getLocalTime()
        {
        let date = new Date(this.appointment.start_time)
        this.hours   = new String(date.getHours())
        this.minutes =  new String(date.getMinutes())
        return  (this.hours.padStart(2,0)+":"+this.minutes.padStart(2,0))
       // return ( this.hours.padStart(2,0)+":"+this.minutes.padStart(2,0)+" "+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear() )
        },
        getLocalDate()
        {
        let date = new Date(this.appointment.start_time)
        this.hours   = new String(date.getHours())
        this.minutes =  new String(date.getMinutes())
        //return  (this.hours.padStart(2,0)+":"+this.minutes.padStart(2,0))
        return (date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear() )
        }
       

    }
}

</script>