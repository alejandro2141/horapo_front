<script setup>
import { ref } from 'vue';
import axios from 'axios';

</script>

<template>

	<teleport to="body"   >
		<div  v-if="showModalReserveAppointment" class="modal bg-secondary"    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-1 modal-background">
 

                <div class="modal-body mt-0" > 
                    <div class="d-flex flex-row bd-highlight mb-1 display-5">
                        <div class="p-1 bd-highlight">{{ hourToReserve.specialty_name}} <br/>
                        </div>
                        
                            <div class="p-1 bd-highlight"></div>
                            <div class="p-1 bd-highlight"><i class="display-1 bi bi-x "  v-on:click="showModalReserveAppointment = false" aria-label="Close"></i>
                        </div>
                    </div>
                        <text class="h3">Fecha {{daterequired}}</text>
                        <text class="h3">Hora {{hourToReserve.start_time.substring(0, 5) }}  Hrs </text>
                        <text class=""> Con:  {{hourToReserve.name }} </text> 
                        <text class="">Nombre del centro: {{hourToReserve.center_name }}  </text>
                        <text class="">Direccion: {{hourToReserve.center_address }} </text>
                                
                        <div class="mt-2"> 
                          Datos del Paciente
                        							
                            <form autocomplete="off" method="POST" action="take_appointment.html">			
                                <input class="mt-1 form-control form-control-lg" type="hidden" placeholder="Token" name="token" value="AAAAA"  >
                                <input class="mt-1 form-control form-control-lg" type="text" placeholder="Nombre"  id="form_patient_name"   name="form_patient_name" v-model="form_patient_name">
                                <input class="mt-1  form-control form-control-lg" type="text" placeholder="Rut" name="form_patient_doc_id" id="form_patient_doc_id" v-model="form_patient_doc_id"  >
                                <input  type="number" class="mt-1 form-control form-control-lg"  placeholder="Edad" name="form_patient_age" id="form_patient_age"  v-model="form_patient_age" >
                                <input class="mt-1 form-control form-control-lg" type="email" placeholder="email@somedomain.com" name="form_patient_email" id="form_patient_email" v-model="form_patient_email">
                                <input class="mt-1  form-control form-control-lg" type="text" placeholder="Telefono Ej 56975397201" name="form_patient_phone" id="form_patient_phone" v-model="form_patient_phone" >
                                <button type="button" @click="sendReserveAppointment(hourToReserve); modalOpen = false" class="btn btn-primary" data-bs-dismiss="modal"   >Tomar esta Hora</button>
                            </form> 

                        </div>  



                </div>

        </div> 
        </div> 		
		</div> 
        </transition>
    	</div>
	</teleport> 
  
</template>

<style scoped>


.modal {
  position: absolute;
  display: flex;
}

.modal div {
  display: flex;
  flex-direction: column;
}
/*
.modal-background {
    background-color:#DAEFF3
        }
*/
/************************* */



.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
 /*width: 100px;*/
  margin: 2px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/************************ */
</style>


<script>

export default {
   data : function() {
        return {
            showModalReserveAppointment: false ,
 
          form_patient_name : null ,
    		  form_patient_doc_id : null ,
		      form_patient_email : null ,
		      form_patient_phone : null ,
		      form_patient_insurance_code : null ,
		      form_patient_age : null, 

          error_msg_name : false,
          error_msg_age : false,
          error_msg_doc_id: false,
          error_msg_email : false, 
          error_msg_phone : false,
          error_msg_insurance_code : false,

          }   
    },
   	
   props: ['daterequired','hourToReserve', 'session_params' ],
   emits: ['updateAppList','reserveUpdateAppList'] , 
      
   	mounted () {
           },

	methods :{
     
    async  sendReserveAppointment(hour)
    {
      console.log("Send Reserve Appointment");
      	var r =confirm("Desea continuar con la Reservar esta cita?");
					  if (r == true) {
						const json = { 
						appointment_id : hour.app_id,
						patient_age : this.form_patient_age,
						patient_name : this.form_patient_name,
						patient_doc_id	: this.form_patient_doc_id,
						patient_email	: this.form_patient_email,
						patient_phone	:	this.form_patient_phone,
						//patient_insurance:	this.form_patient_insurance_code,
						patient_insurance:	9999 ,
						form_public : hour.available_public_search ,
						app_available : false 

								};
						console.log ("sendReserveAppointment  REQUEST :"+ JSON.stringify(json)  );
						let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/public_take_appointment",json );
					//  console.log ("RESPONSE save_appointmentJSON.stringify(response_json) :"+JSON.stringify(response_json)) ;
						console.log ("RESPONSE save_appointment data raw :"+JSON.stringify(response_json.data)) ;
						console.log ("RESPONSE save_appointment patient name :"+response_json.data.patient_name ) ;
						this.appointment_confirm = response_json.data ;
						//console.log ("We should display a Confirmation Modal now"+JSON.stringify(appointment_confirm) );

					console.log ("Go Confirm Modal !!");
					//this.$emit('showConfirmationModal', response_json.data );
					this.showModalReserveAppointment = false ; 
          this.appConfirmed = response_json.data ;
					//this.modalConfirmationOpen = true ;updateAppList
					this.$emit('updateAppList');
						}
    },

    },
    watch : {
        hourToReserve(newValue){
             this.showModalReserveAppointment= true ;
            console.log ("hourToReserve!!!"+newValue+ " hourToReserve ="+ this.showModalReserveAppointment );
        }
    }

    
}
</script>

