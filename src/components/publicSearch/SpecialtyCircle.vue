<script setup>
import { ref } from 'vue'

</script>

<template>
                <!--
                <div @click="active=!active" :style="{ 'background-color': circleColors[index]   ,'border-radius': '50%' ,'width': '8.0em', 'height': '8.0em' }" class="m-2 border  border-2  d-flex justify-content-center align-items-center" :class="{'border-success': active}" > 
                    <div class="text-center mb-2" style="" >
                        <text class=""> {{specialty.name}}  
                        </text>
                        <br> 
                        
                    </div> 
                </div> 
                -->
                
                <div id="hexagono3" @click="active=!active" :style="{ 'background-color': circleColors[index] }" class=" border  border-2  d-flex justify-content-center align-items-center" :class="{'border-success': true}" > 
                    <div id="hexagono3-1"  class="text-center " :style="{ 'background-color': circleColors[index] }" >
                        <div id="hexagono3-2" :style="{ 'background-color': circleColors[index] }" >
                            <text class="m-4 text-dark"> <br><br>asdfaaasdf
                            </text>
                            <br> 
                        </div>
                    </div> 
                </div> 




</template>

<style scoped>
#hexagono3 {
  height: 15em;
  margin: -4.2em 0; 
  overflow: hidden;
  transform: rotate(120deg);
  visibility: hidden;
  width: 7.5em;
}
#hexagono3-1 {
  height: 100%;
  overflow: hidden;
  transform: rotate(-60deg);
  width: 100%;
}
#hexagono3-2 {
  height: 100%;
  transform: rotate(-60deg); 
  visibility: visible ;
  width: 100%;
}
</style>


<script>
//const showForm = ref(false)

export default {
   data : function() {
        return {
        circleColors: ['#ffda9e','#fdf9c4','#ffffaa','#568281','#BBBBBB','#91B8C1','#FFBFA3','#ffe999','#511F73'],
        active : false
        }
    },  
 
   props: ['specialty','index' ], 
   
mounted() {   
       },

    watch: {
        },

    methods: {
        /*
        suggestedSearch(specialty,type)
        {
            console.log("SuggestedSearch specialty:"+specialty+"  type:"+type)
            const params = { 
			    specialty   : specialty    ,
                type : type  ,
                location    : null  ,
            };

            this.$emit("suggestedSearchCall",params );
        }
        */

    },


}

</script>