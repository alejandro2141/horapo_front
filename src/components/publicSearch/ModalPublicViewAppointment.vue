<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ModalPublicReserveAppForm from './modalPublicReserveAppForm.vue';
import loadProgress from './loadProgressPatient.vue'

//const count = ref(0)
</script>

<template>
<div>

<ModalPublicReserveAppForm :global_comunas="global_comunas" :professional_data="professional_data" :center_data="center_data" :searchParameters='searchParameters'   v-on:updateLastSearch='updateLastSearch' :appToReserve='appToReserve'  :eventShowModalPubicReserve='eventShowModalPubicReserve' :global_specialties='global_specialties' ></ModalPublicReserveAppForm>

	<teleport to="body" >

		<loadProgress  :active_spinner="active_spinner" > </loadProgress>
 
		<div v-if="showModalPublicAppDetails" class="modal bg-secondary"   >
		    
			<transition name="modal">
			<div class="modal-mask " v-if="app != null && showModalAux"  >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-0 modal-background"  style="border-radius: 20px;" > 
              
            <div class="modal-body scroll h4"  style="border: 0px solid rgb(168, 168, 168);border-radius: 20px; " > 
 					


    <div v-if="app != null"     class="bg-white p-0 mb-1 ">

		<!-- HEADER -->
		<div class="d-flex justify-content-between mb-3">
                      <div  class="display-4 p-2" style=" color:#1f9d94">  {{ showSpecialtyName(app.specialty) }}  </div>
                      <div> </div>
                      <div><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalPublicAppDetails = false" aria-label="Close"></i> </div>
        </div> 

		<!-- DATE/TIME APPOINTMENT -->
		<div class="d-flex justify-content-start mb-3" >
			<text  style=""> <i class="text-muted h1  m-2 bi bi-calendar"></i> </text>


			<div class="">
				<text class="">	{{ transform_date( app.date ) }} </text><br>
				<text class="" style="">	 
						{{transform_time(app.start_time)}} <text >hrs</text>  
				</text>       		
			</div>
		</div>

		<div class="d-flex justify-content-start mb-3" >
			<text  style=""> <i class="text-muted bi bi-person display-1 m-0 p-0"></i> </text>

			<div class="">
				<text class="">	Profesional: </text><br>
				<text class="" style="">	 
					{{professional_name }}   
				</text>       		
			</div>
		</div>
		
		<!-- LOCATION -->		

        <div class="m-2 " style="">

                    <div v-if="center_data.center_visit" class="">
                        <div class="display-6" style="">  
                            <div style="color: #781ED1" >
                            <i class="h1 bi bi-building "></i> En Consulta  </div>
                        </div>
							
                            <div>	
                            "{{center_data.name}}"
                            </div> 
                            <div>
                             Direccion:  {{center_data.address}}
                            </div> 
							<div style="" class="" >
                               {{comuna_id2name(center_data.comuna)}}
                            </div>           
                    </div>
                    
                    <div v-if="center_data.home_visit" style="color:#3399FF">
                            <div class="display-5" >
                                <i class=" bi bi-house-door"></i><text >  Visita a Domicilio:</text> <br>
                            </div>
                            
									<div class="m-2">
									<p  v-if=" center_data.home_comuna1 != null " >  
										&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(center_data.home_comuna1) }} 
										<br>
									</p>
									<p v-if=" center_data.home_comuna2 != null " >  
										&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(center_data.home_comuna2) }} 
										<br>
									</p>
									<p v-if=" center_data.home_comuna3 != null " >  
									&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(center_data.home_comuna3) }}
										<br>
									</p>
									<p v-if=" center_data.home_comuna4 != null " >  
										&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(center_data.home_comuna4) }} 
										<br>
									</p>
									<p v-if=" center_data.home_comuna5 != null " >  
										&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(center_data.home_comuna5) }} 
										<br>
									</p>
									<p v-if=" center_data.home_comuna6 != null " >  
										&nbsp;&nbsp;<i class="bi bi-geo-alt"></i> {{ comuna_id2name(center_data.home_comuna6) }} 
										<br>
									</p>	
									</div>
                    </div>

                    <div v-if="center_data.remote_care" class="mb-3">
                         <div class="display-5" style="color:#b36b00" >
                               <i class="bi bi-camera-video"></i> Tele Atención  	 
                              <div style="" class="text-dark display-6" >
                              Todas las comunas 
                              </div>                      
                        </div>
                    </div>
					<!-- Include here a map -->
        </div>

		


		
        
		<div id="app" class="m-0 d-flex  "  >	
            
            

            </div>              
     <text style="color: #ffffff;" >#{{app.calendar_id}}</text> 
       </div>

<!-- -->
			

					<div class="d-flex justify-content-center m-5" >
						<button type="button" @click="reserveHour(app);"  class="btn btn-primary p-4 btn-lg">  Reservar esta Hora </button>
					</div> 
						
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
  /*display: table-cell;*/
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

		  professional_data : null ,
		  active_spinner : null,
		  professional_name: null ,

        }
  },

	props: ['center_data' ,'searchParameters', 'app' , 'global_comunas' , 'openModalEvent' , 'modalOpen','global_comunas', 'global_specialties' ],
	emits: [ "updateLastSearch" ],

	created() {
		
	
			},


	computed: {
		showModalAux2() {
		  return   this.showModal ;
		}
	  },

	watch: {
		openModalEvent(newApp, oldApp) {
			console.log("openModalEvent !!!");
			this.showModalPublicAppDetails = true ; 
			console.log("modal created APP:"+this.app)
			console.log("modal created center_data:"+this.center_data)
			//get professional data
			this.getProfessionalData(this.app.professional_id);

			this.imgMapUrl = '/centerMap/center_map_id_'+this.app.center_id+'.JPG' ;	
	  	},
		
		imgLoaded(newApp, oldApp) {
			if(!newApp)
			{this.imgMapUrl = '/centerMap/imgMapNotCreated.JPG' ;}
		},

	},


	methods: {
		updateLastSearch()
		{
                console.log (" update Last Search");
                //this.appointment_list=null ;
                this.$emit('updateLastSearch');
        },
		
		async getProfessionalData(prof_id)
		{
			console.log("GET PROFESSIONAL ID:"+prof_id)
			  if ( prof_id != null )
              { 
                const json = { 
                    token : "AC94327FK",
					professional_id : prof_id ,
                            };

                  console.log ("patient_get_professional INPUT JSON :"+ JSON.stringify(json)  );
                  let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/patient_get_professional",json);             
	              this.professional_data = response_json.data
				  this.professional_name = this.professional_data.name ;
				  console.log ("patient_get_professional RESPONSE:"+JSON.stringify(this.professional_data)) ;
              }
              else 
              {
                    this.appointments = null; 
              } 

		},

		getShortMonthName(month)
		{
			console.log("MONTH:"+parseInt(month));
			let months = ['nodata','Ene.','Feb.' ,'Marz.','Abr.','May.','Jun.','Jul.','Ago.','Sept.','Oct.','Noviembre','Dic.' ]
			return months[parseInt(month)];
		},
		getDayName(day)
		{
			console.log("day:"+parseInt(day));
			let days = ['domingo','Lunes','Martes','Miercoles' ,'Jueves','Viernes','Sabado' ]
			return days[parseInt(day)];
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
                console.log ("emit updateLastSearch: ModalPublicViewAPpointment");
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
        let temp = new Date(date)
        return ( this.getDayName(temp.getDay())+" "+temp.getDate()+" de "+this.getShortMonthName(temp.getMonth()+1)+" "+temp.getFullYear())
    	},

		transform_time(date)
    	{
        let temp = new Date(date)
        return (  String(temp.getHours()).padStart(2,0)+":"+String(temp.getMinutes()).padStart(2,0) )
    	},
		/*
		transform_date2(date)
		{
			let temp = date.split("-") ;
			return (""+temp[2]+" "+this.getShortMonthName(temp[1])+" "+temp[0])
		},
        */



    },


}
</script>