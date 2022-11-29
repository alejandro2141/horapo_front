<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
   
    <div class="d-flex justify-content-between bg-white bg-opacity-75 text-secondary p-2">
                
                <div class="text-center" @click="selectedDate(week_summary[0].date)" v-if="week_summary[0] !=null">
                   <!-- <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[week_summary[0].date.getDay()] }}</div> -->
                     <div style="font-size: 0.9em" class="m-0 p-0" > HOY </div> 
                     <div style="font-size: 1.7em" class="m-0 p-0  text-danger" > {{ week_summary[0].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{ month_names[week_summary[0].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > -> </div>
                </div>
                <div class="text-center" @click="selectedDate(week_summary[1].date)"   v-if="week_summary[1] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[week_summary[1].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" :class="[{'text-primary': week_summary[1].date.getDate() == calendar_date.getDate()  }]"  >{{ week_summary[1].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[week_summary[1].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{week_summary[1].reserved}}</div>
                </div>
                <div class="text-center" @click="selectedDate(week_summary[2].date)"  v-if="week_summary[2] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[week_summary[2].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" :class="[{'text-primary ': week_summary[2].date.getDate() == calendar_date.getDate()  }]"   >{{ week_summary[2].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[week_summary[2].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{week_summary[2].reserved}}</div>
                </div>
                <div class="text-center" @click="selectedDate(week_summary[3].date)"  v-if="week_summary[3] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[week_summary[3].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" :class="[{'text-primary ': week_summary[3].date.getDate() == calendar_date.getDate()  }]"  >{{ week_summary[3].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[week_summary[3].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{week_summary[3].reserved}}</div>
                </div>
                <div class="text-center" @click="selectedDate(week_summary[4].date)"  v-if="week_summary[4] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[week_summary[4].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" :class="[{'text-primary ':week_summary[4].date.getDate() == calendar_date.getDate() }]"   >{{ week_summary[4].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[week_summary[4].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{week_summary[4].reserved}}</div>
                </div>
                <div class="text-center" @click="selectedDate(week_summary[5].date)"  v-if="week_summary[5] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[week_summary[5].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" :class="[{'text-primary': week_summary[5].date.getDate() == calendar_date.getDate() }]"   >{{ week_summary[5].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[week_summary[5].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{week_summary[5].reserved}}</div>
                </div>
                <div class="text-center" @click="selectedDate(week_summary[6].date)"  v-if="week_summary[6] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[week_summary[6].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" :class="[{'text-primary ': week_summary[6].date.getDate() == calendar_date.getDate() }]"   >{{ week_summary[6].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[week_summary[6].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{week_summary[6].reserved}}</div>
                </div>
                 
    </div>        
    
</template>

<style scoped>
</style>

<script>

export default {
 
   data : function() {
        return {
        cdate       : null , 
        day_names   : ['D','L','M','Mi','J','V','S'] ,
        month_names : ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']
            
            }   
    },
   	
	props: ['week_summary','forceUpdateCalendarSummary','calendar_date'],
    emits: ['selectedDate'],

	created () {
        //this.updateMonthSummary(new Date()) 
        },

	methods :{
        isReqDay(date) 
        {
            console.log("date:"+date+"  calendar_date:"+this.calendar_date)
            if (date.getDate() == this.calendar_date.getDate() )
            {
                return true
            }
            else
            {
                return false
            }

        },
        
        selectedDate(date)
        {
        this.$emit('selectedDate',date)
        },
       
    },

    watch: {
       
    }
}
</script>

