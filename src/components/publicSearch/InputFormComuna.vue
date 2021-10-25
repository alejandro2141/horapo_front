<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { BKND_CONFIG } from '../../../config123.js' 


const count = ref(0)
</script>

<template>
       <div class="" >
            <div class="row" style="--bs-gutter-x: 0rem ; margin-right: 0rem ; margin-left: 0rem ">
            
                <div class="col " style="position: relative;" >

                    <div  style="position: absolute; z-index: 9; top : 1px ; left : 3px " class="mb-2  rounded" > 
                        <i class="display-6  bi bi-search  text-muted" ></i>
                    </div>

                    <div>
                        <input style=" z-index: 9;  padding-left : 50px ;" type="text" class="form-control form-control-lg border  "   :class="{ 'pl-2' : true , 'border-success' : ready_input , 'border-primary' : !ready_input ,  'text-success' : ready_input  }" v-model="form_comuna" id="form_comuna" name="form_comuna"   placeholder="Ubicacion/Comuna" >
                    </div>
                    
                    <div  style="position: absolute; z-index: 9; top : 1px ; right : 3px " class="mb-2  rounded" > 
                        <i class="display-2 m-1  bi bi-x  text-muted" @click="form_comuna = null; ready_input = false ; $emit('selectedComunaCode', null); " ></i>
                    </div>

                </div>    

                <div >
                     <div class="h3 m-3 text-primary " v-for="location in location_filtered" :key="location.id" > 
                        <div @click="this.form_comuna = location.name ;  $emit('selectedComunaCode', location.id ); this.clearfiltered = true">
                             <i class="display-6   bi bi-search  text-muted" ></i> {{ location.name }} 
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
import searchAppointmentForm  from './SearchAppointmentForm.vue'

export default {
   data : function() {
        return {
            form_comuna : null ,
            comuna_list : [] ,
            ready_input : false ,
            display_error : false  ,
            location_filtered : []  , 
            clearfiltered : false ,
        }
    },  
 
   props: [], 
   emits: ["selectedComunaCode"],

mounted() {   
        this.getComunaList();
        },

    watch: {
        //WATCHER PREDICTOR COMUNA
            form_comuna(value, oldValue) {

                    if (value !=null && value.length >= 0 &&  !this.clearfiltered)
                    {
                        console.log("Text Location to search "+value);
                        let tempfiltered = this.comuna_list.filter(item => item.name.substring(0,value.length)  ===  value );
                        if (tempfiltered.length >= 1 )
                            {
                            this.location_filtered = tempfiltered;
                            }
                        else
                        {
                            this.location_filtered = null ;  
                        }         
                    }
                    else
                    {
                    // this.ready_input = false;
                    this.location_filtered = null
                    }  
              },
        },

    methods: {
        async  getComunaList() {
                console.log ("GET COMUNA LIST METHOD"); 
                    const json = { 
                     nodata : 'nodata' ,
                                 };
                    console.log ("getComunaList REQUEST :"+ JSON.stringify(json)  );
                    let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/common_get_comuna_list",json);
                    console.log ("getComunaList RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                    this.comuna_list = response_json.data.rows;		
                    console.log("getComunaList list: "+JSON.stringify(this.comuna_list) );
                },

        },


}

</script>