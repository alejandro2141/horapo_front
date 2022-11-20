<script setup>
import { ref } from 'vue'

</script>

<template>
    <div>

        <!-- TIME START -->
        <div  class="d-flex justify-content-between mt-3">
                          
                          <div class="d-flex justify-content-end">
                              <div @click="show_start_hour=!show_start_hour ; show_start_minutes=false" class="bg-dark p-2">
                                  <text >{{hour}}</text> 
                              </div>
                              <div class="p-2">:</div>
                              <div @click="show_start_minutes=!show_start_minutes" class="bg-dark p-2 ">
                                  <text >{{minutes}}</text>
                              </div>
                              <div class="p-2">hrs</div>
                          </div>
                  </div>

                    <div v-if="show_start_hour" class="text-white">
                      <div class="bg-success text-white border border-1 border-dark">
                        <text class="p-2 h5 ">Seleccione Hora Inicio</text>
                      </div>
                     
                      <table class="table caption-top">
                      
                      <tbody class="border border-dark text-dark  bg-white">
                        <tr class="border border-white">
                          <td @click="selectedHour('00')" class="p-2 border border-dark text-center">00</td>
                          <td @click="start_hour='01'; show_start_hour=false" class="p-2 border border-dark text-center">01</td>
                          <td @click="start_hour='02'; show_start_hour=false" class="p-2 border border-dark text-center">02</td>
                          <td @click="start_hour='03'; show_start_hour=false" class="p-2 border border-dark text-center">03</td>
                          <td @click="start_hour='04'; show_start_hour=false" class="p-2 border border-dark text-center">04</td>
                          <td @click="start_hour='05'; show_start_hour=false" class="p-2 border border-dark text-center">05</td>
                        </tr>
                        <tr>
                          <td @click="start_hour='06'; show_start_hour=false" class=" border border-dark  text-center">06</td>
                          <td @click="start_hour='07'; show_start_hour=false" class=" border border-dark  text-center">07</td>
                          <td @click="start_hour='08'; show_start_hour=false" class=" border border-dark  text-center">08</td>
                          <td @click="start_hour='09'; show_start_hour=false" class=" border border-dark  text-center">09</td>
                          <td @click="start_hour='10'; show_start_hour=false" class=" border border-dark  text-center">10</td>
                          <td @click="start_hour='11'; show_start_hour=false" class=" border border-dark  text-center">11</td>
                        </tr>
                        <tr>
                          <td @click="start_hour='12'; show_start_hour=false" class=" border border-dark  text-center">12</td>
                          <td @click="start_hour='13'; show_start_hour=false" class=" border border-dark  text-center">13</td>
                          <td @click="start_hour='14'; show_start_hour=false" class=" border border-dark  text-center">14</td>
                          <td @click="start_hour='15'; show_start_hour=false" class=" border border-dark  text-center">15</td>
                          <td @click="start_hour='16'; show_start_hour=false" class=" border border-dark  text-center">16</td>
                          <td @click="start_hour='17'; show_start_hour=false" class=" border border-dark  text-center">17</td>
                        </tr>
                        <tr>
                          <td @click="start_hour='18'; show_start_hour=false" class=" border border-dark  text-center">18</td>
                          <td @click="start_hour='19'; show_start_hour=false" class=" border border-dark  text-center">19</td>
                          <td @click="start_hour='20'; show_start_hour=false" class=" border border-dark  text-center">20</td>
                          <td @click="start_hour='21'; show_start_hour=false" class=" border border-dark  text-center">21</td>
                          <td @click="start_hour='22'; show_start_hour=false" class=" border border-dark  text-center">22</td>
                          <td @click="start_hour='23'; show_start_hour=false" class=" border border-dark  text-center">23</td>
                        </tr>
                      </tbody>
                      </table>
                    </div>

                    <div v-if="show_start_minutes" class="text-white">
                      <div class="bg-success text-white border border-1 border-dark">
                        <text class="p-2 h5 ">Seleccione Minutos</text>
                      </div>
                     
                      <table class="table caption-top">
                     
                      <tbody class="border border-dark text-dark bg-white">
                        <tr>
                          <td @click="start_minutes='00'; show_start_minutes=false" class="border border-dark  p-2 text-center">00</td>
                          <td @click="start_minutes='05'; show_start_minutes=false" class="border border-dark  p-2 text-center">05</td>
                          <td @click="start_minutes='10'; show_start_minutes=false" class="border border-dark  p-2 text-center">10</td>
                          <td @click="start_minutes='15'; show_start_minutes=false" class="border border-dark  p-2 text-center">15</td>
                          <td @click="start_minutes='20'; show_start_minutes=false" class="border border-dark  p-2 text-center">20</td>
                          <td @click="start_minutes='25'; show_start_minutes=false" class="border border-dark  p-2 text-center">25</td>
                        </tr>
                        <tr>
                          <td @click="start_minutes='30'; show_start_minutes=false" class="border border-dark  text-center">30</td>
                          <td @click="start_minutes='35'; show_start_minutes=false" class="border border-dark  text-center">35</td>
                          <td @click="start_minutes='40'; show_start_minutes=false" class="border border-dark  text-center">40</td>
                          <td @click="start_minutes='45'; show_start_minutes=false" class="border border-dark  text-center">45</td>
                          <td @click="start_minutes='50'; show_start_minutes=false" class="border border-dark  text-center">50</td>
                          <td @click="start_minutes='55'; show_start_minutes=false" class="border border-dark  text-center">55</td>
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
            hour: null ,
            minutes : null  ,
            
        }   
    },
   	
	props: ['set_hour','set_minutes'],
    emits: ['selected_hour','selected_minutes'],

	created () {
        
	},

	methods :{
        selectedHour(val)
        {
        show_start_hour=false
        $this.emit('selected_hour', val)
        }
    },

    watch : {
        set_hour(val)
        {
        this.hour=val
        },
        set_minutes(val)
        {
        this.minutes = val
        }
    }
}
</script>

