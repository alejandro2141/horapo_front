<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ModalPublicReserveConfirmation from './modalPublicReserveConfirmation.vue';

import { BKND_CONFIG } from '../../../config123.js'

//const count = ref(0)
</script>

<template>
 <div>
<ModalPublicReserveConfirmation :professional_data='professional_data'  :center_data="center_data" :searchParameters='searchParameters' v-on:updateLastSearch='updateLastSearch'  :appConfirmed='appConfirmed' :eventShowModalConfirmation='eventShowModalConfirmation' :app='app' :global_specialties='global_specialties' ></ModalPublicReserveConfirmation>
 
  	<teleport to="body" >

		<div v-if="showModalPublicReserveForm"  class="modal scroll d-flex justify-content-center"    >
		    
			<transition name="modal" style="width: 25em;">
			<div class="modal-mask "  >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-0 modal-background bg-white"  style="border: 0px solid rgb(168, 168, 168); border-radius: 20px;" >
              
                <div class="modal-body w-100" > 
                
				 	<div class="d-flex flex-row justify-content-between ">
                      <div  style="color:#1f9d94 ; font-size:2.5em" >{{ showSpecialtyName(appToReserve.specialty) }}  </div>
                    
                      <div ><i class="text-primary bi bi-x-lg ml-0" style="font-size:3em"  v-on:click="showModalPublicReserveForm = false" aria-label="Close"></i> </div>
                    </div>

				<!-- SHOW DATE -->
				<div class="d-flex justify-content-start mb-3" >
					<text  style="font-size:2em"> <i class="text-muted m-2 bi bi-calendar" ></i> </text>
					<div class="">
						<text class="">	{{ transform_date(appToReserve.date) }} </text><br>
						<text class="" style="">	 
								{{transform_time(appToReserve.start_time)}} <text >hrs</text>  
						</text>       		
					</div>
				</div>
				<!-- SHOW PROFESSIONAL -->
				<div class="d-flex justify-content-start mb-3" >
					<text  style="font-size:3em" > <i class="text-muted bi bi-person  m-0 p-0"></i> </text>
					<p class="mt-2">
						<text class="">	Profesional: </text><br>
						<text v-if="professional_data!=null" class="" style="">	 
							{{professional_data.name }}   
						</text>       		
					</p>
				</div>


		<!-- SHOW APP TYPE , LOCATION  -->	

        <div class="m-2 " style="">

			<div v-if="center_data.center_visit" class="">
				<div style="font-size:2em">  
					<div style="color: #781ED1" >
					<i class="h1 bi bi-building "></i> En Consulta  </div>
				</div>
					
					<div>	
					"{{center_data.name}}"
					</div> 
					<div>
					Direccion:  {{center_data.address}}
					</div> 
					<div style="" class="" >
					{{comuna_id2name(center_data.comuna)}}
					</div>           
			</div>

			<div v-if="center_data.home_visit" style="color:#3399FF">
					<div style="font-size:2em" >
						<i class="bi bi-house-door"></i><text > Visita a Domicilio:</text> <br>
					</div>
					
							<div class="m-2">
							<p  v-if=" center_data.home_comuna1 != null " >  
								&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(center_data.home_comuna1) }} 
								<br>
							</p>
							<p v-if=" center_data.home_comuna2 != null " >  
								&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(center_data.home_comuna2) }} 
								<br>
							</p>
							<p v-if=" center_data.home_comuna3 != null " >  
							&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(center_data.home_comuna3) }}
								<br>
							</p>
							<p v-if=" center_data.home_comuna4 != null " >  
								&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(center_data.home_comuna4) }} 
								<br>
							</p>
							<p v-if=" center_data.home_comuna5 != null " >  
								&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(center_data.home_comuna5) }} 
								<br>
							</p>
							<p v-if=" center_data.home_comuna6 != null " >  
								&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(center_data.home_comuna6) }} 
								<br>
							</p>	
							</div>
			</div>

			<div v-if="center_data.remote_care" class="mb-3">
				<div class="display-5" style="color:#b36b00" >
					<i class="bi bi-camera-video"></i> Tele Atención  	 
					<div style="" class="text-dark display-6" >
					Todas las comunas 
					</div>                      
				</div>
			</div>



			
			<!-- Include here a map -->
		</div>

		<!-- price-->
		<div class="m-3">
			<div v-if="calendar_data!= null && calendar_data.price != null && calendar_data.price > 0 " >
				$ {{ calendar_data.price.toLocaleString('es-cl') }}
			</div>
			<div v-else>
				
			</div>
		</div>


<div class="d-flex justify-content-center">
	<button @click="show_reservar=!show_reservar" type="button" class="btn btn-secondary">Reservar</button>
</div>

<div v-if="show_reservar">
<hr>				 
                <div class="text-dark"> 
					<p style="font-size:2em"> Datos del Paciente </p>
                </div>							
                            <form autocomplete="off" method="POST" action="take_appointment.html">			
                                <input class="form-control form-control-lg " type="hidden" placeholder="Token" name="token" value="AAAAA"  >
                               
							   <div class="input-group mb-3">
								   <div v-if="error_msg_name" class="text-danger w-100">Debe Indicar Nombre del paciente</div>
									<input type="text" autocomplete="off" class="form-control text-uppercase" placeholder="Ej. Juan Alejandro Morales Miranda"  id="form_patient_name"   name="form_patient_name" v-model="form_patient_name" >
									<div class="input-group-append">
										<span class="input-group-text" id="basic-addon2">Nombre</span>
									</div>
									
								</div>
 								
								<!--
                                <input class="form-control form-control-lg" type="text" placeholder="Rut" name="form_patient_doc_id" id="form_patient_doc_id" v-model="form_patient_doc_id"  >
                                <div v-if="error_msg_doc_id" class="text-danger">Debe Indicar RUT o Pasaporte del paciente</div>
                                <br/>
								-->

								<div class="input-group mb-3">
									<div v-if="error_msg_doc_id" class="text-danger w-100">Debe Indicar RUT o Pasaporte del paciente</div>
										<input type="text" autocomplete="off" class="form-control text-uppercase" placeholder="Ej. 13.909.371-3" name="form_patient_doc_id" id="form_patient_doc_id" v-model="form_patient_doc_id" >
									<div class="input-group-append">
										<span class="input-group-text" id="basic-addon2">N°Cedula</span>
									</div>
										</div>
 								

								<!--
								<div v-if='appToReserve.app_type_home' >
									<input  type="text" class="form-control form-control-lg"  placeholder="Ingrese su Direccion de atención" name="form_patient_address" id="form_patient_address"  v-model="form_patient_address" >
									<div v-if="error_msg_address" class="text-danger">Debe Indicar Su Direccion de atencion a domicilio </div>
									<br/>
								</div>
								-->

								<div v-if="center_data.home_visit" class="input-group mb-3">
									<div v-if="error_msg_address" class="text-danger w-100">Debe Indicar Su Direccion de atencion a domicilio </div>
							
									<input type="text" autocomplete="off" class="form-control text-uppercase" placeholder="Ej. Tristan Cornejo 999, Independencia" name="form_patient_address" id="form_patient_address"  v-model="form_patient_address" >
									<div class="input-group-append">
										<span class="input-group-text" id="basic-addon2">Su Dirección</span>
									</div>
								</div>
 									
								<!--
                                <input  type="number" class="form-control form-control-lg"  placeholder="Edad" name="form_patient_age" id="form_patient_age"  v-model="form_patient_age" >
                                <div v-if="error_msg_age" class="text-danger">Debe Indicar Edad del paciente</div>
                                <br/>
								-->								
								<div class="input-group mb-3">
									<div v-if="error_msg_age" class="text-danger w-100">Debe Indicar Edad del paciente</div>
									<input  type="number" autocomplete="off" class="form-control" placeholder="Ej. 31" name="form_patient_age" id="form_patient_age"  v-model="form_patient_age" >
									<div class="input-group-append">
										<span class="input-group-text" id="basic-addon2">edad</span>
									</div>
								</div>


                                <!--
								<input class="form-control form-control-lg" type="email" placeholder="email@somedomain.com" name="form_patient_email" id="form_patient_email" v-model="form_patient_email">
                                <div v-if="error_msg_email" class="text-danger">Debe Indicar un correo valido</div>
                                <br>
								-->
								<div class="input-group mb-3">
									<div v-if="error_msg_email" class="text-danger w-100">Debe Indicar un correo valido</div>
									<input type="text"  autocomplete="off" class="form-control text-uppercase" placeholder="Ej. sucorreo@ejemplo.com" name="form_patient_email" id="form_patient_email" v-model="form_patient_email">
									<div class="input-group-append">
										<span class="input-group-text" id="basic-addon2">Email@</span>
									</div>
								
								</div>
 								
								<!--
                                <input class="form-control form-control-lg" type="text" placeholder="Telefono Ej 56975397201" name="form_patient_phone" id="form_patient_phone" v-model="form_patient_phone" >
                                <div v-if="error_msg_phone" class="text-danger">Debe Indicar un Telefono de contacto</div>
                                <br>
								-->

								<div class="input-group mb-3">
									<div v-if="error_msg_phone" class="text-danger w-100">Debe Indicar un Telefono de contacto</div>
									<input type="text" autocomplete="off" class="form-control" placeholder="Ej. 975397201" name="form_patient_phone" id="form_patient_phone" v-model="form_patient_phone">
									<div class="input-group-append">
										<span class="input-group-text" id="basic-addon2">Telefono</span>
									</div>
								
                              	</div>


 								
								<div class="d-flex justify-content-center m-5" >
									<input class="" type="text" id="nothing" style="font-size:1px; border-width:0px; border:none;" >
                                	<button type="button" @click="sendReserveAppointment(appToReserve); modalOpen = false" class="btn btn-primary p-2 btn-lg" data-bs-dismiss="modal"   >Tomar esta Cita</button>
                            	</div> 



								<br>
								<div class="" style="height : 250px"> 
								<!-- <text class="text-secondary" style=""><br>#{{appToReserve.calendar_id}}</text>	 -->
								
                				</div>
							
							</form> 
					
					</div>

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
       			margin:1px, 1px;
                padding:1px;
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
  /*display: table-cell;*/
  vertical-align: middle;
}
calendar_id
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
		  form_patient_address : null ,
		   
		  error_msg_name : false,
		  error_msg_age : false,
		  error_msg_doc_id: false,
		  error_msg_email : false, 
		  error_msg_phone : false,
		  error_msg_address : false,

		  app : Object ,
		  appConfirmed : Object,
		  eventShowModalConfirmation : null ,

		  professional_data : null ,
		  show_reservar : false, 

        }
  },

 props: [ 'calendar_data' ,'center_data' ,'searchParameters', 'appToReserve','eventShowModalPubicReserve' ,'global_comunas', 'global_specialties' ],
 emits: ['updateAppList','updateLastSearch'] , 
      
computed: {
	},

	  watch: {
        eventShowModalPubicReserve(newApp, oldApp) {
              console.log("appToReserve change !!!");

		  this.getProfessionalData(this.appToReserve.professional_id);

		  this.form_patient_name = null ,
		  this.form_patient_doc_id = null ,
		  this.form_patient_email = null ,
		  this.form_patient_phone = null ,
		  this.form_patient_insurance_code = null ,
		  this.form_patient_age = null, 
		  this.form_patient_address = null ,


              this.showModalPublicReserveForm = true ; 
            },

		form_patient_doc_id(value, oldValue) {
			
			if (value!=null  &&  value.length > 1 )
			{
			this.form_patient_doc_id=this.rutFormat(value)
			}

		}
  


      	},

	methods: {
		rutFormat(value)
		{
			console.log("RUT FORMAT New Value:"+value)

			let newRutFormated =  value.replace('.', '');
			 newRutFormated =  newRutFormated.replace('-', '');

			//add "-" and verification value
			if (value.length>6)
			{
			let verificationValue = newRutFormated.charAt(newRutFormated.length-1)
			newRutFormated = newRutFormated.substring(newRutFormated.length-18, newRutFormated.length-1)+"-"+verificationValue
			}
			
			return newRutFormated 			
		},


		async getProfessionalData(prof_id)
		{
			console.log("GET PROFESSIONAL ID:"+prof_id)
			  if ( prof_id != null )
              { 
                const json = { 
                    token : "AC94327FK",
					professional_id : prof_id ,
                            };

                  console.log ("patient_get_professional INPUT JSON :"+ JSON.stringify(json)  );
                  let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/patient_get_professional",json);             
	              this.professional_data = response_json.data
				  console.log ("patient_get_professional RESPONSE:"+JSON.stringify(this.professional_data)) ;
              }
              else 
              {
                    this.appointments = null; 
              } 

		},

		comuna_id2name(id)
    	{
            let temp= this.global_comunas.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
   		},
	
		showSpecialtyName(id){
			if (this.global_specialties !=null)
			{ 
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
			}


        },

		transform_date(date)
    	{
        let temp = new Date(date)
        return ( this.getDayName(temp.getDay())+" "+temp.getDate()+" de "+this.getShortMonthName(temp.getMonth()+1)+" "+temp.getFullYear())
    	},
		
		transform_time(date)
    	{
        let temp = new Date(date)
        return (  String(temp.getHours()).padStart(2,0)+":"+String(temp.getMinutes()).padStart(2,0) )
    	},
		
		getDayName(day)
		{
			console.log("day:"+parseInt(day));
			let days = ['domingo','Lunes','Martes','Miercoles' ,'Jueves','Viernes','Sabado' ]
			return days[parseInt(day)];
		},

        getShortMonthName(month)
			{
				console.log("Modal Public Reserve App form MONTH:"+parseInt(month));
				let months = ['nodata','Ene.','Feb.' ,'Marz.','Abr.','May.','Jun.','Jul.','Ago.','Sept.','Oct.','Noviembre','Dic.' ]
				return months[parseInt(month)];

			},	

		updateLastSearch()
            {
                console.log (" emit updateLastSearch: SearchAppointment");
                //this.appointment_list=null ;
                this.$emit('updateLastSearch');
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

			// SET SPECIALTY, Depends if user search or just click without search. 
			let specialty_reserved = null ; 
			if (this.searchParameters.specialty != null)
			{
				specialty_reserved = this.searchParameters.specialty.id ;
			}
			else
			{
				specialty_reserved =  this.appToReserve.specialty  ;
			}
			// 	END SET SPECIALTY 

					var r =confirm("Desea continuar con la Reservar esta cita?");
					  if (r == true) {
						const json = { 
						appointment_calendar_id : this.appToReserve.calendar_id , 
						appointment_date : this.appToReserve.date , 
						appointment_start_time : this.appToReserve.start_time , 
						appointment_duration : this.appToReserve.time_between , 
						appointment_specialty : this.appToReserve.specialty , 
						appointment_professional_id : this.appToReserve.professional_id	, 

						appointment_center_id  :  this.center_data.id	, 
						appointment_type_center :  this.center_data.center_visit	 , 
						appointment_center_name  :  this.center_data.name	, 
						appointment_type_home  :  this.center_data.home_visit	, 
						appointment_type_remote : this.center_data.remote_care ,
						
						appointment_location1 : this.center_data.home_comuna1	, 
						appointment_location2 : this.center_data.home_comuna2	,  
						appointment_location3 :	this.center_data.home_comuna3	, 
						appointment_location4 : this.center_data.home_comuna4	, 
						appointment_location5 : this.center_data.home_comuna5	,  
						appointment_location6 : this.center_data.home_comuna6	, 
						appointment_price : this.calendar_data.price ,

						patient_age : this.form_patient_age,
						patient_name : this.form_patient_name,
						patient_doc_id	: this.form_patient_doc_id,
						patient_email	: this.form_patient_email,
						patient_phone	: this.form_patient_phone,
						patient_address : this.form_patient_address , 
							
						specialty_reserved : this.appToReserve.specialty,

						//patient_insurance:	this.form_patient_insurance_code,
						patient_insurance :	9999 ,
						form_public :  '1' ,
						app_available : false 
						};

						console.log ("sendReserveAppointment  REQUEST :"+ JSON.stringify(json)  );
						let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/public_take_appointment",json );
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