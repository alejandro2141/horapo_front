<script setup>
import { ref } from 'vue'
import patientAppointmentAvailable  from './PatientAppointmentAvailable.vue'
import modalPublicViewAppointment from './ModalPublicViewAppointment.vue'
import ModalPublicReserveAppForm from './modalPublicReserveAppForm.vue';
import LoadProgress from './loadProgressPatient.vue'


</script>

<template>

<div style="width: 20em;"  >

    <loadProgress  :active_spinner="active_spinner" > </loadProgress>
 
      

       <div  v-if="n_appointments_found>0 && array_appointments !=null && array_appointments.length > 0"   >
            <!--
                  {{filter_center }} - {{filter_home}} - {{filter_remote}} 
                 <small class="mb-2 pl-3 bg-light" >Encontramos {{appointments.length}} resultados para su busqueda </small>  
            -->
           
            <div v-for="day in array_appointments" :key="day.id" >
               
                    
                    <div v-if="day.appointments != null && day.appointments.length >0" >
                

                <!--    <hr class="style-eight" :style="{'color' : '#FF0000' , ':after.content':'asdf' }" >  -->
                <!--
                <hr  style="overflow: visible; padding: 0; border: none;  border-top: medium double #333;  color: #333;  text-align: center;  :after : {content : aaaa} " > 
                -->
                <br>
                <h5 class="hr-lines m-0 p-0" style="font-size: 2,5em;" >{{format_date(day.date)}} </h5>
               


                <!-- <hr style="  overflow: visible; padding: 0;  border: none; border-top: medium double #333;  color: #333; text-align: center; "  >
                -->
                           <!-- <p class=" mt-4"> <text class="h5"> {{format_date(day.date)}}  </text> </p> -->
                            
                            <div v-if="day.appointments != null && day.appointments.length >0 ">
                                
                                <!-- Cicle for apps -->
                                <div  v-for="app in day.appointments" :key="app.id" class="mt-0 " > 
                                        <patientAppointmentAvailable  :professional_data="getProfessionalData(day.professionals, app.professional_id)"   :center_data="getCenterData(day.centers,app.center_id)"  :calendar_data="getCalendarData(day.calendars,app.calendar_id)"  :searchParameters="searchParameters" class=" m-2 "  v-if="app != null"  v-on:click="setModalReserve(app,day.centers, day.calendars)" :appointment='app'  :global_comunas="global_comunas" :global_specialties="global_specialties"  > </patientAppointmentAvailable>            
                                </div>
                            
                            </div>

                            <div v-else class="m-0 p-0">
                                <p class="text-center" > <i style="font-size: 10vw;" class="m-0 p-0 bi bi-wind"></i>Sin Horas Disponibles </p>
                            </div>
                    </div>

            </div>

                <!-- Start make room for Modal data when it display-->
            <div v-if="response_truncated" class="text-center">
                <hr>
                <i class="bi bi-sign-stop display-3"></i> Demasiados resultados <br>
                hasta <b> {{format_date(response_truncated_date)}}. </b> <br>
                Prueba ajustar tu busqueda indicando Tipo de Consulta, Comuna y fecha 
                
            </div>

        </div>
        <div v-else  class="w-100 text-center" >
            <i style="font-size: 7em;" class=" m-0 p-0 bi bi-wind"></i><br>
            Sin Horas disponible
        </div>	
             <div style="height: 400px">
            </div>
        <!-- END SET POSITION MODAL-->
        <!-- Modal Reserve and Confirm  as Component with a teleport to Main Page -->
       <!-- <modalPublicViewAppointment :searchParameters="searchParameters" :app="app"          :center_data="center_data"    :openModalEvent="openModalEvent"               v-on:updateLastSearch="updateLastSearch"   :global_comunas='global_comunas' :global_specialties="global_specialties"  > </modalPublicViewAppointment>
      -->
        <ModalPublicReserveAppForm  :searchParameters='searchParameters' :appToReserve='app' :center_data="center_data" :calendar_data="calendar_data"   :eventShowModalPubicReserve='openModalEvent'   v-on:updateLastSearch='updateLastSearch'   :global_comunas="global_comunas" :global_specialties='global_specialties'       ></ModalPublicReserveAppForm>

        <!-- Modal Reserve and Confirm End -->
</div>     

</template>

<style scoped>

.hr-lines{
  position: relative;
  max-width: 500px;
  margin: 100px auto;
  text-align: center;
}

.hr-lines:before{
  content:" ";
  height: 2px;
  width: 2em;
  background: rgb(45, 120, 170);
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
}

.hr-lines:after{
  content:" ";
  height: 2px;
  width: 2em;
  background: rgb(36, 145, 160);
  display: block;
  position: absolute;
  top: 50%;
  right: 0;
}

</style>


<script>


export default {
 data : function() {
    return {
            app : null , 
            showModal : false , 
            showModalConfirmation : false , 
            appConfirmed : null, 
            array_appointments : null, 
          //  notificationMessage: null, 
            modalOpen : ref(false), 
            openModalEvent : null , 
            showLoaderProgress : false , 
            active_spinner : false ,

            center_data : null ,
            calendar_data : null ,
          
    }
  },

   props: [  'response_truncated_date', 'response_truncated' , 'response_truncated_at' , 'n_appointments_found' ,'centers','searchParameters','session_params','appointments_filtered','daterequired','global_comunas', 'global_specialties', 'filter_center' , 'filter_home' , 'filter_remote' ],
   emits: ["updateLastSearch"],

    
    created(){
             },
    
    mounted () {    
        console.log("SearchAppointmentResult Mounted :"+JSON.stringify(this.appointments_filtered) ) 
        this.array_appointments = this.appointments_filtered.appointments_list
        },

        beforeUpdate(){
        //  this.showLoaderProgress = true  ;
        //  console.log("showloader progress BEFORE UPDATE !!!");
        },

        updated()
        {
        // this.showLoaderProgress = false  ;
        // console.log("SearchAPpointmentResult Updated");
        },

    watch: {
        
            appointments_filtered(newAppointments, oldAppointments ) {
               // this.appointment_list_result =  newAppointments ; 
                this.array_appointments = newAppointments.appointments_list
                console.log("Watch SearchAppointmentResult :"+JSON.stringify(this.array_appointments) )  
             //   this.notificationMessage="Econtramos "+this.appointments.length+" resultados, desde dia "+this.daterequired +" ";	                 
            },
            
        },

    methods: {
            dateFormater(tdate)
            {
                let aux_date = new Date(tdate) 
                return (aux_date.getDay() +" "+( aux_date.getMonth()+1)+" "+aux_date.getFullYear()  )
            },

            getClassObject()
            {
                let classObject = {
                overflow: 'visible' , /* For IE */
                padding: '0' ,
                border: 'none',
                'border-top' : 'medium double #333' ,
                color: '#333',
                'text-align' : 'center',
            /*
                after = {   content: "§", 
                            display : 'inline-block',
                            position: 'relative',
                            top: '-0.7em',
                            'font-size': '1.5em',
                            padding: '0 0.25em',
                            background: 'white',
                        }
                        */
                }
                return  classObject
            },            

            format_date(date)
            {
                let aux_date = new Date(date)
                let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ]
                let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]


                return (days[aux_date.getDay()]+" "+aux_date.getDate()+" "+months[aux_date.getMonth()] )
            },

            getCenterData(centers,center_id)
            {
                let aux_centers = Array.from(centers)
                return aux_centers.find(elem => elem.id ==  center_id)  
            },

            getCalendarData(calendars,calendar_id)
            {
                let aux_calendars = Array.from(calendars)
                return aux_calendars.find(elem => elem.id ==  calendar_id)  
            },

            getProfessionalData(professionals,professional_id)
            {
                let aux_professional = Array.from(professionals)
                return aux_professional.find(elem => elem.id ==  professional_id)  
            },
          
          
            setModalReserve(appointment,centers,calendars )
            {
                console.log("Set Modal Reserve method in SearchApp Resutl"+JSON.stringify(appointment));
                this.app = appointment;
                this.center_data = this.getCenterData(centers,appointment.center_id)  //this.getCenterData(appointment.center_id);
                this.calendar_data = this.getCalendarData(calendars,appointment.calendar_id)
                //this.professional_data = this.getProfessionalData(appointment.professional_id)
                //this.modalOpen = true; 
                this.openModalEvent = Math.random();
            },
            
            updateLastSearch()
            {
                console.log ("emit updateLastSearch: SearchAPpoitnmentResult. ");
                //this.appointment_list=null ;
                this.$emit('updateLastSearch');
            },

            selectedInsuranceCode(code)
            {
            console.log("Insurance Code:"+code);
            this.form_patient_insurance_code = code;
            },
    

        },

}
</script>