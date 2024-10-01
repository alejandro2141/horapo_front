<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { BKND_CONFIG } from '../../../config123.js'


</script>

<template  >
<div>
        <div v-if="showForm"  id="form" class="m-1 p-1 ">
            
            <form autocomplete="off">
                <div class="form-row">
        <p style="font-size: 1.5em">Registro Profesional</p>



                <div class="form-group">
                    <label for="inputSpecialty">Ingrese su especialidad</label>
                    <br>
                <!-- 
                    <input type="text"  autocomplete="off"  class="form-control" id="specialty" placeholder="Ej: Kinesiologia, psicologia, terapia.." v-model="specialty">
                -->
                    <select class="form-select form-select-lg"  name="languages" id="lang" v-model="specialty" placeholder="XXX" >
                        <option value="100">Kinesiología</option>
                        <option value="200">Psicología</option>
                        <option value="300">Fonoaudiología</option>
                        <option value="400">Nutrición</option>
                        <option value="500">Terapia Ocupacional</option>
                        <option value="600">Psicopedagogía</option>
                        <option value="700">Enfermería</option>
                        <option value="800">Masoterapia</option>
                    </select>

                  

                </div>

                <div class="form-group">
                        <label for="inputNames">Nombres</label>
                        <input type="text" autocomplete="off" class="form-control" id="inputNames" placeholder="" v-model="name">
                </div>
                
                <div class="form-group">
                    <label for="inputLastName">Apellido Paterno</label>
                    <input type="text" autocomplete="off"  class="form-control" id="inputLastName" placeholder="" v-model="last_name1">
                </div>

                <div class="form-group ">
                    <label for="inputSecondLastName">Apellido Materno</label>
                    <input type="text"  autocomplete="off" class="form-control" id="inputSecondLastName" placeholder="" v-model="last_name2">
                </div>

                <div class="form-group ">
                    <label for="inputEmail4">Email</label>
                    <input type="email"  autocomplete="off" class="form-control" id="inputEmail4" placeholder="" v-model="email">
                </div>

                <div class="form-group ">
                    <label for="inputDocId">N° Cedula RUT </label>
                    <input type="text"  autocomplete="off" class="form-control" id="inputDocId" placeholder="xx.xxx.xxx-y" v-model="doc_id">
                </div>
            <br>
            
                <div class="form-group ">
                    <label v-if="passwd == passwd2 && passwd2!=null && passwd != null" for="inputPassword4">Ingrese una contraseña</label> 
                    <label v-else class="text-danger">Contraseñas No coinciden </label> 

                    <div class="d-flex justify-content-start">
                        <input :type="type_password1"  autocomplete="off" class="form-control" :class="{'border-danger' : (passwd != passwd2 && passwd2!=null)   }"  id="inputPassword4"  v-model="passwd">
                        <i @click="showMePassword1()" class="bi  border border-1 p-1" :class="{ 'bi-eye-slash': !showPassword1 , 'bi-eye': showPassword1   }" > </i>
                    </div>
                </div>

                <div class="form-group ">
                    <label v-if="passwd == passwd2 && passwd2!=null && passwd != null" for="inputPassword4">Repita contraseña</label> 
                    <label v-else class="text-danger">Repita contraseña</label> 
                    <input :type="type_password1"  autocomplete="off" class="form-control" :class="{'border-danger' : (passwd != passwd2 && passwd2!=null)   }" id="inputPassword2"  v-model="passwd2">
                </div>
           

                </div>
                <div class="form-group">

                <label v-if="personal_address!= null && personal_address.length < 40 " >Direccion Particular</label> 
                <label v-else class="text-danger">Dirección No es Válida</label> 

                <input type="text"  autocomplete="off" class="form-control" id="inputAddress" placeholder="" v-model="personal_address">
                </div>

                <div class="form-group">
                    <label v-if="personal_phone!= null && personal_phone.length < 10 " >Teléfono de Contacto</label> 
                    <label v-else class="text-danger">Ingrese teléfon Válido <i>+569xxxxxxxx</i></label> 

                    <div class="d-flex align-items-start">
                        <div class="border border-1 p-2">
                         +56    
                        </div>
                        <div>
                           <input type="text"  autocomplete="off" class="form-control" id="inputPhone" placeholder="Ej: XXXXXXXXX" v-model="personal_phone">
                        </div>
                    </div>


                                 </div>


                <div class="text-center pt-5 mb-5 pb-5" >

                    <a  @click='sendFormRegister();showForm = false' class="btn btn-primary"  >Registrarme! </a>
                    <!-- 
                    <button @click='sendFormRegister' class="btn btn-primary">Registrarme!</button>
                    -->
                </div>

            </form>

        </div>
        <div v-if="!showForm" >
            <p class="text-center" >
                <i class="bi bi-emoji-heart-eyes text-success" style="font-size: 2.5em;" ></i>  
                <text class="" style="font-size: 1.1em;" > 
                   
                    &nbsp;&nbsp;&nbsp; Gracias por su registro <br>Te enviaremos informacion de acceso a tu correo</text>
            </p>
            
            <p class="text-center">
                <a  class="btn btn-primary" HREF="/index.html" >Ir a HORAPO </a>
            </p>

          
                   
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
       showForm : true ,
       name : null ,
       last_name1 : null ,
       last_name2 : null ,
       email  : "" ,
       doc_id  : null ,
       passwd  : null ,
       passwd2  : null ,
       personal_address  : "" ,
       personal_phone  : "" ,
       specialty  : "Especialidad" ,
       showKnowMore1 : false ,
       showPassword1 : false ,
       showPassword2 : false ,
       type_password1 : "password" 
    }
  },

 props: [],
 //emits: ['closeRegisterForm'] , 

  methods: {

    showMePassword1()
    {
    this.showPassword1= !this.showPassword1  

        if ( this.showPassword1) 
        { 
            this.type_password1 = "text"
        } 
        else 
        {
            this.type_password1 = "password"
        }

    },

    sendFormRegister2 () {
      console.log(" send form register method ");
      //return 0 ;
    }, 
    
    async sendFormRegister()
        {
           console.log("send Register Form");
           var r = true;
          
        
           if (confirm("Confirmar para enviar formulario") == true) {

            //alert("Gracias por su Registro, Pronto nos pondremos en contacto con usted")

                const json = { 
                    name : this.name,
                    last_name1 : this.last_name1,
                    last_name2 : this.last_name2,
                    email	: this.email,
                    doc_id	: this.doc_id,
                    passwd	:	this.passwd,
                    personal_address:	this.personal_address,
                    personal_phone	: this.personal_phone,
                   /// specialty	:	this.specialty,
                   specialty	:	this.specialty ,
                   
                        };
                 //app.config.globalProperties.dbhost = 'http://192.168.0.114:8080' ;       
                console.log ("sendFormRegister  REQUEST :"+ JSON.stringify(json)  );
                let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/public_register_professional",json );
                console.log ("sendFormRegister  RESPONSE:"+JSON.stringify(response_json.data)) ;
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

                }
                //location.href = "/index.html";

        },

    compare () {
        if (this.passwd2 === this.passwd)
        {
            console.log("contraseña es igual")
        }
        else 
        {
            console.log("contraseña no coincide")
        }

     
      //return 0 ;
    }, 




  },

  watch : {
         // NO SE ACTUALIZAAAA
        passwd2(oldval,newval)
        { 
            console.log("passwd2 cambia");
            this.compare()
        },
        passwd(oldval,newval)
        { 
            console.log("passwd1 cambia"); 
            this.compare()
        },
        
        }
}
</script>