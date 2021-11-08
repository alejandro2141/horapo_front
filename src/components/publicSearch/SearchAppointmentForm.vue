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
                <!--
                <div class="row  mb-1 ">
                    <div class="col">
                         <inputFormInsuranceList position="true"  v-on:selectedInsuranceCode="selectedInsuranceCode"> </inputFormInsuranceList>
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
            form_specialty_code : null,
            form_comuna_code  : null,
            form_insurance_code : null,

            insurance_list : [],
            comuna_list : [],
            specialty_list : [ ] ,
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
        console.log("Specialty Code:"+code);
        this.form_specialty_code = code;
        },

        selectedInsuranceCode(code)
        {
        console.log("Insurance Code:"+code);
        this.form_insurance_code = code;
        },

        //SEND FORM 
        sendFormSearch(){
            const params = { 
				// agenda_id : this.par_agenda_id ,			 
				 specialty : this.form_specialty_code ,
                 comuna : this.form_comuna_code ,
                 insurance : this.form_insurance_code ,
                  		  };

            this.$emit("searchAppointments",params );
            }
        },

}
</script>