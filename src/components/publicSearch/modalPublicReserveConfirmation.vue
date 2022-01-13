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

                  <div class="d-flex flex-row justify-content-end">
                      <div class="display-4 " style="  color:#1f9d94 "  >    Reserva Exitosa   </div>
                      <div class=""  > </div>
                      <div class=""><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalConfirmation = false ; this.updateSearchResult() " aria-label="Close"></i> </div>
                  </div>

            

            	<div class=" d-flex justify-content-start border border-2" style="border: 0px solid rgb(168, 168, 168); border-radius: 10px ">
						      <div class="m-0 p-2  bg-primary text-white" style="border: 0px solid rgb(168, 168, 168); border-radius: 10px 0px 0px 10px;" > <text class="display-5"> {{getShortMonthName(appConfirmed.date.substring(5, 7) )}}</text><br><text class="display-1 d-flex align-items-center justify-content-center"> {{appConfirmed.date.substring(8, 10) }} </text>  </div>
					        <div  class=" display-3 p-3" style="color:#1f9d94 ;" >{{ showSpecialtyName(app) }} </div> 
					    </div>
        
              <div class="h3" >
						        <i class="bi bi-smartwatch h"></i>  {{ transform_date( appConfirmed.date.substring(0, 10) ) }}   {{appConfirmed.start_time.substring(0, 5) }}hrs  
				    	</div>
				<br> 
				      <div class="">	
						        <i class="bi bi-person m-1"></i>Con :  {{app.name }} 
				    	</div>
        <br>
				<!-- IF APP IN CENTER -->
        <div v-if="appConfirmed.app_type_center" class="" >
					<div  style="color:#2e5668"> <i class="bi bi-building  m-1"></i> <b>Cita en Centro</b><br> {{appConfirmed.center_name }}</div>
					<div class="">Direccion:  {{app.center_address }}</div>
				</div>  
        <!-- IF HOME VISIT -->
        <div v-if="app.app_type_home" class="" >
					<div><i class="bi bi-house m-1 "></i> <b>Cita a domicilio</b>  
          </div>
							<div class="m-2">
                  Incluir direccion ingresada
							</div>
				</div>

							<!--	<p style="border-style: dotted;" class="p-2 bg-info text-white"> -->
                <div class="p-2 border border-2">
								IMPORTANTE: <br>
								Debe confirmar su asistencia 48 Hrs antes de su cita en el enlace que fue enviado a su correo {{appConfirmed.patient_email}} 
								</div>
							
              <br>
                <button type="button" @click="updateSearchResult();" class="btn btn-primary" data-bs-dismiss="modal"   >Regresar a la Busqueda</button>
              <br>
              <br>
                <text class="text-secondary" style="">#{{appConfirmed.id}}</text>
           
	                      <div class="" style="height : 200px"> 
                				</div>
                </div>
                	<br>
	             
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
          showSpecialtyName(app)
            {
                if (this.searchParameters.specialty != null)
                {return this.searchParameters.specialty.name }
                else {
                    return (app.specialty_name )
                }
            },

           	transform_date(date)
            {
              let temp = date.split("-") ;
              return (""+temp[2]+" "+this.getShortMonthName(temp[1])+" "+temp[0])
            },
             getShortMonthName(month)
            {
              console.log("MONTH:"+parseInt(month));
              let months = ['nodata','Ene.','Feb.' ,'Marz.','Abr.','May.','Jun.','Jul.','Ago.','Sept.','Oct.','Nov.','Dic.' ]
              return months[parseInt(month)];

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