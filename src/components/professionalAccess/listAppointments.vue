<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AppointmentAvailable from './appointmentAvailable.vue'
import AppointmentReserved from  './appointmentReserved.vue'
import ModalCreateAppointment from './modalCreateAppointment.vue';
import ModalShowAppointmentDetails from './modalShowAppointmentDetails.vue';
import ModalShowAppointmentTaken  from './modalShowAppointmentTaken.vue';
import ModalProfessionalReserveAppointment from './modalProfessionalReserveAppointment.vue';
import ModalDuplicateDay from './modalDuplicateDay.vue';



</script>

<template>

 <div id="search_result" class="border">
<ModalDuplicateDay :session_params='session_params' :daterequired='daterequired' :openModalDuplicateDay='openModalDuplicateDay' :appointments_day='appointments_day' :global_comunas='global_comunas' :global_specialties='global_specialties' > </ModalDuplicateDay>

<ModalCreateAppointment  v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourCreate='hourCreate' :session_params='session_params'  v-on:switchView='switchView' :global_comunas="global_comunas" :global_specialties='global_specialties'  :openModalCreateAppEvent='openModalCreateAppEvent' > </ModalCreateAppointment>
<ModalShowAppointmentDetails v-on:showReserveModal="showReserveModal" v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourDetails='hourDetails' :session_params='session_params' :openModalShowDetailsEvent="openModalShowDetailsEvent" :global_comunas='global_comunas' :global_specialties='global_specialties'  > </ModalShowAppointmentDetails>
<ModalShowAppointmentTaken v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourTaken='hourTaken' :session_params='session_params' :openModalShowAppTakenEvent='openModalShowAppTakenEvent' :global_comunas='global_comunas' :global_specialties='global_specialties' > </ModalShowAppointmentTaken>
<ModalProfessionalReserveAppointment  v-on:updateAppList="updateAppList"  :daterequired='daterequired'  :hourToReserve='hourToReserve' :session_params='session_params' :openModalReserveAppEvent='openModalReserveAppEvent' > </ModalProfessionalReserveAppointment>
<hr> 

 <!--
    <div class="d-flex justify-content-around  listHoursHeader" >

      
            <div class="display-6" style="margin-left : 1em" >
             
            </div>
            
            <div>
            </div>
        
            
            <div @click="duplicateDay(daterequired)" class=" text-primary"  >
             Duplicar dia  <i class="bi bi-box-arrow-right"></i>
            </div>
          

    </div>
<hr>
-->


    <div v-for="(hour) in hours" :key="hour"  >
      
                <div v-if="hour.app_available != null"  >
                    <div v-if="!hour.app_available">
                        <AppointmentReserved v-on:click="displayModalReservedDetails(hour)" :appointment='hour' :index="hour.id" :global_specialties='global_specialties' :global_comunas='global_comunas' > </AppointmentReserved>
                    </div>
                    <!--
                    <div v-else>
                        <AppointmentAvailable  v-on:click="displayModalViewAppDetails(hour)" :appointment='hour' :index="hour.id"  :global_specialties='global_specialties' :global_comunas='global_comunas' > </AppointmentAvailable>
                    </div>
                    -->
                </div>
       
                <div v-else class="d-flex justify-content-between mt-1   border border-secondary" :style="{ 'background-color' : hour.color  }"  style="border-radius: 15px;" >
                    
                    <div class="mr-2 pr-2 p-2" style="marginLeft : 10px">
                            <div v-if="hour.center_visit"  >
                                <i class="h1 bi bi-building"></i> {{specialtyId2name(hour.specialty)}}     
                            </div>
                            <div v-if="hour.home_visit"  >
                                <i class="h2 bi bi-house-door" > </i>   {{specialtyId2name(hour.specialty)}}     
                            </div>    
                            <div v-if="hour.remote_care"  >
                                <i class="h2 bi bi-camera-video"></i>   {{specialtyId2name(hour.specialty)}}     
                            </div>   

                            
                                       
                    </div>
                    
                    <!-- <div class="text-primary  display-5" v-on:click="displayModalCreateApp(hour)" > -->
                    <div class="text-secondary  display-5 p-2"  >
                        <i class="bi bi-plus"></i> {{ hour.start_time.substring(0,5) }}
                    </div>

                </div>

       <!--    <hr :style="{'width': calculateLineExtension(hour)+'rem'}" style="margin: 0rem; height:0.5px ; text-align:left; margin-left:0 ; border : 1px solid black; " > -->
         <!--   <hr style="margin-top: 0.0rem; margin-bottom: 0.1rem;" />   -->
    </div>


    <div v-if="hours.length == 0 " class="d-flex justify-content-between mt-1  "  style="border-radius: 15px;" >
            
                <div class="p-4 text-center" >    
                    <i class="display-1 bi bi-emoji-expressionless"></i><br>
                  No existen Horarios o  Citas Reservadas para este dia
                </div>

    </div>
    
    
    <!-- 
    <div v-for="(hour) in hours" :key="hour.id" >

        <div v-if="hour.app_available != null" >
           
            <div v-if="hour.app_available == false ">
                <AppointmentReserved :appointment='hour' :index="hour.id" > </AppointmentReserved>
            </div>
            <div v-else>
                <AppointmentAvailable :appointment='hour' :index="hour.id" > </AppointmentAvailable>
            </div>

        </div>
    -->
<!--
    <ModalAppointmentDetails :appointment="appointment" :index="index"></ModalAppointmentDetails> 
    <ModalReserve :appointment="appointment" :index="index"></ModalReserve> 
-->
   
<!--
	<div class="mt-3 d-flex justify-content-between" >	
			<div class="m-2">
			</div>
			
			<div class="m-2 display-3 bg-success p-2 text-white"   data-bs-toggle="modal" data-bs-target="#add_hours_agenda"  >
			    <i class="bi bi-clipboard-plus" ></i> Agregar Horas
			</div>
			
			<div class="m-2">
			</div>
	</div>
    -->
    <!--
    <ModalAddHours :session_params="session_params" :centers="centers"  :daterequired="daterequired" ></ModalAddHours> 
	<ModalDuplicateDay :session_params="session_params"  :daterequired="daterequired" > </ModalDuplicateDay> 
	-->
</div>

</template>

<style scoped>

    .listHoursHeader {
    background-color:#ffffff
        }

</style>

<script>
export default {
   data : function() {
        return {
            hours : [] ,
            //hr:'01', '02', '03', '04', '05','06','07','08','09','10', '11','12','13','14','15','16','17','18','19','20','21','22','23' ],
            hourCreate : null ,
            hourDetails : null ,
            hourTaken : null ,
            hourToReserve : null ,
            prevCenterName : 'NoSet' ,
            openModalShowDetailsEvent : null ,
            openModalShowAppTakenEvent : null ,
            openModalCreateAppEvent : null,
            openModalReserveAppEvent : null,
            openModalDuplicateDay : null ,
            appointments_day : null ,
        }   
    },
   	
   props: ['daterequired','session_params','appointments',  'calendars_marks' , 'global_specialties', 'global_comunas'  ],
   emits: ['updateAppointmentList','switchView' ] , 
	created () {
       // console.log("Appointments in listAppointments = "+JSON.stringify(appointments) );
	},
    
    watch : {
        appointments(newValue){
                //copy array including only app to be display in Modal duplicate day
                this.appointments_day = [].concat(newValue);

            console.log("appointment_day:"+JSON.stringify(this.appointments_day));  
            
            this.hours = [  
                         /*   
                            { "start_time" : "00:00" , "symbol1" : "<i style='opacity: 0.5 ' class='h2 bi bi-moon-stars'></i>" ,  "color" : "#ffffff" },
                            { "start_time" : "01:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-moon-stars'></i>"  ,  "color" : "#ffffff" },
                            { "start_time" : "02:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-moon-stars'></i>"  ,  "color" : "#ffffff" },
                            { "start_time" : "03:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-moon-stars'></i>"  ,  "color" : "#ffffff" },  
                            { "start_time" : "04:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-moon-stars'></i>"  ,  "color" : "#ffffff"  },
                            { "start_time" : "05:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-moon'></i>"  ,  "color" : "#ffffff" },
                            { "start_time" : "06:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-moon'></i>"  ,  "color" : "#ffffff" },
                            { "start_time" : "07:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-sunrise'></i>",  "color" : "#ffffff" },   
                            { "start_time" : "08:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-sun '></i>"  ,  "color" : "#ffffff"  },
                            { "start_time" : "09:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-sun '></i>"  ,  "color" : "#ffffff" },
                            { "start_time" : "10:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-sun '></i>"  ,  "color" : "#ffffff" },   
                            { "start_time" : "11:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-sun '></i>"  ,  "color" : "#ffffff" },
                            { "start_time" : "12:00" , "symbol1" : "<i style='opacity: 0.5' class='h1 bi bi-sun '></i>"  ,  "color" : "#ffffff" },
                            { "start_time" : "13:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-sun '></i>"  ,  "color" : "#ffffff" },
                            { "start_time" : "14:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-sun '></i>"  ,  "color" : "#ffffff" },   
                            { "start_time" : "15:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-sun '></i>"  ,  "color" : "#ffffff" }, 
                            { "start_time" : "16:00" , "symbol1" : "<i style='opacity: 0.5'  class='h2 bi bi-sun '></i>" ,  "color" : "#ffffff" }, 
                            { "start_time" : "17:00" , "symbol1" : "<i style='opacity: 0.5' class='h1 bi bi-sun '></i>"  ,  "color" : "#ffffff" }, 
                            { "start_time" : "18:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-sun '></i>"  ,  "color" : "#ffffff" }, 
                            { "start_time" : "19:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi-sunset '></i>"  ,  "color" : "#ffffff" },  
                            { "start_time" : "20:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-moon'></i>"  ,  "color" : "#ffffff" }, 
                            { "start_time" : "21:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-moon'></i>"  ,  "color" : "#ffffff" },
                            { "start_time" : "22:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-moon-stars'></i>" ,  "color" : "#ffffff"},  
                            { "start_time" : "23:00" , "symbol1" : "<i style='opacity: 0.5' class='h2 bi bi-moon-stars'></i>" ,  "color" : "#ffffff"},  
                       */
                       ];
/*
                if (this.calendars_marks != null)
                {
                    for (let i = 0; i < this.calendars_marks.length; i++) 
                        {
                            console.log("Calendar startTime->"+this.calendars_marks[i].start_time+ " End Time->"+this.calendars_marks[i].end_time );
                           
                                 for (let x = 0; x < this.hours.length; x++) 
                                 {
                                    console.log("Hour to compare : "+ this.calendars_marks[i].start_time.substring(0,5) + " >  "+this.hours[x].start_time.substring(0,5)+ " > " + this.calendars_marks[i].end_time.substring(0,5)    ) ;
                                        let aux_calStart =   new Date("1995-12-17T"+this.calendars_marks[i].start_time.substring(0,5)+":00")  ;
                                        let aux_calEnd   =   new Date("1995-12-17T"+this.calendars_marks[i].end_time.substring(0,5)+":00") ;
                                        let aux_hour     =   new Date("1995-12-17T"+this.hours[x].start_time.substring(0,5)+":00")   ;
                                    console.log("Hour to compare : "+ aux_calStart + " <  "+aux_hour + " < " + aux_calEnd    ) ;
                                     
                                     if ( ( aux_calStart <= aux_hour ) &&  (aux_hour <= aux_calEnd)    )
                                        {
                                            if (this.calendars_marks[i].active)
                                            {
                                            this.hours[x].color = this.calendars_marks[i].color ; 
                                            }
                                            else
                                            {
                                            this.hours[x].color = "#aaaaaa" ; 
                                            }
                                            console.log("Painting hour to calendar color "+this.calendars_marks[i].color );
                                        }
                                 }

                        }
                }
*/
/*
                this.calendars_marks.forEach( function(calendar)
                {
                    console.log("Calendar  startTime->"+calendar.start_time+ " End Time->"+calendar.end_time );

                        this.hours.forEach( function(hour)
                            {
                                console.log("day startTime->"+hour.start_time);
                            }
                        );

                }
                );
*/           
 
            this.showModalCreateApp= true ;
            console.log ("appointments change !!!");
            let poped = newValue.pop() ;
      
            while ( poped != null )
            {  
            
             let appointment_taken = {
                 id :  poped.id ,
                 calendar_id : poped.calendar_id,
                 date : poped.date ,
                 start_time :  poped.start_time , 
                 duration : poped.duration ,
                 patient_doc_id : poped.patient_doc_id ,
                 patient_name : poped.patient_name ,
                 patient_email : poped.patient_email ,
                 patient_phone1 : poped.patient_phone1 ,
                 patient_phone2 : poped.patient_phone2 ,
                 app_status : poped.app_status , 

                 patient_notification_email_reserved : poped.patient_notification_email_reserved ,
                 patient_address : poped.patient_address , 
                 patient_age  : poped.patient_age ,  
                 specialty : poped.specialty1 , 
            
                  home_visit : poped.home_visit ,
                  center_visit :poped.center_visit ,
                  remote_care : poped.remote_care ,
            
                  center_id :poped.center_id ,
                  color : poped.color ,
                  app_available : poped.app_available , 
                  symbol1 : "" ,
                  message1 : poped.message1 
                }
            
            
            this.hours.push( appointment_taken )    
            console.log( "StartTime POP="+JSON.stringify(poped.start_time ) ) 
            poped = newValue.pop() ;
            } 
            //this.hours.sort();
            //paint based in Calendar Color. 

             this.hours.sort(function(a, b){
            let x = a.start_time;
            let y = b.start_time
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
            });

            console.log("HOURS="+JSON.stringify(this.hours) ) 
            

        }
    },

	methods :{

        calculateLineExtension(hour){

             let hour_number = parseInt(hour.start_time.substring(0,4) ) ;
                
                if (hour_number % 4 ==  0 )
                { return 10 }
                else {
                return 0
                    }
// Expected output: The fourth item is free!!

            /*
            let hour_number = parseInt(hour.start_time.substring(0,3) ) ;
            if ( hour_number <= 12)
                { return  (hour_number + 2 ) ; }
            else 
                {
                return  (24 - hour_number  +1  )
                }       
          */
     
         },

        duplicateDay(date){
            console.log("duplicate day in list appointments "+date) ; 
            console.log("Session Params "+JSON.stringify(this.session_params) ) ;
            this.openModalDuplicateDay= Math.random(); 


        },
        switchView(){
            this.$emit('switchView');
         },


        showReserveModal(hour)
        {
            console.log ("show Reserve Modal in ListAppointment ")
            this.hourToReserve = hour;
            this.openModalReserveAppEvent = Math.random(); 
        },
        
       displayModalReservedDetails(hour)
       {
            console.log ("Display Modal Reserved APP!")
            this.hourTaken=hour ;
            this.openModalShowAppTakenEvent = Math.random();
       },


        displayModalViewAppDetails(hour)
        {
            console.log("Display Modal View App Details :"+JSON.stringify(hour));
            this.hourDetails = hour; 
            this.openModalShowDetailsEvent = Math.random();
        },

        displayModalCreateApp(ahour)
        {
            this.hourCreate = ahour ;
            console.log("Display Modal Create App:"+this.hourCreate.start_time+" Day:"+this.daterequired );
            this.openModalCreateAppEvent = Math.random();
        },
        updateAppList()
        {
            console.log("Update App List in List Appointments");
            this.$emit('updateAppointmentList');
        },

        sameCenter(center){
        console.log ("Compare cen Name  center:"+center+" prevCenterName:"+this.prevCenterName+" resultComparison "+center.localeCompare(this.prevCenterName)   );
           if (center.localeCompare(this.prevCenterName) === 0 )
            {   
                return true ;
            }
            else{
                this.prevCenterName=center;
                return false;
            //  this.prevCenterName=center;
            }
        },  

        specialtyId2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },

 

    }
}
</script>

