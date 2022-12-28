<script setup>
import { ref } from 'vue'

</script>

<template>
<div style="background-color:#2f3e44">
  	
    <div  class="d-flex justify-content-between  mt-0 pt-0 text-white"> 

        <div class="m-1">
            <i  @click="show_sub_menu = !show_sub_menu" class="fs-2 bi bi-list "></i>
        </div>

       

        <a HREF="/nested/publicSearch.html" class="text-decoration-none m-2" style="color :#ffffff"> 
            <text class="">123HORA</text>  
        </a>

        <a HREF="/nested/getAppointments.html" class="text-light  text-decoration-none btn-floating m-2 " >
            Recordar mis Horas  
        </a>

    </div>


    <!--------------------
          SUB MENU        
    ---------------------->
    <div v-if="show_sub_menu" style="background-color:#2f3e44"  class="text-white border-top border-dark"> 
        <div class="d-flex justify-content-around">
                <div class="p-2">
                        <a href="/nested/aboutUs.html" class="m-1 text-secondary  text-decoration-none btn-floating "  role="button">
                            &nbsp;&nbsp;<text class="text-decoration-none" style="color: #FFF">123hora ? </text>
                        </a>
                </div>
                    <!--
                    <text class="text-secondary " >|</text>
                    -->
                <div class="p-2">
                        <a HREF="/nested/professionalAccess.html" class=" m-1  text-decoration-none btn-floating "  role="button">
                            &nbsp;&nbsp;<text class=" text-decoration-none" style="color: #FFF">Profesionales</text>
                        </a>
                </div>
                
                    <!--
                    <text class="text-secondary " >|</text>
                    -->
                <div class="p-2">
                        <a HREF="/nested/register.html" class=" text-decoration-none btn-floating m-1"  role="button">
                            &nbsp;&nbsp;<text class="text-decoration-none" style="color: #FFF">Registrate</text>&nbsp;&nbsp;&nbsp;&nbsp;
                        </a>
                </div>
        </div>

     


        
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
        show_sub_menu : false,
        }
  },

 props: [],
 emits: [] , 
      
    computed: {
	},

	watch: {
    },

	methods: {

	},

}
</script>