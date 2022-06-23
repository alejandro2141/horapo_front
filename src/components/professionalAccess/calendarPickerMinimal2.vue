<script setup>
import { ref } from 'vue'
import axios from 'axios';
/*
  import Datepicker from 'vue3-date-time-picker';
  import 'vue3-date-time-picker/dist/main.css'
  */ 
import Datepicker from 'vuejs3-datepicker';

</script>

<template>
    <div>

        <div class="d-flex justify-content-around text-primary"> 
                <div v-if="!show_date_picker" class="display-1 d-flex align-items-center">   <i v-on:click="prevDay()" class=" bi bi-caret-left "></i>   </div>
                <div class="display-5 text-center " @click="show_date_picker =!show_date_picker">   
                       <text class="text-dark"> {{ getSelectedDayName() }} </text> <br> {{ calendar_date.getDate() }}           

                        <div class="display-5 text-dark" v-if="!show_date_picker" >
                            <!--  <i v-on:click="prevMonth()" class="text-primary bi bi-caret-left display-5"></i>   -->
                            <text :forceUpdate="forceUpdateCalendar" >  {{ getMonthName( calendar_date.getMonth() ) }}  {{calendar_date.getFullYear()}} </text>
                            <!--   <i v-on:click="nextMonth()" class="text-primary bi bi-caret-right display-5"></i>  -->
                        </div>
                </div>
                <div v-if="!show_date_picker" class="display-1 d-flex align-items-center">   <i v-on:click="nextDay()" class="text-primary bi bi-caret-right"></i>   </div>
        </div>
     
      <div v-if="show_date_picker" class="text-center "> 
            <datepicker :forceUpdate="forceUpdateCalendar" :key="componentKey" ref="inputRef"  @selected="handleSelectDate" :monday-first="true" :inline="true" v-model="calendar_date" :calendar-button="false" input-class='bigText' format="dd"  calendar-button-icon="nada"  name="uniquename"></datepicker>
      </div>

  </div>

</template>

<style scoped>
/* 
.datepicker-input {
 position: absolute;
  left: 0;
  top: 0;
  
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  box-sizing: border-box;
}
.datepicker-input::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
*/
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

        req_day : null,
        req_month : null,
        req_year : null,

        form_minimum_date : null,
        form_required_date : null,
        show_date_picker : false ,
        calendar_date: null,

     //   state : { date: new Date()} ,
        dateSelected :  ref(new Date()),

        month_name: ["Enero", "Febrero","Marzo","Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ] ,
        day_name: ["Domingo","Lunes", "Martes","Miercoles","Jueves", "Viernes", "Sabado"],

        componentKey : 0 ,
        forceUpdateCalendar : 0 ,
        }   
    },
   	components: { Datepicker },

    props: ['required_day'],
    
    emits: ['set_daterequired'] ,

	created () {
        console.log("CALENDAR PICKER MINIMAL 2 CREATED !!");
        this.calendar_date = new Date()
		
        /*
        this.req_day = this.calendar_date.getDate() ,
        this.req_month = this.calendar_date.getMonth(),
        this.req_year = this.calendar_date.getFullYear(),
	     */

        console.log("CALENDAR PICKER MINIMAL 2 CREATED END !!");
    },

    mounted() {   
         // this.setCalendar();
         console.log("CALENDAR PICKER MINIMAL MOUNTED !!");
        // this.setCalendar() ;
        },

	methods :{
/*
        openCalendarPicker()
        {
        console.log("openCalendar ");
        //this.show_date_picker = true ; 
        let element = document.getElementById("calendar-picker");
        element.datepicker();
        },
*/

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
            
        nextMonth()
        {   
           console.log("Next Month");
           this.calendar_date.setDate( this.calendar_date.getDate() + 31 ) 
           this.forceUpdateCalendar += 1 ; 
           
        },

        prevMonth()
        {
           console.log("Prev Month");
           this.calendar_date.setDate( this.calendar_date.getDate() - 31 ) 
           this.forceUpdateCalendar += 1 ; 
        },
    //********* GO TO DAY
	

   

    },

   watch: {
 
            forceUpdateCalendar(newValue)
            {
                console.log("Date Change So EMIT:"+newValue);
                this.$emit('set_daterequired', this.calendar_date.getFullYear()+"-"+(this.calendar_date.getMonth()+1)+"-"+ this.calendar_date.getDate() ) ;
            }

        },

}
</script>

