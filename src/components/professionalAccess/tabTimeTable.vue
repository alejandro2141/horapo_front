<script setup>
import { ref } from 'vue'
import axios from 'axios';
import ModalCreateCalendar from './modalCreateCalendar.vue';
import ModalViewCalendar from './modalViewCalendar.vue';
import ModalShareCalendarToPatient from './modalProfessionalShareCalendarToPatient.vue'


</script>
<template>

        <div    >
            
            <ModalCreateCalendar :activatorCreateNewCalendar='activatorCreateNewCalendar'   v-on:updateCalendarList="updateCalendarList()"  :session_params='session_params' :global_comunas="global_comunas"  :global_specialties="global_specialties"  ></ModalCreateCalendar>
            <ModalViewCalendar :activatorViewCalendar='activatorViewCalendar'   v-on:updateCalendarList="updateCalendarList()"  :session_params='session_params' :global_comunas="global_comunas" :calendar_details="calendar_details" :global_specialties="global_specialties" ></ModalViewCalendar>
            <ModalShareCalendarToPatient :activatorShareCalendar='activatorShareCalendar' :calendarToShare='calendarToShare' ></ModalShareCalendarToPatient>
      
                <p class="text-center h4 mt-3">Calendarios</p>

            
                <div  id="search_result" v-if='calendars!=null &&  calendars.length > 0'  >
                    <div v-for="calendar in calendars"  :key='calendar.id' >
                        <div class="card mt-3 border border-secondary w-100" style="width: 18rem; border-radius: 15px; " :style="{ 'background-color' : calendar.color   }"  >
                            <div class="card-body" >
                    
                    <div class="d-flex justify-content-between">
                                <text class=" h5 card-title  mt-0 pt-0"  >
                                  <i class="bi bi-calendar"></i>  {{idSpecialty2name(calendar.specialty1) }}  
                                </text>

                                <text class="text-primary h3">
                                    <i @click="displayShareCalendar(calendar)" class="bi bi-share"></i>
                                </text>
                    </div>

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
                          <text> {{calendar.start_time.substring(0,5)}} </text>
                  </div>

                  <div  class="d-flex justify-content-between mt-2">
                          <text> Hora  Fin </text>  
                          <text> {{calendar.end_time.substring(0,5)}} </text>
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

                               <br>
                                <p class="text-center" > <text  @click="viewCalendar(calendar)" class="text-primary"> Modificar </text>  </p>
                     <!--    <p class="text-white">C#{{calendar.calendar_id}} </p> -->
                            </div>
                        </div>   
                    </div>
                </div>


                <div v-else class="mt-1   "  style="border-radius: 15px;" >
                        <p class="p-4 text-center" >    
                            <i class="display-1 bi bi-emoji-expressionless"></i><br>
                        Aun No existen Calendarios 
                        </p>

                </div>

            <div class="text-center p-3 m-3"> 
                <text @click="addNewCalendar()"  class="text-primary m-3"> <i class="bi bi-plus-square h5"></i> Agregar nuevo Calendario </text>
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


		 }
	},
	props: ['session_params','global_comunas', 'global_specialties'],

    created () {    
        console.log("TAB Calendards this session_params"+this.session_params.professional_id);
        this.getCalendars();
         },
 
    methods: {
        displayShareCalendar(calendar)
        {
        console.log("display share calendar");
        this.calendarToShare = calendar ;
        this.activatorShareCalendar = Math.random();
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
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/rofessional_get_calendars",json);
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

