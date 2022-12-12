<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
<div>
   
    <div class=" m-3    bg-white bg-opacity-75 text-secondary" :class="{'border border-3  border-primary':show_days  }" style="border-radius: 15px; background-color:#eee " >
            <div class="display-5">
                <small><small>
                    
                    <div  v-if="calendar_date!=null" class="d-flex justify-content-around">
                        <text v-if="show_days" style="font-size:1.7em" class="pt-2 mb-0" @click="prevMonth(calendar_date)" > <i class="text-primary bi bi-caret-left "></i>       </text>  
                        <text @click="show_days = !show_days"  class="pt-3 mb-0 text-primary" >   <i  class="bi bi-calendar3 " style="font-size: 1.1em;" ></i> {{  month_full_names[calendar_date.getMonth()] }}  {{calendar_date.getFullYear()}}  </text> 
                        <text v-if="show_days" style="font-size:1.7em" class="pt-2 mb-0" @click="nextMonth(calendar_date)" > <i class="text-primary bi bi-caret-right "></i>      </text>
                    </div>
                  
                </small></small>
            </div>

            <div v-if="!show_days" class="display-5 text-primary">
                <small><small>
                    
                    <div  v-if="calendar_date!=null" class="d-flex justify-content-around">
                        <text style="font-size:1.7em" class="pt-2 mb-0" @click="prevDay(calendar_date)" > <i class="text-primary bi bi-caret-left "></i>       </text>  
                            <text @click="show_days = !show_days" class="pt-3 mb-0" >
                                {{day_long_names[calendar_date.getDay()] }} 
                                {{ calendar_date.getDate() }}  
                               
                             
                            
                            </text> 
                        <text style="font-size:1.7em" class="pt-2 mb-0" @click="nextDay(calendar_date)" > <i class="text-primary bi bi-caret-right "></i>      </text>
                    </div>
                  
                </small></small>
            </div>


        <hr class="b-0 m-0">
        
        <table v-if="show_days" class=" table " style="border-radius: 15px;" >
            <tbody>
                 <tr class="h6 text-dark">
                    <td colspan="2" class="">L</td>
                    <td colspan="2" class="">M</td>
                    <td colspan="2" class="">Mi</td>
                    <td colspan="2" class="">J</td>
                    <td colspan="2" class="">V</td>
                    <td colspan="2" class="text-danger opacity-75">S</td>
                    <td colspan="2" class="text-danger opacity-75">D</td>
                </tr>
                
                <tr v-if="week1!=null" class="text-secondary" >
                    <td  v-for="day in week1" :key="day" colspan="2" class="" @click="dayPicked(day.date)"> 
                        <text class="h4" :class="[{ 'text-danger' : tday.getDate() == day.date.getDate()  && tday.getMonth() == day.date.getMonth() , 'text-primary text-decoration-underline' : calendar_date.getDate() == day.date.getDate()  && calendar_date.getMonth() == day.date.getMonth() ,  'opacity-100 fw-lighter' :  day.date.getDate() > 20     }]" > 
                            <text class="m-0 p-0"> {{day.date.getDate()}}  </text>
                            <br> 
                            <div class="m-1" v-for="color in day.calendar_colors" :key="color"  style="height:5px" :style="{'background-color': color }" > 
                                
                            </div>

                            <i v-if="day.locked"  class="bi bi-lock-fill" style="font-size: 0.7em;"></i>  
                            <text v-if=" day.reserved>0 " style="font-size: 0.5em;" >  {{day.reserved}}  </text>    
                        </text>  
                    </td>                      
                </tr>

                <tr v-if="week2!=null" class="text-secondary" >
                    <td  v-for="day in week2" :key="day" colspan="2" class="" @click="dayPicked(day.date)"> 
                        <text class="h4" :class="[{ 'text-danger' : tday.getDate() == day.date.getDate()  && tday.getMonth() == day.date.getMonth() , 'text-primary text-decoration-underline' : calendar_date.getDate() == day.date.getDate()  && calendar_date.getMonth() == day.date.getMonth()     }]" > 
                            <text class="m-0 p-0"> {{day.date.getDate()}}  </text>
                            <br> 
                            <div class="m-1" v-for="color in day.calendar_colors" :key="color"  style="height:5px" :style="{'background-color': color }" > 
                                
                            </div>

                            <i v-if="day.locked"  class="bi bi-lock-fill" style="font-size: 0.7em;"></i>  
                            <text v-if=" day.reserved>0 " style="font-size: 0.5em;" >  {{day.reserved}}  </text>    
                        </text>  
                    </td>                      
                </tr>

                <tr v-if="week3!=null" class="text-secondary" >
                    <td  v-for="day in week3" :key="day" colspan="2" class="" @click="dayPicked(day.date)"> 
                        <text class="h4" :class="[{ 'text-danger' : tday.getDate() == day.date.getDate()  && tday.getMonth() == day.date.getMonth() , 'text-primary text-decoration-underline' : calendar_date.getDate() == day.date.getDate()  && calendar_date.getMonth() == day.date.getMonth()     }]" > 
                            <text class="m-0 p-0"> {{day.date.getDate()}}  </text>
                            <br> 
                            <div class="m-1" v-for="color in day.calendar_colors" :key="color"  style="height:5px" :style="{'background-color': color }" > 
                                
                            </div>

                            <i v-if="day.locked"  class="bi bi-lock-fill" style="font-size: 0.7em;"></i>  
                            <text v-if=" day.reserved>0 " style="font-size: 0.5em;" >  {{day.reserved}}  </text>    
                        </text>  
                    </td>                      
                </tr>

                <tr v-if="week4!=null" class="text-secondary" >
                    <td  v-for="day in week4" :key="day" colspan="2" class="" @click="dayPicked(day.date)"> 
                        <text class="h4" :class="[{ 'text-danger' : tday.getDate() == day.date.getDate()  && tday.getMonth() == day.date.getMonth() , 'text-primary text-decoration-underline' : calendar_date.getDate() == day.date.getDate()  && calendar_date.getMonth() == day.date.getMonth()      }]" > 
                            <text class="m-0 p-0"> {{day.date.getDate()}}  </text>
                            <br> 
                            <div class="m-1" v-for="color in day.calendar_colors" :key="color"  style="height:5px" :style="{'background-color': color }" > 
                                
                            </div>

                            <i v-if="day.locked"  class="bi bi-lock-fill" style="font-size: 0.7em;"></i> 
                            <text v-if=" day.reserved>0 " style="font-size: 0.5em;" >  {{day.reserved}}  </text>    
                        </text>  
                    </td>                      
                </tr>

                <tr v-if="week5!=null" class="text-secondary" >
                    <td  v-for="day in week5" :key="day" colspan="2" class="" @click="dayPicked(day.date)"> 
                        <text class="h4" :class="[{ 'text-danger' : tday.getDate() == day.date.getDate()  && tday.getMonth() == day.date.getMonth() , 'text-primary text-decoration-underline' : calendar_date.getDate() == day.date.getDate()  && calendar_date.getMonth() == day.date.getMonth() ,  'opacity-100 fw-lighter' :  day.date.getDate() < 10    }]" > 
                            <text class="m-0 p-0"> {{day.date.getDate()}}  </text>
                            <br> 
                            <div class="m-1" v-for="color in day.calendar_colors" :key="color"  style="height:5px" :style="{'background-color': color }" > 
                                
                            </div>

                           <i v-if="day.locked"  class="bi bi-lock-fill" style="font-size: 0.7em;"></i>   
                            <text v-if=" day.reserved>0 " style="font-size: 0.5em;" >  {{day.reserved}}  </text>   
                        </text>  
                    </td>                      
                </tr>

                <tr v-if="week6!=null" class="text-secondary" >
                    <td  v-for="day in week6" :key="day" colspan="2" class="" @click="dayPicked(day.date)"> 
                        <text class="h4" :class="[{ 'text-danger' : tday.getDate() == day.date.getDate()  && tday.getMonth() == day.date.getMonth() , 'text-primary text-decoration-underline' : calendar_date.getDate() == day.date.getDate()  && calendar_date.getMonth() == day.date.getMonth() ,  'opacity-100 fw-lighter' :  day.date.getDate() < 10    }]" > 
                            <text class="m-0 p-0"> {{day.date.getDate()}}  </text>
                            <br> 
                            <div class="m-1" v-for="color in day.calendar_colors" :key="color"  style="height:5px" :style="{'background-color': color }" > 
                                
                            </div>

                           <i v-if="day.locked"  class="bi bi-lock-fill" style="font-size: 0.7em;"></i>  
                            <text v-if=" day.reserved>0 " style="font-size: 0.5em;" >  {{day.reserved}}  </text>    
                        </text>  
                    </td>                      
                </tr>

                
                
                          
            </tbody>
        </table> 
        
        <text class="h2 text-primary d-flex justify-content-end m-2" >
          

            <i @click="swLock(calendar_date)" class="bi bi-unlock-fill opacity-50"></i>     

           <text class="m-2" ></text>
        <!--
            <text >
                 <i v-if="show_days" @click="show_days = !show_days" class="bi bi-calendar-x  " style="font-size: 1.1em;" ></i>
            </text>
            -->
        
        </text>

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
        month_full_names : ['ENERO','FEBRERO','MARZO','ABRRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'] ,
        day_long_names : [ 'Domingo', 'Lunes','Martes','Miercoles','Jueves','Viernes','Sabado' ],

        show_days : false ,

            }   
    },
   	
    props: ['month_summary','forceUpdateDatePickerJAM','required_day','calendar_date','lock_dates','session_params'],
    emits: ['selectedDate','nextMonth','prevMonth'],

	created () {
            this.updateCalendar()
            this.tday = new Date() 
        },

	methods :{
            swLock(day)
            {
                console.log("Looking day:"+day+" IN  lock_dates:"+this.lock_dates)
                let isblock = this.lock_dates.filter(app => ( app.getDate() == day.getDate()  && app.getMonth() == day.getMonth() && app.getFullYear() == day.getFullYear()   ) )
                //let isblock = lock_dates.includes( d )
                let val_bool = isblock.length > 0
                if (val_bool) {
                    this.unLockDay(day)
                }
                else 
                {
                    this.lockDay(day)
                }
            },

            async  lockDay(hour)
            {
              console.log("professional_send Lock");
                             
                var r = confirm("Esta seguro que desea bloquear este dia? Pacientes no podran agendar horas en este dia");
                            if (r == true) {

                                let aux_date_required = new Date(hour)
                                aux_date_required.setHours(0,0,0,0)
                                
                                const json = {  
                                    token: 'apsfdnwe',                         
                                    appointment_date : aux_date_required , 
                                    appointment_professional_id  : this.session_params.professional_id 	, 
                                };

                                console.log ("professional_lock_day  REQUEST :"+ JSON.stringify(json)  );
                                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_lock_day",json );
                                //console.log ("RESPONSE save_appointmentJSON.stringify(response_json) :"+JSON.stringify(response_json)) ;
                                console.log ("RESPONSE professional_lock_day :"+JSON.stringify(response_json.data)) ;
                                this.appointment_confirm = response_json.data ;
                                //console.log ("We should display a Confirmation Modal now"+JSON.stringify(appointment_confirm) );
                                //this.$emit('updateAppointmentList');
                                this.$emit('selectedDate', hour ) ;
                            }
             
            },

            async unLockDay(hour)
            {
                var r =confirm("DESBLOQUEAR este dia? Pacientes SI podrán agendar horas en este dia");
                            if (r == true) {

                                let aux_date_required = new Date(hour)
                                aux_date_required.setHours(0,0,0,0)

                                const json = {  
                                    token: 'apsfdnwe',                         
                                    appointment_date :  aux_date_required , 
                                    appointment_professional_id  : this.session_params.professional_id 	, 
                                };

                                console.log ("professional_lock_day  REQUEST :"+ JSON.stringify(json)  );
                                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_unlock_day",json );
                                //console.log ("RESPONSE save_appointmentJSON.stringify(response_json) :"+JSON.stringify(response_json)) ;
                                console.log ("RESPONSE professional_lock_day :"+JSON.stringify(response_json.data)) ;
                                this.appointment_confirm = response_json.data ;
                                //console.log ("We should display a Confirmation Modal now"+JSON.stringify(appointment_confirm) );
                                this.$emit('selectedDate', hour ) ;
                                }
            },

            prevMonth(date)
            {
                let prev_month_date = new Date(date.getFullYear(), date.getMonth()-1,  date.getDate()  )
                this.$emit('selectedDate', prev_month_date ) ;
            },
            nextMonth(date)
            {
                let next_month_date = new Date(date.getFullYear(),date.getMonth()+1, date.getDate()  )
                this.$emit('selectedDate', next_month_date ) ;
            },
            nextDay(date)
            {
                let next_day = new Date(date.getFullYear(),date.getMonth(), date.getDate()+1  )
                this.$emit('selectedDate', next_day ) ;
            },
            prevDay(date)
            {
                let prev_day = new Date(date.getFullYear(),date.getMonth(), date.getDate()-1  )
                this.$emit('selectedDate', prev_day ) ;
            },
            dayPicked(day)
            {
                console.log("dayPicker:"+day)
                this.$emit('selectedDate', day ) ;
            },
            updateCalendar()
            {
                console.log("datepicker_jam month_summary :"+ JSON.stringify(this.month_summary))
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

