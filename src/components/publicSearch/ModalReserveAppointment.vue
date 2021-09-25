<script setup>
import { ref } from 'vue'

defineProps({
  app : Object
})

//const count = ref(0)
</script>

<template>
       
    <teleport to="body" disabled="true">
    <transition name="modal">
    <div class="modal-mask " v-if="app != null && showModalAux" tabindex="-1" >
    <div class="modal-wrapper">
    <div class="modal-container mt-5">
                <div class="modal-header display-5" >
                     {{app.specialty_name }} 
                    <button type="button" class="btn-close"  @click="showModalAux = false" aria-label="Close"></button>
                </div>

                <div class="modal-body" > 
                  
                <div class="h3 mb-3">
                    Dia <text class="display-4"> {{app.date.substring(0, 10) }} </text> <br>
                    Hora <text class="display-4">  {{app.start_time.substring(0, 5) }}  Hrs </text>
                </div>
                
                <div class="h4 mb-3">
                <i class="fas fa-user-md "></i> Con:  {{app.name }} <br>
                </div>               
                
                <div class="h4 mb-3">  
				<i class="fas fa-map-marker-alt"></i>
                {{app.center_name }} <br/> 
                Direccion: {{app.center_address }}
                </div>
                <hr>
                           
                <div class="h2 text-dark"> Ingrese Datos del Paciente
                </div>							
                            <form autocomplete="off" method="POST" action="take_appointment.html">			
                                <input class="form-control form-control-lg" type="hidden" placeholder="Token" name="token" value="AAAAA"  >
                                <br>	
                                <input class="form-control form-control-lg" type="text" placeholder="Nombre"  id="form_patient_name"   name="form_patient_name" v-model="form_patient_name">
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
                                <button type="button" @click="sendReserveAppointment(app.app_id)" class="btn btn-primary" data-bs-dismiss="modal"   >Tomar esta Hora</button>
                            </form> 
                    </div>
        </div> 
        </div> 
        </div> 
        </transition>
	</teleport>
	
</template>


<style scoped>
</style>


<script>
//const showForm = ref(false)


export default {
  data() {
    return {

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

        }
  },

computed: {
		showModalAux2() {
		  return   this.showModal ;

		}
	  },

	  watch: {
		app(newApp, oldApp) {
			console.log("New APP Change !!!");
			this.showModalAux = true ; 
	  },
	},

	methods: {

		async sendReserveAppointment(appid)
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
/*
			if (this.form_patient_insurance_code === null || this.form_patient_insurance_code === "" )
			{   this.error_msg_insurance_code=true;
				return null ; 
			}
            
			else { this.error_msg_insurance_code=false;}
*/
					var r =confirm("Desea continuar con la Reservar esta cita?");
					  if (r == true) {
						const json = { 
						appointment_id : appid,
						patient_age : this.form_patient_age,
						patient_name : this.form_patient_name,
						patient_doc_id	: this.form_patient_doc_id,
						patient_email	: this.form_patient_email,
						patient_phone	:	this.form_patient_phone,
						patient_insurance:	this.form_patient_insurance_code,
								};
						console.log ("sendReserveAppointment  REQUEST :"+ JSON.stringify(json)  );
						let response_json = await axios.post(this.dbhost+"/save_appointment",json );
					//  console.log ("RESPONSE save_appointmentJSON.stringify(response_json) :"+JSON.stringify(response_json)) ;
						console.log ("RESPONSE save_appointment data raw :"+JSON.stringify(response_json.data)) ;
						console.log ("RESPONSE save_appointment patient name :"+response_json.data.patient_name ) ;
						this.appointment_confirm = response_json.data ;
						//console.log ("We should display a Confirmation Modal now"+JSON.stringify(appointment_confirm) );

					this.showModalAux=false;
					console.log ("Go to emit !!");
					this.$emit('showConfirmationModal', response_json.data );
					//this.showModalConfirmation=true;
						}
		},

		selectedInsuranceCode(code)
            {
            console.log("Insurance Code:"+code);
            this.form_patient_insurance_code = code;
            },




    },


}
</script>