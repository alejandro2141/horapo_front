<script setup>
import { ref } from 'vue'

</script>

<template>
<div v-if="spinner_on" class="spinner  text-center" style="" >
    <img class="mt-5 pt-5" width="150"  src="/public/spinner3_color.gif" >
      
 </div>
</template>



<style scoped>
.spinner {
  
    position: absolute;
    z-index: 9999;
    /*margin : 0 auto; */
    left: 0px;
    top: 0px;
    width : 100% ;
    height : 80% ;
    background-color: rgba(26, 26, 26, 0.4);
}
</style>

<script>
export default {
  data : function() {
    return {
        spinner_on : false , 
          }
  },

    props: ['active_spinner'], 

    watch: {
            active_spinner( newValue, oldValue ) {

                    console.log("Spinner value:"+newValue);

                    if (newValue == true)
                    {
                        console.log("Spinner On");
                        this.spinner_on = true ;
                    }
                    else if (newValue == false)
                    {
                        console.log("Spinner Off");
                        setTimeout( ()=> this.spinner_on = false , 0 )
                        //this.spinner_on = false ;
                    }
                    else{
                        console.log("Spinner Temporal");
                        setTimeout( ()=> this.spinner_on = false , newValue )
                    }


                },
        },


}
</script>



