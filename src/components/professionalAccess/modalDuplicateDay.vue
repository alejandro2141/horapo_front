<script setup>
import { ref } from 'vue';
import axios from 'axios';

</script>

<template>

	<teleport to="body"   >
		<div  v-if="showModalDuplicateDay" class="modal bg-secondary"    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-1 modal-background">
 
                <div class="modal-header" >
                    <div class="d-flex flex-row bd-highlight mb-1 display-3">
                        <div class="p-1 bd-highlight">Duplicar Sus Horas <br/>
                       </div>
                        <div class="p-1 bd-highlight"></div>
                         <div class="p-1 bd-highlight"><i class="display-1 bi bi-x "  v-on:click="showModalDuplicateDay = false" aria-label="Close"></i>
                       </div>
                    </div>
                </div>

                <div class="modal-body mt-0" > 
                 
                    <form autocomplete="off"  >	
                    Modal duplicate Day 
                    </form>			

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

/************************ */
</style>


<script>

export default {
   data : function() {
        return {
            needsCreateCenter: false ,
           // centers: null,
            form_center_id : null,
            form_public : null ,
            form_start_time : null ,
            form_specialty_code : null ,
            form_center_code  : null ,
            form_app_duration : 30,

            showModalCreateApp : false,

            showErrorCenters : false ,
          }   
    },
   	
   props: ['daterequired','hourCreate', 'session_params' ],
   emits: ['updateAppList','switchView'] , 
      
   	mounted () {
           this.auxHourCreate = ref(this.hourCreate) ;
           console.log("Modal Create Appointment Mounted !!!" );
         //  this.getCenters();
    },

	methods :{
//GET CENTERS      
    centersError(value) {
      console.log("centersError In modal "+value);
      this.needsCreateCenter = value ; 
    },

    switchView(){
            this.$emit('switchView');
         },

    /*
        async getCenters() {
			const json = { 
			   professional_id : this.session_params.professional_id  ,			   
   			   	      };
			console.log ("getCenters REQUEST :"+ JSON.stringify(json)  );
			let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_centers",json);
			console.log ("getCenters RESPONSE :"+JSON.stringify(response_json.data.rows)) ;
			this.centers = response_json.data.rows;
            //this.prevCenterName="noset";
			},

        selectedSpecialtyCode(value){
            console.log("selecte Specialty Code "+value);
        },
    */
    selectedSpecialtyCode(value)
    {
    console.log("speciality selected code: "+value);
    this.form_specialty_code = value ;
    },

    selectedCenterCode(value)
    {
    console.log("Center selected code: "+value);
    this.form_center_code = value ;
    },

	  async createHours() {
    	var r =confirm("Se procedera a crear esta hora en su agenda");
					  if (r == true) {

        const json = { 
              form_center_id  : this.form_center_code ,
              form_professional_id : this.session_params.professional_id  ,
             //hours 
              form_date : this.daterequired ,
              form_start_time : this.form_start_time , //cambio
              form_appointment_duration : this.form_app_duration , 
              form_specialty_code : this.form_specialty_code,
              form_public : this.form_public ,
                        };
                  
        console.log ("createHours REQUEST :"+ JSON.stringify(json)  );
        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_create_appointment",json);
        console.log ("createHours RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
        //location.reload();
        //this.agendas = response_json.data.rows;
        //location.reload();
        this.$emit('updateAppList');
        this.showModalCreateApp = false ;
            }


        }




    },
    watch : {
        hourCreate(newValue){
             
             this.showModalCreateApp= true ;
            console.log ("hourCreate Change!!!"+newValue+ " ShoModalCreateApp="+this.showModalCreateApp);
            this.form_start_time = newValue.start_time ; 
        }
    }

    
}
</script>

