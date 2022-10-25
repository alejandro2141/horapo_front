<script setup>
import { ref } from 'vue'
import axios from 'axios'
import searchAppointmentForm  from './SearchAppointmentForm.vue' 
import searchAppointmentResult  from './SearchAppointmentResult.vue'
import loadProgress from '../loadProgress.vue'
import suggestedSearch from './SuggestedSearch.vue'
import FooterContent from '../FooterContent.vue'


</script>

<template>
  <div class="bg-white p-0">
  <loadProgress  :active_spinner="active_spinner" > </loadProgress> 
  
      <div class=" bg-white  pb-4 text-center"  > 
        <a HREF="/nested/publicSearch.html" class="text-decoration-none" style="color :#2e5668"> 
      	<i class="bi bi-clipboard-pulse" style="font-size: 2rem; color: cornflowerblue;"></i>
        <text class="display-4"> 123Hora</text>  
        </a> 
        <small  class="text-muted"> <br> Las mejores consultas en un solo lugar </small>
      </div> 
 
      <div>
            <div>
              <searchAppointmentForm  v-on:searchBySpecialty="searchBySpecialty" v-on:searchByTypeCenter="searchByTypeCenter" v-on:searchByTypeHome="searchByTypeHome" v-on:searchByTypeRemote="searchByTypeRemote" v-on:searchByLocation="searchByLocation" v-on:searchByDate="searchByDate" :currentDate="currentDate" :global_specialties="global_specialties" :global_comunas="global_comunas"  :n_app_filtered="n_appointments_found" ></searchAppointmentForm>
               
              <div v-if="appointments_filtered !=null && appointments_filtered.appointments_list !=null && appointments_filtered.appointments_list !=null && appointments_filtered.appointments_list.length > 0">                
                  En {{metric_search/1000}} Seg encontramos {{appointments_filtered.appointments_list.length}} resultados
                  <!-- <searchAppointmentResult  :filter_home="filter_home" :filter_center="filter_center" :filter_remote="filter_remote" :searchParameters='searchParameters' v-if="daterequired != null && appointments != null"  v-on:updateLastSearch="updateLastSearch"  :appointments="appointments" :daterequired="daterequired"  :global_comunas="global_comunas" :global_specialties="global_specialties"  > </searchAppointmentResult> 	    
                  -->
                  <hr>
                  <searchAppointmentResult :key="forceReRender" :appointments_filtered="appointments_filtered" :centers='centers_filtered' :searchParameters='searchParameters'   v-on:updateLastSearch="updateLastSearch" :daterequired="daterequired"  :global_comunas="global_comunas" :global_specialties="global_specialties"  > </searchAppointmentResult> 	    
              </div>

              <div v-else>
           
              </div>
        
            
         
            </div>
      </div>
  <FooterContent v-if="showMainScreen"  ></FooterContent>
  </div>

  

</template>

<style scoped>

</style>


<script>


export default {
  data : function() {
    return {
            daterequired : null,
            currentDate : null,
            specialty: null,
            location: null,
            insurance: null,
            params_bkp: null, 
           
            appointment : null ,
            show_modal : null ,
            appointment_confirm : null ,
            key : 0 ,

            notificationMessage : null,
            notificationMessage_alert : false,
            searchParameters : Object , 

            active_spinner : false ,
            metric_search : 0,

            filter_center : false ,
            filter_home : false ,
            filter_remote: false ,

            n_appointments_found : null ,
           // filtered_appointments : null ,

            appointments : null ,
            appointments_filtered : null ,

            centers : [] ,
            centers_filtered : [] ,
/*
            global_specialties : null ,
            global_comunas : null ,
*/
            forceReRender : 0 , 
            showMainScreen : true ,
    }
  },

    props: ['global_specialties','global_comunas'], 

 mounted () {
             this.daterequired = new Date() 
             this.currentDate =  new Date() 
             this.appointments_filtered = [] 
            },

methods: {
            show_modal_appointment_confirm(param)
            {
            console.log("Modal Confirmation: show_modal_appointment_confirm:"+JSON.stringify(param) )
            this.appointment_confirm = param ;
            },

            set_daterequired : function (year_month_day) {
            console.log("TAB HOME GoToDay "+year_month_day);
           // this.getAppointments(year_month_day);
            this.daterequired = year_month_day ;
            },
//SEARCH BY SPECIALTY
            async searchBySpecialty(params)
            {
              console.log ("SearchAppointment searchBySpecialty ")
              let response_search = await this.searchAppointments(params)
               
              if ( response_search!= null &&  response_search.appointments_list != null &&  response_search.appointments_list.length > 0  )
              {
              this.appointments = response_search ; 
              // this.centers = response_search.centers ; 
              this.appointments_filtered = JSON.parse(JSON.stringify(this.appointments));
              console.log ("SearchAppointment searchBySpecialty RESULTS : "+JSON.stringify(this.appointments_filtered))
              this.n_appointments_found = this.appointments_filtered.appointments_list.length 
              }
              else{
                this.n_appointments_found = 0  
                this.appointments_filtered = []
                this.centers_filtered = []
              }          
              //this.forceReRender = Math.random() 

            },
//SEARCH BY TYPE_CENTER
            searchByTypeCenter(params)
            {
              console.log("Search by type Center SEARCH APPOINTMENT ");
              //cicle for each day
              for (let i = 0; i < this.appointments.appointments_list.length; i++) {
              console.log("Filter day "+JSON.stringify(this.appointments.appointments_list[i]))
              //filter centers Remote Care == true
              this.appointments_filtered.appointments_list[i].centers = this.appointments.appointments_list[i].centers.filter(center => center.center_visit == true );
              //extract only id froms Centers filtered
              let centers_filtered_ids = this.appointments_filtered.appointments_list[i].centers.map(center => center.id ) ;

              this.appointments_filtered.appointments_list[i].appointments = this.appointments.appointments_list[i].appointments.filter(appointment => centers_filtered_ids.includes(appointment.center_id) );
               }
            },
//SEARCH BY TYPE_HOME
            searchByTypeHome(params)
            {
              console.log("Search by type Home SEARCH APPOINTMENT ");
              //cicle for each day
              for (let i = 0; i < this.appointments.appointments_list.length; i++) {
              console.log("Filter day "+JSON.stringify(this.appointments.appointments_list[i]))
              //filter centers Remote Care == true
              this.appointments_filtered.appointments_list[i].centers = this.appointments.appointments_list[i].centers.filter(center => center.home_visit == true );
              //extract only id froms Centers filtered
              let centers_filtered_ids = this.appointments_filtered.appointments_list[i].centers.map(center => center.id ) ;

              this.appointments_filtered.appointments_list[i].appointments = this.appointments.appointments_list[i].appointments.filter(appointment => centers_filtered_ids.includes(appointment.center_id) );
               }
              
            },
//SEARCH BY TYPE_REMOTE
            searchByTypeRemote(params)
            {
              console.log("Search by type Remote SEARCH APPOINTMENT ");
              //cicle for each day
              for (let i = 0; i < this.appointments.appointments_list.length; i++) {
              console.log("Filter day "+JSON.stringify(this.appointments.appointments_list[i]))
              //filter centers Remote Care == true
              this.appointments_filtered.appointments_list[i].centers = this.appointments.appointments_list[i].centers.filter(center => center.remote_care == true );
              //extract only id froms Centers filtered
              let centers_filtered_ids = this.appointments_filtered.appointments_list[i].centers.map(center => center.id ) ;

              this.appointments_filtered.appointments_list[i].appointments = this.appointments.appointments_list[i].appointments.filter(appointment => centers_filtered_ids.includes(appointment.center_id) );
               }

            },
//SEARCH BY LOCATION
            async searchByLocation(params)
            {
              console.log("Search BY LOCATION: "+JSON.stringify(params));
              let response_search = await this.searchAppointments(params);
             
              if ( response_search != null &&  response_search.appointments_list != null  &&  response_search.appointments_list.length > 0 )
              {
              this.appointments = response_search
              //this.centers = response_search.centers ; 
              this.n_appointments_found = response_search.appointments_list.length

              this.appointments_filtered = JSON.parse(JSON.stringify(this.appointments));
              //this.centers_filtered = JSON.parse(JSON.stringify(this.centers));

              }
              else{
                this.n_appointments_found = 0  
                this.appointments = []
              }     

            },
//SEARCH BY DATE
            async searchByDate(params)
            {
              console.log("Search BY DATE: "+JSON.stringify(params));              
              let response_search = await this.searchAppointments(params);

              if ( response_search != null &&  response_search.appointments_list != null  &&  response_search.appointments_list.length > 0 )
              {
              this.appointments = response_search  
              //this.centers = response_search.centers    
              this.n_appointments_found = response_search.appointments_list.length
              //this.appointments_filtered = this.appointments;
              this.appointments_filtered = JSON.parse(JSON.stringify(this.appointments));
              //this.centers_filtered = JSON.parse(JSON.stringify(this.centers));
              }
              else {
                this.n_appointments_found = 0  
                this.appointments = []
                this.appointments_filtered = []
              }    
                           
            },

//SEARCH GENERIC
            async searchAppointments(params) {	
              
              this.showMainScreen = false ;
              
              let response_json = {data:[]}
              let metric = Date.now();
              this.active_spinner = true ; 
              if (  params.specialty != null )
              {            
                          console.log("search Appointments input params :"+JSON.stringify(params) )        
                          const json = { 
                  // agenda_id : this.par_agenda_id ,			 
                          date : new Date(params.date) ,
                          specialty : params.specialty.id ,
                          location : params.location ,
                          home_visit : params.home_visit,
                          type_home : params.type_home,
                          type_center : params.type_center,
                          type_remote : params.type_remote,           
                                  };

                  console.log ("patient_get_appointments_day2 REQUEST:"+ JSON.stringify(json)  );
                 
                  let response = await axios.post(this.BKND_CONFIG.BKND_HOST+"/patient_get_appointments_day2",json);
                    if (response != null )
                    {
                    response_json = response.data ; 
                    console.log ("patient_get_appointments_day2 RESPONSE:"+JSON.stringify(response_json)) ;
                    }
              }
              else // specialty == null
              {
                 response_json = null;
              } 
              this.active_spinner = false  

                    metric = (Date.now() - metric ) ;     
                    this.metric_search = metric ;
                    console.log("performance, searchAppointments , searchAppointments ,"+  this.metric_search  );              

              return response_json
            },

            updateLastSearch()
            {
                console.log ("update Last Search") ;
                this.searchAppointments(this.params_bkp);
            },

            // IDEALMENTE SOLO TRAER LOS CENTROS DE LOS PROFESIONALES, Y NO TODO EL UNIVERSO
            async get_centers(centers_id_list)
            {
               const json_center = { 
                    centers_ids : centers_id_list,
                    };
               console.log("*********** get_centers REQUEST "+JSON.stringify(json_center));
               let response = await axios.post(this.BKND_CONFIG.BKND_HOST+"/common_get_centers",json_center);
              console.log("******** get_centers RESPONSE "+JSON.stringify(response.data) );
              //this.centers = response.data.rows 
              return response.data
              //this.centers =  JSON.parse(JSON.stringify(response.data.rows))
            },

             id2comunaName(id)
            {
            let temp= this.global_comunas.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
            },

           
        },

}
</script>