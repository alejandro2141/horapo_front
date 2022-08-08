<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>

    <div>
                                        <div class="d-flex justify-content-start ">
                                           
                                         <i class=" bi bi-geo-alt fs-1 m-1"></i> 
                                         <input :disabled="!showEditOptions "  type="text" :class="{ 'bg-dark border border-white': showEditOptions }"  class="bg-secondary border-0 text-white form-control form-control-lg" id="form_phone2" name="form_phone2" v-model="name" style="z-index: 9;  border-radius: 25px; width:80%;  text-align: left; ">
                                         
                                        </div>

                                        <hr class="m-0">

                                        <div v-if="showEditOptions" class="d-flex justify-content-between mt-0" >
                                             <text  @click="deleteCenter()" class="mt-2 text-danger bg-white "> Eliminar Este centro </text>
                                           
                                        </div>
                                        
                                        <div class="d-flex justify-content-between mt-0">
                                                <text class="mt-2">Tipo:</text>
                                                <text class="text-end"> En Consulta <i class="text-white h1 bi bi-building"></i> </text>
                                        </div>

                                        
                                        <p class="mt-3">
                                            <text >Direccion: </text><br>
                                          <!--  <text class="text-end">{{center.address}}, {{ comunaId2Name(center.comuna)  }} </text> -->
                                                <input :disabled="!showEditOptions "  type="text" :class="{ 'bg-dark border border-white': showEditOptions }"  class="bg-secondary border-0 text-white form-control  " id="form_phone2" name="form_phone2" v-model="address" style="z-index: 9;  border-radius: 25px; width:100%;  text-align: right; ">
                                       </p>

                                        <div class="mt-2 d-flex justify-content-between" >
                                            <text >Comuna : </text><br>
                                            <text class="text-end"> {{ comunaId2Name(centerDetails.comuna)  }} </text>
                                        </div>

                                        <div v-if="centerDetails.phone1 != 'null' " class="d-flex justify-content-between mt-3">
                                            <text class="">Telefono 1:</text>
                                            <input :disabled="!showEditOptions "  type="text" :class="{ 'bg-dark border border-white': showEditOptions }"  class="bg-secondary border-0 text-white form-control  " id="form_phone2" name="form_phone2" v-model="phone1" style="z-index: 9;  border-radius: 25px; width:40%;  text-align: right; ">
                                       
                                          <!--  <text class="text-end"><i class="text-muted h3 bi bi-telephone"></i> {{center.phone1 }}  </text> -->
                                        </div>

                                        <div v-if="centerDetails.phone1 != 'null' " class="d-flex justify-content-between mt-2">
                                            <text class="">Telefono 2:</text>
                                           <input :disabled="!showEditOptions "  type="text" :class="{ 'bg-dark border border-white': showEditOptions }"  class="bg-secondary border-0 text-white form-control  " id="form_phone2" name="form_phone2" v-model="phone2" style="z-index: 9;  border-radius: 25px; width:40%;  text-align: right; ">
                                        </div>
<hr>
                                        <p v-if="showEditButton" class="text-end fs-5 mt-1  mb-0" >  
                                            <i @click="showEditOptions=true;showEditButton=false" class="text-white bi bi-pencil"></i>    
                                        
                                        </p>
                                        
                                        <div v-if="showEditOptions" class="mt-2 d-flex justify-content-between" >
                                            <text @click="showEditOptions=false;showEditButton=true;resetData()" >CANCELAR  </text><br>
                                            <text @click="saveChanges();showEditOptions=false;showEditButton=true;" >GUARDAR </text>
                                        </div>

    </div>

</template>

<style scoped>

</style>


<script>

export default {
   data : function() {
        return {
            showEditOptions : false ,
            showEditButton : true, 

            name : null ,
            address: null ,
            phone1: null,
            phone2: null,
        }   
    },
   	
	props: [ 'centerDetails' , 'global_specialties' , 'global_comunas','session_params' ],
    emits: ['updateCenterList'],

	created () {
        console.log("Consultancy_Center ");
        this.name = this.centerDetails.name ; 
        this.address = this.centerDetails.address ; 
        this.phone1 = this.centerDetails.phone1 ;
        this.phone2 = this.centerDetails.phone2 ;
	},

	methods :{

        async deleteCenter()
        {
            console.log("Delete Center");
              
                var r =confirm("Centro ya No estará disponible para seleccionar en los Calendarios");
                  if (r == true) {

                        const json = { 
                          professional_id: this.session_params.professional_id ,
                          center_id :  this.centerDetails.id,
                          };
                       
                        console.log("Delete Center REQUEST :"+JSON.stringify(json));
                        
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_delete_center",json);
                        console.log ("Delete Center  RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                        let aux_resp = response_json.data.rows ; 
                        //this.showModalViewCalendar = false ; 
                        this.$emit('updateCenterList'); 
                        //this.showModalCenterDetails = false
                  }
        },

        async saveChanges()
        {
        console.log("Save Changes");
              
                var r =confirm("OK para Guardar Cambios");
                  if (r == true) {

                        const json = { 

                          professional_id: this.session_params.professional_id ,
                          center_id :  this.centerDetails.id,
                          name :  this.name  , 
                          address : this.address ,
                          //comuna_code :  this.form_comuna_code,
                          //location: this.form_center_location,
                          phone1 : this.phone1,
                          phone2 : this.phone2,
                          //home_locations : [] ,
                          };
                       
                        console.log("Save Center  REQUEST :"+JSON.stringify(json));
                        
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_update_center",json);
                        console.log ("Update Center  RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                        let aux_resp = response_json.data.rows ; 
                        //this.showModalViewCalendar = false ; 
                        this.$emit('updateCenterList'); 
                        //this.showModalCenterDetails = false
                  }

        },

        resetData()
        {
        this.name = this.centerDetails.name ; 
        this.phone1 = this.centerDetails.phone1 ;
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

    }
}
</script>

