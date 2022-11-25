<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
<div>
   
    <div class=" m-1  border border-1 border-dark" style="border-radius: 15px;" >
          <div>
                <p class="mt-2"> NOVIEMBRE 2022  </p> 
            </div>
        <table class="bg-white table " style="border-radius: 15px;" >
           
            <tbody>
                 <tr>
                    <td colspan="2" class="">L</td>
                    <td colspan="2" class="">M</td>
                    <td colspan="2" class="">Mi</td>
                    <td colspan="2" class="">J</td>
                    <td colspan="2" class="">V</td>
                    <td colspan="2" class="">S</td>
                    <td colspan="2" class="">D</td>
                </tr>
                    <!--
                        day_number :  d.getDate(),
                        day_name : day_names[d.getDay()] ,
                        month : month_names[d.getMonth()] ,
                        reserved : nfound.length , 
                    -->

                <tr v-if="week1!=null" >
                    <td  v-for="day in week1" :key="day" colspan="2" class="" @click="dayPicked(day.date)"><text > <text class="h3">{{day.date.getDate()}}</text><br><small class="text-muted">{{day.reserved}}</small></text></td>                      
                </tr>
                <tr v-if="week2!=null" >
                    <td  v-for="day in week2" :key="day" colspan="2" class="" @click="dayPicked(day.date)"><text > <text class="h3">{{day.date.getDate()}}</text><br><small class="text-muted">{{day.reserved}}</small></text></td>                      
                </tr>
                <tr v-if="week3!=null" >
                    <td  v-for="day in week3" :key="day" colspan="2" class="" @click="dayPicked(day.date)"><text > <text class="h3">{{day.date.getDate()}}</text><br><small class="text-muted">{{day.reserved}}</small></text></td>                      
                </tr>
                <tr v-if="week4!=null" >
                    <td  v-for="day in week4" :key="day" colspan="2" class="" @click="dayPicked(day.date)"><text > <text class="h5">{{day.date.getDate()}}</text><br><small>{{day.reserved}}</small></text></td>                      
                </tr>
                <tr v-if="week5!=null" >
                    <td  v-for="day in week5" :key="day" colspan="2" class="" @click="dayPicked(day.date)"><text > <text class="h5">{{day.date.getDate()}}</text><br><small>{{day.reserved}}</small></text></td>                      
                </tr>
                <tr v-if="week6!=null" >
                    <td  v-for="day in week6" :key="day" colspan="2" class=""  @click="dayPicked(day.date)"><text> <text class="h5">{{day.date.getDate()}}</text><br><small>{{day.reserved}}</small></text></td>                      
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
       
        week1 : [] ,
        week2 : [] ,
        week3 : [] ,
        week4 : [] ,
        week5 : [] ,
        week5 : [] ,     
        week6 : [] ,   

            
        day_names : ['D','L','M','Mi','J','V','S'] ,
        month_names : ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']
           
            }   
    },
   	
    props: ['month_summary','forceUpdateCalendar'],
    emits: ['selectedDate'],

	created () {
        this.updateCalendar()
        
        },

	methods :{
            dayPicked(day)
            {
                console.log("dayPicker:"+day)
                this.$emit('selectedDate', day ) ;
            },
            updateCalendar()
            {
                if(this.month_summary !=null )
                {
                   this.week1 = this.month_summary.slice(0,7)
                   this.week2 = this.month_summary.slice(7,14)
                   this.week3 = this.month_summary.slice(14,21)
                   this.week4 = this.month_summary.slice(21,28)
                   this.week5 = this.month_summary.slice(28,35)
                   this.week6 = this.month_summary.slice(35,42)
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

