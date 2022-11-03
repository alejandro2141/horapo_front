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
              
      <div class="modal-body w-100" > 
                

				 	<div class="d-flex justify-content-between">
                      <div  >   <text class="display-5 "> RESERVA EXITOSA </text> </div>
                      <div  > </div>
                      <div ><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalConfirmation = false ; this.updateSearchResult() " aria-label="Close"></i> </div>
          </div>
<!--
					<div class="d-flex justify-content-start border border-2" style="border: 0px solid rgb(168, 168, 168); border-radius: 10px ">
						<div class="m-0 p-2  bg-primary text-white" style="border: 0px solid rgb(168, 168, 168); border-radius: 10px 0px 0px 10px;" > <text class="display-5"> {{getShortMonthName(appConfirmed.date.substring(5, 7) )}}</text><br><text class="display-1 d-flex align-items-center justify-content-center"> {{appConfirmed.date.substring(8, 10) }} </text>  </div>
					    <div  class=" display-3 p-3" style="color:#1f9d94 ;" >{{ showSpecialtyName(appConfirmed.specialty_reserved) }} </div> 
					</div>
-->
          
          <div class="text-dark d-flex justify-content-center"> 
            <p> <i class="bi bi-check2-circle display-1"></i></p>
          </div>
          <div class="text-dark d-flex justify-content-center"> 
            <p> <i class=""></i> Recuerde confirmar su asistencia respondiendo al mensaje que enviamos a su correo  lalaqq12@nada.com  </p>
          </div>
<hr>
					<div  class="h4">
              <div  class=" display-4 mb-3" style="color:#1f9d94 ;" >{{ showSpecialtyName(appConfirmed.specialty_reserved) }} </div> 
							<div class="" >
								<p> <i class="bi bi-circle-fill"  ></i>  Fecha :  {{ transform_date( appConfirmed.date.substring(0, 10) ) }}  </p>
								<p> <i class="bi bi-circle-fill  "></i> Hora  :  {{appConfirmed.start_time.substring(0, 5) }} hrs     </p>
								<p> <i class="bi bi-person-circle "></i> Con :  {{app.professional_name }}  </p>
              
                <p>  
                     <text v-if="appConfirmed.app_type_remote" >  <i class=" h1 bi bi-camera-video "></i> Atencion Remota:<br>Profesional le llamara directamente a su Telefono: <b>{{appConfirmed.patient_phone1 }}</b></text>  
                     <text v-if="appConfirmed.app_type_center" > <i class="  h1 bi bi-building "> </i> En {{app.center_name }} <br>{{app.center_address }} </text>  
                     <text v-if="appConfirmed.app_type_home" > <i class="    h1 bi bi-house-door "></i> a Domicilio en dirección paciente: <br> {{appConfirmed.patient_address }}</text> 
                </p>
                
  
              </div>
					</div>
<!--
					<div v-if="appConfirmed.app_type_home"  class="text-primary" >
							<div class="h3" style="" ><i class="bi bi-house-fill m-1 display-5"></i> Visita a domicilio 
							</div>
					</div>

					<div v-if="appConfirmed.app_type_center"  class="" style=" color:#1f9d94 "  >
              <div > <i class="bi bi-geo-alt-fill display-5"></i>Direccion de la cita: <br>&nbsp;&nbsp;"{{appConfirmed.center_name }}"</div>
                <div class=""> &nbsp;&nbsp;  {{appConfirmed.center_address }}</div>
				  </div>
 -->         
          <hr>
			 
          <div class="text-dark"> 
					    <p class="display-4" style="color:#1f9d94 ;"> Datos del Paciente </p>

              <div class="mt-0" > <i class="bi bi-circle-fill text-muted"  ></i> {{appConfirmed.patient_name }}</div>
              <div> <i class="bi bi-circle-fill text-muted"></i> Id : {{appConfirmed.patient_doc_id }}</div>
              <div> <i class="bi bi-circle-fill text-muted"></i> {{appConfirmed.patient_email }}</div>
              <div> <i class="bi bi-circle-fill text-muted"></i> Telefono: {{appConfirmed.patient_phone1 }}</div>
              <div v-if="appConfirmed.patient_address != 'null'"> <i class="bi bi-circle-fill text-muted"></i> Dirección :{{appConfirmed.patient_address }}</div>
              <div> <i class="bi bi-circle-fill text-muted"></i> {{appConfirmed.patient_age }} años.</div>
          </div>			

          <div class="d-flex justify-content-center m-5" >
							<input class="" type="text" id="nothing" style="font-size:1px; border-width:0px; border:none;" >
             	<button type="button" @click="showModalConfirmation = false ; this.updateSearchResult() " class="btn btn-primary p-4 btn-lg" data-bs-dismiss="modal"> Finalizar</button>
          </div> 				
                            
      </div>
<!--
                <div class="modal-body " > 

                  <div class="d-flex flex-row justify-content-end">
                      <div class="display-4 " style="  color:#1f9d94 "  >    Reserva Exitosa!! &nbsp;   </div>
                      <div class=""  > </div>
                      <div class=""><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalConfirmation = false ; this.updateSearchResult() " aria-label="Close"></i> </div>
                  </div>

            

            	<div class=" d-flex justify-content-start border border-2" style="border: 0px solid rgb(168, 168, 168); border-radius: 10px ">
						      <div class="m-0 p-2  bg-primary text-white" style="border: 0px solid rgb(168, 168, 168); border-radius: 10px 0px 0px 10px;" > <text class="display-5"> {{getShortMonthName(appConfirmed.date.substring(5, 7) )}}</text><br><text class="display-1 d-flex align-items-center justify-content-center"> {{appConfirmed.date.substring(8, 10) }} </text>  </div>
					        <div  class=" display-3 p-3" style="color:#1f9d94 ;" >{{ showSpecialtyName(appConfirmed.specialty_reserved) }} <br> <i class="bi bi-check-lg"></i> </div> 
					    </div>
        
              <div class="h3" >
						        <i class="bi bi-smartwatch h"></i>  {{ transform_date( appConfirmed.date.substring(0, 10) ) }}   {{appConfirmed.start_time.substring(0, 5) }}hrs  
				    	</div>
				<br> 
				      <div class="">	
						        <i class="bi bi-person m-1"></i>Con :  {{appConfirmed.patient_name }} 
				    	</div>
        <br>
			
        <div v-if="appConfirmed.app_type_center" class="" >
					<div  style="color:#2e5668"> <i class="bi bi-building  m-1"></i> <b>Cita en Centro</b><br> {{appConfirmed.center_name }}</div>
					<div class="">Direccion:  {{appConfirmed.center_address }}</div>
				</div>  
       
        <div v-if="app.app_type_home" class="" >
					<div><i class="bi bi-house m-1 "></i> <b>Cita a domicilio</b>  
          </div>
							<div class="m-2">
                  Incluir direccion ingresada
							</div>
				</div>

					
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


-->

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

 props: [ 'searchParameters', 'appConfirmed','eventShowModalConfirmation','app' , 'global_specialties' ],
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
    
            showSpecialtyName(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
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
                console.log ("emit updateLastSearch: Public Reserve Confirmation ");
                //this.appointment_list=null ;
                this.$emit('updateLastSearch');
                this.showModalConfirmation = false ;
            },


		 },

}
</script>