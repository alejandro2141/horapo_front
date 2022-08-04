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
            
            <div v-if="appointments !=null && appointments.length > 0">                
                En {{metric_search/1000}} Seg encontramos {{n_appointments_found}} resultados
                <!--
                <searchAppointmentResult  :filter_home="filter_home" :filter_center="filter_center" :filter_remote="filter_remote" :searchParameters='searchParameters' v-if="daterequired != null && appointments != null"  v-on:updateLastSearch="updateLastSearch"  :appointments="appointments" :daterequired="daterequired"  :global_comunas="global_comunas" :global_specialties="global_specialties"  > </searchAppointmentResult> 	    
                -->
                <searchAppointmentResult :centers='centers' :searchParameters='searchParameters' v-if="daterequired != null && appointments != null"  v-on:updateLastSearch="updateLastSearch"  :appointments="filtered_appointments" :daterequired="daterequired"  :global_comunas="global_comunas" :global_specialties="global_specialties"  > </searchAppointmentResult> 	    
            </div>

            <p v-if="appointments !=null && appointments.length == 0" class="text-center p-2"  > 
              <i class="bi bi-emoji-dizzy display-1"> </i> Sin horas disponibles por ahora. <br>
              <!-- {{metric_search/1000}} Seg  -->
            </p>

            <p v-if="appointments == null">
           <!--     <suggestedSearch></suggestedSearch>
           -->
            </p>
         
            </div>
     </div>
  <FooterContent v-if="appointments == null"  ></FooterContent>
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
           
            appointments : null ,
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

            n_appointments_found : 0 ,
            filtered_appointments : [] ,

            centers : [] ,
            centers_filtered : [] ,
/*
            global_specialties : null ,
            global_comunas : null ,
*/
    }
  },

    props: ['global_specialties','global_comunas'], 

 mounted () {
             this.daterequired = new Date().toISOString().split('T')[0] ;
             this.currentDate =  new Date().toISOString().split('T')[0] ;
             console.log('Search Appointment global_specialties'+this.global_specialties);
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
              console.log ("search By Specialty "+JSON.stringify(params))
              //generate search by Specialty and Date
                   /*
                          params.comuna = null
                          params.home_visit= false
                          params.type_home= false
                          params.type_center= false
                          params.type_remote = false 
*/

              await this.searchAppointments(params)
              this.filtered_appointments = this.appointments ; 
              if (this.filtered_appointments != null)
              {
              this.n_appointments_found=this.filtered_appointments.length
              }
              else{
                this.n_appointments_found = 0 ; 
              }

              
              

            },
//SEARCH BY TYPE_CENTER
            searchByTypeCenter(params)
            {
              console.log ("search By Type Center"+JSON.stringify(params))
              console.log ("CENTERS FILTERED "+JSON.stringify( this.centers_filtered))
              //WE should filter here centers are type "Center"
              this.centers_filtered = this.centers.filter(cent => cent.center_visit == true );
              let centers_filtered_ids = this.centers_filtered.map(center => center.id ) ;

              this.filtered_appointments = this.appointments.filter(appointment => centers_filtered_ids.includes(appointment.center_id) );
              
              console.log ("CENTERS FILTERED :"+JSON.stringify( this.centers_filtered))
               console.log ("CENTERS FILTERED IDS :"+JSON.stringify( centers_filtered_ids))

              console.log ("APPOINTMENTS :"+JSON.stringify( this.appointments ))
              console.log ("FILTERED APPOINTMENTS  :"+JSON.stringify( this.filtered_appointments ))

              /*
              this.filtered_appointments = this.appointments.filter(appointment => appointment.center_visit == true);
              if (params.location != null)
                    {
              this.filtered_appointments = this.filtered_appointments.filter(appointment => [appointment.center_visit_location, appointment.home_visit_location1, appointment.home_visit_location2, appointment.home_visit_location3 , appointment.home_visit_location4, appointment.home_visit_location5 , appointment.home_visit_location6 ].includes(params.location)  );
                    }
              this.n_appointments_found=this.filtered_appointments.length
              */
              //this.searchAppointments(params)
            },
//SEARCH BY TYPE_HOME
            searchByTypeHome(params)
            {
              this.centers_filtered = this.centers.filter(cent => cent.home_visit == true );
              let centers_filtered_ids = this.centers_filtered.map(center => center.id ) ;

              this.filtered_appointments = this.appointments.filter(appointment => centers_filtered_ids.includes(appointment.center_id) );
         
              /*
              console.log ("search By Type Home"+JSON.stringify(params))
              this.filtered_appointments = this.appointments.filter(appointment => appointment.home_visit == true);
              if (params.location != null)
                    {
              this.filtered_appointments = this.filtered_appointments.filter(appointment => [appointment.center_visit_location, appointment.home_visit_location1, appointment.home_visit_location2, appointment.home_visit_location3 , appointment.home_visit_location4, appointment.home_visit_location5 , appointment.home_visit_location6 ].includes(params.location)  );
                    }
              this.n_appointments_found=this.filtered_appointments.length
            */
            },
//SEARCH BY TYPE_REMOTE
            searchByTypeRemote(params)
            {

              this.centers_filtered = this.centers.filter(cent => cent.remote_care == true );
              let centers_filtered_ids = this.centers_filtered.map(center => center.id ) ;

              this.filtered_appointments = this.appointments.filter(appointment => centers_filtered_ids.includes(appointment.center_id) );
  
              /*
              console.log ("search By Type Remote"+JSON.stringify(params))
              this.filtered_appointments = this.appointments.filter(appointment => appointment.remote_care == true);
             //Does Not require search by Location. 
              this.n_appointments_found=this.filtered_appointments.length
              */

            },
//SEARCH BY LOCATION
            async searchByLocation(params)
            {
                console.log("Search BY LOCATION: "+JSON.stringify(params));
              await this.searchAppointments(params);
              this.filtered_appointments = this.appointments ; 


                if (params.type_center == true)
                { 
                  this.filtered_appointments = this.filtered_appointments.filter(appointment => appointment.center_visit == true);
                }
                if (params.type_home == true)
                { 
                 this.filtered_appointments = this.filtered_appointments.filter(appointment => appointment.home_visit == true);
                }
                if (params.type_remote == true)
                { 
                    this.filtered_appointments = this.appointments ;
                    return            
                }
                if (params.location != null)
                { 
                this.filtered_appointments = this.filtered_appointments.filter(appointment => ( [appointment.center_visit_location, appointment.home_visit_location1, appointment.home_visit_location2, appointment.home_visit_location3 , appointment.home_visit_location4, appointment.home_visit_location5 , appointment.home_visit_location6 ].includes(params.location) ) );             
                }
                
                if (this.filtered_appointments != null)
                {
                this.n_appointments_found=this.filtered_appointments.length
                }
                else
                {
                  this.n_appointments_found=0 ;
                }

            /*
              console.log ("search By Location"+JSON.stringify(params))
              // Now we should filter previos resulset 
                let temp_appointments = this.appointments ;

                if (params.type_center == true)
                { 
                  temp_appointments = temp_appointments.filter(appointment => appointment.center_visit == true);
                }
                if (params.type_home == true)
                { 
                  temp_appointments = temp_appointments.filter(appointment => appointment.home_visit == true);
                }
                if (params.type_remote == true)
                { 
                    temp_appointments = this.appointments ;
                    return            
                }
                temp_appointments = temp_appointments.filter(appointment => ( [appointment.center_visit_location, appointment.home_visit_location1, appointment.home_visit_location2, appointment.home_visit_location3 , appointment.home_visit_location4, appointment.home_visit_location5 , appointment.home_visit_location6 ].includes(params.location) ) );             

               this.filtered_appointments = temp_appointments ;
               //this.searchAppointments(params)
               this.n_appointments_found=this.filtered_appointments.length
            */

            },

//SEARCH BY DATE
          async searchByDate(params)
            {
              console.log("Search BY DATE: "+JSON.stringify(params));
              await this.searchAppointments(params);
              this.filtered_appointments = this.appointments ; 


                if (params.type_center == true)
                { 
                  this.filtered_appointments = this.filtered_appointments.filter(appointment => appointment.center_visit == true);
                }
                if (params.type_home == true)
                { 
                 this.filtered_appointments = this.filtered_appointments.filter(appointment => appointment.home_visit == true);
                }
                if (params.type_remote == true)
                { 
                    this.filtered_appointments = this.appointments ;
                    return            
                }
                if (params.location != null)
                { 
                this.filtered_appointments = this.filtered_appointments.filter(appointment => ( [appointment.center_visit_location, appointment.home_visit_location1, appointment.home_visit_location2, appointment.home_visit_location3 , appointment.home_visit_location4, appointment.home_visit_location5 , appointment.home_visit_location6 ].includes(params.location) ) );             
                }
                
                if (this.filtered_appointments != null)
                {
                this.n_appointments_found=this.filtered_appointments.length
                }
                else
                {
                  this.n_appointments_found=0 ;
                }
             
            },


//SEARCH GENERIC
        async searchAppointments(params) {	
         
              if (  params.specialty != null )
              { 
                            
                          let metric = Date.now();
                          this.active_spinner = true ; 
                          console.log("search Appointments input params :"+JSON.stringify(params) )
                          
                          let specialty_code = null ;
                          specialty_code = params.specialty.id ; 
                        

                          const json = { 
                  // agenda_id : this.par_agenda_id ,			 
                          date : params.date ,
                          specialty : specialty_code ,
                          location : params.location ,
                          home_visit : params.home_visit,
                          type_home : params.type_home,
                          type_center : params.type_center,
                          type_remote : params.type_remote,
                          
                                  };

                  console.log ("searchAppointments2 input to send JSON :"+ JSON.stringify(json)  );
                  //let response_json = await axios.post("http://192.168.0.110:8080/patient_get_appointments_day",json);
                  let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/patient_get_appointments_day2",json);
                
                  this.appointments = response_json.data;
                  console.log ("getAppointments2 RESPONSE:"+JSON.stringify(this.appointments)) ;

                  // this.notificationMessage="Econtramos "+this.appointments.length+" resultados, desde dia "+this.daterequired +" ";	
                          this.notificationMessage_alert=	false ;
                          this.searchParameters = params ;
                          this.params_bkp = params ; 
                          this.active_spinner = false ;

                    metric = (Date.now() - metric ) ;     
                    this.metric_search = metric ;
                    console.log("performance, searchAppointments , searchAppointments ,"+  this.metric_search  );
                    
                                  if (this.appointments != null)
                                  {
                                  let center_id_array = [] 
                                  //extraemos los ID de los centros. 
                                  this.appointments.forEach(element => center_id_array.push(element.center_id) );
                                  let center_id_array_filtered = center_id_array.filter(function(item, pos) {
                                        return center_id_array.indexOf(item) == pos;
                                       })
                                  console.log("*********** Center To Get:"+center_id_array)
                                  console.log("*********** Center filtered:"+center_id_array_filtered)
                                  this.centers = await this.get_centers(center_id_array_filtered) 
                                  console.log("*********** Centers  :"+ JSON.stringify(this.centers))
                                  
                                   // this.filtered_appointments = this.appointments
                                   //this.n_appointments_found=this.appointments.length
                                  }
                                  else
                                  {
                                    this.n_appointments_found = 0 ;
                                  }
                   

              }
              else 
              {
                  this.appointments = null;
             
              }        
              
             // this.get_specialties();
             // this.get_locations();

           },

            updateLastSearch()
            {
                console.log ("update Last Search") ;
                this.searchAppointments(this.params_bkp);
            },

/*
            async get_specialties()
            {
                const json_center = { 
                    token : 123,
                    };
               console.log("get_specialties REQUEST "+JSON.stringify(json_center));
               let response = await axios.post(this.BKND_CONFIG.BKND_HOST+"/common_get_specialty_list",json_center);
               console.log("get_specialties RESPONSE "+JSON.stringify(response.data.rows) );
              
              this.global_specialties =  JSON.parse(JSON.stringify(response.data.rows))
              this.setSpecialtyName() ;

            },

            async get_locations()
            {
                const json_center = { 
                    token : 123,
                    };
               console.log("get_locations REQUEST "+JSON.stringify(json_center));
               let response = await axios.post(this.BKND_CONFIG.BKND_HOST+"/common_get_comuna_list",json_center);
               console.log("get_locations RESPONSE "+JSON.stringify(response.data.rows) );
              
              this.global_comunas=  JSON.parse(JSON.stringify(response.data.rows))
            },
            */

            //******* AQUI ME QUEDE GET CENTER ***********
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