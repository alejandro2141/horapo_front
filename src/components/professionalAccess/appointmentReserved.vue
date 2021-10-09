<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
     
    <div   class="mb-2  bg-light " data-bs-toggle="modal" :data-bs-target="'#modal_appdetails_'+index"  >
        <div id="app " class="m-0 d-flex  "  >			
                
                <div class="m-0 border-bottom" :style="{'background-color' : '#'+appointment.center_color }" >
                    &nbsp;  &nbsp;&nbsp;
                </div>
        
                <div class="m-2">
                    
                    <div>
                    {{appointment.date.substring(0, 10) }} 
                    </div>
                    <div class="display-2">
                    {{appointment.start_time.substring(0, 5) }}							
                    </div>
                    <div class="display-6">
                    a {{appointment.end_time.substring(0, 5) }}
                    </div>

                    <div class="display-1 text-success">
                        <i class="fas fa-user-injured"></i>
                    </div>

                </div>
                
                <div class="mt-2 w-100" >
                    <div class="d-flex justify-content-between " >
                        <div>
                        {{appointment.specialty_name }}
                                <div class="text-danger" v-if="appointment.app_status == 1 ">
                                    Cita Cancelada 
                                </div>

                        </div>
                        <div  v-if="appointment.available_public_search == 1">
                                <i class="fas fa-wifi text-success"></i>
                        </div>
                        <div v-else >
                                <i class="fas fa-wifi text-muted"></i>
                        </div>
                    </div>
                    
                    <div>
                    Paciente:   {{appointment.patient_name }}<br>
                    Edad: {{appointment.patient_age }} <br/>
                    Rut:{{appointment.patient_doc_id }}
                    </div>
                    
                    <div>
                    {{appointment.center_name }}<br>
                    </div>
                    <div>
                    {{appointment.center_address }}<br>
                    </div>	
                     <div class="text-danger" v-if="appointment.app_blocked == 1 ">
                     Espacio de tiempo Bloqueado
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
        }   
    },
   	
    props: ['daterequired','appointment','index'],

	created () {
	},
	methods :{
    }
}
</script>

