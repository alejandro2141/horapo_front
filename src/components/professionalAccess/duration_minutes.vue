<script setup>
import { ref } from 'vue'

</script>

<template>
    <div>
            <div class="">
                    <div class="bg-success text-white border border-1 border-dark">
                      <text>Seleccione tiempo de atención</text>
                    </div> 
                     <table class="table caption-top bg-white text-dark">
                     
                      <tbody class="border border-1 border-dark ">
                        <tr>
                          <td @click="selectedAppMinutesDuration('00')" class="border border-dark  p-2 text-center">00</td>
                          <td @click="selectedAppMinutesDuration('05')" class="border border-dark  p-2 text-center">05</td>
                          <td @click="selectedAppMinutesDuration('10')" class="border border-dark  p-2 text-center">10</td>
                          <td @click="selectedAppMinutesDuration('15')" class="border border-dark  p-2 text-center">15</td>
                          <td @click="selectedAppMinutesDuration('20')" class="border border-dark  p-2 text-center">20</td>
                          <td @click="selectedAppMinutesDuration('25')" class="border border-dark  p-2 text-center">25</td>
                        </tr>
                        <tr>
                          <td @click="selectedAppMinutesDuration('30')" class="border border-dark  text-center">30</td>
                          <td @click="selectedAppMinutesDuration('35')" class="border border-dark  text-center">35</td>
                          <td @click="selectedAppMinutesDuration('40')" class="border border-dark  text-center">40</td>
                          <td @click="selectedAppMinutesDuration('45')" class="border border-dark  text-center">45</td>
                          <td @click="selectedAppMinutesDuration('50')" class="border border-dark  text-center">50</td>
                          <td @click="selectedAppMinutesDuration('55')" class="border border-dark  text-center">55</td>
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
            app_duration: '---' ,
        }   
    },
   	
	props: ['minutes'] ,
    emits: ['selected_app_duration'],

	created () {
        this.app_duration = this.minutes 
	},

	methods :{
        selectedAppMinutesDuration(val)
        {
        this.app_duration = val
        this.$emit('selected_app_duration', val)
        },
  
    },

    watch : {      
    }
}
</script>

