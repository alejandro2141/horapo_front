<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
     
    <div  :style="{ 'background-color' : appointment.color  }"  class=" " data-bs-toggle="modal" :data-bs-target="'#modal_appdetails_'+index"  >
    <text class="text-secondary" style="">#{{appointment.id}} </text>
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
                       <text class="text-success display-5"  >{{ id2name(appointment.specialty ) }}  </text> 
                       <!--	
                        <i v-if="appointment.public" style="margin-left: 1.0em;" class="bi bi-wifi text-success ">On Line</i>
                        <br>
                        -->
                        <!--
                        <div class="text-danger" v-if="appointment.app_status == 1 ">
                            Cita Activa 
                        </div>
                        -->
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

            <div>
                    <h4>{{appointment.patient_name }} </h4>
                    id:{{appointment.patient_doc_id }},  
                    Edad:{{appointment.patient_age }} 
            </div>
            
            <div v-if="appointment.home_visit" style=" font-size: 1.0em;" >
                        <text style="color:#3399FF" >  
                            <i class="bi bi-house">   </i> A Domicilio
                        </text>
                        <br>
                         
                           Direccion Paciente:  {{appointment.patient_address }} <br>
                            <!--
                            <text v-if=" appointment.location1 != null " >  
                                <i class="bi bi-geo-alt"></i> {{ id2comuna(appointment.location1) }} <br>
                            </text>
                            <text v-if=" appointment.location2 != null " >  
                                <i class="bi bi-geo-alt"></i> {{ id2comuna(appointment.location2) }} <br>
                            </text>
                            <text v-if=" appointment.location3 != null " >  
                                <i class="bi bi-geo-alt"></i> {{ id2comuna(appointment.location3) }} <br>
                            </text>
                            <text v-if=" appointment.location4 != null " >  
                                <i class="bi bi-geo-alt"></i> {{ id2comuna(appointment.location4) }} <br>
                            </text>
                            <text v-if=" appointment.location5 != null " >  
                                <i class="bi bi-geo-alt"></i> {{ id2comuna(appointment.location5) }} <br>
                            </text>
                            <text v-if=" appointment.location6 != null " >  
                                <i class="bi bi-geo-alt"></i> {{ id2comuna(appointment.location6) }} <br>
                            </text>
                            -->
            </div>
             <div v-if="appointment.center_visit" style=" font-size: 1.0em;" >
                <i class="bi bi-building"> En Consulta  </i> <br>
                    <div v-if="appointment.center_name != null " >
                            {{appointment.center_name }}<br>
                    </div>
                    <div v-if="appointment.center_address != null ">
                            {{appointment.center_address }}<br>
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

