<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
     
    <div  :style="{ 'background-color' : getCenter(appointment.center_id).center_color   }"  style="border-radius: 25px;"  class="mt-1 border border-secondary text-muted" data-bs-toggle="modal" :data-bs-target="'#modal_appdetails_'+index"  >
    
        <div class="d-flex justify-content-between ml-4" >

             <div class="d-flex justify-content-start display-6"  >
                             <text class="p-1" >
                                        <i v-if="appointment.center_visit" class=" bi bi-building"></i>      
                                        <i v-if="appointment.home_visit"  class=" bi bi-house-door" > </i>                                  
                                        <i v-if="appointment.remote_care" class=" bi bi-camera-video"></i> 
                             </text> 
                             <text class="p-1  "> {{ appointment.start_time.substring(0,5) }} </text>
                             
                             <text class="p-1  "><small> {{ id2name(appointment.specialty)}} </small> </text>
             </div>    


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
            <p class="ml-5">
                        <text >{{appointment.patient_name }}</text><br>
                        <text > id:{{appointment.patient_doc_id }} </text><br>
                        <text >Edad:{{appointment.patient_age }} </text><br>
                        <text v-if="appointment.home_visit" class="list-group-item" style="color:#3399FF"> A Domicilio <br> 
                         {{appointment.patient_address }} </text>
                        
                        <text v-if="appointment.center_visit">  En Consulta <br>
                         {{getCenter(appointment.center_id).name }}  </text>
                        
                        
                        <text v-if="appointment.remote_care" > Atención Remota  </text>
                    
                    {{appointment.message1 }}

            </p>
           
            <text class="text-secondary p-2 m-2" style="">#{{appointment.id}} </text>   

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

