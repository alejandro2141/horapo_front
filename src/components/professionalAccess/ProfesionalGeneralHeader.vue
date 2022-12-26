<script setup>
import { ref } from 'vue'
import SwitchViewButton from './switchViewButton.vue'


</script>

<template>
	<div>


	<div v-if="session_params['professional_name'] != null"  class="text-white d-flex pt-1 pb-2 justify-content-around bg-secondary" :class="{ 'bg-dark': !showTopMenu }" > 

		<text >	
			<i v-if="showTopMenu" class="fs-4 bi bi-list " @click="showTopMenu=false;show_close_list=true;showUserMenu=true" ></i>
			<i v-if="show_close_list" class="fs-2 bi bi-x-lg" @click="switchViewTo(2);showUserMenu=false;showTopMenu=true ; show_close_list=false " ></i>
		</text>
		<text>
			<text v-if="showTopMenu" class="text-white-50">  </text>
		</text>
		

		<!-- LIST APPOINTMENT -->
		<!--
		<div v-if="showTopMenu" >
			<i @click="switchViewTo(5)" class="bi bi-person-square display-5"></i>  
		</div>
		-->


		<text  >
			<text v-if="showTopMenu" class="text-white-50">  </text>
		</text>

		<!-- DAY CALENDAR -->
		<!--
		<div v-if="showTopMenu" @click="setToday(dateObj);switchViewTo(2)" >
			<div class="w-100 d-flex justify-content-around">
				<div class="bg-white " style=" width:3px;  height:3px"  >
						
				</div>
			
				<div class="bg-white " style=" width:3px;  height:3px" >
					
				</div>
				
			</div>
			<div  v-if="showTopMenu" class="bg-danger border border-2 border-white" style="border-radius:7px; ">

				<div class="bg-danger" style="border-radius:5px; ">
					<text class=""   >   </text>
					
				</div>

				<div class="bg-white  mt-1 " style="border-bottom-left-radius:5px;  border-bottom-right-radius:5px" >
					<text class="text-danger"  > &nbsp; {{day}} &nbsp;  </text>
					
				</div>
			</div>
		</div>
		{{month_name[month]}}
		{{month_name[month]}}
		-->
		<div v-if="showTopMenu" class="m-1" @click="setToday(dateObj);switchViewTo(2)" >
			HOY <text class="text-white"  > {{day}}/{{month+1}} </text>
		</div>
		

		<text>
			<text v-if="showTopMenu" class="text-white-50"> </text>
		</text>
		


		<!-- CONSULTAS -->
		<text>
			<!--
			<div v-if="showTopMenu"  :class="{'':session_params.tutorial_start}" >	
				<i  class="fs-6" @click="switchViewTo(3);showTopMenu=false;show_close_centers=true;show_close_calendars=false" >Consultas</i>
	        	<br><i class="bi bi-buildings"></i>
			</div>
			-->
			<div v-if="showTopMenu"  :class="{'':session_params.tutorial_start}" >	
				<button v-if="showTopMenu"  @click="switchViewTo(3);showTopMenu=false;show_close_centers=true;show_close_calendars=false" type="button" class="btn btn-light small p-1"><small>Consultas <i class="bi bi-building"></i></small></button>
			</div>

			<i v-if="show_close_centers" class="fs-2 bi bi-x-lg" @click="switchViewTo(2);showTopMenu=true ; show_close_centers=false " ></i>	
		
		</text>

		<text>
			<text v-if="true" class="text-white-50" >|</text>
		</text>

		<!--CALENDARS -->
		<text>	
			<!--
			<i v-if="showTopMenu" class="fs-6 bi " @click="switchViewTo(1);showTopMenu=false;show_close_calendars=true;show_close_centers=false" >Calendarios</i>
			<i v-if="show_close_calendars" class="fs-2 bi bi-x-lg" @click="switchViewTo(2);showTopMenu=true ; show_close_calendars=false " ></i>
			-->
			<i v-if="show_close_calendars" class="fs-2 bi bi-x-lg" @click="switchViewTo(2);showTopMenu=true ; show_close_calendars=false " ></i>
			<button v-if="showTopMenu"  @click="switchViewTo(1);showTopMenu=false;show_close_calendars=true;show_close_centers=false" type="button" class="btn btn-light small p-1"><small>Calendar <i class="bi bi-calendar"></i> </small></button>
		</text>
		<!--
		<text>	
			<i v-if="!show_close_centers && !show_close_list" class="fs-4 bi bi-geo-alt" @click="switchViewTo(3);showTopMenu=false;show_close_centers=true;show_close_calendars=false" ></i>
		    <i v-if="show_close_centers" class="fs-2 bi bi-x-lg" @click="switchViewTo(2);showTopMenu=true ; show_close_centers=false " ></i>
	
		</text>

		<text>
			<text v-if="true" class="text-white-50" >|</text>
		</text>

		<text>	
			<i v-if="!show_close_calendars && !show_close_list" class="fs-4 bi bi-calendar-week" @click="switchViewTo(1);showTopMenu=false;show_close_calendars=true;show_close_centers=false" ></i>
			<i v-if="show_close_calendars" class="fs-2 bi bi-x-lg" @click="switchViewTo(2);showTopMenu=true ; show_close_calendars=false " ></i>
			
		</text>
		-->
		
	</div>

	<!--
    <div v-if="session_params['professional_name'] != null"  class="d-flex pt-2 pb-2 justify-content-around bg-secondary border-bottom "> 

		<text v-if="session_params['professional_name'] != null"   @click="showUserMenu=!showUserMenu;  header_menu_appointments = false ; header_menu_calendars = false ; header_menu_centers = false "   class="text-white border border-0 "  :class="{ 'fw-bold' : showUserMenu }" >	
			<i v-if="!showUserMenu || header_menu_calendars" class="fs-4 bi bi-list"></i>
			<i v-else class="bi bi-x-lg fs-5"></i>
			
		</text>

		<text v-if="session_params['professional_name'] != null"   @click="switchViewTo(2); showUserMenu = false ; header_menu_appointments = true; header_menu_calendars = false ; header_menu_centers = false "  class="text-white border border-0 " :class="{ 'fw-bold' : header_menu_appointments }"  >	
			<text class="fs-6 "> HOY</text> <small><text class="">{{day}} {{getMonthName(month)}}</text> </small> 
		</text>

		<text v-if="session_params['professional_name'] != null"  class="text-white border border-0 " >	
			<i  v-if="!header_menu_calendars" class="bi bi-calendar-week fs-5" @click="switchViewTo(1); showUserMenu = false ; header_menu_appointments = false ; header_menu_calendars = true ; header_menu_centers = false "    ></i> 
			<i v-else class="bi bi-x-lg fs-5"  @click="switchViewTo(2); header_menu_calendars=false" ></i>
		
		</text>
		
	</div>
	-->


	<Transition duration="1050" name="nested">
	
		<div v-if="showUserMenu"  class="bg-secondary" style="" >
			<div class="bg-secondary w-100 p-4" style="position: absolute; z-index: 99999; height:600px"  >
			<div class="bg-secondary" >
				<hr class="text-white">
			
				<!-- SALIR -->
				<a HREF="/index.html" class="fs-5 text-decoration-none  btn-outline-light text-white "> 
					&nbsp; <i class="pl-5 bi bi-arrow-left-circle fs-5 "></i> &nbsp; Salir 
				</a>
			
			<hr class="text-white">


				<!-- PROFESSIONAL DATA -->
				<a @click="switchViewTo(4);showUserMenu=!showUserMenu" class="fs-5  text-decoration-none  btn-outline-light text-white"> 
					&nbsp; <i class="fs-5  bi bi-person-circle "></i> &nbsp; {{session_params.professional_name.split(" ")[0] }} tu Información 		
				</a>

				<hr class="text-white">
				
				<!-- APPOINTMENT LIST  -->
				<a @click="switchViewTo(5);showUserMenu=!showUserMenu" class="fs-5  text-decoration-none  btn-outline-light text-white"> 
					&nbsp; <i class="bi bi-person-lines-fill fs-5"></i> &nbsp; Lista de Citas  
				</a>

				<!--
				<a @click="switchViewTo(3); showUserMenu = false ; header_menu_appointments = false ; header_menu_calendars = false ; header_menu_centers = true "   class="fs-3  text-decoration-none"  >	
					&nbsp; <i class=" btn-outline-light bi bi-geo-alt fs-5 "></i> <text class="fs-5 btn-outline-light">&nbsp; Direcciones y Consultas </text>	
				</a>
				
				<hr class="text-white">
				-->

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
			//active_tutorial : false,
			header_menu_exit : false ,
			header_menu_appointments : true ,

			showTopMenu : true ,
			show_close_list : false ,
			show_close_centers : false ,
			show_close_calendars : false , 

			showUserMenu : false ,

			day : null ,
			month : null ,
			year : null ,

			transitionHigth : 0 ,
			month_name : ["Ene","Feb","Marz","Abr","May","Jun","Jul","Ago","Sept","Oct","Nov","Dic"] ,

			dateObj : null 

        }   
    },
    props : ['session_params', 'active_tutorial' ] ,
	emits : ['switchView', 'switchViewTo' , 'setTodayDateFromHeader' ,'showAppointmentsTakenList' ]  ,

 	mounted () {
            this.dateObj = new Date();
			this.month = this.dateObj.getMonth() ; //months from 1-12
			this.day = this.dateObj.getDate();
			this.year = this.dateObj.getFullYear();
    },

    methods: {
		showAppointmentsTakenList()
		{
			console.log("showAppointmentsTakenList")
			this.$emit('showAppointmentsTakenList' );
		},

		setToday(dateObj)
		{   
			console.log("setToday in ProfessionalGeneralHeader")
			this.$emit('setTodayDateFromHeader',dateObj );
		},

		getMonthName(month)
		{	
			let month_name = ["Ene","Feb","Marz","Abr","May","Jun","Jul","Ago","Sept","Oct","Nov","Dic"]
			return month_name[month] ; 

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