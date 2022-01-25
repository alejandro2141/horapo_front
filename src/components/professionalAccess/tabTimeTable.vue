<script setup>
import { ref } from 'vue'
import axios from 'axios';
import ModalCreateCalendar from './modalCreateCalendar.vue';


</script>
<template>
 

        <div  class="mx-auto " style="width: 95%;" >
            
            <ModalCreateCalendar :activatorCreateNewCalendar='activatorCreateNewCalendar' :session_params='session_params' ></ModalCreateCalendar>

            <text class="h4 center ">Calendarios en su agenda </text> 
            
                <div  id="search_result" v-if='calendars.length > 0'  >
                    <div v-for="calendar in calendars"  :key='calendar.id' >
                        <div class="card m-3 border border-secondary" style="width: 18rem; ">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-building display-2"></i> calendar_id {{calendar.id}} </h5>
                                <p class="card-text">  aaaa </p>
                                <b>bbbbb </b>
                                <p class="text-end" > <text  class="text-primary">Ver</text>  </p>
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
		 }
	},
	props: ['session_params','global_comunas'],

    created () {    
        console.log("TAB Calendards this session_params"+this.session_params.professional_id);
        this.getCalendars();
         },
 
    methods: {
    //GET CENTERS
        async getCalendars() {
                        const json = { 
                        //professional_id : this.session_params.professional_id ,			   
                        professional_id : 1 ,			   
                          
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

