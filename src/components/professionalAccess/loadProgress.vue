<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
<div class="d-flex float-end bg-light " >
    <div class=" text-primary ">
     <text v-if="showLoader" class="" >LOADING ...</text> 
     </div>
 </div>
</template>

<style scoped>
</style>


<script>

export default {
   data : function() {
        return {
            // : 'Centros',
       
        }   
    },
   	
    props: ['showLoader'],
    emits: ['timeout'] ,

	created () {
	},
	methods :{
    }
}
</script>

