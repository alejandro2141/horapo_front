<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
<div>
   
    <div class=" m-3  border border-3 bg-white bg-opacity-75 text-secondary" style="border-radius: 15px; background-color:#eee " >
           <div class="display-5">
                <small><small>
                    
                    <div class="d-flex justify-content-around">
                        <text class="pt-2 mb-0" @click="prevMonth(month_summary[15].date)" > <i class="display-1 text-primary bi bi-caret-left "></i>       </text>  
                        <text class="pt-3 mb-0" >  {{ month_full_names[week3[3].date.getMonth()] }}  {{month_summary[15].date.getFullYear()}}  </text> 
                        <text class="pt-2 mb-0" @click="nextMonth(month_summary[15].date)" > <i class="display-1 text-primary bi bi-caret-right "></i>      </text>
                    </div>
                    
                </small></small>
            </div>
        <hr class="b-0 m-0">
        
        <table class=" table " style="border-radius: 15px;" >
            <tbody>
                 <tr class="h5 text-dark">
                    <td colspan="2" class="">L</td>
                    <td colspan="2" class="">M</td>
                    <td colspan="2" class="">Mi</td>
                    <td colspan="2" class="">J</td>
                    <td colspan="2" class="">V</td>
                    <td colspan="2" class="text-danger opacity-75">S</td>
                    <td colspan="2" class="text-danger opacity-75">D</td>
                </tr>
                <tr v-if="week1!=null" class="text-secondary" >
                    <td  v-for="day in week1" :key="day" colspan="2" class="" @click="dayPicked(day.date)"> <text class="h4" :class="[{ 'text-danger' : tday.getDate() == day.date.getDate()  && tday.getMonth() == day.date.getMonth() , 'text-primary' : calendar_date.getDate() == day.date.getDate()  && calendar_date.getMonth() == day.date.getMonth() ,  'opacity-50' :  day.date.getDate() > 10 || day.date.getTime() < tday.getTime()    }]" > <text> {{day.date.getDate()}}</text><br><text v-if="day.reserved>0" style="font-size: 0.5em;">{{day.reserved}}</text></text></td>                      
                </tr>
                <tr v-if="week2!=null" class="text-secondary" >
                    <td  v-for="day in week2" :key="day" colspan="2" class="" @click="dayPicked(day.date)"> <text class="h4" :class="[{ 'text-danger': tday.getDate() == day.date.getDate()  && tday.getMonth() == day.date.getMonth(), 'text-primary' : calendar_date.getDate() == day.date.getDate()  && calendar_date.getMonth() == day.date.getMonth(),  'opacity-50' :  day.date.getTime() < tday.getTime()  }]"><text> {{day.date.getDate()}}</text>    <br>  <text v-if="day.reserved>0" style="font-size: 0.5em;">{{day.reserved}}</text></text></td>                       
                </tr>
                <tr v-if="week3!=null" class="text-secondary"  >
                    <td  v-for="day in week3" :key="day" colspan="2" class="" @click="dayPicked(day.date)"> <text class="h4" :class="[{ 'text-danger': tday.getDate() == day.date.getDate()  && tday.getMonth() == day.date.getMonth(), 'text-primary' : calendar_date.getDate() == day.date.getDate()  && calendar_date.getMonth() == day.date.getMonth() ,  'opacity-50' :  day.date.getTime() < tday.getTime()  }]">  <text> {{day.date.getDate()}}</text> <br>  <text v-if="day.reserved>0" style="font-size: 0.5em;">{{day.reserved}}</text></text></td>                    
                </tr>
                <tr v-if="week4!=null" class="text-secondary" >
                    <td  v-for="day in week4" :key="day" colspan="2" class="" @click="dayPicked(day.date)"> <text class="h4" :class="[{ 'text-danger': tday.getDate() == day.date.getDate()  && tday.getMonth() == day.date.getMonth(), 'text-primary' : calendar_date.getDate() == day.date.getDate()  && calendar_date.getMonth() == day.date.getMonth(),  'opacity-50' :  day.date.getTime() < tday.getTime()   }]"> <text> {{day.date.getDate()}}</text>  <br>  <text v-if="day.reserved>0" style="font-size: 0.5em;">{{day.reserved}}</text></text></td>                       
                </tr>
                <tr v-if="week5!=null" class="text-secondary" >
                    <td  v-for="day in week5" :key="day" colspan="2" class="" @click="dayPicked(day.date)"> <text class="h4" :class="[{ 'text-danger': tday.getDate() == day.date.getDate()  && tday.getMonth() == day.date.getMonth(), 'text-primary' : calendar_date.getDate() == day.date.getDate()  && calendar_date.getMonth() == day.date.getMonth() ,  'opacity-50 ' :  day.date.getDate() < 10 || day.date.getTime() < tday.getTime()  }] ">  <text  >  {{day.date.getDate()}}</text><br><text v-if="day.reserved>0" style="font-size: 0.5em;">{{day.reserved}}</text></text></td>                        
                </tr>
                <tr v-if="week6!=null" class="text-secondary" >
                    <td  v-for="day in week6" :key="day" colspan="2" class=""  @click="dayPicked(day.date)"> <text class="h4" :class="[{ 'text-danger': tday.getDate() == day.date.getDate()  && tday.getMonth() == day.date.getMonth(), 'text-primary' : calendar_date.getDate() == day.date.getDate()  && calendar_date.getMonth() == day.date.getMonth() ,  'opacity-50 ' :  day.date.getDate() < 10 || day.date.getTime() < tday.getTime()  }] ">  <text>  {{day.date.getDate()}}</text><br><text v-if="day.reserved>0" style="font-size: 0.5em;">{{day.reserved}}</text></text></td>                      
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
        tday : null ,
       
        week1 : [] ,
        week2 : [] ,
        week3 : [] ,
        week4 : [] ,
        week5 : [] ,
        week5 : [] ,     
        week6 : [] ,   

            
        day_names : ['D','L','M','Mi','J','V','S'] ,
        month_names : ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'],
        month_full_names : ['ENERO','FEBRERO','MARZO','ABRRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE']
            
            }   
    },
   	
    props: ['month_summary','forceUpdateDatePickerJAM','dateRequired','calendar_date'],
    emits: ['selectedDate','nextMonth','prevMonth'],

	created () {
            this.updateCalendar()
            this.tday = new Date() 
        },

	methods :{
            prevMonth(date)
            {
                this.$emit('prevMonth',date)
            },
            nextMonth(date)
            {
                this.$emit('nextMonth',date )
            },
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
              
        forceUpdateDatePickerJAM(new_date) 
        { 
            console.log("forceUpdateDatePickerJAM")
            this.updateCalendar()
        }

    }
}
</script>

