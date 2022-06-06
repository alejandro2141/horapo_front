<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>

    <div class="d-flex justify-content-between mb-3">
                    
        <div class="p-2">
            <text class="fs-1 fw-light"> {{ appointment.start_time.substring(0,5) }} </text><br>
            <text class="fs-3 fw-lighter" >
                <i v-if="appointment.center_visit" class=" bi bi-building"></i>      
                <i v-if="appointment.home_visit"  class=" bi bi-house-door" > </i>                                  
                <i v-if="appointment.remote_care" class=" bi bi-camera-video"></i>                         
            </text> 
        </div>
                    
        <div  class="w-100 text-white  p-2" :style="{ 'background-color' : appointment.calendar_color  }"  style="border-radius: 15px;"  >
                            
            <div class=""  >
                <text class="display-6 m-0 p-0" ><small> {{specialtyId2name(appointment.specialty)}} </small> </text>
            </div>  
                       
            <div class="">
                <text class="display-6 m-0 p-0" > 
                    <small> <small> {{ getCenterName(appointment.center_id) }} </small> </small>
                </text>
            </div>

            <div class=" mt-2">
                        <text > {{appointment.patient_name }}</text><br>
                        <text ><i class="bi bi-dot"></i> id:{{appointment.patient_doc_id }} </text><br>
                        <text ><i class="bi bi-dot"></i> Edad:{{appointment.patient_age }} </text><br>
                        <text v-if="appointment.home_visit"  ><i class="bi bi-dot"></i> A Domicilio <br> 
                        - {{appointment.patient_address }} </text>
                        
                        <text v-if="appointment.center_visit"><i class="bi bi-dot"></i>  En Consulta <br>
                        </text>
                        
                        
                        <text v-if="appointment.remote_care" ><i class="bi bi-dot"></i> Atención Remota  </text>
                    
                   {{appointment.message1 }} 
                   <p></p>

            </div>



                            
        </div>


    </div>




     <!--
    <div  :style="{ 'background-color' : appointment.calendar_color   }"  style="border-radius: 25px;"  class="mb-2 border border-secondary text-muted" data-bs-toggle="modal" :data-bs-target="'#modal_appdetails_'+index"  >
    
        <div class=" ml-4" >

             <div class="d-flex justify-content-start display-6 mb-0"  >
                             <text class="p-1" >
                                        <i v-if="appointment.center_visit" class=" bi bi-building"></i>      
                                        <i v-if="appointment.home_visit"  class=" bi bi-house-door" > </i>                                  
                                        <i v-if="appointment.remote_care" class=" bi bi-camera-video"></i> 
                             </text> 
                             <text class="p-1 text-success "> {{ appointment.start_time.substring(0,5) }} </text>
                             
                             <text class="p-1 text-success "><small> {{ id2name(appointment.specialty)}} </small> </text>
             </div>    

            <p class="display-6 mb-2 mt-0 "> <small><small>&nbsp;&nbsp;&nbsp; {{getCenter(appointment.center_id).name }} </small> </small>   </p>

          
        </div>


            <div class="">
                        <text >&nbsp;&nbsp;&nbsp;<i class="bi bi-dot"></i> {{appointment.patient_name }}</text><br>
                        <text >&nbsp;&nbsp;&nbsp;<i class="bi bi-dot"></i> id:{{appointment.patient_doc_id }} </text><br>
                        <text >&nbsp;&nbsp;&nbsp;<i class="bi bi-dot"></i> Edad:{{appointment.patient_age }} </text><br>
                        <text v-if="appointment.home_visit"  >&nbsp;&nbsp;&nbsp;<i class="bi bi-dot"></i> A Domicilio <br> 
                        &nbsp;&nbsp;&nbsp;- {{appointment.patient_address }} </text>
                        
                        <text v-if="appointment.center_visit">&nbsp;&nbsp;&nbsp;<i class="bi bi-dot"></i>  En Consulta <br>
                        </text>
                        
                        
                        <text v-if="appointment.remote_care" >&nbsp;&nbsp;&nbsp;<i class="bi bi-dot"></i> Atención Remota  </text>
                    
                   {{appointment.message1 }} 
                   <p></p>

            </div>
           
    </div>
    -->

</template>

<style scoped>
</style>


<script>

export default {
   data : function() {
        return {
        }   
    },
   	
    props: ['daterequired','appointment','index','global_specialties', 'global_comunas', 'session_params' ],

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

