<script setup>
import { ref } from 'vue'

</script>

<template>
<div v-if="spinner_on" class="spinner text-center mt-0 pt-5" style="transition:visibility 0.1s linear,opacity 0.9s linear;" >
   

 


   <div v-if="specialty !=null "   >

        <p class="mt-5 pt-5 ">
        </p>
        <p class="mt-5 pt-5 ">
        </p>

        <div class="d-flex justify-content-center">
            
            <!-- 
            <div  class="hexagono2" style="border-radius: 45px; height: 220px; width:300px" :style="{'background-color' : specialty.circleColors  ,  'color': specialty.specialtyTextColors }">
            -->
            <div class="hex4" style="width:200px;height:200px" :style="{'background-color' : specialty.circleColors  ,  'color': specialty.specialtyTextColors }">
            
                <br>

                <p class="" style=""  >
                    <br>
                    <text>Buscando... </text>  <br>
                   
                    <text v-if="specialty !=null">{{specialty.name}} </text> 
                    <br>
                    <!-- 
                     <text v-if="spinParams !=null && spinParams.type_home">  A adomicilio <i class="h5 bi bi-house-door"></i> </text>
                     <text v-if="spinParams !=null && spinParams.type_center"> En Consulta <i class="h5 bi bi-building"></i> </text>
                     <text v-if="spinParams !=null && spinParams.type_remote"> Tele Atención <i class="h5 bi bi-camera-video"></i> </text>
                     <br>
                    -->

                    <br>
                  

                    <div style="">
                        <text class="h1"> &nbsp;  </text>
                        <text v-if="spinParams !=null && spinParams.type_home">   <i class="h1 bi bi-house-door"></i>   </text>
                        <text v-if="spinParams !=null && spinParams.type_center"> <i class="h1 bi bi-building"></i>     </text>
                        <text v-if="spinParams !=null && spinParams.type_remote"> <i class="h1 bi bi-camera-video"></i> </text>
                        <text class="h1"> &nbsp;  </text>

                    </div>
                    
                    <img  width="130"  style=" position: relative; top: -5em;" src="/public/spinner.gif" > 
                    
                    <!--
                     <br>
                     <text v-if="spinParams !=null && spinParams.location !=null  "> {{spinParams.location.name }} </text>
                     <br>
                     <text v-if="spinParams !=null && spinParams.date !=null "> A partir de {{format_date(spinParams.date) }} </text>
                     <br>
                    -->
                
                </p>
                
                <!--  
                    <text v-if="specialty !=null">{{specialty.name}}  {{this.spinParams.specialty_id }}</text>
                    <img  width="150"  src="/public/spinner3_color.gif" >
            
              this.spinParams.specialty_id = params.specialty.id
              this.spinParams.location = params.location
              this.spinParams.type_home = params.type_home
              this.spinParams.type_center = params.type_center
              this.spinParams.type_remote = params.type_remote
                -->
                
                
            </div>
        
        </div>


   </div>
   
 
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


.hex4 {
  background: blue;
  -webkit-clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
}


</style>

<script>
export default {
  data : function() {
    return {
        spinner_on : false , 
        specialty_data :  [ {'id':100, 'name': 'Kinesiología', 'circleColors': '#01454f' , 'specialtyTextColors': '#FFF'  }, 
                            {'id':200, 'name': 'Psicología', 'circleColors': '#BC881C' , 'specialtyTextColors': '#FFF'},
                            {'id':300, 'name': 'Fonoaudiología', 'circleColors': '#DDD', 'specialtyTextColors': '#111'  },
                            {'id':400, 'name': 'Nutrición' , 'circleColors': '#8C0241', 'specialtyTextColors': '#FFF' },
                            {'id':500, 'name': 'Terapia Ocupacional', 'circleColors': '#575757', 'specialtyTextColors':'#FFF'  },
                            {'id':600, 'name': 'Psicopedagogia', 'circleColors': '#0B2264', 'specialtyTextColors':'#FFF' },
                            {'id':700, 'name': 'Enfermería', 'circleColors': '#000080', 'specialtyTextColors':'#FFF'   },
                            {'id':800, 'name': 'Masoterapia', 'circleColors': '#337686', 'specialtyTextColors': '#FFF'  }] ,
        
//specialtyTextColors:   ['#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#111','#FFF','#FFF' ],        
//                            circleColors: ['#01454f','#BC881C','#8C0241','#575757','#000080','#337686','#DDD','#0B2264','#FFF'],
        specialty : null 
          }
  },

    props: ['active_spinner', 'spinParams' ], 


    methods: {
        
        format_date(date)
            {
                let aux_date = new Date(date)
                let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ]
                let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]


                return (days[aux_date.getDay()]+" "+aux_date.getDate()+" "+months[aux_date.getMonth()]+" "+aux_date.getFullYear() )
            },

        },

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



