<script setup>
import { ref } from 'vue'

defineProps({
  app : Object
})

//const count = ref(0)
</script>

<template>
     
 <button @click="modalOpen = true">
        Open full screen modal! (With teleport!)
    </button>

	<div id="aqui" class="bg-success p-3 m-3"></div>

    <teleport to="#qui">
      <div v-if="modalOpen" >
        <div>
          I'm a teleported modal! 
          (My parent is "body")
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    </teleport>

</template>


<style scoped>
</style>


<script>
//const showForm = ref(false)


export default {
  data() {
    return {
 modalOpen: ref(false),
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