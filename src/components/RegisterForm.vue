<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
<div class="bg-light">
        <div class="m-2 p-2 text-center">
               Para que sus horas de atención esten disponibles en la busqueda de pacientes, debe registarse como profesional completando el siguiente formulario.
            <div class="text-center mt-2 pt-5 "> 
                 <a HREF="/index.html" type="button" class="btn btn-outline-secondary m-2">Regresar</a>
                 <button type="button" @click="showForm  = !showForm " class="btn btn-secondary ">Si, deseo Registarme</button>
            </div>
        </div>

        <template  v-if="showForm" >
        <div id="form" class="bg-light p-3">
            <hr>
            <form autocomplete="off">
                <div class="form-row">

                <div class="form-group col-md-6">
                        <label for="inputNames">Nombres</label>
                        <input type="text" autocomplete="off" class="form-control" id="inputNames" placeholder="Ej: Carlos Alberto" v-model="name">
                </div>
                
                <div class="form-group col-md-6">
                    <label for="inputLastName">Apellido Paterno</label>
                    <input type="text" autocomplete="off"  class="form-control" id="inputLastName" placeholder="Ej: Morales" v-model="last_name1">
                </div>

                <div class="form-group col-md-6">
                    <label for="inputSecondLastName">Apellido Materno</label>
                    <input type="text"  autocomplete="off" class="form-control" id="inputSecondLastName" placeholder="Ej:Gonzales" v-model="last_name2">
                </div>

                <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input type="email"  autocomplete="off" class="form-control" id="inputEmail4" placeholder="Ej: micorreopersonal@gmail.com " v-model="email">
                </div>

                <div class="form-group col-md-6">
                    <label for="inputDocId">N° Cedula RUT </label>
                    <input type="text"  autocomplete="off" class="form-control" id="inputDocId" placeholder="Ej 13909365-8" v-model="doc_id">
                </div>

                <div class="form-group col-md-6">
                    <label for="inputPassword4">Ingrese una contraseña</label>
                    <input type="password"  autocomplete="off" class="form-control" id="inputPassword4" placeholder="***" v-model="passwd">
                </div>

                </div>
                <div class="form-group">
                <label for="inputAddress">Direccion Particular</label>
                <input type="text"  autocomplete="off" class="form-control" id="inputAddress" placeholder="Ej: Av providencia 1234, Providencia, Santiago" v-model="personal_address">
                </div>

                <div class="form-group">
                    <label for="inputPhone">Telefono personal de contacto </label>
                    <input type="text"  autocomplete="off" class="form-control" id="inputPhone" placeholder="Ej: +56975397201" v-model="personal_phone">
                </div>

                <div class="form-group">
                    <label for="inputSpecialty">Ingrese su especialidad</label>
                    <input type="text"  autocomplete="off"  class="form-control" id="specialty" placeholder="Ej: Kinesiologia, psicologia, terapia.." v-model="specialty">
                </div>

                <div class="text-center pt-5 mb-5 pb-5" >
                    <button @click='sendFormRegister' class="btn btn-primary">Registrarme!</button>
                </div>


            </form>

        </div>

        </template>
</div>
</template>

<style scoped>

</style>

<script>
//const showForm = ref(false)


export default {
  data : function() {
    return {
       showForm : false ,
       name : null ,
       last_name1 : null ,
       last_name2 : null ,
       email  : null ,
       doc_id  : null ,
       passwd  : null ,
       personal_address  : null ,
       personal_phone  : null ,
       specialty  : null ,
    }
  },

  methods: {
    sendFormRegister2 () {
      console.log(" send form register method ");
      //return 0 ;
    }, 
    
    async sendFormRegister()
        {
           console.log("send Register Form");
           var r = true;
             
           if (r == true) {
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
                console.log ("sendReserveAppointment  REQUEST :"+ JSON.stringify(json)  );
                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/public_register_professional",json );
                console.log ("RESPONSE:"+JSON.stringify(response_json.data)) ;
                //app = response_json.data[0];
                console.log ("Rows : "+JSON.stringify(response_json.data.rows[0].name )  );
                //if (response_json.data.rows[0] )
               // if (response_json.data.rows[0].name != null )
               // {
                    //display modal 
                    //this.display = true ;
                window.alert("Gracias por su registro, pronto nos contactaremos a su correo");
                window.location.replace("/index.html");
                // this.$emit('showConfirmationModal', response_json.data );
                //}

                }

        },




  },
}
</script>