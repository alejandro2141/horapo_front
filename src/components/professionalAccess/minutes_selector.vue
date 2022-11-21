<script setup>
import { ref } from 'vue'

</script>

<template>
    <div>

                    <div  class="text-white">
                      <div class="bg-success text-white border border-1 border-dark">
                        <text class="p-2 h5 ">Seleccione Minutos</text>
                      </div>
                     
                      <table class="table caption-top">
                     
                      <tbody class="border border-dark text-dark bg-white">
                        <tr>
                          <td @click="selectedMinutes('00')" class="border border-dark  p-2 text-center">00</td>
                          <td @click="selectedMinutes('05')" class="border border-dark  p-2 text-center">05</td>
                          <td @click="selectedMinutes('10')" class="border border-dark  p-2 text-center">10</td>
                          <td @click="selectedMinutes('15')" class="border border-dark  p-2 text-center">15</td>
                          <td @click="selectedMinutes('20')" class="border border-dark  p-2 text-center">20</td>
                          <td @click="selectedMinutes('25')" class="border border-dark  p-2 text-center">25</td>
                        </tr>
                        <tr>
                          <td @click="selectedMinutes('30')" class="border border-dark  text-center">30</td>
                          <td @click="selectedMinutes('35')" class="border border-dark  text-center">35</td>
                          <td @click="selectedMinutes('40')" class="border border-dark  text-center">40</td>
                          <td @click="selectedMinutes('45')" class="border border-dark  text-center">45</td>
                          <td @click="selectedMinutes('50')" class="border border-dark  text-center">50</td>
                          <td @click="selectedMinutes('55')" class="border border-dark  text-center">55</td>
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
            minutes_set : '---'  ,
            }   
    },
   	
	props: ['minutes'],
  emits: ['selected_minutes'],

	created () {
     this.minutes_set = this.minutes
	},

	methods :{
        selectedMinutes(val)
        {
        this.minutes_set = val
        this.$emit('selected_minutes', val)
        }
    },

    watch : {
      
        minutes(val)
        {
        this.minutes_set = val
        }
    }
}
</script>

