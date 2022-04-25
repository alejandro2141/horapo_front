<script setup>
import { ref } from 'vue'
import GeneralHeader from './GeneralHeader.vue';
import LandingContent from './LandingContent.vue'
import FooterContent from './FooterContent.vue'


  window.location.href = "/nested/publicSearch.html";

</script>

<template>
<!--
    <GeneralHeader></GeneralHeader>
    <div id="main-content">
    <LandingContent></LandingContent>
    </div>
    <FooterContent></FooterContent>
    -->
    <div>
Being redirected based in Browser options<br>
DDOS filter protection
    </div>
</template>

<style scoped>
/*
body {
 background-image : url(assets/images/background_patient.JPG); height: 100%; width: 100%; border: 0px solid black
}
*/
</style>

<script>

export default {
 data : function() {
        return {  
        }
    },  
    props: [], 
    emits: [],

beforeCreate(){
    console.log("Landing P , performance start,"+Date.now());
},

mounted() {
   console.log("Landing P , performance end,"+Date.now());
},


}

</script>