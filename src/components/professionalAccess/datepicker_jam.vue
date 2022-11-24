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
                    <!--
                        day_number :  d.getDate(),
                        day_name : day_names[d.getDay()] ,
                        month : month_names[d.getMonth()] ,
                        reserved : nfound.length , 
                    -->

                <tr>
                    <td  v-for="day in week1" :key="day" colspan="2" class="table-active text-white"><text class="h5">{{day.day_number}}</text><br><small>9</small></td>                      
                    
                </tr>
                
                           

            </tbody>
        </table>      
          
    </div>   
   week1:{{week1}}

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
        week1 : [] ,
        week2 : [] ,
        week3 : [] ,
        week4 : [] ,
        week5 : [] ,
        week5 : [] ,      
            }   
    },
   	
//	props: ['session_params', 'daterequired','forceUpdateCalendarSummary'],
    props: ['month_summary','forceUpdateCalendar'],
    emits: [],

	created () {
        this.updateCalendar()
        
        },

	methods :{
            updateCalendar()
            {
                if(this.month_summary !=null )
                {
                   this.week1 = this.month_summary.slice(0,6)
                   this.week2 = this.month_summary.slice(7,13)
                }

            }

           },

    watch: {
              
        forceUpdateCalendar(new_date) 
        { 
            this.updateCalendar()
        }

    }
}
</script>

