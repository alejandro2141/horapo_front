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
			<div class="modal-container  m-1 p-1 modal-background">
 
                <div class="modal-header" >
                    <div class="d-flex flex-row bd-highlight mb-1 display-3">
                        <div class="p-1 bd-highlight">Crear Hora <br/>
                       </div>
                        <div class="p-1 bd-highlight"></div>
                         <div class="p-1 bd-highlight"><i class="display-1 bi bi-x "  v-on:click="showModalCreateApp = false" aria-label="Close"></i>
                       </div>
                    </div>
                </div>

                <div class="modal-body mt-0" > 
                 

                   <form autocomplete="off"  >	
                     
                      <p class="text-center h1">Dia {{daterequired}} </p>
                      <input class="form-control form-control-lg" type="hidden" placeholder="form_date" name="form_date"   value="par_required_day"  >
                      <h2> Hora Inicio: </h2>
                      <input class="form-control " type="text"  v-model="form_start_time" >
                      <h2> Tiempo de atencion: </h2>
                            <select class="form-select form-control-lg" aria-label="Default" id="time" name="timeextension" v-model="form_app_duration">
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
                     
                      
                      <h2> Especialidad:</h2>
                        <InputFormSpecialtyProfessional v-on:selectedSpecialtyCode="selectedSpecialtyCode"  :session_params="session_params" > </InputFormSpecialtyProfessional> 
                      
                      <h2 >Centro de Atencion: </h2>
                        <InputFormCenterProfessional v-on:selectedCenterCode="selectedCenterCode" :session_params="session_params" > </InputFormCenterProfessional> 
                     
                      <h2>Citas Publicas Internet</h2> 
                      <div class="row">
                        <div class="col">
                          <i class="display-1 fas fa-wifi"></i>
                        </div>
                        <div class="col">
                          <select  class="autocomplete form-select form-select mb-2" placeholder="Disonible Internet"  aria-label=".form-select-lg example" id="form_public"  v-model="form_public" name="form_public" >
                            <option value="false">NO</option>
                            <option value="true">SI</option>
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

export default {
   data : function() {
        return {
            showModalCreateApp: false ,
           // centers: null,
            form_center_id : null,
            form_public : null ,
            form_start_time : null ,
            form_specialty_code : null ,
            form_center_code  : null ,
            form_app_duration : 30,
          }   
    },
   	
   props: ['daterequired','hourCreate', 'session_params' ],
   emits: ['updateAppList'] , 
      
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
    selectedSpecialtyCode(value)
    {
    console.log("speciality selected code: "+value);
    this.form_specialty_code = value ;
    },

    selectedCenterCode(value)
    {
    console.log("Center selected code: "+value);
    this.form_center_code = value ;
    },

	  async createHours() {
    	var r =confirm("Se procedera a crear esta hora en su agenda");
					  if (r == true) {

        const json = { 
              form_center_id  : this.form_center_code ,
              form_professional_id : this.session_params.professional_id  ,
             //hours 
              form_date : this.daterequired ,
              form_start_time : this.form_start_time , //cambio
              form_appointment_duration : this.form_app_duration , 
              form_specialty_code : this.form_specialty_code,
              form_public : this.form_public ,
                        };
                  
        console.log ("createHours REQUEST :"+ JSON.stringify(json)  );
        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_create_appointment",json);
        console.log ("createHours RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
        //location.reload();
        //this.agendas = response_json.data.rows;
        //location.reload();
        this.$emit('updateAppList');
        this.showModalCreateApp = false ;
            }


        }




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

