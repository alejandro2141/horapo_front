<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { BKND_CONFIG } from '../../../config123.js' 

</script>

<template>
        <div class="" >
            <div class="row" style="--bs-gutter-x: 0rem ; margin-right: 0rem ; margin-left: 0rem ">

                <div class="col" style="position: relative;" >

                    <div  style="position: absolute; z-index: 9; top : 7px ; left : 3px " class="mt-0  rounded" > 
                            <i class="display-6 bi bi-vector-pen text-muted  "></i>
                    </div>

                    <div>
                        <input autocomplete="off" autocorrect="off" type="text" style=" z-index: 9;  padding-left : 40px ; padding-right : 50px; border-radius: 25px;"  class="form-control form-control-lg border " :class="{'border-success' : ready_input , 'border-primary' : !ready_input , 'text-success' : ready_input }" v-model="form_specialty" id="form_specialty" name="form_specialty" placeholder="Psicologia, Kinesiología, Nutri..." aria-label=".form-control-lg example"  >
                    </div>
                    
                     <div  style="position: absolute; z-index: 9; top : 1px ; right : 3px " class="mb-2  rounded" > 
                        <i class="display-2 m-1  bi bi-x  text-muted border-start"  @click="form_specialty = null; display_error = false ; $emit('selectedSpecialtyCode', null) " ></i>
                    </div>
                    
                </div> 
                
                <div>
                     <div class=" h3 m-0 p-2 text-primary " v-for="specialty in specialty_filtered" :key="specialty.id" > 
                        <div  @click="form_specialty = specialty.name ; $emit('selectedSpecialtyCode', specialty); clearfiltered = true ; ">
                             <i class="display-6  text-muted" ></i> <i class="bi bi-vector-pen text-black-50 border-start"></i> {{ specialty.name }} 
                        </div>
                     </div>
                </div>   
               
            </div>
        </div>
</template>

<style scoped>

</style>


<script>
//const showForm = ref(false)

export default {
 data : function() {
        return {
            form_specialty  : null,
            specialty_list : [],
            specialty_filtered : [],
            display_error : false ,
            ready_input : false , 
            clearfiltered : false ,  
        }
    },  
    props: ['global_specialties'], 
    emits: ["selectedSpecialtyCode"],

beforeCreate() {},
created() {
  // this.getSpecialtyList() ;
},
mounted(){
    console.log("INPUT global_specialties="+this.global_specialties); 
},

watch: {
    //WATCHER PREDICTOR SPECIALTY
    form_specialty(value, oldValue) {
        if (value !=null && value.length >= 0 && !this.clearfiltered )
        {
            value = value.charAt(0).toUpperCase() + value.slice(1) ; 

            console.log("Text to search "+value);
            let tempfiltered = this.global_specialties.filter(item => item.name.substring(0,value.length)  ===  value );
            if (tempfiltered.length >= 1 )
                {
                this.specialty_filtered = this.global_specialties.filter(item => item.name.substring(0,value.length)  ===  value ).sort((a, b) => (a.name < b.name) ? 1 : -1);
                //this.specialty_filtered.sort() ;  
                }
            else
             {
               
             }         
        }
        else
        {
           // this.ready_input = false;
           this.specialty_filtered = null
           this.clearfiltered = false ; 
        }        

    },

    },//end watch

    methods: {
        async  getSpecialtyList() {
            console.log ("GET SPECIALTY LIST METHOD"); 
				const json = { 
				 nodata : 'nodata' ,
				   		  };
				console.log ("getSpecialtyList REQUEST :"+ JSON.stringify(json)  );
				let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/common_get_specialty_list",json);
				console.log ("getSpecialtyList RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
				this.specialty_list = response_json.data.rows;	
                this.specialty_list.sort();	
                console.log("Specialty list: "+JSON.stringify(this.specialty_list) );
            },
        },

}
</script>