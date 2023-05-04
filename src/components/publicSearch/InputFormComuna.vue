<script setup>
import { ref } from 'vue'
import axios from 'axios';
//import { GLOBAL_COMUNAS } from '../../../config123.js' 


const count = ref(0)
</script>

<template>
       <div class="" >

        
           
            <div class="row" style="--bs-gutter-x: 0rem ; margin-right: 0rem ; margin-left: 0rem ">
            
                <div class="col " style="position: relative;" >

                    <div  style="position: absolute; z-index: 9; top : 6px ; left : 3px " class="mb-2  rounded" > 
                        <i class="display-6  bi bi-geo-alt  text-muted m-0"  ></i>                        
                    </div>

                    <div>
                        <input @keyup="captureSeachLetter" style=" z-index: 9;  border-radius: 25px; text-align: center;" type="text" class="form-control form-control-lg border  text-secondary"    :class="{ 'pl-2' : true , 'border-success' : ready_input , 'border-secondary' : !ready_input ,  'text-success' : ready_input  , 'text-danger': location_filtered!=null && location_filtered.length == 0 }" v-model="form_comuna" id="form_comuna" name="form_comuna"   :placeholder="PlaceHolderInput" >
                    </div>

                    <div  style="position: absolute; z-index: 9; top : 0.5em ; right : 0.3em  " class="mb-2  rounded" > 
                        <i class="bi bi-x-lg m-0 p-0 text-muted border-start display-6" @click="form_comuna = ''; location_filtered=[]; ready_input = false ; $emit('selectedComunaCode', null);  " ></i>
                    </div>
                 

                </div>    

                <div>
                    <text v-if="location_filtered != null && location_filtered.length > 0  " class="d-flex justify-content-center">
                        Debe seleccionar alguna opcion de la lista <i class="bi bi-arrow-down"></i>
                    </text>
                    <text v-if="location_filtered != null &&  location_filtered.length == 0" class="d-flex justify-content-center text-danger">
                        Comuna no existe
                    </text>

                    
                <!--
                    <text v-if="location_filtered != null && location_filtered.length == 0 ">
                        Comuna no existe
                    </text>
                -->

                     <div class="h3 m-3 text-primary " v-for="location in location_filtered" :key="location.id" > 
                        <div @click="form_comuna = location.name ;  $emit('selectedComunaCode', location.id ); clearfiltered = true">
                             <i class="display-6  text-muted " ></i>  <small> <i class="display-6  bi bi-geo-alt  text-muted m-0"  ></i> </small> {{ location.name }} 
                        </div>
                     </div>
                </div>   
                
            </div> 
            
            
                <!--
                <div v-show="show_input_date() " @click="show_date_picker = !show_date_picker"  >

                    <div class="text-muted d-flex justify-content-between border border-1 border-secondary" style=" z-index: 9;   border-radius: 25px;"  >
                        <div class="m-0 p-1"> 
                            &nbsp;<i class="m-0 p-0 bi display-6  bi-calendar-event"></i> 
                        </div>
                        <div class="m-0 p-2"> 
                            <text style="font-size: 1.1em;" class="">&nbsp;&nbsp;&nbsp; {{format_date(search_params.date)}}</text>
                        </div>
                        <div class="m-0 p-1"  > 
                            <i class="bi bi-x-lg m-0 p-0 text-muted border-start display-6"  ></i>  
                        </div>
                    </div>
                 
                </div>
                -->

        </div>
</template>

<style scoped>

</style>


<script>
//const showForm = ref(false)

export default {
   data : function() {
        return {
            PlaceHolderInput : "Todas las Comunas" ,

            form_comuna : null,
            comuna_list : [] ,
            ready_input : false ,
            display_error : false  ,
            location_filtered : null  , 
            clearfiltered : false ,

            origComunaName :"Todas las Comunas" ,
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

                                if (this.location_filtered.length == 1 && this.location_filtered[0].name.toUpperCase() === this.form_comuna.toUpperCase())
                                {
                                    // && this.location_filtered[0]== form_comuna 
                                //    form_comuna = location.name ;  $emit('selectedComunaCode', location.id ); clearfiltered = true
                                console.log("predictor : MATCH EXACTO!!")
                                //console.log("predictor : queda solo uno!!")
                                //console.log("predictor : comparando locationFiltered:"+this.location_filtered[0].name+ " vmod form_comuna:"+this.form_comuna  )
                                this.form_comuna = this.location_filtered[0].name 
                                //this.$emit('selectedComunaCode', this.location_filtered[0].id )
                                //this.clearfiltered = true 
                                //this.location_filtered = null
                                
                                }

                            }
                        else
                        {
                            this.location_filtered = [];  
                        }         
                    }
                    else
                    {
                    // this.ready_input = false;
                    this.location_filtered = null
                    this.clearfiltered = false ; 
                    }  
                    console.log("this.location_filtered :"+JSON.stringify(this.location_filtered));

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
                    let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/common_get_comuna_list",json);
                    console.log ("getComunaList RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                    this.comuna_list = response_json.data.rows;		
                    console.log("getComunaList list: "+JSON.stringify(this.comuna_list) );
                },
            */
        },


}

</script>