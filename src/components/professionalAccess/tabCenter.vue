<script setup>
import { ref } from 'vue'
import axios from 'axios';
import ModalCreateCenter from './modalCreateCenter.vue'
import ModalViewCenterDetails from './modalViewCenterDetails.vue'


</script>

<template>

     <ModalViewCenterDetails  :session_params='session_params' :activatorViewCenterDetails='activatorViewCenterDetails' :centerToShowDetails='centerToShowDetails' > </ModalViewCenterDetails> 
                    
     <ModalCreateCenter v-on:updateCenterList='updateCenterList' :session_params='session_params' :activatorCreateNewCenter='activatorCreateNewCenter' :centerToShowDetails='centerToShowDetails' >  </ModalCreateCenter>
      
<div  class="mx-auto " style="width: 95%;" >
        <text class="h4">Centros de Atencion en su agenda </text> 
	
        <div id="search_result" >
            <div v-for="center in centers"  :key='center.id' >
    
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title"><i class="bi bi-building display-2"></i> {{center.name}}</h5>
                    <p class="card-text">{{center.address}}</p>
                    <p class="text-end" > <text @click="showCenter(center)" class="text-primary">Ver</text>  </p>
                </div>
                </div>   
            </div>
        </div>

        <div class="d-flex justify-content-between"> 
            <button @click="addNewCenter()" type="button" class="btn btn-primary m-3"> <i class="bi bi-plus-square h5"></i> Agregar un nuevo centro </button>
        </div>

       <!--
    <ModalCreateNewCenter  :session_params="session_params" v-on:updateCenterList="updateCenterList" > </ModalCreateNewCenter>
  -->  
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
	props: ['session_params'],

    created () {
        console.log("TAB CENTER this session_params"+this.session_params.professional_id);
        this.getComunaList();
        this.getCenters();
   
         },
 
    methods: {
        updateCenterList(){
            console.log('Update Center List in Tab Center');
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
            //DELETE Center
            async deleteCenter(id) {
                        confirm("Esta seguro que desea continuar con la eliminacion de este centro ? ");
                        const json = { 
                            center_id : id ,	
                            professional_id : this.session_params.professional_id ,			   
                                };
                        console.log ("deleteCenter REQUEST :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_delete_center",json);
                        console.log ("RESPONSE:"+JSON.stringify(response_json.data)) ;
                        //location.href = "professional_show_centers.html?"+this.getUrlParam()  ;
                        this.getCenters();
                        //this.centers = response_json.data.rows;
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

