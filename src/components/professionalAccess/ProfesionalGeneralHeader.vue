<script setup>
import { ref } from 'vue'
import SwitchViewButton from './switchViewButton.vue'


</script>

<template>

    <div v-if="session_params['professional_name'] != null"  class="d-flex p-1 justify-content-around bg-white "> 
		
		<button v-if="session_params['professional_name'] != null"   @click="switchViewTo(2); header_menu_exit = true ; header_menu_appointments = false ; header_menu_calendars = false ; header_menu_centers = false  "  type="button" class="btn btn-outline-primary border border-0"  :class="{ active: header_menu_exit }" >	
			<a HREF="/index.html" class="text-secondary text-decoration-none"> 
				<i class="bbi bi-arrow-left-square display-5 "  ></i> 
				SALIR
			</a>	
		</button>


		<button v-if="session_params['professional_name'] != null"   @click="switchViewTo(2); header_menu_exit = false ; header_menu_appointments = true; header_menu_calendars = false ; header_menu_centers = false  "  type="button" class="btn btn-outline-primary border border-0" :class="{ active: header_menu_appointments }"  >	
			<i class="bi bi-card-list display-5 "  ></i> Citas	
		</button>

		<button v-if="session_params['professional_name'] != null"   @click="switchViewTo(1); header_menu_exit = false ; header_menu_appointments = false ; header_menu_calendars = true ; header_menu_centers = false  "  type="button" class="btn btn-outline-primary border border-0" :class="{ active: header_menu_calendars }"  >	
			<i class="bi bi-calendar display-5 "  ></i> Horario	
		</button>

		<button v-if="session_params['professional_name'] != null"   @click="switchViewTo(3); header_menu_exit = false ; header_menu_appointments = false ; header_menu_calendars = false ; header_menu_centers = true "  type="button" class="btn btn-outline-primary border border-0" :class="{ active: header_menu_centers }"  >	
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
			header_menu_exit : false ,
			header_menu_appointments : true ,
			header_menu_calendars : false ,
			header_menu_centers : false ,


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