<script setup>
import { ref } from 'vue'
import axios from 'axios';

defineProps({
  nameTitle : String
})

 
</script>




<template>
<div class="w-100 ">
    <div class="m-0 border border-1 bg-white  " id="form" style="border-radius: 15px;" >
     
        <div class="p-5">
           
            <div class="d-flex justify-content-between p-4"> 
                <text></text>
                <text class="d-flex justify-content-center  m-0 h5 ">Compartir</text>
                <text @click="sendCloseDialog()" class="d-flex justify-content-end "> <i class="h3 bi bi-x-lg text-primary"></i> </text>
            </div>

            <div class="d-flex justify-content-center " style="font-size:3em;">
                
                <a target="_blank" href="whatsapp://send?text=Visita%20HoraPO%2C%20Las%20mejores%20consultas%20de%20salud%20en%20un%20solo%20lugar%20https://www.horapo.com/">  <i class="text-success bi bi-whatsapp   m-3 p-3"></i> </a>
           
                <a target="_blank" href="http://www.facebook.com/share.php?u=https://www.horapo.com/&title=En%20HoraPO%20puedes%20buscar%20horas%20de%20salud.%20Los%20mejores%20profesionales%20de%20salud%20en%20un%20solo%20lugar">  <i class=" bi bi-facebook m-3 p-3"></i> </a>

                <a target="_blank" href="https://twitter.com/share?url=https://www.horapo.com/&text=En%20HoraPO%20puedes%20buscar%20horas%20de%20salud.%20Los%20mejores%20profesionales%20de%20salud%20en%20un%20solo%20lugar">  <i class="  bi bi-twitter m-3 p-3" ></i> </a>
                <!--
                <a target="_blank" href="https://www.pinterest.com/pin/find/?url=https://www.horapo.com/">  <i class="display-4  bi bi-pinterest m-3"></i>  </a>
                <a href="mailto:correodestinatario@correo.com?subject=HoraPO.%20Las%20mejores%20profesionales%20de%20salud%20en%20un%20solo%20lugar&body=Email%20Body%20Text">asdfasdf<i class="bi bi-envelope-fill display-4  m-2"></i></a>
                -->
            </div> 
        
        <!--
            <a class="btn btn-outline-secondary m-2 p-2" HREF="/index.html" type="button">Regresar</a> 
        -->
        <!--
            <div class="d-flex justify-content-center">
                <button class="btn btn-success m-2 p-2 d-flex justify-content-center" v-on:click="sendRecoverApp()" type="button">Enviar</button>
            </div>
        -->
        
        <br>
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
    emits: ['closePublicShareSite'  ],

    mounted () {   
       },

    computed: {
        },
        
    methods: {

        sendCloseDialog() 
        {
            this.$emit("closePublicShareSite","nothing");
        }

        /*
            async sendRecoverApp()
            {
               console.log("sendRecoverApp");  
                
               var r =confirm("¿ Enviar las citas a su Email Registrado ?");
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
            */

        },

}
</script>
