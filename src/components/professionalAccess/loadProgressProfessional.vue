<script setup>
import { ref } from 'vue'

</script>

<template>
<div v-if="spinner_on" class="spinner  text-center mt-0 pt-5" style="height :90em" >
   
       <p class="mt-5 pt-5" ></p>
       <p class="mt-5 pt-5" ></p>
    <img  width="150"  src="/public/spinner.gif" >
       <p class="mt-5 pt-5" ></p>
       <br>
       <p class="mt-5 pt-5" ></p>
       <p class="pt-5" ></p>
      
 </div>
</template>



<style scoped>
.spinner {
  
    position: absolute;
    z-index: 9999;
    /*margin : 0 auto; */
    left: 0px;
    top: 0px;
    width : 100% ;
    height : 80% ;
    background-color: rgba(26, 26, 26, 0.4);
}
</style>

<script>
export default {
  data : function() {
    return {
        spinner_on : false , 
        specialty_data :  [ {'id':100, 'name': 'Kinesiología', 'circleColors': '#01454f' , 'specialtyTextColors': '#FFF'  }, 
                            {'id':200, 'name': 'Psicología', 'circleColors': '#BC881C' , 'specialtyTextColors': '#FFF'},
                            {'id':300, 'name': 'Fono audiología', 'circleColors': '#DDD', 'specialtyTextColors': '#111'  },
                            {'id':400, 'name': 'Nutrición' , 'circleColors': '#8C0241', 'specialtyTextColors': '#FFF' },
                            {'id':500, 'name': 'Terapia Ocupacional', 'circleColors': '#575757', 'specialtyTextColors':'#FFF'  },
                            {'id':600, 'name': 'Psico pedagogia', 'circleColors': '#337686', 'specialtyTextColors': '#FFF' },
                            {'id':700, 'name': 'Enfermería', 'circleColors': '#000080', 'specialtyTextColors':'#FFF'   },
                            {'id':800, 'name': 'Masoterapia', 'circleColors': '#0B2264', 'specialtyTextColors':'#FFF'  }] ,
        
//specialtyTextColors:   ['#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#111','#FFF','#FFF' ],        
//                            circleColors: ['#01454f','#BC881C','#8C0241','#575757','#000080','#337686','#DDD','#0B2264','#FFF'],
        specialty : null 
          }
  },

    props: ['active_spinner', 'spinParams' ], 

    watch: {
            active_spinner( newValue, oldValue ) {

                    console.log("Spinner value:"+newValue);

                    if( this.spinParams != null )
                    {
                        this.specialty = this.specialty_data.find(elem => elem.id ==  this.spinParams.specialty_id  )
                    }

                    if (newValue == true)
                    {
                        console.log("Spinner On");
                        this.spinner_on = true ;
                    }
                    else if (newValue == false)
                    {
                        console.log("Spinner Off");
                        setTimeout( ()=> this.spinner_on = false , 0 )
                        //this.spinner_on = false ;
                    }
                    else{
                        console.log("Spinner Temporal");
                        setTimeout( ()=> this.spinner_on = false , newValue )
                    }


                },
        },


}
</script>



