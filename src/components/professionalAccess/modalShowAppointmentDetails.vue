<script setup>
import { ref } from 'vue';
import axios from 'axios';
import InputFormSpecialtyProfessional from './inputFormSpecialtyProfessional.vue';
import InputFormCenterProfessional from './inputFormCenterProfessional.vue';


</script>

<template>
	<teleport to="body"   >
		<div  v-if="showModalAppointmentDetais" class="modal bg-secondary"    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-1 modal-background">
 

                <div class="modal-body mt-0" > 
                
                    <div class="d-flex flex-row bd-highlight mb-1 display-5">
                            <div class="p-1 bd-highlight">Cita {{daterequired}} <br/>
                        </div>
                            <div class="p-1 bd-highlight"></div>
                            <div class="p-1 bd-highlight"><i class="display-1 bi bi-x "  v-on:click="showModalAppointmentDetais = false" aria-label="Close"></i>
                        </div>
                    </div>

                   <form autocomplete="off" class="p-2"  >	
                    
                      <input class="form-control form-control-lg" type="hidden" placeholder="form_date" name="form_date"   value="par_required_day"  >
                      <h3> Hora Inicio: </h3>
                      <input class="form-control " type="text"  v-model="form_start_time" >
                      <h3 class=""> Tiempo de atencion: </h3>
                            <select class="form-select form-control-lg" aria-label="Default" id="time" name="timeextension" v-model="form_app_duration" >
                                <option value="15">15 Minutos </option>
                                <option value="30">30 Minutos </option>
                                <option value="45">45 Minutos </option>
                                <option value="60">60 Min </option>
                                <option value="75">1 Hora 15 Min</option>
                                <option value="90">1 Hora 30 Min</option>
                                <option value="105">1 Hora 45 Min</option>
                                <option value="120">2 Horas</option>
                                <option value="150">2 Horas 30 Min</option>
                                <option value="205">3 Horas 45 Min</option>
                            </select>
                     
                      
                      <h3 class="">{{ hourDetails.specialty_name}}</h3>
                      <h3 class="" > {{ hourDetails.center_name}} <text class="h5" > {{ hourDetails.center_address}} </text>  </h3>
                      <!-- <InputFormCenterProfessional v-on:selectedCenterCode="selectedCenterCode" :session_params="session_params" > </InputFormCenterProfessional> 
                     -->
                      
                     <div class="d-flex flex-row " >
                        <div class="h4 p-2">Disponible Internet ? </div>

                        <div class="" v-on:click="form_public = !form_public">  

                            <i v-if="form_public" class="display-1 bi bi-wifi text-success"><text class="h5">Si</text> </i>
                            <i v-else  class="display-3 bi bi-wifi-off"> <text class="h5">No</text> </i>
                        </div>
                     </div>
                      <button type="button" @click="updateApp(hourDetails);" data-bs-dismiss="modal" class="btn btn-secondary m-2"><i class="bi bi-save"></i> Guardar Cambios</button>
<hr/>
                      <button type="button" @click="reserveHour(hourDetails);" data-bs-dismiss="modal" class="btn btn-primary m-2"> <i class="bi bi-person-square"></i> Reservar para un Paciente</button>
                      
                      <button type="button" @click="cancelHour(hourDetails);" data-bs-dismiss="modal" class="btn btn-primary m-2"><i class="bi bi-x-square"></i> Cancelar Hora</button>

                      </form>			
        
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
            showModalAppointmentDetais: false ,
           // centers: null,
            form_center_id : null,
            form_public : Boolean ,
            form_start_time : null ,
            form_specialty_code : null ,
            form_center_code  : null ,
            form_app_duration : null ,
          }   
    },
   	
   props: ['daterequired','hourDetails', 'session_params' ],
   emits: ['updateAppList','showReserveModal'] , 
      
   	mounted () {
           this.auxHourCreate = ref(this.hourCreate) ;
           console.log("Modal Create Appointment Mounted !!!" );
         //  this.getCenters();
    },

	methods :{
     
    reserveHour(hour)
    {
    console.log("Launch Reserve Modal : ");
    this.showModalAppointmentDetais=false ;
    this.$emit('showReserveModal',hour);
    },

    async cancelHour(hour)
    {
    console.log("cancel appointment id: "+hour.app_id);
        var r =confirm("¿Esta seguro que desea CANCELAR esta Hora? Si esta hora desaparecera de su agenda y pacientes no podran agendada en esta hora");
	      if (r == true) {

        const json_input = {  
              //only variable
              appointment_id : hour.app_id,
                        }
                      
        console.log ("Professional Cancel Appoitnment :"+ JSON.stringify(json_input)  );
        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/cancel_hour",json_input);
        this.$emit('updateAppList');
        this.showModalAppointmentDetais= false ;


        }

    },

    async updateApp(hour)
    {
    console.log("Update App : ");
    var r =confirm("Desea continuar con los cambios?");
	 if (r == true) {

           const json_input = {  
              //only variable
              form_start_time : this.form_start_time , 
              form_appointment_duration : this.form_app_duration , 
              
              appointment_id : this.hourDetails.app_id,
              form_center_id  : this.hourDetails.center_id ,
              form_professional_id : this.session_params.professional_id  ,
              form_date : this.daterequired ,
              form_specialty_code : this.hourDetails.specialty ,
              form_public : this.form_public  ,
              patient_insurance:	9999 ,
                        }
                      
        console.log ("SAVE_APPOINTMENT REQUEST :"+ JSON.stringify(json_input)  );
        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/save_appointment",json_input);
        
        //console.log ("createHours RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
        /*
        //location.reload();
        //this.agendas = response_json.data.rows;
        //location.reload();
        */
        this.$emit('updateAppList');
        this.showModalAppointmentDetais = false ;
      }
    },

    },
    watch : {
        hourDetails(newValue){
             this.showModalAppointmentDetais= true ;
            console.log ("Hour Modal App Details Change!!!"+newValue+ " Show ModalApp Details ="+ this.showModalAppointmentDetais );
            this.form_start_time = newValue.start_time ;
            this.form_center_id =  newValue.center_id ;
            this.form_public  =  newValue.available_public_search ;
            this.form_start_time  =  newValue.start_time ;
            this.form_specialty_code  =  newValue.specialty ;
            this.form_center_code   =  newValue.center_id ;
            this.form_app_duration  =  newValue.duration ;
            this.form_app_d  =  newValue.duration ;
            console.log ("this.form_public!!!"+this.form_public );
        }
    }

    
}
</script>

