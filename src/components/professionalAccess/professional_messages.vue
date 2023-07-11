<script setup>
import { ref } from 'vue'
import axios from 'axios';
//import { GLOBAL_COMUNAS } from '../../../config123.js' 

</script>

<template>
       <div class="" >
            <div class="d-flex justify-content-start">
						<div>
							<textarea style="border-radius: 10px; "  maxlength="100" class="h-75 w-90 m-2 p-3" id="story" v-model="text_message" name="story"  placeholder="Comment text.">
							</textarea>
						</div>
						<div class="m-1">
							<text class="text-dark"><small>Tu Animo</small></text> <br>
							<p>
								<i @click="animo =1;text_message=text_message.concat(' :( ')" class="text-danger bi bi-emoji-angry h2 m-4 "></i><br>
							</p>
							<p>
							<i @click="animo =2;text_message=text_message.concat(' :| ')" class="text-secondary bi bi-emoji-neutral h2 m-4 "></i><br>
							</p>
							<p>
							<i @click="animo =3;text_message=text_message.concat(' :) ')"  class="text-success bi bi-emoji-heart-eyes h2 m-4 "></i><br>
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

            <div v-if="comments != null" class="text-secondary text-start"  >
               <br>
                <div v-for="comment in comments" :key="comment.id" class="mt-2" >
                
                    <div v-if="comment.reply" >
                        <i class="h2 bi bi-emoji-laughing-fill "></i><text class="fw-bold"> HORAPO team : </text>{{comment.message}}<br>  
                    </div>
                    <div v-else>
                        <i v-if="comment.animo == 1" class="bi bi-emoji-angry h2 "></i>
                        <i v-if="comment.animo == 2 || comment.animo == 0 " class="bi bi-emoji-neutral h2 "></i>
                        <i v-if="comment.animo == 3" class="bi bi-emoji-heart-eyes h2 "></i>
                        {{ new Date(comment.date_time).toLocaleDateString() }}  {{comment.message}}<br>
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