<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
                    <div class="d-flex justify-content-start "  :class="{ 'border-primary': selectApp, 'border-success': !selectApp }"  style="background-color: #fff;  border-bottom-left-radius: 0px; border-top-right-radius: 25px; border-bottom-right-radius: 25px;">
                      
                      <div  v-if="calendar_data!=null && calendar_data.color!=null" class="p-1" :style="[ {'background-color' : calendar_data.color}]" >
                      </div>
                      

                        <div @click="selectApp=!selectApp; $emit('addToBlockList',appointment) " class="p-2" :class="{'bg-primary text-white':selectApp }" style=" border-bottom-left-radius: 0px; " >
                            
                            <text v-if="includeExtraData">
                              {{ format_start_date(appointment.date) }}<br>
                            </text> 

                            <text class="fs-3 fw-light " > {{format_start_time(appointment.start_time) }} </text>
                            <br>
                            <text> 
                               <!-- <i style="color:#5BA199" class="display-3 bi bi-person-fill"></i>    -->
                                <i class="display-5" :class="[{'text-success bi bi-person-check': appointment.patient_confirmation}, {'text-dark bi bi-person': appointment.patient_confirmation!=true} ]" ></i>
                            </text>

                            <br>
                            <text class="fs-3 fw-light " >
                                <i v-if="center_data.center_visit" class=" bi bi-building"></i>      
                                <i v-if="center_data.home_visit"   class=" bi bi-house-door" > </i>                                  
                                <i v-if="center_data.remote_care"  class=" bi bi-camera-video"></i>                   
                            </text>

                        </div>

                        <div class="d-flex justify-content-between w-100"  :style="[ (days_expired ) ? { 'background-color': '#FFF'}:{ } , (appointment.lock_day ) ? { 'background-color': '#444', 'background' : 'repeating-linear-gradient( -45deg, #000, #888 1px, #333 5px, #333 10px )' }:{ 'opacity': '1' }  ]"  style="border-top-right-radius: 25px;border-bottom-right-radius: 25px;" >       
                                <div @click="selectApp=!selectApp; $emit('addToBlockList',appointment) " class="w-100 text-dark display-6 p-2"  style=""  >
                                  
                                    <div class=""  >
                                        <text class="" ><small>  {{specialtyId2name(appointment.specialty)}} </small> </text>
                                    </div>  
                                
                                    <div class="">
                                        <text class="mt-0 pt-0" > 
                                            <small> <small> {{center_data.name.concat('               ').substring(0, 20)}} </small> </small>
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
                                                <text v-if="appointment.cancelled_professional !=null &&  appointment.cancelled_professional"  class="text-danger">
                                                    Cancelada por profesional
                                                </text>
                                                <text v-if="appointment.cancelled_patient !=null &&  appointment.cancelled_patient"  class="text-danger">
                                                    Cancelada por paciente 
                                                </text>
                                                <br>
                                                <text v-if="appointment.cancelled_date !=null"  class="text-danger">
                                                  
                                                    {{  appointment.cancelled_date }}
                                                </text>


                                               
                                        </small> </small>
                                    </div>
                                </div>    
                                
                                <div @click="displayModalAppReserved(appointment)" style="background-color: #5BA199 ; opacity: 0.6;  border-top-right-radius:25px;  border-bottom-right-radius:25px" >
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
   	
    props: [ 'includeExtraData' ,'daterequired', 'days_expired' , 'appointment','index','global_specialties','global_comunas','specialty_data','center_data','calendar_data','session_params' ],
    emits: ['displayModalReservedDetails'],

	created () {
        
    },

	methods :{

        displayModalAppReserved(app)
        {

            let aux_appointment = JSON.parse(JSON.stringify(app));
            aux_appointment.center_data = JSON.parse(JSON.stringify(this.center_data)); 

            console.log("display APP Reserved: "+JSON.stringify(aux_appointment));
            this.$emit('displayModalReservedDetails', aux_appointment ) 
           
        },

        format_start_date(app_date)
        {
            let adate = new Date (app_date)
            return (adate.getDate()+"/"+(adate.getMonth()+1)+"/"+adate.getFullYear() )
        },

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

        /*
         getCenterName(id){
            let temp= this.session_params.centers.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return "No Existe Centro" }
        },
        */

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

