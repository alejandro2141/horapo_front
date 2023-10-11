<script setup>
import { ref } from 'vue'
import axios from 'axios';
import loadProgress from './loadProgressProfessional.vue'
import generalHeader from '../GeneralHeader.vue'


defineProps({
  session: Object
})
   
</script>

<template>
<div>
    <loadProgress  :active_spinner="active_spinner" > </loadProgress>
    
     <div class=" m-3 bg-white " style=" border-radius: 15px;">

    <div class="d-flex justify-content-end"><a href="/index.html" class=""><i class="display-5 bi bi-x-lg"></i></a></div>


            <div class="d-flex justify-content-center mt-5">
                    <div class=""  > 
                        <!--
                        <a HREF="/index.html" class="display-4 text-decoration-none" style="color :#2e5668"> 
                        <i class="bi bi-clipboard-pulse" style="font-size: 2rem; color: cornflowerblue;"></i>
                            horapo 
                        </a>
                        --> 
                        <a HREF="/nested/publicSearch.html" class="text-decoration-none" style="color :#2e5668"> 
                            <text class="display-4">horapo</text>  
                        </a> 
                    
                        <div class="text-muted">Mejores consultas en un solo lugar
                        </div>
                    </div>
            </div>
		
           
            <div id="formLogin" class="mx-auto p-3"  style="width: 95%;">
                <form autocomplete="on" >
                   <input  v-model="form_token" id="form_token" name="form_token" type="hidden"  > 
                   <input class="form-control form-control-lg ml-2" v-model="form_email" id="form_email" name="form_email"  type="email" placeholder="Email" aria-label=".form-control-lg example"   style=" border-radius: 15px;" >
                   <br/>
                   <input class="form-control form-control-lg" v-model="form_pass" id="form_pass" name="form_pass"  type="password" placeholder="Contraseña" aria-label=".form-control-lg example"  style=" border-radius: 15px;" >
                    <br/> 

                    <i  type="submit" v-on:click="sendLogin()" class="btn  btn-lg btn-block text-white bg-dark " style="width: 100%; border-radius: 15px;"  >{{ login_message }} <i class="m-2 p-2 bi bi-arrow-right-square"></i> </i>
                </form>   
            </div>

             <p  v-if="!requestReceived" @click="showRecoverPassword=!showRecoverPassword; requestReceived=false" class="m-4 text-secondary"><small>¿Olvidaste tu contraseña?</small></p>
             
             <div v-if="showRecoverPassword" style="width: 300px;">
                <div class="mb-3" >
                    <label for="exampleInputEmail1" class="form-label">Ingrese su correo registrado</label>
                    <input v-model="emailToRecover" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">Enviaremos a su correo registrado un link para actualizar su contraseña</div>
                </div> 
                
                <button v-on:click="recoverPassword(); showRecoverPassword = false; requestReceived=true  " type="button" class="btn btn-secondary">Recuperar</button>

             </div>

             <div v-if="requestReceived">
                Le enviaremos información para recuperar su cuenta.
             </div>
            
            <div class="m-5 p-5 ">
            </div>

        </div>		

</div>
</template>

<style scoped>
</style>

<script>

export default {
   data : function() {
        return {
            login_message : "Ingresar ",
            url_param : [] ,
            form_token : "",
            form_email : "",
            form_pass : "",

            active_spinner : false , 
            showRecoverPassword :false,
            emailToRecover:null , 
            requestReceived: false 
        }   
    },
    emits: ['startSession'] ,

    methods: {

        async recoverPassword()
        {
            console.log("forgot passowrd:"+ this.emailToRecover )

            if (confirm("enviar solicitud?") == true) {
                    const json = { 
                    form_email : this.emailToRecover ,
                    form_token : this.form_token ,	
                    date : new Date(),				   
                            };
                    console.log ("REQUEST :"+ JSON.stringify(json)  );
                    
                    let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_recover_password",json);
                        
            } 
            else {
                 
                }
			
            
		
        },

        

        //SEND LOGIN
        async sendLogin(event) {
			this.active_spinner = true ; 
            const json = { 
			   form_email : this.form_email ,
			   form_pass : this.form_pass ,  
			   form_user_type : '1',			   
			   form_token : this.form_token ,					   
   			   	      };
			console.log ("REQUEST :"+ JSON.stringify(json)  );
			
			let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_login",json);
		
            console.log ("RESPONSE login:"+JSON.stringify(response_json.data)) ;
			//this.response_json = response.data;
			  if (response_json.data.result_code == 0 ) {
					  console.log("Login Exitosos!!");
					   //this.url_param: ["token"]=""
                      this.login_message="Login Exitoso !!!"
					  this.setParamFromJSONDATA(response_json.data);
                        //TODO Aqui ponemos el emit con los datos de la sesion
                       //console.log("enviando emit");
                       this.$emit('startSession', response_json.data );
					  //window.location.replace("professional_day_v2.html"+this.getUrlParam());
					  }
			    else  {
					  console.log("Login Fallido");
					  this.login_message  = "Error Login " ;
					  }		
               this.active_spinner = false ; 		  
	        },
        //SET PARAM
            setParamFromJSONDATA(obj)
            {
                for (var key of Object.keys(obj)) 
                    {
                    //console.log(key + " -> " + obj[key]);
                    this.url_param[key] = obj[key];
                    }
            },
        //GET URL PARAM
            getUrlParam()
	        {			
				console.log("GET URL parameters ");
				var urla='?';
				for (var key of Object.keys(this.url_param)) 
				{urla+=key+"="+this.url_param[key]+"&" ;}	
				return urla ;
	        },
        //GET PROFESSIONA CENTERS
        /*
        async loadProfessionalCenters() {             
                const json = { 
                professional_id : this.session_params.professional_id ,			   
                            };
                console.log ("GET CENTERS REQUEST :"+ JSON.stringify(json)  );
                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_centers",json);
                this.global_professional_centers = response_json.data.rows;
                console.log ("RESPONSE CENTERS:"+JSON.stringify(this.global_professional_centers)) ;                       
            },
            */


        },

}


</script>