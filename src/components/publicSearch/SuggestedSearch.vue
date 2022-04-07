<script setup>
import { ref } from 'vue'
import axios from 'axios';
</script>

<template>
       <div class="" >
           <hr>
           <p>Busquedas mas comunes</p>
           <hr>
            
            <p class="text-start"> <text class="display-5"> Kinesiologia </text><br> <text class="text-muted"> A domicilio, Santiago </text> </p> 
            
            <p class="text-end"> <text class="display-5"> Psicologia </text><br> <text class="text-muted"> Tele Atención </text> </p> 
            
            <p class="text-start"> <text class="display-5"> Nutrición </text><br> <text class="text-muted"> En Centro, Providencia </text> </p> 
   
            <p class="text-end"> <text class="display-5"> Psicologia </text><br> <text class="text-muted"> En Centro, Las Condes </text> </p> 
            
            <p class="text-start"> <text class="display-5"> Kinesiologia </text><br> <text class="text-muted"> A domicilio, San Miguel </text> </p> 
            


        </div>
</template>

<style scoped>

</style>


<script>
//const showForm = ref(false)

export default {
   data : function() {
        return {
        }
    },  
 
   props: ['global_comunas'], 
   emits: ["selectedSearch"],

mounted() {   
       },

    watch: {
        },

    methods: {
        },


}

</script>