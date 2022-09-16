<script setup>
import { ref } from 'vue'
import axios from 'axios';

import CalendarPickerMinimal2 from './calendarPickerMinimal2.vue'
import DateRequiredActions from './dateRequiredActions.vue'
import ListAppointments from './listAppointments.vue'
import FirstTimeLogin from './firstTimeLogin.vue'
import loadProgress from '../loadProgress.vue'
import LockOptions from './lockOptions.vue'

</script>

<template>
<div>
  <loadProgress  :active_spinner="active_spinner" > </loadProgress>
      <div v-if='!session_params.first_time' >

        <div class="d-flex justify-content-between  ">
          
          <LockOptions v-on:updateFilter="updateFilter"  :isLockDay="isLockDay" :dayStatics="dayStatics" v-on:updateAppointmentList="updateAppointmentList" :daterequired="daterequired" :lock_dates="lock_dates" :hours_block_list="hours_block_list" :session_params="session_params" ></LockOptions>
             
          <div class="w-100"> 
           <CalendarPickerMinimal2 class="mt-3" :daterequired="daterequired" v-on:set_daterequired="set_daterequired" > </CalendarPickerMinimal2>
          <!-- <DateRequiredActions :daterequired="daterequired" ></DateRequiredActions> --> <br>
          </div>

        </div> 
            <ListAppointments  :force_filter="force_filter" :filterApps="filterApps" :lock_dates="lock_dates"  v-on:addToBlockList="addToBlockList"  v-on:updateAppointmentList="updateAppointmentList" v-if="session_params" :daterequired="daterequired" :appointments_data="appointments_data"  :calendars_marks="calendars_marks" :session_params="session_params" v-on:switchView='switchView' :global_specialties='global_specialties' :global_comunas="global_comunas" ></ListAppointments>
            <div id='footer' style='height : 300px'>
            </div>
	    </div>

      <div v-else >
        <FirstTimeLogin v-on:switchToCenters='switchToCenters' > </FirstTimeLogin>
      </div>

</div>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>


<script>

export default {
data: function () {
		return {
			//prevCenterId : 'NoSet' ,
			//centers: null ,
            daterequired: null ,
            appointments_data: null, 
            active_spinner : false , 
            calendars_marks : null ,
            lock_dates : null ,
            isLockDay : false ,

            filterApps : null ,

            centers : null ,
            calendars : null ,

            hours_block_list : null ,
            dayStatics : {'total' : 0 , 'reserved' : 0 , 'cancelled' : 0 , 'blocked' : 0  , 'available' : 0  } ,

            force_filter : 0 ,
            filters : null , 
		 }
	},
	props: ['session_params','global_specialties', 'global_comunas' ],
  emits: ['switchView','switchToCenters' ] ,
    created () {
         this.active_spinner = true ;  	
            //this.daterequired="12-12-2021";
            //this.getCenters();
            console.log("TAB APPOINTMENT session_params "+ this.session_params.professional_id );
            let today=new Date();

            //this.daterequired = new Date().toISOString().split('T')[0] ;
            this.daterequired = String(today.getFullYear()).padStart(2,0)+"-"+String(today.getMonth()).padStart(2,0)+"-"+String(today.getDate()).padStart(2,0)  ;
         
            this.updateAppointmentList();
         
         this.active_spinner = false ;  	
         },
 
    methods: {

        updateFilter(filter)
        {
          console.log("TAB APPOINTMENT updateFilter:"+JSON.stringify(filter));
          this.force_filter = this.force_filter+1 
          this.filterApps = filter
          // this.render_id = this.render_id + 1 
          // this.forceRenderListApp() ; 
        },

        forceRenderListApp()
        {
          this.render_id +=1 
        },

        addToBlockList(hour)
        {    
            console.log("Add to BLock List ")
            let index = this.hours_block_list.findIndex(hour_list=> (hour_list.start_time == hour.start_time) )
            console.log ("FOUND : "+index)
            if ( index > -1) { // only splice array when item is found
               this.hours_block_list.splice(index, 1); // 2nd parameter means remove one item only
            }
            else
            {
              this.hours_block_list.push(hour)  
            }   
        },

        switchView(){
            this.$emit('switchView');
         },

        switchToCenters(){
            this.$emit('switchToCenters');
        },

        set_daterequired : function (year_month_day) {
            console.log("SET_DATEREQUIRED TAB APPOINTMENT : "+year_month_day);
           // this.getAppointments(year_month_day);
            this.daterequired = year_month_day ;
            //this.showSpinner(1000);
            this.updateAppointmentList();
            },

        async updateAppointmentList() {
          this.active_spinner = true ;  	
              const json = { 
              // agenda_id : this.par_agenda_id ,			 
              date : this.daterequired ,
              professional_id : this.session_params.professional_id , 
                    };
              console.log ("professional_get_appointments_day3 REQUEST :"+ JSON.stringify(json)  );
              let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_appointments_day3",json);
              console.log ("/professional_get_appointments_day3 RESPONSE:"+JSON.stringify(response_json.data)) ;
              //this.updateCalendarsMarks();
              
              if (response_json.data != null)
              {
                this.appointments_data = response_json.data
                this.lock_dates = response_json.data.lock_dates
              }
              else
              {
                 this.appointments_data = []
              }
              // set statics
              this.setDayStatics(this.appointments_data)

          //check if current day is a lock day to set the flag isLockDay
          if (this.lock_dates!=null)
          {
            if (this.lock_dates.includes(this.daterequired))
            {this.isLockDay=true}
            else{
              this.isLockDay=false
            }
          }  
          //************ */ 

          this.hours_block_list=[]
          this.active_spinner = false ;  
		    },

        setDayStatics(appointments_data)
        {
          console.log("SET DAY STATICS.........");
          this.dayStatics.total = appointments_data.appointments.length ;
           //how many cancelled ? 
          let filtered_blocked = appointments_data.appointments.filter(app =>  app.app_blocked === 1 ) 
          this.dayStatics.blocked = filtered_blocked.length ;
            //how Reserved ? 
          let filtered_reserved = appointments_data.appointments.filter(app =>  app.app_available === false && app.app_blocked != 1  ) 
          this.dayStatics.reserved = filtered_reserved.length ;
             //Available ? 
          this.dayStatics.available =  this.dayStatics.total  - ( this.dayStatics.blocked +  this.dayStatics.reserved ) ;

          if (this.isLockDay)
          {
            this.dayStatics.available = "--"
            this.dayStatics.blocked = "--"
            this.dayStatics.total = "--"
            /*
            this.dayStatics = {
                  'total' : 0 , 
                  'reserved' : 0 , 
                  'cancelled' : 0 , 
                  'blocked' : 0  , 
                  'available' : 0  
                  } 
                  */
		

          }
        

          console.log("SET DAY STATICS.........:"+JSON.stringify(this.dayStatics) );
          // this.dayStatics = {'total' : 0 , 'reserved' : 0 , 'cancelled' : 0  }
          // this.dayStatics = { 'total' : appointments_data.appointments.length  } 
        },

        async updateCalendarsMarks() {
                        const json = { 
                        //professional_id : this.session_params.professional_id ,			   
                        professional_id : this.session_params.professional_id ,			   
                                     };

                        console.log ("GET CALENDARS REQUEST :"+ JSON.stringify(json)  );
                        let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/rofessional_get_calendars",json);
                        this.calendars_marks = response_json.data.rows;
                        //console.log ("RESPONSE Calendars:"+JSON.stringify(this.calendars)) ;                       
        },	




  },

  

}
</script>

