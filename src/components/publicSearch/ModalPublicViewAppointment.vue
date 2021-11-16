<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ModalPublicReserveAppForm from './modalPublicReserveAppForm.vue';



//const count = ref(0)
</script>

<template>

<ModalPublicReserveAppForm v-on:updateSearchResult='updateSearchResult' :appToReserve='appToReserve'  :eventShowModalPubicReserve='eventShowModalPubicReserve'></ModalPublicReserveAppForm>

	<teleport to="body"   >

		<div v-if="showModalPublicAppDetails" class="modal bg-secondary"   >
		    
			<transition name="modal">
			<div class="modal-mask " v-if="app != null && showModalAux"  >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-0 modal-background" style="border: 0px solid rgb(168, 168, 168); border-radius: 20px;"  >
              
                <div class="modal-body " > 
 					<div class="d-flex flex-row justify-content-end  m-0">
                      <div class="display-4 " style="color:#1f9d94 ; margin-right: 1em;"  > <b> {{ app.specialty_name}} </b> </div>
                      <div class="" style="margin-right: 1em;" > </div>
                      <div class=""><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalPublicAppDetails = false" aria-label="Close"></i> </div>
                    </div>

                    <div class=" w-100 display-6 m-0 p-0" style="color:#2e5668">	
                   		 {{ transform_date( app.date.substring(0, 10) ) }} 
                        {{app.start_time.substring(0, 5) }} hrs   
                    </div> 


                <div class="mb-2 h2" style="color:#2e5668" >
					<text class="">  
               			Con:  {{app.name }} 
			   		</text>
                </div>               
                
                <div class="mb-1" style="color:#2e5668">  
				" {{app.center_name }} " <br> 
				</div>

 <div class="display-6" style=" color:#1f9d94"> {{comuna_id2name(app.comuna) }}  </div>


				<div>
				
               En: {{app.center_address }}
                </div>
                <hr>
<div>
	<a :href="app.url_map" >Ir al Mapa</a>
		<img :src="'/centerMap/center_map_id_'+app.center_id+'.JPG'" class="img-fluid" alt="center map">
	

</div>
	 <button type="button" @click="reserveHour(app);"  class="btn btn-primary m-2"> <i class="bi bi-person-square"></i> Reservar esta Hora </button>
                    		

                    </div>
        </div> 
        </div> 		
		</div> 
        </transition>
    	</div>
	</teleport>


</template>

<style scoped>


.modal {
  position: absolute;
  display: flex;
}

.modal div {
  display: flex;
  flex-direction: column; 
}
/*
.modal-background {
    background-color:#DAEFF3
        }
*/
/************************* */



.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
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
  border-radius: 2px;
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
        }
  },

	emits: ["updateSearchResult"],
	props: [ 'app' , 'global_comunas' , 'openModalEvent' , 'modalOpen' ],


computed: {
		showModalAux2() {
		  return   this.showModal ;
		}
	  },

	  watch: {
		openModalEvent(newApp, oldApp) {
			console.log("openModalEvent !!!");
			this.showModalPublicAppDetails = true ; 
	  },
	},

	methods: {

	

		reserveHour(hour)
		{
			console.log("Public Reserve Hour ... display Modal");
			
			this.showModalPublicAppDetails = false ;
			this.appToReserve = hour ;
			this.eventShowModalPubicReserve = Math.random() ;
		},
		updateSearchResult()
        {
                console.log (" update search Result. ");
                //this.appointment_list=null ;
                this.$emit('updateSearchResult');
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
        return (" "+temp[2]+"/"+temp[1]+"/"+temp[0])
    	},
        



    },


}
</script>