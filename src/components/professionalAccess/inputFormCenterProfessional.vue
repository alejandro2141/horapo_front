<script setup>
import { ref } from 'vue'
import axios from 'axios';
import SwitchViewButton from './switchViewButton.vue'
import { BKND_CONFIG } from '../../../config123.js'


</script>

<template>

    <div v-if="center_list.length > 0" >
   	  <select style="border-radius: 10px;"  class="bg-white border border-1 text-dark form-control" :class="{ 'bg-white ': true  }" aria-label="Default" id="form_center"  v-model="form_center"  name="form_center">
            <option selected v-for="(center) in center_list" :value="center.id" :key="center.id" > {{center.name}}-[{{getCenterType(center)}}]</option>	
      </select>
    </div>
    <div v-else >
          <SwitchViewButton v-if="session_params['professional_name']"  v-on:switchView="switchView" ></SwitchViewButton>

    </div>

</template>

<style scoped>
</style>


<script>

export default {
   data : function() {
        return {
      form_center : null ,
      center_list : [] ,
        }   
    },
   	
    props: ['required_day','session_params'],
    
    emits: ['selectedCenterCode','switchView','centersError','centers_found_flag_emit'] ,

	async created () {
      await this.getCenters() ;
     
    },

    mounted() {   
        },

    watch: {
    //WATCHER CENTER to pass the value to parent
        form_center(value, oldValue) {
            this.$emit("selectedCenterCode", this.form_center ); 
        },
    },//end watch

	methods :{
        getCenterType(center)
        {
            if (center.center_visit)
            {return "En Consulta"}
            if (center.home_visit)
            {return "A Domicilio"}
            if (center.remote_care)
            {return "Tele Atención"}
        },

        switchView(){
            this.$emit('switchView');
         },

        async getCenters() {
			const json = { 
			   professional_id : this.session_params.professional_id  ,			   
   			   	      };
			console.log ("getCenters REQUEST :"+ JSON.stringify(json)  );
			let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/professional_get_centers",json);
			console.log ("getCenters RESPONSE :"+JSON.stringify(response_json.data.rows)) ;
			this.center_list = response_json.data.rows;
            //this.prevCenterName="noset";
            console.log("inputFormCenterProfessiona  MOUNTED ");
            this.$emit("centers_found_flag_emit", (this.center_list.length > 0 ) );

			},


            },

    }

</script>

