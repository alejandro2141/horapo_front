<script setup>
import { ref } from 'vue'

</script>

<template>
        <div @click="$emit('appTypeSelected',appType); " :style="{'border-radius': '50%' ,'width': '5.5em', 'height': '5.5em' }"  class="border    p-0 m-2 d-flex justify-content-center align-items-center" :class="{'bg-primary border-4 border-primary': active }" > 
            <div class="m-2">
                <i  class="bi  m-0  display-5 d-flex justify-content-center" :class="{ 'bi-building':appType==0 , 'bi-house-door':appType==1,'bi-camera-video':appType==2 } " :style="{ 'color' : getIconColor(appType) } " ></i>
            <text style="font-size: 0.7em;" :class="{'text-light':active}"> {{icon_name[appType]}}</text>
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
        icon_name : ['En Consulta','A Domicilio','Remota']
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
        getIconColor(val)
        {
            if (this.appTypeCode == this.appType )
            {
                return "#FFF"
            }
            else
            {
                return  this.icon_color[val]
            }
        }
    },

}

</script>