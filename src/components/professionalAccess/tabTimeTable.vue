<script setup>
import { ref } from 'vue'
import axios from 'axios';
import ModalCreateCalendar from './modalCreateCalendar.vue';
//import ModalViewCalendar from './modalViewCalendar.vue';
import ModalShareCalendarToPatient from './modalProfessionalShareCalendarToPatient.vue'
import CalendarProfessional from './calendar_professional.vue'
import infoCalendar from './info_calendar.vue'

</script>
<template>
    <div class="bg-white">  

        <ModalCreateCalendar :activatorCreateNewCalendar='activatorCreateNewCalendar'  v-on:centers_not_null=" evaluateDisplayMessageErrorCenters" v-on:updateCalendarList="updateCalendarList()"  :session_params='session_params' :global_comunas="global_comunas"  :global_specialties="global_specialties"  ></ModalCreateCalendar>
        <!--  <ModalViewCalendar :activatorViewCalendar='activatorViewCalendar'   v-on:updateCalendarList="updateCalendarList()"  :session_params='session_params' :global_comunas="global_comunas" :calendar_details="calendar_details" :global_specialties="global_specialties" ></ModalViewCalendar>
        -->
        <ModalShareCalendarToPatient :activatorShareCalendar='activatorShareCalendar' :calendarToShare='calendarToShare' ></ModalShareCalendarToPatient>
        
        <div>
            <p class="text-center">
                <text class="text-center display-5 pt-1 text-dark ">Tus Calendarios  </text>
                <br>
                <text class="text-secondary"> Dias y horas en los que atiende</text>
            </p>

           <!--  <infoCalendar v-if="showInfoCreate"></infoCalendar>-->
           
         <!--   
            <div class="text-center p-3 m-3" v-if="calendars != null && calendars.centers != null &&  calendars.centers.length>0 "  > 
                <text @click="addNewCalendar()"  class="m-3 btn btn-primary" style="border-radius: 55px;"> <i class="bi bi-plus-lg"></i> Nuevo Calendario </text>
            </div>
            <div v-else class="text-center p-5"> 
                <b><i class="bi bi-exclamation-triangle display-4 text-warning"></i></b><br>
                Antes de crear un nuevo Calendario, debe primero crear una consulta. 
            </div>
        -->
            <div v-if="calendars == null && calendars.centers == null &&  calendars.centers.length < 1 " class="text-center text-danger p-3 m-3"  > 
                <b>
                    <i class="bi bi-exclamation-triangle display-4 text-warning"></i>
                </b>
                <br>
                Antes de crear un nuevo Calendario, debe primero crear una consulta.         
            </div>
            <div v-else class="text-center p-0"> 
                <text @click="addNewCalendar()"  class="m-3 btn btn-primary" style="border-radius: 55px;"> <i class="bi bi-plus-lg"></i> Nuevo Calendario </text>
            </div>
            
            <!-- LIST Calendars -->
            <div>
                    <div  id="search_result" v-if='calendars!=null && calendars.calendars !=null && calendars.calendars.length > 0'  >
                        <div v-for="calendar in calendars.calendars"  :key='calendar.id' >
                          
                            <CalendarProfessional :calendar="calendar" :center_data="getCenterData(calendar.center_id)"  v-on:updateCalendarList="updateCalendarList()" :global_specialties="global_specialties" :global_comunas="global_comunas" :session_params="session_params" > </CalendarProfessional> 
                        </div>
                    </div>
                <!--
                    <div v-else class="mt-1   "  style="border-radius: 15px;" >
                            <text class="fs-2">
                             Debes crear un Calendario!!
                            </text> 
                    </div>
                -->
            </div>
            
        </div>
        

        
        <!-- End List Calendars -->

       
      
        
            
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
            showInfoCreate : false ,
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
            center_list : 0 ,

            showErrorCentersNotFound: false  


		 }
	},
	props: ['session_params','global_comunas', 'global_specialties'],

    beforeCreate () {
         console.log("TAB Time Table Before Created");  
         this.active_spinner = true ;  
        },

    async created () {  
          console.log("TAB Time Table Created");  
          this.active_spinner = true ;  	
              console.log("TAB Calendards this session_params"+this.session_params.professional_id);
              this.getCalendars();
          this.active_spinner = false ;  
          
          //await this.getCenters()

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
        async getCenters() {
			const json = { 
			   professional_id : this.session_params.professional_id  ,			   
   			   	      };
			console.log ("professional_get_all_centers REQUEST :"+ JSON.stringify(json)  );
			let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_all_centers",json);
			console.log ("professional_get_all_centers RESPONSE :"+JSON.stringify(response_json.data.rows)) ;
			this.center_list = response_json.data.rows;
            console.log ("TabTimeTable :"+this.center_list.length ) ;
            },
        */
        evaluateDisplayMessageErrorCenters( val)
        {
            this.showErrorCentersNotFound = val
            console.log("evaluate display message error centers:"+this.showErrorCentersNotFound)
        },


        async finishTutorial()
        {
           const json = { 
              professional_id: this.session_params.professional_id ,
              tutorial : 3
           };

            let restemp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_shutdown_tutorial",json);
            this.session_params.tutorial_calendar = false ;   
        },

        getCenterData(center_id)
        {
           let center_data=this.calendars.centers.find(elem => elem.id ==  center_id)
            console.log("CENTER DATA :"+center_data);
            if (center_data != null )
            {
                return center_data
            }
            else {
                let not_found_resp = { name : null , status: -1 }
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

