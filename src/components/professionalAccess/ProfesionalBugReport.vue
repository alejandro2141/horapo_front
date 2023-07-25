<script setup>
import { ref } from 'vue'
import axios from 'axios';
//import { GLOBAL_COMUNAS } from '../../../config123.js' 

</script>

<template>
     <div class="m-2 p-2 bg-warning" style="border-radius: 20px;">
        <div >

        <!-- BUG ICON on click display form-->
        <div class="d-flex justify-content-center">
            <div @click="displayBugForm=!displayBugForm" >
                <i class="display-2 bi bi-bug-fill text-secondary"></i> 
                <text class="text-secondary m-4">Problemas y Comentarios <br></text>
                
            </div>
        </div>


        <!-- Form Notificate Profesional Bug-->
       <div class="m-2" v-if="displayBugForm" >
            <div class="d-flex justify-content-center">
				<textarea style="border-radius: 10px; "  maxlength="100" class="h-75 w-100 m-4 p-3 border border-warning" id="story" v-model="text_message" name="story"  placeholder="Comment text.">
				</textarea>		
			</div>

            <!-- FACES -->
            <div class="m-1 d-flex justify-content-center">
							
							<text>
								<i @click="animo =1;text_message=text_message.concat(' :( ')" class="text-danger bi bi-emoji-angry  display-1"></i><br>
                            </text>
							<text>
							<i @click="animo =2;text_message=text_message.concat(' :| ')" class="text-secondary bi bi-emoji-neutral m-4 display-1"></i><br>
                            </text>
							<text>
							<i @click="animo =3;text_message=text_message.concat(' :) ')"  class="text-success bi bi-emoji-heart-eyes display-1"></i><br>
                            </text>
							
			</div>

            <!-- BUTTONS -->
			<div class="d-flex m-1 d-flex justify-content-center m-3 p-3">
						<text class="text-white btn btn-primary" @click="text_message='';displayBugForm=false ">Cancelar</text>   
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<text class="text-white btn btn-primary" @click="sendComments">Enviar</text>
			</div>

            <div v-if="comments != null" class="text-secondary text-start  w-75 m-2"  >
                <i class="bi bi-hammer">Estamos trabajando para solucionar: </i>
               <br>
                <div v-for="comment in comments" :key="comment.id" class="mt-2 " >
                
                    <div v-if="comment.reply" >
                        <i class="h2 bi bi-emoji-laughing-fill "></i><text class="fw-bold"> HORAPO team : 

                        </text>{{comment.message}}<br>  
                    </div>
                    <div v-else>
                        <i v-if="comment.animo == 1" class="bi bi-emoji-angry h2 "></i>
                        <i v-if="comment.animo == 2 || comment.animo == 0 " class="bi bi-emoji-neutral h2 "></i>
                        <i v-if="comment.animo == 3" class="bi bi-emoji-heart-eyes h2 "></i>
                       <text>{{ new Date(comment.date_time).toLocaleDateString() }}  {{comment.message}}</text> <br>
                    </div>

               
                </div>
            </div>

            

        </div>
    
    </div>
    
    </div>
     
</template>

<style scoped>

</style>


<script>
//const showForm = ref(false)

export default {
   data : function() {
        return {
            text_message: "", 
			animo: 0 , 
            comments: null ,
            displayBugForm :false 
        }
    },  
 
   props: ['session_params'], 
   emits: [],

mounted() {   
        this.getMessagesReply();
        },

    watch: {
        },

    methods: {
            async getMessagesReply()
            {
                const json = { 
                professional_id: this.session_params.professional_id ,
                            };

                console.log("Obtain Previous Messages and Reply")
                let resp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_comments",json);
                console.log("Get Message Response :"+JSON.stringify(resp) )
                //this.comments = resp.data
                this.comments = resp.data.rows
               
            },  
            
            async sendComments()
            {
                if (this.text_message && this.text_message.length>1)
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
                this.getMessagesReply()
                }

            }   
       
        
        },


}

</script>