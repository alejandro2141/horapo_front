<script setup>
import { ref } from 'vue'
import axios from 'axios';
import Datepicker from 'vuejs3-datepicker';
import timeSelector from './time_selector.vue'
import HourSelector from './hour_selector.vue';
import MinutesSelector from './minutes_selector.vue'
import DurationMinutes from './duration_minutes.vue'
import MinutesBtwMinutes from './timebtw_minutes.vue'



</script>

<template>
<div class="m-3">
                        
                   <!-- <div class="card mb-5  w-100 border border-1 border-white" style="width: 18rem; border-radius: 15px; " :style="{ 'background-color' : calendar.color   }"  >
                    -->
                    <div class="card mb-5  w-100 border border-1 border-white bg-secondary" style="width: 18rem; border-radius: 15px; "   >
                    
                    <div class="card-body p-0 m-0" >
                    
                    <div class="d-flex justify-content-between p-2 w-100 bg-secondary" style="width: 18rem; border-radius: 15px; " >
                                <text class="card-title display-6 text-white mt-0 pt-0"   >
                                  <i class="bi bi-calendar-week "></i>  {{idSpecialty2name(specialty_code) }}  
                                </text>
                                <!--
                                <div class="fs-1 bg-light text-primary" style="background-color: #D4D4D4;  border-radius: 15px;">
                                    <p @click="displayShareCalendar(calendar)" class="text-center p-1"  >
                                        
                                        <text class="fs-6" > Compartir
                                        </text><br>
                                        <i  class="fs-4 bi bi-share"></i>
                                    </p>
                                </div>
                                -->
                    </div>

                     <div v-if="showEdit" class="d-flex justify-content-between mt-0 p-1 bg-white text-danger"> 
                        <text  @click="deleteCalendar();showEdit=false" >Eliminar <i class="bi bi-trash"></i> </text> 
                    </div>


                <div class="bg-secondary  text-white w-100 pt-2 pl-2 pr-2">
                    <div class="m-2 ">

                    
                   
                <!-- ESTADO -->
                    <div class="d-flex justify-content-between mt-2 p-1"> 
                        <div>
                            Estado 
                        </div>

                        <div v-if="evaluateCalendarStatus(form_date_end)==3" class="bg-secondary" :class="{ 'bg-dark': showEdit }" style=" border-radius: 15px; "  >
                              <text class="text-white p-1"> Expirado <i class="text-danger display-4 bi bi-slash-circle-fill"></i> </text> 
                        </div>

                        <div v-else >
                                <text v-if="form_calendar_active "  >  
                                  <text class="text-white "><i class="bi bi-check-lg text-success bg-white"></i> Encendido </text>
                                  <text v-if="showEdit" @click="switchCalendarActive()" class="btn btn-danger"> Apagar </text>
                                </text>
                                <text v-else > 
                                    <text   class="text-white"> <i class="bi bi-exclamation-octagon-fill text-danger display-5 "></i> Apagado</text>
                                    <text v-if="showEdit" @click="switchCalendarActive()" class="btn btn-success"> Encender </text>
                                </text>
                        </div>
                    </div>
<!--
                                <div  v-if="calendar.calendar_active"  class="d-flex justify-content-between">
                                    <text>Estado Actual </text>
                                    <text class="text-success"  > Encendido </text>
                                   
                                </div>

                                <div  v-else  class="d-flex justify-content-between">
                                    <text>Estado Actual </text>
                                    <text class="text-danger"> Apagado </text>
                                    
                                </div>
-->
                <!-- LUGAR -->
            <div class="mt-2 mb-2 d-flex justify-content-between">
                <text>Lugar de Atencion  <br>
                </text>
                <div>
                    <p v-if="calendar.center_visit" class="text-white text-end" >
                        <text>  </text> <text> En Consulta  </text>  
                    </p>
                    <p v-if="calendar.home_visit" class="text-white text-end">
                        <text>  </text> <text> A Domicilio  </text>
                    </p>
                    <p v-if="calendar.remote_care" class="text-white text-end">
                        <text>  </text> <text> Tele Atencion </text>
                    </p>
                    <i class="bi bi-geo-alt text-white"></i> {{center_data.name}} 
                </div>
            </div>     

            <!-- CALENDAR DATE START-->
                  <div  class="d-flex justify-content-between mt-3">
                          <div class="p-2">
                          Fecha Inicio
                          </div>

                          <div class="p-2 " :class="{'bg-dark':showEdit }" @click="show_date_start=!show_date_start"  >
                                {{formatDate(form_date_start)}} <i class="bi bi-calendar-week"></i>
                          </div>
                  </div>
                  <div v-if="show_date_start && showEdit">
                          <datepicker  class="text-dark"    ref="inputRef"  @selected="setCalendarStart"  :monday-first="true" :inline="true" v-model="form_date_start" :calendar-button="false" input-class='bigText' format="dd"  calendar-button-icon="nada"  name="uniquename"></datepicker>
                  </div>
                  <!--  -->

            <!-- CALENDAR DATE END -->
                  <div class="d-flex justify-content-between mt-3">
                      <div class="p-2">
                          Fecha Fin
                      </div>
                      <div class="p-2" :class="{'bg-dark':showEdit }"  @click="show_date_end=!show_date_end"  >
                             {{formatDate(form_date_end)}} <i class="bi bi-calendar-week"></i>
                      </div>
                  </div>
                  <div v-if="show_date_end && showEdit">
                        <datepicker class="text-dark"    ref="inputRef"  @selected="setCalendarEnd" :monday-first="true" :inline="true" v-model="form_date_end" :calendar-button="false" input-class='bigText' format="dd"  calendar-button-icon="nada"  name="uniquename"></datepicker>
                  </div>


            <!--TIME START  -->
                <div  class="d-flex justify-content-between mt-2">
                    <text> Hora Inicio </text>
                    
                    <div  class="d-flex flex-row-reverse">
                          <div class="d-flex justify-content-end">
                              <div @click="show_start_hour_picker=!show_start_hour_picker ;show_start_minutes_picker=false" class="p-2" :class="{'bg-dark':showEdit }">
                                  <text >{{form_start_hour}}</text> 
                              </div>
                              <div class="p-2">:</div>
                              <div @click="show_start_minutes_picker=!show_start_minutes_picker; show_start_hour_picker=false" class="p-2" :class="{'bg-dark':showEdit }" >
                                    <text >{{form_start_minutes}}</text>
                                    </div>
                              <div class="p-2">hrs</div>
                          </div>
                    </div>
                
                </div>
                
            <HourSelector v-if="show_start_hour_picker && showEdit" :hour='form_start_hour' v-on:selected_hour="set_start_hour"></HourSelector>
            <MinutesSelector v-if="show_start_minutes_picker && showEdit" :minutes='form_start_minutes' v-on:selected_minutes="set_start_minutes" ></MinutesSelector> 
           
           <!--TIME END   -->
                <div  class="d-flex justify-content-between mt-2">
                    <text> Hora FIN </text>
                    
                    <div  class="d-flex flex-row-reverse">
                          <div class="d-flex justify-content-end">
                              <div @click="show_end_hour_picker=!show_end_hour_picker ;show_end_minutes_picker=false" class="p-2" :class="{'bg-dark':showEdit }" >
                                  <text >{{form_end_hour}}</text> 
                              </div>
                              <div class="p-2">:</div>
                              <div @click="show_end_minutes_picker=!show_end_minutes_picker; show_end_hour_picker=false" class="p-2" :class="{'bg-dark':showEdit }" >
                                    <text >{{form_end_minutes}}</text>
                                    </div>
                              <div class="p-2">hrs</div>
                          </div>
                    </div>
                
                </div>
                
            <HourSelector v-if="show_end_hour_picker && showEdit" :hour='form_end_hour' v-on:selected_hour="set_end_hour"></HourSelector>
            <MinutesSelector v-if="show_end_minutes_picker && showEdit" :minutes='form_end_minutes' v-on:selected_minutes="set_end_minutes" ></MinutesSelector> 
           

        <!-- APP DURATION  -->
                <div  class="d-flex justify-content-between mt-3">
                            <text> Tiempo de atencion: </text>
                            <div @click="show_duration_minutes=!show_duration_minutes" class="p-2 " :class="{'bg-dark':showEdit }" >
                                  <text >{{form_app_duration}}</text> Minutos
                            </div>
                </div>

            <DurationMinutes v-if='show_duration_minutes && showEdit ' v-on:selected_app_duration='selected_app_duration'  ></DurationMinutes>

  
        <!-- END  APP DURATION  -->


        <!-- TIEMPO ATENCION ENTRE CITAS  -->
                <div  class="d-flex justify-content-between mt-3">
                           
                        <text> Tiempo entre Citas: </text>
                            <div @click="show_timebtw_minutes=!show_timebtw_minutes" class="p-2 " :class="{'bg-dark':showEdit }" >
                                  <text >{{form_app_time_between}}</text> Minutos
                            </div>
                </div>

                <MinutesBtwMinutes v-if="show_timebtw_minutes && showEdit "  v-on:selected_app_duration_btw='selected_app_duration_btw' ></MinutesBtwMinutes>

                <!-- END  TIEMPO ATENCION ENTRE CITAS  -->


             <!-- SELECT COLOR   -->
                <div  class="d-flex justify-content-between mt-3">
                            <text>Seleccione Color de Referencia </text>  
                            <!--  
                            <div  class="col-9 w-25 text-dark" :style="{ 'background-color' : form_calendar_color   }" >
                                <p @click="showColorSelection=!showColorSelection" class="p-2 pt-2 h5"> <i class="bi bi-moisture"></i> </p>
                            
                            </div>
                            -->
                </div>

                <div  class="d-flex justify-content-end" :class="{ 'bg-dark p-1': showEdit}" >
                    <div v-for="calcol in calendarColorArray"  :key="calcol.id"  >
                       <div class="m-1 p-3 border border-3" @click="form_calendar_color=calcol"  :class="{'border-primary' : (form_calendar_color==calcol ) }" :style="{ 'background-color' : calcol   }" > </div>
                    </div>
                </div>
             <!-- SELECT COLOR   -->
            
             <!-- SELECT DAYS RECURRENCY   -->
                <div class="mt-3">
                  Dias Recurrencia: <br>

                <div class="d-flex justify-content-between  m-0 p-0" :class="{ 'bg-dark p-1': showEdit}" >
                    <div class="border border-3 m-1 p-2"  @click="form_recurrency_mon=!form_recurrency_mon" :class="{ 'bg-dark p-1': showEdit , 'border-white' :form_recurrency_mon, 'border-secondary':!form_recurrency_mon}" >Lu</div>
                    <div class="border border-3 m-1 p-2"  @click="form_recurrency_tue=!form_recurrency_tue" :class="{ 'bg-dark p-1': showEdit , 'border-white' :form_recurrency_tue, 'border-secondary':!form_recurrency_tue}" >Ma</div>
                    <div class="border border-3 m-1 p-2"  @click="form_recurrency_wed=!form_recurrency_wed" :class="{ 'bg-dark p-1': showEdit , 'border-white' :form_recurrency_wed, 'border-secondary':!form_recurrency_wed}" >Mi</div>
                    <div class="border border-3 m-1 p-2"  @click="form_recurrency_thu=!form_recurrency_thu" :class="{ 'bg-dark p-1': showEdit , 'border-white' :form_recurrency_thu, 'border-secondary':!form_recurrency_thu}">Ju</div>
                    <div class="border border-3 m-1 p-2"  @click="form_recurrency_fri=!form_recurrency_fri" :class="{ 'bg-dark p-1': showEdit , 'border-white' :form_recurrency_fri, 'border-secondary':!form_recurrency_fri}">Vie</div>
                    
                  </div>
                  <div class="d-flex justify-content-start m-0 p-0" :class="{ 'bg-dark p-1': showEdit}"  >
                    <div class="border border-3  m-1 p-2" @click="form_recurrency_sat=!form_recurrency_sat" :class="{ 'bg-dark p-1': showEdit , 'border-white':form_recurrency_sat, 'border-secondary':!form_recurrency_sat}">Sa</div>
                    <div class="border border-3  m-1 p-2" @click="form_recurrency_sun=!form_recurrency_sun" :class="{ 'bg-dark p-1': showEdit , 'border-white':form_recurrency_sun, 'border-secondary':!form_recurrency_sun}">Do</div>
                  </div>
               

                </div>


                <div  class="d-flex justify-content-between mt-2">
                            <text  @click="showSocial=!showSocial" class="" >Compartir en Redes Sociales  </text>  
                </div>

              <div v-if="true" class="d-flex justify-content-between p-3 text-white" > 
                <div> 
                  <a  class="text-white" href="mailto:user@example.com?subject=Hola Te comparto mi calendario para agendar horas&body=Hola Te comparto mi calendario para agendar horas, en el siguiente link puedes acceder directamente a mi agenda para encontrar la hora que mejor se ajuste a tu disponibilidad de tiempo">Email<br> 
                  <i class="display-1  bi bi-envelope"></i> </a> 
                </div>
                
                <div>
                    <div  data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="text-white fb-xfbml-parse-ignore">
                    Facebook <br>
                    <i class="text-white display-1 bi bi-facebook"></i>
                    
                    </a></div>
                </div>
                
                <div v-if="session_params != null"> 
                  <a class="text-white" :href="'whatsapp://send?text=http://ec2-3-143-168-51.us-east-2.compute.amazonaws.com/nested/publicSiteProfessional.html?prof_id='+session_params.professional_id+'&cal_id='+calendar.id">
                   WhatsApp <br>
                   <i class="text-white display-1 bi bi-whatsapp"></i> </a>  
                </div>

              </div>

                              
                <hr class="text-white ">

                <div v-if="!showEdit" class="d-flex justify-content-around fs-4 text-white" >
                     <text  @click="showEdit=true" class="text-white"> Modificar </text>  
                 
                </div>

                <div v-if="showEdit" class="d-flex justify-content-between mt-2">
                    <text @click="saveCalendarChanges();showEdit=false" class="" >GUARDAR  </text> 
                            
                            
                    <text @click="showEdit=false;resetForm()" class="" >CANCELAR </text>  
                </div>

                                
                                 <!--    <p class="text-white">C#{{calendar.calendar_id}} </p> -->
               
                </div>
                </div>
                </div>
                    <!-- end card -->
                </div>   
                    
                    
                </div>
    

</template>

<style scoped>
</style>


<script>

export default {
 
   data : function() {
        return {

            //FORM DATA
            form_calendar_active : null ,

            specialty_code : null, 
            form_date_start : null ,
            show_date_start : false ,
            
            form_date_end : null,
            show_date_end : false, 
            
            //start time
            form_start_hour : '00' ,
            show_start_hour_picker : false ,

            form_start_minutes : '00' ,
            show_start_minutes_picker : false ,

            //end time
            form_end_hour : '00' ,
            show_end_hour_picker : false ,
            
            form_end_minutes : '00' ,
            show_end_minutes_picker : false ,
            //duration            
            show_duration_minutes : false ,
            form_app_duration : '00' ,
            //time btw
            show_timebtw_minutes : false ,
            form_app_time_between : '00' ,

            calendarColorArray : ["#FF0000","#00FF00","#0000FF", "#FFE800", "#00ECFF", "#273030"],

            form_calendar_color : null ,

            form_recurrency_mon: false ,
            form_recurrency_tue: false ,
            form_recurrency_wed: false ,
            form_recurrency_thu: false ,
            form_recurrency_fri: false ,
            form_recurrency_sat: false ,
            form_recurrency_sun: false ,

            showEdit : false, 

            //utilities 
           
            month_name : ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
            showSocial : false ,
            calendar_active : null ,
            name : null ,

        }   
    },
   	
	props: [ 'calendar' ,'center_data' , 'global_specialties' , 'global_comunas','session_params' ],
    emits: ['updateCalendarList'],

	created () {
        this.resetForm()       
    },

	methods :{
        
        set_start_hour(val)
        {
        this.form_start_hour = val
        this.show_start_hour_picker = false
        },
        set_start_minutes(val)
        {
        this.form_start_minutes = val
        this.show_start_minutes_picker = false
        },
        set_end_hour(val)
        {
        this.show_end_hour_picker = false
        this.form_end_hour = val
        },
        set_end_minutes(val)
        {
        this.show_end_minutes_picker = false
        this.form_end_minutes = val
        },
        selected_app_duration(val)
        {
        this.show_duration_minutes = false 
        this.form_app_duration = val
        },
        selected_app_duration_btw(val)
        {
        this.form_app_time_between = val
        this.show_timebtw_minutes = false 
        },
        
        setCalendarStart(date)
        {
            console.log("date Selected en emit :"+date);
            //let aux_date=new Date(date);
            this.form_calendar_start= new Date(date);
        //   this.form_calendar_start=aux_date.getDate()+"/"+month_name[aux_date.getMonth()]+"/"+ aux_date.getFullYear()
            this.show_date_start = false
        },

        setCalendarEnd(date)
        {
            console.log("date Selected en emit :"+date);
            //let aux_date=new Date(date);
            this.form_calendar_end= new Date(date);
        // this.form_calendar_end=aux_date.getDate()+"/"+(aux_date.getMonth()+1)+"/"+ aux_date.getFullYear()
            this.show_date_end = false
        },
        
        formatDate(val)
        {
            console.log("formatDate:"+val)
            let aux_date= new Date(val) ;
            let response= aux_date.getDate()+" de "+this.month_name[aux_date.getMonth()]+" "+ aux_date.getFullYear()
          //  console.log("formatDate:"+response)
          //  return response
            return response
        },

        async deleteCalendar(){
          console.log("Professional delete Calendar")
         
           var r =confirm("¿ Esta seguro que desea ELIMINAR este Calendario?  Ok para continuar");
            if (r == true) {

                  const json = { 
                   // professional_id: this.session_params.professional_id ,
                    calendar_id :  this.calendar.id,
                    };

                  console.log("Delete Calendar REQUEST :"+JSON.stringify(json));
                  let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_delete_calendar",json);
                  console.log ("Activate Calendar RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                  let aux_resp = response_json.data.rows ; 
                  this.showModalViewCalendar = false ; 
                  this.$emit('updateCalendarList'); 
            }
      },
       switchCalendarActive()
        {   if (this.showEdit)
            { this.form_calendar_active=!this.form_calendar_active ; }
        },

        resetForm()
        {
       
        this.form_calendar_active =  this.calendar.active

        this.specialty_code = this.calendar.specialty1  

        let aux_date_start = new Date(this.calendar.date_start) 
        //this.form_date_start =  aux_date_start.getFullYear()+"-"+String(aux_date_start.getMonth()+1).padStart(2,0)+"-"+String(aux_date_start.getDate()).padStart(2,0)  ;
        this.form_date_start = this.calendar.date_start 

        let aux_date_end = new Date(this.calendar.date_end)
        //this.form_date_end   =  aux_date_end.getFullYear()+"-"+String(aux_date_end.getMonth()+1).padStart(2,0)+"-"+String(aux_date_end.getDate()).padStart(2,0)  ;
       this.form_date_end = this.calendar.date_end
       
       //SET TIME START & END 
        let aux = this.calendar.start_time.split(':')
        this.form_start_hour = aux[0]  
        this.form_start_minutes = aux[1] 

        let aux2 = this.calendar.end_time.split(':')
        this.form_end_hour = aux2[0]  
        this.form_end_minutes = aux2[1] 
        //****************** */

        this.form_app_duration = this.calendar.duration  
        this.form_app_time_between = this.calendar.time_between  

        //color
        this.form_calendar_color = this.calendar.color  ;
        //Day Recurrency
        this.form_recurrency_mon = this.calendar.monday  
        this.form_recurrency_tue = this.calendar.tuesday 
        this.form_recurrency_wed = this.calendar.wednesday 
        this.form_recurrency_thu = this.calendar.thursday
        this.form_recurrency_fri = this.calendar.friday 
        this.form_recurrency_sat = this.calendar.saturday 
        this.form_recurrency_sun = this.calendar.sunday 
                
        this.calendar_active = this.calendar.active      
        this.name = this.calendar.name ;

        console.log("calendar_professional :  this.calendar.date_start : "+ this.calendar.date_start )
        console.log("calendar_professional :  this.calendar.date_end   : "+ this.calendar.date_end   )
        
        console.log("calendar_professional :  this.form_date_start : "+  this.form_date_start )
        console.log("calendar_professional :  this.form_date_end   : "+  this.form_date_end   )
        },

        evaluateCalendarStatus(date_end)
        {
          let aux_date_end=new Date(date_end);
          let aux_date_current = new Date ();
          aux_date_current.setHours(0,0,0);

          console.log("aux_date_end "+aux_date_end)
          console.log("aux_date_current "+aux_date_current)
            if (aux_date_end < aux_date_current)
            {
              //Expired
              return 3 ;
            }
        },

        idSpecialty2name(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },


        async saveCalendarChanges()
        {
          console.log("Save Calendar Changes");
          
           var r =confirm("¿ Esta seguro que desea Actualizar este Calendario? Ok para continuar");
            if (r == true) {

                let end_date_corrected = new Date(this.form_date_end)
                end_date_corrected.setHours(24,0,0,0)
                end_date_corrected = new Date(end_date_corrected.getTime()-3)
                //one milisecond to dont reach next day
               // var day = (60 * 60 * 24 * 1000 )-1000;
               // end_date_corrected = new Date(end_date_corrected.getTime() + (day*2) )  
                
                let start_date_corrected = new Date(this.form_date_start)
                start_date_corrected.setHours(0,0,0,0)

                  const json = { 
                   
                    form_calendar_active : this.form_calendar_active  ,
                    // form_center_id : 
                    // cernter_name
                    form_date_start : start_date_corrected  ,
                    form_date_end : end_date_corrected ,
                    form_time_start : this.form_start_hour +":"+this.form_start_minutes ,
                    form_time_end : this.form_end_hour +":"+this.form_end_minutes, 
                    
                    form_day_mon: this.form_recurrency_mon ,
                    form_day_tue: this.form_recurrency_tue ,
                    form_day_wed: this.form_recurrency_wed ,
                    form_day_thu: this.form_recurrency_thu ,
                    form_day_fri: this.form_recurrency_fri ,
                    form_day_sat: this.form_recurrency_sat ,
                    form_day_sun: this.form_recurrency_sun , 
                     
                   // professional_id: this.session_params.professional_id ,
                    calendar_id : this.calendar.id,
                    form_color : this.form_calendar_color
                    };

                  console.log("Delete Calendar REQUEST :"+JSON.stringify(json));
                  let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_update_calendar",json);
                  console.log ("Update Calendar RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                  let aux_resp = response_json.data.rows ; 
                  this.showModalViewCalendar = false ; 
                  this.$emit('updateCalendarList'); 
            }

        },



    }
}
</script>

