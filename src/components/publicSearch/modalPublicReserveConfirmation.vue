<script setup>
import { ref } from 'vue'
import axios from 'axios'



//const count = ref(0)
</script>

<template>
  <div>
  	<teleport to="body"   >

		<div v-if="showModalConfirmation" class="modal bg-secondary"    >
		    
			<transition name="modal">
			<div class="modal-mask "  >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-0 modal-background">
              
                <div class="modal-body " > 

 

                  <div class="d-flex flex-row justify-content-end  m-1">
                      <div class="h3 " style="margin-right: 1em;" >  {{ app.specialty_name}}  </div>
                      <div class="" style="margin-right: 1em;" > </div>
                      <div class=""><i class="display-1 bi bi-x-lg ml-0"  v-on:click="showModalConfirmation = false ; this.updateSearchResult() " aria-label="Close"></i> </div>
                  </div>

              <div class="h1 text-success m-3 ">              
                  <i class="bi bi-hand-thumbs-up"> Reserva Exitosa </i> 
              </div>

							<p> 
								{{appConfirmed.date.substring(0, 10) }}  a las : 
								{{appConfirmed.start_time.substring(0, 5) }} Hrs 
								<br>
								Profesional: {{app.name }}
							</p>
							<p>
							Dirección:<br> 
							<text class="">
							{{app.center_name }} <br> 
							Direccion: {{app.center_address }}<br> </text> 
							</p>

								<p>
								Informacion de su cita ha sido enviada a su correo <b> {{appConfirmed.patient_email}} </b> 
								</p>
								<p style="border-style: dotted;" class="p-2 bg-warning text-dark">
								IMPORTANTE: <br>
								48 Hrs antes de su cita, debe confirmar su asistencia en el enlace que fue enviado a su correo. 
								</p>
							

                <button type="button" @click="updateSearchResult();" class="btn btn-primary" data-bs-dismiss="modal"   >Regresar a la Busqueda</button>
                          

                </div>
        </div> 
        </div> 		
		  </div> 
        </transition>
    	</div>
	  </teleport>
  </div>


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
//const showForm = ref(false)


export default {
 data : function() {
    return {
        showModalConfirmation : false ,
        }
  },

 props: ['appConfirmed','eventShowModalConfirmation','app' ],
 emits: ['updateSearchResult'] , 
      

computed: {
	},

	  watch: {
        eventShowModalConfirmation(newApp, oldApp) {
              console.log("eventShowModalConfirmation change !!!");
              this.showModalConfirmation = true ; 
            },
      	},

	methods: {
	          updateSearchResult()
            {
                console.log (" update search Result. In Modal Public Reserve Confirmation ");
                //this.appointment_list=null ;
                this.$emit('updateSearchResult');
                this.showModalConfirmation = false ;
            },


		 },

}
</script>