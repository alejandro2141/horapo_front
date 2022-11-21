<script setup>
import { ref } from 'vue'

</script>

<template>
    <div>
            <div  class="test-dark bg-white  border-dark">
                    <div class="text-white bg-success">  
                        <text class="p-2">Entre Citas Tiempo duracion Minutos</text>
                    </div>
                    
                    <table class="table caption-top">
                     
                      <tbody class="border border-white text-dark">
                        <tr>
                          <td @click="selectedTimeBtw('00')" class="border border-dark  p-2 text-center">00</td>
                          <td @click="selectedTimeBtw('05')" class="border border-dark  p-2 text-center">05</td>
                          <td @click="selectedTimeBtw('10')" class="border border-dark  p-2 text-center">10</td>
                          <td @click="selectedTimeBtw('15')" class="border border-dark  p-2 text-center">15</td>
                          <td @click="selectedTimeBtw('20')" class="border border-dark  p-2 text-center">20</td>
                          <td @click="selectedTimeBtw('25')" class="border border-dark  p-2 text-center">25</td>
                        </tr>
                        <tr>
                          <td @click="selectedTimeBtw('30')" class="border border-dark  text-center">30</td>
                          <td @click="selectedTimeBtw('35')" class="border border-dark  text-center">35</td>
                          <td @click="selectedTimeBtw('40')" class="border border-dark  text-center">40</td>
                          <td @click="selectedTimeBtw('45')" class="border border-dark  text-center">45</td>
                          <td @click="selectedTimeBtw('50')" class="border border-dark  text-center">50</td>
                          <td @click="selectedTimeBtw('55')" class="border border-dark  text-center">55</td>
                        </tr>
                      </tbody>
                      </table>
                </div>
    </div>
</template>

<style scoped>


</style>


<script>

export default {
   data : function() {
        return {
            app_duration_btw: '---' ,
        }   
    },
   	
	props: ['minutes'] ,
    emits: ['selected_app_duration_btw'],

	created () {
        this.app_duration_btw = this.minutes 
	},

	methods :{
        selectedTimeBtw(val)
        {
        this.app_duration_btw = val
        this.$emit('selected_app_duration_btw', val)
        },
  
    },

    watch : {      
    }
}
</script>

