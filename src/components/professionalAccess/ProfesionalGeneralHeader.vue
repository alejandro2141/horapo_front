<script setup>
import { ref } from 'vue'
import SwitchViewButton from './switchViewButton.vue'
import axios from 'axios';



</script>

<template>
	<div>


	<div v-if="session_params['professional_name'] "  class="d-flex mt-1 pb-2 justify-content-around " :class="{ 'bg-white text-dark' : showTopMenu  }" > 

		<!-- LIST APPOINTMENT -->

		<div :class="{ 'opacity-25' : !session_params.tutorial_start_step4 && session_params.tutorial_start }" >
			<text>	
				<div v-if="showTopMenu">
					<i style="font-size:2.0em" class="bi bi-gear " @click="showTopMenu=false;show_close_list=true;showUserMenu=true" ></i>
					<br>
					<text>Menu</text>
				</div>

				<i v-if="show_close_list" style="font-size:2.0em" class="bi bi-x-lg" @click="switchViewTo(2);showUserMenu=false;showTopMenu=true ; show_close_list=false " ></i>
			</text>
			
			<text>
				<text v-if="showTopMenu" class="text-white-50">  </text>
			</text>
		</div>


		<!-- DAY CALENDAR 
		<div :class="{ 'opacity-25' :  !session_params.tutorial_start_step3  && session_params.tutorial_start }" >
			<div v-if="showTopMenu" style="font-size:0.9em" class="opacity-75 btn border border-2 text-danger border-danger small " @click="setToday(dateObj);switchViewTo(2)" >
				<text class="m-0 p-0" style="">HOY</text><br>
				<text class="m-0 p-0"> {{day}}/{{month+1}} </text>
			</div>
		</div>
		-->
		<text>
			<text v-if="showTopMenu" class="text-white-50"> </text>
		</text>
		<text>
			<text v-if="showTopMenu" class="text-white-50"> </text>
		</text>

		<div :class="{ 'opacity-25' :  !session_params.tutorial_start_step3  && session_params.tutorial_start }" >
			
			<div v-if="showTopMenu"  class="" @click=" switchViewTo(5);showTopMenu=false;" >
				
				<i style="font-size:2.0em" class="bi bi-people"></i>
				 <br>
				<text>Citas</text>
			
			</div>
		</div>


		<text>
			<text v-if="showTopMenu" class="text-white-50"> </text>
		</text>
		
		<!-- CONSULTAS -->
		<div :class="{ 'opacity-25' :  !session_params.tutorial_start_step1  && session_params.tutorial_start}" >
			<text style="font-size:0.9em">
				
				<div v-if="showTopMenu"  :class="{'':session_params.tutorial_start_step1}" >	
					<button v-if="showTopMenu"  @click="switchViewTo(3);showTopMenu=false;show_close_centers=true;show_close_calendars=false" type="button" class="btn">
						<i style="font-size:1.7em" class="bi-geo-alt"></i><br>
						<text>Consultas</text>
					</button>
				</div>

			</text>
		</div>
	

		<text>
			<text v-if="true" class="text-white-50" >|</text>
		</text>

		

		<!--CALENDARS -->
		<div :class="{ 'opacity-25' :  !session_params.tutorial_start_step2 && session_params.tutorial_start}" >
			<text style="font-size:0.9em">	
					<button v-if="showTopMenu"  @click="switchViewTo(1);showTopMenu=false;show_close_calendars=true;show_close_centers=false" type="button" class="btn">
						<i style="font-size:1.7em" class="bi bi-calendar"></i><br>
						<text>Calendar</text>
					</button>
			</text>
		</div>

		<i v-if="!showTopMenu && !show_close_list" style="font-size:2.0em" class="bi bi-x-lg text-dark" @click="switchViewTo(2);showTopMenu=true ; show_close_calendars=false" ></i>

		
		
	</div>

	


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

				
				
				<!-- APPOINTMENT LIST  
				<hr class="text-white">
					<a @click="switchViewTo(5);showUserMenu=!showUserMenu" class="fs-5  text-decoration-none  btn-outline-light text-white"> 
					&nbsp; <i class="bi bi-person-lines-fill fs-5"></i> &nbsp; Lista de Citas  
				</a>
				-->
				
				<hr class="text-white">
				<!-- APPOINTMENT LIST  -->
				<a  @click="session_params.tutorial_start = true ;switchViewTo(2);showUserMenu=false;showTopMenu=true ; show_close_list=false ;session_params.tutorial_start_step1=true" class="fs-5  text-decoration-none  btn-outline-light text-white"> 
					&nbsp; <i class="bi bi-lightbulb fs-5"></i> &nbsp; Ver Tutorial  
				</a>

				<hr class="text-white">
				<!-- APPOINTMENT LIST  -->
				<a  @click="showInputMessage = !showInputMessage" class="fs-5  text-decoration-none  btn-outline-light text-white"> 
					&nbsp; <i class="bi bi-chat-right-quote fs-5"></i> &nbsp; Ayuda! o Sugerencia 
				</a>
					<div v-if="showInputMessage"> 

					<div class="d-flex justify-content-start">
						<div>
							<textarea style="border-radius: 15px;" id="story" v-model="text_message" name="story" rows="7" cols="25" placeholder="Comment text.">
							</textarea>
						</div>
						<div class="m-1">
							<text class="text-white"><small>Tu Animo</small></text> <br>
							<p>
								<i @click="animo =1;text_message=text_message.concat(' No sirve. Lo odio!, muerte al programador! ')" class="text-white bi bi-emoji-angry h2 m-4 "></i><br>
							</p>
							<p>
							<i @click="animo =2;text_message=text_message.concat(' No es la gran cosa. Programador sin creatividad!  ')" class="text-white bi bi-emoji-neutral h2 m-4 "></i><br>
							</p>
							<p>
							<i @click="animo =3;text_message=text_message.concat(' Maravilloso!, subale el sueldo al programador!  ')"  class="text-white bi bi-emoji-heart-eyes h2 m-4 "></i><br>
							</p>
							<!--
							<i @click="animo =4;text_message=text_message.concat(' Tiene errores de software.  Arreglalo infame programador !!. ') " class="text-white bi bi-bug h4 p-2"></i><br>
							<i @click="animo =5;text_message=text_message.concat(' Esta bueno. Me gusta.  Puede mejorar !. ') " class="text-white bi bi-balloon-heart h4 p-2"></i><br>
							-->
						</div>
					</div>

					<div class="d-flex justify-content-start">
						<text class="text-white btn btn-primary" @click="text_message=''">Cancelar</text>   
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<text class="text-white btn btn-primary" @click="sendComments">Enviar</text>
					</div>

					</div>
					

				

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

			dateObj : null, 
			showInputMessage : false  ,
			text_message: "", 
			animo: 0 , 

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
		},

		async sendComments()
		{
			const json = { 
              professional_id: this.session_params.professional_id ,
              message : this.text_message,
			  animo : this.animo
           				};

			console.log("Send Message")
			let resp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_send_comments",json);
			console.log("Send Message Response :"+JSON.stringify(resp) )

			this.text_message = "Ya enviaste tu mensaje."  
			this.showInputMessage = false ;
			alert ("Gracias por tu mensaje, nuestro equipo atenderá tu mensaje cuanto antes ")
			this.animo=0

		}


        },

}


</script>