<script setup>
import { ref } from 'vue'
//const showForm = ref(false)
import inputFormSpecialty  from './InputFormSpecialty.vue'
import inputFormComuna  from './InputFormComuna.vue'
import specialtyCircle from './SpecialtyCircle2.vue'
import appTypeCircle from './AppTypeCircle.vue'
import Datepicker from 'vuejs3-datepicker';

</script>

<template>
      <div class="container"  >

           <div id="formSearch" class="mx-auto "  >
                <form autocomplete="off" >
<!--FORM TYPE : CENTER,  HOME,  REMOTE -->                    
                <div class="position-relative">
                    <div class="d-flex justify-content-center mb-0 mt-0" :class="{'opacity-25': false }"  >                    
                        <appTypeCircle :appType='0' v-on:appTypeSelected="appTypeSelected" :appTypeCode="appTypeCode" ></appTypeCircle>
                        <appTypeCircle :appType='1' v-on:appTypeSelected="appTypeSelected" :appTypeCode="appTypeCode" ></appTypeCircle>
                        <appTypeCircle :appType='2' v-on:appTypeSelected="appTypeSelected" :appTypeCode="appTypeCode" ></appTypeCircle>    
                    </div>                    
                </div>
<!--
                <div class="position-relative d-flex justify-content-center mb-0 mt-0">
                    <img v-if="!search_params.type_remote && !search_params.type_home  && !search_params.type_center" src="/public/finger.png"  width="80" > 
                </div>
-->

<!--FORM INPUT SPECIALTY -->
<div class="position-relative mt-3 pb-4 mb-3" >
            <div class="w-100 mb-0  pb-0 d-flex justify-content-center">
                <specialtyCircle :specialty='global_specialties[0]'  :bgcolor='circleColors[0]'  :specialtyTextColor='specialtyTextColors[0]'  v-on:specialtySelected="specialtySelected" :code="search_params.specialty" > </specialtyCircle>
                <specialtyCircle :specialty='global_specialties[1]'  :bgcolor='circleColors[1]'  :specialtyTextColor='specialtyTextColors[1]'  v-on:specialtySelected="specialtySelected" :code="search_params.specialty" > </specialtyCircle>
                <specialtyCircle :specialty='global_specialties[2]'  :bgcolor='circleColors[2]'  :specialtyTextColor='specialtyTextColors[2]'  v-on:specialtySelected="specialtySelected" :code="search_params.specialty" > </specialtyCircle>
            </div>
            <div class="w-100 mt-0 pt-0 d-flex justify-content-center">
                <specialtyCircle :specialty='global_specialties[3]'  :bgcolor='circleColors[3]'  :specialtyTextColor='specialtyTextColors[3]' v-on:specialtySelected="specialtySelected" :code="search_params.specialty" > </specialtyCircle>
                <specialtyCircle :specialty='global_specialties[4]'  :bgcolor='circleColors[4]'  :specialtyTextColor='specialtyTextColors[4]' v-on:specialtySelected="specialtySelected" :code="search_params.specialty"> </specialtyCircle>
           <!--  <img style="z-index: 3" v-if=" search_params.specialty ==null && (search_params.type_remote || search_params.type_home  || search_params.type_center)" src="/public/finger.png" class="position-absolute  top-50 end-0" width="80" > 
            -->
            </div>
            <div class="w-100 mt-0 pt-0  mb-0 pb-0 d-flex justify-content-center">
                <specialtyCircle :specialty='global_specialties[5]'  :bgcolor='circleColors[5]'  :specialtyTextColor='specialtyTextColors[5]' v-on:specialtySelected="specialtySelected" :code="search_params.specialty"> </specialtyCircle>
                <specialtyCircle :specialty='global_specialties[6]'  :bgcolor='circleColors[6]'  :specialtyTextColor='specialtyTextColors[6]' v-on:specialtySelected="specialtySelected" :code="search_params.specialty"> </specialtyCircle>
                <specialtyCircle :specialty='global_specialties[7]'  :bgcolor='circleColors[7]'  :specialtyTextColor='specialtyTextColors[7]' v-on:specialtySelected="specialtySelected" :code="search_params.specialty"> </specialtyCircle>
            </div>

            <!--
            <div class="w-100 mb-0  pb-0 d-flex justify-content-center">
                <specialtyCircle :specialty='global_specialties[0]'  > </specialtyCircle>
                <specialtyCircle @click="specialtySelected(global_specialties[1]); circleColors[1]='blue' ;  " :specialty='global_specialties[1]' :color='circleColors[1]'    :textColor='textColors[1]' > </specialtyCircle>
                <specialtyCircle @click="specialtySelected(global_specialties[2]); circleColors[2]='#eeeeee' ;  " :specialty='global_specialties[2]' :color='circleColors[2]' :textColor='textColors[2]' > </specialtyCircle>
            </div>
            <div class="w-100 mt-0 pt-0 d-flex justify-content-center">
                <specialtyCircle @click="specialtySelected(global_specialties[3]); circleColors[3]='#eeeeee' ; " :specialty='global_specialties[3]' :color='circleColors[3]' :textColor='textColors[3]'  > </specialtyCircle>
                <specialtyCircle @click="specialtySelected(global_specialties[4]); circleColors[4]='#eeeeee' ; " :specialty='global_specialties[4]' :color='circleColors[4]' :textColor='textColors[4]'  > </specialtyCircle>
            </div>
            <img v-if="search_params.specialty ==null && (search_params.type_remote || search_params.type_home  || search_params.type_center)" src="/public/finger.png" class="position-absolute  top-50 end-0" width="80" > 

            <div class="w-100 mt-0 pt-0  mb-0 pb-0 d-flex justify-content-center">
                <specialtyCircle @click="specialtySelected(global_specialties[5]); circleColors[5]='#eeeeee' ;  " :specialty='global_specialties[5]' :color='circleColors[5]' :textColor='textColors[5]'  > </specialtyCircle>
                <specialtyCircle @click="specialtySelected(global_specialties[6]); circleColors[6]='#eeeeee' ;  " :specialty='global_specialties[6]' :color='circleColors[6]' :textColor='textColors[6]'  > </specialtyCircle>
                <specialtyCircle @click="specialtySelected(global_specialties[7]); circleColors[7]='#eeeeee' ;  " :specialty='global_specialties[7]' :color='circleColors[7]' :textColor='textColors[7]'  > </specialtyCircle>
            </div>
            -->
</div>
<!--FORM INPUT SPECIALTY -->     

<!--       
                <div v-if="show_input_specialty()"  class="w-100 mb-1"  >
                    <div class="">
                        <inputFormSpecialty  v-on:selectedSpecialtyCode="selectedSpecialtyCode" :global_specialties="global_specialties" > </inputFormSpecialty> 
                    </div>
                </div>           
-->


<!-- FORM INPUT LOCATION-->
        
    <div class="d-flex justify-content-center mb-0 mt-0" :class="{'opacity-0': search_params.specialty==null}" >
        <div style="width: 20em;">
                <div  v-if="search_params.type_remote==null  || search_params.type_remote==false "   class="row  mb-1   "  >
                    <div class="col">
                        <inputFormComuna position="true" :setLocationCode="setLocationCode" v-on:selectedComunaCode="selectedComunaCode" :global_comunas="global_comunas" > </inputFormComuna>
                    </div>
                </div>
                <div  v-else  class="row  mb-1   "  >
                    <div class="col">
                   <!--    
                      <input  style="z-index: 9;  padding-left : 40px ; border-radius: 25px;" type="text" class="form-control form-control-lg border text-primary"   :class="{ 'pl-2' : true , 'border-success' : ready_input , 'border-white' : !ready_input ,  'text-success' : ready_input  }"  id="form_comuna" name="form_comuna"   placeholder="Todas las Comunas" >
                   -->

                   <div class="bg-white text-secondary d-flex justify-content-center border border-0 border-white" style=" z-index: 9;   border-radius: 25px;"  >
                        
                        <div class="m-0 p-2"> 
                            <text style="font-size: 1.5em;" class="">Todas las comunas</text>
                        </div>
                        
                    </div>


                    </div>
                </div>
            </div>
    </div>

<!-- FORM INPUT DATE -->
    <div class="d-flex justify-content-center mb-0 mt-2" :class="{'opacity-0': search_params.specialty==null}" >
        <div style="width: 20em;">
       
                <div  @click="show_date_picker = !show_date_picker"  >

                    <div class="d-flex justify-content-between border border-0 border-secondary  bg-success text-white" style=" z-index: 9;   border-radius: 25px;"  >
                        <div class="m-0 p-1"> 
                            &nbsp;<i class="m-0 p-0 bi display-6  bi-calendar-event"></i> 
                        </div>
                        <div class="m-0 p-2"> 
                            <text v-if="show_input_date()" style="font-size: 1.1em;" class="">
                                &nbsp;&nbsp;&nbsp; {{format_date(search_params.date)}}
                            </text>
                            <text v-else  style="font-size: 1.3em;" >
                                Fecha más Próxima
                            </text>
                        </div>
                        <div class="m-0 p-1"  > 
                            <i class="bi bi-x-lg m-0 p-0  border-start display-6"  ></i>  
                        </div>
                    </div>
                 
                </div>

                <!--DATE PICKER COMPONENT -->
                <div v-if="show_date_picker" class="text-center"> 
                        <datepicker   
                        :disabled-dates="{
                                        to: new Date(),
                                        //from: new Date(),date.setDate(date.getDate() - 1);
                                       
                                    }"
                        v-on:input="selectedDate" ref="inputRef" placeholder="YYYY-MM-DD" :monday-first="true" :inline="true" v-model="form_current_date" :calendar-button="false" input-class='bigText' format="dd"  calendar-button-icon="nada"  name="uniquename"></datepicker>
                
                
                    </div>
                <!--DATE PICKER COMPONENT -->
        </div>   
    </div>
                 
<!--FORM INPUT  APP TYPE -->
                <!--
                <div v-if="show_app_type()" class="d-flex justify-content-around   mb-1" style=" border-radius: 15px;"  >
                    
                     <text  @click="selectedTypeCenter()" class="m-1 p-1" :class="{ 'text-decoration-underline' : form_app_type_center }" style=" " > 
                        <i  class="h5 bi bi-building m-0 p-0" style="color: #781ED1;"></i>
                       <text class="m-0 p-0"> Consulta </text>  
                    </text>

                    <text  @click="selectedTypeHome()"  class="m-1 p-1 " :class="{ 'text-decoration-underline' : form_app_type_home }" style="" > 
                        <i class="h5 bi bi-house-door m-0 p-0" style="color:#3399FF;"></i>
                        <text> Domicilio </text> 
                    </text>

                    <text  @click="selectedTypeRemote()"  class="m-1 p-1 " :class="{ 'text-decoration-underline' : form_app_type_remote }"  style="" > 
                       <i class="h5 bi bi-camera-video m-0 p-0" style="color:#b36b00;"  ></i>
                       <text> Remota </text> 
                    </text>
                   
                </div>
                -->

                </form> 

               
            </div>	
            
            <div id="scrollToMe" ref="scrollToMe" class="mt-4"></div>
           
        </div>			

</template>

<style scoped>

</style>


<script>

export default {
 data : function() {
    return {
            show_date_picker : false ,
            search_button_message: "Buscar " ,

            center_color :  '#781ED1',
            home_color: '#3399FF',
            remote_color: '#b36b00',

            form_token : null,
            form_specialty : null,
            form_location_code  : null,
            form_insurance_code : null,

            form_minimum_date : null,
            form_current_date : null,  // DATE INPUT Return:  2022-10-26 
            
            insurance_list : [],
            comuna_list : [],
            specialty_list : [ ] ,
/*
            form_app_type_home : false ,
            form_app_type_center : false ,
            form_app_type_remote : false ,
*/

            setLocationCode : 1 ,
            circleColors: ['#01454f','#BC881C','#8C0241','#575757','#000080','#337686','#DDD','#0B2264','#FFF'],
            specialtyTextColors:   ['#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#111','#FFF','#FFF' ],
       
            search_params : { 
				        specialty : null ,
                        type_home : null ,
                        type_center : null ,
                        type_home : null ,
                        type_remote : null ,
                        location : null ,
                        date : null ,  
                  		  },

            appTypeCode : null ,

            el: '#app',
    }
  },

 props: [ 'global_specialties','global_comunas', 'currentDate','n_appointments_found','suggestedSearchParams' ], 
 emits: [ 'searchGeneric'  ],
 
   created () {    
       //TODO DEBERIA SER YEAR MONT DAY LOCAL TIME
        let aux_date = new Date() 
        this.form_minimum_date = aux_date.setDate(aux_date.getDate() - 1);
       // this.form_current_date = aux_date.getFullYear()+"-"+(aux_date.getMonth()+1)+"-"+aux_date.getDate()
        //this.search_params.date =   this.form_current_date 
        },

    methods: {


          format_date(date)
            {
                let aux_date = new Date(date)
                let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ]
                let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]


                return (days[aux_date.getDay()]+" "+aux_date.getDate()+" "+months[aux_date.getMonth()]+" "+aux_date.getFullYear() )
            },


        appTypeSelected(appType)
        {
           console.log("appTypeSelected:"+appType);
           this.appTypeCode = appType;

           switch (appType) {
                case 0:
                    this.search_params.type_center = true 
                    this.search_params.type_home = false 
                    this.search_params.type_remote = false  
                break;
              
                case 1:
                    this.search_params.type_center = false 
                    this.search_params.type_home = true
                    this.search_params.type_remote = false                  
                break;
              
                case 2:
                    this.search_params.type_center = false 
                    this.search_params.type_home = false 
                    this.search_params.type_remote = true 
                break;

                case null:
                    this.search_params.type_center = false 
                    this.search_params.type_home = false 
                    this.search_params.type_remote = false 
                break;
             }

             if (this.search_params.specialty != null)
             {
                this.$emit("searchGeneric",this.search_params);
             }

        },

        specialtySelected(specialty)
        {
           console.log("SearchAppointmentFOrm specialtySelected "+JSON.stringify(specialty))
          
                this.search_params.specialty = specialty
                this.$emit("searchGeneric",this.search_params);
          
          
        },

        show_input_specialty()
        {   
            return true 
        },
        
        show_app_type()
        {   if ( this.form_specialty != null   )
            { return true } 
            else
            { return false }
        },

        show_input_location()
        {   
            //return true
            /*
            if ( this.search_params.specialt != null )
            { return true } 
            else
            { return false }
            */
           if (this.n_appointments_found>0)
           {
            return true
           }
           else 
           {
            return false
           }
        },

        show_input_date()
        {   

            if (this.search_params !=null && this.search_params.date != null )
            {
                return true
            }
            else 
            {
                return false
            }
            /*
            if (this.n_appointments_found>0)
           {
            return true
           }
           else 
           {
            return false
           }
            */
            
        },

//SELECTED IN FORM TO EMIT  FOR SEARCH 
        //SELECTED SPECIALTY comes from V-ON event component
        /*
        selectedSpecialtyCode(code)
        {
        
        this.form_specialty = code;
        let aux_date = new Date(this.form_current_date)
        aux_date.setHours(24,0,0,0)
        
            this.form_app_type_center=false ;
            this.form_app_type_home=false; 
            this.form_app_type_remote=false;

        const search_params = { 
				 specialty : this.form_specialty ,
                 date :  aux_date ,  
                  		  };
        
        console.log("SearchAppointmentForm By Specialty Id:"+JSON.stringify(search_params));

        
        this.search_params.specialty = code ;
        this.$emit("searchGeneric",this.search_params);
        },
        */
        /*
        // SELECTED TYPE_CENTER
        selectedTypeCenter(){
            this.form_app_type_center=!this.form_app_type_center ;
            this.form_app_type_home=false; 
            this.form_app_type_remote=false;
                
                const search_params = { 
				        specialty : this.form_specialty ,
                        type_center : this.form_app_type_center,
                        location : this.form_location_code ,
                        date :  this.form_current_date ,  
                  		  };

            this.$emit("searchByTypeCenter",search_params );
        },
         // SELECTED TYPE_HOME
        selectedTypeHome(){
            this.form_app_type_center=false ;
            this.form_app_type_home=!this.form_app_type_home; 
            this.form_app_type_remote=false;
                
                const search_params = { 
				        specialty : this.form_specialty ,
                        type_home : this.form_app_type_home,
                        location : this.form_location_code ,
                        date :  this.form_current_date ,  
                  		  };

            this.$emit("searchByTypeHome",search_params );
        },
         // SELECTED TYPE_REMOTE
        selectedTypeRemote(){
            this.setLocationCode = Math.random()  ;
            this.form_location_code = null ; 
            this.form_app_type_center=false ;
            this.form_app_type_home=false ; 
            this.form_app_type_remote=!this.form_app_type_remote ;
                const search_params = { 
				        specialty : this.form_specialty ,
                        type_remote : this.form_app_type_remote,
                        location : this.form_location_code ,
                        date :  this.form_current_date ,  
                  		  };
            this.$emit("searchByTypeRemote",search_params );
        },
        */
        //SELECTED COMUNA 
        selectedComunaCode(code)
        {
            this.search_params.location = code 
            if (this.search_params.location !=null )
            {
            this.$emit("searchGeneric",this.search_params);
            }
            /*
            this.form_location_code = code ; 
                const search_params = { 
				        specialty : this.form_specialty ,
                        type_center : this.form_app_type_center,
                        type_home : this.form_app_type_home,
                        type_remote : this.form_app_type_remote,
                    //   app type no set
                        location : this.form_location_code ,
                        date :  this.form_current_date ,  
                  		  };
            this.$emit("searchByLocation",search_params );
            */
        },
        //SELECTED DATE 
        selectedDate(date)
        {
            console.log("SelectedDate :"+date);
            this.search_params.date = date.setHours(0,0,0,0) 
            this.$emit("searchGeneric",this.search_params);
            this.show_date_picker = false ;

            /*
                const search_params = { 
				        specialty : this.form_specialty ,
                        type_center : this.form_app_type_center,
                        type_home : this.form_app_type_home,
                        type_remote : this.form_app_type_remote,
                    //   app type no set
                        location : this.form_location_code ,
                        date :  date ,  
                  		  };
            if (this.form_specialty != null)
            {
            this.$emit("searchByDate",search_params );
            }
            */
           
        },          

    },
    
    watch : {
        /*
        suggestedSearchParams(val)
        {
           console.log("SearchAppointmentForm.  suggestedSearchParams:"+JSON.stringify(val))
           
           this.form_specialty = val.specialty ; 
        },
        */
       /*
        form_current_date(val)
        {
            this.show_date_picker = false 
        },*/
        
        form_current_date(newValue, oldValue)
        {
            console.log("watcher form_current_date vewVale:"+newValue)
            if (newValue != null)
            {  
                console.log("New FORM_CURRENT_DATE :"+newValue);
                let date = new Date(newValue)
                date.setHours(24,0,0,0)
                console.log("New FORM_CURRENT_DATE after:"+date);
                this.selectedDate(date)

                //this.search_params.date = new Date (newValue)
                this.show_date_picker = false 
            }
        },  

    },



}
</script>