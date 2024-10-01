<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { BKND_CONFIG } from '../../../config123.js'

</script>

<template>

   	<div class="form-check form-switch">
        <div selected v-for="(specialty, index) in specialty_list" :value="specialty" :key="specialty.id" > 
            {{specialty.name}}
            <input  class="form-check-input" type="checkbox" :id="'flexSwitchCheckDefault_'+index" :value="specialty" v-model="checkedInput"  >
        </div>
    </div>

</template>

<style scoped>
</style>


<script>

export default {
   data : function() {
        return {
      form_specialty : null ,
      specialty_list : [] ,
      specialty_selected : [] ,
      checkedInput : [],
        }   
    },
   	
    props: ['required_day','session_params'],
    
    emits: ['selectedSpecialties'] ,

	created () {
      this.getSpecialtyList() ;
      console.log("inputFormSpecialtyProfessional  MOUNTED ");
    },

    mounted() { },

    watch: {
    //WATCHER PREDICTOR SPECIALTY
        checkedInput(value, oldValue) {
             console.log("Specialty Selected "+value );
            this.$emit("selectedSpecialties", JSON.stringify(this.checkedInput) ); 
        },

        

    },//end watch
	methods :{
        showSpecialty_selected()
        {
            console.log("Specialty Selected "+JSON.stringify(this.checkedInput) );
        },

        updateSpecialtyListSelected()
        {
            console.log("UpdateSpecialtyListSelected sending Emit");
            //remove nulls

        },

        async  getSpecialtyList() {
                    console.log ("GET SPECIALTY LIST METHOD"); 
                        const json = { 
                             professional_id : this.session_params.professional_id  ,		
                                };
                        console.log ("getSpecialtyList REQUEST :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/get_professional_specialty",json);
                        console.log ("getSpecialtyList RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                        this.specialty_list = response_json.data.rows;	
                        this.specialty_selected = this.specialty_list ;
                        
                        //this.specialty_list.sort();	
                        console.log("Specialty list: "+JSON.stringify(this.specialty_list) );
                    },
                },

    }

</script>

