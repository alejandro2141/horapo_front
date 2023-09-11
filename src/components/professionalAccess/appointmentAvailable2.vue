<script setup>
import { ref } from 'vue'
import axios from 'axios';
</script>

<template>
            
            
                <div class="d-flex justify-content-start "  :class="{ 'border-primary': selectApp }"  style="background-color: #fff;  border-bottom-right-radius: 25px; border-top-right-radius: 25px;">
                            <div  class="p-1" :style="[ {'background-color' : calendar_data.color}]" >
                                
                            </div>

                        <div @click="selectApp=!selectApp; $emit('addToBlockList',appointment)"  class="p-2 " :class="{'bg-primary':selectApp ,'text-white':selectApp   }"   >
                            
                            <text class="fs-3 fw-light"> {{getLocalTime()}} </text><br>
                            <!--
                            <text class="fs-3 fw-light"><small><small><small><small><small><small> <small><small> {{getLocalDate()}} </small></small></small></small></small></small></small></small> </text><br>
                            -->
                            <text class="fs-3 fw-light " >
                                <i v-if="center_data.center_visit" class=" bi bi-building"></i>      
                                <i v-if="center_data.home_visit"  class=" bi bi-house-door" > </i>                                  
                                <i v-if="center_data.remote_care" class=" bi bi-camera-video"></i>                         
                            </text> 
                            
                        </div>
                          
                        <div class="d-flex justify-content-start" > 
                          <!--
                            <div  class="p-1" :style="[ {'background-color' : calendar_data.color}]" >
                                
                            </div>
                          -->
                            <div class="d-flex justify-content-between w-100"  :style="[ {'background-color' : '#FFF'} , (days_expired ) ? { 'background-color': '#FFF'  }:{ } , (appointment.lock_day ) ? { 'background-color': '#444', 'background' : 'repeating-linear-gradient( -45deg, #000, #888 1px, #333 5px, #333 10px )' }:{ 'opacity': '1' }  ]"  style=" " >       
                                
                                    <div  @click="selectApp=!selectApp; $emit('addToBlockList',appointment)" class="w-100 text-dark display-6 p-2" :class="{ 'text-white' : appointment.lock_day}"  style=""  >
                                        <div class=""  >
                                            <text class="" ><small>  {{specialty_data.name}} </small> </text>
                                        </div>  
                                    
                                        <div class="">
                                            <text class="" > 
                                                <small> <small> {{center_data.name.concat('          ').substring(0, 17)}} </small> </small>
                                            </text>
                                        </div>

                                        <div> <small> <small>  precio ${{priceFormatter(calendar_data.price)}}</small> </small></div>
                                    </div>    
                                    
                                    <div @click="$emit('displayModalAppAvailable', center_data )"  style="background-color: #ffff ; opacity: 0.5;  border-top-right-radius:25px" >
                                        <i style="font-size: 60px; padding: 0px ; padding: 0px ; border:0px" class="bi bi-chevron-compact-right text-primary "  ></i> 
                                    </div>   
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
            selectApp : false ,
          
        }   
    },
   	
    props: [ 'appointment' , 'specialty_data',  'calendar_data', 'center_data' ,'session_params' , 'days_expired' ],
    emits: [ 'displayModalAppAvailable', 'addToBlockList' ] ,

	methods :{

        priceFormatter(amount) 
        {
            return   amount.toLocaleString('es-cl');
        },

        getLocalTime()
        {
        let aux_date = new Date(this.appointment.start_time)
        let aux_hour    = new String(aux_date.getHours())
        let aux_minutes = new String(aux_date.getMinutes())
        //return  (aux_date.hours.padStart(2,0)+":"+aux_date.padStart(2,0))
        return  (aux_hour.padStart(2,0)+":"+aux_minutes.padStart(2,0))

        },
        getLocalDate()
        {
        let date = new Date(this.appointment.start_time)
        //this.hours   = new String(date.getHours())
        //this.minutes =  new String(date.getMinutes())
        return (date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear() )
        }
       
    }
}

</script>