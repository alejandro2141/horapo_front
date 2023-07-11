<script setup>
import { ref } from 'vue'
import SwitchViewButton from './switchViewButton.vue'
import axios from 'axios';
import professional_messages from './professional_messages.vue'



</script>

<template>
<div class="text-menu">

	<div class="d-flex justify-content-around">

		<div>
			<!--TODO LEFT MENU ONLY WIDE SCREENS -->
		</div>
		
		<div>
		

				<!--START CENTER MENU -->
	<div v-if="session_params['professional_name'] "  style="width: 400px; " class="d-flex mt-1 pb-2 justify-content-around " :class="{ 'bg-white' : showTopMenu  }" > 
		<!-- MENU -->
		<div :class="{ 'opacity-25' : !session_params.tutorial_start_step4 && session_params.tutorial_start }" >
			<text>	
				<div v-if="showTopMenu" >
					<i  class="bi bi-list icon-menu" @click="showTopMenu=false;show_close_list=true;showUserMenu=true" ></i>
					<br>
					
					<text>Menu</text>
				</div>

				<i v-if="show_close_list" style="font-size:2.0em" class="bi bi-x-lg text-menu" @click="switchViewTo(2);showUserMenu=false;showTopMenu=true ; show_close_list=false " ></i>
			</text>
		</div>
		<!-- CITAS -->
		<div :class="{ 'opacity-25' :  !session_params.tutorial_start_step3  && session_params.tutorial_start }" >		
			<div v-if="showTopMenu"  class="" @click=" switchViewTo(5);showTopMenu=false;" >
				<i  class="bi bi-people icon-menu"></i>
				 <br>
				<text>Citas</text>
			</div>
		</div>
		<!-- CONSULTAS -->
		<div :class="{ 'opacity-25' :  !session_params.tutorial_start_step1  && session_params.tutorial_start}" >
				<div v-if="showTopMenu"  :class="{'':session_params.tutorial_start_step1}" @click="switchViewTo(3);showTopMenu=false;show_close_centers=true;show_close_calendars=false" >	
					<div v-if="showTopMenu"  class="text-center"   >
						<i  class="bi-geo-alt icon-menu"></i><br>
						<text >Consultas</text>
					</div>
				</div>
		</div>
		<!--CALENDARS -->
		<div :class="{ 'opacity-25' :  !session_params.tutorial_start_step2 && session_params.tutorial_start}" >
					<div v-if="showTopMenu" class="text-center"  @click="switchViewTo(1);showTopMenu=false;show_close_calendars=true;show_close_centers=false" >
						<i class="bi bi-calendar icon-menu"></i><br>
						<text>Calendarios</text>
					</div>	
		</div>
			<i v-if="!showTopMenu && !show_close_list" style="font-size:2.0em" class="bi bi-x-lg text-menu" @click="switchViewTo(2);showTopMenu=true ; show_close_calendars=false" ></i>	
	</div><!--END CENTER MENU -->

		</div>

		<div>
			<!--TODO RIGHT MENU ONLY WIDE SCREENS -->	
		</div>

	</div>

<!--
<div class="flex justify-content-center w-100">

	<div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
	</div>

	<div v-if="session_params['professional_name'] "  style="width : 18em " class="d-flex mt-1 pb-2 justify-content-around " :class="{ 'bg-white text-primary' : showTopMenu  }" > 

		<div :class="{ 'opacity-25' : !session_params.tutorial_start_step4 && session_params.tutorial_start }" >
			<text>	
				<div v-if="showTopMenu" >
					<i style="font-size:2.0em" class="bi bi-gear " @click="showTopMenu=false;show_close_list=true;showUserMenu=true" ></i>
					<br>
					<text>Menu</text>
				</div>

				<i v-if="show_close_list" style="font-size:2.0em" class="bi bi-x-lg" @click="switchViewTo(2);showUserMenu=false;showTopMenu=true ; show_close_list=false " ></i>
			</text>
		</div>

		<div :class="{ 'opacity-25' :  !session_params.tutorial_start_step3  && session_params.tutorial_start }" >		
			<div v-if="showTopMenu"  class="" @click=" switchViewTo(5);showTopMenu=false;" >
				<i style="font-size:2.0em" class="bi bi-people"></i>
				 <br>
				<text>Citas</text>
			</div>
		</div>
	
		<div :class="{ 'opacity-25' :  !session_params.tutorial_start_step1  && session_params.tutorial_start}" >
				<div v-if="showTopMenu"  :class="{'':session_params.tutorial_start_step1}" @click="switchViewTo(3);showTopMenu=false;show_close_centers=true;show_close_calendars=false" >	
					<div v-if="showTopMenu"  class="text-center"   >
						<i style="font-size:2.0em" class="bi-geo-alt"></i><br>
						<text >Consultas</text>
					</div>
				</div>
		</div>

		<div :class="{ 'opacity-25' :  !session_params.tutorial_start_step2 && session_params.tutorial_start}" >
					<div v-if="showTopMenu" class="text-center"  @click="switchViewTo(1);showTopMenu=false;show_close_calendars=true;show_close_centers=false" >
						<i style="font-size:2.0em" class="bi bi-calendar"></i><br>
						<text>Calendarios</text>
					</div>	
		</div>
			<i v-if="!showTopMenu && !show_close_list" style="font-size:2.0em" class="bi bi-x-lg text-dark" @click="switchViewTo(2);showTopMenu=true ; show_close_calendars=false" ></i>	
	</div>
	
	<div>
		bbbbbbbbbbbbbbbbbbbbbbbbbbbbb
	</div>

</div>

-->

<div>

	<Transition duration="1050" name="nested">
	
		<div v-if="showUserMenu"  class="bg-white text-menu"  >
			<div class="bg-white w-100 p-4" style="position: absolute; z-index: 999; "  >
			<div class="bg-white"  >
				
			<hr>
				<!-- SALIR -->
				<a HREF="/index.html" class="fs-5 text-decoration-none text-menu"  > 
					&nbsp; <i class="pl-5 bi bi-arrow-left-circle fs-5 "></i> &nbsp; Salir 
				</a>
			<hr>
				<!-- PROFESSIONAL DATA -->
				<a @click="switchViewTo(4);showUserMenu=!showUserMenu" class="fs-5  text-decoration-none text-menu " > 
					&nbsp; <i class="fs-5  bi bi-person-circle "></i> &nbsp; Tu Información 		
				</a>
				<!-- APPOINTMENT LIST  
				<hr class="text-white">
					<a @click="switchViewTo(5);showUserMenu=!showUserMenu" class="fs-5  text-decoration-none  btn-outline-light text-white"> 
					&nbsp; <i class="bi bi-person-lines-fill fs-5"></i> &nbsp; Lista de Citas  
				</a>
				-->
			<hr>
				<!-- APPOINTMENT LIST  -->
				<a  @click="session_params.tutorial_start = true ;switchViewTo(2);showUserMenu=false;showTopMenu=true ; show_close_list=false ;session_params.tutorial_start_step1=true" class="fs-5  text-decoration-none  btn-outline-light text-menu"  > 
					&nbsp; <i class="bi bi-lightbulb fs-5"></i> &nbsp; Ver Tutorial  
				</a>

			<hr>
				<!-- SENT INVITATION TO COLLEAGUE  -->
				<a  @click="showInputEmailToShare = !showInputEmailToShare ; showMsgInvitationSent=false;emailToShare=null " class="fs-5  text-decoration-none   text-menu" > 
					&nbsp; <i class="bi bi-share"></i> &nbsp; Enviar Invitacion a Colega 
				</a>
				
				<div v-if="showInputEmailToShare" >
					<br>
					<input type="text" class="form-control" id="usr" placeholder="Correo@decolega.com" v-model="emailToShare" >
					<text class="text-white btn btn-primary m-2" @click="sendEmailToColleague();showInputEmailToShare=false; showMsgInvitationSent=true ">Enviar</text>
				</div>
				<br>
				<text v-if="showMsgInvitationSent" class="text-dark" >Invitacion enviada!</text>


			<hr>
				<!-- APPOINTMENT LIST  -->
				<a  @click="showInputMessage = !showInputMessage" class="text-menu fs-5  text-decoration-none  text-menu" > 
					&nbsp; <i class="bi bi-chat-right-quote fs-5"></i> &nbsp; Sugerencias y comentarios
				</a>
					<div v-if="showInputMessage"> 

						<professional_messages :session_params="session_params"></professional_messages>
						
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
				<div  style=" height: 600px;" >		
				</div>
			</div>
			
			</div>
		</div>
	
	</Transition>

</div>

	
</div>
</template>

<style scoped>

.text-menu
{
color: rgb(0, 112, 97);

}

.icon-menu
{
color: rgb(0, 112, 97);
font-size:2.5em;
}




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

			showInputEmailToShare : false,
			emailToShare : null,

			showMsgInvitationSent : false ,

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
		
		async sendEmailToColleague()
		{
		console.log("SendEmailToColleague")
		const json = { 
                professional_id: this.session_params.professional_id ,
			    email:this.emailToShare
					};

                
                let resp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_send_invitation_colleague",json);
           	
		},

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

		
		/*
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
		*/


        },

}


</script>