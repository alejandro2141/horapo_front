<script setup>
import { ref } from 'vue'
import axios from 'axios';
</script>

<template>
       <div class="" >
           <p   >Busquedas mas comunes</p><hr>
            
            <p class="text-start"> <text class="display-5"> Kinesiologia </text><br> <text> A domicilio, Santiago </text> </p> 
            
            <p class="text-end"> <text class="display-5"> Psicologia </text><br> <text> Tele Atención </text> </p> 
            
            <p class="text-start"> <text class="display-5"> Nutrición </text><br> <text> En Centro, Providencia </text> </p> 
   
            <p class="text-end"> <text class="display-5"> Psicologia </text><br> <text> En Centro, Las Condes </text> </p> 
            
            <p class="text-start"> <text class="display-5"> Kinesiologia </text><br> <text> A domicilio, San Miguel </text> </p> 
            


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