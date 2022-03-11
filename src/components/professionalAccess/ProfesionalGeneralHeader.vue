<script setup>
import { ref } from 'vue'
import SwitchViewButton from './switchViewButton.vue'


</script>

<template>

    <div v-if="session_params['professional_name'] != null"  class="d-flex p-1 justify-content-around bg-white "> 
		
		<button v-if="session_params['professional_name'] != null"   @click="switchViewTo(2)"  type="button" class="btn btn-outline-secondary" >	
			<a HREF="/index.html" class="text-secondary text-decoration-none"> 
				<i class="bbi bi-arrow-left-square display-5 "  ></i> 
				SALIR
			</a>	
		</button>


		<button v-if="session_params['professional_name'] != null"   @click="switchViewTo(2)"  type="button" class="btn btn-outline-primary" >	
			<i class="bi bi-card-list display-5 "  ></i> Citas	
		</button>

		<button v-if="session_params['professional_name'] != null"   @click="switchViewTo(1)"  type="button" class="btn btn-outline-primary" >	
			<i class="bi bi-calendar display-5 "  ></i> Horario	
		</button>

		<button v-if="session_params['professional_name'] != null"   @click="switchViewTo(3)"  type="button" class="btn btn-outline-primary" >	
			<i class="bi bi-geo-alt display-5 "  ></i> Consultas	
		</button>
		
<!--
		<div class="text-primary " >
			 <text v-if="session_params['professional_name'] != null"   @click="switchViewTo(2)"> 
				<i class="bi bi-card-list display-5 "  ></i> Citas
			 </text>
		</div>

		<div class="text-primary " >
			 <text v-if="session_params['professional_name'] != null"   @click="switchViewTo(1)"> 
				<i class="bi bi-calendar display-5 "></i> Calendario 
			 </text>
		</div>	




		<div class="text-primary " >
			 <text v-if="session_params['professional_name'] != null"   @click="switchViewTo(3)"> 
				<i class="bi bi-geo-alt display-5 "></i> Consultas
			 </text>
		</div>
-->
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