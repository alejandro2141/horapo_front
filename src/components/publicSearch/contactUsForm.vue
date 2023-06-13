<script setup>
import { ref } from 'vue'
import axios from 'axios';



</script>

<template  >
<div>
    <div v-if="true"  id="form" class=" p-1" style="margin-top: 0em;">
        <div class="form-row">
        <!--
            <p class="text-center h4">Envianos un mensaje</p>
        
            <div class="form-group ">
                <input type="email" style="border-radius: 10px;" autocomplete="off" class="form-control" id="inputEmail4" placeholder="Ingrese su Email" v-model="email">
            </div>
            <br>
           
            <textarea v-model="message" style="border-radius: 15px;" id="w3review" placeholder="Ingrese su Mensaje" name="w3review" rows="4" cols="50" class="p-3"></textarea>
        -->
    <div v-if="show_confirm == !true">
        <div class="d-flex justify-content-between"> 
                <text class="text-secondary h5">Envianos un mensaje</text>

                <div class=""> 
                    <a HREF="/index.html" type="button" class=""><i class="display-5 bi bi-x-lg text-primary"></i></a>
                </div>
        </div>

        <input type="email" style="border-radius: 10px;" autocomplete="off" class="form-control w-50 m-1 " id="inputEmail4" placeholder="Ingrese su Email" v-model="email">
       
        <div class="d-flex justify-content-start">
						
                        <div>
                           
							<textarea style="border-radius: 10px; "  class="form-control h-75 w-90 m-2 p-3" id="story" v-model="text_message" name="story"  placeholder="Comment text.">
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
        
        <div class="d-flex justify-content-center  ">
            <div @click="sendComments()" class="border border-2 p-3 bg-primary text-white " style="border-radius: 15px;" >
                <text> Enviar <i class="bi bi-send " ></i> </text>
            </div>
        </div>
        
    </div>


    <div v-if="show_confirm == true"  class="text-center">
        <text style="font-size:1.3em" > 
            El equipo de HoraPO agradece tus comentarios  <br><i class="display-5 bi bi-emoji-kiss"></i>
        </text>
       <br>

        <a  class="btn btn-primary" HREF="/index.html" > Regresar  </a>
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
       email: "" ,
       animo : "" , 
       show_confirm : false 
    }
  },

 props: [],
 //emits: ['closeRegisterForm'] , 

  methods: {
    
    async sendComments()
    {
        console.log("Sending Comments: "+this.message);

        console.log("send Register Form");
           var r = true;
          
        
           if (confirm("Ok para enviar comentarios ") == true && this.text_message.length >4  ) {

            //alert("Gracias por su Registro, Pronto nos pondremos en contacto con usted")

                const json = { 
                   message	:	this.text_message ,
                   email : this.email, 
                   animo : this.animo.toString()
                        };

                 //app.config.globalProperties.dbhost = 'http://192.168.0.114:8080' ;       
                console.log ("public_send_comments  REQUEST :"+ JSON.stringify(json)  );
                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/public_send_comments",json );
                console.log ("public_send_comments  RESPONSE:"+JSON.stringify(response_json.data)) ;
                //app = response_json.data[0];
                //alert("Gracias por su Registro");
                //console.log ("Rows : "+JSON.stringify(response_json.data.rows[0].name )  );
                //if (response_json.data.rows[0] )
               // if (response_json.data.rows[0].name != null )
               // {
                    //display modal 
                    //this.display = true ;
                //location.href = "/index.html";
                //window.location.replace("/index.html");
                //this.$emit('closeRegisterForm', response_json.data );
                //}

                this.show_confirm = true ; 

                }
                //location.href = "/index.html";






    },
  }
}
</script>