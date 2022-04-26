<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
     
    <div  :style="{ 'background-color' : appointment.color   }"  style="border-radius: 25px;"  class="mt-1 border border-secondary" data-bs-toggle="modal" :data-bs-target="'#modal_appdetails_'+index"  >
    
        <div class="d-flex justify-content-between p-2" >
            
            <div class="mr-2 pr-2" style="marginLeft : 5px">
                <div v-if="appointment.center_visit"  >
                    <i class="h1 bi bi-building"></i> 
                    <text class=" h2 text-success "  >&nbsp;&nbsp;{{ id2name(appointment.specialty ) }}  </text> 
                </div>

                <div v-if="appointment.home_visit">
                    <i class="h2 bi bi-house-door" > </i> 
                    <text class="h2 text-success "  >&nbsp;&nbsp; {{ id2name(appointment.specialty ) }}  </text> 
                </div>  
                
                <div v-if="appointment.remote_care">
                       <i class="h2 bi bi-camera-video"></i>
                       <text class="h2 text-success "  >&nbsp;&nbsp; {{ id2name(appointment.specialty ) }}  </text> 
                </div>  
                               
            </div>   

            
            <div class="display-4 ">
                <p>{{appointment.start_time.substring(0, 5) }} <text class="text-muted h6 mt-0"> {{appointment.duration }}m </text> </p>
            </div>
        
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
            <div style=" marginRight : 15px;  " >

                    <ul class="list-group-flush "  style="border-radius: 15px;">
                        <li class="list-group-item " >{{appointment.patient_name }}</li>
                        <li class="list-group-item"> id:{{appointment.patient_doc_id }} </li>
                        <li class="list-group-item">Edad:{{appointment.patient_age }} </li>
                        <li v-if="appointment.home_visit" class="list-group-item" style="color:#3399FF"> A Domicilio <br>  {{appointment.patient_address }} </li>
                        
                        <li v-if="appointment.center_visit" class="list-group-item"> En Consulta <br> {{appointment.center_id }}  </li>
                        
                        
                        <li v-if="appointment.remote_care" class="list-group-item"> Atención Remota  </li>
                    </ul>
                    {{appointment.message1 }}

            </div>
           
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
   	
    props: ['daterequired','appointment','index','global_specialties', 'global_comunas'],

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

        }

    }
}
</script>

