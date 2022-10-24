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
            <div v-for="app in array_appointments" :key="app.id" >
            
            <p>    {{format_date(app.date)}} </p>
            
            
            </div>

<!--
            <div  v-for="appointment in appointments.appointments_list.appointments" :key="appointment.id" class="mt-0 " >               
                    <patientAppointmentAvailable :center_data="getCenterData(appointment.center_id)"  :searchParameters="searchParameters" class=" m-2 "  v-if="appointment != null"  v-on:click="setModalReserve(appointment)" :appointment='appointment'  :global_comunas="global_comunas" :global_specialties="global_specialties"  > </patientAppointmentAvailable>            
            </div>
-->
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

    beforeCreate(){
       console.log("showloader progress BEFORE CREATE !!!");
    },
    
    created(){
       console.log("Search Appointment Result CREATED CREATED ++++++ SEARCH APPOINTMENTS RESULT :"+JSON.stringify(this.appointment_list) )
    },

    activated(){
    console.log("showloader progress ACTIVATED !!!");
    },
    
    mounted () {    
       console.log("showloader progress MOUNTED !!!");
         console.log("showloader progress SEARCH APPOINTMENTS RESULT :"+JSON.stringify(this.appointment_list) )  
        },

        beforeUpdate(){
        this.showLoaderProgress = true  ;
        console.log("showloader progress BEFORE UPDATE !!!");
        },

        updated()
        {
        this.showLoaderProgress = false  ;
        console.log("showloader progress UPDATE !!!");
        },

    watch: {
        
            appointments_filtered(newAppointments, oldAppointments ) {
               // this.appointment_list_result =  newAppointments ; 
                this.array_appointments = newAppointments.appointments_list
                console.log("+++++++++++++++++++ SEARCH APPOINTMENTS RESULT :"+JSON.stringify(this.array_appointments) )  
             //   this.notificationMessage="Econtramos "+this.appointments.length+" resultados, desde dia "+this.daterequired +" ";	                 
            },
            
        },

    methods: {
            format_date(date)
            {
                let aux_date = new Date(date)
                return (aux_date.getDate()+"-"+(aux_date.getMonth()+1)+"-"+aux_date.getFullYear() )
            },

            getCenterData(center_id)
            {
                console.log("Get Center Data from ID:"+center_id);
                let temp= this.centers.find(elem => elem.id ==  center_id  )
                if (temp != null) { return temp }
                else { return "No Existe Centro" }  
            },
          
            setModalReserve(appointment)
            {
                console.log("Set Modal Reserve method in SearchApp Resutl"+JSON.stringify(appointment));
                this.app = appointment;
                this.center_data = this.getCenterData(appointment.center_id);
                //this.professional_data = this.getProfessionalData(appointment.professional_id)
                //this.modalOpen = true; 
                this.openModalEvent = Math.random();
            },
            /*
            showConfirmationModal(appconfirm)
            {
                console.log ("showConfirmationModal method. Display Confirmation Modal: "+ JSON.stringify(appconfirm)) ;
                this.appConfirmed=appconfirm;
            },
            */
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
    

        },

}
</script>