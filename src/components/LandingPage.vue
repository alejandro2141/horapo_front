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
    <GeneralHeader></GeneralHeader>
    <div id="main-content">
    <LandingContent></LandingContent>
    </div>
    <FooterContent></FooterContent>
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