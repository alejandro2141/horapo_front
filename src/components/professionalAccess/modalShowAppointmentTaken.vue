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
			<div class="modal-container  m-1 p-0 modal-background">
 


                <div class="modal-header">
                        <div class="text-secondary  display-5">
                         Reservada #{{hourTaken.app_id}}
                        </div>
                        <div class="p-1 "><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalAppointmentTaken = false" aria-label="Close"></i>
                        </div>
                </div>

                <div class="modal-body " > 

                   <GenericBlockDateSpecialtyVue :day='hourTaken.date.substring(8, 10)' :month='getShortMonthName(hourTaken.date.substring(5, 7) )'  :specialties='id2name(hourTaken.specialty_reserved )' ></GenericBlockDateSpecialtyVue>

                    <!-- APP IN CENTER -->
                    <div class="mt-2" v-if="hourTaken.app_type_center"   >
                                <div class="h3" style="color:#1f9d94 ;">
                                    <i class="bi bi-building"  ></i>  En Consulta <br>
                                </div>
                                <div>
                                    <i class="bi bi-geo-alt" style="color:#1f9d94 ;"  ></i>{{hourTaken.center_name }} :    {{hourTaken.center_address }}       
                                </div>
                    </div>
                    <!-- APP HOME -->
                    <div v-if="hourTaken.app_type_home" style="" >
                            <text style="color:#1f9d94 ;">
                              <i class="h1 bi bi-house"  > </i> A Domicilio Comunas <br>
                            </text>
                            <div  style="color:#1f9d94 ;" >
                                <text v-if="hourTaken.location1 != null " >  
                                    <i class="bi bi-geo-alt"></i> {{ id2comuna(hourTaken.location1) }} <br>
                                </text>
                                <text v-if="hourTaken.location2 != null " >  
                                    <i class="bi bi-geo-alt"></i> {{ id2comuna(hourTaken.location2) }} <br>
                                </text>
                                <text v-if="hourTaken.location3 != null " >  
                                    <i class="bi bi-geo-alt"></i> {{ id2comuna(hourTaken.location3) }} <br>
                                </text>
                                <text v-if="hourTaken.location4 != null " >  
                                    <i class="bi bi-geo-alt"></i> {{ id2comuna(hourTaken.location4) }} <br>
                                </text>
                                <text v-if="hourTaken.location5 != null " >  
                                    <i class="bi bi-geo-alt"></i> {{ id2comuna(hourTaken.location5) }} <br>
                                </text>
                                <text v-if="hourTaken.location6 != null " >  
                                    <i class="bi bi-geo-alt"></i> {{ id2comuna(hourTaken.location6) }} <br>
                                </text>
                            </div>
                    </div>



                      <h3> Hora Inicio: {{hourTaken.start_time}} ({{hourTaken.duration}}Min ) </h3>          
                      <h3> Fecha {{hourTaken.date.substring(0, 10)}} </h3>

                      <h3><b> Informacion Paciente : </b></h3>
                      <h3>  {{ hourTaken.patient_name}} <br> 
                          ID:{{ hourTaken.patient_doc_id}} </h3>
                      <h2> Direccion: 
                      {{ hourTaken.patient_address}}  </h2>

                      <h3 class="text-primary" > 
                            <a :href='"tel:+56"+hourTaken.patient_phone1'>
                                <i class="bi bi-telephone"></i>  {{ hourTaken.patient_phone1}}
                            </a>
                      </h3>             
                      <h3 class="text-primary" > 
                          <a :href ='"mailto:"+hourTaken.patient_email'><i class="bi bi-envelope"></i> {{ hourTaken.patient_email}} 
                          </a>     
                      </h3>
                      

                      <button  v-if='(hourTaken.confirmation_status == 0) || ( hourTaken.confirmation_status == null) ' type="button" @click="requestConfirmation(hourTaken);" data-bs-dismiss="modal" class="btn btn-primary m-2"><i class="bi bi-question-square"></i> Solicitar Confirmación Asistencia</button>
                      <button  v-if='hourTaken.confirmation_status == 1' type="button"   data-bs-dismiss="modal" class="btn btn-success m-2"><i class="bi bi-person-check"></i> Paciente Confirmado</button>
                     
                      <button type="button" @click="cancelAppointment(hourTaken);"  class="btn btn-primary m-2"><i class="bi bi-x-square"></i> Cancelar Cita con Paciente</button>
                     
                     
        
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
			let months = ['nodata','Ene.','Feb.' ,'Marz.','Abr.','May.','Jun.','Jul.','Ago.','Sept.','Oct.','Nov.','Dic.' ]
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

