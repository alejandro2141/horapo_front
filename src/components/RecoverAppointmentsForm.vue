<script setup>
import { ref } from 'vue'
import GeneralHeader from './GeneralHeader.vue';
import LandingContent from './LandingContent.vue'
import FooterContent from './FooterContent.vue'


defineProps({
  nameTitle : String
})

const count = ref(0)
</script>

<template>
   
        <div id="form" class=" p-0">
            <form autocomplete="off">
                    <div class="form-row">
            
                        <div class="form-group col-md-6">
                            <label for="inputNames"></label>
                            <i class="bi bi-mailbox h1"></i> <input type="text" class="form-control" id="inputNames" placeholder="Ej: Email " v-model="email">
                        </div>
                       
                    </div>
                    
                    <div class="pt-2 text-center m-2 p-2">
                     <a  HREF="/index.html" type="button" class="btn btn-outline-secondary m-2 p-2 ">Regresar</a>
                     <button  v-on:click="sendRecoverApp()" type="button" class="btn btn-success m-2 p-2 ">Enviar</button>
                   </div>

            </form>
        </div>


</template>

<style scoped>
body {

 background-image : url(assets/images/background_patient.JPG); height: 100%; width: 100%; border: 0px solid black

}
</style>
