<script setup>
import { ref } from 'vue'
import axios from 'axios';
import inputFormComuna from  './InputFormComuna2.vue'
import GenericBlockDateSpecialtyVue from '../GenericBlockDateSpecialty.vue';
import InputFormCenterProfessional from './inputFormCenterProfessional.vue';
import InputFormComunaProfessional from './inputFormComunaProfessional.vue' ;
import Datepicker from 'vuejs3-datepicker';


</script>

<template>

     	<teleport to="body"   >
		<div  v-if="showModalCreateCalendar" class="modal bg-secondary scroll" >
		    <transition name="modal">
			<div class="modal-mask ">
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-1 modal-background">
 
                <div class="modal-header">
                        <div class="text-secondary  display-5">
                        Crear Calendario
                        </div>
                        <div class="p-1 "><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalCreateCalendar = false"  aria-label="Close"></i>
                        </div>
                </div>

                <div class="modal-body mt-0"  > 
                
                    <div v-if="centers_found_flag" >
                
                          <div class="form-group mt-3 h3">
                                    <label for="exampleInputEmail1">Especialidad </label><br>
                                        <select   v-model="form_specialty_id" class="form_specialty_id form-control " id="form_specialty_id" >
                                        <option v-for="specialty in specialties" :key="specialty.id" :value="specialty.id">
                                          {{ specialty.name }} 
                                        </option>
                                        </select>
                          </div>

                          <div class="form-group mt-3 h3 ">
                                    <label for="exampleInputEmail1">Lugar de atencion ( X Y Z) </label>
                                    <InputFormCenterProfessional  v-on:centers_found_flag_emit='centers_found_flag_emit' v-on:centersError='centersError' v-on:selectedCenterCode="selectedCenterCode" :session_params="session_params" v-on:switchView="switchView" > </InputFormCenterProfessional> 
                          </div>

                          <div class="mt-2"> 

                          <label class="h3">Horas </label>
                                <!-- hora inicio -->
                                <div class="form-group d-flex justify-content-between">
                                        <label for="exampleInputEmail1">Hora Inicio </label>
                                        <!--<input type="time" id="form_start_time" name="form_start_time" v-model="form_start_time" min="00:00" max="23:59" required>
                                        -->
                                        <div @click="show_start_hour=!show_start_hour ; show_start_minutes=false" class="border border-1 p-3 border-primary">
                                         <text >{{start_hour}}</text> 
                                        </div>
                                        <div class="p-3">:</div>
                                        <div @click="show_start_minutes=!show_start_minutes" class="border border-1 p-3 border-primary">
                                          <text >{{start_minutes}}</text>
                                        </div>
                                        <div class="p-3">hrs</div>
                                </div>

                                
 <div v-if="show_start_hour">
  <table class="table caption-top">
  <caption>Seleccione Hora Inicio</caption>
  <tbody class="border border-primary">
    <tr>
      <td @click="start_hour='00'; show_start_hour=false" class="border border-primary p-2 text-center">00</td>
      <td @click="start_hour='01'; show_start_hour=false" class="border border-primary p-2 text-center">01</td>
      <td @click="start_hour='02'; show_start_hour=false"  class="border border-primary p-2 text-center">02</td>
      <td @click="start_hour='03'; show_start_hour=false"  class="border border-primary p-2 text-center">03</td>
      <td @click="start_hour='04'; show_start_hour=false"  class="border border-primary p-2 text-center">04</td>
      <td @click="start_hour='05'; show_start_hour=false"  class="border border-primary p-2 text-center">05</td>
    </tr>
    <tr>
      <td @click="start_hour='06'; show_start_hour=false" class="border border-primary text-center">06</td>
      <td @click="start_hour='07'; show_start_hour=false" class="border border-primary text-center">07</td>
      <td @click="start_hour='08'; show_start_hour=false" class="border border-primary text-center">08</td>
      <td @click="start_hour='09'; show_start_hour=false" class="border border-primary text-center">09</td>
      <td @click="start_hour='10'; show_start_hour=false" class="border border-primary text-center">10</td>
      <td @click="start_hour='11'; show_start_hour=false" class="border border-primary text-center">11</td>
    </tr>
    <tr>
      <td @click="start_hour='12'; show_start_hour=false" class="border border-primary text-center">12</td>
      <td @click="start_hour='13'; show_start_hour=false" class="border border-primary text-center">13</td>
      <td @click="start_hour='14'; show_start_hour=false" class="border border-primary text-center">14</td>
      <td @click="start_hour='15'; show_start_hour=false" class="border border-primary text-center">15</td>
      <td @click="start_hour='16'; show_start_hour=false" class="border border-primary text-center">16</td>
      <td @click="start_hour='17'; show_start_hour=false" class="border border-primary text-center">17</td>
    </tr>
    <tr>
      <td @click="start_hour='18'; show_start_hour=false" class="border border-primary text-center">18</td>
      <td @click="start_hour='19'; show_start_hour=false" class="border border-primary text-center">19</td>
      <td @click="start_hour='20'; show_start_hour=false" class="border border-primary text-center">20</td>
      <td @click="start_hour='21'; show_start_hour=false" class="border border-primary text-center">21</td>
      <td @click="start_hour='22'; show_start_hour=false" class="border border-primary text-center">22</td>
      <td @click="start_hour='23'; show_start_hour=false" class="border border-primary text-center">23</td>
    </tr>
  </tbody>
  </table>
</div>
                                
<div v-if="show_start_minutes">
  <table class="table caption-top">
  <caption>Seleccione Minutos</caption>
  <tbody class="border border-primary">
    <tr>
      <td @click="start_minutes='05'; show_start_minutes=false" class="border border-primary p-2 text-center">05</td>
      <td @click="start_minutes='10'; show_start_minutes=false" class="border border-primary p-2 text-center">10</td>
      <td @click="start_minutes='15'; show_start_minutes=false" class="border border-primary p-2 text-center">15</td>
      <td @click="start_minutes='20'; show_start_minutes=false" class="border border-primary p-2 text-center">20</td>
      <td @click="start_minutes='25'; show_start_minutes=false" class="border border-primary p-2 text-center">25</td>
      <td @click="start_minutes='30'; show_start_minutes=false" class="border border-primary p-2 text-center">30</td>
    </tr>
    <tr>
      <td @click="start_minutes='35'; show_start_minutes=false" class="border border-primary text-center">35</td>
      <td @click="start_minutes='40'; show_start_minutes=false" class="border border-primary text-center">40</td>
      <td @click="start_minutes='45'; show_start_minutes=false" class="border border-primary text-center">45</td>
      <td @click="start_minutes='50'; show_start_minutes=false" class="border border-primary text-center">50</td>
      <td @click="start_minutes='55'; show_start_minutes=false" class="border border-primary text-center">55</td>
      <td class="border border-primary text-center">--</td>
    </tr>
  </tbody>
  </table>
</div>
<!-- END START HOUR--> 

<!-- END HOUR -->
                                  <div class="mt-4 form-group d-flex justify-content-between">
                                        <label for="exampleInputEmail1">Hora Fin </label>
                                        <!--<input type="time" id="form_start_time" name="form_start_time" v-model="form_start_time" min="00:00" max="23:59" required>
                                        -->
                                        <div @click="show_end_hour=!show_end_hour; show_end_minutes = false" class="border border-1 p-3 border-primary">
                                         <text >{{end_hour}}</text> 
                                        </div>
                                        <div class="p-3">:</div>
                                        <div @click="show_end_minutes=!show_end_minutes" class="border border-1 p-3 border-primary">
                                          <text >{{end_minutes}}</text>
                                        </div>
                                        <div class="p-3">hrs</div>
                                </div>
                                
<div v-if="show_end_hour">
  <table class="table caption-top">
  <caption>Seleccione Hora Termino</caption>
  <tbody class="border border-primary">
    <tr>
      <td @click="end_hour='00'; show_end_hour=false" class="border border-primary p-2 text-center">00</td>
      <td @click="end_hour='01'; show_end_hour=false" class="border border-primary p-2 text-center">01</td>
      <td @click="end_hour='02'; show_end_hour=false"  class="border border-primary p-2 text-center">02</td>
      <td @click="end_hour='03'; show_end_hour=false"  class="border border-primary p-2 text-center">03</td>
      <td @click="end_hour='04'; show_end_hour=false"  class="border border-primary p-2 text-center">04</td>
      <td @click="end_hour='05'; show_end_hour=false"  class="border border-primary p-2 text-center">05</td>
    </tr>
    <tr>
      <td @click="end_hour='06'; show_end_hour=false" class="border border-primary text-center">06</td>
      <td @click="end_hour='07'; show_end_hour=false" class="border border-primary text-center">07</td>
      <td @click="end_hour='08'; show_end_hour=false" class="border border-primary text-center">08</td>
      <td @click="end_hour='09'; show_end_hour=false" class="border border-primary text-center">09</td>
      <td @click="end_hour='10'; show_end_hour=false" class="border border-primary text-center">10</td>
      <td @click="end_hour='11'; show_end_hour=false" class="border border-primary text-center">11</td>
    </tr>
    <tr>
      <td @click="end_hour='12'; show_end_hour=false" class="border border-primary text-center">12</td>
      <td @click="end_hour='13'; show_end_hour=false" class="border border-primary text-center">13</td>
      <td @click="end_hour='14'; show_end_hour=false" class="border border-primary text-center">14</td>
      <td @click="end_hour='15'; show_end_hour=false" class="border border-primary text-center">15</td>
      <td @click="end_hour='16'; show_end_hour=false" class="border border-primary text-center">16</td>
      <td @click="end_hour='17'; show_end_hour=false" class="border border-primary text-center">17</td>
    </tr>
    <tr>
      <td @click="end_hour='18'; show_end_hour=false" class="border border-primary text-center">18</td>
      <td @click="end_hour='19'; show_end_hour=false" class="border border-primary text-center">19</td>
      <td @click="end_hour='20'; show_end_hour=false" class="border border-primary text-center">20</td>
      <td @click="end_hour='21'; show_end_hour=false" class="border border-primary text-center">21</td>
      <td @click="end_hour='22'; show_end_hour=false" class="border border-primary text-center">22</td>
      <td @click="end_hour='23'; show_end_hour=false" class="border border-primary text-center">23</td>
    </tr>
  </tbody>
  </table>
</div>
                                
<div v-if="show_end_minutes">
  <table class="table caption-top">
  <caption>Seleccione Minutos</caption>
  <tbody class="border border-primary">
    <tr>
      <td @click="end_minutes='05'; show_end_minutes=false" class="border border-primary p-2 text-center">05</td>
      <td @click="end_minutes='10'; show_end_minutes=false" class="border border-primary p-2 text-center">10</td>
      <td @click="end_minutes='15'; show_end_minutes=false" class="border border-primary p-2 text-center">15</td>
      <td @click="end_minutes='20'; show_end_minutes=false" class="border border-primary p-2 text-center">20</td>
      <td @click="end_minutes='25'; show_end_minutes=false" class="border border-primary p-2 text-center">25</td>
      <td @click="end_minutes='30'; show_end_minutes=false" class="border border-primary p-2 text-center">30</td>
    </tr>
    <tr>
      <td @click="end_minutes='35'; show_end_minutes=false" class="border border-primary text-center">35</td>
      <td @click="end_minutes='40'; show_end_minutes=false" class="border border-primary text-center">40</td>
      <td @click="end_minutes='45'; show_end_minutes=false" class="border border-primary text-center">45</td>
      <td @click="end_minutes='50'; show_end_minutes=false" class="border border-primary text-center">50</td>
      <td @click="end_minutes='55'; show_end_minutes=false" class="border border-primary text-center">55</td>
      <td class="border border-primary text-center">--</td>
    </tr>
  </tbody>
  </table>
</div>



                                <!--                                
                                <div class="form-group d-flex justify-content-between mt-3">
                                        <label for="exampleInputEmail1">Hora Fin </label>
                                        <input type="time" id="form_end_time" name="form_end_time" v-model="form_end_time" min="00:00" max="23:59" required>
                                </div>
                                -->

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

                          <h2>Fechas Calendario</h2>
                          <!-- FECHA INICIO CALENDARIO-->
                            
                            <div class="row  mb-1  border-secondary d-flex justify-content-between border-primary">
                              <div class="h5">
                              Fecha Inicio
                              </div>

                              <div @click="show_date_start=!show_date_start"  >
                                {{formatDate(form_calendar_start)}} 
                              </div>
                              <!--
                              <div class="col">
                                  <input  v-model="form_calendar_start" :min="form_minimum_date" type="date" id="form_calendar_start" name="form_calendar_start" class="form-control form-control-lg border border-primary" >
                              </div>
                              -->
                            </div>
                        
                           <!-- DATE PICKER FECHA INICIO CALENDARIO -->
                          <div v-if="show_date_start">
                              <datepicker :forceUpdate="forceUpdateCalendar" :key="componentKey" ref="inputRef"  @selected="setCalendarStart" :monday-first="true" :inline="true" v-model="form_calendar_start" :calendar-button="false" input-class='bigText' format="dd"  calendar-button-icon="nada"  name="uniquename"></datepicker>
                          </div>


                      
                            <div class="row  mb-1  border-secondary ">
                               <div class="col-3 h5">
                              Fecha Termino
                              </div>
                              <div class="col">
                                  <input  v-model="form_calendar_end" :min="form_minimum_date" type="date" id="form_calendar_end" name="form_calendar_end" class="form-control form-control-lg border border-primary" >
                              </div>
                            </div>


                            <div class="row  mb-1  border-secondary ">
                                <div class="col-3 h5">
                                  Color
                                </div>
                                <div  class="col-9 border border-primary" :style="{ 'background-color' : form_calendar_color  }" >
                                  <p @click="showColorSelection=!showColorSelection" class="text-end pt-2 h5"> <i><small>Seleccione</small></i> </p>
                                </div>
                            
                            </div>
                            <!--Select Color -->
                            <div v-if="showColorSelection" >
                                                           
                              <div class="d-flex justify-content-end border border-1">
                                  <div v-for="color in calendarColorArray" :key="color" :value="color" >
                                          <div @click="form_calendar_color=color ; showColorSelection=true" class="text-end border border-1 border-primary m-2 p-2"  :style="{ 'background-color' : color  }"> 
                                              <text class="" >&nbsp;&nbsp;&nbsp;</text> 
                                          </div> 
                                  </div>
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
                      <i class="bi bi-exclamation-circle display-1"></i>
                      <br>
                        Para crear un Horario debe existir al menos una Consulta. <i class="bi bi-geo-alt"></i>
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
            show_start_hour : false ,
            start_hour : '00' ,
            show_start_minutes : false ,
            start_minutes : '05' ,
            
            
            show_end_hour : false ,
            end_hour : '23' ,
            show_end_minutes : false ,
            end_minutes : '55' ,
            
			      showModalCreateCalendar  : false ,

            form_start_time : '00:00', 
            form_end_time : '00:00' ,

            form_specialty_id : null ,
            form_app_duration : null ,
            form_app_time_between : null ,

            form_calendar_start: null ,
            show_date_start : false ,

            form_minimum_date : null ,

            show_date_end : false ,
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
            form_calendar_color : null ,

            specialties : [] , 
            needsCreateCenter : null ,
            
            //required by timepicker
            time : null ,

            centers_found_flag : true ,
            
            calendarColorArray : ["#FCFFE9","#FFF2CC","#CAEFD1", "#FDE0D9", "#CAF4F4", "#cbc9e1"],
            
            showColorSelection : true ,

		 }
	},

	props: ['session_params','activatorCreateNewCalendar','global_comunas' , 'global_specialties' ],
  emits: ['updateCalendarList','switchView'],

    created () {
      console.log("created modalCreateCalendar");
      this.getSpecialties(); 
      let current_date = new Date()
      this.form_calendar_start=current_date.getDate()+"/"+current_date.getMonth()+1+"/"+ current_date.getFullYear()
       
    },

    mounted () {
      console.log("mounted modalCreateCalendar");
         },
 
    methods: {
      
      setCalendarStart(date)
      {
        console.log("date Selected en emit :"+date);
        let aux_date=new Date(date);
        this.form_calendar_start=aux_date.getDate()+"/"+aux_date.getMonth()+1+"/"+ aux_date.getFullYear()
       // this.show_date_picker =false ;
       // this.forceUpdateCalendar += 1 ; 
      },


      formatDate(val)
      {
        
        let aux_date=new Date(date);
        let response= aux_date.getDate()+"/"+aux_date.getMonth()+1+"/"+ aux_date.getFullYear()
        return response
      },

      centers_found_flag_emit(val)
      {
      console.log("MODAL CREATE CALENDAR centers_found_flag_emit : "+val);
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
                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/get_professional_specialty",json);
                console.log ("getSpecialties  RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                this.specialties= response_json.data.rows ; 
        },

        async createNewCalendar(){
                console.log("createNewCalendar Request JSON");
                console.log ("createNewCalendar :" );

                let end_date_corrected = new Date(this.form_calendar_end)
                end_date_corrected.setHours(0,0,0,0)
                //one milisecond to dont reach next day
                var day = (60 * 60 * 24 * 1000 )-1000;
                end_date_corrected = new Date(end_date_corrected.getTime() + (day*2) )  
                
                let start_date_corrected = new Date(this.form_calendar_start)
                start_date_corrected.setHours(24,0,0,0)
                //start_date_corrected = new Date(start_date_corrected.getTime() + (day) )    
/*
                let end_date_correct =             
                var day = 60 * 60 * 24 * 1000;
                var endDate = new Date(startDate.getTime() + day);
*/
              const json = { 
            
                form_calendar_start: start_date_corrected ,
                form_calendar_end: end_date_corrected , 
                 
                //form_start_time : this.form_start_time,
                //form_end_time : this.form_end_time ,
                form_start_time : this.start_hour+":"+this.start_minutes  ,
                form_end_time : this.end_hour+":"+this.end_minutes ,
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

                form_appointment_center: this. form_appointment_center ,
                form_appointment_home: this.form_appointment_home ,
                form_appointment_remote: this.form_appointment_remote ,

                form_appointment_home_locations: this.form_comunas_id ,
                form_appointment_center_code: this.form_center_code ,
                
                form_calendar_color : this.form_calendar_color ,

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
            
            this.form_calendar_color = this.calendarColorArray[Math.floor(Math.random() * 6)]
 
            this.specialties=this.getSpecialties();
        },
    },
    


}
</script>

