<script setup>
import { ref } from 'vue'
import SwitchViewButton from './switchViewButton.vue'


</script>

<template>
	<div>

    <div v-if="session_params['professional_name'] != null"  class="d-flex p-1 justify-content-around bg-white "> 

		<button v-if="session_params['professional_name'] != null"   @click="showUserMenu=!showUserMenu;"  type="button" class="btn btn-outline-primary border border-0"  :class="{ active: showUserMenu }" >	
			<i class="bi bi-key display-5"></i>	
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
		
	</div>


	<div v-if="showUserMenu" class="bg-secondary text-white bg-secondary">
		<div class="list-group list-group-flush bg-secondary">
			<a HREF="/index.html" class="h3 bg-secondary text-white text-decoration-none">  SALIR </a>
			<a @click="switchViewTo(4);showUserMenu=!showUserMenu" class="h3 bg-secondary text-white text-decoration-none"> Configuracion de Usuario </a>
			
		</div>
	</div>





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
			showUserMenu : false, 


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