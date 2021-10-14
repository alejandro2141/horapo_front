<script setup>
import { ref } from 'vue'
import axios from 'axios';

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
        <div class="" >
            <div class="row" style="--bs-gutter-x: 0rem ; margin-right: 0rem ; margin-left: 0rem ">
                
               

                <div class="col" style="position: relative;" >

                    <div  style="position: absolute; z-index: 9; top : 1px ; left : 3px " class="mb-2  rounded" > 
                        <i class="display-6   bi bi-search  text-muted" ></i>
                    </div>

                    <div>
                        <input style=" z-index: 9;  padding-left : 40px ; padding-right : 50px" type="text" class="form-control form-control-lg border " :class="{'border-success' : ready_input , 'border-primary' : !ready_input , 'text-success' : ready_input }" v-model="form_specialty" id="form_specialty" name="form_specialty" placeholder="Especialidad, Psicolog.., Kinesio.." aria-label=".form-control-lg example"  >
                    </div>
                    
                     <div  style="position: absolute; z-index: 9; top : 1px ; right : 3px " class="mb-2  rounded" > 
                        <i class="display-2 m-1  bi bi-x  text-muted "  @click="form_specialty = null; display_error = false ; $emit('selectedSpecialtyCode', null); " ></i>
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
            cursor_position : 1, 
            display_error : false ,
            ready_input : false, 
            position_cpy: null,
        }
    },  
    props: ['noparams','position'], 

 mounted () {
             this.daterequired = new Date().toISOString().split('T')[0] ;       
        },

 beforeUpdate ()  {    
        this.getSpecialtyList();
        this.position_cpy = this.position ; 
        },

watch: {
    //WATCHER PREDICTOR SPECIALTY
    form_specialty(value, oldValue) {
        if (value !=null )
        {

               //i get text behind cursor: 
                let textToSearch= this.form_specialty.substring(0, document.getElementById('form_specialty').selectionStart ) ;
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
                console.log ("Start CursorPosition:"+document.getElementById('form_specialty').selectionStart+" textToSearch("+textToSearch+")   Value="+value+"   oldValue="+oldValue);
                if (oldValue === null) { oldValue = " " ;}
                let result = this.specialty_list.filter(item => item.name.substring(0,textToSearch.length)  ===  textToSearch );
                //result contain an array with match 
                if (result.length >0 && textToSearch.length > 0 )
                {console.log("MATCH!!  ("+textToSearch+")  Match to:"+result[0].name);
                    //check if both are diferent
                    if (textToSearch.localeCompare(result[0].name) != 0 )
                    { console.log("Text to search ("+textToSearch+") not equal to: "+result[0].name+" Comparison result="+textToSearch.localeCompare(result[0].name) );
                    this.ready_input = false;
                            //si nuevo valor es mayor que el antiguo
                            if (value.length > oldValue.length )
                            {
                            console.log("replacing FORM value to :"+result[0].name);
                            //before replace save cursor
                            this.cursor_position=textToSearch.length
                            this.form_specialty=result[0].name; 
                           
                             }
                            else{
                                console.log("No reemplaza, OLD > NEW ");
                                this.ready_input = false;
                                this.$emit("selectedSpecialtyCode", null); 
                                
                            }
                    }
                    else
                    {
                        console.log("BUTE are the same, skip replacing. Comparison result="+textToSearch.localeCompare(result[0].name));
                        console.log("Moving Cursor to cursor_position stored before replace:"+this.cursor_position);
                        document.getElementById('form_specialty').selectionStart = this.cursor_position ;
                        document.getElementById('form_specialty').selectionEnd = this.cursor_position ;
                    }
                    this.$emit("selectedSpecialtyCode",result[0].id); 
                    this.display_error = false ; 
                    this.ready_input = true ; 
                }
                else {console.log("No Match!! Do Nothing testToSearch("+textToSearch+") " );
                this.form_specialty=textToSearch ;
                this.$emit("selectedSpecialtyCode", null); 
                this.display_error=true ;
                this.ready_input = false;
                //We should deleete all letters ahead. 
                }
        
        }
        else
        {
            this.ready_input = false;
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