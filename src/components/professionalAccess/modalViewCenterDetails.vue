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
			<div class="modal-container  m-1 p-1 modal-background">
 

                <div class="modal-body mt-0"  > 
                   
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
			showModalCenterDetails : false ,
		 }
	},

	props: ['session_params','activatorViewCenterDetails','centerToShowDetails'],
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

        },
    
    watch : {
        activatorViewCenterDetails (newValue){
            console.log ("activatorViewCenterDetails !!!"+newValue );  
            this.showModalCenterDetails = true ;
        },
    },
    


}
</script>

