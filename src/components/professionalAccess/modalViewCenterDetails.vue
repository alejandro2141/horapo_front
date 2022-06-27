<script setup>
import { ref } from 'vue'
import axios from 'axios';
import inputFormComuna from  '../publicSearch/InputFormComuna.vue'

</script>

<template>

     	<teleport to="body"   >
		<div  v-if="showModalCenterDetails" class="modal bg-secondary"    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-1  bg-dark">
 
                <div class="modal-body mt-0"  > 

                        <div class="card m-1  " style=" border-radius: 15px;"  >
                        <div class="card-body "  >
                            
                              <div class="d-flex justify-content-between  m-1">
                                <div class="fs-5 mt-1"  >
                                    <i class="text-muted bi bi-geo-alt"></i> Modificar &nbsp; Consulta
                                </div>
                                <div>
                                  &nbsp;&nbsp;&nbsp;
                                </div>
                                <div class="">
                                    <i class="text-primary display-1 bi bi-x-lg ml-0"  v-on:click="showModalCenterDetails = false" aria-label="Close"></i> 
                                </div>
                              </div>

                                <div >
                                    <!-- CENTER VISIT -->
                                    <div v-if="centerToShowDetails.center_visit" >
                                      <!--
                                        <div class="d-flex justify-content-between ">
                                                <text class="h5"><i class="text-muted bi bi-geo-alt"></i> {{centerToShowDetails.name}} </text>
                                                <text class="display-4"></text>  
                                        </div>
                                      -->
                                        <hr class="m-0">
                                        <div class="d-flex justify-content-between mt-4">
                                          <p>
                                                <text class="">Nombre:</text><br>
                                                <input type="text" class="form-control form-control-lg border pl-2 border-primary" id="form_name" name="form_name" :value="centerToShowDetails.name" style="z-index: 9; padding-left: 40px; border-radius: 25px;">
                                          </p>
                                        </div>

                                        <div class="d-flex justify-content-between mt-0">
                                                <text class="mt-2">Tipo:</text>
                                                <text class="text-end"> En Consulta <i class="text-muted h1 bi bi-building"></i> </text>
                                        </div>          
                                        
                                        <p class="mt-3">
                                            <text >Direccion: </text><br>
                                           <!-- <text class="text-end"> {{centerToShowDetails.address}} , {{ comunaId2Name(centerToShowDetails.comuna)  }} </text> -->
                                            <input type="text" class="form-control form-control-lg border pl-2 border-primary" id="form_address" name="form_address" :value="centerToShowDetails.address" style="z-index: 9; padding-left: 40px; border-radius: 25px;">

                                        </p>

                                        
                                         <div v-if="centerToShowDetails.phone1 != 'null' " class="d-flex justify-content-between mt-2">
                                            <text class="">Telefono <i class="text-muted h3 bi bi-telephone"></i>:</text>
                                            <input type="text" class="form-control form-control-lg  border pl-2 border-primary" id="form_phone1" name="form_phone1" :value="centerToShowDetails.phone1" style="z-index: 9; padding-left: 40px; border-radius: 25px;">
                                         </div>

                                         <div v-if="centerToShowDetails.phone2 != 'null' " class="d-flex justify-content-between mt-2">
                                            <text class="">Telefono <i class="text-muted h3 bi bi-telephone"></i>:</text>
                                            <input type="text" class="form-control form-control-lg  border pl-2 border-primary" id="form_phone2" name="form_phone2" :value="centerToShowDetails.phone2" style="z-index: 9; padding-left: 40px; border-radius: 25px;">
                                         </div>


                                    </div>

                                    <!-- A DOMICILIO -->
                                    <div v-if="centerToShowDetails.home_visit" >

                                            <hr class="m-0">

                                            <div class="d-flex justify-content-between mt-4">
                                              <p>
                                                    <text class="">Nombre:</text><br>
                                                    <input type="text" class="form-control form-control-lg border pl-2 border-primary" id="form_name" name="form_name" :value="centerToShowDetails.name" style="z-index: 9; padding-left: 40px; border-radius: 25px;">
                                              </p>
                                            </div>

                                            <div class="d-flex justify-content-between mt-2">
                                                <text class="mt-2">Tipo : </text>
                                                <text></text>
                                                <text class="text-end"> A Domicilio <i class="text-muted h1 bi bi-house-door"></i> </text>
                                                
                                            </div>
                                           
                                            <div class="d-flex justify-content-between mt-3">
                                                    <text> En Comunas: </text>         
                                                    <text></text>
                                                    <text class="text-start">
                                                        <text v-if="comunaId2Name(centerToShowDetails.home_comuna1)!=null" > {{ comunaId2Name(centerToShowDetails.home_comuna1)  }} &nbsp; <br></text> 
                                                        <text v-if="comunaId2Name(centerToShowDetails.home_comuna2)!=null"> {{ comunaId2Name(centerToShowDetails.home_comuna2)  }} &nbsp;  <br></text> 
                                                        <text v-if="comunaId2Name(centerToShowDetails.home_comuna3)!=null"> {{ comunaId2Name(centerToShowDetails.home_comuna3)  }} &nbsp; <br></text> 
                                                        <text v-if="comunaId2Name(centerToShowDetails.home_comuna4)!=null"> {{ comunaId2Name(centerToShowDetails.home_comuna4)  }} &nbsp; <br></text> 
                                                        <text v-if="comunaId2Name(centerToShowDetails.home_comuna5)!=null"> {{ comunaId2Name(centerToShowDetails.home_comuna5)  }} &nbsp; <br></text> 
                                                        <text v-if="comunaId2Name(centerToShowDetails.home_comuna6)!=null"> {{ comunaId2Name(centerToShowDetails.home_comuna6)  }} &nbsp; <br></text> 
                                                    </text>
                                                    
                                             </div>

                                            <div v-if="centerToShowDetails.phone1 != 'null' " class="d-flex justify-content-between mt-2">
                                                <text class="">Telefono 1:</text>
                                                <text class="text-end"><i class="text-muted h3 bi bi-telephone"></i> {{centerToShowDetails.phone1 }}  </text>
                                            </div>

                                            <div v-if="centerToShowDetails.phone1 != 'null' " class="d-flex justify-content-between mt-2">
                                              <text class="">Telefono 2:</text>
                                              <text class="text-end"><i class="text-muted h3 bi bi-telephone"></i> {{centerToShowDetails.phone2 }}  </text>
                                            </div>

                                    </div>

                                    <!-- REMOTE CARE  -->
                                    <div v-if="centerToShowDetails.remote_care" >
                                        
                                         <hr class="m-0">
                                        <div class="d-flex justify-content-between mt-4">
                                          <p>
                                                <text class="">Nombre:</text><br>
                                                <input type="text" class="form-control form-control-lg border pl-2 border-primary" id="form_name" name="form_name" :value="centerToShowDetails.name" style="z-index: 9; padding-left: 40px; border-radius: 25px;">
                                          </p>
                                        </div>

                                        <div class="d-flex justify-content-between mt-0">
                                            <text class="mt-2"> Tipo: </text>
                                            <text> </text>
                                            <text class="text-end"> Tele Atención <i class="text-muted h1 bi bi-camera-video"></i></text>
                                            
                                        </div>
                                       
                                          <div v-if="centerToShowDetails.phone1 != 'null' " class="d-flex justify-content-between mt-2">
                                            <text class="">Telefon de Atención <i class="text-muted h3 bi bi-telephone"></i>:</text>
                                            <input type="text" class="form-control form-control-lg  border pl-2 border-primary" id="form_phone1" name="form_phone1" :value="centerToShowDetails.phone1" style="z-index: 9; padding-left: 40px; border-radius: 25px;">
                                           </div>

                                    </div>
                                
                                </div>

                              <p class="text-center mt-4">
                                <text type="button" class="btn btn-primary" > Guardar los cambios </text>
                              </p>
<hr>
                               <p  @click="removeCenter(centerToShowDetails)" class="text-danger text-end m-3">Eliminar</p>

                                   
                         <!--   <p class="text-end text-muted mt-2"> #{{ center.id }} </p> -->
                        </div>
                    </div>


                    <!--
                     <div class="d-flex flex-row justify-content-end  m-1">
                      <div class="display-5 col-9" style="margin-right: 1em;" > {{centerToShowDetails.name}} </div>
                      <div class=""><i class="display-1 bi bi-x-lg ml-0"  v-on:click="showModalCenterDetails = false" aria-label="Close"></i> </div>
                    </div>
                    <div class="h3">
                        <p>{{centerToShowDetails.address}}</p>
                        <p>{{centerToShowDetails.phone1}}</p>
                        <p>{{centerToShowDetails.phone2}}</p>
                        <p>{{centerToShowDetails.comuna}}</p>
                    </div>
                    <p  @click="removeCenter(centerToShowDetails)" class="text-danger">Eliminar</p>
                    -->

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
 checkbox {width: 30px; height: 30px;}

div.scroll {
       			margin:4px, 4px;
                padding:4px;
               /* background-color: green; */
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

</style>


<script>

export default {

data: function () {
		return {
			showModalCenterDetails : false ,
		 }
	},

	props: ['session_params','activatorViewCenterDetails','centerToShowDetails','global_comunas'],
    emits: ['updateCenterList'],

    created () {
         },
 
    methods: {
        
            async removeCenter(center)
            {
                console.log("Remove this center "+center.id);
                confirm("Esta seguro que desea continuar con la eliminacion de este centro desde su agenda ? ");
                const json = { 
                    center_id : center.id ,	
                    professional_id : this.session_params.professional_id ,			   
                        };
                console.log ("deleteCenter REQUEST :"+ JSON.stringify(json)  );
                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_delete_center",json);
                console.log ("RESPONSE:"+JSON.stringify(response_json.data)) ;
                //location.href = "professional_show_centers.html?"+this.getUrlParam()  ;
                //this.getCenters();
                //his.centers = response_json.data.rows;
                
                this.$emit("updateCenterList"); 
                this.showModalCenterDetails = false ;
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



        },
    
    watch : {
        activatorViewCenterDetails (newValue){
            console.log ("activatorViewCenterDetails !!!"+newValue );  
            this.showModalCenterDetails = true ;
        },
    },
    


}
</script>

