<script setup>
import { ref } from 'vue'
import axios from 'axios';
</script>

<template>
       <div class="opacity-100" style=" border-radius: 10%;" >
       
            <p class="h5 text-muted d-flex justify-content-center mt-4 pt-3">
               
             Busquedas mas comunes 
            </p>
        
        <div class="d-flex justify-content-center">
            
            <div @click='suggestedSearch(specialty.id,1)'  :style="{ 'border-color' : circleColors.pop() , 'border-radius': '50%' ,'width': '2.5em', 'height': '2.5em' }" class="border border-success border-1 d-flex justify-content-center p-0 m-0 "> 
                <i  class="bi bi-building m-0 pt-3 display-3" style="color: #781ED1;"></i><br><text>En Consulta</text>
            </div>
            <div @click='suggestedSearch(specialty.id,1)'  :style="{ 'border-color' : circleColors.pop() , 'border-radius': '50%' ,'width': '2.5em', 'height': '2.5em' }" class="border border-success border-1 d-flex justify-content-center p-0 m-0 "> 
                <i class="bi bi-house-door m-0 pt-3 display-3" style="color:#3399FF;"></i>
            </div>
            <div @click='suggestedSearch(specialty.id,1)'  :style="{ 'border-color' : circleColors.pop() , 'border-radius': '50%' ,'width': '2.5em', 'height': '2.5em' }" class="border border-success border-1 d-flex justify-content-center p-0 m-0 "> 
                <i class="bi bi-camera-video m-0 pt-3 display-3" style="color:#b36b00;"  ></i>
            </div>
            
        </div>

            <div class="d-flex align-content-start flex-wrap" style="border-radius: 40%; font-size: 0.8em;">
            
            <div v-for='specialty in global_specialties' :key='specialty.id' >
                <div @click='suggestedSearch(specialty.id,1)'  :style="{ 'border-color' : circleColors.pop() , 'border-radius': '50%' ,'width': '8.0em', 'height': '8.0em' }" class="border border-success border-1 m-2 d-flex justify-content-center p-0 m-0 "> 
                    <div class="p-2 mt-3 text-center " style="" >
                        <text class=""> {{specialty.name}} 
                        </text>
                        <br> 
                        <!--
                        <i class="bi bi-camera-video m-0 p-0" ></i>    
                        <text class="text-muted"> Remota </text> -->
                    </div> 
                </div> 
            </div>
            
            <!--
                <div style="background-color:#91B8C1 ;border-radius: 50%;width: 8.0em; height: 8.0em;" class="border border-1 m-2 d-flex justify-content-center p-0 m-0"> 
                    <div class="p-2 mt-3 text-center" style="" >
                        <text class=""> Kinesiología <text></text> 
                        </text>
                        <br> 
                        <i class="bi bi-house-door m-0 p-0" ></i>    
                        <text class="text-muted"> A domicilio Santiago </text> 
                    </div> 
                </div> 
                <div style="background-color:#DED7C9 ; border-radius: 50%;width: 8.0em; height: 8.0em;" class="border border-1 m-2 d-flex justify-content-center p-0 m-0"> 
                    <div class="p-2 mt-3 text-center" style="" >
                        <text class="">Enfermería<text></text> 
                        </text>
                        <br> 
                        <i class="bi bi-building m-0 p-0" ></i>    
                        <text class="text-muted"> A domicilio Santiago </text> 
                    </div> 
                </div> 




                 <div style="background-color:#568281 ;border-radius: 50%;width: 8.0em; height: 8.0em;" class="border border-1 m-2 d-flex justify-content-center p-0 m-0 text-white"> 
                    <div class="p-2 mt-3 text-center" style="" >
                        <text class="">Fonoaudiología<text></text> 
                        </text>
                        <br> 
                        <i class="bi bi-house-door m-0 p-0" ></i>    
                        <text class="text-white"> A domicilio San Miguel </text> 
                    </div> 
                </div> 

                                
              <div style="background-color:#91B8C1 ;border-radius: 50%;width: 8.0em; height: 8.0em;" class="border border-1 m-2 d-flex justify-content-center p-0 m-0"> 
                    <div class="p-2 mt-3 text-center" style="" >
                        <text class=""> Terapia Ocupacional <text></text> 
                        </text>
                        <br> 
                        <i class="bi bi-building m-0 p-0" ></i>    
                        <text class="text-muted"> En Consulta Providencia </text> 
                    </div> 
                </div>
                
                <div style="background-color:#DED7C9 ; border-radius: 50%;width: 8.0em; height: 8.0em;" class="border border-1 m-2 d-flex justify-content-center p-0 m-0"> 
                    <div class="p-2 mt-3 text-center" style="" >
                        <text class=""> Psicopedagogía <text></text> 
                        </text>
                        <br> 
                        <i class="bi bi-house-door m-0 p-0" ></i>    
                        <text class="text-muted"> A domicilio Santiago </text> 
                    </div> 
                </div> 

                 <div style="background-color:#C7D8D9 ;border-radius: 50%;width: 8.0em; height: 8.0em;" class="border border-1 m-2 d-flex justify-content-center p-0 m-0"> 
                    <div class="p-2 mt-3 text-center" style="" >
                        <text class=""> Masoterapia<text></text> 
                        </text>
                        <br> 
                        <i class="bi bi-house-door m-0 p-0" ></i>    
                        <text class="text-muted"> A domicilio Providencia </text> 
                    </div> 
                </div> 

                                
                
                  <div style="background-color:#568281 ;border-radius: 50%;width: 8.0em; height: 8.0em;" class="border border-1 m-2 d-flex justify-content-center p-0 m-0 text-white"> 
                    <div class="p-2 mt-3 text-center" style="" >
                        <text class=""> Psicologìa <text></text> 
                        </text>
                        <br> 
                        <i class="bi bi-camera-video m-0 p-0" ></i>    
                        <text class="text-white"> Remoto </text> 
                    </div> 
                </div> 
                -->
            <!--
                <div class="m-3 d-flex justify-content-between"> <text class=""> Psicología </text>, <text class="text-muted"> Tele Atención </text> </div> 
                <div class="m-3 d-flex justify-content-between"> <text class=""> Nutrición </text>, <text class="text-muted"> En Centro, Providencia </text> </div> 
                <div class="m-3"> <text class=""> Psicología </text>, <text class="text-muted"> En Centro, Las Condes </text> </div> 
                <div class="m-3"> <text class=""> Kinesiología </text>, <text class="text-muted"> A domicilio, San Miguel </text> </div> 
                <div class="m-3"> <text class=""> Enfermería </text>, <text class="text-muted"> A domicilio, Santiago </text> </div> 
                <div class="m-3"> <text class=""> Fonoaudiología </text>, <text class="text-muted"> A domicilio, San Miguel </text> </div> 
                <div class="m-3"> <text class=""> Terapia Ocupacional </text>,<text class="text-muted"> A domicilio, Santiago </text> </div> 
                <div class="m-3"> <text class=""> Psicopedagogía </text>, <text class="text-muted"> A domicilio, San Miguel </text> </div> 
                <div class="m-3"> <text class=""> Masoterapia </text>, <text class="text-muted"> A domicilio, Santiago </text> </div> 
            -->
            <div class="m-5 p-5">
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
            circleColors: ['#ff0000','#ffaaff','#ffffaa','#568281','#BBBBBB','#91B8C1','#FFBFA3','#ffe999','#511F73']
        }
    },  
 
   props: ['global_comunas', 'global_specialties' ], 
   emits: ["suggestedSearchCall"],

mounted() {   
       },

    watch: {
        },

    methods: {

        suggestedSearch(specialty,type)
        {
            console.log("SuggestedSearch specialty:"+specialty+"  type:"+type)
            const params = { 
			    specialty   : specialty    ,
                type : type  ,
                location    : null  ,
            };

            this.$emit("suggestedSearchCall",params );
        }

    },


}

</script>