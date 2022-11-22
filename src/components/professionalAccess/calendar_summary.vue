<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
   

    <div class="d-flex justify-content-between bg-primary text-white">
        
        
        <div class=" d-flex justify-content-start">
           
            <div class="d-flex justify-content-start p-1 border ">   
                <div class="">
                    <small>
                    R 1 <br> 
                    D 5 <br>
                    </small>
                </div>
                <div class="">
                    <text>Lun</text><br>
                   {{day1}}
                </div>
            </div>
            


        </div>

       


    </div>

                              
    
</template>

<style scoped>
</style>


<script>

export default {
 
   data : function() {
        return {
        day1 : null ,
        day2 : null ,
        day3 : null ,
        day4 : null ,
        day5 : null ,
        day6 : null ,
        day7 : null ,
        
        cdate : null ,

        month_summary : [],
        }   
    },
   	
	props: ['session_params', 'date_required'],
    emits: [],

	created () {
        this.cdate = new Date()
        
        this.cdate.setHours(0,0,0,0)
        this.cdate.setDate(this.cdate.getDate() -3  ) 
        this.day1=this.cdate.getDate()
    
        this.cdate.setDate(this.cdate.getDate() + 1  ) 
        this.day2=this.cdate.getDate()

        this.cdate.setDate(this.cdate.getDate() + 1  ) 
        this.day3=this.cdate.getDate()
   
        this.cdate.setDate(this.cdate.getDate() + 1  ) 
        this.day4=this.cdate.getDate()

        this.cdate.setDate(this.cdate.getDate() + 1  ) 
        this.day5=this.cdate.getDate()
 
        this.cdate.setDate(this.cdate.getDate() + 1  ) 
        this.day6=this.cdate.getDate()
  
        this.cdate.setDate(this.cdate.getDate() + 1  ) 
        this.day7=this.cdate.getDate()


        this.getMonthSummary()
            },

	methods :{

        async getMonthSummary()
        {
            let aux_start_date = new Date(this.cdate.getTime() - (2629746000/2))
            let aux_end_date = new Date(this.cdate.getTime() + (2629746000/2))
            
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
              this.month_summary = response_json 
        },

        build_calendar_summary(app_reserv,date_start,date_end)
        {
            //make slots  
            let day_names =['Dom','Lun','Mar','Mier','Juev','Vier','Sab']
            for (var d = new Date(date_start); (d <= date_end && d <= new Date(calendar.date_end)  )  ; d.setDate(new Date(d).getDate() + 1)) 
            {
                const structure_day = {
                    day_number :  d.getDate(),
                    day_name : day_names[d.getDay()] ,
                    month : d.getMonth() ,
                    reserved : 0 , 
                } 
                this.month_summary.push(structure_day)
                 
            }


            const structure_day = {
                day_number : null,
                day_name : null,
                month : null,
                reserved : 0 , 
            } 


        }


    }
}
</script>

