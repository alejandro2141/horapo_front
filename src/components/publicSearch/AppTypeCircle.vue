<script setup>
import { ref } from 'vue'

</script>

<template>
        <div @click="checkButton(appType)" :style="{'border-radius': '50%' ,'width': '6.5em', 'height': '6.5em' }"  class="border    p-1 m-2 d-flex justify-content-center align-items-center" :class="{'border-5 border-primary': active }" > 
            <div class="m-2">
                <i  class="bi  m-0  display-4 d-flex justify-content-center" :class="{ 'bi-building':appType==0 , 'bi-house-door':appType==1,'bi-camera-video':appType==2 } " :style="{ 'color' : getIconColor(appType) } " ></i>
            <text style="font-size: 0.9em;" :style="{ 'color' : getIconColor(appType) } "  > {{icon_name[appType]}}</text>
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
        active : false ,
        icon: ['bi-building','bi-house-door','bi-camera-video'],
        icon_color : ['#781ED1','#3399FF','#b36b00'],
        icon_name : ['Consulta','Domicilio','Remota']
        }
    },  
 
   props: ['appType', 'appTypeCode' ], 
   emits: [ 'appTypeSelected' ],
    
mounted() {   
       },

    watch: {
        appTypeCode(val)
            {
                if (val == this.appType )
                {
                    this.active = true
                }
                else
                {
                    this.active = false
                }
            } 

        },

    methods: {
        checkButton(val)
        {
          if (this.active)
          {
          this.$emit('appTypeSelected',null); 
          this.active = false  
          }  
          else 
          {
          this.$emit('appTypeSelected',val); 
          
          }
        },

        getIconColor(val)
        {
            if (this.appTypeCode == this.appType )
            {
                return  this.icon_color[val]
            }
            else
            {
                return  this.icon_color[val]
            }
        }
    },

}

</script>