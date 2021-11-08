<script setup>
import { ref } from 'vue'
import axios from 'axios';
import inputFormComuna from  '../publicSearch/InputFormComuna.vue'

</script>

<template>

     	<teleport to="body"   >
		<div  v-if="showModalCreate" class="modal bg-secondary"    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-1 modal-background">
 

                <div class="modal-body mt-0"  > 
                   
                    <form autocomplete="off">	

                    <div class="d-flex flex-row bd-highlight mb-1 display-3">
                        <div class="p-1 bd-highlight">Crear Centro<br/>
                       </div>
                        <div class="p-1 bd-highlight"></div>
                         <div class="p-1 bd-highlight"><i class="display-1 bi bi-x-lg ml-0"  v-on:click="showModalCreate = false" aria-label="Close"></i>
                       </div>
                    </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Nombre de Nuevo centro de atención </label>
                            <input type="text" class="form-control" autocomplete="off" id="form_center_name" name="form_center_name" v-model="form_center_name"  placeholder="Terapias Sta Clarita">
                        </div>

                        <div class="form-group">
                            <label for="exampleInputPassword1">Direccion del centro</label>
                            <input type="text" class="form-control" autocomplete="off" id="form_center_address" name="form_center_address" v-model="form_center_address"  placeholder="Av as Condes xxxx, oficina xx, Piso x">
                            <small id="emailHelp" class="form-text text-muted">Esta direccion al que debe concurrir el paciente a su cita</small>		
                        </div>

                        <div class="form-group">
                        <label for="exampleInputPassword1">Comuna</label>
                        
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

                    </form>
                        
                        <text v-on:click="createNewCenter" class="text-primary text-center mt-3 p-3"> Agregar </text>

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
            
		 }
	},

	props: ['session_params','activatorCreateNewCenter','centerToShowDetails','global_comunas'],
    emits: ['updateCenterList'],

    created () {
         },
 
    methods: {
                 
        selectedComunaCode(comunaCode){
              console.log("Seected comuna Code "+comunaCode); 
              this.form_center_comuna_code = comunaCode ;
        },

        //CREATE New Center
 	    async createNewCenter() {
        console.log ("createNewCenter :" );
        const json = { 
           center_name : this.form_center_name ,
           center_address : this.form_center_address ,
           center_comuna : this.form_center_comuna_code ,
           center_region : this.form_center_region, 
           center_phone1 : this.form_center_phone1 ,
           center_phone2 : this.form_center_phone2 ,
           professional_id: this.session_params.professional_id ,
           
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

