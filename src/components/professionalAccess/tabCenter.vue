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

            <p class="text-center h4 mt-3">Consultas en su Agenda</p>
            
        <div v-if='centers != null' >       
            <div  id="search_result" v-if='centers.length > 0'  >
                <div v-for="center in centers"  :key='center.id' >
                    <div class="card m-3 border border-secondary" style="width: 18rem; border-radius: 15px;"  :style="{ 'background-color' : center.center_color  }">
                        <div class="card-body"  >
                            
                                <div class="card-title ">
                                    <div v-if="center.center_visit" >
                                           <i class="h1 bi bi-building"></i> <text class="h3"> {{center.name}} </text>
                                            <p class="card-title"> <b> Cita a en Consulta </b><br> 
                                            Direccion: </p>
                                            <p class="card-text">{{center.address}}  , 
                                            {{ comunaId2Name(center.comuna)  }} 
                                            </p> 
                                    
                                    </div>
                                    <div v-if="center.home_visit" >
                                           <i class="h1 bi bi-house-door"></i>  <text class="h3"> {{center.name}} </text>
                                                <p class="card-title"> <b> Cita a Domicilio  </b> <br>En Comunas: </p>
                                                <text v-if="comunaId2Name(center.home_comuna1)!=null" > {{ comunaId2Name(center.home_comuna1)  }} &nbsp; <br></text> 
                                                <text v-if="comunaId2Name(center.home_comuna2)!=null"> {{ comunaId2Name(center.home_comuna2)  }} &nbsp;  <br></text> 
                                                <text v-if="comunaId2Name(center.home_comuna3)!=null"> {{ comunaId2Name(center.home_comuna3)  }} &nbsp; <br></text> 
                                                <text v-if="comunaId2Name(center.home_comuna4)!=null"> {{ comunaId2Name(center.home_comuna4)  }} &nbsp; <br></text> 
                                                <text v-if="comunaId2Name(center.home_comuna5)!=null"> {{ comunaId2Name(center.home_comuna5)  }} &nbsp; <br></text> 
                                                <text v-if="comunaId2Name(center.home_comuna6)!=null"> {{ comunaId2Name(center.home_comuna6)  }} &nbsp; <br></text> 
                         
                                    </div>
                                    <div v-if="center.remote_care" >
                                            <i class="h1 bi bi-camera-video"></i> <text class="h3"> {{center.name}} </text>
                                            <p>Tele Atención  </p>
                                    </div>
                                
                                </div>

                            <p class="text-end" > <text @click="showCenter(center)" class="text-primary">Ver</text>  </p> 
                            <p class="text-end text-muted mt-2"> #{{ center.id }} </p>
                        </div>
                    </div>   
                </div>  
            </div>

            <div v-else class="mt-1  "  style="border-radius: 15px;" >
                       
                         <p class="p-4 text-center" >    
                            <i class="display-1 bi bi-emoji-expressionless"></i><br>
                            Aun No existen Direcciones 
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
		 }
	},
	props: ['session_params','global_comunas'],

    created () {
        console.log("TAB CENTER this session_params"+this.session_params.professional_id);
        //this.getComunaList();
        this.comuna_list = this.global_comunas ;
        this.getCenters();
        
   
         },
 
    methods: {
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

