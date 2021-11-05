<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>

   	  <select class="form-select form-control-lg" aria-label="Default" id="form_specialty"  v-model="form_specialty"  name="form_specialty">
            <option selected v-for="(specialty) in specialty_list" :value="specialty.id" :key="specialty.id" > {{specialty.name}} </option>	
      </select>

</template>

<style scoped>
</style>


<script>

export default {
   data : function() {
        return {
      form_specialty : null ,
      specialty_list : [] ,
        }   
    },
   	
    props: ['required_day','session_params'],
    
    emits: ['selectedSpecialtyCode'] ,

	created () {
      this.getSpecialtyList() ;
      console.log("inputFormSpecialtyProfessional  MOUNTED ");
    },

    mounted() { },

    watch: {
    //WATCHER PREDICTOR SPECIALTY
        form_specialty(value, oldValue) {
            this.$emit("selectedSpecialtyCode", this.form_specialty ); 
        },

    },//end watch
	methods :{

        async  getSpecialtyList() {
                    console.log ("GET SPECIALTY LIST METHOD"); 
                        const json = { 
                             professional_id : this.session_params.professional_id  ,		
                                };
                        console.log ("getSpecialtyList REQUEST :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/get_professional_specialty",json);
                        console.log ("getSpecialtyList RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                        this.specialty_list = response_json.data.rows;	
                        //this.specialty_list.sort();	
                        console.log("Specialty list: "+JSON.stringify(this.specialty_list) );
                    },
                },

    }

</script>

