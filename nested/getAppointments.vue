<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import GeneralHeader from '../src/components/GeneralHeader.vue'
import RecoverAppointmentsForm from '../src/components/RecoverAppointmentsForm.vue'

</script>

<template>
<GeneralHeader></GeneralHeader>
    <div id="app" class="text-center m-4" >     
   
        Ingrese su correo y le enviaremos sus horas ya agendadas. 

        <RecoverAppointmentsForm></RecoverAppointmentsForm>
        <br>

    </div>

</template>


<style scoped>


</style>
