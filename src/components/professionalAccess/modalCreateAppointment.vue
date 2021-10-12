<script setup>
import { ref } from 'vue';
import axios from 'axios';
import InputFormSpecialtyProfessional from './inputFormSpecialtyProfessional.vue';
import InputFormCenterProfessional from './inputFormCenterProfessional.vue';



</script>

<template>

	<teleport to="body"   >
		<div  v-if="showModalCreateApp" class="modal bg-secondary"    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-2 modal-background">
 
                <div class="modal-header h1" >
                    <div class="d-flex flex-row bd-highlight mb-3">
                        <div class="p-2 bd-highlight">Crear Hora <br/>
                         Dia {{daterequired}} </div>
                        <div class="p-2 bd-highlight"></div>
                         <div class="p-2 bd-highlight"><i class=" bi bi-x display-1"  v-on:click="showModalCreateApp = false" aria-label="Close"></i>
                       </div>
                    </div>
                </div>

                <div class="modal-body " > 
                  
                   <form autocomplete="off"  >	
                     <h1 class="display-4">  Hora Inicio: </h1>
                     <input class="form-control form-control-lg" type="text"  v-model="form_start_time" >

                      <input class="form-control form-control-lg" type="hidden" placeholder="form_date" name="form_date"   value="par_required_day"  >
                      <h1 class="display-4"> Especialidad:</h1>
                        <InputFormSpecialtyProfessional v-on:selectedSpecialtyCode="selectedSpecialtyCode"  :session_params="session_params" > </InputFormSpecialtyProfessional> 
                      
                      <h1 class="display-4">Centro de Atencion: </h1>
                        <InputFormCenterProfessional v-on:selectedSpecialtyCode="selectedSpecialtyCode" :session_params="session_params" > </InputFormCenterProfessional> 
                     
                      <h1 class="display-4"> Tiempo de atencion:</h1> 
                   
                        <select class="form-select form-control-lg" aria-label="Default" id="time" name="timeextension">
                            <option value="15">15 Min </option>
                            <option value="30">30 Min </option>
                            <option value="45">45 Min </option>
                            <option value="60">60 Min </option>
                            <option value="75">1 Hora 15 Min</option>
                            <option value="90">1 Hora 30 Min</option>
                            <option value="105">1 Hora 45 Min</option>
                            <option value="120">2 Horas</option>
                            <option value="150">2 Horas 30 Min</option>
                            <option value="205">3 Horas 45 Min</option>
                        </select>
                                         
                        <h1 class="display-3">Citas Publicas Internet</h1> 
                      <div class="row">
                        <div class="col">
                          <i class="display-1 fas fa-wifi"></i>
                        </div>
                        <div class="col">
                          <select  class="autocomplete form-select form-select-lg mb-3" placeholder="Disonible Internet"  aria-label=".form-select-lg example" id="form_public"  v-model="form_public" name="form_public" >
                            <option value="0">NO</option>
                            <option value="1">SI</option>
                          </select>
                        </div>
                      </div>


                     
                      
                      <button type="button" @click="createHours();" data-bs-dismiss="modal" class="btn btn-primary">GUARDAR </button>
                      
                      
                      
                      </form>			
					
                            
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
  position: absolute;
  display: flex;
}

.modal div {
  display: flex;
  flex-direction: column;
}
 .modal-background {
    background-color:#DAEFF3
        }

</style>


<script>

export default {
   data : function() {
        return {
            showModalCreateApp: false ,
           // centers: null,
            form_center_id : null,
            form_public : null ,
            form_start_time : null ,
          }   
    },
   	
   props: ['daterequired','hourCreate', 'session_params' ],
   emits: ['UpdateHoursList'] , 
      
   	mounted () {
           this.auxHourCreate = ref(this.hourCreate) ;
           console.log("Modal Create Appointment Mounted !!!" );
         //  this.getCenters();
    },

	methods :{
//GET CENTERS      

    /*
        async getCenters() {
			const json = { 
			   professional_id : this.session_params.professional_id  ,			   
   			   	      };
			console.log ("getCenters REQUEST :"+ JSON.stringify(json)  );
			let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_centers",json);
			console.log ("getCenters RESPONSE :"+JSON.stringify(response_json.data.rows)) ;
			this.centers = response_json.data.rows;
            //this.prevCenterName="noset";
			},

        selectedSpecialtyCode(value){
            console.log("selecte Specialty Code "+value);
        },
    */

    },
    watch : {
        hourCreate(newValue){
             
             this.showModalCreateApp= true ;
            console.log ("hourCreate Change!!!"+newValue+ " ShoModalCreateApp="+this.showModalCreateApp);
            this.form_start_time = newValue.start_time ; 
        }
    }

    
}
</script>

