<script setup>
import { ref } from 'vue'
import SwitchViewButton from './switchViewButton.vue'


</script>

<template>

    <div v-if="session_params['professional_name'] != null"  class="d-flex p-1 justify-content-around bg-white "> 
		
		<div> 
			<a HREF="/index.html" class="text-primary text-decoration-none"> 
			<i class="bi bi-arrow-left-square"></i> Salir </a> 
		</div>

		<div class="text-primary " >
			 <text v-if="session_params['professional_name'] != null"   @click="switchViewTo(2)"> 
				<i class="bi bi-card-list display-5 "  ></i>
			 </text>
		</div>

		<div class="text-primary " >
			 <text v-if="session_params['professional_name'] != null"   @click="switchViewTo(1)"> 
				<i class="bi bi-calendar display-5 "></i>
			 </text>
		</div>	

		<div class="text-primary " >
			 <text v-if="session_params['professional_name'] != null"   @click="switchViewTo(3)"> 
				<i class="bi bi-geo-alt display-5 "></i>
			 </text>
		</div>
					<!--
					<div class="">	
						<SwitchViewButton v-if="session_params['professional_name'] != null"  v-on:switchView="switchView" ></SwitchViewButton>
					</div>	
					-->	
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
	emits : ['switchView', 'switchViewTo' ]  ,

    methods: {

		switchViewTo(val)
		{
		this.$emit('switchViewTo',val);
		},

		switchView(){
			console.log("switchView in Profesional General Header");
			this.$emit('switchView');
		}

        },

}


</script>