<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import GeneralHeader from '../src/components/GeneralHeader.vue'
import RegisterForm from  '../src/components/publicSearch/RegisterForm.vue'

</script>

<template>
<div>
    <GeneralHeader></GeneralHeader>


    <div class="d-flex m-2 justify-content-end"> 
            <a HREF="/index.html" type="button" class=""><i class="display-5 bi bi-x-lg text-primary"></i></a>
    </div>

    <div v-if="true" class="d-flex justify-content-center" >
        <RegisterForm v-on:closeRegisterForm="closeRegisterForm()" ></RegisterForm>
    </div>

    


</div>
</template>


<style scoped>


</style>



<script>
//const showForm = ref(false)


export default {
  data : function() {
    return {
       showKnowMore1 : false ,
       showForm:true ,
    }
  },

  methods: {
    closeRegisterForm()
    {
        window.location.href = "/index.html"
    }
  
},
}
</script>