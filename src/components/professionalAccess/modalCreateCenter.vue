<script setup>
import { ref } from 'vue'
import axios from 'axios';
import inputFormComuna from  './InputFormComuna.vue'
import InputFormComunaProfessional from './inputFormComunaProfessional.vue' ;

</script>

<template>

     	<teleport to="body"   >
		<div  v-if="showModalCreate" class="modal bg-secondary scroll" >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-1 modal-background">
 

                <div class="modal-body mt-0"  > 
                   
                    <form autocomplete="off">	

                    <div class="d-flex flex-row bd-highlight mb-1 display-3">
                        <div class="p-1 bd-highlight">Crear Consulta<br/>
                       </div>
                        <div class="p-1 bd-highlight"></div>
                         <div class="p-1 bd-highlight"><i class="display-1 bi bi-x-lg ml-0"  v-on:click="showModalCreate = false" aria-label="Close"></i>
                       </div>
                    </div>

                      <div class="form-group">
                         <label for="exampleInputEmail1" class="h3" >Nombre de su Consulta </label>
                            <input type="text" class="form-control" autocomplete="off" id="form_center_name" name="form_center_name" v-model="form_center_name"  placeholder="Terapias Sta Clarita">
                      </div>

                      <div class="mt-3 h3">Tipo de consulta</div>
                      
                      <div >
                          <button type="button" class="btn  m-0" :class="[app_type_center ? 'btn-outline-primary' : 'btn-outline-secondary']"  @click="app_type_home=false ; form_app_type = 1; app_type_center=true ; app_type_tele=false ;" >
                              <i class="h3 bi bi-building m-0 p-0"></i><br>
                              <text class="fs-6 m-0 p-0">En Consulta</text> 
                          </button>
                          
                          <button type="button" class="btn m-1" :class="[app_type_home ? 'btn-outline-primary' : 'btn-outline-secondary']"  @click="app_type_home=true ; form_app_type = 2 ; app_type_center=false ; app_type_tele=false ;" >
                              <i class="h3 bi bi-house-door m-0 p-0"></i><br>
                               <text class="fs-6 m-0 p-0">A Domicilio</text> 
                          </button>
                          
                          <button type="button" class="btn m-0" :class="[app_type_tele ? 'btn-outline-primary' : 'btn-outline-secondary']" @click="app_type_home=false ; form_app_type = 3 ; app_type_center=false; app_type_tele=true ;" >
                              <i class="h3 bi bi-camera-video m-0 p-0"></i><br>
                              <text class="fs-6 m-0 p-0">Tele Atenc. </text> 
                          </button>
                      </div>


                       



                      <div v-if="app_type_home"  class="form-group mt-3" >
                        <p>  <text class="h3">Atencion a domicilio.</text><br>   Comunas atiende a Domicilio (Máximo 6). </p>
                        <div  class="b p-2" >
                            <!-- <InputFormComunaProfessional class="m-3" v-on:selectedComunas="selectedComunas" :global_comunas="global_comunas"  ></InputFormComunaProfessional> -->
                            <inputFormComuna  v-on:selectedComunaCode="selectedComunaCode_home" :global_comunas='global_comunas' > </inputFormComuna>   
                            <br>  
                        </div>
                      </div>


                      <div v-if="app_type_center"  class="form-group mt-3" >
                            <p> <text class="h3">Información de Consulta</text> <br> </p>
                           
                            <div class="form-group mt-3">
                                <label for="exampleInputPassword1">Direccion de su Consulta</label>
                                <input type="text" class="form-control" autocomplete="off" id="form_center_address" name="form_center_address" v-model="form_center_address"  placeholder="Av as Condes xxxx, oficina xx, Piso x">
                                <small id="emailHelp" class="form-text text-muted">Esta direccion al que debe concurrir el paciente a su cita</small>		
                            </div>

                            <div class="form-group">
                            <label for="exampleInputPassword1">Comuna</label>
                            
                              <p class="text-end" v-if="home_comuna1!=null">  {{ comunaId2Name(home_comuna1) }}  <i @click="home_comuna1=null" v-if="showEditOptions" class="fs-1 m-1 bi bi-trash"></i></p>
                              <p class="text-end" v-if="home_comuna2!=null">  {{ comunaId2Name(home_comuna2)  }} <i @click="home_comuna2=null" v-if="showEditOptions" class="fs-1 m-1 bi bi-trash"></i></p>
                              <p class="text-end" v-if="home_comuna3!=null">  {{ comunaId2Name(home_comuna3)  }} <i @click="home_comuna3=null" v-if="showEditOptions" class="fs-1 m-1 bi bi-trash"></i></p>
                              <p class="text-end" v-if="home_comuna4!=null">  {{ comunaId2Name(home_comuna4)  }} <i @click="home_comuna4=null" v-if="showEditOptions" class="fs-1 m-1 bi bi-trash"></i></p>
                              <p class="text-end" v-if="home_comuna5!=null">  {{ comunaId2Name(home_comuna5)  }} <i @click="home_comuna5=null" v-if="showEditOptions" class="fs-1 m-1 bi bi-trash"></i></p>

                            <inputFormComuna  v-on:selectedComunaCode="selectedComunaCode" :global_comunas='global_comunas' > </inputFormComuna>   
                            
                            </div>
    <!--
                            <div class="form-group">
                                <label for="formRegion">Region</label>
                                <input type="text" class="form-control" autocomplete="off" id="form_center_region" name="form_center_region" v-model="form_center_region"  placeholder="Seleccione Region...">
                                <small id="helpFormRegion" class="form-text text-muted">Region donde se ubica este centro</small>		
                            </div>
    -->
                            <div class="form-group">
                                <label for="exampleInputPassword1">Telefono1</label>
                                <input type="text" class="form-control" autocomplete="off" id="form_center_phone1" name="form_center_phone1" v-model="form_center_phone1" placeholder="569763522">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Telefono2</label>
                                <input type="text" class="form-control" autocomplete="off" id="form_center_phone2" name="form_center_phone2" v-model="form_center_phone2" placeholder="569763522">
                            </div>

                            
                      </div>

                      <div v-if="app_type_tele"  class="form-group mt-3" >
                          <text class="h3">Tele Atención</text>
<!--
                          <div class="form-group">
                                <label for="exampleInputPassword1">Telefono Atencion Video Llamada</label>
                                <input type="text" class="form-control" autocomplete="off" id="remote_care_phone1" name="remote_care_phone1" v-model="form_remote_care_phone1" placeholder="+569763522">
                          En caso que quiera informar al cliente del telefono donde se realizara su llamada 
                          </div>
-->
                      </div>

                      <button type="button" @click="createNewCenter" class="btn btn-primary m-3" >Crear Consulta </button>
                 
                       
                      </form>
                        
                      	<div class="" style="height : 700px"> 
                				</div>
							
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
			showModalCreate : false ,
            center : Object,

            form_center_name : null,
            form_center_address : null,
            form_center_region : null,
            form_center_comuna_code : null,
            
            form_center_phone1 : null,
            form_center_phone2 : null,
            form_specialty : null,

            app_type_home :  false ,
            app_type_center : false ,
            app_type_tele : false , 
            
            form_comunas_id : [] ,
            form_app_type : null, 

            home_comuna1 : null ,
            home_comuna2 : null ,
            home_comuna3 : null ,
            home_comuna4 : null ,
            home_comuna5 : null ,

            center_comuna : null,
		      }

	},

	props: ['session_params','activatorCreateNewCenter','centerToShowDetails','global_comunas'],
    emits: ['updateCenterList'],

    created () {
         },
 
    methods: {

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
      selectedComunaCode(comunaCode){
              console.log("Seected comuna Code "+comunaCode); 
              this.form_center_comuna_code = comunaCode ;
      },
      selectedComunaCode_home(comunaCode){
              console.log("Seected comuna Code "+comunaCode); 
              this.form_home_comuna_code = comunaCode ;
      },
      
        //CREATE New Center
 	    async createNewCenter() {


        //define color for this center
        var colorArray = [
              "#FFE6E6",
              "#FFFAE6",
              "#EEFFE6",
              "#E6F5FF",
              "#F6E6FF",      
              "#FFE6EE",
            ];
        var randomColor = colorArray[Math.floor(Math.random()*colorArray.length)];


        console.log ("createNewCenter :" );
        const json = { 
           center_name    : this.form_center_name ,
           center_address : this.form_center_address ,
           center_comuna  : this.form_center_comuna_code ,
           center_region  :  this.form_center_region, 
           center_phone1  : this.form_center_phone1 ,
           center_phone2  : this.form_center_phone2 ,
           professional_id: this.session_params.professional_id ,
           app_type       : this.form_app_type , 
           center_color   : randomColor ,
           comunas_ids    : this.form_comunas_id        
           
           };

        console.log("REQUEST :"+JSON.stringify(json));
        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_create_center",json);
        console.log ("RESPONSE:"+JSON.stringify(response_json.data)) ;
        this.$emit('updateCenterList');  
        this.showModalCreate = false ;    
        
        let restemp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_shutdown_firstlogin",json);
        this.session_params.first_time = false ;   
        },

	    },
    
    watch : {

        activatorCreateNewCenter (newValue){
            console.log ("showModalCreate !!!"+newValue );  
            this.showModalCreate = true ;
        },
    },
    


}
</script>

