<script setup>
import { ref } from 'vue'

</script>

<template>
<div>
  
        <div class="text-center" >
        
        </div>

        <div class=" border text-center m-2 p-3">
            <p class="display-1">Bienvenido </p>
            <p> <i class="display-1 bi bi-emoji-wink"></i> </p>
            <p>
            Lo primero que debes hacer es crear un Centro. 
            </p>
            <p>
            Un Centro es un lugar donde provees tus servicios, y donde tus pacientes debe asistir a tus citas.
            </p>

        <div class="display-4 text-center text-primary" @click='switchToCenter()' >
            Crear mi primer centro 
        </div>

        </div>


</div>

</template>

<style scoped>
</style>


<script>

export default {

data: function () {
		return {
		 }
	},
	props: ['session_params'],

    created () {
         },
 
    methods: {

        switchToCenter()
        {
            console.log("switch to centers");
            this.$emit('switchToCenters');
        }


     	},

}
</script>

