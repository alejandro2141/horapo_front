<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
    <div class="p-3 mb-2 bg-light text-dark">
         <p class="h4"> Configuracion de Usuario </p>
          <p> Nombre : {{ session_params.professional_name }} </p>
          <p> Especialidades  : {{session_params.professional_name}} </p>

    </div>
</template>

<style scoped>
</style>


<script>

export default {
data: function () {

		return {
			data: null ,
		 }
	
    },
	props: ['session_params','global_comunas'],

    created () {
        console.log("Tab User Config"+this.session_params.professional_id);
        console.log("Tab User Config JSON "+JSON.stringify(this.session_params));

        },
 
    methods: {
      		},
  

}
</script>

