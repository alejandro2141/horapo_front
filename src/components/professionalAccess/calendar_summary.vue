<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
   
    <div class="d-flex justify-content-between bg-primary text-white">
                  
                <div class="text-center">
                    <div style="font-size: 0.9em" class="m-0 p-0" >{{ month_summary[0].day_name }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{month_summary[0].day_number }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" >{{month_summary[0].month }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" >{{month_summary[0].reserved }}</div>
                </div>

                <div class="text-center">
                    <div style="font-size: 0.9em" class="m-0 p-0" >{{ month_summary[1].day_name }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{month_summary[1].day_number }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" >{{month_summary[1].month }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" >{{month_summary[1].reserved }}</div>
                </div>
                <div class="text-center">
                    <div style="font-size: 0.9em" class="m-0 p-0" >{{ month_summary[2].day_name }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{month_summary[2].day_number }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" >{{month_summary[2].month }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" >{{month_summary[2].reserved }}</div>
                </div>
                <div class="text-center">
                    <div style="font-size: 0.9em" class="m-0 p-0" >{{ month_summary[3].day_name }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{month_summary[3].day_number }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" >{{month_summary[3].month }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" >{{month_summary[3].reserved }}</div>
                </div>
                <div class="text-center">
                    <div style="font-size: 0.9em" class="m-0 p-0" >{{ month_summary[4].day_name }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{ month_summary[4].day_number }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" >{{month_summary[4].month }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" >{{month_summary[4].reserved }}</div>
                </div>

                <div class="text-center">
                    <div style="font-size: 0.9em" class="m-0 p-0" >{{ month_summary[5].day_name }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{month_summary[5].day_number }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" >{{month_summary[5].month }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" >{{month_summary[5].reserved }}</div>
                </div>

                <div class="text-center">
                    <div style="font-size: 0.9em" class="m-0 p-0" >{{ month_summary[6].day_name }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{month_summary[6].day_number }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" >{{month_summary[6].month }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" >{{month_summary[6].reserved }}</div>
                </div>
                <div class="text-center">
                    <div style="font-size: 0.9em" class="m-0 p-0" >{{ month_summary[7].day_name }}</div>
                     <div style="font-size: 1.5em" class="m-0 p-0" >{{month_summary[7].day_number }}</div>
                     <div style="font-size: 0.7em" class="m-0 p-0" >{{month_summary[7].month }}</div>
                     <div style="font-size: 0.9em" class="m-0 p-0" >{{month_summary[7].reserved }}</div>
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
        month_summary : ["a","a","a","a","a","a","a","a"],
        dayData :   {   day_number  :  null ,
                        day_name    : null  ,
                        month       :  null ,
                        reserved    : 0 
                    },
            }   
    },
   	
	props: ['session_params', 'daterequired','forceUpdateCalendarSummary'],
    emits: [],

	created () {
            
            for (let i = 0; i < 8 ; i++) {
                this.month_summary.push(this.dayData)
            }
        
        },

	methods :{
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
              this.build_calendar_summary (response_json,aux_start_date,aux_end_date)
              //this.month_summary = response_json 
        },

        build_calendar_summary(app_reserv,date_start,date_end)
        {
            //make slots  
            let day_names =['D','L','M','Mi','J','V','S']
            let month_names =['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']
            let i=0 
            for (var d = new Date(date_start); (d <= date_end && d <= new Date(date_end)  )  ; d.setDate(new Date(d).getDate() + 1)) 
            {
                //CHECK IF APP TAKEN in app_reserv

                const structure_day = {
                    day_number :  d.getDate(),
                    day_name : day_names[d.getDay()] ,
                    month : month_names[d.getMonth()] ,
                    reserved : 0 , 
                } 
                this.month_summary[i] = structure_day
                i++
            }
            //ADD FILTER HERE TO COUNT APPOINTMENTS EXIST IN DATE
            //calendars =  calendars.filter(cal =>  centers_ids_filtered.includes(cal.center_id) ) 
  

           console.log("month_summary lenght :"+this.month_summary.length  )
        }
    },

    watch: {
        
       

        forceUpdateCalendarSummary(new_date) 
        { console.log("forceUpdateCalendarSummary calendar_summary" +this.daterequired);
           
           this.updateMonthSummary(this.daterequired) 
        }


    }
}
</script>

