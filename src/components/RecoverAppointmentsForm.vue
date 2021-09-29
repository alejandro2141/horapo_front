<script setup>
import { ref } from 'vue'
import GeneralHeader from './GeneralHeader.vue';
import LandingContent from './LandingContent.vue'
import FooterContent from './FooterContent.vue'
import axios from 'axios';

defineProps({
  nameTitle : String
})

 
</script>




<template>
<div class="p-0" id="form"><form autocomplete="off">
    
    <div class="form-row"><div class="form-group col-md-6">
        <label for="inputNames"></label>

        <input  type="text" placeholder="Ej: Email " v-model='user_email' ></div></div>
        
        <div class="pt-2 text-center m-2 p-2"><a class="btn btn-outline-secondary m-2 p-2" HREF="/index.html" type="button">Regresar</a>
        
        <button class="btn btn-success m-2 p-2" v-on:click="sendRecoverApp()" type="button">Enviar</button>
        </div>
        </form>
        {{ user_email }}
        </div>

</template>

<style scoped>
body {

 background-image : url(assets/images/background_patient.JPG); height: 100%; width: 100%; border: 0px solid black

}
</style>


<script>

export default {
    data : function() {
        return {
            user_email : null ,
           }   
    },
    
    mounted () {   
       },

    computed: {
        },
        
    methods: {

            async sendRecoverApp()
            {
               console.log("sendRecoverApp");  
                
               // var r =confirm("Continuar con la Reservar esta cita?");
               var r = true;
                 
               if (r == true) {
                    const json = { 
                        email : this.user_email,
                                };
                    console.log ("Send Recover Appointments   REQUEST :"+ JSON.stringify(json)  );
                    let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/recover_appointments",json );
                    console.log ("Send Recover Appointments RESPONSE:"+JSON.stringify(response_json.data)) ;
                    window.alert("Las citas registradas seran enviadas a su correo");
                    window.location.replace("/index.html");
                    }
                //location.href = "professional_view_appointments_agenda.html?"+this.getUrlParam() ;
                //location.reload();
            },

        },

}
</script>
