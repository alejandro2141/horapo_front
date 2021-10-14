<script setup>
import { ref } from 'vue'
import axios from 'axios';

defineProps({
  msg: String,
  position : String
})

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
             form_comuna  : null,
            comuna_list : [],
            ready_input : false,
            display_error : false,
            
        }
    },  
    
  beforeUpdate () {    
        this.getComunaList();
        },

    watch: {
        //WATCHER PREDICTOR COMUNA
            form_comuna(value, oldValue) {
                if (value !=null )
                {

                    //i get text behind cursor: 
                    let textToSearch= this.form_comuna.substring(0, document.getElementById('form_comuna').selectionStart ) ;
                    //capitalize Text To Search
                    //textToSearch = textToSearch.charAt(0).toUpperCase() + textToSearch.slice(1).toLowerCase();
                    
                    var separateWord = textToSearch.toLowerCase().split(' ');
                    for (var i = 0; i < separateWord.length; i++) {
                        if (separateWord[i].length > 1 )
                        { 
                            separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
                            separateWord[i].substring(1);
                        }
                    }
                    textToSearch=separateWord.join(' ');
                    console.log ("Start CursorPosition:"+document.getElementById('form_comuna').selectionStart+" textToSearch("+textToSearch+")   Value="+value+"   oldValue="+oldValue);
                    if (oldValue === null) { oldValue = " " ;}
                    
                    
                    
                    let result = this.comuna_list.filter(item => item.name.substring(0,textToSearch.length)  ===  textToSearch );
                    //result contain an array with match 
                    if (result.length >0 && textToSearch.length>0  )
                    {console.log("MATCH!!  ("+textToSearch+")  Match to:"+result[0].name);
                        //check if both are diferent
                        if (textToSearch.localeCompare(result[0].name) != 0 )
                        { console.log("Text to search ("+textToSearch+") not equal to: "+result[0].name+" Comparison result="+textToSearch.localeCompare(result[0].name) );
                                
                                //si nuevo valor es mayor que el antiguo
                                if (value.length > oldValue.length )
                                {
                                console.log("replacing FORM value to :"+result[0].name);
                                //before replace save cursor
                                this.cursor_position=textToSearch.length
                                this.form_comuna=result[0].name; 
                                this.ready_input=true; 
                                }
                                else{
                                    console.log("No reemplaza, OLD > NEW ");
                                    this.$emit("selectedComunaCode", null); 
                                    this.ready_input=false;
                                    //this.result= null;
                                   
                                }
                        }
                        else
                        {
                            console.log("BUTE are the same, skip replacing. Comparison result="+textToSearch.localeCompare(result[0].name));
                            console.log("Moving Cursor to cursor_position stored before replace:"+this.cursor_position);
                            document.getElementById('form_comuna').selectionStart = this.cursor_position ;
                            document.getElementById('form_comuna').selectionEnd = this.cursor_position ;
                            this.ready_input=false;
                        }
                        
                        this.$emit("selectedComunaCode",result[0].id); 
                        this.ready_input=true; 
                        this.message_error=null ;
                    }
                    else {console.log("No Match!! Do Nothing testToSearch("+textToSearch+") " );
                    this.form_comuna=textToSearch ;
                    this.$emit("selectedComunaCode", null); 
                    this.ready_input=false;
                    this.message_error="Comuna no Existe" ; 
                    //We should deleete all letters ahead. 
                    }

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