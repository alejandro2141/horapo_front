<script setup>
import { ref } from 'vue'
import axios from 'axios';
import inputFormComuna from  './InputFormComuna2.vue'

</script>

<template>

    <div>
     <form autocomplete="off">	
                                        <div class="d-flex justify-content-start ">

                                         <div v-if="showEditOptions" class="d-flex justify-content-between " >
                                             <text  @click="deleteCenter()" class="text-danger"> <i class="fs-1 m-1 bi bi-trash"></i>  </text>
                                        </div>

                                         <i v-else class=" bi bi-geo-alt fs-1 m-1"></i> 
                                         <input :disabled="!showEditOptions "  type="text" :class="{ 'bg-dark border border-white': showEditOptions }"  class="bg-white border-0 text-dark form-control form-control-lg" id="form_phone2" name="form_phone2" v-model="name" style="z-index: 9;  border-radius: 25px; width:80%;  text-align: left; ">
                                         
                                        </div>

                                        <hr class="m-0">
                                        <!--
                                        <div v-if="showEditOptions" class="d-flex justify-content-between mt-0" >
                                             <text  @click="deleteCenter()" class="mt-2 text-danger bg-white "> Eliminar Este centro </text>
                                           
                                        </div>
                                        -->
                                        <!--
                                        <div class="d-flex justify-content-between mt-0">
                                                <text class="mt-2">Tipo:</text>
                                                <text v-if="centerDetails.home_visit"  class="text-end"> A Domicilio <i class="text-white h1 bi bi-house-door"></i> </text>
                                                <text v-if="centerDetails.center_visit"  class="text-end"> En Consulta <i class="text-white h1 bi bi-building"></i> </text>
                                                <text v-if="centerDetails.remote_care"  class="text-end">Atencion Remota <i class="text-white h1 bi bi-camera-video"></i> </text>
                                        </div>
                                        -->

                <text class="mt-2">Tipo:</text>
                      <div class="d-flex justify-content-between " >
                          <button  v-if="app_type_center || showEditOptions"  type="button" class="btn  m-1" :class="[ app_type_center ? 'btn-outline-dark': 'btn-outline-dark' ]" @click="app_type_home=false ; form_app_type = 1; app_type_center=true ; app_type_tele=false ;" >
                              <i class="h3 bi bi-building m-0 p-0"></i><br>
                              <text class="fs-6 m-0 p-0">Consulta</text> 
                          </button>
                          
                          <button v-if="app_type_home || showEditOptions"  type="button" class="btn  m-1" :class="[ app_type_home  ? 'btn-outline-dark': 'btn-outline-dark' ]"   @click="app_type_home=true ; form_app_type = 2 ; app_type_center=false ; app_type_tele=false ;" >
                              <i class="h3 bi bi-house-door m-0 p-0"></i><br>
                               <text class="fs-6 m-0 p-0">Domicilio</text> 
                          </button>
                          
                          <button v-if="app_type_remote || showEditOptions" type="button" class="btn  m-1" :class="[ app_type_remote  ? 'btn-outline-dark': 'btn-outline-dark' ]" @click="app_type_home=false ; form_app_type = 3 ; app_type_center=false; app_type_tele=true ;" >
                              <i class="h3 bi bi-camera-video m-0 p-0"></i><br>
                              <text class="fs-6 m-0 p-0">Tele Aten. </text> 
                          </button>
                      </div>
   
                    <div v-if="app_type_center" class="mt-3">
                        <text >Direccion: </text><br>
                        <!--  <text class="text-end">{{center.address}}, {{ comunaId2Name(center.comuna)  }} </text> -->
                        <input :disabled="!showEditOptions "  type="text" :class="[showEditOptions ? ' border border-1 border-primary' : 'bg-white border border-0 text-dark ' ]" class="form-control" id="form_phone2" name="form_phone2" v-model="address" style="z-index: 9;  border-radius: 25px; width:100%;  text-align: right; ">
                        
                        <text >Comuna: </text><br>
                        <text class="text-end ">&nbsp;&nbsp; {{ comunaId2Name(center_comuna)  }} </text>
                        <div v-if="showEditOptions" class="d-flex justify-content-between mt-3">
                            <inputFormComuna  v-on:selectedComunaCode="selectedComunaCode_center" :global_comunas='global_comunas' > </inputFormComuna> 
                            <!-- <text class="display-1">+</text> -->
                        </div>
                    </div>
                        
                    <div v-if="app_type_home" class="mt-2 " >               
                        <p >Comuna(s): </p>
                        <div  class="mt-2" >
                                <div v-if="app_type_home || app_type_center" >
                                    <p class="text-end" v-if="home_comuna1!=null">  {{ comunaId2Name(home_comuna1) }}  <i @click="home_comuna1=null" v-if="showEditOptions" class="fs-1 m-1 bi bi-trash"></i></p>
                                    <p class="text-end" v-if="home_comuna2!=null">  {{ comunaId2Name(home_comuna2)  }} <i @click="home_comuna2=null" v-if="showEditOptions" class="fs-1 m-1 bi bi-trash"></i></p>
                                    <p class="text-end" v-if="home_comuna3!=null">  {{ comunaId2Name(home_comuna3)  }} <i @click="home_comuna3=null" v-if="showEditOptions" class="fs-1 m-1 bi bi-trash"></i></p>
                                    <p class="text-end" v-if="home_comuna4!=null">  {{ comunaId2Name(home_comuna4)  }} <i @click="home_comuna4=null" v-if="showEditOptions" class="fs-1 m-1 bi bi-trash"></i></p>
                                    <p class="text-end" v-if="home_comuna5!=null">  {{ comunaId2Name(home_comuna5)  }} <i @click="home_comuna5=null" v-if="showEditOptions" class="fs-1 m-1 bi bi-trash"></i></p>
                                </div>
                        </div>
                        <div v-if="showEditOptions" class="d-flex justify-content-between mt-3">
                            <inputFormComuna  v-on:selectedComunaCode="selectedComunaCode" :global_comunas='global_comunas' > </inputFormComuna> 
                            <text class="display-1">+</text>
                        </div>

                    </div>

                                        <div v-if="centerDetails.phone1 != 'null' " class="d-flex justify-content-between mt-3">
                                            <text class="">Telefono 1:</text>
                                            <input :disabled="!showEditOptions "  type="text" :class="[showEditOptions ? ' border border-1 border-primary' : 'bg-white border border-0 text-dark ' ]"  class="form-control  " id="form_phone2" name="form_phone2" v-model="phone1" style="z-index: 9;  border-radius: 25px; width:40%;  text-align: right; ">
                                          <!--  <text class="text-end"><i class="text-muted h3 bi bi-telephone"></i> {{center.phone1 }}  </text> -->
                                        </div>
<hr>
                                        <p v-if="showEditButton" class="text-end fs-5 mt-1  mb-0" >  
                                            <i @click="showEditOptions=true;showEditButton=false" class="text-primary bi bi-pencil"></i>    
                                        
                                        </p>
                                        
                                        <div v-if="showEditOptions" class="mt-2 d-flex justify-content-between text-primary"  >
                                            <text @click="showEditOptions=false;showEditButton=true;resetData()" >CANCELAR  </text><br>
                                            <text @click="saveChanges();showEditOptions=false;showEditButton=true;" >GUARDAR </text>
                                        </div>

    </form>
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

            app_type_home :  false ,
            app_type_center : false ,
            app_type_remote : false , 

            name : null ,
            address: null ,
            phone1: null,
            phone2: null,

            home_comuna1 : null ,
            home_comuna2 : null ,
            home_comuna3 : null ,
            home_comuna4 : null ,
            home_comuna5 : null ,

            center_comuna : null,
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
       
        this.app_type_home = this.centerDetails.home_visit 
        this.app_type_center = this.centerDetails.center_visit 
        this.app_type_remote = this.centerDetails.remote_care 
	
        this.home_comuna1 = this.centerDetails.home_comuna1 
        this.home_comuna2 = this.centerDetails.home_comuna2 
        this.home_comuna3 = this.centerDetails.home_comuna3 
        this.home_comuna4 = this.centerDetails.home_comuna4 
        this.home_comuna5 = this.centerDetails.home_comuna5 

        this.center_comuna = this.centerDetails.comuna

    },

	methods :{

        selectedComunaCode(comuna_code)
        {
            console.log("Comuna code selected"+comuna_code)
            if (this.home_comuna1 ==null )
            { this.home_comuna1 = comuna_code
            return
            }
            if (this.home_comuna2 ==null )
            { this.home_comuna2 = comuna_code
            return
            }
            if (this.home_comuna3 ==null )
            { this.home_comuna3 = comuna_code
            return
            }
            if (this.home_comuna4 ==null )
            { this.home_comuna4 = comuna_code
            return
            }
            if (this.home_comuna5 ==null )
            { this.home_comuna5 = comuna_code
            return
            }
            
        },

        selectedComunaCode_center(comuna_code)
        {
            console.log("Comuna code Center selected"+comuna_code)
             this.center_comuna = comuna_code
                        
        },

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
                          home_comuna1 : this.home_comuna1, 
                          home_comuna2 : this.home_comuna2, 
                          home_comuna3 : this.home_comuna3, 
                          home_comuna4 : this.home_comuna4, 
                          home_comuna5 : this.home_comuna5, 
                          
                          center_comuna: this.center_comuna,

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
        this.address = this.centerDetails.address ; 
        this.phone1 = this.centerDetails.phone1 ;
        this.phone2 = this.centerDetails.phone2 ;
       
        this.app_type_home = this.centerDetails.home_visit 
        this.app_type_center = this.centerDetails.center_visit 
        this.app_type_remote = this.centerDetails.remote_care 
	
        this.home_comuna1 = this.centerDetails.home_comuna1 
        this.home_comuna2 = this.centerDetails.home_comuna2 
        this.home_comuna3 = this.centerDetails.home_comuna3 
        this.home_comuna4 = this.centerDetails.home_comuna4 
        this.home_comuna5 = this.centerDetails.home_comuna5 

        this.center_comuna = this.centerDetails.comuna

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

