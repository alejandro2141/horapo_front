<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ModalPublicReserveConfirmation from './modalPublicReserveConfirmation.vue';



//const count = ref(0)
</script>

<template>
<ModalPublicReserveConfirmation v-on:updateSearchResult='updateSearchResult'  :appConfirmed='appConfirmed' :eventShowModalConfirmation='eventShowModalConfirmation' :app='app'  ></ModalPublicReserveConfirmation>
  <div>
  	<teleport to="body"   >

		<div v-if="showModalPublicReserveForm" class="modal  bg-secondary scroll"    >
		    
			<transition name="modal">
			<div class="modal-mask "  >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-0 modal-background ">
              
                <div class="modal-body w-100" > 
                  
                  <div class="d-flex  justify-content-end  m-1">
				
                      <div class="display-4 " style="margin-right: 1em; color:#1f9d94 " >  {{ appToReserve.specialty_name}}  </div>
                      <div class="" style="margin-right: 1em;" > </div>
                      <div class=""><i class="display-1 bi bi-x-lg ml-0"  v-on:click="showModalPublicReserveForm = false" aria-label="Close"></i> </div>
                  </div>


                <div class="text-dark"> Datos del Paciente
                </div>							
                            <form autocomplete="off" method="POST" action="take_appointment.html">			
                                <input class="form-control form-control-lg " type="hidden" placeholder="Token" name="token" value="AAAAA"  >
                                <br>	
                                <input class="form-control form-control-lg " type="text" placeholder="Nombre"  id="form_patient_name"   name="form_patient_name" v-model="form_patient_name">
                                <div v-if="error_msg_name" class="text-danger">Debe Indicar Nombre del paciente</div>
                                <br>
                                <input class="form-control form-control-lg" type="text" placeholder="Rut" name="form_patient_doc_id" id="form_patient_doc_id" v-model="form_patient_doc_id"  >
                                <div v-if="error_msg_doc_id" class="text-danger">Debe Indicar RUT o Pasaporte del paciente</div>
                                <br/>
                                <input  type="number" class="form-control form-control-lg"  placeholder="Edad" name="form_patient_age" id="form_patient_age"  v-model="form_patient_age" >
                                <div v-if="error_msg_age" class="text-danger">Debe Indicar Edad del paciente</div>
                                <br/>
                                <input class="form-control form-control-lg" type="email" placeholder="email@somedomain.com" name="form_patient_email" id="form_patient_email" v-model="form_patient_email">
                                <div v-if="error_msg_email" class="text-danger">Debe Indicar un correo valido</div>
                                <br>
                                <input class="form-control form-control-lg" type="text" placeholder="Telefono Ej 56975397201" name="form_patient_phone" id="form_patient_phone" v-model="form_patient_phone" >
                                <div v-if="error_msg_phone" class="text-danger">Debe Indicar un Telefono de contacto</div>
                                <br>
															
                                <input class="" type="text" id="nothing" style="font-size:1px; border-width:0px; border:none;" >
                                <button type="button" @click="sendReserveAppointment(appToReserve); modalOpen = false" class="btn btn-primary" data-bs-dismiss="modal"   >Tomar esta Hora</button>
                            
								<div class="" style="height : 500px"> 
                				</div>
							
							</form> 
                </div>
        </div> 
        </div> 		
		  </div> 
        </transition>
    	</div>
	  </teleport>
  </div>


</template>

<style scoped>

.modal {
	position: fixed; 
   display: flex; 

}

div.scroll {
       			margin:4px, 4px;
                padding:4px;
                width: 100%; 
                /* height: 190%;*/
                overflow-x: auto;
                overflow-y: auto;
                text-align:justify;
      }

.modal-mask {
  /*position: fixed;*/
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
 /* display: table;*/
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
 /*width: 100px;*/
  /*margin: 1px auto;*/
  /*padding: 20px 30px;*/
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
  margin: 0px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

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
        showModalPublicReserveForm : false ,

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

		  app : Object ,
		  appConfirmed : Object,
		  eventShowModalConfirmation : null ,

        }
  },

 props: ['appToReserve','eventShowModalPubicReserve' ],
 emits: ['updateAppList','updateSearchResult'] , 
      

computed: {
	},

	  watch: {
        eventShowModalPubicReserve(newApp, oldApp) {
              console.log("appToReserve change !!!");
              this.showModalPublicReserveForm = true ; 
            },
      	},

	methods: {
		updateSearchResult()
            {
                console.log (" update search Result. in Public Reserve Form ");
                //this.appointment_list=null ;
                this.$emit('updateSearchResult');
            },

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
					this.app = app ;
					this.showModalPublicReserveForm = false ; 
					this.eventShowModalConfirmation = Math.random(); 

					//this.modalConfirmationOpen = true ;
					//this.showModalConfirmation=true;
						}
		},



		 },


}
</script>