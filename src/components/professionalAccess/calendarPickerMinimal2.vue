<script setup>
import { ref } from 'vue'
import axios from 'axios';
import Datepicker from 'vuejs3-datepicker';
import DatePickerJAM from './datepicker_jam.vue'
//import CalendarSummary from './calendar_summary.vue'
import { BKND_CONFIG } from '../../../config123.js'

</script>

<template>
    <div>
      <!--
        <CalendarSummary  :calendar_date="calendar_date"  v-on:selectedDate="selectedDateInCalendarSummary" v-if="!show_date_picker" :week_summary="week_summary" :forceUpdateCalendarSummary="forceUpdateCalendarSummary"  />
      <hr v-if="!show_date_picker" class="m-0 p-0">
      -->
      <!--
        <div class="d-flex justify-content-around text-primary mt-2"> 
                <div v-if="!show_date_picker" class="display-1 d-flex align-items-center">   <i v-on:click="prevDay()" class=" bi bi-caret-left "></i>   </div>
                <div v-if="true"  class="display-5 text-center " @click="show_date_picker =!show_date_picker">   
                       <text class="text-dark"> {{ getSelectedDayName() }} </text> <br> {{ calendar_date.getDate() }}           

                        <div class="display-5 text-dark" v-if="!show_date_picker" >
                            <text :forceUpdate="forceUpdateCalendar" >  {{ getMonthName( calendar_date.getMonth() ) }}  {{calendar_date.getFullYear()}} </text>
                        </div>

                </div>
                <div v-if="!show_date_picker" class="display-1 d-flex align-items-center">   <i v-on:click="nextDay()" class="text-primary bi bi-caret-right"></i>   </div>
        </div>     
     show_date_picker -->
        <div v-if="show_date_picker" class="text-center text-dark"> 
           <!-- <datepicker   :forceUpdate="forceUpdateCalendar" :key="componentKey" ref="inputRef"  @selected="handleSelectDate" :monday-first="true" :inline="true" v-model="calendar_date" :calendar-button="false" input-class='bigText' format="dd"  calendar-button-icon="nada"  name="uniquename"></datepicker>-->
            <DatePickerJAM  :session_params="session_params" :required_day="required_day" :lock_dates="lock_dates" :calendar_date="calendar_date" v-on:prevMonth="prevMonth" v-on:nextMonth="nextMonth" v-on:selectedDate="selectedDateInDatePicker" :month_summary="month_summary"  :forceUpdateDatePickerJAM="forceUpdateDatePickerJAM" ></DatePickerJAM>
        </div>

  </div>

</template>

<style scoped>

bigText 
{
  font-size: 40px;  
}

</style>


<script>

  

export default {
   data : function() {
        return {
        calendar : [] , 
        calendar2 : [] ,
        today_day : null,
        today_month : null,
        today_year : null,

        form_minimum_date : null,
        form_required_date : null,
        show_date_picker : true ,
        calendar_date: null,

     //   state : { date: new Date()} ,
        dateSelected :  ref(new Date()),
        month_name: ["Enero", "Febrero","Marzo","Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ] ,
        day_name: ["Domingo","Lunes", "Martes","Miercoles","Jueves", "Viernes", "Sabado"],
       
        componentKey : 0 ,
        forceUpdateCalendar : 0 ,
        forceUpdateCalendarSummary : 0 ,
        forceUpdateDatePickerJAM : 0 ,

        //experimental
        dcount : parseInt(0) , 
        month_summary : [] ,
        week_summary : [] ,

        lock_dates : [],

      //  week_summary : true, 

        }   
    },
   	components: { Datepicker },

    props: ['required_day', 'session_params', 'forceUpdateCalendarPickerMin' ,'daterequired' ],
    emits: ['set_daterequired'] ,

	created () {
        console.log("CALENDAR PICKER MINIMAL 2 CREATED !!");
        this.calendar_date = new Date()	
       
        console.log("CALENDAR PICKER MINIMAL 2 CREATED END !!");
        this.getMonthSummary(new Date())
        //this.updateWeekSummary(new Date())
    },

    mounted() {   
         // this.setCalendar();
         console.log("CALENDAR PICKER MINIMAL MOUNTED !!");
        },

	methods :{

        async getMonthSummary(date)
        {
            console.log("calendar Picker - GetMonthSummary:"+date)
          
            let aux_start_date = new Date(date.getFullYear(),date.getMonth(), 1)
            if (aux_start_date.getDay()!=0) //because  getDay when sunday return 0
            {
            aux_start_date.setDate( aux_start_date.getDate() - aux_start_date.getDay() + 1 ) 
            }
            else
            {
            aux_start_date.setDate( aux_start_date.getDate() - 6 )  
            }

            let aux_end_date =   new Date(date.getFullYear(),date.getMonth()+1, 0);
            aux_end_date.setDate( aux_end_date.getDate() + (7 - aux_end_date.getDay() ) ) 
            //let aux_end_date = new Date( aux_start_date.getTime() + (86400000*7) )
            const json = { 
                    professional_id : this.session_params.professional_id , 
                    start_date : aux_start_date,
                    end_date : aux_end_date,
                    };
            //first Get Appointments between two dates
            console.log ("calendar Picker - professional_get_month_summary REQUEST :"+ JSON.stringify(json)  ) 
            let response_json =  await axios.post(BKND_CONFIG.BKND_HOST+"/professional_get_month_summary",json) 
            console.log ("calendar Picker - professional_get_month_summary RESPONSE: "+JSON.stringify(response_json.data))
            //clean Month Summary
            this.month_summary = [] 
            
           // MAKE A LIST ONLY INCLUDE DATES OF APPOINTMENTS
            let app_dates_filtered = response_json.data.appointments.map(app => new Date(app.date) )
           // MAKE A LIST ONLY INCLUDE DATES OF Lock Dates
            this.lock_dates = response_json.data.lock_days.map(app => new Date(app.date) )
           
            console.log("getMonthSummary lock_dates:"+JSON.stringify(this.lock_dates))
            console.log("getMonthSummary app_dates_filtered:"+JSON.stringify(app_dates_filtered))
           
           for (var d = new Date(aux_start_date); d.getTime() <= aux_end_date.getTime()   ; d.setDate(new Date(d).getDate() + 1)) 
            {

                console.log("Searching  d:"+d.toISOString()+" d.Time:"+d.getTime()+" in array:"+JSON.stringify(app_dates_filtered))
                let nfound =  app_dates_filtered.filter(app => ( app.getDate() == d.getDate()  && app.getMonth() == d.getMonth() ) ) 
                
                let isblock = this.lock_dates.filter(app => ( app.getDate() == d.getDate()  && app.getMonth() == d.getMonth() && app.getFullYear() == d.getFullYear()   ) )
                //let isblock = lock_dates.includes( d )
                let val_bool = isblock.length > 0

                //CHECK if Day is active in calendar list
                let calendars_active_day = response_json.data.calendars.filter(cal => (new Date(cal.date_start).getTime() <= d.getTime()  && new Date(cal.date_end).getTime() > d.getTime()  )    );
                
                //Cicle for each Calendar  to check id day is active : Mon tue wed thu fri sat sun
                let calendars_active = []
                for (let i = 0; i < calendars_active_day.length; i++) 
                {
                    if (  (d.getDay() == 0 && calendars_active_day[i].sunday ) ||  (d.getDay() == 1 && calendars_active_day[i].monday ) ||  (d.getDay() == 2 && calendars_active_day[i].tuesday  )  ||  (d.getDay() == 3 && calendars_active_day[i].wednesday) || (d.getDay() == 4 && calendars_active_day[i].thursday ) || (d.getDay() == 5 && calendars_active_day[i].friday) || (d.getDay() == 6 && calendars_active_day[i].saturday)   )
                    {   //clean calendars
                       calendars_active.push(calendars_active_day[i])
                    }    
                }

                calendars_active = calendars_active.map(cal => cal.color)              
                
                //check if day is available

                const structure_day = {
                        date : new Date(d),  
                        reserved : nfound.length , 
                        today : false ,
                        selected : false, 
                        locked : val_bool, 
                        calendar_colors : calendars_active
                    }
                this.month_summary.push(structure_day)


            }
          
            this.forceUpdateDatePickerJAM = Math.random() 
   
        console.log("calendar Picker - month_summary this.month_summary :"+JSON.stringify(this.month_summary))

        },


        dayContent(date)
        {   
            return (function() {  return (this.dcount) }) 
        },
        
        selectedDateInCalendarSummary(date)
        {
            console.log("selectedDateInCalendarSummary :"+date)
            this.calendar_date = new Date( date ) 
            this.forceUpdateCalendar += 1       
        },

        selectedDateInDatePicker(date)
        { 
            console.log("selected Date:"+date)   
            this.calendar_date = new Date( date ) 
            this.forceUpdateCalendar += 1     

            this.getMonthSummary(this.calendar_date)  
            this.forceUpdateDatePickerJAM = Math.random() 

            this.$emit('set_daterequired', this.calendar_date ) ;

            //this.show_date_picker = false 
        //this.$emit('set_daterequired', new Date(date) ) ;
        },
        handleSelectDate(date)
        {
        console.log("date Selected en emit :"+date);
        this.show_date_picker =false ;
        this.forceUpdateCalendar += 1 ; 
        },
        getMonthName(n)
        {
            return this.month_name[n];
        },
        getSelectedDayName()
        {
            //this.calendar_date.getDay()
            return this.day_name[this.calendar_date.getDay()];
        },
        getSelectedDayNumber()
        {
            //this.calendar_date.getDay()
            return this.calendar_date.getDay();
        },
        nextDay()
        {
           console.log("Next Day");
           this.calendar_date.setDate( this.calendar_date.getDate() + 1 ) 
           this.forceUpdateCalendar += 1 ; 
        },
        prevDay()
        {
           console.log("Prev Day");
           this.calendar_date.setDate( this.calendar_date.getDate() - 1 ) 
           this.forceUpdateCalendar += 1 ; 
        },  
        nextMonth(date)
        {   
           console.log("calendar Picker - Next Month:"+date);
           //let aux_nextMonth = new Date(date)
           let aux_nextMonth = new Date(date.getFullYear(),date.getMonth()+1 ,date.getDate()  )
           //aux_nextMonth.setDate(aux_nextMonth.getDate() +31 ) 
           //this.calendar_date.setDate( this.calendar_date.getDate() + 31 )  
           console.log("calendar Picker - aux_Next Month:"+aux_nextMonth);
           this.getMonthSummary(aux_nextMonth)  
           this.forceUpdateDatePickerJAM = Math.random() 
        },
        prevMonth(date)
        {
           console.log("calendar Picker - Prev Month:"+date);
           let aux_prevMonth = new Date(date.getFullYear(),date.getMonth()-1 ,15  )
           //aux_prevMonth.setDate(aux_prevMonth  getDate() - 31 ) 
           //this.calendar_date.setDate( this.calendar_date.getDate() + 31 ) 
           this.forceUpdateDatePickerJAM = Math.random() 
           this.getMonthSummary(aux_prevMonth)  
        },
  

    },

   watch: {
            
            forceUpdateCalendar(newValue)
            {
                this.forceUpdateCalendarSummary = Math.random()
                //let new_dateRequired= this.calendar_date  ;
                this.$emit('set_daterequired', this.calendar_date ) ;
            },

            forceUpdateCalendarPickerMin(newValue) 
            {
                console.log("setDayFromHeader calendarPickerMInimal2: "+this.daterequired)
                this.calendar_date=this.daterequired
                this.getMonthSummary(this.daterequired)
            }

        },

}
</script>

