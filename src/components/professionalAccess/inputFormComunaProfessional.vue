<script setup>
import { ref } from 'vue'
import axios from 'axios';
//import { GLOBAL_COMUNAS } from '../../../config123.js' 


</script>

<template>
       <div class="" >

            <div class="text-start" v-for="(comuna) in comuna_list" :key="comuna.id"  > <i class="bi bi-heart-fill"></i> {{ comuna.name }}  
            </div>
            <p class="text-danger  text-end"  @click="comuna_list.pop()">Eliminar</p>


            <div class="row" style="--bs-gutter-x: 0rem ; margin-right: 0rem ; margin-left: 0rem ">
            
                <div class="col " style="position: relative;" >

                    <div  style="position: absolute; z-index: 9; top : 6px ; left : 3px " class="mb-2  rounded" > 
                        <i class="display-6  bi bi-search  text-muted m-0"  ></i>
                    </div>

                    <div>
                        <input style=" z-index: 9;  padding-left : 40px ;" type="text" class="form-control form-control-lg border  "   :class="{ 'pl-2' : true , 'border-success' : ready_input , 'border-primary' : !ready_input ,  'text-success' : ready_input  }" v-model="form_comuna" id="form_comuna" name="form_comuna"   placeholder="Comuna" >
                    </div>
                    
                    <div  style="position: absolute; z-index: 9; top : 1px ; right : 3px " class="mb-2  rounded" > 
                        <i class="display-2 m-1  bi bi-x  text-muted" @click="form_comuna = null; ready_input = false ;   " ></i>
                    </div>

                </div>    

                <div >
                     <div class="h3 m-3 text-primary " v-for="location in location_filtered" :key="location.id" > 
                        <div @click="addComuna2list(location)">
                             <i class="display-6  text-muted" ></i> - {{ location.name }} 
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
            form_comuna : null ,
            comuna_list : [] ,
            ready_input : false ,
            display_error : false  ,
            location_filtered : []  , 
            clearfiltered : false ,
        }
    },  
 
   props: ['global_comunas'], 
   emits: ["selectedComunas"],

mounted() {   
       //this.getComunaList();
      // console.log("BKND GLOBAL COMUNA APP.CONFIG="+JSON.stringify( GLOBAL_COMUNAS )) ;
       //this.comuna_list =  this.GLOBAL_COMUNAS ;
       },

    watch: {

           
            //WATCHER PREDICTOR COMUNA
            form_comuna(value, oldValue) 
            {
                    if (value !=null && value.length >= 0 &&  !this.clearfiltered)
                    {
                        value = value.charAt(0).toUpperCase() + value.slice(1) ; 

                        console.log("Text Location to search "+value);
                        let tempfiltered = this.global_comunas.filter(item => item.name.substring(0,value.length)  ===  value ).sort((a, b) => (a.name > b.name) ? 1 : -1);
                        if (tempfiltered.length >= 1 )
                            {
                            this.location_filtered = tempfiltered;
                            }
                        else
                        {
                            //this.location_filtered = null ;  
                        }         
                    }
                    else
                    {
                    // this.ready_input = false;
                    this.location_filtered = null
                    this.clearfiltered = false ; 
                    }  
            },

        },

    methods: {
        addComuna2list(comuna){
            console.log("comuna selected "+JSON.stringify(comuna));
            this.form_comuna = comuna.name ;  
           
                if (this.comuna_list.find(elem => elem.id ==  comuna.id  ) == null )
                    {      
                            this.comuna_list.push(comuna) ;
                            this.clearfiltered = true ;
                            this.$emit('selectedComunas',JSON.stringify(this.comuna_list )); 
                    }
                else { console.log("Skip duplicated Value Specialty"); 
                    }

           
            },

        /*
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
            */
        },


}

</script>