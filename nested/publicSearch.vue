<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import GeneralHeader from '../src/components/GeneralHeader.vue'
import SearchAppointment from '../src/components/publicSearch/SearchAppointment.vue'

</script>

<template>


<GeneralHeader></GeneralHeader>
    <div id="app" class="text-center m-4" >     
        PUBLIC SEARCH     
        <SearchAppointment></SearchAppointment>
    </div>

</template>


<style scoped>


</style>
