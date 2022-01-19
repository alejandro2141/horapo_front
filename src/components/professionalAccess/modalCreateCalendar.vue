<script setup>
import { ref } from 'vue'
import axios from 'axios';
import inputFormComuna from  '../publicSearch/InputFormComuna.vue'

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
                   Hora de Inicio
                   Hora de Fin

                   Especialidad
                   1.-
                   2.-
                   3.- 

                   Tiempo de duracion de la cita

                   Tiempo traslado o descanso entre citas. 

                   Recurrencia
                   Lunes
                   Martes
                   Miercoles
                   Jueves 
                   Viernes
                   Sabado
                   Domingo

                  Periodo tiempo activo de este horairo
                  Fecha Inicio
                  Fecha Fin 

                  Direccion
                  A domicio   En Consulta  VideoAtención








							
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

data: function () {
		return {
			      showModalCreateCalendar  : false ,
           
            
		 }
	},

	props: ['session_params','activatorCreateNewCalendar','global_comunas'],
    emits: ['updateCenterList'],

    created () {
         },
 
    methods: {
      
	    },
    
    watch : {

        activatorCreateNewCalendar (newValue){
            console.log ("showModalCreateCalendar !!!"+newValue );  
            this.showModalCreateCalendar = true ;
        },
    },
    


}
</script>

