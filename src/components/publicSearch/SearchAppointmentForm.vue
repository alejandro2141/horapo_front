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
                   
                <div class="w-100 mb-1">
                    <div class="">
                        <inputFormSpecialty  v-on:selectedSpecialtyCode="selectedSpecialtyCode" :global_specialties="global_specialties" > </inputFormSpecialty> 
                    </div>
                </div>
                
                <div class="row  mb-1  border-secondary ">
                    <div class="col">
                        <inputFormComuna position="true"  v-on:selectedComunaCode="selectedComunaCode" :global_comunas="global_comunas" > </inputFormComuna>
                    </div>
                </div>

                <div class="bg-white">
                    <div class="d-flex justify-content-around h3"> 
                        <!-- <div><i class="bi bi-camera-video"></i> </div> -->
                        <div><i class="bi bi-building"></i> </div>
                        <div><i class="bi bi-house-door"></i> </div>
                    </div>
                    <div class="d-flex justify-content-around h1 m-0 p-0"> 
                       <!-- <div><input class="form-check-input border-primary" type="checkbox" id="inlineCheckbox1" value="true" v-model="form_app_type_remote" ></div> -->
                        <div><input class="form-check-input border-primary" type="checkbox" id="inlineCheckbox1" value="true" v-model="form_app_type_center"></div>
                        <div><input class="form-check-input border-primary" type="checkbox" id="inlineCheckbox1" value="true" v-model="form_app_type_home"></div>
                    </div>
                    <div class="d-flex justify-content-around h6"> 
                        <!-- <div>Tele Atención</div> -->
                        <div>En Consulta </div>
                        <div>A Domicilio</div>
                    </div>
                </div>
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
                <div class="text-center">
                <button type="button" v-on:click="sendFormSearch()" class="btn btn-primary btn-lg m-2"> Buscar una Hora</button>
                </div>
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
            form_comuna_code  : null,
            form_insurance_code : null,

            insurance_list : [],
            comuna_list : [],
            specialty_list : [ ] ,

            form_app_type_home : false ,
            form_app_type_center : false ,
            form_app_type_remote : false ,
    }
  },

 props: ['global_specialties','global_comunas'], 

   mounted () {    
        },

    watch: {
        },

    methods: {
        //V-ON to capture selection 
        selectedComunaCode(code)
        {
        console.log("Comuna Code:"+code);
        this.form_comuna_code = code;
        },

        selectedSpecialtyCode(code)
        {
        console.log("Specialty Code:"+JSON.stringify(code));
        this.form_specialty = code;
        },

        selectedInsuranceCode(code)
        {
        console.log("Insurance Code:"+code);
        this.form_insurance_code = code;
        },

        //SEND FORM 
        sendFormSearch(){
           
            const search_params = { 
				// agenda_id : this.par_agenda_id ,			 
				 specialty : this.form_specialty ,
                 comuna : this.form_comuna_code ,
                 type_home : this.form_app_type_home,
                 type_center : this.form_app_type_center,
                 type_remote : this.form_app_type_remote,
                  		  };

            this.$emit("searchAppointments",search_params );
            }

        },

}
</script>