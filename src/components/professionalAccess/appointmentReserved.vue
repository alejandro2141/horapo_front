<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
     
    <div  :style="{ 'background-color' : getCenter(appointment.center_id).center_color   }"  style="border-radius: 25px;"  class="mb-2 border border-secondary text-muted" data-bs-toggle="modal" :data-bs-target="'#modal_appdetails_'+index"  >
    
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

            <!--
            <div class="mr-2 pr-2" style="marginLeft : 5px">
     
                <div v-if="appointment.center_visit"  >
                    <i class="h1 bi bi-building"></i> 
                    <text class=" h2"  >&nbsp;&nbsp;{{ id2name(appointment.specialty ) }}  </text> 
                </div>

                <div v-if="appointment.home_visit">
                    <i class="h2 bi bi-house-door" > </i> 
                    <text class="h2  "  >&nbsp;&nbsp; {{ id2name(appointment.specialty ) }}  </text> 
                </div>  
                
                <div v-if="appointment.remote_care">
                       <i class="h2 bi bi-camera-video"></i>
                       <text class="h2  "  >&nbsp;&nbsp; {{ id2name(appointment.specialty ) }}  </text> 
                </div>  
                               
            </div>   
            -->

            <!--
            <div class="display-6 ">
             <text class="text-muted"> <small>{{appointment.duration }}min </small></text> 
            </div>
            -->
        
        </div>



        
  <!--
        <div id="app " class="m-0 d-flex  "  >			
                

                <div class="mt-2 w-100" >
                    <div class="d-flex justify-content-between " >
                        <div>
                            <text class="" v-if='appointment.confirmation_status == 0' >
                            <br>  Reservada.<br> <text class="bg-secondary text-white" > Sin Confirmar </text>
                            </text>
                        </div>
                    
                    </div>
                    
                     <div class="text-danger" v-if="appointment.app_blocked == 1 ">
                     Espacio de tiempo Bloqueado
                     </div>
                </div>
        </div>
-->
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
           
           <!-- <text class="text-secondary p-2 m-2" style="">#{{appointment.id}} </text>    -->

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
   	
    props: ['daterequired','appointment','index','global_specialties', 'global_comunas', 'session_params' ],

	created () {
	},
	methods :{
      	
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

    }
}
</script>

