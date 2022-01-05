
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import InputFormSpecialtyProfessional from './inputFormSpecialtyProfessional.vue';
import InputFormCenterProfessional from './inputFormCenterProfessional.vue';


</script>

<template>
	<teleport to="body"   >
		<div  v-if="showModalDuplicateDay" class="modal bg-secondary"    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper ">
			<div class="modal-container  m-1 p-1 modal-background">
 

                <div class="modal-body mt-0" > 
                
                    <div class="d-flex flex-row bd-highlight mb-1 h3">
                        <div class="p-1 bd-highlight">Duplicar Horas Dia <br/>
                        </div>
                            <div class="p-1 bd-highlight"></div>
                            <div class="p-1 bd-highlight"><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalDuplicateDay = false" aria-label="Close"></i>
                        </div>
                    </div>

                    <div class="h3" >
                      {{ transform_date(daterequired)}}
                    </div>
                    <div>
                      Al siguiente dia: 
                    </div>

                       <div class="d-flex flex-row h1 " >
                              <div class="col-4">
                                  DIA
                              </div>
                               <div class="col-4">
                                  MES
                              </div>
                               <div class="col-4">
                                  AÑO
                              </div>
                       </div>
                       
                        <div class="d-flex flex-row border border-2" >
                                    <div class="d-flex flex-row m-2 ">
                                        <div class="col-7">
                                         
                                            <input type="text" style="height : 100%" class="form-control p-1" v-model="form_day">
                                        </div>
                                        <div class="col-5">
                                            <button @click="form_day++" type="button" class="btn btn-secondary btn-sm"><i class="bi bi-caret-up"></i></button>
                                            <button @click="form_day--" type="button" class="btn btn-secondary btn-sm"><i class="bi bi-caret-down"></i></button>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row m-2 ">
                                        <div class="col-7">
                                            <input type="text" style="height : 100%" class="form-control p-1" v-model="form_month">
                                        </div>
                                        <div class="col-5">
                                            <button @click="form_month++" type="button" class="btn btn-secondary btn-sm"><i class="bi bi-caret-up"></i></button>
                                            <button @click="form_month--" type="button" class="btn btn-secondary btn-sm"><i class="bi bi-caret-down"></i></button>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row m-2 ">
                                        <div class="col-7">
                                            <input type="text" style="height : 100%" class="form-control p-1" v-model="form_year">
                                        </div>
                                        <div class="col-5">
                                            <button @click="form_year++" type="button" class="btn btn-secondary btn-sm"><i class="bi bi-caret-up"></i></button>
                                            <button  @click="form_year--" type="button" class="btn btn-secondary btn-sm"><i class="bi bi-caret-down"></i></button>
                                        </div>
                                    </div>
                        </div>

                        <div>
                          <button @click="duplicateDay(daterequired, form_year+'-'+form_month+'-'+form_day  )" type="button" class="m-4 btn btn-primary">duplicar</button>
                        </div>
                

           

                   <!--
                        <div class="">
                       
                            <div v-for="(appointment) in appointments_day" :key="appointment"  >
                              <div class="border border-1" >
                                  <div class="flex ">
                                    <div  v-if="appointment.app_type_center" style=" font-size: 1.0em;" >
                                      <i class="bi bi-building"> </i>  
                                    </div>

                                    <div  v-if="appointment.app_type_home" style=" font-size: 1.0em;" >
                                      <i  class="bi bi-house"></i> 
                                    </div> 
                                    
                                    <div>
                                     {{appointment.start_time.substring(0, 5) }}	 {{appointment.duration }}min  en 
                                    </div>
                                    <div> 
                                     <text v-if="appointment.app_type_center" > {{appointment.center_name }}</text> 
                                    </div>
                                    <div> 
                                    
                                     <text v-if="appointment.app_type_home" > A domicilio </text> 
                                    </div>
                                        <div class="">
                                            {{ id2name(appointment.specialty ) }}
                                            {{ id2name(appointment.specialty1 ) }}
                                            {{ id2name(appointment.specialty2 ) }} 
                                            {{ id2name(appointment.specialty3 ) }} 
                                            {{ id2name(appointment.specialty4 ) }}
                                            {{ id2name(appointment.specialty5 ) }}
                                        </div>
                                  
                                  </div>
                                  
                                  
                                  
                                  
                                 

                              </div>

                            </div>

                          

                        </div>

                  
                        <div class="m-3">
                            Destino
                        </div>
                  
                      -->

     
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
            showModalDuplicateDay: false ,
            form_day : parseInt(this.daterequired.split("-")[2] )+1   , 
            form_month : parseInt(this.daterequired.split("-")[1] ) ,
            form_year : parseInt(this.daterequired.split("-")[0] ) ,
          }   
    },
   	
   props: ['daterequired','hourDetails', 'session_params' , 'appointments_day', 'openModalDuplicateDay' , 'global_comunas' , 'global_specialties' ],
   emits: [] , 
      
   	mounted () {
           this.auxHourCreate = ref(this.hourCreate) ;
           console.log("Modal Create Appointment Mounted !!!" );
       },

	methods :{


	   async duplicateDay(origin,destination) {
    	var r =confirm("Se procedera a duplicar al dia indicado");
			if (r == true) {
              const json = { 
                  session_params : this.session_params, 
                  origin : origin ,   
                  destination : destination ,        
              };
                  
        console.log ("duplicateDay :"+ JSON.stringify(json)  );
        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_duplicate_day",json);
        console.log ("duplicateDay RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
        //location.reload();
        //this.agendas = response_json.data.rows;
        //location.reload();
       // this.$emit('updateAppList');
        this.showModalDuplicateDay = false ;
        }
      },

        id2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },
        id2comuna(id){
            let temp= this.global_comunas.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },
        transform_date(date)
        {
          let temp = date.split("-") ;
          return (""+temp[2]+" de "+this.getShortMonthName(temp[1])+" "+temp[0])
        },
        getShortMonthName(month)
        {
          console.log("MONTH:"+parseInt(month));
          let months = ['nodata','Ene.','Feb.' ,'Marz.','Abr.','May.','Jun.','Jul.','Ago.','Sept.','Oct.','Nov.','Dic.' ]
          return months[parseInt(month)];

        },

      },

    watch : {
      	openModalDuplicateDay(newApp, oldApp) {
         
           console.log("openModal Duplicate Day !!!");
           this.showModalDuplicateDay = true ;
              console.log("appointment_day:"+this.appointments_day);    
        },
      }
    
}
</script>




