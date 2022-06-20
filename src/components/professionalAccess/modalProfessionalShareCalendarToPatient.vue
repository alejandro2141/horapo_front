<script setup>
import { ref } from 'vue';
import axios from 'axios';

</script>

<template>

	<teleport to="body"   >
		<div  v-if="showModalShareCalendarToPatient"  class="modal bg-secondary w-100"    >
		    <transition name="modal">
			<div class="modal-mask "   >
			<div class="modal-wrapper">
			<div class="modal-container w-100  p-1 m-1 modal-background" style="border-radius: 15px;" >
 
                 <!--
                <div class="modal-header mb-0">
                </div>
                -->
                <div class="modal-header m-0 " >
                      <div class="h4 ">Compartir Calendario en Redes Sociales
                      </div>

                      <div> </div>
                        
                      <div class=""><i class="display-1 text-primary bi bi-x-lg ml-0"  v-on:click="showModalShareCalendarToPatient = false ; "  aria-label="Close"></i>
                      </div>
                </div>

                <div class="modal-body m-1 p-1"  >     

              <div class="d-flex justify-content-between p-3" > 
                <div> 
                  <a href="mailto:user@example.com?subject=Hola Te comparto mi calendario para agendar horas&body=Hola Te comparto mi calendario para agendar horas, en el siguiente link puedes acceder directamente a mi agenda para encontrar la hora que mejor se ajuste a tu disponibilidad de tiempo">Email<br> 
                  <i class="display-1  bi bi-envelope"></i> </a> 
                </div>
                
                <div>
                    <div  data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">
                    Facebook <br>
                    <i class="display-1 bi bi-facebook"></i>
                    
                    </a></div>
                </div>
                
                <div> 
                  <a :href="'whatsapp://send?text=http://ec2-3-143-168-51.us-east-2.compute.amazonaws.com/nested/publicSearchCalendar.html?cal_id='+calendarToShare.calendar_id">
                   WhatsApp <br>
                   <i class="display-1 bi bi-whatsapp"></i> </a>  
                </div>

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

