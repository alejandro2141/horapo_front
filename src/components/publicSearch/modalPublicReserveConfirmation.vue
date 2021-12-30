<script setup>
import { ref } from 'vue'
import axios from 'axios'



//const count = ref(0)
</script>

<template>
  <div>
  	<teleport to="body"   >

		<div v-if="showModalConfirmation" class="modal bg-secondary scroll"    >
		    
			<transition name="modal">
			<div class="modal-mask "  >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-0 modal-background " style="border: 0px solid rgb(168, 168, 168); border-radius: 20px;">
              
                <div class="modal-body " > 

                  <div class="d-flex flex-row justify-content-end  m-1">
                      <div class="display-4 " style="margin-right: 1em;  color:#1f9d94 "  >  {{ app.specialty_name}}  </div>
                      <div class="" style="margin-right: 1em;" > </div>
                      <div class=""><i class="display-1 bi bi-x-lg ml-0"  v-on:click="showModalConfirmation = false ; this.updateSearchResult() " aria-label="Close"></i> </div>
                  </div>

              <div class="h1 text-success m-3 ">              
                   Reserva Exitosa  
              </div>
                
                    <div class=" w-100 display-6 m-0 p-0" style="color:#2e5668">	
               {{ transform_date( appConfirmed.date.substring(0, 10) ) }}   {{appConfirmed.start_time.substring(0, 5) }} hrs


                    </div> 

							<div class="h3 mb-2" style="color:#2e5668" > 
						  Con: {{app.name }}
							</div>
							<p>
							<text class="" style="color:#2e5668" >
							"{{app.center_name }}" <br> 
							Direccion: {{app.center_address }}
              </text> 
							
              </p>

								<p>
								Informacion de su cita ha sido enviada a su correo <b> {{appConfirmed.patient_email}} </b> 
								</p>
								<p style="border-style: dotted;" class="p-2 bg-warning text-dark">
								IMPORTANTE: <br>
								48 Hrs antes de su cita, debe confirmar su asistencia en el enlace que fue enviado a su correo. 
								</p>
							

                <button type="button" @click="updateSearchResult();" class="btn btn-primary" data-bs-dismiss="modal"   >Regresar a la Busqueda</button>
                          
	                      <div class="" style="height : 500px"> 
                				</div>
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
	position: fixed; 
   display: flex; 

}

div.scroll {
       			margin:4px, 4px;
                padding:4px;
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
  /*margin: 1px auto;*/
  /*padding: 20px 30px;*/
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

 props: [ 'searchParameters', 'appConfirmed','eventShowModalConfirmation','app' ],
 emits: ['updateLastSearch'] , 
          

computed: {
	},

	  watch: {
        eventShowModalConfirmation(newApp, oldApp) {
              console.log("eventShowModalConfirmation change !!!");
              this.showModalConfirmation = true ; 
            },
      	},

	methods: {

           	transform_date(date)
            {
              let temp = date.split("-") ;
              return (""+temp[2]+" de "+this.getShortMonthName(temp[1])+" "+temp[0])
            },
             getShortMonthName(month)
            {
              console.log("MONTH:"+month);
              let months = ['nodata','Ene.','Feb.' ,'Marz.','Abr.','May.','Jun.','Jul.','Ago.','Sept.','Oct.','Nov.','Dic.' ]
              return months[month];

            },
            updateSearchResult()
            {
                console.log (" update search Result. In Modal Public Reserve Confirmation ");
                //this.appointment_list=null ;
                this.$emit('updateLastSearch');
                this.showModalConfirmation = false ;
            },


		 },

}
</script>