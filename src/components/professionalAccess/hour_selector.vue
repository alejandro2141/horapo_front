<script setup>
import { ref } from 'vue'

</script>

<template>
    <div>

                    <div  class="text-white">
                      <div class="bg-success text-white border border-1 border-dark">
                        <text class="p-2 h5 ">Seleccione Hora</text>
                      </div>
                     
                      <table class="table caption-top">
                      
                      <tbody class="border border-dark text-dark  bg-white">
                        <tr class="border border-white">
                          <td @click="selectedHour('00')" class="p-2 border border-dark text-center">00</td>
                          <td @click="selectedHour('01')" class="p-2 border border-dark text-center">01</td>
                          <td @click="selectedHour('02')" class="p-2 border border-dark text-center">02</td>
                          <td @click="selectedHour('03')" class="p-2 border border-dark text-center">03</td>
                          <td @click="selectedHour('04')" class="p-2 border border-dark text-center">04</td>
                          <td @click="selectedHour('05')" class="p-2 border border-dark text-center">05</td>
                        </tr>
                        <tr>
                          <td @click="selectedHour('06')" class=" border border-dark  text-center">06</td>
                          <td @click="selectedHour('07')" class=" border border-dark  text-center">07</td>
                          <td @click="selectedHour('08')" class=" border border-dark  text-center">08</td>
                          <td @click="selectedHour('09')" class=" border border-dark  text-center">09</td>
                          <td @click="selectedHour('10')" class=" border border-dark  text-center">10</td>
                          <td @click="selectedHour('11')" class=" border border-dark  text-center">11</td>
                        </tr>
                        <tr>
                          <td @click="selectedHour('12')" class=" border border-dark  text-center">12</td>
                          <td @click="selectedHour('13')" class=" border border-dark  text-center">13</td>
                          <td @click="selectedHour('14')" class=" border border-dark  text-center">14</td>
                          <td @click="selectedHour('15')" class=" border border-dark  text-center">15</td>
                          <td @click="selectedHour('16')" class=" border border-dark  text-center">16</td>
                          <td @click="selectedHour('17')" class=" border border-dark  text-center">17</td>
                        </tr>
                        <tr>
                          <td @click="selectedHour('18')" class=" border border-dark  text-center">18</td>
                          <td @click="selectedHour('19')" class=" border border-dark  text-center">19</td>
                          <td @click="selectedHour('20')" class=" border border-dark  text-center">20</td>
                          <td @click="selectedHour('21')" class=" border border-dark  text-center">21</td>
                          <td @click="selectedHour('22')" class=" border border-dark  text-center">22</td>
                          <td @click="selectedHour('23')" class=" border border-dark  text-center">23</td>
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
            hour_set: '---' ,
        }   
    },
   	
	props: ['hour'] ,
    emits: ['selected_hour'],

	created () {
        this.hour_set = this.hour 
	},

	methods :{
        selectedHour(val)
        {
        this.hour_set = val
        this.$emit('selected_hour', val)
        },
  
    },

    watch : {
        hour(val)
        {
        this.hour_set=val
        },
       
    }
}
</script>

