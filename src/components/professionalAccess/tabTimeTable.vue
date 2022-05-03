<script setup>
import { ref } from 'vue'
import axios from 'axios';
import ModalCreateCalendar from './modalCreateCalendar.vue';
import ModalViewCalendar from './modalViewCalendar.vue';



</script>
<template>

        <div  class="mx-auto " style="width: 95%;" >
            
            <ModalCreateCalendar :activatorCreateNewCalendar='activatorCreateNewCalendar'   v-on:updateCalendarList="updateCalendarList()"  :session_params='session_params' :global_comunas="global_comunas"  :global_specialties="global_specialties"  ></ModalCreateCalendar>
            <ModalViewCalendar :activatorViewCalendar='activatorViewCalendar'   v-on:updateCalendarList="updateCalendarList()"  :session_params='session_params' :global_comunas="global_comunas" :calendar_details="calendar_details" :global_specialties="global_specialties" ></ModalViewCalendar>

      
                <p class="text-center h4 mt-3">Horarios en su agenda </p>

            
                <div  id="search_result" v-if='calendars!=null &&  calendars.length > 0'  >
                    <div v-for="calendar in calendars"  :key='calendar.id' >
                        <div class="card m-3 border border-secondary" style="width: 18rem; border-radius: 15px; "   >
                            <div class="card-body">

                                <h5 class="card-title h2 p-2" :style="{ 'background-color' : calendar.color   }" >
                                  <i class="bi bi-calendar"></i>  {{idSpecialty2name(calendar.specialty1) }}  
                                </h5>

                               
                                    <div class="d-flex justify-content-between">
                                        <div> 
                                            Consulta 
                                        </div>
                                        <div>
                                            <i class="bi bi-geo-alt"></i> {{calendar.name}} 
            

                                        </div>
                                    </div>

                                    <div v-if="calendar.center_visit">
                                            <text> Tipo: En Consulta  </text>  
                                    </div>
                                    <div v-if="calendar.home_visit">
                                            <text> Tipo: A Domicilio  </text>
                                    </div>
                                    <div v-if="calendar.remote_care">
                                            <text> Tipo: Tele Atencion </text>
                                    </div>
                                <br>
                             
                                <div  v-if="calendar.calendar_active"  class="d-flex justify-content-between text-success">
                                    <text>Estado</text>
                                    <text>  ENCENDIDO </text>
                                </div>

                                <div  v-else  class="d-flex justify-content-between text-danger">
                                    <text>Estado</text>
                                    <text >  APAGADO </text>
                                </div>

                 

                  <div  class="d-flex justify-content-between mt-0">
                          <text> Fecha Inicio  </text>  
                          <text> {{calendar.date_start.substring(0,10) }}    </text>
                  </div>

                  <div  class="d-flex justify-content-between mt-1">
                          <text> Fecha Fin </text>  
                          <text> {{calendar.date_end.substring(0,10) }} </text>
                  </div>

                  <div  class="d-flex justify-content-between mt-1">
                          <text> Hora  Inicio </text>  
                          <text> {{calendar.start_time.substring(0,5)}} </text>
                  </div>

                  <div  class="d-flex justify-content-between mt-1">
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
                                <p class="text-end" > <text  @click="viewCalendar(calendar)" class="text-primary"> <i class="bi bi-wrench"></i> Configurar</text>  </p>
                         <p class="text-muted">C#{{calendar.calendar_id}} </p>
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
		 }
	},
	props: ['session_params','global_comunas', 'global_specialties'],

    created () {    
        console.log("TAB Calendards this session_params"+this.session_params.professional_id);
        this.getCalendars();
         },
 
    methods: {

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

