<script setup>
import { ref } from 'vue';
import axios from 'axios';

</script>

<template>

	<teleport to="body"   >
		<div  v-if="showModalReserveAppointment" class="modal bg-secondary"    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper d-flex justify-content-center">
			<div class="modal-container  m-2 p-0 modal-background" style="border-radius: 15px;" >
 
                 <!--
                <div class="modal-header mb-0">
                      <div class="display-4 p-1 text-success" >	
                         {{ idSpecialty2name(hourToReserve.specialty) }}
                      </div>       
                    
                      <div class="pr-1  "><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalReserveAppointment = false" aria-label="Close"></i>
                      </div>
                </div>
                calendar_data.color
                -->

      <div class="modal-body mt-0 p-0"  >                   
        
      <div id="app" class="m-0 p-0 d-flex" style="border-radius: 15px;" >	
             
              <div class="m-0 p-2" :style="{ 'background-color' :  '#EEE' }" style="border-radius: 15px;" >
                       
              </div>
                            
              <div class="m-2">
        


        <div class="text-success d-flex justify-content-between "  >	
  
                            <div  style="color: rgb(31, 157, 148); font-size: 2.5em;"> 
                                {{ idSpecialty2name(hourToReserve.specialty) }} 
                            </div>
                           <!--   <text class="p-1 "> {{ hourToReserve.start_time.substring(0,5) }} </text> -->
                          
                           <i class="display-1 text-primary bi bi-x-lg p-1 "  v-on:click="showModalReserveAppointment = false" aria-label="Close"></i>
        </div>

      <!-- SHOW DATE -->
       <div class="d-flex justify-content-start mb-3" >
          <text style="font-size: 2em;">
            <i class="text-muted m-2 bi bi-calendar" ></i>
          </text>
          <div class="">
            <text class="" >
            {{ transform_date(hourToReserve.date ) }}
            </text>
            <br >
            <text class="" > 
            {{ transform_time(hourToReserve.start_time)}}
              <text>hrs</text>
            </text>
          </div>
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
					{{id2comuna(center_data.comuna)}}
					</div>           
			</div>

			<div v-if="center_data.home_visit" style="color:#3399FF">
					<div style="font-size:2em" >
						<i class="bi bi-house-door"></i><text > Visita a Domicilio:</text> <br>
					</div>
					
							<div class="m-2">
							<p  v-if=" center_data.home_comuna1 != null " >  
								&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ id2comuna(center_data.home_comuna1) }} 
								<br>
							</p>
							<p v-if=" center_data.home_comuna2 != null " >  
								&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ id2comuna(center_data.home_comuna2) }} 
								<br>
							</p>
							<p v-if=" center_data.home_comuna3 != null " >  
							&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ id2comuna(center_data.home_comuna3) }}
								<br>
							</p>
							<p v-if=" center_data.home_comuna4 != null " >  
								&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ id2comuna(center_data.home_comuna4) }} 
								<br>
							</p>
							<p v-if=" center_data.home_comuna5 != null " >  
								&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ id2comuna(center_data.home_comuna5) }} 
								<br>
							</p>
							<p v-if=" center_data.home_comuna6 != null " >  
								&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ id2comuna(center_data.home_comuna6) }} 
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

<!-- END SHOW APP TYPE , LOCATION  -->	


                        <text v-if="hourToReserve.app_type_home" class="">Direccion: {{center_data.address }} </text>
                        
                        <button type="button" class="btn btn-primary m-3 " @click="show_patient_form=!show_patient_form" >Reservar</button>
                        <div v-if="show_patient_form" class="mt-3"> 
                             <text class="h5"> Ingrese Datos del Paciente</text>
                        							
                            <form autocomplete="off" method="POST" action="take_appointment.html" class="m-2 ml-0">			
                                <input class="mt-1 form-control form-control-lg" type="hidden" placeholder="Token" name="token" value="AAAAA"  >
                                <input class="mt-1 form-control form-control-lg text-uppercase" type="text" placeholder="Nombre"  id="form_patient_name"   name="form_patient_name" v-model="form_patient_name">
                                <input class="mt-1  form-control form-control-lg  text-uppercase" type="text" placeholder="Rut" name="form_patient_doc_id" id="form_patient_doc_id" v-model="form_patient_doc_id"  >
                               
                                <input v-if="true" class="mt-1  form-control form-control-lg text-uppercase" type="text" placeholder="Su Direccion" name="form_patient_address" id="form_patient_address" v-model="form_patient_address"  >
                               
                                <input  type="number" class="mt-1 form-control form-control-lg"  placeholder="Edad" name="form_patient_age" id="form_patient_age"  v-model="form_patient_age" >
                                <input class="mt-1 form-control form-control-lg  text-uppercase" type="email" placeholder="email@somedomain.com" name="form_patient_email" id="form_patient_email" v-model="form_patient_email">
                                <input class="mt-1  form-control form-control-lg mb-3" type="text" placeholder="Telefono Ej 56975397201" name="form_patient_phone" id="form_patient_phone" v-model="form_patient_phone" >

                                <button type="button" @click="sendReserveAppointment(hourToReserve); modalOpen = false" class="btn btn-primary mb-3" data-bs-dismiss="modal"   >Tomar esta Hora</button>
                            </form> 
                        </div>  

                 </div>
        
        <!-- End APP-->
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

          center_data : null ,
          //calendar_data : null ,
          }   
    },
   	
   props: ['calendar_data' ,'daterequired','hourToReserve', 'session_params', 'openModalReserveAppEvent','global_specialties', 'global_comunas' ],
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
        let temp = new Date(date);
        return (""+temp.getDate() +" de "+this.getShortMonthName(temp.getMonth()+1 )+" "+temp.getFullYear())
     
      },

      transform_time(date_time)
    	{
        let temp = new Date(date_time);
        return (""+String(temp.getHours()).padStart(2,0) +" :  "+String(temp.getMinutes()).padStart(2,0)+" ")
      },


    getShortMonthName(month)
		{
			console.log("MONTH:"+parseInt(month));
			let months = ['nodata','Enero','Febrero' ,'Marzo','Abril','Mayo','Junio','Julio','Agost','Septiembre','Octubre','Noviembre','Diciembre' ]
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
            //let auxDate= new Date(this.hourToReserve.start_time)

					  if (r == true) {
						const json = { 
						appointment_calendar_id : this.hourToReserve.calendar_id , 
						appointment_date : this.hourToReserve.date , 
						//appointment_start_time : auxDate.getHours()+":"+auxDate.getMinutes()+":00"  , 
            appointment_start_time : this.hourToReserve.start_time  , 
						appointment_duration : this.hourToReserve.duration , 
						appointment_specialty : this.hourToReserve.specialty , 

            appointment_type_center : this.center_data.center_visit	 , 
						appointment_center_name  :  this.center_data.name	, 
						appointment_center_id  :  this.hourToReserve.center_id	, 
						appointment_type_home  :  this.center_data.home_visit	, 
						appointment_type_remote : this.center_data.remote_care ,
						appointment_professional_id  :  this.session_params.professional_id	, 

            /*
						appointment_location1 : null 	, 
						appointment_location2 : this.hourToReserve.home_visit_location1	, 
						appointment_location3 :	this.hourToReserve.home_visit_location1	, 
						appointment_location4 : this.hourToReserve.home_visit_location1	, 
						appointment_location5 : this.hourToReserve.home_visit_location1	, 
						appointment_location6 : this.hourToReserve.home_visit_location1	, 
						*/
            appointment_location1 : this.center_data.home_comuna1 	, 
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
						
							
						specialty_reserved : this.hourToReserve.specialty,

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
  
          this.center_data = this.session_params.centers.find(elem => elem.id == this.hourToReserve.center_id )
         //this.calendar_data = this.session_params.calendars.find(elem => elem.id == this.hourToReserve.calendar_id )

        },


    }

    
}
</script>

