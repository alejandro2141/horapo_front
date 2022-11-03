<script setup>
import { ref } from 'vue'
import patientAppointmentAvailable  from './PatientAppointmentAvailable.vue'
import modalPublicViewAppointment from './ModalPublicViewAppointment.vue'
import LoadProgress from '../loadProgress.vue'

</script>

<template>

<div>

<loadProgress  :active_spinner="active_spinner" > </loadProgress>
 
       <div  v-if="array_appointments !=null && array_appointments.length > 0"   >
            <!--
                  {{filter_center }} - {{filter_home}} - {{filter_remote}} 
                 <small class="mb-2 pl-3 bg-light" >Encontramos {{appointments.length}} resultados para su busqueda </small>  
            -->
            <div v-for="day in array_appointments" :key="day.id" >
                    <p class=" mt-4"> <text class="h5"> {{format_date(day.date)}}  </text> </p>
                    
                    <div v-if="day.appointments != null && day.appointments.length >0 ">
                        <div  v-for="app in day.appointments" :key="app.id" class="mt-0 " > 
                                <patientAppointmentAvailable   :center_data="getCenterData(day.centers,app.center_id)"    :searchParameters="searchParameters" class=" m-2 "  v-if="app != null"  v-on:click="setModalReserve(app,day.centers)" :appointment='app'  :global_comunas="global_comunas" :global_specialties="global_specialties"  > </patientAppointmentAvailable>            
                        </div>
                    </div>

                    <div v-else class="m-0 p-0">
                      <p class="text-center" > <i style="font-size: 10vw;" class="m-0 p-0 bi bi-wind"></i>Sin Horas Disponibles </p>
                    </div>

            </div>

                <!-- Start make room for Modal data when it display-->
        </div>	
             <div style="height: 400px">
            </div>
        <!-- END SET POSITION MODAL-->
        <!-- Modal Reserve and Confirm  as Component with a teleport to Main Page -->
        <modalPublicViewAppointment  :searchParameters="searchParameters" :app="app" :center_data="center_data"    :openModalEvent="openModalEvent"   v-on:updateLastSearch="updateLastSearch"  :global_comunas='global_comunas' :global_specialties="global_specialties"  > </modalPublicViewAppointment>
        <!-- Modal Reserve and Confirm End -->
        </div>     

</template>

<style scoped>

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
          
    }
  },

   props: ['centers','searchParameters','session_params','appointments_filtered','daterequired','global_comunas', 'global_specialties', 'filter_center' , 'filter_home' , 'filter_remote' ],
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
            format_date(date)
            {
                let aux_date = new Date(date)
                let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ]
                let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]


                return (days[aux_date.getDay()]+" "+aux_date.getDate()+" de "+months[aux_date.getMonth()]+" "+aux_date.getFullYear() )
            },

            getCenterData(centers,center_id)
            {
                let aux_centers = Array.from(centers)
                return aux_centers.find(elem => elem.id ==  center_id)  
            },
          
            setModalReserve(appointment,centers)
            {
                console.log("Set Modal Reserve method in SearchApp Resutl"+JSON.stringify(appointment));
                this.app = appointment;
                this.center_data = this.getCenterData(centers,appointment.center_id)  //this.getCenterData(appointment.center_id);
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