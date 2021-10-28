<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
<div class="position-absolute border-1  d-flex flex-row-reverse " >
    <div class="border text-primary">
     <i @click="switchView()" class=" text-center display-2 bi bi-geo"></i> 
     </div>
</div>
</template>

<style scoped>
</style>


<script>

export default {
   data : function() {
        return {
       
        }   
    },
   	
    props: [],
    emits: ['switchView'] ,

	created () {

	},
	methods :{
        switchView()
        {
            console.log("switch view to");
            this.$emit('switchView');
        }
    }
}
</script>

