<script setup>
import { ref } from 'vue'
import axios from 'axios';
//import { GLOBAL_COMUNAS } from '../../../config123.js' 

</script>

<template>
       <div class="" >
            <div class="row" style="--bs-gutter-x: 0rem ; margin-right: 0rem ; margin-left: 0rem ">
            
                <div class="col-11" style="position: relative;" >
                    <div  style="position: absolute; z-index: 9; top : 6px ; left : 3px " class="mb-2  rounded" > 
                       <!-- <i class="display-6  bi bi-geo-alt  text-muted m-0"  ></i>     -->                    
                    </div>

                    <div>
                        <input @keyup="captureSeachLetter" style=" z-index: 9;  padding-left : 10px ; border-radius: 25px;" type="text" class="form-control  border border-1 "   :class="{ 'pl-2' : true , 'border-success' : ready_input , 'border-primary' : !ready_input ,  'text-success' : ready_input  }" v-model="form_comuna" id="form_comuna" name="form_comuna"   :placeholder="PlaceHolderInput" >
                    </div>
                    
                    <div  style="position: absolute; z-index: 9; top : 1px ; right : 3px " class="mb-2  rounded" > 
                        <i class="h2 m-0  bi bi-x  text-muted border-start" @click="form_comuna = null; ready_input = false ; $emit('selectedComunaCode', null);  " ></i>
                    </div>
                </div> 
                   <!--
                <div class="col-1">
                    <i v-if="location_filtered != null" class="text-primary display-4 bi bi-plus"></i> 
                </div>
                -->

                <div class="col-12 bg-white" style="border-radius: 25px;" >
                    <!--CYCLE  -->
                     <div  v-for="location in location_filtered" :key="location.id" class="h3 m-3 text-primary " > 
                        <div class="d-flex justify-content-between" @click="form_comuna = location.name ;  $emit('selectedComunaCode', location.id ); clearfiltered = true">
                           <!--  <small><i class="display-6  bi bi-geo-alt  text-muted m-0"  ></i>  </small>-->
                            <text>{{ location.name }} </text> 
                            <i class=" display-4 bi bi-plus"></i>
                        </div>
                     </div>
                    <!-- -->
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
            PlaceHolderInput : "Comuna, Zona Geográfica" ,

            form_comuna : null,
            comuna_list : [] ,
            ready_input : false ,
            display_error : false  ,
            location_filtered : []  , 
            clearfiltered : false ,

            origComunaName :"Comuna, Zona Geografica" ,
        }
    },  
 
   props: ['global_comunas' , 'location_id' , 'setLocationCode'], 
   emits: ["selectedComunaCode"],

mounted() {   
        console.log("COMUNA ID orig:"+this.location_id);
        this.origComunaName=this.comunaId2Name(this.location_id)
        
        },

    watch: {
        //WATCHER PREDICTOR COMUNA
            setLocationCode(newVal,oldVal)
            {
                if (newVal != null)
                {
                    this.form_comuna = null
                }
            },

            form_comuna(value, oldValue) {

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
            
            
        comunaId2Name(comuna_id)
          {
            if (comuna_id != null)
            {
            let aux = this.global_comunas.find(o => o.id === comuna_id)
                if (aux != null)
                {
                    return  aux.name
                }
                else
                {
                    return "not found" ;  
                }
            }
            else
            {
            return null ; 
            }

          },

         captureSeachLetter(e)
         {
             console.log("even keyUp capture"+e.target.value )
             this.form_comuna = e.target.value 
         }

        /*
        async  getComunaList() {
                console.log ("GET COMUNA LIST METHOD"); 
                    const json = { 
                     nodata : 'nodata' ,
                                 };
                    console.log ("getComunaList REQUEST :"+ JSON.stringify(json)  );
                    let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/common_get_comuna_list",json);
                    console.log ("getComunaList RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                    this.comuna_list = response_json.data.rows;		
                    console.log("getComunaList list: "+JSON.stringify(this.comuna_list) );
                },
            */
        },


}

</script>