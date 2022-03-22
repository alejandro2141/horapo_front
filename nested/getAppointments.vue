<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import GeneralHeader from '../src/components/GeneralHeader.vue'
import RecoverAppointmentsForm from '../src/components/RecoverAppointmentsForm.vue'

</script>

<template>
<div>
    <GeneralHeader></GeneralHeader>
    <div id="app" class="text-center p-4 bg-light" >     
   
        Ingrese su correo y le enviaremos sus horas ya agendadas. 

        <RecoverAppointmentsForm></RecoverAppointmentsForm>
        <br>

    </div>
</div>
</template>


<style scoped>


</style>
