<script setup>
import { ref } from 'vue'
import LoadProgress from '../loadProgress.vue'
import axios from 'axios'
import GeneralHeader from '../GeneralHeader.vue'
import appointmentAvailableSearchCalendar from './AppointmentAvailableSearchCalendar.vue'
import modalPublicViewAppointment from '../publicSearch/ModalPublicViewAppointment.vue';
/*
import patientAppointmentAvailable  from '../publicSearch/PatientAppointmentAvailable.vue'
import modalPublicViewAppointment from '../publicSearch/ModalPublicViewAppointment.vue'

*/
</script>

<template>
<div>
     <modalPublicViewAppointment  :searchParameters="searchParameters" :app="app" :openModalEvent="openModalEvent"   v-on:updateLastSearch="updateLastSearch"  :global_comunas='global_comunas' :global_specialties="global_specialties"  > </modalPublicViewAppointment>
     
    
    <div >
        <loadProgress  :active_spinner="active_spinner" > </loadProgress>
       <!--  <GeneralHeader></GeneralHeader> -->
    
    <p class="text-center">

    </p>

    <div v-if="center != null" class="fs-3" >
       
        <p class="text-center">
        
            <text class=" m-3">
           
            {{ professional.name }}
            <br> <text class="text-secondary"> <small> Agenda Profesional</small> </text>
            </text>
            <br>
            <text class=" m-3 display-5" style="color: rgb(31, 157, 148);" >
            {{  specialty }}
            </text>
            <!-- HOME VISIT -->
            <text v-if="center.home_visit" class=" m-3" >
                <br>
                <text style="color: rgb(51, 153, 255);">  
                    <i class="bi bi-house-door" ></i>  
                    Visita a Domicilio
                <br>
                </text>
                {{id2comunaName(center.home_comuna1)}} &nbsp;
                {{id2comunaName(center.home_comuna2)}} &nbsp;
                {{id2comunaName(center.home_comuna3)}} &nbsp;
                {{id2comunaName(center.home_comuna4)}} &nbsp;
                {{id2comunaName(center.home_comuna5)}} &nbsp;
                {{id2comunaName(center.home_comuna6)}} &nbsp;
            </text>
            <!-- REMOTE CARE -->
            <text v-if="center.remote_care" class=" m-3" style="color: rgb(179, 107, 0);" >
                <br><i class="bi bi-camera-video"  ></i>Tele Atencion 
                
            </text>
            <!-- CENTER VISIT -->
            <text v-if="center.center_visit" class=" m-3"  >
                <br>
                <text style="color: rgb(120, 30, 209);"> 
                    <i class="h1 bi bi-building"  > </i> En Centro <br>  
                </text>
            
                {{center.address}}<br>
                {{center.comuna}}
                 
            </text>

        
        </p>

         <!--
        <text class=" m-3">
           {{ center.name}}
        <br>
        </text> -->
         
    </div>
    

        <div v-if="showSearch" class="mt-1 ">
            <div   class="mt-1 d-flex justify-content-between">
                <input style="border-radius: 25px;" v-model="form_search_date" :min="form_minimum_date"   type="date" id="app_date" name="app_date" class="form-control form-control border border-primary" >
            </div>
        </div>

        <p class="text-center" v-if="!showSearch">
        <button @click="showSearch=!showSearch;searchAppointmentsCalendar();" type="button" class="mt-3 btn btn-primary"> 123Hora <br> Ver Horas Disponibles </button>
        </p>

        <p v-if="appointments != null " class="mt-3">   
          horas disponibles en Fecha seleccionada
        </p>
       
        <div  v-for="appointment in appointments" :key="appointment.id" class="mt-3">
                <appointmentAvailableSearchCalendar class=""  v-if="appointment != null"  v-on:click="setModalReserve(appointment)" :appointment='appointment'  > </appointmentAvailableSearchCalendar>                  
        </div>


        <!--
        <loadProgress  :active_spinner="active_spinner" > </loadProgress>
        
        <div  v-if="appointments!= null" >
            <div class="mt-0 "  v-for="appointment in appointments" :key="appointment.id" >
                
                    <patientAppointmentAvailable :searchParameters="searchParameters" class=" m-2 "  v-if="appointment != null"  v-on:click="setModalReserve(appointment)" :appointment='appointment'  :global_comunas="global_comunas" :global_specialties="global_specialties"  > </patientAppointmentAvailable>            
             
            </div>
            <div style="height: 400px">
            </div>

        </div>	
        <modalPublicViewAppointment  :searchParameters="searchParameters" :app="app" :openModalEvent="openModalEvent"   v-on:updateLastSearch="updateLastSearch"  :global_comunas='global_comunas' :global_specialties="global_specialties"  > </modalPublicViewAppointment>
        -->
    </div>     

</div>
</template>

<style scoped>

</style>


<script>

export default {
 data : function() {
    return {
            cal_id : null ,
            token : null ,
            appointments : null ,
            center_id : null , 
            professional_id : null ,
            date :null ,
            center : null, 
            professional : {name : 'Not Set'} ,
            specialty : "No Set",
            global_specialties : [] ,
            global_comunas : [] ,
            //APP set for modal View Appointment
            app : null ,
            openModalEvent : null , 

            searchParameters : null ,


            form_search_date: null ,
            form_minimum_date : null ,

            active_spinner : false ,

            showSearch : false,

            metric_search : null ,

            specialty : null ,
            /*
            app : null , 
            showModal : false , 
            showModalConfirmation : false , 
            appConfirmed : null, 
            appointment_list : null, 
          //  notificationMessage: null, 
            modalOpen : ref(false), 
            openModalEvent : null , 
            showLoaderProgress : false , 
            */
           
    }
  },

   props: ['session_params','daterequired', 'filter_center' , 'filter_home' , 'filter_remote' ],
   emits: ["updateLastSearch"],

 

    beforeCreate(){
      
    },
    activated(){
      
    },
   mounted () {    
        let uri = window.location.search.substring(1); 
        let params = new URLSearchParams(uri);
        
        let aux_date = new Date();

        this.date = new Date().setDate(aux_date.getDate()+1) 
        this.form_search_date = null 
        //new Date(this.date.getDate() +1 ).toISOString().split("T")[0];

        this.token=params.get("token")
        this.cal_id=params.get("cal_id")
        this.cal_specialty = null 
        this.cal_professional = null 

        let aux_date2 = new Date();
        aux_date2.setDate(aux_date.getDate()+1) ;
       
        this.form_minimum_date = aux_date2.getFullYear() +"-"+String(aux_date2.getMonth()+1).padStart(2,0) + "-"+String(aux_date2.getDate()).padStart(2,0)  ;
        this.date =  this.form_minimum_date ;
        console.log(" FormMinimumDate: "+ this.form_minimum_date );
       

    
        console.log("URL PARAMETROS : cal_id:"+this.cal_id+ " Token:"+this.token+" Date:"+this.date  )
   
      // this.getProfessionalData();
      // this.getCenterData();
     
       },

    beforeUpdate(){
        /*
        this.showLoaderProgress = true  ;
        console.log("showloader progress BEFORE UPDATE !!!");
        */
        },

    updated()
        {
            /*
        this.showLoaderProgress = false  ;
        console.log("showloader progress UPDATE !!!");
        */
        },

    watch: {
            /*
            appointments(newAppointments, oldAppointments ) {
                this.appointment_list =  newAppointments ;   
             //   this.notificationMessage="Econtramos "+this.appointments.length+" resultados, desde dia "+this.daterequired +" ";	                 
            },
            */
        },

    methods: {
        

       
        async searchAppointmentsCalendar() {	
            this.active_spinner = true ; 
              if (  this.cal_id != null )
              {    
                          let metric = Date.now();
                                                   
                          const json = { 
                            date : this.date ,
                            token : this.token , 
                            cal_id :  this.cal_id,
                                };

                  console.log ("searchAppointmentsCalendar INPUT send JSON :"+ JSON.stringify(json)  );
                  let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/patient_get_appointments_calendar",json);
                  
                  this.appointments = response_json.data;
                  console.log ("searchAppointmentsCalendar RESPONSE:"+JSON.stringify(this.appointments)) ;
                  if (this.appointments.length > 0)
                    {

                  // this.notificationMessage="Econtramos "+this.appointments.length+" resultados, desde dia "+this.daterequired +" ";	
                    this.center_id = this.appointments[0].center_id;
                  
                    metric = (Date.now() - metric ) ;     
                    this.metric_search = metric ;
                    console.log("performance, searchAppointments , searchAppointments ,"+  this.metric_search  );
                                
                    this.get_center();  
                   
                    this.get_professional_data();
                    this.get_specialties() ;
                    this.get_locations() ; 

                   

                    }
              }
              else 
              {
                  this.appointments = null;
              }
            
            this.active_spinner = false ;         
            
           },

          async get_center()
           {
                const json_center = { 
                    center_id : this.appointments[0].center_id,
                    };
               console.log("get Center REQUEST "+JSON.stringify(json_center));
               let response = await axios.post(this.BKND_CONFIG.BKND_HOST+"/patient_get_center",json_center);
               this.center = response.data
               console.log("get Center RESPONSE "+JSON.stringify(this.center) );
           },

           async get_professional_data()
           {
                const json_center = { 
                    professional_id : this.appointments[0].professional_id,
                    };
               console.log("get_professional_data REQUEST "+JSON.stringify(json_center));
               let response = await axios.post(this.BKND_CONFIG.BKND_HOST+"/patient_get_professional",json_center);
               this.professional= response.data
               console.log("get_professional_data RESPONSE "+JSON.stringify(this.professional) );
           },

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

            setSpecialtyName()
            {
                if (this.appointments != null && this.appointments.length > 0 )
                {
                    let temp= this.global_specialties.find(elem => elem.id ==  this.appointments[0].specialty  )
                    if (temp != null) { this.specialty= temp.name }
                    else { this.specialty= null }

                }
                else { this.specialty= null }
            },

            id2comunaName(id)
            {
            let temp= this.global_comunas.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
            },
         
            setModalReserve(appointment)
            {
                console.log("Set Modal Reserve method in SearchApp Resutl"+JSON.stringify(appointment));
                
              //  {"calendar_id":"136","date":"2022-06-14","professional_name":"Juanito Cura Los Dolores Pies","specialty1":144,"duration":60,"professional_id":"1","home_visit":true,"home_visit_location1":1662,"home_visit_location2":1511,"home_visit_location3":null,"home_visit_location4":null,"home_visit_location5":null,"home_visit_location6":null,"center_visit_location":null,"center_visit":false,"center_id":149,"center_name":"Kines a domicilio","center_address":null,"remote_care":false,"status":1,"start_time":"02:00"}
              //  {"calendar_id":"136","date":"2022-06-15                                                    ","specialty" :144,"duration":60,                                                                                                                                                                                                                                                                  "center_id":149,                                                                                       "start_time":"1:0","time_between":0,"professional_id":"1"}
                this.app = appointment;
                this.app['professional_name']=this.professional.name ; 
                this.app['specialty1']=new String(this.app.specialty) ; 
                this.app['home_visit']=this.center.home_visit ; 
                this.app['center_visit']=this.center.center_visit ; 
                
                this.app['center_name']=this.center.name ; 
                this.app['center_address']=this.center.address ; 

                this.app['remote_care']=this.center.remote_care ; 

               this.app['home_visit_location1']=this.center.home_comuna1 ; 
               this.app['home_visit_location2']=this.center.home_comuna2 ; 
               this.app['home_visit_location3']=this.center.home_comuna3 ; 
               this.app['home_visit_location4']=this.center.home_comuna4 ; 
               this.app['home_visit_location5']=this.center.home_comuna5 ; 
               this.app['home_visit_location6']=this.center.home_comuna6 ; 
               
               this.app['center_visit_location']=this.center.comuna ; 
                
               this.searchParameters=this.app.specialty ;


                console.log("Set Modal Reserve method in app for modal"+JSON.stringify(this.app));
                
               //this.searchParameters = { 'specialty' : this.appointments[0].specialty } 
               //this.modalOpen = true; 
               this.openModalEvent = Math.random() ;
            },
          
          /* 
            updateLastSearch()
            {
                console.log (" update search Result. ");
                //this.appointment_list=null ;
                this.$emit('updateLastSearch');
            },

            selectedInsuranceCode(code)
            {
            console.log("Insurance Code:"+code);
            this.form_patient_insurance_code = code;
            },
            */

        },
  
    watch : {
        form_search_date(newValue)
        {
            console.log("Date New Value:"+newValue);
            this.date = new Date(newValue);
            this.searchAppointmentsCalendar() ;
        }

    }



}

</script>