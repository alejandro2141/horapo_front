<script setup>
import { ref } from 'vue'
import axios from 'axios';
import AppointmentReserved from  './appointmentReserved.vue'
import ModalShowAppointmentTaken  from './modalShowAppointmentTaken.vue';

</script>
<template>
    
    <div class="m-3">
    <ModalShowAppointmentTaken v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourTaken='hourTaken' :session_params='session_params' :openModalShowAppTakenEvent='openModalShowAppTakenEvent' :global_comunas='global_comunas' :global_specialties='global_specialties'  > </ModalShowAppointmentTaken>

            <p class="text-center">Se listan todas las Reservadas</p>
            <div class="md-form mt-0">
    </div>
    <!-- Search form -->
        <div class="m-2 d-flex justify-content-center">
            <input class="text-uppercase form-control form-control-sm ml-3 w-75"  v-model="pattern"    type="text" placeholder="Search" aria-label="Search">
            <i @click="searchPattern(pattern)" class="bi bi-search display-3"></i>
        </div>
      
        <hr>        
        <div v-for="app in appTakenFiltered" :key='app.id' >
           
            <div class="mt-3">
                <i class="bi bi-clock-history"></i>  {{ formatDate(app.date)  }} : {{ formatTime(app.start_time) }}({{ app.duration }} Min)  {{getSpecialty(app.specialty_reserved)}}
                <br> 
                <small>
                {{ app.patient_name  }} {{ app.patient_doc_id  }} ({{ app.patient_age  }})  {{ app.patient_email  }} <i class="bi bi-telephone"></i>{{app.patient_phone1}}
                </small>
            </div>            
            
            <!--
            <div class="mt-4">
            <AppointmentReserved  includeExtraData='true' v-on:displayModalReservedDetails="displayModalReservedDetails" :appointment='app'  :index="app.id" :days_expired="[]"  :global_specialties='specialties' :global_comunas='global_comunas' :specialty_data="specialties.find(elem => elem.id ==  app.specialty_reserved )" :center_data="centers.find(elem => elem.id ==  app.center_id  )" :calendar_data="calendars.find(elem => elem.id ==  app.calendar_id  )"  :session_params='session_params' > </AppointmentReserved>
            </div>
            -->


        </div>
      

    <div class="m-3 p-3">       
    </div>

    </div>     
</template>

<style scoped>

</style>


<script>

export default {
 
data: function () {
		return {
            appsTaken : [],
            specialties: [],
            pattern : null ,
            appTakenFiltered : [] ,
            centers : [] , 
            calendars : [] ,

            //for VIew Detail Modal
            hourTaken : null ,
            daterequired : null ,
            openModalShowAppTakenEvent : null,
            global_comunas   :  null ,
            global_specialties :  null ,
           		 }
	},
	

    props : ['session_params'] ,
	emits : [],

    beforeCreate () {
         console.log("TAB AppointmentsListReserved BegoreCReate");  
        },

    created () {  
          console.log("TAB AppointmentsListReserved Created");  
         },
   

    updated () {
        console.log("TAB AppointmentsListReserved Updated");
            },

    destroyed() {
        console.log("TAB AppointmentsListReserved Destroyed");
        },

    mounted () {
        console.log("TAB AppointmentsListReserved Mounted");
        this.getAppTaken()
        },

 
    methods: {
            
            displayModalReservedDetails(app)
            {
                this.hourTaken = app
                this.openModalShowAppTakenEvent = Math.random();
            },

            updateAppList()
            {
                console.log("updateAppList")
            },

            searchPattern(pattern)
            {  this.pattern = this.pattern.toUpperCase()
               this.appTakenFiltered = [] 
               console.log("searchPatter:"+pattern)
             
               if (pattern.includes("/"))
               {
                   
                    for (let i = 0; i < this.appsTaken.length; i++) 
                    {
                        let auxDate = new Date (this.appsTaken[i].date)
                        let dateFormatter =  auxDate.getDate()+"/"+(auxDate.getMonth()+1)+"/"+auxDate.getFullYear()   
                        console.log("dateFormatter:"+dateFormatter)
                         
                         if (dateFormatter.includes(pattern))
                         {
                         this.appTakenFiltered.push(this.appsTaken[i]) 
                         }

                        
                    }

               }
               else
               {
                    for (let i = 0; i < this.appsTaken.length; i++) 
                    {
                        if ( this.appsTaken[i].patient_name.includes(pattern) || this.appsTaken[i].patient_email.includes(pattern) || this.appsTaken[i].patient_doc_id.includes(pattern) || this.appsTaken[i].patient_phone1.includes(pattern)  )
                        {
                        this.appTakenFiltered.push(this.appsTaken[i]) 
                        }
                        
                    }
               }

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
                    let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_appointments_taken",json);
                    console.log ("professional_get_appointments_taken  RESPONSE:"+JSON.stringify(response_json)) ;   
                    
                    this.appsTaken = response_json.data.appointments
                    this.appTakenFiltered = response_json.data.appointments
                    this.specialties = response_json.data.specialties
                    this.centers = response_json.data.centers
                    this.calendars = response_json.data.calendars
            },	

		},
  

}
</script>

