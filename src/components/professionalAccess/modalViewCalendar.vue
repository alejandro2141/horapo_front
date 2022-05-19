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
		  <div  v-if="showModalViewCalendar" class="modal bg-secondary scroll" >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-1 modal-background ">
 
                <div class="modal-header " :style="{ 'background-color' : calendar_details.color   }" >
                        <div class="h4">  <p> Configuracion  Calendario</p>
                        </div>
                        
                        <div class="p-1 "><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalViewCalendar = false ; $emit('updateCalendarList'); "  aria-label="Close"></i>
                        </div>
                </div>

                <div class="modal-body mt-0"> 
            <!--
                  <h5 class="card-title h2 p-2"  >   {{idSpecialty2name(calendar_details.specialty1) }}  
                  </h5>
            -->


                <div  v-if="calendar_details.calendar_active"  >
                    <div class="d-flex justify-content-between"> 
                          <text class=""> Estado  Actual</text>   <text class="text-success">  ENCENDIDO </text>
                    </div>
                    <br>   
                    <button type="button" class="btn btn-danger"  @click="inactiveCalendar(calendar_details)" > Apagar Calendario</button>
                    <br>
                    <text class="text-dark">
                        <i class="bi bi-exclamation-circle"></i> Si apaga este calendario, los pacientes ya no podran agendar Citas en este calendario.
                    </text>
                </div>
            
             
                <!-- APAGADO -->
                <div  v-else  >
                  <div>
                        <div class="d-flex justify-content-between mb-2"> 
                          <text class=""> Estado  Actual</text>   <text class="text-danger"> APAGADO </text>
                        </div>
                        
                        <div class="d-flex justify-content-between"> 
                          <text></text>
                          <button type="button" class="btn btn-success"  @click="activeCalendar(calendar_details)"  >Encender Calendario</button>
                        </div>
                        
                        <text class="text-dark">
                        <i class="bi bi-exclamation-circle"></i> Este calendario debe estar encendido para que pacientes puedan agendar citas en este calendario.
                        </text>
                  </div>
                </div>
                  
                  <div class="d-flex justify-content-between mt-2">
                    
                    <text>
                      Lugar de Consulta
                    </text>
                    
                    <text class="text-primary" @click="showCenters=!showCenters">
                    <i class="bi bi-geo-alt"></i> {{calendar_details.name}} 
                     </text>
                  </div>  
 
                  <div v-if="showCenters" class="bg-light p-2 border border-1" >
                      <InputFormCenterProfessional  v-on:centers_found_flag_emit='centers_found_flag_emit' v-on:centersError='centersError' v-on:selectedCenterCode="selectedCenterCode" :session_params="session_params" v-on:switchView="switchView" > </InputFormCenterProfessional> 

                    <p class="text-end text-primary">
                      <text @click="showCenters=!showCenters">Guardar</text>
                    </p>

                  </div>  




                  <div class="d-flex justify-content-between mt-2">
                    <text>
                    Fecha Inicio 
                    </text>
                    <text class="text-primary" @click="showSaveStartDate=!showSaveStartDate">
                    {{calendar_details.date_start.substring(0,10) }} 
                    </text>
                  </div>

                  <div v-if="showSaveStartDate" class="bg-light p-2 border border-1" >
                    <p class="text-end text-primary">
                      <text @click="showSaveStartDate=!showSaveStartDate">Guardar</text>
                    </p>

                  </div> 


                  <div class="d-flex justify-content-between mt-2">
                    <text>
                    Fecha Fin
                    </text>
                    <text class="text-primary">
                    {{calendar_details.date_end.substring(0,10) }} 
                    </text>
                  </div>

                  <div class="d-flex justify-content-between mt-2">
                    <text>
                    Hora Inicio
                    </text>
                    <text class="text-primary">
                    {{calendar_details.start_time.substring(0,5)}}
                    </text>
                  </div>

                  <div class="d-flex justify-content-between mt-2">
                    <text>
                    Hora Fin
                    </text>
                    <text class="text-primary">
                    {{calendar_details.end_time.substring(0,5)}}
                    </text>
                  </div>                 
                 

                <div class="mt-1">
                  Dias Recurrencia: <br>

                                        <text class="d-flex justify-content-end" v-if="calendar_details.monday"> Lunes <br> </text> 
                                        <text class="d-flex justify-content-end" v-if="calendar_details.tuestday"> Martes  <br> </text> 
                                        <text class="d-flex justify-content-end"  v-if="calendar_details.wednesday"> Miercoles  <br> </text> 
                                        <text class="d-flex justify-content-end"  v-if="calendar_details.thursday"> Jueves  <br> </text> 
                                        <text class="d-flex justify-content-end"  v-if="calendar_details.friday"> Viernes <br> </text> 
                                        <text class="d-flex justify-content-end"  v-if="calendar_details.saturday"> Sabado <br> </text> 
                                        <text class="d-flex justify-content-end"  v-if="calendar_details.sunday"> Domingo <br> </text> 
                  </div>


               <br>
               <hr>
               
               

                <div   class="">
                  <button v-if="!calendar_details.calendar_active" type="button" @click="deleteCalendar(calendar_details)" class="btn btn-danger"> <i class="bi bi-trash "></i> Eliminar Calendario </button>    
                  <br>
                  <i class="bi bi-exclamation-circle"></i>Si elimina, este calendario ya no estará disponible en el sistema 
                </div>



                 <br>
                 <br>
                 <p>
                  <text @click="showModalViewCalendar = false ; $emit('updateCalendarList');"  aria-label="Close" class="text-primary mt-3">Regresar</text>
                 </p>

                  <br>
                  <text class="text-white" >  ID#{{calendar_details.id}} </text> 
                  <br>

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
			      showModalViewCalendar  : false ,
            showCenters : false, 
            showSaveStartDate : false,
		 }
	},

	props: ['session_params','activatorViewCalendar','global_comunas','calendar_details', 'global_specialties'],
    emits: ['updateCalendarList','switchView'],

    created () {
    },

    mounted () {
         },
 
    methods: {

       async deleteCalendar(calendar_details){
          console.log("Professional delete Calendar")
         
           var r =confirm("¿ Esta seguro que desea eliminar este HORARIO? Ok para continuar");
            if (r == true) {

                  const json = { 
                    professional_id: this.session_params.professional_id ,
                    calendar_id :  calendar_details.calendar_id,
                    };

                  console.log("Delete Calendar REQUEST :"+JSON.stringify(json));
                  let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_delete_calendar",json);
                  console.log ("Activate Calendar RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                  let aux_resp = response_json.data.rows ; 
                  this.showModalViewCalendar = false ; 
                  this.$emit('updateCalendarList'); 
            }


      },

       idSpecialty2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
        },
        
        switchView(){
              this.$emit('switchView');
                  },

        async activeCalendar(calendar_details)
        {
          console.log("Activate Calendar")
         
           var r =confirm("¿ ACTIVAR este Calendario? Si acepta, sus horas quedaran visibles para el publico. Ok para continuar");
            if (r == true) {

                  const json = { 
                    professional_id: this.session_params.professional_id ,
                    calendar_id :  calendar_details.calendar_id,
                    };

                  console.log("Activate Calendar REQUEST :"+JSON.stringify(json));
                  let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_activate_calendar",json);
                  console.log ("Activate Calendar RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                  let aux_resp = response_json.data.rows ; 
                  this.showModalViewCalendar = false ; 
                  this.$emit('updateCalendarList'); 
            }


        },

        async inactiveCalendar(calendar_details)
        {
          console.log("INActivate Calendar")
        var r =confirm("¿ DESACTIVAR este Calendario? Si acepta, sus horas ya no seran visibles para publico. Ok para continuar");
            if (r == true) {
              
                      const json = { 
                        professional_id: this.session_params.professional_id ,
                        calendar_id :  calendar_details.calendar_id,
                        };

                      console.log("INActivate Calendar REQUEST :"+JSON.stringify(json));
                      let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_inactivate_calendar",json);
                      console.log ("INActivate Calendar RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                      let aux_resp = response_json.data.rows ; 
                      
                      this.showModalViewCalendar = false ;
                      this.$emit('updateCalendarList'); 
            }

        },


	    },
    
    watch : {
        activatorViewCalendar(newValue){
            console.log ("showModalViewCalendar !!!"+newValue );  
            this.showModalViewCalendar = true ;
            console.log(" Show Calendar : "+JSON.stringify(this.calendar_details) );


        },


    },
    


}
</script>

