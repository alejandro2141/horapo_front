<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import GeneralHeader from '../src/components/GeneralHeader.vue'
import RecoverAppointmentsForm from '../src/components/RecoverAppointmentsForm.vue'

</script>

<template>
<div class="d-flex justify-content-center"  >
      
   <!--  <GeneralHeader></GeneralHeader>  -->
    
    <div id="app" class=" p-3 bg-white m-3" style="border-radius: 25px; width:35em" >     
        <div class="d-flex justify-content-end" > 
            <a class="m-1 p-1" HREF="/index.html" type="button"> <i class="display-5 bi bi-x-lg"></i></a>
        </div>
      
        <RecoverAppointmentsForm></RecoverAppointmentsForm>
        <br>

    </div>
</div>
</template>


<style scoped>


</style>


