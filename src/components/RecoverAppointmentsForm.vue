<script setup>
import { ref } from 'vue'
import GeneralHeader from './GeneralHeader.vue';
import LandingContent from './LandingContent.vue'
import FooterContent from './FooterContent.vue'
import axios from 'axios';
import { BKND_CONFIG } from '../../config123.js'

defineProps({
  nameTitle : String
})

 
</script>




<template>
    <div class="p-5 m-0 border border-1 p-2 bg-white" id="form" >
        <!--
        <form autocomplete="off">
            Ingrese su correo y le enviaremos sus horas ya agendadas 
            <div class="d-flex justify-content-end"> 
            </div>
        
            <div class="form-row"><div class="form-group">
            
                <label for="inputNames"></label>

                <input  type="text" placeholder="Ej: Email " v-model='user_email' ></div>
            
            </div>
                
            <div class="pt-2 text-center m-2 p-2">
                <a class="btn btn-outline-secondary m-2 p-2" HREF="/index.html" type="button">Regresar</a>
                <button class="btn btn-success m-2 p-2" v-on:click="sendRecoverApp()" type="button">Enviar</button>
            </div>

        </form>    
        -->
        <div class="d-flex justify-content-between p-2"> 
                <text></text>
                <text class="d-flex justify-content-center  m-0 text-secondary" style="font-size: 1.7em" >Recordar mis citas</text>
                <text @click="sendCloseDialog()" class="d-flex justify-content-end "> <i class="h3 bi bi-x-lg text-primary"></i> </text>
        </div>



        <div class="p-3">
          
           <div class="d-flex justify-content-center" >
             <input class="text-center"  style="border-radius: 5px;" type="text" placeholder="ingrese su correo" v-model='user_email' > 
           </div> 
           <!--
            <a class="btn btn-outline-secondary m-2 p-2" HREF="/index.html" type="button">Regresar</a> -->
            <div class="d-flex justify-content-center">
                <button class="btn btn-success m-2 p-2 d-flex justify-content-center" v-on:click="sendRecoverApp()" type="button">Enviar</button>
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
            user_email : null ,
           }   
    },
    
    props: [], 
    emits: ['closeRecoverAppointmentForm'],

    mounted () {   
       },

    computed: {
        },
        
    methods: {

        sendCloseDialog() 
        {
            this.$emit("closeRecoverAppointmentForm","nothing");
        },

        async sendRecoverApp()
        {
               console.log("sendRecoverApp");  
                
               var r =confirm("Si existen citas registradas, las enviaremos a su correo");
               var r = true;
                 
               if (r == true) {
                    const json = { 
                        email : this.user_email,
                                };
                    console.log ("Send Recover Appointments   REQUEST :"+ JSON.stringify(json)  );
                    let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/recover_appointments",json );
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
