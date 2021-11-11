<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
     
    <div   class="mb-2  bg-white " data-bs-toggle="modal" :data-bs-target="'#modal_appdetails_'+index"  >
        <div id="app " class="m-0 d-flex  "  >			
                
                <div class="m-0 border-bottom" :style="{'background-color' : '#'+appointment.center_color }" >
                    &nbsp;  &nbsp;&nbsp;
                </div>
        
                <div class="m-2">
                    
                    <div class="display-4">
                    {{appointment.start_time.substring(0, 5) }}							
                    </div>
                    <div class="text-muted">
                   {{appointment.duration }}min.  
                    </div>

                 
                </div>
                
                <div class="mt-2 w-100" >
                    <div class="d-flex justify-content-between " >
                        <div>
                        {{appointment.specialty_name }} 
                        <i v-if="appointment.available_public_search" style="margin-left: 1.0em;" class="bi bi-wifi text-success ">On Line</i>
                        <br>

                        <div class="text-danger" v-if="appointment.app_status == 1 ">
                            Cita Cancelada 
                        </div>

                        <text class="bg-info text-white" v-if='appointment.confirmation_status == 0' >Sin Confirmar </text>
                       
                        </div>
                       

                    </div>
                    
                    
                    
                    
                   
                     <div class="text-danger" v-if="appointment.app_blocked == 1 ">
                     Espacio de tiempo Bloqueado
                     </div>
                </div>


        
        </div>

            <div>
                <i class="display-4 bi bi-file-earmark-person"></i>
                    {{appointment.patient_name }} 
                    {{appointment.patient_age }}Años, id:{{appointment.patient_doc_id }}
                    </div>
            
            <div>
                    {{appointment.center_name }}<br>
            </div>
             <div>
                    {{appointment.center_address }}<br>
            </div>

           	
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
   	
    props: ['daterequired','appointment','index','global_specialties'],

	created () {
	},
	methods :{
    }
}
</script>

