<script setup>
import { ref } from 'vue'
import axios from 'axios';
import inputFormComuna from  './InputFormComuna2.vue'
import InputFormComunaProfessional from './inputFormComunaProfessional.vue' ;

</script>

<template>

     	<teleport to="body"   >
		<div  v-if="showModalCreate" class="modal bg-dark scroll" >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper d-flex justify-content-center ">
			<div class="modal-container m-0 p-0 ">
 

                <div class="modal-body mt-0 bg-secondary text-white"  > 
                   
                    <form autocomplete="off">	

                    <div class="d-flex justify-content-between">
                        <div class="p-1 bd-highlight" style="font-size: 2em;"  >Crear Consulta
                        </div>
                        
                        <div class="p-1 bd-highlight"></div>
                        
                        <div class="p-1 bd-highlight" >
                            <i class="bi bi-x-lg ml-0" style="font-size: 2em;" v-on:click="showModalCreate = false" aria-label="Close">
                            </i>
                        </div>
                    </div>
                    <hr class="text-white">

                      <div class="form-group">
                         <label for="exampleInputEmail1" style="font-size: 1em;" >Nombre de su Consulta </label>
                            <input type="text" class="form-control bg-dark border-dark  text-white" autocomplete="off" id="form_center_name" name="form_center_name" v-model="form_center_name"  placeholder="Terapias Sta Clarita">
                      </div>

                      <div class="mt-3 " style="font-size: 1em;" >Tipo de consulta</div>
                      
                      <div >
                          <button type="button" class="btn  m-0" :class="[app_type_center ? 'btn btn-primary' : 'btn btn-dark']"  @click="app_type_home=false ; form_app_type = 1; app_type_center=true ; app_type_tele=false ; form_comuna_codes=[] ;  form_center_name = form_center_name.slice(0, -11)+'En Consulta'    " >
                              <i class="h3 bi bi-building m-0 p-0"></i><br>
                              <text class="fs-6 m-0 p-0">En Consulta</text> 
                          </button>
                          
                          <button type="button" class="btn m-1" :class="[app_type_home ? 'btn btn-primary' : 'btn btn-dark']"  @click="app_type_home=true ; form_app_type = 2 ; app_type_center=false ; app_type_tele=false ; form_comuna_codes=[];  form_center_name = form_center_name.slice(0, -11)+'A Domicilio' " >
                              <i class="h3 bi bi-house-door m-0 p-0"></i><br>
                               <text class="fs-6 m-0 p-0">A Domicilio</text> 
                          </button>
                          
                          <button type="button" class="btn m-0" :class="[app_type_tele ? 'btn btn-primary' : 'btn btn-dark']" @click="app_type_home=false ; form_app_type = 3 ; app_type_center=false; app_type_tele=true ; form_comuna_codes=[];  form_center_name = form_center_name.slice(0, -11)+'Tele Atenc.' " >
                              <i class="h3 bi bi-camera-video m-0 p-0"></i><br>
                              <text class="fs-6 m-0 p-0">Tele Atenc. </text> 
                          </button>
                      </div>

                      <div v-if="app_type_home"  class="form-group mt-3" >
                        <div>  <text class="h3">Atencion a domicilio.</text><br>   Comunas atiende a Domicilio (Máximo 5). </div>
                        <div  class="mt-0 pt-0" >
                            <!-- <InputFormComunaProfessional class="m-3" v-on:selectedComunas="selectedComunas" :global_comunas="global_comunas"  ></InputFormComunaProfessional> -->
                            <div v-for="comuna in form_comuna_codes" :key="comuna" class="d-flex justify-content-between m-0 p-0 " >
                                <div>
                                    <i class="h2 text-white bi bi-check"></i> 
                                    <text>{{comunaId2Name(comuna)}} </text>
                                </div>
                                <i @click="removeFromList(comuna)" class="h3 text-white bi bi-x mr-2"></i>
                            </div>
                            <inputFormComuna class="mt-2" v-on:selectedComunaCode="selectedComunaCode_home" :global_comunas='global_comunas' > </inputFormComuna>   
                            <br>  
                        </div>
                      </div>


                      <div v-if="app_type_center"  class="form-group mt-3" >
                            <p> <text class="h3">Información de Consulta</text> <br> </p>
                           
                            <div class="form-group mt-3">
                                <label for="exampleInputPassword1">Direccion de su Consulta</label>
                                <input type="text" class="form-control bg-dark border-dark  text-white" autocomplete="off" id="form_center_address" name="form_center_address" v-model="form_center_address"  placeholder="Av as Condes xxxx, oficina xx, Piso x">
                                <small id="emailHelp" class="form-text text-muted">Esta direccion al que debe concurrir el paciente a su cita</small>		
                            </div>

                            <div class="form-group">
                            <label for="exampleInputPassword1">Comuna</label>
                            
                    
                            <inputFormComuna v-on:selectedComunaCode="selectedComunaCode" :global_comunas='global_comunas' > </inputFormComuna>   
                            
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
                                <input type="text" class="form-control bg-dark border-dark  text-white" autocomplete="off" id="form_center_phone1" name="form_center_phone1" v-model="form_center_phone1" placeholder="569763522">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Telefono2</label>
                                <input type="text" class="form-control bg-dark border-dark  text-white" autocomplete="off" id="form_center_phone2" name="form_center_phone2" v-model="form_center_phone2" placeholder="569763522">
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
    background-color:#383838
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
            //form_center_comuna_code : null,
            
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

            form_comuna_codes : []
		      }

	},

	props: ['session_params','activatorCreateNewCenter','centerToShowDetails','global_comunas'],
  emits: ['updateCenterList'],

    created () {
      let name=this.session_params.professional_name.split(' ')
      this.form_center_name = name[0]+" "+name[1].charAt(0)+" "+name[2]+" "+name[3].charAt(0)+"  -----------" 
         },
 
    methods: {
      removeFromList(comuna)
      {
        let index=this.form_home_comuna_codes.indexOf(5);
        this.form_home_comuna_codes.splice(index, 1);
      },

      comunaId2Name(comuna_id)
          {
            if (comuna_id != null)
            {
            let aux = this.global_comunas.find(o => o.id === comuna_id)
                if (aux != null)
                {
                    return  aux.name
                }
                else
                {
                    return "not found" ;  
                }
            }
            else
            {
            return null ; 
            }

          },
      /*
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
      */
      selectedComunaCode(comunaCode){
              console.log("Seected comuna Code:"+comunaCode); 
              if (comunaCode !=null )
              {
              this.form_comuna_codes.push(comunaCode) ;
              }
      },
      selectedComunaCode_home(comunaCode){
              console.log("Seected comuna Code Home:"+comunaCode); 
              if (comunaCode !=null )
              {
              this.form_comuna_codes.push(comunaCode) ;
              }
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

        console.log ("createNewCenter :");
        const json = { 
           name    : this.form_center_name ,
           address : this.form_center_address ,
           locations      : this.form_comuna_codes ,
           //home_comuna  : this.form_comuna_codes ,
           //center_region  :  this.form_center_region, 
           phone1  : this.form_center_phone1 ,
           phone2  : this.form_center_phone2 ,
           professional_id: this.session_params.professional_id ,
           app_type       : this.form_app_type , 
           center_color   : randomColor ,
           };

        console.log("REQUEST :"+JSON.stringify(json));
        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_create_center",json);
        console.log ("RESPONSE:"+JSON.stringify(response_json.data)) ;
        this.$emit('updateCenterList');  
        this.showModalCreate = false ;    
        
        /*
        let restemp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_shutdown_firstlogin",json);
        this.session_params.first_time = false ;   
        */
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

