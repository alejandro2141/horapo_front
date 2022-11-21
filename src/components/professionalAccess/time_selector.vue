<script setup>
import { ref } from 'vue'

</script>

<template>
    <div>

        <!-- TIME START -->
                  <!--
                   <div  class="d-flex flex-row-reverse">
                          
                          <div class="d-flex justify-content-end">
                              <div @click="show_hour=!show_hour ; show_minutes=false" class="bg-dark p-2">
                                  <text >{{hour_set}}</text> 
                              </div>
                              <div class="p-2">:</div>
                              <div @click="show_minutes=!show_minutes; show_hour=false" class="bg-dark p-2 ">
                                  <text >{{minutes_set}}</text>
                              </div>
                              <div class="p-2">hrs</div>
                          </div>
                  </div>
                  -->

                    <div v-if="show_hour" class="text-white">
                      <div class="bg-success text-white border border-1 border-dark">
                        <text class="p-2 h5 ">Seleccione Hora Inicio</text>
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

                    <div v-if="show_minutes" class="text-white">
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
            hour_set: '---' ,
            minutes_set : '---'  ,

            show_hour : false  ,
            show_minutes : false ,    
        }   
    },
   	
	props: ['hour','minutes'],
  emits: ['selected_hour','selected_minutes'],

	created () {
    this.hour_set = this.hour 
    this.minutes_set = this.minutes
	},

	methods :{
        selectedHour(val)
        {
        this.hour_set = val
        this.show_hour = false 
        $this.emit('selected_hour', val)
        },

        selectedMinutes(val)
        {
        this.minutes_set = val
        this.show_minutes = false 
        $this.emit('selected_minutes', val)
        }
    },

    watch : {
        hour(val)
        {
        this.hour_set=val
        },
        minutes(val)
        {
        this.minutes_set = val
        }
    }
}
</script>

