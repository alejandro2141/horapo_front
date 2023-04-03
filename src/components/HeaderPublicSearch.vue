<script setup>
import { ref } from 'vue'

</script>

<template>
<div >
    <!-- style="background-color:#2f3e44"--> 
  	
    <div  class="d-flex justify-content-center  mt-0 pt-0 text-secondary"> 

        
        <div class="m-0 p-0">
            <!-- 
            <i  @click="show_sub_menu = !show_sub_menu" class="fs-2 bi bi-list text-secondary"></i>
            -->
            <text class="" @click="show_sub_menu = !show_sub_menu" style="font-size: 1em ; margin-left: 1em;"> menu </text>
            
        </div>
 

        <div class="m-0 p-0 text-secondary mt-3 text-center">
            <text class="m-5 p-4" style="font-size: 1.4em" >horapo</text> <br>
            <!--  <text class="m-0 p-0" style="font-size: 0.8em">Mejores consultas un solo lugar</text>
            -->
        </div>
        
            <!--
            <a HREF="/nested/publicSearch.html" class="text-decoration-none m-2" style="color :#ffffff"> 
                <text class="">horapo</text>  
            </a>
            -->
     

        <div class="m-0 p-0">
            <a HREF="/nested/getAppointments.html" class="text-decoration-none btn-floating  text-secondary" >
            <text style="font-size: 1em; margin-right: 1em; ">citas</text>
            </a>
        </div>

    </div>


    <!--------------------
          SUB MENU        
    ---------------------->
    <div v-if="show_sub_menu"   class="text-dark bg-white  p-2"  style="position: absolute; top: 3em; left: 0; z-index: 9;  border-bottom-left-radius: 10px 10px;border-radius: 15px;"> 
       
                <div class="p-4 ">
                        <a href="/nested/aboutUs.html" class="m-1 text-decoration-none btn-floating "  role="button">
                            &nbsp;&nbsp;<text class="text-decoration-none text-secondary" >¿horapo? </text>
                        </a>
                </div>
                    <!--
                    <text class="text-secondary " >|</text>
                    -->
                <div class="p-4">
                        <a HREF="/nested/professionalAccess.html" class=" m-1  text-decoration-none btn-floating "  role="button">
                            &nbsp;&nbsp;<text class=" text-decoration-none text-secondary" >Acceso Profesionales</text>
                        </a>
                </div>
                
                    <!--
                    <text class="text-secondary " >|</text>
                    -->
                <div class="p-4">
                        <a HREF="/nested/register.html" class=" text-decoration-none btn-floating m-1"  role="button">
                            &nbsp;&nbsp;<text class="text-decoration-none text-secondary" >Regístrate</text>&nbsp;&nbsp;&nbsp;&nbsp;
                        </a>
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