<script setup>
import { ref } from 'vue';
import axios from 'axios';

</script>

<template>

	<teleport to="body"   >
		<div  v-if="showModalShareCalendarToPatient"  class="modal bg-secondary w-100"    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper w-100">
			<div class="modal-container   w-100 modal-background" style="border-radius: 15px;" >
 
                 <!--
                <div class="modal-header mb-0">
                </div>
                -->
                <div class="modal-header m-0" >
                  <div class="d-flex justify-content-between">

                        <div class="h4 m-2">  Compartir Calendario 
                        </div>

                        <div> </div>
                        
                        <div class="ml-2"><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalShareCalendarToPatient = false ; "  aria-label="Close"></i>
                        </div>
                  </div>
                </div>

                <div class="modal-body m-2 p-2"  >        

              <div v-if="showDestinationEmail">
                Enviar al Siguiente Correo
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"> 
              </div>

                  <div class="w-100 ">
                                      
                    <div class="m-2">
                       <!-- <a href="whatsapp://send?text=http://ec2-3-143-168-51.us-east-2.compute.amazonaws.com/nested/publicSearchCalendar.html"> Compartir via Whatsapp <i class="bi bi-whatsapp"></i> </a>  -->
                       <a :href="'whatsapp://send?text='+this.BKND_CONFIG.BKND_HOST+'/nested/publicSearchCalendar.html?cal_id='+calendarToShare.calendar_id"> Compartir via Whatsapp <i class="bi bi-whatsapp"></i> </a> 
                    </div>
                  
                   <div @click="shareEmail()"  class="m-2">
                     Compartir via Correo  <i class="bi bi-envelope"></i>
                   </div>
                   
                  <!--
                    <li class="list-group-item text-primary">
                        <a href="https://api.whatsapp.com/send?text=texto_codificado"> Compartir via Whatsapp   <i class="bi bi-whatsapp"></i></a>
                    </li>
                  -->
                  

                  
                  </div>

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
	position: fixed; 
  display: flex; 
}

div.scroll {
       			margin:4px, 4px;
                padding:4px;
                background-color: green;
                width: 100%; 
                /* height: 190%;*/
                overflow-x: auto;
                overflow-y: auto;
                text-align:justify;
      }

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
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0px 0;
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

export default {
   data : function() {
        return {
           showModalShareCalendarToPatient: false ,
           showDestinationEmail : false ,

              }   
    },
   	
   props: ['activatorShareCalendar','calendarToShare' ],
   emits: ['nothing'] , 
      
  mounted () {
           },

	methods :{
      shareWhatsApp()
      {
        console.log("share WhatsApp");
      },
      shareEmail()
      {
        console.log("share Email");
        this.showDestinationEmail = !this.showDestinationEmail;
      }


    },
  
  watch : {  

            activatorShareCalendar(newValue){
            console.log ("show Activator Calendar !!!");  
            this.showModalShareCalendarToPatient = true ;
        },



  }

    
}
</script>

