<script setup>
import { ref } from 'vue'
import axios from 'axios';

</script>

<template>
<div class="border border-1  "  >
  
        <div class="text-center" >
        
        </div>

        <div class="w-100"  style="background-color: #FFC300 ;">

    <!--TUTORIAL CALENDARIO -->
            <div v-if="session_params.tutorial_start_step1" class="p-3" >

                   

                    <p class="display-1 text-center">
                        Bienvenido <i class="display-4 bi bi-emoji-wink"></i> 
                    </p>
                    
                    <p class="text-center">
                        Este Tutorial te enseñará las funcionalidades <br> que tiene HoraPO para ti.
                    </p>
                    
                    <p class="text-center">
                        <button @click="tut_step=1 ; session_params.tutorial_start_step1=false" type="button" class="btn btn-primary">Comenzar Tutorial</button>
                    </p>

                    <div class="d-flex justify-content-around  m-4 p-4 text-primary"> 
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>

            </div>

            <div v-if="tut_step==1" class="p-3">

                    <p class="text-center">                    
                        horaPO es un sistema de agendamiento de horas online, que le permite a tus <b>pacientes</b>  agendar horas en tus <b>calendarios</b>  
                    </p>

                 
                    <p class="text-center">
                        <button @click="tut_step=2" type="button" class="btn btn-primary">Siguiente</button>
                    </p>
                   
                    <div class="d-flex justify-content-around  m-4 p-4 text-primary"> 
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>        
                  
            <div v-if="tut_step==2">    

                    <div class="d-flex justify-content-around">
                        <div></div>
                        <i class="display-1 bi bi-arrow-up-short "></i>
                        <div></div>
                    </div>

                    <p class="text-center">
                        Para iniciar debes crear tu primera consulta en el menu superior.   
                    </p>

                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                        <div  >	
                            <button  type="button" class="btn border border-2  small p-1">
                                <i class="bi-geo-alt"></i><br>
                                <text>Consultas</text>
                            </button>
                        </div>
                        
                    </div>
                    
                    <div class="text-center text-primary m-2 " @click="showInfoConsulta=!showInfoConsulta" >
                        ¿ Que es una Consulta ?
                    </div>

                    <div v-if="showInfoConsulta" class="m-2">
                        Una <b> Consulta <i class="bi-geo-alt"></i></b> es un lugar fisico, virtual o una zona geografica donde entregas tus servicios.<br>
                        En horapo existe actualmente tres tipos de consultas: 
                        <ul>
                            <li> <b>En Consulta <i class="bi bi-hospital"></i>: </b> Corresponde a una consulta fisica, que tiene una direccion donde deben concurrir los pacientes</li>    
                            <li> <b>A Domicilio <i class="bi bi-house"></i> :</b> Son visitas a domicilio del paciente. En este tipo de citas, usted define en que Zonas geograficas entrega sus servicios</li>
                            <li> <b>Remota <i class="bi bi-camera-video"></i> : </b>Una cita virtual, via una sesion remota via WhatsApp o algun otro tipo de video llamada que usted disponga.  </li>
                        </ul>
                    
                    </div>

                    <div class="d-flex justify-content-around  m-4 p-4 text-primary"> 
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                        <text></text>
                        <text @click="session_params.tutorial_start_step2=true;session_params.tutorial_start_step1=false"> Proximo </text>
                    </div>
                    <!--
                    <div class="d-flex justify-content-around m-4 p-4 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
                    -->
                   
            </div>

    <!--TUTORIAL CALENDARIO -->
            <div v-if="session_params.tutorial_start_step2" >
                    <div class="d-flex justify-content-end"><i class="display-1 bi bi-arrow-up-short "></i></div>

                    <p class="text-center">
                        Si ya creaste una consulta, puedes ahora crear tu primer calendario. </p>

                    <div class="d-flex justify-content-center" style="font-size:0.9em">

                        <text style="font-size:0.9em">	
                            <button  type="button" class="btn border border-2 small p-1">
                                <i class="bi bi-calendar"></i><br>
                                <text>Calendario</text>
                            </button>
			            </text>

                    </div>

                    <div class="m-2">
                        Un calendario es un periodo de tiempo en el que entregas tus servicios para una especialidad y <b>Consulta</b> (antes creada). 
                        En la creacion de un calendario, debe indicar: <br>
                        <ul>
                            <li>Fecha de Inicio y Termino de este calendario, </li>
                            <li>dias de la semana en que atiende (recurrencia)</li>
                            <li>Duracion de cada cita</li>
                            <li>hora de inicio y fin</li>
                            <li>Un color de referencia. </li>
                            <li>otra informacion. </li> 
                        </ul>

                    </div>

                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step1=true;session_params.tutorial_start_step2=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step2=false;session_params.tutorial_start_step3=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>
    <!--TUTORIAL CITAS RESERVADAS -->          
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
                        Con este botton puedes ver todas las citas reservadas por tus pacientes.                       
                    </p>

                    <div class="text-secondary d-flex justify-content-center">
                        <div class="">
                            <i style="font-size:2.0em" class="bi bi-people"></i>
                            <br>
                            <text>Citas</text>
                        </div>
                    </div>

                    <div class="d-flex justify-content-center">
                        <img class="m-2" style="width : 10em ; "  src="/public/Professional_list_app.png" >
                    </div>

                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step2=true;session_params.tutorial_start_step3=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step3=false;session_params.tutorial_start_step4=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4  text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>

            </div>

            <div v-if="session_params.tutorial_start_step4" >   
                    <div class="d-flex justify-content-between">
                        <i class="display-1 bi bi-arrow-up-short "></i>
                        <text></text>
                        <text></text>
                        <text></text>
                        <text></text>
                        <text></text>
                    </div>

                    <p class="text-center mt-4">
                    
                        Existen ademas las siguientes opciones secundarias en el <b>menu <i class="bi bi-gear "></i> </b> que usted puede explorar luego. 
                        <br>
                        <img class="m-2" style="width : 20em ; "  src="/public/professional_menu.png" >
                       
                    </p>
                   <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                 
                   </div>
                   <div class="d-flex justify-content-around mt-3 text-primary"> 
                       <text @click="session_params.tutorial_start_step3=true;session_params.tutorial_start_step4=false"> Anterior </text>
                       <text @click="session_params.tutorial_start_step4=false;session_params.tutorial_start_step5=true"> Proximo  </text>
                   </div>
                   <div class="d-flex justify-content-around m-4 p-4  text-primary">
                        <text class="text-primary " @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
           </div>


            <div v-if="session_params.tutorial_start_step5" >
                    
                    <p class="text-center mt-4 pt-4">
                      Veamos ahora como se ve su pantalla princial.<br>
                      Cuando No ha seleccionado alguna opcion del menu superior, la pantalla principal lista las Horas disponibles,Reservadas y Bloqueadas.  
                      <br>
                      Tambien puede cambiar el dia y Mes que esta consultando para ver citas en los proximos dias.                     
                    </p>
                    
                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                        <img class="" style="width : 20em ; border-radius: 2%;"  src="/public/professional_main_page.png" >
                    </div>
                    
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step4=true;session_params.tutorial_start_step5=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step5=false;session_params.tutorial_start_step6=true"> Proximo  </text>
                    </div>

                    <div class="d-flex justify-content-around p-4 m-4 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>

            </div>

            <div v-if="session_params.tutorial_start_step6"  >
                    

                    <div class=" mt-4 w-100 m-2">
                        <p>Ejemplos de lo que usted verá en la pantalla principal:  </p>
                         Horas Disponibles, ejemplo :  <br>
                        <img class="m-2" style="width : 20em ; "  src="/public/list_app_app_available.png" >

                        <br>
                        Hora Reservada, se ven así:<br>
                        <img class="m-2" style="width : 20em ; "  src="/public/list_app_app_reserved.png" >
                       
                        <br>
                        Una hora bloqueada se verá asi:<br>
                        <img class="m-2" style="width : 20em ; "  src="/public/list_hours_blocked_app.png" >
                       
                        
                    </div>
                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step5=true;session_params.tutorial_start_step6=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step6=false;session_params.tutorial_start_step7=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around p-4 m-4 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>

            </div>

            <div v-if="session_params.tutorial_start_step7" >
                    
                    <div class="text-center mt-4">
                       Seleccionando una <b>Hora Reservada</b>, puede ver los detalles de la reserva. 
                       
                       <img class="m-2" style="width : 20em ; "  src="/public/Reserved_app_details.png" >
                      
                    </div>

                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step6=true;session_params.tutorial_start_step7=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step7=false;session_params.tutorial_start_step8=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around p-4 m-4 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>

            <div v-if="session_params.tutorial_start_step8" >
                    

                    <p class="text-center mt-4">
                       Una <b>Hora Disponible</b>, puede ser reservada por usted para un paciente.  
                       <img class="m-2" style="width : 20em ; "  src="/public/Professional_reserve_app.png" >
                    </p>

                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step7=true;session_params.tutorial_start_step8=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step8=false;session_params.tutorial_start_step9=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>

            <div v-if="session_params.tutorial_start_step9" >
                
                    <div class="text-center mt-4">
                      <h4>Mensajes directos al paciente <i class="bi bi-person"></i><i class="bi bi-chat-dots"></i></h4> 
                      <br>
                      Usted puede solicitar confirmacion de asistencia al paciente.
                       <br> 
                       <img class="m-2" style="width : 20em ; "  src="/public/Solicitar_confirmacion_asistencia.png" >
                       <br>
                       Con esta accion el sistema le enviará un email al paciente para solicitarle que confirme su asistencia el dia y hora de la cita. 
                    </div>
                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step8=true;session_params.tutorial_start_step9=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step9=false;session_params.tutorial_start_step10=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>


            <div v-if="session_params.tutorial_start_step10" >
                   

                    <p class="text-center mt-4">
                       Usted puede cancelar la cita con el paciente <i class="bi bi-person"></i><i class="bi bi-chat-dots"></i>.
                       <br> 
                       <img class="m-2" style="width : 20em ; "  src="/public/Cancelar_cita_paciente.png" >
                                              
                       <br>
                       Con esta accion usted cancelará la cita con el paciente. <br>
                       El sistema enviara un correo al paciente informandole que usted ha cancelado su cita  </p>
                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step9=true;session_params.tutorial_start_step10=false"> Anterior </text>
                        <text @click="session_params.tutorial_start_step10=false;session_params.tutorial_start_step11=true"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4 text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>


           <div v-if="session_params.tutorial_start_step11" >   

                    
                    <p class="text-center mt-4">
                        Gestion de sus Dias<br>
                        Usted puede bloquear <i class="bi bi-unlock-fill text-primary"></i> un dia en su agenda, con esta accion los pacientes ya no podran reservar horas ese dia para ninguno de sus calendarios
                        <br>
                        <img class="m-2" style="width : 20em ; "  src="/public/main_block_aday.png" >
                   </p>

                   

                    
                    <p class="text-center mt-4">
                        Usted puede <b>bloquear una hora </b> en la opcion inferior de: <text class="text-primary">Bloquear Horas Seleccionadas  <i class="bi bi-unlock"></i></text> un dia en su agenda. Con esta accion los pacientes ya no podran reservar esa hora de ese dia. 
                        <br>
                        <img class="m-2" style="width : 20em ; "  src="/public/lock_selected_app.png" >
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
            step1_1 : false,
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
            tut_step:0,

            showInfoConsulta:false,
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

            this.tut_step = 0 

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

