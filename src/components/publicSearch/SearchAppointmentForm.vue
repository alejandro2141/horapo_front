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

<!-- FORM INPUT LOCATION-->
                <div  v-if="show_input_date()"  class="row  mb-1   "  >
                    <div class="col">
                        <inputFormComuna position="true"  v-on:selectedComunaCode="selectedComunaCode" :global_comunas="global_comunas" > </inputFormComuna>
                    </div>
                </div>

<!-- FORM INPUT DATE -->
                <div v-if="show_input_date()"  class="row  mb-1  ">
                    <div class="col">
                        <input style="border-radius: 25px;" v-model="form_current_date" :min="form_minimum_date" type="date" id="app_date" name="app_date" class="form-control form-control-lg border border-primary" >
                    </div>
                </div>
                 
<!--FORM INPUT  APP TYPE -->
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

                </form> 
               
            </div>	
            <hr>
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
    }
  },

 props: [ 'global_specialties','global_comunas', 'currentDate','n_app_filtered' ], 
 emits: [ 'searchBySpecialty','searchByTypeCenter','searchByTypeHome' ,'searchByTypeRemote' ,'searchByLocation' ,'searchByDate' ],
 
   created () {    
       //TODO DEBERIA SER YEAR MONT DAY LOCAL TIME
        this.form_minimum_date = new Date().toISOString().split('T')[0] ;
        this.form_current_date = new Date()
        },

    methods: {

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
            if (this.form_specialty != null)
            {
            this.$emit("searchByDate",search_params );
            }
        },          

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

    },



}
</script>