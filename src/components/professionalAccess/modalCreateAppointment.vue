<script setup>
import { ref } from 'vue';
import axios from 'axios';
import InputFormSpecialtyProfessional from './inputFormSpecialtyProfessional.vue';
import InputFormCenterProfessional from './inputFormCenterProfessional.vue';
import InputFormComunaProfessional from './inputFormComunaProfessional.vue' ;



</script>

<template>

	<teleport to="body"   >
		<div  v-if="showModalCreateApp" class="modal bg-secondary"    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-1 modal-background" style="border: 0px solid rgb(168, 168, 168); border-radius: 20px;" >
 

                <div class="modal-header" >
                    <div class="d-flex flex-row bd-highlight mb-1 display-3">
                        <div class="p-1 bd-highlight">Crear Hora <br/>
                       </div>
                        <div class="p-1 bd-highlight"></div>
                         <div class="p-1 bd-highlight"><i class="display-1 bi bi-x "  v-on:click="showModalCreateApp = false" aria-label="Close"></i>
                       </div>
                    </div>
                </div>

                <div class="modal-body mt-0"  > 
                 

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
                     
                      
                      <h2>Especialidades de esta Hora:</h2>
                        <InputFormSpecialtyProfessional v-on:selectedSpecialties="selectedSpecialties"  :session_params="session_params" > </InputFormSpecialtyProfessional> 
                      <br>
                      <h2>Cita en Internet  </h2>
                        <div @click="form_public = !form_public"  class="d-flex justify-content-between ">
                        <div class="border border-1 border-primary p-2">
                          <text class="p-2" :class="{'text-white' : form_public ,'bg-primary' : form_public }">SI </text>
                          <text class="p-2" :class="{'text-white' : !form_public ,'bg-primary' : !form_public }" >NO </text>
                        </div>

                        <div></div>

                        <div v-if="form_public" class="text-success" > <b> <i class="bi bi-wifi"></i> Publica  </b> </div>
                        <div v-if="!form_public" > <b> Privada  </b> </div>

                      </div>
                    
                      <br>
                     <h2>Tipo de Cita:</h2>
                        <div @click="form_show_home = !form_show_home; form_show_center = false ; form_show_remote = false ; "  class="p-2 h3"><i :class="{'bi':true , 'bi-circle':!form_show_home  , 'text-primary' : form_show_home , 'bi-circle-fill' : form_show_home }"></i> A Domicilio </div>
                                                     
                              <div v-if="form_show_home" class="border border-1 p-2"> 
                                A domicilio comunas en las que atiende (Máximo 6). 
                                <!----
                                <div class="text-start" v-for="(comuna) in form_comunas" :key="comuna.id"  > <i class="bi bi-geo-alt"></i> {{ comuna.name }}  
                                </div>
                                  <p class="text-danger  text-end"  @click="form_comunas.pop()">Eliminar</p>
                                -->
                                  <InputFormComunaProfessional class="m-3" v-on:selectedComunas="selectedComunas" :global_comunas="global_comunas"  ></InputFormComunaProfessional>    
                                <br>  
                              </div>
                              <div v-else >
                                ...
                              </div>

                        
                            <div @click="form_show_center = !form_show_center; form_show_home = false ; form_show_remote = false ;"  class="p-2 h3"><i :class="{'bi':true , 'bi-circle':!form_show_center  , 'text-primary' : form_show_center , 'bi-circle-fill' : form_show_center }"></i> En Consulta </div>
                              <div v-if="form_show_center" >
                                Seleccione Centro de Atencion 
                                <InputFormCenterProfessional class="m-3" v-on:centersError='centersError' v-on:selectedCenterCode="selectedCenterCode" :session_params="session_params" v-on:switchView="switchView" > </InputFormCenterProfessional> 
                                <br>
                              </div>
                              <div v-else>
                                ...
                              </div>
                          
                           <div @click="form_show_remote = !form_show_remote ; form_show_center = false ; form_show_home= false ; "  class="p-2 h3"><i :class="{'bi':true , 'bi-circle':!form_show_remote  , 'text-primary' : form_show_remote , 'bi-circle-fill' : form_show_remote }"></i> Remota </div>
                              <div v-if="form_show_remote" >
                                Aun no implementamos esta funcionalidad
                              </div>
                              <div v-else>
                                ...
                              </div>
                     
                      
                     <br>
                      <div class="m-1 p-2">
                          <input class="" type="text" id="nothing" style="font-size:1px; border-width:0px; border:none;" >
                          <button type="button" @click="createHours();" data-bs-dismiss="modal" class="btn btn-primary">GUARDAR </button>
                    	</div>


                      <div class="" style="height : 700px"> </div>


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
   data : function() {
        return {
            needsCreateCenter: false ,
           // centers: null,
            form_center_id : null,
            form_public : true ,
            form_start_time : null ,
            form_specialty_code : null ,
            form_specialty_code_array : [] ,
            
            form_center_code  : null ,
            form_app_duration : 30,

            showModalCreateApp : false,

            showErrorCenters : false ,
            form_home_visit : 0 ,
            form_comunas_id : [] , 
            form_app_type : null,

            form_show_home : false ,
            form_show_center : false ,
            form_show_remote : false ,

        }   
    },
   	
   props: ['daterequired','hourCreate', 'session_params', 'global_comunas' ],
   emits: ['updateAppList','switchView'] , 
      
   	mounted () {
           this.auxHourCreate = ref(this.hourCreate) ;
           console.log("Modal Create Appointment Mounted !!!" );
         //  this.getCenters();
    },

	methods :{

    selectedComunas(value)
    {
      console.log("capture emit comuna List "+JSON.stringify(value));
      let aux=JSON.parse(value) ;
      this.form_comunas_id = [] ;
          for (let i = 0 ; i < aux.length ; i++) {
             this.form_comunas_id.push( aux[i].id );
          }
          console.log("Comuna id array:"+this.form_comunas_id );
    },

//GET CENTERS      
    centersError(value) {
      console.log("centersError In modal "+value);
      this.needsCreateCenter = value ; 
    },

    switchView(){
            this.$emit('switchView');
         },

    selectedSpecialties(value)
    {
    let aux=JSON.parse(value) ;
    this.form_specialty_code_array= [] ;
          for (let i = 0 ; i < aux.length ; i++) {
             this.form_specialty_code_array.push( aux[i].id );
          }
          console.log("specialty id array:"+this.form_specialty_code_array);
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
              //form_specialty_code : this.form_specialty_code,
              //form_specialty_code : JSON.stringify(this.form_specialty_code_array),
              //form_specialty_code : JSON.parse(JSON.stringify(this.form_specialty_code_array)),
              form_specialty_code : this.form_specialty_code_array,
              form_public : this.form_public ,

              form_type_home : this.form_show_home ,
              form_type_center : this.form_show_center ,
              form_type_remote : this.form_show_remote ,

              form_type_home_comunas : this.form_comunas_id ,           
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


        },
    uniq(a) {
      return a.sort().filter(function(item, pos, ary) {
          return !pos || item != ary[pos - 1];
      });
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

