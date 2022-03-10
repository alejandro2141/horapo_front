<script setup>
import { ref } from 'vue'
import axios from 'axios';

  import Datepicker from 'vue3-date-time-picker';
  import 'vue3-date-time-picker/dist/main.css'
    

</script>

<template>
    <div>
    <div class="text-center">
        <div class="display-5">
          {{calendar[parseInt(req_year)][parseInt(req_month)][parseInt(req_day)] }}
        </div>
        <div class="display-5 ">
        
            <i v-on:click="prevDay()" class="text-primary bi bi-caret-left"></i> 
        
            <text class="text-primary pl-2 pr-2"  @click="this.show_date_picker =!this.show_date_picker" > {{req_day}}   
              
            </text>  
            
            <i  v-on:click="nextDay()" class="text-primary bi bi-caret-right"></i>
        
        </div>
        
        <div class="display-5">
            <i v-on:click="prevMonth()" class="text-primary bi bi-caret-left display-5"></i> {{ calendar[parseInt(req_year)][parseInt(req_month)][0]  }} 20{{req_year}}<i v-on:click="nextMonth()" class="text-primary bi bi-caret-right display-5"></i>
        </div>

        <!--
        <div  v-if="true" class="row  mb-1  border-secondary ">
                    <div class="col">
                        <input  v-model="form_required_date" :min="form_minimum_date" type="date" id="calendar-picker" name="calendar-picker"  class="datepicker-input"  >
                    </div>
        </div>
        -->

    </div>

    <div>
          <Datepicker v-if="show_date_picker"  v-model="date" inline autoApply />
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
         date: null,

        }   
    },
   	components: { Datepicker },

    props: ['required_day'],
    
    emits: ['set_daterequired'] ,


	created () {
        //this.setCalendar();
        this.form_minimum_date = new Date().toISOString().split('T')[0] ;
        this.form_required_date = new Date().toISOString().split('T')[0] ; 

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
        openCalendarPicker()
        {
        console.log("openCalendar ");
        this.show_date_picker = true ; 
              
/*
        let element = document.getElementById("calendar-picker");
        //element.datepicker('show') //Show on click of button
        console.log("element:"+element);
*/

        },

        nextDay()
        {
            if (this.calendar[this.req_year][this.req_month].length-2 < this.req_day)
            {
                this.req_day = 1 ; 
                this.nextMonth();
            }
            else
            {
            this.req_day++;
            console.log("NextDay method");
            this.$emit('set_daterequired', "20"+this.req_year+"-"+this.req_month+"-"+ this.req_day ) ;
            }

        },
        prevDay()
        {
            if (this.req_day <= 1)
            {
                this.req_day = this.calendar[this.req_year][this.req_month-1].length-1 ;
                this.prevMonth();
            }
            else
            {
            this.req_day--;
            console.log("prevDay method");
            this.$emit('set_daterequired', "20"+this.req_year+"-"+this.req_month+"-"+ this.req_day ) ;
            } 
        },
        nextMonth()
        {   
            if ( this.req_month == 12 )
            {
            this.req_month = 1;
            this.req_year++ ; 
             if (this.req_day > this.calendar[this.req_year][this.req_month].length-1 )
                    {
                        this.req_day= this.calendar[this.req_year][this.req_month].length-1 ;
                    }
             
            this.$emit('set_daterequired', "20"+(this.req_year + 1) +"-"+this.req_month+"-"+ this.req_day ) ;
            }
            else
            {
            this.req_month++;
            console.log("NextMonth method");
                 if (this.req_day > this.calendar[this.req_year][this.req_month].length-1 )
                    {
                        this.req_day= this.calendar[this.req_year][this.req_month].length-1 ;
                    }
            
            this.$emit('set_daterequired', "20"+this.req_year+"-"+this.req_month+"-"+ this.req_day ) ;
            }
           
        },
        prevMonth()
        {
            if ( this.req_month == 1 )
            {
            this.req_month = 12;
            this.req_year-- ; 
             if (this.req_day > this.calendar[this.req_year][this.req_month].length-1 )
                    {
                        this.req_day= this.calendar[this.req_year][this.req_month].length-1 ;
                    }
            this.$emit('set_daterequired', "20"+(this.req_year + 1) +"-1-"+ this.req_day ) ;
            }
            else
            {
            this.req_month--;
            console.log("NextMonth method");
             if (this.req_day > this.calendar[this.req_year][this.req_month].length-1 )
                    {
                        this.req_day= this.calendar[this.req_year][this.req_month].length-1 ;
                    }
            this.$emit('set_daterequired', "20"+this.req_year+"-"+this.req_month+"-"+ this.req_day ) ;
            }
       
       },

       


        setCalendar()
        {
        console.log("set Calendar method");


        //this.calendar = [] ;
        this.calendar[21] = [] ;
        this.calendar[22] = [] ;
        this.calendar[21][10] = [] ;
        this.calendar[21][11] = [] ;

        this.calendar[21][9] = [ "Septiembre", 
                                            "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo" ,
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves"    ] ;


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
         this.calendar[22][2] = [ "Febrero", 
                                            "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",  
                                            "Lunes"] ;
         this.calendar[22][3] = [ "Marzo", 
                                            "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",  
                                            "Lunes" , "Martes", "Miercoles", "Jueves" ] ;
        this.calendar[22][4] = [ "Abril", 
                                            "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",  
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", ] ;
        this.calendar[22][5] = [ "Mayo", 
                                            "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",  
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
                                            "Lunes" , "Martes"
                                            ] ;
        this.calendar[22][6] = [ "Junio", 
                                            "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",  
                                            "Lunes" , "Martes", "Miercoles", "Jueves"  ] ;
        this.calendar[22][7] = [ "Julio", 
                                            "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo" ] ;    

        this.calendar[22][8] = [ "Agosto", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo",
                                            "Lunes" , "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", 
                                            "Lunes" , "Martes", "Miercoles" ] ;    
  

       
       
       

        console.log("Set CALENDAR:  "+ JSON.stringify(this.calendar )  );
        },

	 //********* GO TO DAY
	
    setRequiredDay(year_month_day) {
    console.log("goToDay: "+year_month_day);
	this.required_day_month=year_month_day.substring(5,10);
	 //$emit('goToDay',year_month_day) ;
	}
   

    },

   watch: {
         form_required_date(value, oldValue) 
            {
            console.log("New Value required date: "+value);
            let tempDate=value.split('-');

            this.req_day = parseInt(tempDate[2])  ;
            this.req_month = parseInt(tempDate[1]) ;
            this.req_year = parseInt(tempDate[0].substring(2,4)) ;

            //this.$emit('set_daterequired', "20"+this.req_year+"-"+this.req_month+"-"+ this.req_day ) ;
            this.$emit('set_daterequired', value ) ;



            },

           date(newDate,oldDate)
           {
               console.log("DatePIcker chagne to:"+ newDate );
            let auxDate=new Date (newDate)
            
            this.req_day = auxDate.getDate()  ;
            this.req_month = (auxDate.getMonth()+1) ;  
            //this.req_year = parseInt( auxDate.getFullYear().substring(2,4) ) ;
           
               this.$emit('set_daterequired', auxDate.getFullYear()+"-"+(auxDate.getMonth()+1)+"-"+ auxDate.getDate() ) ;
           }  
        
        },

}
</script>

