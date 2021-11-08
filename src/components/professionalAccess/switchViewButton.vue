<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
<div class="d-flex float-end bg-light " >
    <div class=" text-primary ">
     <text @click="switchView()" class="" >{{cview}}</text> 
     </div>
 </div>
</template>

<style scoped>
</style>


<script>

export default {
   data : function() {
        return {
            cview : 'Centros',
       
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
            if (this.cview == 'Agenda'){
                this.cview = 'Centros'
            }
            else{
                this.cview = 'Agenda'
            }

        }
    }
}
</script>

