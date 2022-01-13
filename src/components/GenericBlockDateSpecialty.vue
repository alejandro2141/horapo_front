<script setup>
import { ref } from 'vue'



</script>

<template>

    <div class="d-flex flex-row border border-2" style="border: 0px solid rgb(168, 168, 168); border-radius: 10px ">
                  
            <div class="m-0 p-2   bg-primary text-white" style=" border: 0px solid rgb(168, 168, 168); border-radius: 10px 0px 0px 10px; width:25%;  " > 
                        <text class="display-5"> 
                            {{ month }}
                        </text>
                        <text class="display-1 d-flex align-items-center justify-content-center"> 
                            {{ day }} 
                        </text>  
            </div>          
            <div  class=" display-5 p-2" style="color:#1f9d94 ;" >
                        <text  >  
                        {{ specialties }}                  
                        </text>                  
            </div> 
                  
    </div>
</template>

<style scoped>
</style>

<script>
export default {
  data : function() {
    return {
          }
  },

    props: ['month' , 'day' , 'specialties'], 

    watch: {
        },

	methods :{

    }


}
</script>
