<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
   
    <div class="d-flex justify-content-between bg-success bg-opacity-75 text-white">
                
                <div class="text-center" v-if="month_summary[0] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[month_summary[0].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{ month_summary[0].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[month_summary[0].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{month_summary[0].reserved}}</div>
                </div>
                <div class="text-center" v-if="month_summary[1] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[month_summary[1].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{ month_summary[1].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[month_summary[1].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{month_summary[1].reserved}}</div>
                </div>
                <div class="text-center" v-if="month_summary[2] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[month_summary[2].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{ month_summary[2].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[month_summary[2].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{month_summary[2].reserved}}</div>
                </div>
                <div class="text-center" v-if="month_summary[3] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[month_summary[3].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{ month_summary[3].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[month_summary[3].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{month_summary[3].reserved}}</div>
                </div>
                <div class="text-center" v-if="month_summary[4] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[month_summary[4].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{ month_summary[4].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[month_summary[4].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{month_summary[4].reserved}}</div>
                </div>
                <div class="text-center" v-if="month_summary[5] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[month_summary[5].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{ month_summary[5].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[month_summary[5].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{month_summary[5].reserved}}</div>
                </div>
                <div class="text-center" v-if="month_summary[6] !=null ">
                    <div style="font-size: 0.9em" class="m-0 p-0" > {{ day_names[month_summary[6].date.getDay()] }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{ month_summary[6].date.getDate() }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" > {{month_names[month_summary[6].date.getMonth()] }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" > {{month_summary[6].reserved}}</div>
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
   	
	props: ['month_summary','forceUpdateCalendarSummary'],
    emits: [],

	created () {
        //this.updateMonthSummary(new Date()) 
        },

	methods :{
        /*
        getdDayData(pos)
        {
            const dayData = {
                    day_number :  null ,
                    day_name : null  ,
                    month : null ,
                    reserved : 0 , 
                }

            if ( this.month_summary[pos] != null )
            {
              dayData.day_number = this.month_summary[pos].day_number
              dayData.day_name = this.month_summary[pos].day_name
              dayData.month = this.month_summary[pos].month
              dayData.reserved = this.month_summary[pos].reserved
            }
            return dayData
        },

        async updateMonthSummary(startDate)
        {
            //let aux_start_date = new Date(this.cdate.getTime() - (2629746000/2))
            //let aux_end_date = new Date(this.cdate.getTime() + (2629746000/2))
            let aux_start_date = startDate
            let aux_end_date = new Date( aux_start_date.getTime() + (86400000*7) )
            
             const json = { 
             // date :  new Date(aux_dateToSearch).toISOString() ,
              professional_id : this.session_params.professional_id , 
              start_date : aux_start_date,
              end_date : aux_end_date,
                    };
            
              console.log ("professional_get_month_summary REQUEST :"+ JSON.stringify(json)  ) 
              let response_json =  await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_month_summary",json) 
              console.log ("/professional_get_month_summary RESPONSE: "+JSON.stringify(response_json.data)) 
              //this.updateCalendarsMarks();
              this.build_calendar_summary(response_json.data,aux_start_date,aux_end_date)
              //this.month_summary = response_json 
        },

        async build_calendar_summary(app_reserv,date_start,date_end)
        {
            this.month_summary = []
            //make slots  
            let day_names =['D','L','M','Mi','J','V','S']
            let month_names =['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']
            let app_dates_filtered = app_reserv.map(app => new Date(app.date) )

            console.log("app_dates_filtered:"+JSON.stringify(app_dates_filtered))
           
           for (var d = new Date(date_start); (d <= date_end && d <= new Date(date_end)  )  ; d.setDate(new Date(d).getDate() + 1)) 
            {
                
               console.log("Searching  d:"+d.toISOString()+" d.Time:"+d.getTime()+" in array:"+JSON.stringify(app_dates_filtered))
                let nfound =  app_dates_filtered.filter(app => ( app.getDate() == d.getDate()  && app.getMonth() == d.getMonth() ) ) 
           
         
                const structure_day = {
                        day_number :  d.getDate(),
                        day_name : day_names[d.getDay()] ,
                        month : month_names[d.getMonth()] ,
                        reserved : nfound.length , 
                    }

                this.month_summary.push(structure_day)
            }

        },
        */

    },

    watch: {
        /*    
        forceUpdateCalendarSummary(new_date) 
        { console.log("forceUpdateCalendarSummary calendar_summary" +this.daterequired);
           this.daterequired.setHours(0,0,0,0)
           this.updateMonthSummary(this.daterequired) 
        }
        */

    }
}
</script>

