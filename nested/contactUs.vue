<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import GeneralHeader from '../src/components/GeneralHeader.vue'
import contactUsForm from  '../src/components/publicSearch/contactUsForm.vue'

</script>

<template>
<div>
    <GeneralHeader></GeneralHeader>
      <div v-if="true" class="d-flex justify-content-center" >
        <contactUsForm></contactUsForm> 
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