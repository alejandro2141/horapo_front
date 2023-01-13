<script setup>
import { ref } from 'vue';
import axios from 'axios';
import InputFormSpecialtyProfessional from './inputFormSpecialtyProfessional.vue';
import InputFormCenterProfessional from './inputFormCenterProfessional.vue';
import GenericBlockDateSpecialtyVue from '../GenericBlockDateSpecialty.vue';

</script>

<template>

	<teleport to="body"   >
    
		<div  v-if="showModalAppointmentTaken" class="modal bg-secondary "    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper d-flex justify-content-center">
			<div class="modal-container m-2 p-0 modal-background  " style="border-radius: 15px;" >

    <!------------------ ----> 
    <div v-if="hourTaken != null"   class=" text-body h5">
        
        <div id="app" class="d-flex  "  >	
            <div class="p-2" style="border-radius: 15px;" :style="{ 'background-color' : hourTaken.calendar_color  }" >
                     <!-- only in case want to show left bar color --> 
            </div>

            <div class="p-3">
      
          <!--SPECIALTY -->
            <div class="d-flex flex-row justify-content-between ">
                <div  style="color:#1f9d94 ; font-size:1.5em" >{{ id2name(hourTaken.specialty) }}  </div>
                <div ><i class="text-primary bi bi-x-lg ml-0" style="font-size:2em"  v-on:click="showModalAppointmentTaken = false" aria-label="Close"></i> </div>
            </div>
          <!-- SHOW DATE -->
          <div class="d-flex justify-content-start mb-3" >
            <text  style="font-size:2em"> <i class="text-muted m-2 bi bi-calendar" ></i> </text>
            <div class="">
              <text class="">	{{ transform_date(hourTaken.date) }} </text><br>
              <text class="" style="">	 
                  {{transform_time(hourTaken.start_time)}} <text >hrs</text>  
              </text>       		
            </div>
          </div>

       
 			  <p class="text-secondary">	
        Reserva #{{hourTaken.app_id}} 
        </p>
 

          <div class=""    >
           <!-- TYPE CENTER --> 
                    <div v-if="hourTaken.app_type_center" class="">
                 <!--
                        <div class="" style="">  
                            <p  >
                               En Consulta  
                            </p>
                        </div>
							-->
                          <div style="font-size:1em">  
                            <div style="color: #781ED1" >
                              <i class="h1 bi bi-building "></i> En Consulta  
                            </div>
                          </div>
                          
                          <p class="mt-0" style="">
                              {{getCenter(hourTaken.center_id).name}}
                              <br>
                              <i class="bi bi-geo-alt h1"></i> {{id2comuna(getCenter(hourTaken.center_id).comuna)}}
                              <br>
                              <text>
                              Direccion:  {{getCenter(hourTaken.center_id).address}}
                              </text>
                          </p>
                          
                           
                    </div>

          <!-- TYPE HOME -->  
                    <div v-if="hourTaken.app_type_home" style="color:#3399FF">
                            
                               <div style="font-size:1em color:#3399FF" >
						                    <i class="bi bi-house-door"></i><text > Visita a Domicilio:</text> <br>
					                    </div>
                            <!---
                              <h5> Direccion: 
                              {{ hourTaken.patient_address}}  </h5> 
                            -->
                           
                    </div>

          <!-- TYPE REMOTE  --> 
                    <div v-if="hourTaken.app_type_remote" >
                         <div class="" style="color:#b36b00" >
                            <i class="bi bi-camera-video"></i> Tele Atención  	 
                            <div style="" class="text-dark" >
                              Todas las comunas 
                            </div>                      
                          </div>
                    </div>
        </div>
					
  <!-- PATIENT  -->
          <p class=""> 
                 
                <text class="">
                 <b class="" > Paciente: </b> <br>
                              {{ hourTaken.patient_name}} ({{ hourTaken.patient_age}} Años) <br>
                           id:{{ hourTaken.patient_doc_id}}<br>

                            <p class="text-primary mt-2" v-if="hourTaken.patient_address!=null ||hourTaken.patient_address!='null' " >
                               <i class="bi bi-geo-alt"></i> Direccion:{{ hourTaken.patient_address}} 
                            </p>
                </text>
          </p>
 
          <p class="text-primary  " > 
                <a :href='"tel:+56"+hourTaken.patient_phone1' class="text-decoration-none" >
                    <i class=" bi bi-telephone"></i>  {{ hourTaken.patient_phone1}}
                </a>
          </p>             
            
            <p class="text-primary  " > 
                          <a :href ='"mailto:"+hourTaken.patient_email' class="text-decoration-none"  ><i class="bi bi-envelope"></i> {{ hourTaken.patient_email}} 
                          </a>     
            </p>
  <!-- END PATIENT  -->
            

      
      
      <p class="mt-2">
          <button  v-if='(hourTaken.confirmation_status == 0) || ( hourTaken.confirmation_status == null) ' type="button" @click="requestConfirmation(hourTaken);" data-bs-dismiss="modal" class="btn btn-primary m-2"><i class="bi bi-question-square"></i> Solicitar Confirmación Asistencia</button>
          <button  v-if='hourTaken.confirmation_status == 1' type="button"   data-bs-dismiss="modal" class="btn btn-success m-2"><i class="bi bi-person-check"></i> Paciente Confirmado</button>
                     
          <button type="button" @click="cancelAppointment(hourTaken);"  class="btn btn-primary m-2"><i class="bi bi-x-square"></i> Cancelar Cita con Paciente</button>
      </p>
      <text style="color: #ffffff;" >#{{hourTaken.calendar_id}}</text> 
      
       


            
            </div>

            </div>

               
                  

    
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

    transform_time(date)
    	{
        let temp = new Date(date)
        return (  String(temp.getHours()).padStart(2,0)+":"+String(temp.getMinutes()).padStart(2,0) )
    	},
   transform_date(date)
    	{
        let temp = new Date(date)
        return ( this.getDayName(temp.getDay())+" "+temp.getDate()+" de "+this.getShortMonthName(temp.getMonth()+1)+" "+temp.getFullYear())
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
			let months = ['nodata','Enero','Febrero' ,'Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' ]
			return months[parseInt(month)];

		},

    async cancelAppointment(hour)
    {
    console.log("cancel appointment id: "+hour.app_id);
        var r =confirm("¿Esta seguro que desea CANCELAR esta cita? Si cancela esta cita la hora quedara disponible para ser agendada por otros pacientes.");
	      if (r == true) {

        const json_input = {  
              //only variable
              appointment_id : hour.id,
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

    getCenter(id){
            let temp= this.session_params.centers.find(elem => elem.id ==  id  )
            if (temp != null) { return temp }
            else { return null }
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

