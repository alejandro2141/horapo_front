<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
<div>

    <div>
        <CalendarSummary :session_params="session_params" :forceUpdateCalendarSummary="forceUpdateCalendarSummary" :daterequired="daterequired" />
    </div>

   
    <div class="bg-primary bg-opacity-75 m-3 " style="border-radius: 15px;" >
          <div>
                <p class="mt-2"> NOVIEMBRE 2022  </p> 
            </div>
        <table class="table table-bordered">
           
            <tbody>
                 <tr>
                    <td colspan="2" class="table-active text-white">L</td>
                    <td colspan="2" class="table-active text-white">M</td>
                    <td colspan="2" class="table-active text-white">Mi</td>
                    <td colspan="2" class="table-active text-white">J</td>
                    <td colspan="2" class="table-active text-white">V</td>
                    <td colspan="2" class="table-active text-white">S</td>
                    <td colspan="2" class="table-active text-white">D</td>
                </tr>
                <tr>
                    <td colspan="2" class="table-active text-white"><text class="h5">22</text><br><small>9</small></td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                </tr>
                 <tr>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                </tr>
                 <tr>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                </tr>
                                 <tr>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                </tr>
                 <tr>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
                    <td colspan="2" class="table-active text-white">22<br>9</td>
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
        cdate : null ,
        month_summary : [],
        week1 : new Array(6),
        week2 : new Array(6),
        week3 : new Array(6),
        week4 : new Array(6),
        week5 : new Array(6),
       
            }   
    },
   	
//	props: ['session_params', 'daterequired','forceUpdateCalendarSummary'],
    props: ['month_summary'],
    emits: [],

	created () {
       
        },

	methods :{
           },

    watch: {
              
        forceUpdateCalendarSummary(new_date) 
        { 

        }

    }
}
</script>

