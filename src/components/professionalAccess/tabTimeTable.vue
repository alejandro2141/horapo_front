<script setup>
import { ref } from 'vue'
import axios from 'axios';
import ModalCreateCalendar from './modalCreateCalendar.vue';
import ModalViewCalendar from './modalViewCalendar.vue';
import ModalShareCalendarToPatient from './modalProfessionalShareCalendarToPatient.vue'
import CalendarProfessional from './calendar_professional.vue'

</script>
<template>
        <div class="bg-secondary">  
            <ModalCreateCalendar :activatorCreateNewCalendar='activatorCreateNewCalendar'   v-on:updateCalendarList="updateCalendarList()"  :session_params='session_params' :global_comunas="global_comunas"  :global_specialties="global_specialties"  ></ModalCreateCalendar>
            <ModalViewCalendar :activatorViewCalendar='activatorViewCalendar'   v-on:updateCalendarList="updateCalendarList()"  :session_params='session_params' :global_comunas="global_comunas" :calendar_details="calendar_details" :global_specialties="global_specialties" ></ModalViewCalendar>
            <ModalShareCalendarToPatient :activatorShareCalendar='activatorShareCalendar' :calendarToShare='calendarToShare' ></ModalShareCalendarToPatient>
      
                <p class="text-center display-5 pt-1 text-white">Tus Calendarios</p>

                <div  id="search_result" v-if='calendars!=null'  >
                    <div v-for="calendar in calendars.calendars"  :key='calendar.id' >
                        <CalendarProfessional :calendar="calendar" :center_data="getCenterData(calendar.center_id)"  v-on:updateCalendarList="updateCalendarList()" :global_specialties="global_specialties" :global_comunas="global_comunas"> </CalendarProfessional> 
                    </div>

                </div>

                <div v-else class="mt-1   "  style="border-radius: 15px;" >
                        <div v-if="calendars.calendars == null ">
                             <p class="p-4 text-center" >    
                            <i class="display-1 bi bi-emoji-expressionless"></i><br>
                            NULL Aun No existen Calendarios 
                            </p>
                        </div>
                </div>

            <div class="text-center p-3 m-3"> 
                <text @click="addNewCalendar()"  class="m-3 btn btn-primary" style="border-radius: 55px;"> <i class="bi bi-plus-lg"></i> Nuevo Calendario </text>
            </div>

        <div style="height: 200px;">
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
        getCenterData(center_id)
        {
           let center_data=this.calendars.centers.find(elem => elem.id ==  center_id)
   console.log("CENTER DATA :"+center_data);
            if (center_data != null )
            {
                return center_data
            }
            else {
                let not_found_resp = { name : "Not Found", status: -1 }
                return not_found_resp
            }
        },
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

        /*
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
        */

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
/*
        idSpecialty2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },
        */

    //GET CENTERS
        async getCalendars() {
                        const json = { 
                        //professional_id : this.session_params.professional_id ,			   
                        professional_id : this.session_params.professional_id ,			   
                          
                                    };
                        console.log ("GET CALENDARS REQUEST :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_data_for_calendars_view",json);
                        this.calendars = response_json.data;
                        console.log ("RESPONSE Calendars:"+JSON.stringify(this.calendars)) ;                       
                    },	

        addNewCalendar(){
                console.log("Add new Calendar action "+JSON.stringify(this.session_params) ) ;
                this.activatorCreateNewCalendar = Math.random(); 

                },




		},
  

}
</script>

