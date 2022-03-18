<script setup>
import { ref } from 'vue'
import axios from 'axios';
import inputFormComuna from  '../publicSearch/InputFormComuna.vue'
import GenericBlockDateSpecialtyVue from '../GenericBlockDateSpecialty.vue';
import InputFormCenterProfessional from './inputFormCenterProfessional.vue';
import InputFormComunaProfessional from './inputFormComunaProfessional.vue' ;


</script>

<template>

     	<teleport to="body"   >
		<div  v-if="showModalCreateCalendar" class="modal bg-secondary scroll" >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-1 modal-background">
 


                <div class="modal-header">
                        <div class="text-secondary  display-5">
                        Crear Horario
                        </div>
                        <div class="p-1 "><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalCreateCalendar = false"  aria-label="Close"></i>
                        </div>
                </div>

                <div class="modal-body mt-0"  > 
                
                    <div v-if="true" >
                
                          <div class="form-group mt-3 h3">
                                    <label for="exampleInputEmail1">Especialidad </label><br>
                                        <select   v-model="form_specialty_id" class="form_specialty_id form-control " id="form_specialty_id" >
                                        <option v-for="specialty in specialties" :key="specialty.id" :value="specialty.id">
                                          {{ specialty.name }}
                                        </option>
                                        </select>
                          </div>

                          <div class="form-group mt-3 h3">
                                    <label for="exampleInputEmail1">Lugar de atencion ( X Y Z) </label>
                                    <InputFormCenterProfessional  v-on:centers_found_flag_emit='centers_found_flag_emit' v-on:centersError='centersError' v-on:selectedCenterCode="selectedCenterCode" :session_params="session_params" v-on:switchView="switchView" > </InputFormCenterProfessional> 
                          </div>

                          <div class="mt-2"> 
                                <div class="form-group">
                                        <label for="exampleInputEmail1">Hora Inicio </label>
                                        <input type="text" class="form-control" autocomplete="off" id="form_start_time" name="form_start_time" v-model="form_start_time"  placeholder="ejemplo 14:30">
                                </div>
                                
                                <div class="form-group">
                                        <label for="exampleInputEmail1">Hora Fin </label>
                                        <input type="text" class="form-control" autocomplete="off" id="form_end_time" name="form_end_time" v-model="form_end_time"  placeholder="ejemplo 19:30">
                                </div>
                          </div>  
                          

                          <div class="mt-3"> 
                                    <h3> Tiempo de atencion: </h3>
                                    <select class="form-select form-control-lg" aria-label="Default" id="time" name="form_app_duration" v-model="form_app_duration">
                                        <option value="10">10 Minutos </option>
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
                            </div>


                            <div class="mt-3">
                                <h3>Tiempo entre citas </h3>
                                    <select class="form-select form-control-lg" aria-label="Default" id="time" name="form_app_time_between" v-model="form_app_time_between">
                                        <option value="0">0 Minutos </option>
                                        <option value="5">5 Minutos </option>
                                        <option value="10">10 Minutos </option>
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
                            </div>

                            <div class="mt-3">

                                <h2>Dias Recurrencia</h2>

                                <label class="checkbox-inline"><input type="checkbox" value="true" v-model="form_recurrency_mon"  >Lunes</label>
                                <label class="checkbox-inline"><input type="checkbox" value="true" v-model="form_recurrency_tue" >Martes</label>
                                <label class="checkbox-inline"><input type="checkbox" value="true" v-model="form_recurrency_wed" >Miercoles</label>
                                <label class="checkbox-inline"><input type="checkbox" value="true" v-model="form_recurrency_thu" >Jueves</label>
                                <label class="checkbox-inline"><input type="checkbox" value="true" v-model="form_recurrency_fri" >Viernes</label>
                                <label class="checkbox-inline"><input type="checkbox" value="true" v-model="form_recurrency_sat" >Sabado</label>
                                <label class="checkbox-inline"><input type="checkbox" value="true" v-model="form_recurrency_sun" >Domingo</label>
                            </div>

                          <div class="mt-3">
                          <h2>Fecha Inicio de este horario</h2>
                            <div class="row  mb-1  border-secondary ">
                              <div class="col">
                                  <input  v-model="form_calendar_start" :min="form_minimum_date" type="date" id="form_calendar_start" name="form_calendar_start" class="form-control form-control-lg border border-primary" >
                              </div>
                            </div>
                          </div>



                          <h2>Fecha Fin de este horario</h2>
                            <div class="row  mb-1  border-secondary ">
                              <div class="col">
                                  <input  v-model="form_calendar_end" :min="form_minimum_date" type="date" id="form_calendar_end" name="form_calendar_end" class="form-control form-control-lg border border-primary" >
                              </div>
                            </div>
        <!--
                          <h2>Tipo de Cita:</h2>
                                <div class="radio">
                                  <label><input v-model="form_appointment_center" type="checkbox"  @click="form_appointment_home = false;  form_appointment_center = true "   >En Consulta</label>
                                </div>
                                <div class="radio">
                                  <label><input v-model="form_appointment_home" type="checkbox" @click="form_appointment_center = false; form_appointment_home = true "  >A Domicilio</label>
                                </div>
                              
                          
                        <div v-if="form_appointment_center" class="border border-2 p-2" >
                                Seleccione Centro de Atencion 
                                <InputFormCenterProfessional class="m-3" v-on:centersError='centersError' v-on:selectedCenterCode="selectedCenterCode" :session_params="session_params" v-on:switchView="switchView" > </InputFormCenterProfessional> 
                                <br>
                        </div>

                        <div v-if="form_appointment_home" class="border border-2 p-2" >
                                Comunas en las que atiende a Domicilio (Máximo 6). 
                                <InputFormComunaProfessional class="m-3" v-on:selectedComunas="selectedComunas" :global_comunas="global_comunas"  ></InputFormComunaProfessional>    
                                <br>  
                        </div>

        -->
                        <button type="button" @click="createNewCalendar" class="btn btn-primary m-3" >Crear Calendario </button>
                        
                    </div>
                    <div v-else>
                        Debe primero crear una Consulta
                    </div>

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
   /*position: static;  */
   /*position: static; */
	/*position: relative; */ 
	/*position: absolute; */ 
	position: fixed; 
	/*position: sticky; */
 /* position: fixed;  */
 /* display: block; */ 
   display: flex; 

}

/*
.modal div {
  display: flex; 
  flex-direction: column; 

}
*/

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

/*
.modal-background {
    background-color:#DAEFF3
        }
*/
/************************* */



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
  margin: 20px 0;
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

export default {

data: function () {
		return {
			      showModalCreateCalendar  : false ,

            form_start_time : '00:00', 
            form_end_time : '00:00' ,

            form_specialty_id : null ,
            form_app_duration : null ,
            form_app_time_between : null ,
            form_calendar_start: null ,
            form_minimum_date : null ,
            form_calendar_end: null ,
            form_appointment_center: false ,
            form_appointment_home : false ,
            form_appointment_remote : false , 
            //form_appoirntment_recurrency : [],
            form_recurrency_mon : false  , 
            form_recurrency_tue : false , 
            form_recurrency_wed : false , 
            form_recurrency_thu : false , 
            form_recurrency_fri : false , 
            form_recurrency_sat : false , 
            form_recurrency_sun : false , 

            form_comunas_id : [] ,
            form_center_code  : null ,
            
            specialties : [] , 
            needsCreateCenter : null ,
            
            //required by timepicker
            time : null ,

            centers_found_flag : false ,


		 }
	},

	props: ['session_params','activatorCreateNewCalendar','global_comunas' , 'global_specialties' ],
  emits: ['updateCalendarList','switchView'],

    created () {
      console.log("created modalCreateCalendar");
      this.getSpecialties(); 
    },

    mounted () {
      console.log("mounted modalCreateCalendar");
         },
 
    methods: {
      centers_found_flag_emit(val)
      {
      console.log("centers_found_flag_emit : "+val);
      this.centers_found_flag=val
      },
      
      switchView(){
            this.$emit('switchView');
      },

      selectedCenterCode(value)
      {
      console.log("Center selected code: "+value);
      this.form_center_code = value ;
      },

      selectedComunas(value)
      {
      console.log("capture emit comuna List "+JSON.stringify(value));
      let aux=JSON.parse(value) ;
      this.form_comunas_id = [] ;
          for (let i = 0 ; i < aux.length ; i++) {
             this.form_comunas_id.push( aux[i].id );
          }
          console.log("Comuna id array:"+this.form_comunas_id );
      },

      centersError(value) {
      console.log("centersError In modal "+value);
      this.needsCreateCenter = value ; 
      },

        async getSpecialties(){
                console.log ("getSpecialties :" );
                const json = { 
                   professional_id: this.session_params.professional_id ,
                  // professional_id : 1 ,
                   };

                console.log("getSpecialties REQUEST :"+JSON.stringify(json));
                let response_json = await axios.post("http://localhost:8080"+"/get_professional_specialty",json);
                console.log ("getSpecialties  RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                this.specialties= response_json.data.rows ; 
        },

        async createNewCalendar(){
                console.log("createNewCalendar Request JSON");
                console.log ("createNewCalendar :" );

              const json = { 
               
                form_start_time : this.form_start_time ,
                form_end_time : this.form_end_time ,
                form_specialty_id : this.form_specialty_id, 
                form_app_duration : this.form_app_duration ,
                form_app_time_between : this.form_app_time_between ,

                form_recurrency_mon : this.form_recurrency_mon, 
                form_recurrency_tue : this.form_recurrency_tue , 
                form_recurrency_wed : this.form_recurrency_wed , 
                form_recurrency_thu : this.form_recurrency_thu , 
                form_recurrency_fri : this.form_recurrency_fri , 
                form_recurrency_sat : this.form_recurrency_sat , 
                form_recurrency_sun : this.form_recurrency_sun , 

                form_calendar_start: this.form_calendar_start ,
                form_calendar_end: this.form_calendar_end ,
                form_appointment_center: this. form_appointment_center ,
                form_appointment_home: this.form_appointment_home ,
                form_appointment_remote: this.form_appointment_remote ,

                form_appointment_home_locations: this.form_comunas_id ,
                form_appointment_center_code: this.form_center_code ,
                
                professional_id: this.session_params.professional_id ,
                          };

              console.log("REQUEST :"+JSON.stringify(json));
              
            
              let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_create_calendar",json);
              console.log ("RESPONSE:"+JSON.stringify(response_json.data)) ;
              this.$emit('updateCalendarList');  
              this.showModalCreateCalendar = false ;    
            
               
              
        },


	    },
    
    watch : {
        
        activatorCreateNewCalendar (newValue){
            console.log ("showModalCreateCalendar !!!"+newValue );  
            this.showModalCreateCalendar = true ;
           this.specialties=this.getSpecialties();
        },
    },
    


}
</script>

