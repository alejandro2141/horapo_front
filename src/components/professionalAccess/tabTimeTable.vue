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

            <text class="h4 center ">Calendarios en su agenda </text> 
            
                <div  id="search_result" v-if='calendars.length > 0'  >
                    <div v-for="calendar in calendars"  :key='calendar.id' >
                        <div class="card m-3 border border-secondary" style="width: 18rem; "   >
                            <div class="card-body">

                                <h5 class="card-title h2 p-2" :style="{ 'background-color' : calendar.color   }" ><i class=""></i>   {{idSpecialty2name(calendar.specialty1) }}  
                                </h5>

                                <div  v-if="calendar.active"  class="d-flex justify-content-between text-primary">
                                    <text>Estado</text>
                                    <text>  ENCENDIDO </text>
                                </div>

                                <div  v-else  class="d-flex justify-content-between text-primary">
                                    <text>Estado</text>
                                    <text  class="text-danger">  APAGADO </text>
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

                  <div v-if="calendar.center_visit"  class="d-flex justify-content-between">
                          <text> Lugar </text>  
                          <text> En Consulta  </text>
                  </div>

                  <div v-else  class="d-flex justify-content-between mt-1 ">
                          <text> Lugar </text>  
                          <text> A Domicilio  </text>
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
                                <p class="text-end" > <text  @click="viewCalendar(calendar)" class="text-primary">Ver</text>  </p>
                            </div>
                        </div>   
                    </div>
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
                        let response_json = await axios.post("http://localhost:8080"+"/rofessional_get_calendars",json);
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

