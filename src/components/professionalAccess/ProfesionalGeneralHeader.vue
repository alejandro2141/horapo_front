<script setup>
import { ref } from 'vue'
import SwitchViewButton from './switchViewButton.vue'


</script>

<template>

    <div class="d-flex p-1 justify-content-around bg-white "> 
		
		<div> 
			<a HREF="/index.html" class="text-primary text-decoration-none"> 
			<i class="bi bi-arrow-left-square"></i> Salir </a> 
		</div>

		<div class="text-primary " >
		</div>

		<div class="">	
			<SwitchViewButton v-if="session_params['professional_name'] != null"  v-on:switchView="switchView" ></SwitchViewButton>
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
    props : ['session_params'] ,
	emits : ['switchView']  ,

    methods: {
		switchView(){
			console.log("switchView in Profesional General Header");
			this.$emit('switchView');
		}

        },

}


</script>