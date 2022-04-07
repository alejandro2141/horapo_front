<script setup>
import { ref } from 'vue'
//const showForm = ref(false)
import inputFormSpecialty  from './InputFormSpecialty.vue'
import inputFormComuna  from './InputFormComuna.vue'

</script>

<template>
      <div class="container" style="padding-right: 0 ;padding-left: 0 ; " >

            <div id="formSearch" class="mx-auto "  >
                <form autocomplete="off" >


                <input  v-model="form_token" id="form_token" name="form_token" type="hidden"  > 

<!--FORM INPUT SPECIALTY -->                   
                <div v-if="show_input_specialty()"  class="w-100 mb-1"  >
                    <div class="">
                        <inputFormSpecialty  v-on:selectedSpecialtyCode="selectedSpecialtyCode" :global_specialties="global_specialties" > </inputFormSpecialty> 
                    </div>
                </div>
               
<!--FORM INPUT  APP TYPE -->
                <div v-if="show_app_type()" class=" border border-primary mb-1" style=" border-radius: 15px;"  >
                    
                    <button type="button" @click="selectedTypeCenter()" class="m-1 p-1  btn btn-outline-primary border-2 " :class="{ 'active' : form_app_type_center }" style="border-color: #781ED1; border-radius: 15px;" > 
                        <i  class="h5 bi bi-building m-0 p-0"></i><br>
                       <text class="m-0 p-0"> Consulta </text>  
                    </button>

                    <button type="button" @click="selectedTypeHome()"  class="m-1 p-1 btn btn-outline-primary border-2" :class="{ 'active' : form_app_type_home }" style="border-color:#3399FF; border-radius: 15px;" > 
                        <i class="h5 bi bi-house-door m-0 p-0"></i><br>
                        <text> Domicilio </text> 
                    </button>

                    <button type="button" @click="selectedTypeRemote()"  class="m-1 p-1 btn btn-outline-primary border-2" :class="{ 'active' : form_app_type_remote }"  style="border-color:#b36b00; border-radius: 15px; " > 
                       <i class="h5 bi bi-camera-video m-0 p-0"></i><br>
                       <text> Remota </text> 
                    </button>
                   
                </div>

<!-- FORM INPUT LOCATION-->
                <div   class="row  mb-1  border-secondary " :style="{visibility: show_input_location() ? 'visible' : 'hidden'}"  >
                    <div class="col">
                        <inputFormComuna position="true"  v-on:selectedComunaCode="selectedComunaCode" :global_comunas="global_comunas" > </inputFormComuna>
                    </div>
                </div>

<!-- FORM INPUT DATE -->
                <div v-if="show_input_date()"  class="row  mb-1  border-secondary ">
                    <div class="col">
                        <input style="border-radius: 25px;" v-model="form_current_date" :min="form_minimum_date" type="date" id="app_date" name="app_date" class="form-control form-control-lg border border-primary" >
                    </div>
                </div>
                 
            <!--
                <button type="button" @click="form_app_type_center=!form_app_type_center ; form_app_type_home= false" class=" m-1 btn"  :class="{ 'btn-primary' : form_app_type_center , 'btn-secondary' : !form_app_type_center , 'btn-lg' : form_app_type_center }" >  En Consulta  </button>
                <button type="button" @click="form_app_type_home=!form_app_type_home ; form_app_type_center= false "     class=" m-1 btn " :class="{ 'btn-primary' : form_app_type_home   , 'btn-secondary' : !form_app_type_home , 'btn-lg' : form_app_type_home     }" > A Domicilio </button>
            --> 
           


                <!--
                <div class="bg-white  ">
                    <div class="d-flex justify-content-around h5  "> 
            
                        <div><i class="bi bi-building"></i>En Consulta </div>
                        <div><i class="bi bi-house"></i>A Domicilio </div>
                    </div>
                    <div class="d-flex justify-content-around h1 m-0 p-0 "> 
                         <div><input class="form-check-input border-primary" type="checkbox" id="inlineCheckbox1" value="true" v-model="form_app_type_center"></div>
                        <div><input class="form-check-input border-primary" type="checkbox" id="inlineCheckbox1" value="true" v-model="form_app_type_home"></div>
                    </div>
                
                </div>
                -->
                <!--
                <div @click="form_home_visit = !form_home_visit"  class="bg-white  border border-primary text-primary rounded d-flex justify-content-between form-control form-control-lg border">
                    <div>Visita a Domicilio <i class="bi bi-house-door"></i> </div>
                    <div></div>
                    <div v-if="form_home_visit != null"> 
                        <div v-if="form_home_visit"  > <b> SI </b> </div>
                        <div v-if="!form_home_visit" > <b> NO </b> </div>
                    </div>
                    <div v-else> 
                        ---
                    </div>
                </div>
                -->

                <p></p>
                <!--
                <div class="text-center">
                <button type="button" v-on:click="sendFormSearch()" class="btn btn-primary btn-lg m-2">  <i class="display-6  bi bi-search   m-0"  ></i> Buscar una Hora</button>
                </div>
                -->
             <!--       <i  type="submit" v-on:click="sendFormSearch()" class="btn  btn-lg btn-block text-white bg-dark " style="width: 100%;"  >{{ search_button_message }}</i>-->
                </form> 
               
            </div>	
        </div>			

</template>

<style scoped>

</style>


<script>

export default {
 data : function() {
    return {
            search_button_message: "Buscar " ,

            form_token : null,
            form_specialty : null,
            form_location_code  : null,
            form_insurance_code : null,

            form_minimum_date : null,
            form_current_date : null,
            
            insurance_list : [],
            comuna_list : [],
            specialty_list : [ ] ,

            form_app_type_home : false ,
            form_app_type_center : false ,
            form_app_type_remote : false ,

            

           // form_date : "30/12/2021" , 
    }
  },

 props: [ 'global_specialties','global_comunas', 'currentDate','n_app_filtered' ], 
 emits: [ 'searchBySpecialty','searchByTypeCenter','searchByTypeHome' ,'searchByTypeRemote' ,'searchByLocation' ,'searchByDate' ],
 


   created () {    
        this.form_minimum_date = new Date().toISOString().split('T')[0] ;
        this.form_current_date = new Date().toISOString().split('T')[0] ; 
        },

 

    methods: {

        show_input_specialty()
        {   
            return true 
        },
        
        show_app_type()
        {   if ( this.form_specialty != null  )
            { return true } 
            else
            { return false }
        },

        show_input_location()
        {   if ( this.form_specialty != null )
            { return true } 
            else
            { return false }
        },

        show_input_date()
        {   if ( this.form_specialty != null  )
            {   return true } 
            else
            { return false }
        },



//SELECTED IN FORM TO EMIT  FOR SEARCH 
        //SELECTED SPECIALTY comes from V-ON event component
        selectedSpecialtyCode(code)
        {
        console.log("Specialty Code:"+JSON.stringify(code));
        this.form_specialty = code;
        
            this.form_app_type_center=false ;
            this.form_app_type_home=false; 
            this.form_app_type_remote=false;

        const search_params = { 
				 specialty : this.form_specialty ,
                 date :  this.form_current_date ,  
                  		  };
        this.$emit("searchBySpecialty",search_params );
        },

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
        //SELECTED COMUNA 
        selectedComunaCode(code)
        {
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
        },
        //SELECTED DATE 
        selectedDate(date)
        {
                const search_params = { 
				        specialty : this.form_specialty ,
                        type_center : this.form_app_type_center,
                        type_home : this.form_app_type_home,
                        type_remote : this.form_app_type_remote,
                    //   app type no set
                        location : this.form_location_code ,
                        date :  date ,  
                  		  };
            this.$emit("searchByDate",search_params );
        },
       
/*
        //SEND FORM 
        sendFormSearch(){
           
            const search_params = { 
				// agenda_id : this.par_agenda_id ,			 
				 specialty : this.form_specialty ,
                 comuna : this.form_comuna_code ,
                 type_home : this.form_app_type_home,
                 type_center : this.form_app_type_center,
                 type_remote : this.form_app_type_remote,
                 date :  this.form_current_date ,  
                  		  };
            
            this.$emit("searchAppointments",search_params );

                this.form_app_type_home = false ; 
                this.form_app_type_center = false ; 
                this.form_app_type_remote = false ; 

            }
            */
            

        },
    
    watch : {
        
        form_current_date(newValue, oldValue)
        {
            console.log("DATE  CHANGE :"+ oldValue+ " To New Value : "+newValue );
            if (newValue !=null)
            {  
                this.selectedDate(newValue)
            }
        },
        
        /*
        form_app_type_center(newValue){
            this.$emit("form_app_type_center_emit",newValue );
        },
         
        form_app_type_home(newValue){
            this.$emit("form_app_type_home_emit",newValue );
        },
         
        form_app_type_remote(newValue){
            this.$emit("form_app_type_remote_emit",newValue );
        },
        */  

    },



}
</script>