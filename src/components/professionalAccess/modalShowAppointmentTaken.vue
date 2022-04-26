<script setup>
import { ref } from 'vue';
import axios from 'axios';
import InputFormSpecialtyProfessional from './inputFormSpecialtyProfessional.vue';
import InputFormCenterProfessional from './inputFormCenterProfessional.vue';
import GenericBlockDateSpecialtyVue from '../GenericBlockDateSpecialty.vue';

</script>

<template>

	<teleport to="body"   >
    
		<div  v-if="showModalAppointmentTaken" class="modal bg-secondary"    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-0 modal-background" style="border-radius: 25px;">
 


                <div class="modal-header">
                        <div class="text-secondary  display-5">
                         Reservada #{{hourTaken.id}}
                        </div>
                        <div class="p-1 "><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalAppointmentTaken = false" aria-label="Close"></i>
                        </div>
                </div>

<!------------------ ----> 
    <div v-if="hourTaken != null"    class=" p-0 mb-0 ">
        
        <div id="app" class="m-0 d-flex  "  >	
            <div class="">
                     &nbsp;
            </div>
            <div>

 				<div class="display-4 p-1" style=" color:#1f9d94">
                    <div >	
                    {{ id2name(hourTaken.specialty) }} 
                    </div>       
                </div>

                <div class="">
					<p> <i class="bi bi-circle-fill display-5 text-primary"   style=" color:#2e5668" ></i> Fecha : 
						<text class="" style="font-size: 1.2em; color:#2e5668">	 
						<b>  {{ transform_date( hourTaken.date.substring(0, 10) ) }} </b>
						</text>       
					
					</p>
				</div>

				<div class="">
					<p> <i class="bi bi-circle-fill display-5 text-primary"   style=" color:#2e5668" ></i> Hora : 
						<text class="" style="font-size: 1.2em; color:#2e5668">	 
						{{hourTaken.start_time}} <text >hrs</text>  
						</text>       
					
					</p>
				</div>
 
                <div class="">
           <!-- TYPE CENTER --> 
                    <div v-if="hourTaken.center_visit" class="">
                 
                        <div class="display-6" style="">  
                            <div style="color: #781ED1" >
                            <i class="h1 bi bi-building"></i> En Consulta  </div>
                        </div>
							
                            <div style="" class="text-dark display-6" >
                               <i class="bi bi-geo-alt display-4"></i> {{id2comuna(hourTaken.center_visit_location)}}
                            </div>
                            <div class="" style="color:#2e5668" >	
                             Centro :   {{hourTaken.center_name}}
                            </div> 
                            <div style="color:#2e5668">
                             Direccion:  {{hourTaken.center_address}}
                            </div>                          
                    </div>

          <!-- TYPE HOME -->  
                    <div v-if="hourTaken.home_visit" style="color:#3399FF">
                            <div class="display-5" >
                                <i class=" bi bi-house-door"></i><text >  Visita a Domicilio:</text> <br>
                            </div>

                              <h2> Direccion: 
                              {{ hourTaken.patient_address}}  </h2>
                           
                              <!--           
                                <div class="m-2">
                                <p  v-if=" hourTaken.home_visit_location1 != null " >  
                                  &nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ id2comuna(hourTaken.home_visit_location1) }} 
                                  <br>
                                </p>
                                <p v-if=" hourTaken.home_visit_location2 != null " >  
                                  &nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ id2comuna(hourTaken.home_visit_location2) }} 
                                  <br>
                                </p>
                                <p v-if=" hourTaken.home_visit_location3 != null " >  
                                &nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ id2comuna(hourTaken.home_visit_location3) }}
                                  <br>
                                </p>
                                <p v-if=" hourTaken.home_visit_location4 != null " >  
                                  &nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ id2comuna(hourTaken.home_visit_location4) }} 
                                  <br>
                                </p>
                                <p v-if=" hourTaken.home_visit_location5 != null " >  
                                  &nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ id2comuna(hourTaken.home_visit_location5) }} 
                                  <br>
                                </p>
                                <p v-if=" hourTaken.home_visit_location6 != null " >  
                                  &nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(hourTaken.home_visit_location6) }} 
                                  <br>
                                </p>	
                                </div>
                                -->
                    </div>

          <!-- TYPE REMOTE  --> 
                    <div v-if="hourTaken.remote_care" class="">
                         <div class="display-5" style="color:#b36b00" >
                               <i class="bi bi-camera-video"></i> Tele Atención  	 
                              <div style="" class="text-dark display-6" >
                              (Todas las comunas) 
                              </div>                      
                        </div>
                    </div>

					<p> <i class="bi bi-person display-4 text-primary"></i> 
                            Con : {{ hourTaken.patient_name}} 
                             ( Id:{{ hourTaken.patient_doc_id}} )
          
           </p>

            <p class="text-primary h3" > 
                            <a :href='"tel:+56"+hourTaken.patient_phone1'>
                                <i class="bi bi-telephone"></i>  {{ hourTaken.patient_phone1}}
                            </a>
            </p>             
            
            <p class="text-primary h3" > 
                          <a :href ='"mailto:"+hourTaken.patient_email'><i class="bi bi-envelope"></i> {{ hourTaken.patient_email}} 
                          </a>     
            </p>
            
            

          

				

                </div>
            
            </div>

            </div>

               
          <button  v-if='(hourTaken.confirmation_status == 0) || ( hourTaken.confirmation_status == null) ' type="button" @click="requestConfirmation(hourTaken);" data-bs-dismiss="modal" class="btn btn-primary m-2"><i class="bi bi-question-square"></i> Solicitar Confirmación Asistencia</button>
          <button  v-if='hourTaken.confirmation_status == 1' type="button"   data-bs-dismiss="modal" class="btn btn-success m-2"><i class="bi bi-person-check"></i> Paciente Confirmado</button>
                     
          <button type="button" @click="cancelAppointment(hourTaken);"  class="btn btn-primary m-2"><i class="bi bi-x-square"></i> Cancelar Cita con Paciente</button>
                     

     <text style="color: #ffffff;" >#{{hourTaken.calendar_id}}</text> 
       </div>


<!---- ------------------------------>

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
            showModalAppointmentTaken: false ,
           // centers: null,
            form_center_id : null,
            form_public : Boolean ,
            form_start_time : null ,
            form_specialty_code : null ,
            form_center_code  : null ,
            form_app_duration : null ,
          }   
    },
   	
   props: ['daterequired','hourTaken', 'session_params', 'openModalShowAppTakenEvent', 'global_specialties', 'global_comunas' ],
   emits: ['updateAppList'] , 
      
   	mounted () {
           this.auxHourCreate = ref(this.hourCreate) ;
           console.log("Modal Create Appointment Mounted !!!" );
    },

	methods :{


    transform_date(date)
    	{
        let temp = date.split("-") ;
        return (""+temp[2]+" de "+this.getShortMonthName(temp[1])+" "+temp[0])
    	},

    id2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return "" }
       },
    id2comuna(id){
            let temp= this.global_comunas.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return "" }

        },
	  getShortMonthName(month)
		{
			console.log("MONTH:"+parseInt(month));
			let months = ['nodata','Ene.','Feb.' ,'Mar.','Abr.','May.','Jun.','Jul.','Ago.','Sept.','Oct.','Nov.','Dic.' ]
			return months[parseInt(month)];

		},

    async cancelAppointment(hour)
    {
    console.log("cancel appointment id: "+hour.app_id);
        var r =confirm("¿Esta seguro que desea CANCELAR esta cita? Si cancela esta cita la hora quedara disponible para ser agendada por otros pacientes.");
	      if (r == true) {

        const json_input = {  
              //only variable
              appointment_id : hour.app_id,
                        }
                      
        console.log ("Professional Cancel Appoitnment :"+ JSON.stringify(json_input)  );
        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_cancel_appointment",json_input);
        this.$emit('updateAppList');
        this.showModalAppointmentTaken= false ;
        }

    },

    requestConfirmation(hour)
    {
    console.log("request confirmation to customer : "+hour.patient_email);
    },
/*
    async updateApp(hour)
    {
    console.log("Update App : ");
    var r =confirm("Desea continuar con los cambios?");
	 if (r == true) {

           const json_input = {  
              //only variable
              form_start_time : this.form_start_time , 
              form_appointment_duration : this.form_app_duration , 
              
              appointment_id : this.hourTaken.app_id,
              form_center_id  : this.hourTaken.center_id ,
              form_professional_id : this.session_params.professional_id  ,
              form_date : this.daterequired ,
              form_specialty_code : this.hourTaken.specialty ,
              form_public : this.form_public  ,
              patient_insurance:	9999 ,
                        }
                      
        console.log ("SAVE_APPOINTMENT REQUEST :"+ JSON.stringify(json_input)  );
        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/save_appointment",json_input);
        this.$emit('updateAppList');
        this.showModalAppointmentDetais = false ;
        }
    },
*/
    },
    watch : {
        hourTaken(newValue){
            // this.showModalAppointmentTaken= true ;openModalShowAppTakenEvent
            console.log ("Hour Modal App Taken details Change!!!"+newValue+ " Show ModalApp Details ="+ this.showModalAppointmentDetais );
            this.form_start_time = newValue.start_time ;
            this.form_center_id =  newValue.center_id ;
            this.form_public  =  newValue.available_public_search ;
            this.form_start_time  =  newValue.start_time ;
            this.form_specialty_code  =  newValue.specialty ;
            this.form_center_code   =  newValue.center_id ;
            this.form_app_duration  =  newValue.duration ;
            this.form_app_d  =  newValue.duration ;
            console.log ("this.form_public!!!"+this.form_public );
        },
        openModalShowAppTakenEvent(newApp, oldApp) {
            console.log("openModalEvent Show App Taken Details !!!");
           this.showModalAppointmentTaken = true ;
        },


    }

    
}
</script>

