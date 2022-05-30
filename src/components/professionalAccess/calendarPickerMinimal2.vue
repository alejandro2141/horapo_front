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
    <div class="text-center">
        <div class="display-5">
        algo 
        </div>
        <div class="display-5 ">
        
            <i v-on:click="prevDay()" class="text-primary bi bi-caret-left"></i> &nbsp;&nbsp;
        
            <text class="text-primary pl-2 pr-2"  @click="show_date_picker =!show_date_picker" >    
              {{ req_day }}
            </text>  
            
            &nbsp;&nbsp;<i  v-on:click="nextDay()" class="text-primary bi bi-caret-right"></i>
        
        </div>
       state.date soy 2 = {{state.date}}  <br>
       
       
        <div v-if="show_date_picker">
            <datepicker    monday-first="true" inline="true" v-model="state.date" :calendar-button="false" input-class='bigText' format="dd"  calendar-button-icon="nada"  name="uniquename"></datepicker>
        </div>
     
  
       <!--
        <div v-if="show_date_picker">
            <datepicker 
            inline="true"
            monday-first="true" 
            placeholder="Select Date"
                :highlighted="{
                to: new Date(2020, 11, 16),
                from: new Date(2020, 10, 17),
                }"
            >
            </datepicker>
        </div>
       -->


        <div class="display-5">
            <i v-on:click="prevMonth()" class="text-primary bi bi-caret-left display-5"></i>  {{calendar_date.getMonth() }} <i v-on:click="nextMonth()" class="text-primary bi bi-caret-right display-5"></i>
        </div>

        <!--
        <div  v-if="true" class="row  mb-1  border-secondary ">
                    <div class="col">
                        <input  v-model="form_required_date" :min="form_minimum_date" type="date" id="calendar-picker" name="calendar-picker"  class="datepicker-input"  >
                    </div>
        </div>
        -->

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

        state : { date: new Date()} ,
        dateSelected :  ref(new Date())
        }   
    },
   	components: { Datepicker },

    props: ['required_day'],
    
    emits: ['set_daterequired'] ,

	created () {
        console.log("CALENDAR PICKER MINIMAL 2 CREATED !!");
        this.calendar_date = new Date()
		
        this.req_day = this.calendar_date.getDate() ,
        this.req_month = this.calendar_date.getMonth(),
        this.req_year = this.calendar_date.getFullYear(),
	        
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

        nextDay()
        {
            console.log("Next Date");
            this.calendar_date.setDate( this.calendar_date.getDate() + 1)
            console.log("Next Date set to "+this.calendar_date.getDate() );
            this.req_day = this.calendar_date.getDate() 
        },
        prevDay()
        {
             console.log("Prev Date");
             this.calendar_date.setDate( this.calendar_date.getDate() - 1)
              console.log("PRev Date set to "+this.calendar_date.getDate() );
        },
        nextMonth()
        {   
           
           
        },
        prevMonth()
        {
            
       
        },
    //********* GO TO DAY
	

   

    },

   watch: {
 
        
        },

}
</script>

