<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
     
<div   class="bg-light mb-2" data-bs-toggle="modal" :data-bs-target="'#modal_reserve_'+index" >
                        <div id="app" class="d-flex  "  >	
                            <!--
                            <div class="m-0"  :style="{'background-color' : '#'+appointment.center_color }"  >
                                &nbsp;&nbsp;&nbsp;
                            </div>
                            -->
                            <div class="">
                                <div class="display-3 "  style="padding-right: 3rem;">
                                {{appointment.start_time.substring(0, 5) }}							
                                </div>
                                  <div class="">
                                <i class="bi bi-clock-history"></i> {{appointment.duration }} Min
                                </div>

                            </div>
                            
                            <div class=" w-100 " style="padding-left: 15px;" >
                                <div  >
                                    <div v-if="appointment.app_status == 1 " class="text-danger" >
                                        Hora Cancelada 
                                    </div>
                                    <div v-else class="text-success"> 
                                        DISPONIBLE <i v-if="appointment.available_public_search" class="bi bi-wifi text-success h3"></i> 
                                    </div> 

                                      
                                </div>

                                <div class="d-flex justify-content-between" >
                                        <div>
                                        {{appointment.specialty_name }}
                                        
                                        </div>

                                      
                                         
                                       
                                        
                                </div>
                                        
                              
                               
                                    
                            </div>
                            
                        </div>
                         <div>
                           <i class="bi bi-geo-alt"></i>    {{appointment.center_address }}
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

