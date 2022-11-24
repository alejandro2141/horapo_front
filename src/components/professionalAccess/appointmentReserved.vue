<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
                    <div class="d-flex justify-content-start border border-2 "  :class="{ 'border-primary': selectApp, 'border-success': !selectApp }"  style="background-color: #fff;  border-bottom-left-radius: 25px; border-top-right-radius: 25px;">
                    
                        <div @click="selectApp=!selectApp; $emit('addToBlockList',appointment) " class="p-2" :class="{'bg-primary text-white':selectApp }" style=" border-bottom-left-radius: 25px;" >
                            <text class="fs-3 fw-light " > {{  format_start_time(appointment.start_time) }} </text><br>
                            <text class="fs-3 fw-light " >
                                <i v-if="center_data.center_visit" class=" bi bi-building"></i>      
                                <i v-if="center_data.home_visit"   class=" bi bi-house-door" > </i>                                  
                                <i v-if="center_data.remote_care"  class=" bi bi-camera-video"></i>                   
                            </text>
                            <text> 
                               <!-- <i style="color:#5BA199" class="display-3 bi bi-person-fill"></i>    -->
                                <i class="display-5 bi bi-person-fill"></i>
                            </text> 
                        </div>

                        <div class="d-flex justify-content-between w-100"  :style="[  (days_expired ) ? { 'background-color': '#eee'}:{ } , (appointment.lock_day ) ? { 'background-color': '#444', 'background' : 'repeating-linear-gradient( -45deg, #000, #888 1px, #333 5px, #333 10px )' }:{ 'opacity': '1' }  ]"  style="border-top-right-radius: 25px;" >       
                                <div @click="selectApp=!selectApp; $emit('addToBlockList',appointment) " class="w-100 text-dark display-6 p-2"  style=""  >
                                    
                                    <div class=""  >
                                        <text class="" ><small>  {{specialtyId2name(appointment.specialty)}} </small> </text>
                                    </div>  
                                
                                    <div class="">
                                        <text class="mt-0 pt-0" > 
                                            <small> <small> {{center_data.name}} </small> </small>
                                        </text>
                                    </div>
                                    
                                    <div class="fs-5">
                                         <small> <small>
                                                <text > {{appointment.patient_name }}</text><br>
                                                <text >id:{{appointment.patient_doc_id }}, {{appointment.patient_age }} Años.  </text><br>
                                                <!-- <text ><i class="bi bi-dot"></i> Edad:{{appointment.patient_age }} </text><br> -->
                                                
                                                <text v-if="appointment.home_visit"  ><i class="bi bi-dot"></i> A Domicilio <br> 
                                                - {{appointment.patient_address }} 
                                                </text>
                                        </small> </small>
                                    </div>
                                </div>    
                                
                                <div @click="$emit('displayModalReservedDetails', appointment )" style="background-color: #5BA199 ; opacity: 0.6;  border-top-right-radius:25px" >
                                    <i style="font-size: 60px; padding:0px ; margin:-5px ; border:0px" class="bi bi-chevron-compact-right text-white"  ></i> 
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
               //calendar_data : null  ,
               //center_data : null , 
               selectApp : false ,
              // days_expired : false ,
             
        }   
    },
   	
    props: ['daterequired', 'days_expired' , 'appointment','index','global_specialties','global_comunas','specialty_data','center_data','calendar_data','session_params' ],
    emits: ['displayModalReservedDetails'],

	created () {
        //this.center_data = this.session_params.centers.find(elem => elem.id == this.appointment.center_id )
        //this.calendar_data = this.session_params.calendars.find(elem => elem.id == this.appointment.calendar_id )
        /*
        if ( this.calendar_data == null)
        {
            this.calendar_data = { color: '#5A9358' }
        }
        */
    },

	methods :{

        format_start_time(date_time)
        {
            let aux= new Date(date_time)
            return ( String(aux.getHours()).padStart(2,0) +":"+String(aux.getMinutes()).padStart(2,0) )
        },

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

      	/*
        id2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
        },

        id2comuna(id){
            let temp= this.global_comunas.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
        },
        getCenter(id){
            let temp= this.session_params.centers.find(elem => elem.id ==  id  )
            if (temp != null) { return temp }
            else { return null }
        },
        */

    }
}
</script>

