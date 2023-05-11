<script setup>

import GeneralHeader from '../src/components/GeneralHeader.vue'
import axios from 'axios'
import { BKND_CONFIG } from '../config123.js'

</script>

<template>
<div>
    <GeneralHeader></GeneralHeader>
    <div v-if="req_act!=null" id="app" class="text-center p-5 " >     

        <div v-if="req_act == 'ca' ">
            <h3>Cita cancelada con exito</h3> Esta hora quedará disponible para otros usuarios. <br> <br> <h3>Gracias</h3>
        </div>
        
        <div v-if="req_act == 'co' ">
            <h3>Gracias por su confirmación</h3>Notificaremos su asistencia al profesional que le atenderá.<br> <br> <h3>Gracias</h3>
        </div>
        
         <br>
    
        <div class="mt-4 pt-4">
        
        <hr>
            <a HREF="/index.html" type="button" class="btn btn-outline-secondary">Regresar</a>
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
        req_params:null,
        req_date:null,
        req_id:null,
        req_center_id:null,
        req_patient_doc_id:null,
        req_act:null,

        action_message: "No Set",
        
        }
  },

   props: ['session_data'],
   emits: [],

    beforeCreate(){
      
    },
    activated(){
      
    },
   mounted () {    
    /*  
    1.- date=112233
    2.- id=2306 
    3.- center_id=208 
    4.- patient_doc_id=123123 
    5.- act=co
    */
        let uri = window.location.search.substring(1); 
        let params = new URLSearchParams(uri);
        this.req_params = params.get("params")
        let auxparams =  this.req_params.split("_")
        this.req_date=auxparams[0]
        this.req_id=auxparams[1]
        this.req_center_id=auxparams[2]
        this.req_patient_doc_id=auxparams[3]
        this.req_act=auxparams[4]
        
        console.log("URL INPUT PARAMS : "+JSON.stringify(auxparams) )
        console.log("confirmAPP.vue   : "+JSON.stringify(BKND_CONFIG) )

        if (this.req_act == "co")
        {
            this.confirmApp( this.req_date, this.req_id, this.req_center_id,this.req_patient_doc_id)
            this.action_message = "Confirmar"
        }
        if (this.req_act == "ca")
        {
            this.cancelApp( this.req_date, this.req_id, this.req_center_id,this.req_patient_doc_id)
            this.action_message = "Cancelar"
        }

    
       },

    beforeUpdate(){
        },

    updated()
        {
        },

    watch: {
        },

    methods: {

        async cancelApp( req_date, req_id, req_center_id, req_patient_doc_id)
            {
                const json_request = { 
                    req_date : req_date,
                    req_id  : req_id,
                    req_center_id :  req_center_id,
                    req_patient_doc_id : req_patient_doc_id,
                    date_time: Date.now(),
                        };

                console.log("cancelApp REQUEST:"+JSON.stringify(json_request))
                let response = await axios.post(this.BKND_CONFIG.BKND_HOST+"/public_cancel_app",json_request);
                console.log("cancelApp RESPONSE :"+JSON.stringify(response.data) )   
                this.appointments = response.data.appointments     
            },
        
        async confirmApp( req_date, req_id, req_center_id, req_patient_doc_id)
            {
                let aux_date =  new Date()
                const json_request = { 
                    req_date : req_date,
                    req_id  : req_id,
                    req_center_id :  req_center_id,
                    req_patient_doc_id : req_patient_doc_id,
                    date_time: aux_date.toISOString() ,
                        };

                console.log("confirmAPP REQUEST:"+JSON.stringify(json_request))
                let response = await axios.post(this.BKND_CONFIG.BKND_HOST+"/public_confirm_app",json_request);
                console.log("confirmAPP RESPONSE :"+JSON.stringify(response.data) )   
                this.appointments = response.data.appointments     
            },

            
        },
  
    watch : {
    }



}

</script>


