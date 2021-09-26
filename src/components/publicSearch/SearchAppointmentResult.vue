<script setup>
import { ref } from 'vue'
import patientAppointmentAvailable  from './PatientAppointmentAvailable.vue'
import modalReserveAppointment from './ModalReserveAppointment.vue'

defineProps({
  msg: String,
  session_params : Array  ,
  appointments  : Array , 
  daterequired : String,
})

const count = ref(0)
</script>

<template>
        <div class="" v-if="appointment_list != null && daterequired != null" >
            <small class="mb-2 pl-3" > {{ notificationMessage }} </small> 
         
            <div class="mt-0"  v-for="appointment in appointment_list" :key="appointment.id" >
               <patientAppointmentAvailable v-if="appointment != null"  v-on:click="setModalReserve(appointment); modalOpen = true" :appointment='appointment'  > </patientAppointmentAvailable>            
            </div>
         
                <!-- Start make room for Modal data when it display-->
                <div style="height: 400px">
                </div>
        
        </div>	
    
        <!-- END SET POSITION MODAL-->
        <!-- Modal Reserve and Confirm  as Component with a teleport to Main Page -->
       
        <modalReserveAppointment   :app="app" v-if="modalOpen" :modalOpen="modalOpen" v-on:updateSearchResult="updateSearchResult"  > </modalReserveAppointment>
        <!-- Modal Reserve and Confirm End -->
          
</template>

<style scoped>

</style>


<script>


export default {
  data() {
    return {
            app : null ,
            showModal : false , 
            showModalConfirmation : false ,
            appConfirmed : null, 
            appointment_list : null,
            notificationMessage: null, 
            modalOpen : ref(false), 
    }
  },

   emits: ["updateLastSearch"],

   mounted () {    
        },

    watch: {
            appointments(newAppointments, oldAppointments ) {
                this.appointment_list =  newAppointments ;   
                this.notificationMessage="Econtramos "+this.appointments.length+" resultados, desde dia "+this.daterequired +" ";	
                      
            },
        },

    methods: {
            setModalReserve(appointment)
            {
                console.log("Set Modal Reserve method in SearchApp Resutl"+JSON.stringify(appointment));
                this.app=appointment;
                this.modalOpen = true; 
              
            },
            /*
            showConfirmationModal(appconfirm)
            {
                console.log ("showConfirmationModal method. Display Confirmation Modal: "+ JSON.stringify(appconfirm)) ;
                this.appConfirmed=appconfirm;
            },
            */
            updateSearchResult()
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