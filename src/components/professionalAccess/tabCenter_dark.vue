<script setup>
import { ref } from 'vue'
import axios from 'axios';
import ModalCreateCenter from './modalCreateCenter.vue'
import ModalViewCenterDetails from './modalViewCenterDetails.vue'
import ConsultancyCenter from './consultancy_center.vue'
import ConsultancyHome from './consultancy_home.vue'
import ConsultancyRemote from './consultancy_remote.vue'
import Consultancy from './consultancy.vue'

</script>

<template>
<div class="text-white bg-secondary w-100" >
     <ModalViewCenterDetails  :session_params='session_params' :activatorViewCenterDetails='activatorViewCenterDetails' :centerToShowDetails='centerToShowDetails' v-on:updateCenterList="updateCenterList"  :global_comunas="global_comunas"   > </ModalViewCenterDetails>                    
     <ModalCreateCenter  :session_params='session_params' :activatorCreateNewCenter='activatorCreateNewCenter' :centerToShowDetails='centerToShowDetails'  v-on:updateCenterList="updateCenterList" :global_comunas="global_comunas" >  </ModalCreateCenter>
      
<div  class="w-100" style="width: 100%;" >

    <div class="d-flex justify-content-between mb-0 ">
        
         <!-- <i class="bi bi-geo-alt display-3 "></i> -->
         <text></text>
         <p class="display-6 text-center mt-1  text-white ">
            Tus Consultas <i  @click="showInfoCreate=!showInfoCreate" class="fs-3 bi bi-info border  border-2 border-white " style=" border-radius: 15px;" ></i> 
         </p>
         <text></text>
         <!--
         <i class="mt-4 display-1 bi bi-x-lg  text-primary" aria-label="Close" v-on:click="closeTabCenter()" ></i> 
        -->
    </div>


    <div v-if="session_params.tutorial_center || showInfoCreate" class="bg-white text-dark m-2 p-2 border border-rounded" style="border-radius: 15px;" >
        Tutorial <br>
             Aqui puedes crear tus consultas   
        <div >
        Una consulta es un lugar fisico o virtual donde usted entrega sus servicios profesionales, <br>
        Existen tres tipos de consultas: <br> 
        Consulta En consulta

                          <button type="button" class="btn  m-0 btn-outline-primary"  >
                              <i class="h3 bi bi-building m-0 p-0"></i><br>
                              <text class="fs-6 m-0 p-0">En Consulta</text> 
                          </button>
        <br>
        La direccion de Consulta es donde el paciente debe asistir
        <br>
        Consulta a Domicilio
                          <button type="button" class="btn m-1 btn-outline-primary"  >
                              <i class="h3 bi bi-house-door m-0 p-0"></i><br>
                               <text class="fs-6 m-0 p-0">A Domicilio</text> 
                          </button>
        <br>
        Se indican las comunas donde usted atiende.
        <br>
        Consulta Remota                          
                          <button type="button" class="btn m-0 btn-outline-primary"  >
                              <i class="h3 bi bi-camera-video m-0 p-0"></i><br>
                              <text class="fs-6 m-0 p-0">Tele Atenc. </text> 
                          </button>
        Se entrega el servicio de forma remota telefonica en el telefono indicado. 
        </div>

        Puede crear tantas consultas como usted quiera,estas consultas estarán disponibles para sus calendarios.  
            <br>
        <div class="text-center p-1 m-1"> 
            <text @click="addNewCenter()"  class="m-3 btn btn-primary" style="border-radius: 55px;"> <i class="bi bi-plus-lg"></i> Nueva Consulta </text>
        </div>
            
            <div class="text-primary mt-4 pt-4" @click='finishTutorial()' >
                Finalizar este Tutorial
            </div>


    </div>

            
        <div class="text-center p-1 m-1"> 
            <text @click="addNewCenter()"  class="m-3 btn btn-primary" style="border-radius: 55px;"> <i class="bi bi-plus-lg"></i> Nueva Consulta </text>
        </div>
  
  <div>


        <div v-if='centers != null' >       
            <div  id="search_result" v-if='centers.length > 0'  >
                <div v-for="center in centers"  :key='center.id' >

                    <div class="card m-4 mt-0  bg-secondary border  border-2 border-white  " style=" border-radius: 15px;"  >
                        <div class="card-body pb-1"  >
                            
                                <div >
                                    <!-- CENTER VISIT -->
                                    <div v-if="center.center_visit" >
                                        <Consultancy :centerDetails="center" v-on:updateCenterList="updateCenterList" :global_comunas="global_comunas" :session_params='session_params' > </Consultancy> 

                                    </div>

                                    <!-- A DOMICILIO -->
                                    <div v-if="center.home_visit" >
                                        <Consultancy :centerDetails="center" v-on:updateCenterList="updateCenterList" :global_comunas="global_comunas" :session_params='session_params' > </Consultancy> 

                                        <!--

                                            <div class="d-flex justify-content-between ">
                                                <text class="h5"><i class="text-white bi bi-geo-alt"></i> {{center.name}} </text>
                                                <text class=""> </text>  
                                            </div>
                                            <hr class="m-0">
                                            <div class="d-flex justify-content-between mt-2">
                                                <text class="mt-2">Tipo : </text>
                                                <text></text>
                                                <text class="text-end"> A Domicilio <i class="text-white h1 bi bi-house-door"></i> </text>
                                                
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

                                            <div v-if="center.phone1 != 'null' " class="d-flex justify-content-between mt-2">
                                                <text class="">Telefono 1:</text>
                                                <text class="text-end"><i class="text-muted h3 bi bi-telephone"></i> {{center.phone1 }}  </text>
                                            </div>

                                            <div v-if="center.phone1 != 'null' " class="d-flex justify-content-between mt-2">
                                                <text class="">Telefono 2:</text>
                                                <text class="text-end"><i class="text-muted h3 bi bi-telephone"></i> {{center.phone2 }}  </text> 
                                            </div>
                                            -->

                                    </div>

                                    <!-- REMOTE CARE  -->
                                    <div v-if="center.remote_care" >
                                        <Consultancy :centerDetails="center" v-on:updateCenterList="updateCenterList" :global_comunas="global_comunas" :session_params='session_params' > </Consultancy> 

                                        <!--
                                        <div class="d-flex justify-content-between ">
                                            <text class="h5"><i class="text-white bi bi-geo-alt"></i> {{center.name}} </text>  
                                        </div>
                                         <hr class="m-0">
                                        <div class="d-flex justify-content-between mt-0">
                                            <text class="mt-2"> Tipo: </text>
                                            <text> </text>
                                            <text class="text-end"> Tele Atención <i class="text-white h1 bi bi-camera-video"></i></text>
                                            
                                        </div>
                                        <div class="d-flex justify-content-between mt-2">
                                            <text> En Telefono: </text>
                                          
                                            <text> <i class="text-white h3 bi bi-telephone"></i> 9999999</text>
                                        </div>
                                        -->

                                    </div>
                                
                                </div>

                                
<!--
                                <p class="text-center fs-5 mt-3 mb-0" > <text  @click="showCenter(center)" class="text-white"> <i class="bi bi-pencil"></i>  </text>  </p>
 -->               

                                   
                         <!--   <p class="text-end text-muted mt-2"> #{{ center.id }} </p> -->
                        </div>
                    </div>
                
                
               
                </div>  
                
            </div>

            <div v-else class="mt-1 text-center "  style="border-radius: 15px;" >
                   <text class="fs-2">
                    Crea tu primera Consulta!!
                   </text>                     
            </div>


        </div>

</div>

        <!--
        <div  v-else class=" m-2 p-2">
           <p> Algo de informacion antes de continuar: <br>
            -Puede crear mas de una Consulta<br>
            -La direccion de Consulta es donde el paciente debe asistir <br>
            -Siempre puede ver la lista de Consultas en el link  <text class="text-primary">"Ver Consultas"</text> <br>
           </p>
            <p class="">Para crear su primera Consulta, por favor click en el link siguiente </p>
        </div>
        -->

        

       
        <p>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
        </p>
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
         async finishTutorial()
        {
           const json = { 
                     professional_id: this.session_params.professional_id ,
                     tutorial: 2,
           };
            let restemp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_shutdown_tutorial",json);
            this.session_params.tutorial_center = false ;   
        },

        closeTabCenter()
        {
            console.log("close Center Tab")
            this.$emit('switchViewTo',2 ) ;
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

