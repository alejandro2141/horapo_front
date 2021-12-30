<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
    
    <div class="text-center">
        <div class="display-5">
          {{calendar[parseInt(req_year)][parseInt(req_month)][parseInt(req_day)] }}
        </div>
        <div class="display-5">
            <i v-on:click="prevDay()" class="text-primary bi bi-caret-left"></i>  {{req_day}} <i  v-on:click="nextDay()" class="text-primary bi bi-caret-right"></i>
        </div>
        <div class="display-5">
            <i v-on:click="prevMonth()" class="text-primary bi bi-caret-left display-5"></i> {{ calendar[parseInt(req_year)][parseInt(req_month)][0]  }} 20{{req_year}}<i v-on:click="nextMonth()" class="text-primary bi bi-caret-right display-5"></i>
        </div>
    </div>
    

</template>

<style scoped>
</style>


<script>

export default {
   data : function() {
        return {
        calendar : [] , 
        today_day : null,
        today_month : null,
        today_year : null,

        req_day : null,
        req_month : null,
        req_year : null,
        }   
    },
   	
    props: ['required_day'],
    
    emits: ['set_daterequired'] ,


	created () {
        //this.setCalendar();
	    console.log("CALENDAR PICKER MINIMAL CREATED !!");
		let tempDate=new Date().toISOString().split('T')[0].split('-');
	    console.log("tempDate : "+tempDate);
        this.today_day = parseInt(tempDate[2])
        this.today_month = parseInt(tempDate[1])
        this.today_year = parseInt(tempDate[0].substring(2,4))

        this.req_day = this.today_day ,
        this.req_month = this.today_month,
        this.req_year = this.today_year,

		console.log("tday:"+ this.today_day + " tmont:"+this.today_month + " tyear:"+this.today_year );
         this.setCalendar() ;

        console.log("CALENDAR PICKER MINIMAL CREATED END !!");
	},
     mounted() {   
         // this.setCalendar();
         console.log("CALENDAR PICKER MINIMAL MOUNTED !!");
        // this.setCalendar() ;
        },

	methods :{
        nextDay()
        {
            this.req_day++;
            console.log("NextDay method");
            this.$emit('set_daterequired', "20"+this.req_year+"-"+this.req_month+"-"+ this.req_day ) ;
        },
        prevDay()
        {
            this.req_day--;
            console.log("NextDay method");
            this.$emit('set_daterequired', "20"+this.req_year+"-"+this.req_month+"-"+ this.req_day ) ;
      
        },
        nextMonth()
        {
            this.req_month++;
            console.log("NextMonth method");
            this.$emit('set_daterequired', "20"+this.req_year+"-"+this.req_month+"-"+ this.req_day ) ;
        },
        prevMonth()
        {
            this.req_month--;
            console.log("NextMonth method");
            this.$emit('set_daterequired', "20"+this.req_year+"-"+this.req_month+"-"+ this.req_day ) ;
        },


        setCalendar()
        {
        console.log("set Calendar method");
        //this.calendar = [] ;
        this.calendar[21] = [] ;
        this.calendar[22] = [] ;
        this.calendar[21][10] = [] ;
        this.calendar[21][11] = [] 
        this.calendar[21][10] = [ "Octubre", 
                                            "Viernes" , "Sabado" , "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"    ] ;

        this.calendar[21][11] = [ "Noviembre", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes"     ] ;

        this.calendar[21][12] = [ "Diciembre", 
                                            "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes"  ] ;
 
        this.calendar[22][1] = [ "Enero", 
                                            "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" ] ;

       

        console.log("Set CALENDAR:  "+ JSON.stringify(this.calendar )  );
        },

	 //********* GO TO DAY
	
    setRequiredDay(year_month_day) {
    console.log("goToDay: "+year_month_day);
	this.required_day_month=year_month_day.substring(5,10);
	 //$emit('goToDay',year_month_day) ;
	}
   

    }
}
</script>

