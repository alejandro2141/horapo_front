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
			<div class="modal-container  m-2 p-0 modal-background" style="border-radius: 25px;">
 

                 <!--
                <div class="modal-header mb-0">
                      <div class="display-4 p-1 text-success" >	
                         {{ idSpecialty2name(hourToReserve.specialty) }}
                      </div>       
                    
                      <div class="pr-1  "><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalReserveAppointment = false" aria-label="Close"></i>
                      </div>
                </div>
                -->


                <div class="modal-body mt-0 p-0"  >                   
        
            <div id="app" class="m-0 d-flex  "  >	
                  <div class="" :style="{ 'background-color' : getCenter(hourToReserve.center_id).center_color  }">
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <!-- only in case want to show left bar color --> 
                  </div>
                  <div>
        


        <div class="display-4  text-success d-flex justify-content-between mt-2" >	

                          <text class="p-1 text-dark" >
                            <i v-if="hourToReserve.center_visit" class=" bi bi-building"></i>      
                            <i v-if="hourToReserve.home_visit"  class=" bi bi-house-door" > </i>                                  
                            <i v-if="hourToReserve.remote_care" class=" bi bi-camera-video"></i> 
                          
                          <text class="p-1">   {{ idSpecialty2name(hourToReserve.specialty) }}  </text>

                          </text> 

                       <!--   <text class="p-1 "> {{ hourToReserve.start_time.substring(0,5) }} </text> -->
                          
                          
                           <i class="display-1 text-primary bi bi-x-lg p-1 "  v-on:click="showModalReserveAppointment = false" aria-label="Close"></i>
        </div>
        <div class="display-6 mt-3"> 
            <text class="p-1 "> {{ transform_date(hourToReserve.date.substring(0, 10) ) }} </text> <br>
            <text class="" ><b>{{hourToReserve.start_time}}</b> </text >hrs
        </div>
       
          <div class="mt-4" >

           <!-- TYPE CENTER --> 
                    <div v-if="hourToReserve.center_visit" class="" style="color: rgb(120, 30, 209);">

                            <p class="h5" style="">
                              En Consulta<br>
                              <text class="display-5">{{getCenter(hourToReserve.center_id).name}}</text>
                              <br>
                              Direccion:  {{getCenter(hourToReserve.center_id).address}}
                              ,{{id2comuna(getCenter(hourToReserve.center_id).comuna)}}
                            </p>
                    </div>

          <!-- TYPE HOME -->  
                    <div v-if="hourToReserve.home_visit" style="color:#3399FF">
                            <div class="display-5" >
                                <i class=" bi bi-house-door"></i><text >  Visita a Domicilio:</text> <br>
                            </div>

                            <h5> Zonas de atención:
                                 {{id2comuna(getCenter(hourToReserve.center_id).home_comuna1) }} 
                                 {{id2comuna(getCenter(hourToReserve.center_id).home_comuna2) }} 
                                 {{id2comuna(getCenter(hourToReserve.center_id).home_comuna3) }} 
                                 {{id2comuna(getCenter(hourToReserve.center_id).home_comuna4) }} 
                                 {{id2comuna(getCenter(hourToReserve.center_id).home_comuna5) }} 
                                 {{id2comuna(getCenter(hourToReserve.center_id).home_comuna6) }} 
                            
                            </h5>   
                    </div>

          <!-- TYPE REMOTE  --> 
                    <div v-if="hourToReserve.remote_care" >
                         <p class="h5 mt-2" style="color:#b36b00" >
                              
                             <text class="display-5">  Tele Atención. </text> <br> Requiere llamar directamente al telefono registrado del paciente. 
                        </p>
                    </div>
        </div>
                        <text v-if="hourToReserve.app_type_home" class="">Direccion: {{hourToReserve.center_address }} </text>
                        
                        <button type="button" class="btn btn-primary m-3 " @click="show_patient_form=!show_patient_form" >Reservar</button>
                        <div v-if="show_patient_form" class="mt-3"> 
                             <text class="h5"> Ingrese Datos del Paciente</text>
                        							
                            <form autocomplete="off" method="POST" action="take_appointment.html" class="m-2 ml-0">			
                                <input class="mt-1 form-control form-control-lg" type="hidden" placeholder="Token" name="token" value="AAAAA"  >
                                <input class="mt-1 form-control form-control-lg text-uppercase" type="text" placeholder="Nombre"  id="form_patient_name"   name="form_patient_name" v-model="form_patient_name">
                                <input class="mt-1  form-control form-control-lg  text-uppercase" type="text" placeholder="Rut" name="form_patient_doc_id" id="form_patient_doc_id" v-model="form_patient_doc_id"  >
                               
                                <input v-if="hourToReserve.home_visit" class="mt-1  form-control form-control-lg text-uppercase" type="text" placeholder="Su Direccion" name="form_patient_address" id="form_patient_address" v-model="form_patient_address"  >
                               
                                <input  type="number" class="mt-1 form-control form-control-lg"  placeholder="Edad" name="form_patient_age" id="form_patient_age"  v-model="form_patient_age" >
                                <input class="mt-1 form-control form-control-lg  text-uppercase" type="email" placeholder="email@somedomain.com" name="form_patient_email" id="form_patient_email" v-model="form_patient_email">
                                <input class="mt-1  form-control form-control-lg mb-3" type="text" placeholder="Telefono Ej 56975397201" name="form_patient_phone" id="form_patient_phone" v-model="form_patient_phone" >

                                <button type="button" @click="sendReserveAppointment(hourToReserve); modalOpen = false" class="btn btn-primary mb-3" data-bs-dismiss="modal"   >Tomar esta Hora</button>
                            </form> 
                        </div>  

                 </div>
                 </div>
                <!-- End Body-->
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
	position: fixed; 
  display: flex; 
}

div.scroll {
       			margin:4px, 4px;
                padding:4px;
                background-color: green;
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
  margin: 0px 0;
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


</style>


<script>

export default {
   data : function() {
        return {
            showModalReserveAppointment: false ,

          show_patient_form : false ,

          form_patient_name : null ,
    		  form_patient_doc_id : null ,
		      form_patient_email : null ,
		      form_patient_phone : null ,
		      form_patient_insurance_code : null ,
		      form_patient_age : null, 
          form_patient_address : null, 

          error_msg_name : false,
          error_msg_age : false,
          error_msg_doc_id: false,
          error_msg_email : false, 
          error_msg_phone : false,
          error_msg_insurance_code : false,



          }   
    },
   	
   props: ['daterequired','hourToReserve', 'session_params', 'openModalReserveAppEvent','global_specialties', 'global_comunas' ],
   emits: ['updateAppList','reserveUpdateAppList'] , 
      
   	mounted () {
           },

	methods :{

     id2comuna(id){
            let temp= this.global_comunas.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return "" }

        },
      getCenter(id){
            let temp= this.session_params.centers.find(elem => elem.id ==  id  )
            if (temp != null) { return temp }
            else { return null }
      },

      transform_date(date)
    	{
        let temp = date.split("-") ;
        return (""+temp[2]+" de "+this.getShortMonthName(temp[1])+" "+temp[0])
    	},

    getShortMonthName(month)
		{
			console.log("MONTH:"+parseInt(month));
			let months = ['nodata','Ene.','Feb.' ,'Mar.','Abr.','May.','Jun.','Jul.','Ago.','Sept.','Oct.','Nov.','Dic.' ]
			return months[parseInt(month)];

		},

     idSpecialty2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return "" }
       },
     
    async  sendReserveAppointment(hour)
    {
      console.log("Send Reserve Appointment");
      	var r =confirm("Desea continuar con la Reservar esta cita?");
					  if (r == true) {
						const json = { 
						appointment_calendar_id : this.hourToReserve.calendar_id , 
						appointment_date : this.hourToReserve.date , 
						appointment_start_time : this.hourToReserve.start_time , 
						appointment_duration : this.hourToReserve.duration , 
						appointment_specialty : this.hourToReserve.specialty , 
						appointment_type_center :  this.hourToReserve.center_visit	 , 
						appointment_center_name  :  this.hourToReserve.center_name	, 
						appointment_center_id  :  this.hourToReserve.center_id	, 
						appointment_type_home  :  this.hourToReserve.home_visit	, 
						appointment_type_remote : this.hourToReserve.remote_care ,
						appointment_professional_id  :  this.session_params.professional_id	, 

            /*
						appointment_location1 : null 	, 
						appointment_location2 : this.hourToReserve.home_visit_location1	, 
						appointment_location3 :	this.hourToReserve.home_visit_location1	, 
						appointment_location4 : this.hourToReserve.home_visit_location1	, 
						appointment_location5 : this.hourToReserve.home_visit_location1	, 
						appointment_location6 : this.hourToReserve.home_visit_location1	, 
						*/
            appointment_location1 : this.getCenter(this.hourToReserve.center_id).home_comuna1 	, 
						appointment_location2 : null 	, 
						appointment_location3 :	null 	, 
						appointment_location4 : null 	, 
						appointment_location5 : null 	, 
						appointment_location6 : null 	, 

            patient_name : this.form_patient_name ,
						patient_doc_id	: this.form_patient_doc_id ,
						patient_address : this.form_patient_address  , 

            patient_age : this.form_patient_age,
						patient_email	: this.form_patient_email ,
						patient_phone	: this.form_patient_phone,
						
							
						specialty_reserved : this.hourToReserve.specialty1,

						//patient_insurance:	this.form_patient_insurance_code,
						patient_insurance :	9999 ,
						form_public :  '1' ,
						app_available : false ,
            app_reserved_by_professional : true ,
						};

						console.log ("sendReserveAppointment  REQUEST :"+ JSON.stringify(json)  );
						let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_take_appointment",json );
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
        /*
          hourToReserve(newValue){
          //     this.showModalReserveAppointment= true ;openModalReserveAppEvent
              console.log ("hourToReserve!!!"+newValue+ " hourToReserve ="+ this.showModalReserveAppointment );
          },
        */
      
        openModalReserveAppEvent(variable) {
          console.log("openModalEvent Reserve App  Event !!!");
          this.showModalReserveAppointment= true ; 
        },


    }

    
}
</script>

