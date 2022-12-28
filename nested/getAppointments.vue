<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import GeneralHeader from '../src/components/GeneralHeader.vue'
import RecoverAppointmentsForm from '../src/components/RecoverAppointmentsForm.vue'

</script>

<template>
<div>
     
    <!-- <GeneralHeader></GeneralHeader> -->
    
    <div id="app" class="text-center border border-1 p-1 bg-white m-3" style="border-radius: 25px;" >     
    <div class="d-flex justify-content-end" > 
        <a class="m-1 p-1" HREF="/index.html" type="button"> <i class="display-3 bi bi-x-lg"></i></a>
    </div>
        Ingrese su correo y le enviaremos sus horas ya agendadas. 

        <RecoverAppointmentsForm></RecoverAppointmentsForm>
        <br>

    </div>
</div>
</template>


<style scoped>


</style>
