<script setup>
import { ref } from 'vue'
import axios from 'axios';
import specialtyCircle from './SpecialtyCircle.vue'

</script>

<template>
       <div class="opacity-100" style=" border-radius: 10%;" >
       
            
        
        <div class="d-flex justify-content-center mb-0">
            
            <div @click="search_center = !search_center" :style="{  'border-radius': '50%' ,'width': '5.5em', 'height': '5.5em' }" class="border  border-3  p-0 m-1 d-flex justify-content-center align-items-center" :class="{'border-primary' : search_center  }" > 
                <div class="m-2">
                    <i  class="bi bi-building m-0  display-3 d-flex justify-content-center" style="color: #781ED1;"></i>
                    <text style="font-size: 0.7em;">En Consulta</text>
                </div>
            </div>
            <div @click="search_home = !search_home" :style="{  'border-radius': '50%' ,'width': '5.5em', 'height': '5.5em' }" class="border  border-3  p-0 m-2 d-flex justify-content-center align-items-center" :class="{'border-primary' : search_home }" > 
                <div class="m-2">
                    <i  class="bi bi-house-door m-0  display-3 d-flex justify-content-center" style="color:#3399FF;"></i>
                    <text style="font-size: 0.7em;">A Domicilio</text>
                </div>
            </div>
            <div @click="search_remote = !search_remote" :style="{  'border-radius': '50%' ,'width': '5.5em', 'height': '5.5em' }" class="border  border-3  p-0 m-1 d-flex justify-content-center align-items-center" :class="{'border-primary' : search_remote }" > 
               <div class="m-2">
                    <i  class="bi bi-camera-video m-0 display-3 d-flex justify-content-center" style="color:#b36b00;"></i>
                    <text style="font-size: 0.7em;">Remoto</text>
                </div>
            </div>
        </div>

            <div class=" " style="">
            
            <!--
            <div v-for='(specialty,index) in global_specialties' :key='specialty.id' >
                <specialtyCircle @click="sendSuggestedSearch(specialty)" :specialty='specialty' :index='index' > </specialtyCircle>
            </div>
            -->
            <div class="w-100 mb-0 mt-3 pb-0 d-flex justify-content-center">
                <specialtyCircle @click="sendSuggestedSearch(global_specialties[0]); circleColors[0]='#eeeeee' ; scrollDown()  " :specialty='global_specialties[0]' :color='circleColors[0]' > </specialtyCircle>
                <specialtyCircle @click="sendSuggestedSearch(global_specialties[1]); circleColors[1]='#eeeeee'" :specialty='global_specialties[1]' :color='circleColors[1]' > </specialtyCircle>
                <specialtyCircle @click="sendSuggestedSearch(global_specialties[2]); circleColors[2]='#eeeeee'" :specialty='global_specialties[2]' :color='circleColors[2]' > </specialtyCircle>
            </div>
            <div class="w-100 mt-0 pt-0 d-flex justify-content-center">
                <specialtyCircle @click="sendSuggestedSearch(global_specialties[3]); circleColors[3]='#eeeeee'" :specialty='global_specialties[3]' :color='circleColors[3]' > </specialtyCircle>
                <specialtyCircle @click="sendSuggestedSearch(global_specialties[4]); circleColors[4]='#eeeeee'" :specialty='global_specialties[4]' :color='circleColors[4]' > </specialtyCircle>
            </div>
            <div class="w-100 mt-0 pt-0  mb-3 pb-2 d-flex justify-content-center">
                <specialtyCircle @click="sendSuggestedSearch(global_specialties[5]); circleColors[5]='#eeeeee'" :specialty='global_specialties[5]' :color='circleColors[5]' > </specialtyCircle>
                <specialtyCircle @click="sendSuggestedSearch(global_specialties[6]); circleColors[6]='#eeeeee'" :specialty='global_specialties[6]' :color='circleColors[6]' > </specialtyCircle>
                <specialtyCircle @click="sendSuggestedSearch(global_specialties[7]); circleColors[7]='#eeeeee'" :specialty='global_specialties[7]' :color='circleColors[7]' > </specialtyCircle>
            </div>


            
           
            </div>
            
 

        </div>
</template>

<style scoped>

</style>


<script>
//const showForm = ref(false)

export default {
   data : function() {
        return {
        circleColors: ['#b7d8d6','#DDC696','#CEF3DD','#568281','#BBBBBB','#91B8C1','#FFBFA3','#ffe999','#89dee2'],
        search_center :false ,
        search_home :false ,
        search_remote :false ,
        
        }
    },  
 
   props: ['global_comunas', 'global_specialties', 'scrollToResults' ], 
   emits: ["suggestedSearchCall"],

mounted() {   
       },

    watch: {
        },

    methods: {
        scrollDown()
        {
        //this.$emit("scrollToResults")
        },

        sendSuggestedSearch(specialty)
        {
            //console.log("SuggestedSearch specialty:"+specialty+"  type:"+type)
            const search_params = { 
				        specialty : specialty ,
                        type_home : this.search_home  ,
                        type_center : this.search_center ,
                        type_remote : this.search_remote ,
                        location : null ,
                        date :  null  ,  
                  		  };

            setTimeout(() => { this.$emit("suggestedSearchCall",search_params ); }, 500);
            
        }

    },


}

</script>