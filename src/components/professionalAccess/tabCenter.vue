<script setup>
import { ref } from 'vue'
import axios from 'axios';
import ModalCreateCenter from './modalCreateCenter.vue'
import ModalViewCenterDetails from './modalViewCenterDetails.vue'
</script>

<template>
<div>
     <ModalViewCenterDetails  :session_params='session_params' :activatorViewCenterDetails='activatorViewCenterDetails' :centerToShowDetails='centerToShowDetails' v-on:updateCenterList="updateCenterList"  :global_comunas="global_comunas"   > </ModalViewCenterDetails>                    
     <ModalCreateCenter  :session_params='session_params' :activatorCreateNewCenter='activatorCreateNewCenter' :centerToShowDetails='centerToShowDetails'  v-on:updateCenterList="updateCenterList" :global_comunas="global_comunas" >  </ModalCreateCenter>
      
<div  class="mx-auto " style="width: 95%;" >

    <div class="d-flex justify-content-between mt-3">
        
         <i class="bi bi-geo-alt display-3 "></i>
         <p class="h4 text-center  mt-3">
            Sus Consultas
         </p>
         <i class="display-1 bi bi-x-lg ml-0 text-primary" aria-label="Close" v-on:click="closeTabCenter()" ></i> 
    
    </div>

            <p class="text-center lead">
            <small>Direcciones de sus Consultas, donde el paciente debe asistir <i  @click="showInfoCreate=!showInfoCreate" class="bi bi-info-circle-fill text-primary"></i> </small> 
            </p>
            
            <div  v-if='showInfoCreate' class="alert alert-info p-2" >
                - Puede crear cuantas consultas usted quiera. <br>
                - Estas quedan disponibles para sus horarios.<br>
                - La direccion de consulta es donde el paciente debe asistir a su cita<br>
                - En caso de dudas el paciente puede llamarle al telefono de la consulta<br> 
            </div>
            


        <div v-if='centers != null' >       
            <div  id="search_result" v-if='centers.length > 0'  >
                <div v-for="center in centers"  :key='center.id' >
                    <div class="card m-2 border border-secondary" style="width: 18rem; border-radius: 15px;"  :style="{ 'background-color' : center.center_color  }">
                        <div class="card-body"  >
                            
                                <div >
                                    <!-- CENTER VISIT -->
                                    <div v-if="center.center_visit" >
                                        <div class="d-flex justify-content-between ">
                                                <text class="h5">{{center.name}} </text>
                                                <text class=""></text>  
                                        </div>
                                        <hr>
                                        <div class="d-flex justify-content-between mt-0">
                                                <text>Tipo:</text>
                                                <text class="text-end"><i class="h1 bi bi-building"></i> <br> En Consulta</text>
                                        </div>
                                        <div class="d-flex justify-content-between mt-3">
                                                <text>Direccion: </text>
                                                <text class="text-end">{{ comunaId2Name(center.comuna)  }} <br> {{center.address}} </text>
                                        </div>                                      
                                    </div>

                                    <!-- A DOMICILIO -->
                                    <div v-if="center.home_visit" >

                                            <div class="d-flex justify-content-between ">
                                                <text class="h5">Nombre: {{center.name}} </text>
                                                <text class=""> </text>  
                                            </div>
                                           <hr>
                                            <div class="d-flex justify-content-between mt-2">
                                                <text>Tipo : </text>
                                                <text></text>
                                                <text class="text-end"> <i class="h1 bi bi-house-door"></i> <br>A Domicilio </text>
                                                
                                            </div>
                                           
                                            <div class="d-flex justify-content-between mt-3">
                                                    <text> En Comunas: </text>         
                                                    <text></text>
                                                    <text class="text-start">
                                                        <text v-if="comunaId2Name(center.home_comuna1)!=null" > {{ comunaId2Name(center.home_comuna1)  }} &nbsp; <br></text> 
                                                        <text v-if="comunaId2Name(center.home_comuna2)!=null"> {{ comunaId2Name(center.home_comuna2)  }} &nbsp;  <br></text> 
                                                        <text v-if="comunaId2Name(center.home_comuna3)!=null"> {{ comunaId2Name(center.home_comuna3)  }} &nbsp; <br></text> 
                                                        <text v-if="comunaId2Name(center.home_comuna4)!=null"> {{ comunaId2Name(center.home_comuna4)  }} &nbsp; <br></text> 
                                                        <text v-if="comunaId2Name(center.home_comuna5)!=null"> {{ comunaId2Name(center.home_comuna5)  }} &nbsp; <br></text> 
                                                        <text v-if="comunaId2Name(center.home_comuna6)!=null"> {{ comunaId2Name(center.home_comuna6)  }} &nbsp; <br></text> 
                                                    </text>
                                                    
                                             </div>
                                    </div>

                                    <!-- REMOTE CARE  -->
                                    <div v-if="center.remote_care" >
                                        <div class="d-flex justify-content-between ">
                                            <text class="h5">Nombre: </text>
                                            <text class="h5">{{center.name}} </text>  
                                        </div>
                                        <hr>
                                        <div class="d-flex justify-content-between mt-0">
                                            <text> Tipo: </text>
                                            <text> </text>
                                            <text class="text-end">  <i class="h1 bi bi-camera-video"></i>  <br> Tele Atención</text>
                                            
                                        </div>
                                        <div class="d-flex justify-content-between mt-2">
                                            <text> En Telefono: </text>
                                          
                                            <text> 9999999</text>
                                        </div>
                                    </div>
                                
                                </div>
                                    <p class="text-end mt-3" > <text @click="showCenter(center)" class="text-primary">Ver</text>  </p> 

                         <!--   <p class="text-end text-muted mt-2"> #{{ center.id }} </p> -->
                        </div>
                                            </div>   
                </div>  
            </div>

            <div v-else class="mt-1  "  style="border-radius: 15px;" >
                       
                         <p class="p-4 text-center" >    
                            <i class="display-1 bi bi-emoji-expressionless"></i><br>
                            No existen Consultas o Direcciones para sus servicios
                        </p>
                       
            </div>



        </div>



        <div  v-else class=" m-2 p-2">
           <p> Algo de informacion antes de continuar: <br>
            -Puede crear mas de una Consulta<br>
            -La direccion de Consulta es donde el paciente debe asistir <br>
            -Siempre puede ver la lista de Consultas en el link  <text class="text-primary">"Ver Consultas"</text> <br>
           </p>
            <p class="">Para crear su primera Consulta, por favor click en el link siguiente </p>
        </div>

        <div class="text-center p-3 m-3"> 
            <text @click="addNewCenter()"  class="text-primary m-3"> <i class="bi bi-plus-square h5"></i> Agregar nueva Consulta </text>
        </div>
<p><br></p>
        <!--
        <ModalCreateNewCenter  :session_params="session_params" v-on:updateCenterList="updateCenterList" > </ModalCreateNewCenter>
        --> 
</div>       

</div>
</template>

<style scoped>
</style>


<script>

export default {
data: function () {
		return {
			//prevCenterId : 'NoSet' ,
			//centers: null ,
            daterequired: null ,
            centers: [], 
            comuna_list: [] ,
            centerToShowDetails : Object ,
            activatorCreateNewCenter : null ,
            activatorViewCenterDetails : null ,
            showInfoCreate : false 
		 }
	},

	props: ['session_params','global_comunas'],
  	emits : ['switchViewTo'] ,


    created () {
        console.log("TAB CENTER this session_params"+this.session_params.professional_id);
        //this.getComunaList();
        this.comuna_list = this.global_comunas ;
        this.getCenters();
        
   
         },
 
    methods: {

        closeTabCenter()
        {
            console.log("close Center Tab")
            this.$emit('switchViewTo',2 ) ;
        },

        comunaId2Name(comuna_id)
        {
            if (comuna_id != null)
            {
            let aux = this.comuna_list.find(o => o.id === comuna_id)
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
        addNewCenter()
        {
            console.log("Add Center");
            //this.centerToShowDetails = center ; 
            this.activatorCreateNewCenter = Math.random(); 
        },
        showCenter(center){
            console.log("show center details");
            this.centerToShowDetails = center ;
            this.activatorViewCenterDetails = Math.random();     
        },
        /*
        async  getComunaList() {
                    console.log ("GET COMUNA LIST METHOD"); 
                        const json = { 
                        nodata : 'nodata' ,
                                    };
                        console.log ("getComunaList REQUEST :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/common_get_comuna_list",json);
                        console.log ("getComunaList RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                        this.comuna_list = response_json.data.rows;		
                        console.log("getComunaList list: "+JSON.stringify(this.comuna_list) );
                    },   
        */
        //CREATE New Center
        async getCenters() {
                        const json = { 
                        professional_id : this.session_params.professional_id ,			   
                                        };
                        console.log ("GET CENTERS REQUEST :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_centers",json);
                        this.centers = response_json.data.rows;
                        console.log ("RESPONSE CENTERS:"+JSON.stringify(this.centers)) ;                       
                    },			
        //UPDATE CENTER LIST
        updateCenterList()
            {
                console.log("UpdateCenter List");
                this.getCenters();
            },

		},
  

}
</script>

