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
    <LandingContent></LandingContent>
    <FooterContent></FooterContent>
</template>

<style scoped>
body {

 background-image : url(assets/images/background_patient.JPG); height: 100%; width: 100%; border: 0px solid black

}
</style>
