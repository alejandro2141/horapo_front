<script setup>
import { ref } from 'vue'
import axios from 'axios';
import AppointmentReserved from  './appointmentReserved.vue'
import ModalShowAppointmentTaken  from './modalShowAppointmentTaken.vue';
import { BKND_CONFIG } from '../../../config123.js'


</script>
<template>
    
    <div class="m-3 h-100" style="width:350px; ">
    <ModalShowAppointmentTaken v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourTaken='hourTaken' :session_params='session_params' :openModalShowAppTakenEvent='openModalShowAppTakenEvent' :global_comunas='global_comunas' :global_specialties='global_specialties'  > </ModalShowAppointmentTaken>
   
        <!--
        <text></text>
         <p class="display-6 text-center mt-1  e ">
            Horas Reservadas  
         </p>
         <text></text>
        -->

        <p class="text-center">
                <text class="text-center display-5 pt-1 text-dark ">Citas Reservadas  </text>
                <br>
                <text class="text-secondary"> Lista tus Horas tomadas por pacientes</text>
        </p>

            
            
            <div class="md-form mt-0">
    </div>
    <!-- Search form -->
        <div v-if="true" class="m-2 d-flex justify-content-center">
            <input style="border-radius: 25px;" class="text-uppercase form-control form-control-sm ml-3 w-75"  v-model="pattern"    type="text" placeholder="Search" aria-label="Search">
           <!-- <i class="bi bi-search display-5 text-secondary" style="margin-left: -1.2em"  ></i> -->
        </div>
        
        <div class="d-flex justify-content-evenly">
            <text @click="showOldApp=true"> Todas </text>
            <text @click="showOldApp=false"> Futuras </text>
        </div>

        <!--
        <button v-if="!showOldApp" @click="showOldApp=true" type="button" class="btn btn-secondary m-4">Ver Citas Pasadas</button>
        <button v-if="showOldApp" @click="showOldApp=false" type="button" class="btn btn-secondary m-4">Ocultar Citas Pasadas</button>
        -->

        <div v-for="app in appsFiltered" :key='app.id'  >
        <!-- 
            <div class="mt-3">
                <i class="bi bi-clock-history"></i>  {{ formatDate(app.date)  }} : {{ formatTime(app.start_time) }}({{ app.duration }} Min)  {{getSpecialty(app.specialty_reserved)}}
                <br> 
                <small>
                {{ app.patient_name  }} {{ app.patient_doc_id  }} ({{ app.patient_age  }})  {{ app.patient_email  }} <i class="bi bi-telephone"></i>{{app.patient_phone1}}
                </small>
            </div>  
        -->
            <div v-if="evaluateDate(app.date) || showOldApp" class="mt-4 " style="border-radius: 0px; background-color: #FFF;font-family: Arial, Helvetica, sans-serif;border-top: 1px solid;">
                <div class="p-1"  :class="{ 'text-secondary': !evaluateDate(app.date) }" >
                   <text  style="font-size: 1.4em"  >{{ formatDate(app.date)  }}</text>  <text style="font-size: 1.3em">{{getSpecialty(app.specialty_reserved)}}</text>
                   <text v-if="!evaluateDate(app.date)"> (En el pasado) </text> 
                </div>
               
                <AppointmentReserved   v-on:displayModalReservedDetails="displayModalReservedDetails" :appointment='app'  :index="app.id" :days_expired="[]"  :global_specialties='specialties' :global_comunas='global_comunas' :specialty_data="specialties.find(elem => elem.id ==  app.specialty_reserved )" :center_data="centers.find(elem => elem.id ==  app.center_id  )" :calendar_data="calendars.find(elem => elem.id ==  app.calendar_id  )"  :session_params='session_params' > </AppointmentReserved>
            </div>



        </div>
      

    <div style="height:35em ">       
    </div>

    </div>     
</template>

<style scoped>

</style>


<script>

export default {
 
data: function () {
		return {
            apps : [] ,
            appsFiltered : [] ,
            appsTaken : [],
            appsCancelled : [] ,
            specialties: [],
            pattern : "" ,
            appTakenFiltered : [] ,
            appCancelledFiltered : [] ,
            centers : [] , 
            calendars : [] ,

            //for VIew Detail Modal
            hourTaken : null ,
            daterequired : null ,
            openModalShowAppTakenEvent : null,
            //global_comunas   :  null ,
            //global_specialties :  null ,
            searchBox: false ,
            showOldApp : true ,
            showCancelled : true ,

           		 }
	},
	

    props : ['session_params','global_comunas' , 'global_specialties' ] ,
	emits : [],

    beforeCreate () {
        // console.log("TAB AppointmentsListReserved BegoreCReate");  
        },

    created () {  
         // console.log("TAB AppointmentsListReserved Created");  
         },
   

    updated () {
        // console.log("TAB AppointmentsListReserved Updated");
       
            },

    destroyed() {
        // console.log("TAB AppointmentsListReserved Destroyed");
        },

    mounted () {
        console.log("TAB AppointmentsListReserved Mounted");
        //this.getAppTaken()
        //this.getAppCancelled()
        this.getAppointments ()
        },

 
    methods: {

            async getAppointments ()
            {
               console.log("get APPOINTMENTS method" )
               let appTaken = await this.getAppTaken()
               // await this.getAppCancelled()

                    this.apps = this.apps.concat(appTaken.appointments)
                    this.appsFiltered = this.appsFiltered.concat(appTaken.appointments)
                    this.specialties = this.specialties.concat(appTaken.specialties)
                    this.centers = this.centers.concat(appTaken.centers)
                    this.calendars = this.calendars.concat(appTaken.calendars)

                let appReserved = await this.getAppCancelled()

                    this.apps = this.apps.concat(appReserved.appointments)
                    this.appsFiltered = this.appsFiltered.concat(appReserved.appointments)
                    this.specialties = this.specialties.concat(appReserved.specialties)
                    this.centers = this.centers.concat(appReserved.centers)
                    this.calendars = this.calendars.concat(appReserved.calendars)
                
            
                this.apps  = await  this.apps.sort(function(o){ return new Date( o.start_time ) }).reverse()  
                this.appsFiltered =  [...this.apps] 
                console.log( " APPS  : "+JSON.stringify(this.apps ) );
            },

                      
            evaluateDate(date)
            {
                let today = new Date()
                //console.log ("TAB APPOINTMENT LIST today:"+today.getTime()+"   AppDate:"+Date.parse(date) )
                if  (today.getTime() > Date.parse(date) )  
                {
                    return false
                }
                else 
                {
                    return true 
                }
            },
   
            displayModalReservedDetails(app)
            {
                this.hourTaken = app
                this.openModalShowAppTakenEvent = Math.random();
            },

            updateAppList()
            {
                this.apps = [] 
                this.appsFiltered = [] 
                console.log("update TabAppointmentListReserved ")
                this.getAppTaken()
                this.getAppCancelled()
            },

            async searchPattern(pattern)
            {  
               // await this.getAppointments () 
               this.searchBox=true

               let aux_pattern = pattern.toUpperCase()
               let aux_app_filtered = new Array()
               console.log("PREVIOS TO SEARCH:")
               console.log("APPfILTERED:"+aux_app_filtered.length)
               console.log("APP:"+this.apps.length)
             
               console.log("searchPatter::"+aux_pattern)
             
                if ( pattern!= null && pattern.length > 1 )
                {
                    if (aux_pattern.includes("/"))
                    {
                        
                        console.log("-------------search a date")
                        
                            for (let i = 0; i < this.apps.length; i++) 
                            {
                                let auxDate = new Date (this.apps[i].date)
                                let dateFormatter =  auxDate.getDate()+"/"+(auxDate.getMonth()+1)+"/"+auxDate.getFullYear()   
                                console.log("dateFormatter:"+dateFormatter)
                                
                                if (dateFormatter.includes(pattern))
                                {
                                    aux_app_filtered.push(this.apps[i]) 
                                }
                            }
                    }
                    else if(this.apps != null  && this.apps.length >0  && aux_pattern.length>1 )
                    {
                        console.log("---------------search pattern text:"+aux_pattern)
                            for (let i = 0; i < 5; i++) 
                            {
                                if ( this.apps[i].patient_name.includes(aux_pattern) || this.apps[i].patient_email.includes(aux_pattern) || this.apps[i].patient_doc_id.includes(aux_pattern) || this.apps[i].patient_phone1.includes(aux_pattern)  )
                                {
                                    aux_app_filtered.push(this.apps[i]) 
                                }  
                                console.log("--------- cicle:"+i+"  app.id:"+this.apps[i].id)
                                
                            }
                    }
                }
                else 
                {
                    this.appsFiltered = [...this.apps] 
                    return     
                }
               //console.log("searchPatter:RESULT: "+JSON.stringify(this.appsFiltered) )
               //this.apps=aux_app_filtered
               this.appsFiltered = [...aux_app_filtered]

            },

            filterby(val)
            {
            this.appTakenFiltered = appsTaken.filter(app => app.patient_name ==  val );           
            },

            getSpecialty(pid)
            {
                let spe= this.specialties.find(elem => elem.id ==  pid  )

                if (spe != null) { return spe.name }
                else { return "" }
            },

            formatDate(obj)
            {
                let adate = new Date (obj)
                return (adate.getDate()+"/"+(adate.getMonth()+1)+"/"+adate.getFullYear() )
            },
            formatTime(obj)
            {
                let atime = new Date (obj)
                return (atime.getHours()+":"+atime.getMinutes() )

            },

            async getAppTaken() {
                const json = { 
                    //professional_id : this.session_params.professional_id ,			   
                    professional_id : this.session_params.professional_id ,			   
                            };
                    console.log ("professional_get_appointments_taken :"+ JSON.stringify(json)  );
                    let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/professional_get_appointments_taken",json);
                    //console.log ("professional_get_appointments_taken  RESPONSE:"+JSON.stringify(response_json)) ;   
                    
                    console.log("get Appointment taken concluded")
                    return response_json.data 
                    
                    /*
                    this.apps = this.apps.concat(response_json.data.appointments)
                    this.appsFiltered = this.appsFiltered.concat(response_json.data.appointments)
                    this.specialties = this.specialties.concat(response_json.data.specialties)
                    this.centers = this.centers.concat(response_json.data.centers)
                    this.calendars = this.calendars.concat(response_json.data.calendars)
                    */

                    /*
                    this.appsTaken = response_json.data.appointments
                    this.appTakenFiltered = response_json.data.appointments
                    this.specialties = response_json.data.specialties
                    this.centers = response_json.data.centers
                    this.calendars = response_json.data.calendars
                    */
                  
            },	

            async getAppCancelled() {
                const json = { 
                    //professional_id : this.session_params.professional_id ,			   
                    professional_id : this.session_params.professional_id ,			   
                            };
                    console.log ("professional_get_appointments_cancelled :"+ JSON.stringify(json)  );
                    let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/professional_get_appointments_cancelled",json);
                    //console.log ("professional_get_appointments_cancelled  RESPONSE:"+JSON.stringify(response_json)) ;   
                    console.log("get Appointment Cancelled concluded")

                    return response_json.data

                    /*
                    this.apps = this.apps.concat(response_json.data.appointments)
                    this.appsFiltered = this.appsFiltered.concat(response_json.data.appointments)
                    this.specialties = this.specialties.concat(response_json.data.specialties)
                    this.centers = this.centers.concat(response_json.data.centers)
                    this.calendars = this.calendars.concat(response_json.data.calendars)
                    */
            },

		},

        watch: 
        {
            pattern (p_new, p_old)
            {
                this.searchPattern(this.pattern)
            }

        }, 
  

}
</script>

