<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
     
<div   class="bg-light mb-2" data-bs-toggle="modal" :data-bs-target="'#modal_reserve_'+index" >
                        <div id="app" class="m-0 d-flex  "  >	
                            <div class="m-0"  :style="{'background-color' : '#'+appointment.center_color }"  >
                                &nbsp;&nbsp;&nbsp;
                            </div>

                            <div class="m-2">
                                
                                <div>
                                {{appointment.center_color}}
                                {{appointment.date.substring(0, 10) }} 
                                </div>
                                
                                <div class="display-2">
                                {{appointment.start_time.substring(0, 5) }}							
                                </div>
                                <div class="display-6">
                                a {{appointment.end_time.substring(0, 5) }}
                                </div>
                            </div>
                            
                            <div class="mt-2 w-100 " >
                                <div class="d-flex justify-content-between" >
                                        <div>
                                        {{appointment.specialty_name }}
                                        </div>
                                        <div v-if="appointment.available_public_search == 1">
                                          <i class="fas fa-wifi text-success"></i>
                                        </div>
                                        <div v-else>
                                           <i class="fas fa-wifi text-muted"></i>
                                        </div>
                                </div>
                                        
                                <div class="display-1" >
                                DISPONIBLE
                                </div>
                                <div>
                                {{appointment.center_address }}<br>
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
             bgcolor : 'FF0000' ,
        }   
    },
   	
	props: ['daterequired','appointment','index'],

	created () {
	},
	methods :{
    }
}
</script>

