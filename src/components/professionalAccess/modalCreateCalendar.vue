<script setup>
import { ref } from 'vue'
import axios from 'axios';
import inputFormComuna from  '../publicSearch/InputFormComuna.vue'
import GenericBlockDateSpecialtyVue from '../GenericBlockDateSpecialty.vue';


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
                   
                  <text>Tiempo de este horario </text> 
                    
                    <div class="form-group">
                            <label for="exampleInputEmail1">Hora Inicio </label>
                            <input type="text" class="form-control" autocomplete="off" id="form_start_time" name="form_start_time" v-model="form_start_time"  placeholder="ejemplo 14:30">
                    </div>
                    
                    <div class="form-group">
                            <label for="exampleInputEmail1">Hora Fin </label>
                            <input type="text" class="form-control" autocomplete="off" id="form_end_time" name="form_end_time" v-model="form_end_time"  placeholder="ejemplo 19:30">
                    </div>
                    
                    <div class="form-group">
                            <label for="exampleInputEmail1">Especialidad </label>
                            {{ JSON.stringify(specialties) }}
                            <select   v-model="form_specialty" class="form_specialty" id="form_specialty" >
                                <option v-for="specialty in specialties" :key="specialty.id">
                                  {{ specialty.name }}
                                </option>
                            </select>
                    </div>

                    <br>
                    <h2> Tiempo de atencion: </h2>
                            <select class="form-select form-control-lg" aria-label="Default" id="time" name="form_app_duration" v-model="form_app_duration">
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
                    <h3>Tiempo entre citas </h3>
                            <select class="form-select form-control-lg" aria-label="Default" id="time" name="form_app_time_between" v-model="form_app_time_between">
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
                   
                  <h2>Recurrencia</h2>
                  <label class="checkbox-inline"><input type="checkbox" value="">Lunes</label>
                  <label class="checkbox-inline"><input type="checkbox" value="">Martes</label>
                  <label class="checkbox-inline"><input type="checkbox" value="">Miercoles</label>
                  <label class="checkbox-inline"><input type="checkbox" value="">Jueves</label>
                  <label class="checkbox-inline"><input type="checkbox" value="">Viernes</label>
                  <label class="checkbox-inline"><input type="checkbox" value="">Sabado</label>
                  <label class="checkbox-inline"><input type="checkbox" value="">Domingo</label>


                  <h2>Fecha Inicio de este horario</h2>
                    <div class="row  mb-1  border-secondary ">
                      <div class="col">
                          <input  v-model="form_calendar_start" :min="form_minimum_date" type="date" id="form_calendar_start" name="form_calendar_start" class="form-control form-control-lg border border-primary" >
                      </div>
                    </div>

                  <h2>Fecha Fin de este horario</h2>
                    <div class="row  mb-1  border-secondary ">
                      <div class="col">
                          <input  v-model="form_calendar_end" :min="form_minimum_date" type="date" id="form_calendar_end" name="form_calendar_end" class="form-control form-control-lg border border-primary" >
                      </div>
                    </div>

                  <h2>Tipo de Cita:</h2>
                        <div class="radio">
                          <label><input v-model="form_appointment_center" type="radio" name="optradio" checked>En Consulta</label>
                        </div>
                        <div class="radio">
                          <label><input v-model="form_appointment_home" type="radio" name="optradio">A Domicilio</label>
                        </div>
                        <div class="radio disabled">
                          <label><input v-model="form_appointment_remote" type="radio" name="optradio" disabled>Tele Atención</label>
                        </div>

                       <button type="button" @click="createNewCalendar" class="btn btn-primary m-3" >Crear Calendario </button>
                 
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
            form_app_duration :null, 
            form_start_time : null, 
            form_end_time : null ,

            form_specialty : null ,
            form_app_duration : null ,
            form_app_time_between : null ,
            form_calendar_start: null ,
            form_minimum_date : null ,
            form_calendar_end: null ,
            form_appointment_center: null ,
            form_appointment_home : null ,
            form_appointment_remote : null ,  
            
            specialties : [] , 
		 }
	},

	props: ['session_params','activatorCreateNewCalendar','global_comunas'],
    emits: ['updateCenterList'],

    created () {
      console.log("created modalCreateCalendar");
      this.getSpecialties(); 
    },

    mounted () {
      console.log("mounted modalCreateCalendar");
         },
 
    methods: {
        async getSpecialties(){
                console.log ("getSpecialties :" );
                const json = { 
                  //professional_id: this.session_params.professional_id ,
                   professional_id : 1 ,
                   };

                console.log("getSpecialties REQUEST :"+JSON.stringify(json));
                let response_json = await axios.post("http://192.168.0.110:8080"+"/get_professional_specialty",json);
                console.log ("getSpecialties  RESPONSE:"+JSON.stringify(response_json.data)) ;
                this.specialties= response_json.data ; 
        },

        createNewCalendar(){
                console.log("createNewCalendar Request JSON");
                console.log ("createNewCalendar :" );

              const json = { 
                app_duration : this.form_app_duration ,
                start_time : this.form_start_time ,
                end_time : this.form_end_time ,
                form_specialty : this.form_specialty, 
                form_app_duration : this.form_app_duration ,
                form_app_time_between : this.form_app_time_between ,
                form_calendar_start: this.form_calendar_start ,
                form_minimum_date: this.form_minimum_date ,
                form_calendar_end: this.form_calendar_end ,
                form_appointment_center: this. form_appointment_center ,
                form_appointment_home: this.form_appointment_home ,
                form_appointment_remote: this.form_appointment_remote ,
                
                professional_id: 1 ,
                          };

              console.log("REQUEST :"+JSON.stringify(json));
              /*
              let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_create_center",json);
              console.log ("RESPONSE:"+JSON.stringify(response_json.data)) ;
              this.$emit('updateCenterList');  
              this.showModalCreate = false ;    
              
              let restemp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_shutdown_firstlogin",json);
              this.session_params.first_time = false ;   
              */
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

