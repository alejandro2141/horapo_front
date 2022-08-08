<script setup>
import { ref } from 'vue'
import axios from 'axios';

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

                <div class="bg-secondary  text-white w-100 pt-2 pl-2 pr-2">
                    <div class="m-2 ">

                    
                    <div v-if="showEdit" class="d-flex justify-content-between mt-0 p-1"> 
                        <text  @click="deleteCalendar();showEdit=false" >Eliminar <i class="bi bi-trash"></i> </text> 
                    </div>

                    <div class="d-flex justify-content-between mt-2 p-1"> 
                                                  
                        <div v-if="evaluateCalendarStatus(date_end)==3" class="bg-secondary" :class="{ 'bg-dark': showEdit }" style=" border-radius: 15px; "  >
                              <text class="text-white p-1"> Expirado <i class="text-danger display-4 bi bi-slash-circle-fill"></i> </text> 
                        </div>

                        <div v-else >
                                <text v-if="calendar_active"  >  
                                  <text class="text-white ">Encendido </text>
                                </text>
                                <text v-else > 
                                    <text class="text-white">Apagado<i class="text-danger display-4 bi bi-slash-circle-fill"></i></text>
                                </text>
                        </div>

                        <text class=""> </text>  

                        <div :class="{ 'bg-dark': showEdit }" class="text-center" style="width: 4rem; border-radius: 15px; "  >
                            <i class="display-1 text-white pl-3 pr-3" @click="switchCalendarActive()"  :class="{ 'bi bi-toggle-off':!calendar_active , 'bi bi-toggle-on':calendar_active   }"  ></i>
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
                                        
                                          <i class="bi bi-geo-alt text-white"></i> {{name}} 
                                    </div>
                                </div>
                                
                                
                                

                                    
                               
                               
            
                  <div  class="d-flex justify-content-between mt-2">
                          <text> Fecha Inicio  </text>  
                          <input :disabled="!showEdit"  type="date" :class="{ 'bg-dark border border-white': showEdit }"  class="bg-secondary border-0 text-white form-control  " id="form_phone2" name="form_phone2" v-model="date_start" style=" border-radius: 25px; width:60%;  text-align: right;  ">
                                       
                  </div>

                  <div  class="d-flex justify-content-between mt-2">
                          <text> Fecha Fin </text>  
                         
                          <input :disabled="!showEdit"  type="date" :class="{ 'bg-dark border border-white': showEdit }"  class="bg-secondary border-0 text-white form-control  " id="form_phone2" name="form_phone2" v-model="date_end" style=" border-radius: 25px; width:60%;  text-align: right; color: #fff; ">
                         
                  </div>

                  <div  class="d-flex justify-content-between mt-2">
                          <text> Hora  Inicio </text>  
                          <input :disabled="!showEdit"  type="time" :class="{ 'bg-dark border border-white': showEdit }"  class="bg-secondary border-0 text-white form-control  " id="form_phone2" name="form_phone2" v-model="start_time" style=" border-radius: 25px; width:40%;  text-align: right; ">
                         
                  </div>

                  <div  class="d-flex justify-content-between mt-2">
                          <text> Hora  Fin </text>  
                          <input :disabled="!showEdit"  type="time" :class="{ 'bg-dark border border-white': showEdit }"  class="bg-secondary border-0 text-white form-control  " id="form_phone2" name="form_phone2" v-model="end_time" style=" border-radius: 25px; width:40%;  text-align: right; ">
                  </div>

                <div  class="d-flex justify-content-between mt-2">
                          <text> Minutos de Atención </text>  
                          <input :disabled="!showEdit"  type="number" :class="{ 'bg-dark border border-white': showEdit }"  class="bg-secondary border-0 text-white form-control  " id="form_phone2" name="form_phone2" v-model="duration" style=" border-radius: 25px; width:40%;  text-align: right; ">
                
                </div>
                
                <div  class="d-flex justify-content-between mt-2">
                          <text>Minutos entre citas </text>  
                          <input :disabled="!showEdit"  type="number" :class="{ 'bg-dark border border-white': showEdit }"  class="bg-secondary border-0 text-white form-control  " id="form_phone2" name="form_phone2" v-model="time_between" style=" border-radius: 25px; width:40%;  text-align: right; ">
                
                </div>

               

                <div class="mt-1">
                  Dias Recurrencia: <br>

                <div class="d-flex justify-content-between fs-5 m-1">
                    <div class="border border-1 border-white m-1 p-1"  @click="activateMonday()" :class="{ 'bg-dark p-1': showEdit , 'border-3':monday  }" >Lu</div>
                    <div class="border border-1 border-white m-1 p-1"  @click="activateTuesday()" :class="{ 'bg-dark p-1': showEdit , 'border-3':tuesday }" >Ma</div>
                    <div class="border border-1 border-white m-1 p-1"  @click="activateWednesday()" :class="{ 'bg-dark p-1': showEdit , 'border-3':wednesday }" >Mi</div>
                    <div class="border border-1 border-white m-1 p-1"  @click="activateThursday()" :class="{ 'bg-dark p-1': showEdit , 'border-3':thursday }">Ju</div>
                    <div class="border border-1 border-white m-1 p-1"  @click="activateFriday()" :class="{ 'bg-dark p-1': showEdit , 'border-3':friday }">Vie</div>
                
                    <div class="border border-1 border-white m-1 p-1" @click="activateSaturday()" :class="{ 'bg-dark p-1': showEdit , 'border-3':saturday }">Sa</div>
                    <div class="border border-1 border-white m-1 p-1" @click="activateSunday()" :class="{ 'bg-dark p-1': showEdit , 'border-3':sunday }">Do</div>
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
                
                <div> 
                  <a class="text-white" :href="'whatsapp://send?text=http://ec2-3-143-168-51.us-east-2.compute.amazonaws.com/nested/publicSearchCalendar.html?cal_id='+calendar.calendar_id">
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
            showSocial : false ,
            showEdit : false, 

            calendar_active : null ,
            specialty_code : null, 
            name : null ,
            date_start : null ,
            date_end : null,
            time_start : null ,
            time_end : null ,
            duration : null ,
            time_between : null ,
            monday : null,
            tuesday : null ,
            wednesday : null ,
            thursday : null,
            friday : null ,
            saturday : null ,
            sunday : null, 
        }   
    },
   	
	props: [ 'calendar' , 'global_specialties' , 'global_comunas','session_params' ],
    emits: ['updateCalendarList'],

	created () {
        this.calendar_active = this.calendar.calendar_active
        this.specialty_code = this.calendar.specialty1 ; 
        
        this.name = this.calendar.name ;

        this.date_start = this.calendar.date_start.substring(0,10) ;
        this.date_end = this.calendar.date_end.substring(0,10)  ;
        this.start_time = this.calendar.start_time.substring(0,5)  ;
        this.end_time = this.calendar.end_time.substring(0,5)  ;
        this.duration = this.calendar.duration  ;
        this.time_between = this.calendar.time_between  ;
        this.monday = this.calendar.monday  ;
        this.tuesday = this.calendar.tuesday  ;
        this.wednesday = this.calendar.wednesday ;
        this.thursday = this.calendar.thursday  ;
        this.friday = this.calendar.friday  ;
        this.saturday = this.calendar.saturday  ;
        this.sunday = this.calendar.sunday  ;
    },

	methods :{

        async deleteCalendar(){
          console.log("Professional delete Calendar")
         
           var r =confirm("¿ Esta seguro que desea ELIMINAR este Calendario?  Ok para continuar");
            if (r == true) {

                  const json = { 
                   // professional_id: this.session_params.professional_id ,
                    calendar_id :  this.calendar.calendar_id,
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
            { this.calendar_active=!this.calendar_active ; }
        },

        activateMonday()
        {  if (this.showEdit)
            { this.monday=!this.monday ; }
        },
        activateTuesday()
        {  if (this.showEdit)
            { this.tuesday=!this.tuesday ; }
        },
        activateWednesday()
        {  if (this.showEdit)
            { this.wednesday=!this.wednesday ; }
        },
        activateThursday()
        {  if (this.showEdit)
            { this.thursday=!this.thursday ; }
        },
        activateFriday()
        {  if (this.showEdit)
            { this.friday=!this.friday ; }
        },
        activateSaturday()
        {  if (this.showEdit)
            { this.saturday=!this.saturday ; }
        },
        activateSunday()
        {  if (this.showEdit)
            { this.sunday=!this.sunday;  }
        },

        resetForm()
        {
        this.calendar_active = this.calendar.calendar_active
        this.specialty_code = this.calendar.specialty1 ; 

        this.date_start = this.calendar.date_start.substring(0,10) ;
        this.date_end = this.calendar.date_end.substring(0,10)  ;
        this.start_time = this.calendar.start_time.substring(0,5)  ;
        this.end_time = this.calendar.end_time.substring(0,5)  ;
        this.duration = this.calendar.duration  ;
        this.time_between = this.calendar.time_between  ;
        this.monday = this.calendar.monday  ;
        this.tuesday = this.calendar.tuesday  ;
        this.wednesday = this.calendar.wednesday ;
        this.thursday = this.calendar.thursday  ;
        this.friday = this.calendar.friday  ;
        this.saturday = this.calendar.saturday  ;
        this.sunday = this.calendar.sunday  ;
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

                  const json = { 
                    /*
                    form_calendar_active : this.calendar_active ,
                    form_center_id : this.form_center_id,
                    form_center_name : this.form_center_name,
                    form_date_start : this.form_date_start ,
                    form_date_end: this.form_date_end,
                    form_time_start: this.form_time_start,
                    form_time_end: this.form_time_end,
                    form_day_mon: this.form_day_mon ,
                    form_day_tue: this.form_day_tue ,
                    form_day_wed: this.form_day_wed ,
                    form_day_thu: this.form_day_thu ,
                    form_day_fri: this.form_day_fri ,
                    form_day_sat: this.form_day_sat ,
                    form_day_sun: this.form_day_sun , 
                    form_calendar_color : this.form_calendar_color , 

                    professional_id: this.session_params.professional_id ,
                    calendar_id :  calendar_details.calendar_id,
                    */
                    form_calendar_active : this.calendar_active ,
                    // form_center_id : 
                    // cernter_name
                    form_date_start : this.date_start  ,
                    form_date_end : this.date_end ,
                    form_time_start : this.start_time ,
                    form_time_end : this.end_time , 
                    form_day_mon: this.monday ,
                    form_day_tue: this.tuesday ,
                    form_day_wed: this.wednesday ,
                    form_day_thu: this.thursday ,
                    form_day_fri: this.friday ,
                    form_day_sat: this.saturday ,
                    form_day_sun: this.sunday , 

                   // professional_id: this.session_params.professional_id ,
                    calendar_id : this.calendar.calendar_id,
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

