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
			<div class="modal-container  m-1 p-1 modal-background">
 
                <div class="modal-header">
                        <div class="text-secondary  display-5">
                        Detalles Calendario 
                        </div>
                        <div class="p-1 "><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalViewCalendar = false ; $emit('updateCalendarList'); "  aria-label="Close"></i>
                        </div>
                </div>

                <div class="modal-body mt-0"> 
            
                 <text class="text-secondary  display-5" > {{ idSpecialty2name(calendar_details.specialty1) }}</text> <br>
                 
                 <div  v-if="calendar_details.active"  class="d-flex justify-content-between text-primary">
                   <text class="h2">ACTIVO</text>
                   <text> </text>
                   <i  class="bi bi-toggle-on display-1" @click="inactiveCalendar(calendar_details)" ></i>
                 </div>

                 <div  v-else  class="d-flex justify-content-between">
                   <text class="h2">APAGADO</text>
                   <text> </text>
                   <i  class="bi bi-toggle-on display-1" @click="activeCalendar(calendar_details)" ></i>
                 </div>

                  <div  class="d-flex justify-content-between">
                          <text> Fecha Inicio  </text>  
                   
                          <text>      {{calendar_details.date_start.substring(0,10) }}    </text>
                  </div>

                 <text> Fecha Inicio : {{calendar_details.date_start.substring(0,10) }}   </text>      <br>         
                 <text> Fecha Fin : {{calendar_details.date_end.substring(0,10) }}    </text>     <br>
                 <text> Hora  Inicio :{{calendar_details.start_time.substring(0,5)}}    </text>   <br>  
                 <text> Hora  Fin : {{calendar_details.end_time.substring(0,5)}}   </text>     <br>
                 <text> Lugar:  
                      <text v-if="calendar_details.center_visit"> En Consulta 
                        <br> 
                      Incluir Nombre Consulta 
                        <br>
                      </text> 

                      <text v-if="calendar_details.home_visit"> A Domicilio 
                        <br>
                         Incluir Comunas   
                         <br>  
                      </text> 
                          
                  </text>     

                                    Dias Recurrencia: <br>
                                        <text v-if="calendar_details.monday"> Lunes <br> </text> 
                                        <text v-if="calendar_details.tuestday"> Martes  <br> </text> 
                                        <text v-if="calendar_details.wednesday"> Miercoles  <br> </text> 
                                        <text v-if="calendar_details.thursday"> Jueves  <br> </text> 
                                        <text v-if="calendar_details.friday"> Viernes <br> </text> 
                                        <text v-if="calendar_details.saturday"> Sabado <br> </text> 
                                        <text v-if="calendar_details.sunday"> Domingo <br> </text> 

                  <!--
                  <button v-if="calendar_details.active" @click="inactiveCalendar(calendar_details)" type="button" class="btn btn-primary  btn-danger ">Desactivar</button>
                  <button  v-else   @click="activeCalendar(calendar_details)" type="button" class="btn btn-primary btn-success ">Activar</button>
                  -->

                  <br>
                  <text>  #{{calendar_details.id}} </text> 
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
		 }
	},

	props: ['session_params','activatorViewCalendar','global_comunas','calendar_details', 'global_specialties'],
    emits: ['updateCalendarList','switchView'],

    created () {
    },

    mounted () {
         },
 
    methods: {

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
                    calendar_id :  calendar_details.id,
                    };

                  console.log("Activate Calendar REQUEST :"+JSON.stringify(json));
                  let response_json = await axios.post("http://localhost:8080"+"/professional_activate_calendar",json);
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
                        calendar_id :  calendar_details.id,
                        };

                      console.log("INActivate Calendar REQUEST :"+JSON.stringify(json));
                      let response_json = await axios.post("http://localhost:8080"+"/professional_inactivate_calendar",json);
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

