<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ModalPublicReserveAppForm from './modalPublicReserveAppForm.vue';
import loadProgress from '../loadProgress.vue'



//const count = ref(0)
</script>

<template>
<div>
<ModalPublicReserveAppForm   :searchParameters='searchParameters'   v-on:updateLastSearch='updateLastSearch' :appToReserve='appToReserve'  :eventShowModalPubicReserve='eventShowModalPubicReserve' :global_specialties='global_specialties' ></ModalPublicReserveAppForm>

	<teleport to="body" >

		<loadProgress  :active_spinner="active_spinner" > </loadProgress>
 
		<div v-if="showModalPublicAppDetails" class="modal bg-secondary"   >
		    
			<transition name="modal">
			<div class="modal-mask " v-if="app != null && showModalAux"  >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-0 modal-background"  style="border-radius: 20px;" > 
              
            <div class="modal-body scroll h4"  style="border: 0px solid rgb(168, 168, 168);border-radius: 20px; " > 
 					<div class="d-flex flex-row justify-content-end ">
                      <div  > </div>
                      <div  > </div>
                      <div ><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalPublicAppDetails = false" aria-label="Close"></i> </div>
                    </div>
<!-- -->



    <div v-if="app != null"   style="border: 3px solid rgb(168, 168, 168); border-radius: 30px;"  class="bg-white p-0 mb-1 ">
        
        <div id="app" class="m-0 d-flex  "  >	
            <div class="">
                     &nbsp;
            </div>
            <div>

 				<div class="display-4 p-2" style=" color:#1f9d94">
                    <div >	
                    {{ showSpecialtyName(app.specialty1) }} 
                    </div>       
                </div>

                <div class="">
					<p> <i class="bi bi-circle-fill display-5 text-primary"   style=" color:#2e5668" ></i> Fecha : 
						<text class="" style="font-size: 1.2em; color:#2e5668">	 
						<b>  {{ transform_date( app.date.substring(0, 10) ) }} </b>
						</text>       
					
					</p>
				</div>


				<div class="">
					<p> <i class="bi bi-circle-fill display-5 text-primary"   style=" color:#2e5668" ></i> Hora : 
						<text class="" style="font-size: 1.2em; color:#2e5668">	 
						{{app.start_time}} <text >hrs</text>  
						</text>       
					
					</p>
				</div>


 
                <div class="">

                    <div v-if="app.center_visit" class="">
                 
                        <div class="display-6" style="">  
                            <div style="color: #781ED1" >
                            <i class="h1 bi bi-building"></i> En Consulta  </div>
                            </div>
							
                            <div style="" class="text-dark display-6" >
                               <i class="bi bi-geo-alt display-4"></i> {{comuna_id2name(app.center_visit_location)}}
                            </div>
                            <div class="" style="color:#2e5668" >	
                             Centro :   {{app.center_name}}
                            </div> 
                            <div style="color:#2e5668">
                             Direccion:  {{app.center_address}}
                            </div>
                            
                    </div>
                    
                    <div v-if="app.home_visit" style="color:#3399FF">
                            <div class="display-5" >
                                <i class=" bi bi-house-door"></i><text >  Visita a Domicilio:</text> <br>
                            </div>
                            
									<div class="m-2">
									<p  v-if=" app.home_visit_location1 != null " >  
										&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(app.home_visit_location1) }} 
										<br>
									</p>
									<p v-if=" app.home_visit_location2 != null " >  
										&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(app.home_visit_location2) }} 
										<br>
									</p>
									<p v-if=" app.home_visit_location3 != null " >  
									&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(app.home_visit_location3) }}
										<br>
									</p>
									<p v-if=" app.home_visit_location4 != null " >  
										&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(app.home_visit_location4) }} 
										<br>
									</p>
									<p v-if=" app.home_visit_location5 != null " >  
										&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(app.home_visit_location5) }} 
										<br>
									</p>
									<p v-if=" app.home_visit_location6 != null " >  
										&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(app.home_visit_location6) }} 
										<br>
									</p>	
									</div>
                    </div>

                    <div v-if="app.remote_care" class="">
                         <div class="display-5" style="color:#b36b00" >
                               <i class="bi bi-camera-video"></i> Tele Atención  	 
                              <div style="" class="text-dark display-6" >
                              (Todas las comunas) 
                              </div>                      
                        </div>
                    </div>

					<p> <i class="bi bi-person-circle display-4 text-primary"></i> Con :  {{app.professional_name }}  </p>
							

                </div>
            
            </div>

            </div>

               
     <text style="color: #ffffff;" >#{{app.calendar_id}}</text> 
       </div>

<!-- -->
			

					<div class="d-flex justify-content-center m-5" >
						<button type="button" @click="reserveHour(app);"  class="btn btn-primary p-4 btn-lg">  Reservar esta Hora </button>
					</div> 
						<br>
						<br>
						<text class="text-white" style="">#{{app.calendar_id}}</text>

            </div>
        </div> 
        </div> 		
		</div> 
        </transition>
    	</div>
	</teleport>

</div>
</template>

<style scoped>

.modal {
	position: fixed; 
   display: flex; 
}

div.scroll {
       			margin:4px, 4px;
                padding:4px;
                background-color: rgb(255, 255, 255);
                width: 100%; 
                /* height: 190%;*/
                overflow-x: auto;
                overflow-y: auto;
               /* text-align:justify;*/
      }

/*
.modal-background {
    background-color:#DAEFF3
        }
*/
/************************* */



.modal-mask {
  /*position: fixed;*/
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
 /* display: table;*/
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
 /*width: 100px;*/
  margin: 2px auto;
  padding: 20px 30px;
  background-color: #fff;
  /*border-radius: 2px;*/
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}


</style>


<script>
//const showForm = ref(false)


export default {
 data : function() {
    return {
 		//modalOpen : ref(false),
		modalConfirmationOpen : ref(false) ,
		appConfirmed : ref(Object) ,

          showModalAux : true,
		  appointment_confirm : null,

		  form_patient_name : null ,
		  form_patient_doc_id : null ,
		  form_patient_email : null ,
		  form_patient_phone : null ,
		  form_patient_insurance_code : null ,
		  form_patient_age : null, 
 
		  error_msg_name : false,
		  error_msg_age : false,
		  error_msg_doc_id: false,
		  error_msg_email : false, 
		  error_msg_phone : false,
		  error_msg_insurance_code : false,

		  showModalPublicAppDetails : false ,
		  appToReserve : Object ,
		  eventShowModalPubicReserve : null,
		  imgLoaded : null,
		  imgMapUrl : null,

		  active_spinner : null,
        }
  },

	props: [ 'searchParameters', 'app' , 'global_comunas' , 'openModalEvent' , 'modalOpen','global_comunas', 'global_specialties' ],
	emits: [ "updateLastSearch" ],

computed: {
		showModalAux2() {
		  return   this.showModal ;
		}
	  },

	  watch: {
		openModalEvent(newApp, oldApp) {
			console.log("openModalEvent !!!");
			this.showModalPublicAppDetails = true ; 
			this.imgMapUrl = '/centerMap/center_map_id_'+this.app.center_id+'.JPG' ;	
	  	},
		
		imgLoaded(newApp, oldApp) {
			if(!newApp)
			{this.imgMapUrl = '/centerMap/imgMapNotCreated.JPG' ;}
		},

	},


	methods: {

		getShortMonthName(month)
		{
			console.log("MONTH:"+parseInt(month));
			let months = ['nodata','Ene.','Feb.' ,'Marz.','Abr.','May.','Jun.','Jul.','Ago.','Sept.','Oct.','Nov.','Dic.' ]
			return months[parseInt(month)];

		},

		showSpecialtyName(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },

		reserveHour(hour)
		{
			console.log("Public Reserve Hour ... display Modal");
			
			this.showModalPublicAppDetails = false ;
			this.appToReserve = hour ;
			this.eventShowModalPubicReserve = Math.random() ;
		},
		updateLastSearch()
        {
                console.log (" update search Result. ");
                //this.appointment_list=null ;
                this.$emit('updateLastSearch');
        },
		selectedInsuranceCode(code)
        {
            console.log("Insurance Code:"+code);
            this.form_patient_insurance_code = code;
        },
		comuna_id2name(id)
    	{
            let temp= this.global_comunas.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
   		},

		transform_date(date)
    	{
        let temp = date.split("-") ;
        return (""+temp[2]+" de "+this.getShortMonthName(temp[1])+" "+temp[0])
    	},
		
		transform_date2(date)
		{
			let temp = date.split("-") ;
			return (""+temp[2]+" "+this.getShortMonthName(temp[1])+" "+temp[0])
		},
        



    },


}
</script>