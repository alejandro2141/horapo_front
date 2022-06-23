<script setup>
import { ref } from 'vue'
import axios from 'axios';
import ModalCreateCalendar from './modalCreateCalendar.vue';
import ModalViewCalendar from './modalViewCalendar.vue';
import ModalShareCalendarToPatient from './modalProfessionalShareCalendarToPatient.vue'


</script>
<template>
        <div>  
            <ModalCreateCalendar :activatorCreateNewCalendar='activatorCreateNewCalendar'   v-on:updateCalendarList="updateCalendarList()"  :session_params='session_params' :global_comunas="global_comunas"  :global_specialties="global_specialties"  ></ModalCreateCalendar>
            <ModalViewCalendar :activatorViewCalendar='activatorViewCalendar'   v-on:updateCalendarList="updateCalendarList()"  :session_params='session_params' :global_comunas="global_comunas" :calendar_details="calendar_details" :global_specialties="global_specialties" ></ModalViewCalendar>
            <ModalShareCalendarToPatient :activatorShareCalendar='activatorShareCalendar' :calendarToShare='calendarToShare' ></ModalShareCalendarToPatient>
      
                <p class="text-center display-5 m-4">Calendarios</p>

                <div  id="search_result" v-if='calendars!=null &&  calendars.length > 0'  >
                    <div v-for="calendar in calendars"  :key='calendar.id' >
                    <div class="m-2">
                        
                    <div class="card mb-5  w-100" style="width: 18rem; border-radius: 15px; " :style="{ 'background-color' : calendar.color   }"  >
                    <div class="card-body p-0 m-0" >
                    
                    <div class="d-flex justify-content-between p-2 w-100" :style="{ 'background-color' : calendar.color   }" style="width: 18rem; border-radius: 15px; " >
                                <text class="card-title display-6 text-white mt-0 pt-0"   >
                                  <i class="bi bi-calendar "></i>  {{idSpecialty2name(calendar.specialty1) }}  
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

                <div class="bg-white w-100 pt-2 pl-2 pr-2">
                    <div class="m-2 ">

                    <div class="d-flex justify-content-between mt-2"> 
                          <text class=""> Estado  Actual</text>   
                          
                          <div v-if="evaluateCalendarStatus(calendar.date_end)==3">
                              <text class="text-danger fw-bold"> EXPIRADO </text>
                          </div>
                          <div v-else>
                              <text v-if="calendar.calendar_active" class="text-success fw-bold" >  Encendido </text>
                              <text v-else class="text-danger fw-bold" > <i class="bi bi-exclamation-octagon text-danger"></i>
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
                                            <i class="bi bi-geo-alt"></i> {{calendar.name}} 
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
                          <text> {{calendar.date_start.substring(0,10) }}    </text>
                  </div>

                  <div  class="d-flex justify-content-between mt-2">
                          <text> Fecha Fin </text>  
                          <text> {{calendar.date_end.substring(0,10) }} </text>
                  </div>

                  <div  class="d-flex justify-content-between mt-2">
                          <text> Hora  Inicio </text>  
                          <text> {{calendar.start_time.substring(0,5)}} Hrs </text>
                  </div>

                  <div  class="d-flex justify-content-between mt-2">
                          <text> Hora  Fin </text>  
                          <text> {{calendar.end_time.substring(0,5)}} Hrs </text>
                  </div>

                <div  class="d-flex justify-content-between mt-2">
                          <text> Tiempo Atención </text>  
                          <text> {{calendar.duration}} Min </text>
                </div>
                
                <div  class="d-flex justify-content-between mt-2">
                          <text> Entre Tiempo </text>  
                          <text> {{calendar.time_between}} Min </text>
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
                            <text @click="displayShareCalendar()" class="" >Compartir en Redes Sociales  </text>  
                </div>

              <div v-if="showShareSocial" class="d-flex justify-content-between p-3" > 
                <div> 
                  <a href="mailto:user@example.com?subject=Hola Te comparto mi calendario para agendar horas&body=Hola Te comparto mi calendario para agendar horas, en el siguiente link puedes acceder directamente a mi agenda para encontrar la hora que mejor se ajuste a tu disponibilidad de tiempo">Email<br> 
                  <i class="display-1  bi bi-envelope"></i> </a> 
                </div>
                
                <div>
                    <div  data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">
                    Facebook <br>
                    <i class="display-1 bi bi-facebook"></i>
                    
                    </a></div>
                </div>
                
                <div> 
                  <a :href="'whatsapp://send?text=http://ec2-3-143-168-51.us-east-2.compute.amazonaws.com/nested/publicSearchCalendar.html?cal_id='+calendar.calendar_id">
                   WhatsApp <br>
                   <i class="display-1 bi bi-whatsapp"></i> </a>  
                </div>

              </div>

                              
                               <hr>
                                <p class="text-center fs-4" > <text  @click="viewCalendar(calendar)" class="text-primary"> Modificar </text>  </p>
                     <!--    <p class="text-white">C#{{calendar.calendar_id}} </p> -->
                            <br>
                            </div>
                            </div>

                        </div>
                    
                    <!-- end card -->
                        </div>   
                    
                    
                    </div>

                    </div>


                </div>


                <div v-else class="mt-1   "  style="border-radius: 15px;" >

                        <div v-if="calendars == null ">
                             <p class="p-4 text-center" >    
                            <i class="display-1 bi bi-emoji-expressionless"></i><br>
                            NULL Aun No existen Calendarios 
                            </p>
                        </div>


                </div>
            <!--
            <div class="text-center p-3 m-3"> 
                <text @click="addNewCalendar()"  class="text-primary m-3"> <i class="bi bi-plus-square h5"></i> Agregar nuevo Calendario </text>
            </div>
            -->

            <div class="text-center p-3 m-3"> 
                <text @click="addNewCalendar()"  class="m-3 btn btn-primary" style="border-radius: 55px;"> <i class="bi bi-plus-lg"></i> Nuevo Calendario </text>
            </div>



        </div>       

</template>

<style scoped>
</style>


<script>

export default {
data: function () {
		return {
            calendars : [] ,
            activatorCreateNewCalendar : null ,
            activatorViewCalendar : null ,
            calendar_details : null ,

            showCenters : false ,
            showOnOffCalendar: false, 

            calendar_active : true ,
            
            //for modal Share Calendar
            calendarToShare :null ,
            activatorShareCalendar : null,

            showShareSocial : true, 


		 }
	},
	props: ['session_params','global_comunas', 'global_specialties'],

    beforeCreate () {
         console.log("TAB Time Table Before Created");  
         this.active_spinner = true ;  
        },

    created () {  
          console.log("TAB Time Table Created");  
          this.active_spinner = true ;  	
              console.log("TAB Calendards this session_params"+this.session_params.professional_id);
              this.getCalendars();
          this.active_spinner = false ;  	
         },
    
    beforeMount () {
        console.log("TAB Time Table Before MOunt");
        },

    mounted () {
        console.log("TAB Time Table Mounted");
        },

    beforeUpdate () {
        console.log("TAB Time Table Before Update");
        },

    updated () {
        console.log("TAB Time Table Updated");
        this.active_spinner = false ;  
        },

    destroyed() {
        console.log("TAB Time Table Destroyed");
    },

 
    methods: {
        /*
        displayShareCalendar(calendar)
        {
        console.log("display share calendar");
        this.calendarToShare = calendar ;
        this.activatorShareCalendar = Math.random();
        }, */
        
        displayShareCalendar()
        {
       // this.showShareSocial = !this.showShareSocial ;
        },

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

        viewCalendar(calendar)
        {
            console.log("Open view Calendar");
            this.activatorViewCalendar = Math.random(); 
            this.calendar_details = calendar ; 
        },

        updateCalendarList()
        {
            this.getCalendars();
        },

        idSpecialty2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },

    //GET CENTERS
        async getCalendars() {
                        const json = { 
                        //professional_id : this.session_params.professional_id ,			   
                        professional_id : this.session_params.professional_id ,			   
                          
                                    };
                        console.log ("GET CALENDARS REQUEST :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_calendars",json);
                        this.calendars = response_json.data.rows;
                        console.log ("RESPONSE Calendars:"+JSON.stringify(this.calendars)) ;                       
                    },	

        addNewCalendar(){
                console.log("Add new Calendar action "+JSON.stringify(this.session_params) ) ;
                this.activatorCreateNewCalendar = Math.random(); 

                },




		},
  

}
</script>

