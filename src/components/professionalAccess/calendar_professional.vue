<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
<div class="m-3">
                        
                   <!-- <div class="card mb-5  w-100 border border-1 border-white" style="width: 18rem; border-radius: 15px; " :style="{ 'background-color' : calendar.color   }"  >
                    -->
                    <div class="card mb-5  w-100 border border-1 border-white bg-secondary" style="width: 18rem; border-radius: 15px; "   >
                    
                    <div class="card-body p-0 m-0" >
                    
                    <div class="d-flex justify-content-between p-2 w-100 bg-secondary" style="width: 18rem; border-radius: 15px; " >
                                <text class="card-title display-6 text-white mt-0 pt-0"   >
                                  <i class="bi bi-calendar-week "></i>  {{idSpecialty2name(specialty_code) }}  
                                </text>
                                <!--
                                <div class="fs-1 bg-light text-primary" style="background-color: #D4D4D4;  border-radius: 15px;">
                                    <p @click="displayShareCalendar(calendar)" class="text-center p-1"  >
                                        
                                        <text class="fs-6" > Compartir
                                        </text><br>
                                        <i  class="fs-4 bi bi-share"></i>
                                    </p>
                                </div>
                                -->
                    </div>

                <div class="bg-secondary  text-white w-100 pt-2 pl-2 pr-2">
                    <div class="m-2 ">

                    <div class="d-flex justify-content-between mt-2"> 
                          <text class=""> Estado  Actual</text>   
                          
                          <div v-if="evaluateCalendarStatus(date_end)==3">
                              <text class="text-danger fw-bold bg-white p-1"> EXPIRADO </text>
                          </div>
                          <div v-else>
                              <text v-if="calendar_active" class="text-success fw-bold bg-white p-1" >  Encendido </text>
                              <text v-else class="text-danger fw-bold" > <i class="bi bi-exclamation-octagon bg-white text-danger p-1"></i>
                                Apagado </text>
                          </div>
                    </div>
<!--
                                <div  v-if="calendar.calendar_active"  class="d-flex justify-content-between">
                                    <text>Estado Actual </text>
                                    <text class="text-success"  > Encendido </text>
                                   
                                </div>

                                <div  v-else  class="d-flex justify-content-between">
                                    <text>Estado Actual </text>
                                    <text class="text-danger"> Apagado </text>
                                    
                                </div>
-->
                                <div class="mt-2">
                                    <text>En Consulta </text>
                                    <div class="d-flex justify-content-between ">
                                        <div> 
                                            
                                        </div>
                                        <div  >
                                            <i class="bi bi-geo-alt"></i> {{name}} 
                                        </div>
                                    </div>
                                </div>
                                   
                                    <p v-if="calendar.center_visit" class="text-muted text-end" >
                                            <text>  </text> <text> En Consulta  </text>  
                                    </p>
                                    <p v-if="calendar.home_visit" class="text-muted text-end">
                                             <text>  </text> <text> A Domicilio  </text>
                                    </p>
                                    <p v-if="calendar.remote_care" class="text-muted text-end">
                                            <text>  </text> <text> Tele Atencion </text>
                                    </p>
                               
                               
                 

                  <div  class="d-flex justify-content-between mt-2">
                          <text> Fecha Inicio  </text>  
                          <text> {{date_start.substring(0,10) }}    </text>
                  </div>

                  <div  class="d-flex justify-content-between mt-2">
                          <text> Fecha Fin </text>  
                          <text> {{date_end.substring(0,10) }} </text>
                  </div>

                  <div  class="d-flex justify-content-between mt-2">
                          <text> Hora  Inicio </text>  
                          <text> {{start_time.substring(0,5)}} Hrs </text>
                  </div>

                  <div  class="d-flex justify-content-between mt-2">
                          <text> Hora  Fin </text>  
                          <text> {{end_time.substring(0,5)}} Hrs </text>
                  </div>

                <div  class="d-flex justify-content-between mt-2">
                          <text> Tiempo Atención </text>  
                          <text> {{duration}} Min </text>
                </div>
                
                <div  class="d-flex justify-content-between mt-2">
                          <text> Entre Tiempo </text>  
                          <text> {{time_between}} Min </text>
                </div>

                <div class="mt-1">
                  Dias Recurrencia: <br>

                                        <text class="d-flex justify-content-end" v-if="calendar.monday"> Lunes <br> </text> 
                                        <text class="d-flex justify-content-end" v-if="calendar.tuestday"> Martes  <br> </text> 
                                        <text class="d-flex justify-content-end"  v-if="calendar.wednesday"> Miercoles  <br> </text> 
                                        <text class="d-flex justify-content-end"  v-if="calendar.thursday"> Jueves  <br> </text> 
                                        <text class="d-flex justify-content-end"  v-if="calendar.friday"> Viernes <br> </text> 
                                        <text class="d-flex justify-content-end"  v-if="calendar.saturday"> Sabado <br> </text> 
                                        <text class="d-flex justify-content-end"  v-if="calendar.sunday"> Domingo <br> </text> 
                </div>

                <div  class="d-flex justify-content-between mt-2">
                            <text  class="" >Compartir en Redes Sociales  </text>  
                </div>

              <div v-if="true" class="d-flex justify-content-between p-3 text-white" > 
                <div> 
                  <a  class="text-white" href="mailto:user@example.com?subject=Hola Te comparto mi calendario para agendar horas&body=Hola Te comparto mi calendario para agendar horas, en el siguiente link puedes acceder directamente a mi agenda para encontrar la hora que mejor se ajuste a tu disponibilidad de tiempo">Email<br> 
                  <i class="display-1  bi bi-envelope"></i> </a> 
                </div>
                
                <div>
                    <div  data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="text-white fb-xfbml-parse-ignore">
                    Facebook <br>
                    <i class="text-white display-1 bi bi-facebook"></i>
                    
                    </a></div>
                </div>
                
                <div> 
                  <a class="text-white" :href="'whatsapp://send?text=http://ec2-3-143-168-51.us-east-2.compute.amazonaws.com/nested/publicSearchCalendar.html?cal_id='+calendar.calendar_id">
                   WhatsApp <br>
                   <i class="text-white display-1 bi bi-whatsapp"></i> </a>  
                </div>

              </div>

                              
                <hr class="text-white">
                <p v-if="!showEdit" class="text-center fs-4 " > <text  @click="showEdit=true" class="text-white"> Modificar </text>  </p>
                
                <div v-if="showEdit" class="d-flex justify-content-between mt-2">
                            <text @click="showEdit=false" class="" >GUARDAR  </text>  
                            <text @click="showEdit=false" class="" >CANCELAR </text>  
                </div>

                                
                                 <!--    <p class="text-white">C#{{calendar.calendar_id}} </p> -->
               
                </div>
                </div>
                </div>
                    <!-- end card -->
                </div>   
                    
                    
                </div>
    

</template>

<style scoped>
</style>


<script>

export default {
   data : function() {
        return {
            showEdit : false, 

            calendar_active : null ,
            specialty_code : null, 
            date_start : null ,
            date_end : null,
            time_start : null ,
            time_end : null ,
            duration : null ,
            time_between : null ,
            monday : null,
            tuesday : null ,
            wednesday : null ,
            thursday : null,
            friday : null ,
            saturday : null ,
            sunday : null, 
        }   
    },
   	
	props: [ 'calendar' , 'global_specialties' , 'global_comunas','session_params' ],
   /* emits: ['updateCenterList'],*/

	created () {

        this.calendar_active = this.calendar.calendar_active
        this.specialty_code = this.calendar.specialty1 ; 

        this.date_start = this.calendar.date_start ;
        this.date_end = this.calendar.date_end  ;
        this.start_time = this.calendar.start_time  ;
        this.end_time = this.calendar.end_time  ;
        this.duration = this.calendar.duration  ;
        this.time_between = this.calendar.time_between  ;
        this.monday = this.calendar.monday  ;
        this.tuesday = this.calendar.tuesday  ;
        this.wednesday = this.calendar.wednesday ;
        this.thursday = this.calendar.thursday  ;
        this.friday = this.calendar.friday  ;
        this.saturday = this.calendar.saturday  ;
        this.sunday = this.calendar.sunday  ;

    },

	methods :{
         evaluateCalendarStatus(date_end)
        {
          let aux_date_end=new Date(date_end);
          let aux_date_current = new Date ();
          aux_date_current.setHours(0,0,0);

          console.log("aux_date_end "+aux_date_end)
          console.log("aux_date_current "+aux_date_current)
            if (aux_date_end < aux_date_current)
            {
              //Expired
              return 3 ;
            }
        

        },

        idSpecialty2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },

    }
}
</script>

