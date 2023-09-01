<script setup>
import { ref } from 'vue'
import axios from 'axios'
import searchAppointmentForm  from './SearchAppointmentForm.vue' 
import searchAppointmentResult  from './SearchAppointmentResult.vue'
import loadProgress from '../loadProgress.vue'
import suggestedSearch from './SuggestedSearch.vue'
import FooterContent from '../FooterContent.vue'
import WordSphere from 'wordsphere';
import SuggestedSearch from './SuggestedSearch.vue'
import headerPublicSearch from '../HeaderPublicSearch.vue'


</script>

<template>
  <div class="bg-white p-0">
   
    <headerPublicSearch></headerPublicSearch>

  <loadProgress  :active_spinner="active_spinner" > </loadProgress> 
  
      <div class="bg-white  pb-1 text-center"  > 
        <!--
        <a HREF="/nested/publicSearch.html" class="text-decoration-none" style="color :#2e5668"> 
            <text class="display-4">123H<small><small><i class="bi bi-flower1 h1"></i></small></small>RA</text>  
        </a>
        --> 
     <!--
        <small  class="text-muted"> <br> Las mejores consultas en un solo lugar </small>
     -->
      </div> 
 
      <div>
            <div>
            <!--  <text @click="WordSphere.$emit('start_autonomous_move');  " >START MOVE</text> -->
             <!--<suggested-search v-on:suggestedSearchCall='suggestedSearchCall' :global_specialties="global_specialties" >  </suggested-search > 
              --> 
              <!--
              <searchAppointmentForm  v-on:searchGeneric="searchGeneric" :suggestedSearchParams='suggestedSearchParams' v-on:searchBySpecialty="searchBySpecialty" v-on:searchByTypeCenter="searchByTypeCenter" v-on:searchByTypeHome="searchByTypeHome" v-on:searchByTypeRemote="searchByTypeRemote" v-on:searchByLocation="searchByLocation" v-on:searchByDate="searchByDate" :currentDate="currentDate" :global_specialties="global_specialties" :global_comunas="global_comunas"  :n_app_filtered="n_appointments_found" ></searchAppointmentForm>
                -->
              <searchAppointmentForm  v-on:searchGeneric="searchGeneric"  :currentDate="currentDate" :global_specialties="global_specialties" :global_comunas="global_comunas"  :n_appointments_found="n_appointments_found" ></searchAppointmentForm>
          
              
          <!-- To focus on result appointments -->
          <div ref="scrollToMe"></div>

          <!-- LIST APPOINTMENTS -->
          <div class="d-flex justify-content-center" v-if="appointments_filtered !=null && appointments_filtered.appointments_list !=null && appointments_filtered.appointments_list !=null && appointments_filtered.appointments_list.length > 0">                
                <p class="">{{ appointments_filtered.appointments_result_counter }} resultados en próximos {{ appointments_filtered.days_counter }} dias.   ({{ metric_search/1000}}Seg) </p>
          </div>
          <div class="d-flex justify-content-center" v-if="appointments_filtered !=null && appointments_filtered.appointments_list !=null && appointments_filtered.appointments_list !=null && appointments_filtered.appointments_list.length > 0">                
                <searchAppointmentResult  :response_truncated_date="response_truncated_date" :response_truncated="response_truncated"   :response_truncated_at="response_truncated_at"  :n_appointments_found="appointments_filtered.appointments_result_counter" :key="forceReRender" :appointments_filtered="appointments_filtered" :centers='centers_filtered' :searchParameters='searchParameters'   v-on:updateLastSearch="updateLastSearch" :daterequired="daterequired"  :global_comunas="global_comunas" :global_specialties="global_specialties"  > </searchAppointmentResult> 	    
          </div>


          <!-- END LIST APPOINTMENTS -->


          <div v-else style="height:900px">
                
               
          </div>
               
        
        
            </div>
      </div>

<!--
  <FooterContent v-if="show_footer"  ></FooterContent>
 --> 
  
  </div>

  

</template>

<style scoped>

</style>


<script>


export default {
  components: { SuggestedSearch },
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

            appointments : [] ,
            appointments_filtered : null ,
            response_truncated : null ,
            response_truncated_at : null ,
            response_truncated_date : null ,



            centers : [] ,
            centers_filtered : [] ,
/*
            global_specialties : null ,
            global_comunas : null ,
*/
            forceReRender : 0 , 
            showMainScreen : true ,

            suggestedSearchParams : null ,

            show_footer : true,


    }
  },

    props: ['global_specialties','global_comunas','start_autonomous_move'], 
    

 mounted () {
             this.daterequired = new Date() 
             this.currentDate =  new Date() 
             this.appointments_filtered = [] 
             this.show_footer = true 
            },

methods: {
            /*
            numberAppointmentFound()
            {
              let n_app = 0
              for (var i = 0; i <this.appointments_filtered.appointments_list.length ; i++) {
                if (this.appointments_filtered.appointments_list != null && this.appointments_filtered.appointments_list[i].appointments != null ) {
                  n_app = n_app + this.appointments_filtered.appointments_list[i].appointments.length
                }
              }
              return n_app
            },
            */

            async searchGeneric(params)
            {
              this.show_footer=false 
                            
              //this.searchGeneric = false

               console.log("Search Generic Params :"+JSON.stringify(params))
               let response_search = await this.searchAppointmentsGeneric(params)
               
               if ( response_search!= null &&  response_search.appointments_list != null &&  response_search.appointments_list.length > 0  )
               {
               this.appointments = response_search ; 
               // this.centers = response_search.centers ; 
               this.appointments_filtered = JSON.parse(JSON.stringify(this.appointments));
               this.response_truncated = this.appointments.response_truncated
               this.response_truncated_at = this.appointments.response_truncated_at
               this.response_truncated_date = this.appointments.response_truncated_date


               console.log ("SearchGeneric RESULTS : "+JSON.stringify(this.appointments_filtered))
               //this.n_appointments_found = this.appointments_filtered.appointments_list.length 
              //this.n_appointments_found = this.numberAppointmentFound()  
             // this.n_appointments_found = this.appointments_filtered 
              //INACTIV SCROLL DOW
              //this.scrollDown()
              
              }
               else{
                 this.n_appointments_found = 0  
                 this.appointments_filtered = []
                 this.centers_filtered = []
               }          
               //this.forceReRender = Math.random() 
              

            },

            scrollDown()
            {
            console.log("scroll Down");
            var element = this.$refs['scrollToMe'];
            var top = element.offsetTop;
            window.scrollTo(0, top);
            },

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
/*
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
              this.scrollDown()
        
            },
            */

            /*
//SEARCH BY TYPE_CENTER
            searchByTypeCenter(params)
            {
              console.log("Search by type Center SEARCH APPOINTMENT ");
              //cicle for each day
              for (let i = 0; i < this.appointments.appointments_list.length; i++) {
                  console.log("Filter day "+JSON.stringify(this.appointments.appointments_list[i]))
                  //filter centers Remote Care == true
                  let aux_centers =  this.appointments.appointments_list[i].centers || [] 
                  this.appointments_filtered.appointments_list[i].centers = aux_centers.filter(center => center.center_visit == true );
                  //extract only id froms Centers filtered
                  let centers_filtered_ids = this.appointments_filtered.appointments_list[i].centers.map(center => center.id ) ;
                  //finally filter appointments exist in centers filtered ids
                  let aux_appointments =  this.appointments.appointments_list[i].appointments || [] 
                  this.appointments_filtered.appointments_list[i].appointments = aux_appointments.filter(appointment => centers_filtered_ids.includes(appointment.center_id) );
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
              let aux_centers =  this.appointments.appointments_list[i].centers || [] 
              this.appointments_filtered.appointments_list[i].centers = aux_centers.filter(center => center.home_visit == true );
              //extract only id froms Centers filtered
              let centers_filtered_ids = this.appointments_filtered.appointments_list[i].centers.map(center => center.id ) ;
               //finally filter appointments exist in centers filtered ids
              let aux_appointments =  this.appointments.appointments_list[i].appointments || [] 
              this.appointments_filtered.appointments_list[i].appointments = aux_appointments.filter(appointment => centers_filtered_ids.includes(appointment.center_id) );
               }
              
            },
//SEARCH BY TYPE_REMOTE
            async searchByTypeRemote(params)
            {
              console.log("Search by type Remote SEARCH APPOINTMENT ");
              
              let response_search = await this.searchAppointments(params)
               
              if ( response_search!= null &&  response_search.appointments_list != null &&  response_search.appointments_list.length > 0  )
              {
              this.appointments = response_search ; 
              // this.centers = response_search.centers ; 
              //this.appointments_filtered = JSON.parse(JSON.stringify(this.appointments));
              //console.log ("SearchAppointment searchBySpecialty RESULTS : "+JSON.stringify(this.appointments_filtered))
              //this.n_appointments_found = this.appointments_filtered.appointments_list.length 
              
            //FILTER ONLY REMOTE CARE
              //cicle for each day
              for (let i = 0; i < this.appointments.appointments_list.length; i++) {
              console.log("Filter day "+JSON.stringify(this.appointments.appointments_list[i]))
              //filter centers Remote Care == true
              let aux_centers =  this.appointments.appointments_list[i].centers || [] 
              this.appointments_filtered.appointments_list[i].centers = aux_centers.filter(center => center.remote_care == true );
              //extract only id froms Centers filtered
              let centers_filtered_ids = this.appointments_filtered.appointments_list[i].centers.map(center => center.id ) ;
              //finally filter appointments exist in centers filtered ids
              let aux_appointments =  this.appointments.appointments_list[i].appointments || [] 
              this.appointments_filtered.appointments_list[i].appointments = aux_appointments.filter(appointment => centers_filtered_ids.includes(appointment.center_id) );
               }
            
            
            //END FILTER ONLY REMOTE CARE
              }
              else{
                this.n_appointments_found = 0  
                this.appointments_filtered = []
                this.centers_filtered = []
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
            */  

//SUGESTED SEARCH
/*  
async suggestedSearchCall(params)
            {
              params.date = this.daterequired
              this.suggestedSearchParams = params 
              console.log ("Search Appointment Suggested Search "+JSON.stringify(params))
              
              let response_search = await this.searchAppointments(params)
               
              if ( response_search!= null &&  response_search.appointments_list != null &&  response_search.appointments_list.length > 0  )
              {
              this.appointments = response_search ; 
              // this.centers = response_search.centers ; 
              this.appointments_filtered = JSON.parse(JSON.stringify(this.appointments));
              console.log ("Suggested Search, SearchAppointment searchBySpecialty RESULTS : "+JSON.stringify(this.appointments_filtered))
              this.n_appointments_found = this.appointments_filtered.appointments_list.length 
              }
              else{
                this.n_appointments_found = 0  
                this.appointments_filtered = []
                this.centers_filtered = []
              } 
                       
              //this.forceReRender = Math.random() 

            },
*/

//SEARCH GENERIC

async searchAppointmentsGeneric(params) {	
              console.log("search Appointments Generic Input Params :"+JSON.stringify(params) ) 
              this.params_bkp = params
              this.showMainScreen = false ;
              
              let response_json = {data:[]}
              let metric = Date.now();
              this.active_spinner = true ; 
              if (  params !=null && params.specialty != null )
              {            
                                 
                          const json = { 
                  // agenda_id : this.par_agenda_id ,			 
                          
                          specialty : params.specialty.id ,
                          location : params.location ,
                          home_visit : params.home_visit,
                          type_home : params.type_home,
                          type_center : params.type_center,
                          type_remote : params.type_remote,           
                                  };
                          if ( params !=null && params.date != null  )
                          { 
                            json.date = new Date(params.date) 
                          }
                          else 
                          {
                            json.date = new Date()
                          }

                                  


                  console.log ("patient_get_appointments_generic REQUEST:"+ JSON.stringify(json)  );
                 
                  let response = await axios.post(this.BKND_CONFIG.BKND_HOST+"/patient_get_appointments_generic",json);
                    if (response != null )
                    {
                    response_json = response.data ; 
                    console.log ("patient_get_appointments_generic RESPONSE:"+JSON.stringify(response_json)) ;
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
            
//SEARCH APPOINTMENTS
/*
async searchAppointments(params) {	
              console.log("search Appointments input params :"+JSON.stringify(params) ) 
              this.params_bkp = params
              this.showMainScreen = false ;
              
              let response_json = {data:[]}
              let metric = Date.now();
              this.active_spinner = true ; 
              if (  params !=null && params.specialty != null )
              {            
                                 
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
*/

            async updateLastSearch()
            {
                console.log ("update Last Search"+JSON.stringify(this.params_bkp)) ;
                this.appointments = await  this.searchGeneric(this.params_bkp); 
                //this.appointments_filtered = JSON.parse(JSON.stringify(this.appointments));
                this.appointments_filtered = this.appointments;
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