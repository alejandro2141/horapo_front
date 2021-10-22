<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ModalPublicReserveAppForm from './modalPublicReserveAppForm.vue';


defineProps({
  app : Object,
  openModalEvent : null,
  modalOpen : Boolean
})

//const count = ref(0)
</script>

<template>

<ModalPublicReserveAppForm v-on:updateSearchResult='updateSearchResult' :appToReserve='appToReserve'  :eventShowModalPubicReserve='eventShowModalPubicReserve'></ModalPublicReserveAppForm>

	<teleport to="body"   >

		<div v-if="showModalPublicAppDetails" class="modal bg-secondary"    >
		    
			<transition name="modal">
			<div class="modal-mask " v-if="app != null && showModalAux"  >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-0 modal-background">
              
                <div class="modal-body " > 
 					<div class="d-flex flex-row justify-content-end  m-1">
                      <div class="display-4 " style="margin-right: 1em;" >  {{ app.specialty_name}}  </div>
                      <div class="" style="margin-right: 1em;" > </div>
                      <div class=""><i class="display-1 bi bi-x-lg ml-0"  v-on:click="showModalPublicAppDetails = false" aria-label="Close"></i> </div>
                    </div>

                <div class="mb-2 h2">
                   <text class="">  <i class="bi bi-calendar"></i> Dia  {{app.date.substring(0, 10) }} </text> 
                    <text class=""> <i class="bi bi-smartwatch"></i> Hora {{app.start_time.substring(0, 5) }}  Hrs </text>
                </div>
                
                <div class="mb-2 h2">
					<text class="">  
               			<i class="bi bi-person-badge"></i>  Con:  {{app.name }} 
			   		</text>
                </div>               
                
                <div class="mb-1">  
				<i class="bi bi-pin"></i> En {{app.center_name }}.  
                Direccion: {{app.center_address }}
                </div>
                <hr>

<div >
	<text>Mapa:</text>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.80973223681!2d-70.66387378523802!3d-33.40212780241913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c678e0d23d79%3A0x944abd548ad95b98!2sTrist%C3%A1n%20Cornejo%20957%2C%20Independencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1634857648760!5m2!1ses-419!2scl" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
</div>
	 <button type="button" @click="reserveHour(app);"  class="btn btn-primary m-2"> <i class="bi bi-person-square"></i> Reservar esta Hora </button>
                    		

                    </div>
        </div> 
        </div> 		
		</div> 
        </transition>
    	</div>
	</teleport>
<!--
	<teleport to="body"   >
			<div v-if="modalConfirmationOpen" class="modal bg-secondary" >
				
				<transition name="modal">
					<div class="modal-mask"   >
					<div class="modal-wrapper ">
					<div class="modal-container m-2 p-2  bg-light ">
								
							<div class="modal-header" >
								<h5 class="text-success" id="">RESERVA CONFIRMADA </h5>
								<button type="button" class="btn-close"  @click="modalConfirmationOpen = false" aria-label="Close"></button>
							</div>
				
						<div class="modal-body h5" > 
							<p> {{app.specialty_name }} 
								{{appConfirmed.date.substring(0, 10) }} 
								{{appConfirmed.start_time.substring(0, 5) }}
								<br>
								Profesional: {{app.name }}
							</p>
							<p>
							Dirección:<br> 
							<text class="">
							{{app.center_name }} <br> 
							Direccion: {{app.center_address }}<br> </text> 
							</p>

								<p>
								Informacion de su cita ha sido enviada a su correo <b> {{appConfirmed.patient_email}} </b> 
								</p>
								<p>
								IMPORTANTE: <br>
								48 Hrs antes de su cita, debe confirmar su asistencia en el enlace que fue enviado a su correo. 
								</p>
							

						</div>


						
						<div class="modal-footer d-flex justify-content-center " > 
							<button type="button" class="btn btn-success h1"  @click="modalConfirmationOpen = false ; $emit('updateSearchResult')" > <i class=" h1 fas fa-check-square"></i> Continuar </button>
						</div>
					
					</div> 
					</div> 
					</div> 
					</transition>

			</div> 
	</teleport>
-->
	

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
//const showForm = ref(false)


export default {
 data : function() {
    return {
 		//modalOpen : ref(false),
		modalConfirmationOpen : ref(false) ,
		appConfirmed : ref(Object) ,

          showModalAux : true,
		  appointment_confirm : null,

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

		  showModalPublicAppDetails : false ,
		  appToReserve : Object ,
		  eventShowModalPubicReserve : null,
        }
  },
 emits: ["updateSearchResult"],

computed: {
		showModalAux2() {
		  return   this.showModal ;
		}
	  },

	  watch: {
		openModalEvent(newApp, oldApp) {
			console.log("openModalEvent !!!");
			this.showModalPublicAppDetails = true ; 
	  },
	},

	methods: {
		reserveHour(hour)
		{
			console.log("Public Reserve Hour ... display Modal");
			
			this.showModalPublicAppDetails = false ;
			this.appToReserve = hour ;
			this.eventShowModalPubicReserve = Math.random() ;
		},

		updateSearchResult()
            {
                console.log (" update search Result. ");
                //this.appointment_list=null ;
                this.$emit('updateSearchResult');
            },
/*
		async sendReserveAppointment(app)
		{
			console.log("Send Reserve Appointment Post. ");
			if (this.form_patient_name === null || this.form_patient_name === "" )
			{   this.error_msg_name=true;
				return null ; 
			} 
			else 
			{ this.error_msg_name=false;}

			if (this.form_patient_doc_id === null || this.form_patient_doc_id === "" )
			{   this.error_msg_doc_id=true;
				return null ; 
			}
			else { this.error_msg_doc_id=false;}
			
			if (this.form_patient_age === null || this.form_patient_age === "" )
			{   this.error_msg_age=true;
				return null ; 
			} 
			else { this.error_msg_age=false;}

			if (this.form_patient_email === null || this.form_patient_email === "" )
			{   this.error_msg_email=true;
				return null ; 
			}
			else { this.error_msg_email=false;}

			if (this.form_patient_phone === null || this.form_patient_phone === "" )
			{   this.error_msg_phone=true;
				return null ; 
			}
			else { this.error_msg_phone=false;}

					var r =confirm("Desea continuar con la Reservar esta cita?");
					  if (r == true) {
						const json = { 
						appointment_id : app.app_id,
						patient_age : this.form_patient_age,
						patient_name : this.form_patient_name,
						patient_doc_id	: this.form_patient_doc_id,
						patient_email	: this.form_patient_email,
						patient_phone	:	this.form_patient_phone,
						//patient_insurance:	this.form_patient_insurance_code,
						patient_insurance:	9999 ,
						form_public : app.available_public_search ,
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
					this.appConfirmed = response_json.data ;
					this.modalConfirmationOpen = true ;
					//this.showModalConfirmation=true;
						}
		},
*/
		selectedInsuranceCode(code)
            {
            console.log("Insurance Code:"+code);
            this.form_patient_insurance_code = code;
            },




    },


}
</script>