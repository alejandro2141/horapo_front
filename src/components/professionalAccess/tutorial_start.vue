<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
<div>
  
        <div class="text-center" >
        
        </div>

        <div class=" "  style="">

            <div v-if="session_params.tutorial_start_step1" >

                    <div class="d-flex justify-content-around">
                        <div></div>
                        <i class="display-1 bi bi-arrow-up-short "></i>
                        <div></div>
                    </div>

                    <p class="display-1 text-center">
                        Bienvenid<i class="display-4 bi bi-emoji-wink"></i> 
                    </p>
                    
                    <p class="text-center">
                        Para iniciar debes crear tu primera consulta en el menu superior.   
                    </p>

                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                        <div  >	
                            <button  type="button" class="btn border border-2  small p-1">
                                <i class="bi bi-building"></i><br>
                                <text>Consultas</text>
                            </button>
                        </div>
                    </div>

                    <div class="d-flex justify-content-around mt-3 pt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step2=true;session_params.tutorial_start_step1=false"> Proximo </text>
                    </div>
                    <div class="d-flex justify-content-around mt-3 pt-3 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
                   
            </div>

            <div v-if="session_params.tutorial_start_step2" >
                    <div class="d-flex justify-content-end"><i class="display-1 bi bi-arrow-up-short "></i></div>

                    <p class="text-center">
                        Si ya creaste una consulta, puedes ahora crear tu primer calendario. </p>

                    <div class="d-flex justify-content-center" style="font-size:0.9em">

                        <text style="font-size:0.9em">	
                            <button  type="button" class="btn border border-2 small p-1">
                                <i class="bi bi-calendar"></i><br>
                                <text>Calendar</text>
                            </button>
			            </text>

                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step1=true;session_params.tutorial_start_step2=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step2=false;session_params.tutorial_start_step3=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around mt-3 pt-3 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>
                   
            <div v-if="session_params.tutorial_start_step3" >
                    <div class="d-flex justify-content-between">
                        <text></text>
                        <i class="display-1 bi bi-arrow-up-short "></i>
                        <text></text>
                        <text></text>
                        <text></text>
                        <text></text>
                    </div>

                    <p class="text-center">
                        Si ya creaste una Consulta y un Calendario, puedes ver las horas disponibles en la pantalla principal 
                    </p>

                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                        <div style="font-size:0.9em" class="opacity-75 btn border border-2 text-danger border-danger small "  >
                            <text class="m-0 p-0" style="">HOY</text><br>
                            <text class="m-0 p-0"> 23/7 </text>
                        </div>
                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step2=true;session_params.tutorial_start_step3=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step3=false;session_params.tutorial_start_step4=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around mt-3 pt-3 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>

            </div>

            <div v-if="session_params.tutorial_start_step4" >
                    

                    <p class="text-center">
                        Asi se ve tu calendario, cuando ya creaste una Consulta y una Agenda. 
                        Se muestran las horas disponibles
                        
                    </p>
                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                            [Incluye imagen captura]                        
                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step3=true;session_params.tutorial_start_step4=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step4=false;session_params.tutorial_start_step5=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around mt-3 pt-3 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>

            </div>

            <div v-if="session_params.tutorial_start_step5" >
                    

                    <p class="text-center mt-4">
                        Asi se ve una hora disponible <br>
                        [Incluye imagen captura] 
                        <br>
                        Asi se verá una hora reservada por un paciente<br>
                        [Incluye imagen captura]
                        
                    </p>
                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step4=true;session_params.tutorial_start_step5=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step5=false;session_params.tutorial_start_step6=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around mt-3 pt-3 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>

            </div>

            <div v-if="session_params.tutorial_start_step6" >
                    
                    <p class="text-center mt-4">
                       Una cita Reservada, puede ver informacion de contacto 
                        
                    </p>
                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step5=true;session_params.tutorial_start_step6=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step6=false;session_params.tutorial_start_step7=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around mt-3 pt-3 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>

            <div v-if="session_params.tutorial_start_step7" >
                    

                    <p class="text-center mt-4">
                       Una cita Disponible, puede usted resevar para alguien.  
                    </p>
                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step6=true;session_params.tutorial_start_step7=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step7=false;session_params.tutorial_start_step8=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around mt-3 pt-3 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>

            <div v-if="session_params.tutorial_start_step8" >
                    

                    <p class="text-center mt-4">
                       Usted puede solicitar confirmacion de asistencia al paciente.
                       <br> [include imagen de button]
                       Con esta accion el sistema le enviará un email al paciente solicitando su confirmacion </p>
                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step7=true;session_params.tutorial_start_step8=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step8=false;session_params.tutorial_start_step9=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around mt-3 pt-3 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>


            <div v-if="session_params.tutorial_start_step9" >
                   

                    <p class="text-center mt-4">
                       Usted puede solicitar confirmacion de asistencia al paciente.
                       <br> [include imagen de button]<br>
                       Con esta accion el sistema le enviará un email al paciente solicitando su confirmacion </p>
                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step8=true;session_params.tutorial_start_step9=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step9=false;session_params.tutorial_start_step10=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around mt-3 pt-3 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>


            <div v-if="session_params.tutorial_start_step10" >   
                    <div class="d-flex justify-content-between">
                        <i class="display-1 bi bi-arrow-up-short "></i>
                        <text></text>
                        <text></text>
                        <text></text>
                        <text></text>
                        <text></text>
                    </div>

                    <p class="text-center mt-4">
                    
                        Puede desplegar mas opciones en el menu superior 

                    </p>
                   <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                 
                   </div>
                   <div class="d-flex justify-content-around mt-3 text-primary"> 
                       <text @click="session_params.tutorial_start_step9=true;session_params.tutorial_start_step10=false"> Anterior </text>
                       <text @click="session_params.tutorial_start_step10=false;session_params.tutorial_start_step11=true"> Proximo  </text>
                   </div>
                   <div class="d-flex justify-content-around mt-3 pt-3 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
           </div>

           <div v-if="session_params.tutorial_start_step11" >   

                    
                    <p class="text-center mt-4">
                        En el menu superior, se muestran las siguientes opciones <br>
                        []
                    </p>
                   <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                 
                   </div>
                   <div class="d-flex justify-content-around mt-3 text-primary"> 
                       <text @click="session_params.tutorial_start_step10=true;session_params.tutorial_start_step11=false"> Anterior </text>
                       <text @click="session_params.tutorial_start_step11=false;final=true"> Proximo  </text>
                   </div>
                   <div class="d-flex justify-content-around mt-3 pt-3 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
           </div>






            <div v-if="final" >
                
                <p class="text-center mt-4">
                        Gracias por completar este tutorial!!
                        <br>
                        <i class="display-2 bi bi-emoji-kiss"></i>
                        <br>
                        Puedes repetir tutorial en Menu, opción <br>
                        <text> <i class="bi bi-lightbulb fs-5"></i> &nbsp; Ver Tutorial   </text>
                </p>

                <div class="d-flex justify-content-around mt-3 text-primary"> 
                    <text @click="session_params.tutorial_start_step11=true;final=false"> Anterior </text>
                    <text class="text-primary" @click='finishTutorial()'>Finalizar Tutorial </text>
                </div>
               

            </div>

<!--
        <div class="display-4 text-center text-primary" @click='switchToCenter()' >
            Crear mi primera Consulta
        </div>
-->
        </div>


</div>

</template>

<style scoped>

hr.style-eight {
    overflow: visible; /* For IE */
    padding: 0;
    border: none;
    border-top: medium double #333;
    color: #333;
    text-align: center;
}
hr.style-eight:after {
    content: "§";
    display: inline-block;
    position: relative;
    top: -0.7em;
    font-size: 1.5em;
    padding: 0 0.25em;
    background: white;
}

</style>


<script>

export default {

data: function () {
		return {
            step1:true,
            step2:false,
            step3:false,
            step4:false,
            step5:false,
            step6:false,
            step7:false,
            step8:false,
            step9:false,
            step10:false,
            step11:false,
            step12:false,
            step13:false,
            step14:false,
            step15:false,
            final:false,
		 }
	},
	props: ['session_params'],

    created () {
        console.log("Tutorial Created ");
         },

    mounted () {
        console.log("Tutorial Mounted");
         },

  
    methods: {

        tutorialCenters()
        {

        },
        tutorialCalendars()
        {

        },

        async finishTutorial()
        {
            this.session_params.tutorial_start_step1 = false 
            this.session_params.tutorial_start_step2 = false 
            this.session_params.tutorial_start_step3 = false 
            this.session_params.tutorial_start_step4 = false 
            this.session_params.tutorial_start_step5 = false 
            this.session_params.tutorial_start_step6 = false 
            this.session_params.tutorial_start_step7 = false 
            this.session_params.tutorial_start_step8 = false 
            this.session_params.tutorial_start_step9 = false 
            this.session_params.tutorial_start_step10 = false 
            this.session_params.tutorial_start_step11 = false 

           const json = { 
              professional_id: this.session_params.professional_id ,
              tutorial : 1
           };

            let restemp = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_shutdown_tutorial",json);
            this.session_params.tutorial_start = false ;   
            alert("Siempre podrá ver este tutorial en el menu superior izquierdo");
        },
 

        switchToCenter()
        {
            console.log("switch to centers");
            this.$emit('switchToCenters');
        }


     	},

}
</script>

