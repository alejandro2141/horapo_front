<script setup>
import { ref } from 'vue'
import SwitchViewButton from './switchViewButton.vue'


</script>

<template>
	<div>

    <div v-if="session_params['professional_name'] != null"  class="d-flex pt-2 pb-2 justify-content-around bg-secondary border-bottom "> 

		<text v-if="session_params['professional_name'] != null"   @click="showUserMenu=!showUserMenu;  header_menu_appointments = false ; header_menu_calendars = false ; header_menu_centers = false "   class="text-white border border-0 "  :class="{ 'fw-bold' : showUserMenu }" >	
			<i v-if="!showUserMenu " class="fs-4 bi bi-list"></i>
			<i v-else class="bi bi-x-lg fs-5"></i>
			<!--
			<i class="fs-5 bi bi-person"></i><br>
			<small>{{session_params.professional_name.split(" ")[0] }} </small>
			-->
		</text>

		<text v-if="session_params['professional_name'] != null"   @click="switchViewTo(2); showUserMenu = false ; header_menu_appointments = true; header_menu_calendars = false ; header_menu_centers = false "  class="text-white p-1" :class="{ 'fw-bold' : header_menu_appointments }"  >	
			<text class="fs-6 "> HOY</text> <small><text class="">{{day}} {{getMonthName(month)}}</text> </small> 
		</text>

		<text v-if="session_params['professional_name'] != null"   @click="switchViewTo(1); showUserMenu = false ; header_menu_appointments = false ; header_menu_calendars = true ; header_menu_centers = false "  class="text-white border border-0" :class="{ 'fw-bold': header_menu_calendars }"  >	
			<i  class="bi bi-calendar-week fs-5"></i> <!--< i class="bi bi-calendar fs-5 "  ></i>  <br>  <small> Calendarios </small>	  -->
			 <!--< i class="bi bi-calendar fs-5 "  ></i>  <br>  <small> Calendarios </small>	  -->
		</text>
		<!--
		<button v-if="session_params['professional_name'] != null"   @click="switchViewTo(3); showUserMenu = false ; header_menu_appointments = false ; header_menu_calendars = false ; header_menu_centers = true "  type="button" class="btn btn-outline-primary border border-0" :class="{ active: header_menu_centers }"  >	
			<i class="bi bi-geo-alt display-5 "  ></i> Consultas	
		</button>
		-->
		
	</div>


	<Transition duration="1050" name="nested">
	
		<div v-if="showUserMenu"  class="bg-secondary" style="" >
			<div class="bg-secondary w-100 p-4" style="position: absolute; z-index: 9999; height:600px"  >
			<div class="bg-secondary" >
				<hr class="text-white">
			
				<a HREF="/index.html" class="fs-5 text-decoration-none  btn-outline-light "> 
					&nbsp; <i class="pl-5 bi bi-arrow-left-circle fs-5 "></i> &nbsp; Salir 
				</a>
			
			<hr class="text-white">
				<a @click="switchViewTo(4);showUserMenu=!showUserMenu" class="fs-5  text-decoration-none  btn-outline-light"> 
					&nbsp; <i class="fs-5  bi bi-person-circle "></i> &nbsp; {{session_params.professional_name.split(" ")[0] }} tu Información 
					
				</a>
				<hr class="text-white">
				<a @click="switchViewTo(3); showUserMenu = false ; header_menu_appointments = false ; header_menu_calendars = false ; header_menu_centers = true "   class="fs-3  text-decoration-none"  >	
					&nbsp; <i class=" btn-outline-light bi bi-geo-alt fs-5 "></i> <text class="fs-5 btn-outline-light">&nbsp; Direcciones y Consultas </text>	
				</a>
				<hr class="text-white">

				<!--
				<div  style="width: 00px; height: 600px;" >		
				</div>
				-->
			</div>
			
			</div>
		</div>
	
	</Transition>



	</div>

</template>

<style scoped>

.nested-enter-active, .nested-leave-active {
	transition: all 0.3s ;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(0px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner { 
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
	transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(0px);
  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}

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
			day : null ,
			month : null ,
			year : null ,

			transitionHigth : 0 ,


        }   
    },
    props : ['session_params'] ,
	emits : ['switchView', 'switchViewTo' ]  ,

 	mounted () {
            var dateObj = new Date();
			this.month = dateObj.getUTCMonth() + 1; //months from 1-12
			this.day = dateObj.getUTCDate();
			this.year = dateObj.getUTCFullYear();
    },

    methods: {
		getMonthName(month)
		{	
			let month_name = ["Ene","Feb","Marz","Abr","May","Jun","Jul","Ago","Sept","Oct","Nov","Dic"]
			return month_name[month-1] ; 

		},

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