<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
     
<div   class="bg-white mb-2" data-bs-toggle="modal" :data-bs-target="'#modal_reserve_'+index" >
                        <div id="app" class="d-flex justify-content-start"  >	
                            <!--
                            <div class="m-0"  :style="{'background-color' : '#'+appointment.center_color }"  >
                                &nbsp;&nbsp;&nbsp;
                            </div>
                            -->
                            <div class="">

                                <div class="display-4 "  style="margin-left: 0.2em;">
                                    {{appointment.start_time.substring(0, 5) }}	
                                </div>
                                <div class="text-muted text-center" style=" font-size: 1.0em;" >
                                     {{appointment.duration }}min 					
                                </div>
                            </div>
                            
                            <div class="" style="margin-left: 0.5em;" >
                               
                                <div v-if="appointment.app_status == 1 " class="text-danger" >
                                        Hora Cancelada 
                                </div>
                                <div v-else class="text-success"> 
                                        DISPONIBLE <i v-if="appointment.available_public_search" style="margin-left: 1.0em;" class="bi bi-wifi text-success ">On Line</i> 
                                </div> 

                                <div class="">
                                    <text v-if=" appointment.specialty != null " >  
                                        <i class="bi bi-node-plus"></i> {{ id2name(appointment.specialty ) }} <br>
                                    </text>
                                    <text v-if=" appointment.specialty1 != null " >  
                                        <i class="bi bi-node-plus"></i> {{ id2name(appointment.specialty1 ) }} <br>
                                    </text>
                                    <text v-if=" appointment.specialty2 != null " >  
                                        <i class="bi bi-node-plus"></i> {{ id2name(appointment.specialty2 ) }} <br>
                                    </text>
                                    <text v-if=" appointment.specialty3 != null " >  
                                        <i class="bi bi-node-plus"></i> {{ id2name(appointment.specialty3 ) }} <br>
                                    </text>
                                    <text v-if=" appointment.specialty4 != null " >  
                                        <i class="bi bi-node-plus"></i> {{ id2name(appointment.specialty4 ) }} <br>
                                    </text>
                                    <text v-if=" appointment.specialty5 != null " >  
                                        <i class="bi bi-node-plus"></i> {{ id2name(appointment.specialty5 ) }} <br>
                                    </text>
                                       

                                </div>
                                        
                              
                               
                                    
                            </div>

            	  
                            
                        </div>
                        <text style=" font-size: 1.0em;" >
                          <i class="bi bi-geo-alt"  ></i>    {{appointment.center_address }}       
                        </text>


                        

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
   	
	props: ['daterequired','appointment','index','global_specialties'],

	created () {
        console.log("IN APPOINTMENT AVAILABLE COMPONENT "+this.global_specialties);
	},
	methods :{

        id2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        }

    }
}
</script>

