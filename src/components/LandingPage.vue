<script setup>
import { ref } from 'vue'
import GeneralHeader from './GeneralHeader.vue';
import LandingContent from './LandingContent.vue'
import FooterContent from './FooterContent.vue'


 // window.location.href = "/nested/publicSearch.html";

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
        <div v-if="isMobile()">
            Being redirected based in Browser options<br>
            DDOS filter protection
        </div>
        
        <div v-else>
            Lo sentimos. Por el momento solo disponible en Navegadores Mobiles. 
        </div>
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

methods: {

    isMobile(){
        // credit to Timothy Huang for this regex test: 
        // https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){          
            window.location.href = "/nested/publicSearch.html";
            return true
       }
       else{
            return false
       }
    }
    
    } 


}

</script>