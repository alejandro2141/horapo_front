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
                        horaPO es un sistema online de agendamiento de horas
                         que le permite a tus <b>pacientes</b>  agendar horas en tus <b>calendarios</b>.  
                    </p>
                 
                    <!--  Navegacion -->    
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="session_params.tutorial_start_step1=true;tut_step=0"> Anterior </text>
                        <text @click="tut_step=2"> Proximo  </text>
                    </div>
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
                    <p><br></p>

                    <div v-if="showInfoConsulta" class="m-2">
                        Una <b> Consulta <i class="bi-geo-alt"></i></b> es un lugar fisico o virtual donde entregas tus servicios. Existe tres tipos de consultas: 
                        <ul>
                            <li><i class="bi bi-hospital"></i> <b>En Consulta : </b> Corresponde a una consulta fisica, que tiene una direccion (calle y numero) donde deben concurrir tus pacientes</li>    
                            <li><i class="bi bi-house"></i> <b>A Domicilio  :</b> Son visitas al domicilio del paciente. En este tipo de citas, usted debe seleccionar las comunas en las que entrega sus servicios</li>
                            <li><i class="bi bi-camera-video"></i>  <b>Remota : </b>Una cita virtual, via  WhatsApp o algun otro tipo de video llamada que usted disponga.  </li>
                        </ul>
                    
                    </div>

                <!--  Navegacion -->    
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="tut_step=1"> Anterior </text>
                        <text @click="tut_step=3"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around  m-4 p-4 text-primary"> 
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
                   
            </div>

    <!--TUTORIAL CALENDARIO -->
            <div v-if="tut_step==3" >
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
                        Un <b>Calendario</b> es un periodo de tiempo en el que entregas tus servicios para una especialidad y <b>Consulta</b> (antes creada). 
                        Durante la creación de un calendario, debe indicar: <br>
                        <ul>
                            <li>Fecha de Inicio y Termino de este calendario, </li>
                            <li>dias de la semana en que atiende (recurrencia)</li>
                            <li>Duracion de cada cita</li>
                            <li>hora de inicio y fin</li>
                            <li>Un color de referencia. </li>
                            <li>otra informacion. </li> 
                        </ul>
                    </div>
                    

                     <!--  Navegacion -->    
                     <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="tut_step=2"> Anterior </text>
                        <text @click="tut_step=4"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around  m-4 p-4 text-primary"> 
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>

            </div>
    <!--TUTORIAL CITAS RESERVADAS -->          
            <div v-if="tut_step==4" >
                    <div class="d-flex justify-content-between w-100">
                        <text></text>
                        <i class="display-1 bi bi-arrow-up-short "></i>
                        <text></text>
                        <text></text>
                        <text></text>
                        <text></text>
                    </div>

                    <div class="text-center">
                        
                        
                        <div class="text-secondary d-flex justify-content-center">
                        <div class="border p-2">
                            <i style="font-size:2.0em" class="bi bi-people"></i>
                            <br>
                            <text>Citas</text>
                        </div>
                    </div>
                        
                    Con este botton puedes ver todas las citas que han sido reservadas por tus pacientes.                       
                    </div>

                    <div class="d-flex justify-content-center">
                        <img class="m-2" style="width : 10em ; "  src="/public/Professional_list_app.png" >
                    </div>
                    <!--  Navegacion -->    
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="tut_step=3"> Anterior </text>
                        <text @click="tut_step=5"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4  text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>

            </div>

            <div v-if="tut_step==5" >   
                    <div class="d-flex justify-content-between">
                        <i class="display-1 bi bi-arrow-up-short "></i>
                        <text></text>
                        <text></text>
                        <text></text>
                        <text></text>
                        <text></text>
                    </div>

                    <div class="m-2">
                    
                        Existen ademas las siguientes opciones secundarias en el <b class="">menu  <i class="bi bi-gear "></i> </b>
                        que usted puede explorar luego. 
                        <br>
                        <div class="d-flex justify-content-center">
                            <img class="m-2" style="width : 20em ; "  src="/public/professional_menu.png" >
                        </div>
                    </div>
                  
                   <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                 
                   </div>
                    <!--  Navegacion -->    
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="tut_step=4"> Anterior </text>
                        <text @click="tut_step=6"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4  text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
           </div>


            <div v-if="tut_step==6" >
                    
                    <div class="text-center  pt-4">
                        Cuando No ha seleccionado una opcion del menu superior se muestra
                      <b>Pantalla princial</b> un Calendario que puede utilizar para seleccionar distintas fechas que desea consultar. 
                      
                      <p>
                      <img class="" style="width : 20em ; border-radius: 2%;"  src="/public/Professional_main_page_calendar1.png" >
                      </p>
                      
                     
                                                              
                    </div>
                    
                    <div class="m-2" >
                        <p>
                            <b>Pantalla princial</b> muestra tambien las Horas disponibles, Reservadas y Bloqueadas.</p> 
                        <p class="text-center">  
                           <img class="" style="width : 20em ; border-radius: 2%;"  src="/public/professional_main_page.png" >
                        </p>
                    </div>
                    
                    <!--  Navegacion -->    
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="tut_step=5"> Anterior </text>
                        <text @click="tut_step=7"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4  text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>

            </div>

            <div v-if="tut_step==7"  >

                    <div class="p-2 w-100 ">
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

                    <!--  Navegacion -->    
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="tut_step=6"> Anterior </text>
                        <text @click="tut_step=8"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4  text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>


            </div>

            <div v-if="tut_step==8" >
                    
                    <div class="text-center p-2 pt-4">
                       Seleccionando una <b>Hora Reservada</b>, puede ver los detalles de la reserva. 
                       
                       <img class="m-2" style="width : 20em ; "  src="/public/Reserved_app_details.png" >
                      
                    </div>

                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    
                    <!--  Navegacion -->    
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="tut_step=7"> Anterior </text>
                        <text @click="tut_step=9"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4  text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>

            <div v-if="tut_step==9" >
                    <br>
                    <p class="text-center p-2">
                       Una <b>Hora Disponible</b>, puede ser reservada por usted para un paciente.  
                       <img class="m-2" style="width : 20em ; "  src="/public/Professional_reserve_app.png" >
                    </p>

                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    
                    <!--  Navegacion -->    
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="tut_step=8"> Anterior </text>
                        <text @click="tut_step=10"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4  text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>

            <div v-if="tut_step==10" >
                    <br>
                    <div class="text-center p-2">
                      <h4>Solicitar Confirmación de asistencia al paciente <i class="bi bi-chat-dots"></i></h4> 
                      <br>
                      Usted puede enviar un mensaje automatizado al paciente para que confirme su asistencia.
                       <br> 
                       <img class="m-2" style="width : 20em ; "  src="/public/Solicitar_confirmacion_asistencia.png" >
                       <br>
                       Con esta accion el sistema le enviará un email al paciente para solicitarle que confirme su asistencia el dia y hora de la cita. 
                    </div>
                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                    
                    <!--  Navegacion -->    
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="tut_step=9"> Anterior </text>
                        <text @click="tut_step=11"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4  text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>


            <div v-if="tut_step==11" >
                   
                    <br>
                    <p class="text-center p-2">
                       Usted puede cancelar la cita con el paciente <i class="bi bi-x-square"></i>.
                       <br> 
                       <img class="m-2" style="width : 20em ; "  src="/public/Cancelar_cita_paciente.png" >
                                              
                       <br>
                       Con esta accion usted cancelará la cita con el paciente. <br>
                       El sistema enviara una notificacion al paciente informandole que usted ha cancelado su cita </p>
                    <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                  
                    </div>
                   
                    <!--  Navegacion -->    
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="tut_step=10"> Anterior </text>
                        <text @click="tut_step=12"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4  text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
            </div>


           <div v-if="tut_step==12" >   
                    <br>
                    <div class="text-center p-2 ">
                        <h2>Bloquear Dia y Horas</h2>
                        Usted puede bloquear <i class="h3 bi bi-unlock-fill text-primary"></i> un dia en su agenda. Con esta accion los pacientes ya no podran reservar horas ese dia para sus calendarios
                        <br>
                        <img class="m-2" style="width : 20em ; "  src="/public/main_block_aday.png" >
                    </div>
                    
                    <p class="text-center p-2">
                        Usted puede <b>bloquear una hora </b> en la opcion inferior de: <text class="text-primary">Bloquear Horas Seleccionadas  <i class="bi bi-unlock"></i></text>. Pacientes ya no podran reservar esa Hora de ese Dia. 
                        <br>
                        <img class="m-2" style="width : 20em ; "  src="/public/lock_selected_app.png" >
                    </p>
                                        
                    <p class="text-center p-2">
                       Una hora bloqueada se vera así:  <br>
                        <img class="m-2" style="width : 20em ; "  src="/public/list_hours_blocked_app.png" >
                    </p>


                    
                   <div class="d-flex justify-content-center" style="font-size:0.9em">
                                                 
                   </div>
                    <!--  Navegacion -->    
                    <div class="d-flex justify-content-around mt-3 text-primary"> 
                        <text @click="tut_step=11"> Anterior </text>
                        <text @click="tut_step=13"> Proximo  </text>
                    </div>
                    <div class="d-flex justify-content-around m-4 p-4  text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
                    </div>
           </div>


            <div v-if="tut_step==13" class="text-center p-5" >
                
                <div class="text-center ">
                        Gracias por completar este tutorial!! 
                        <br>
                        <i class="display-2 bi bi-emoji-kiss"></i>
                        <br>
                        <br>
                        <p>Puedes repetir este tutorial en <b>Menu <i class="bi bi-gear"></i></b>, <br>
                           opción  <text> <b> <i class="bi bi-lightbulb fs-5"></i>  Ver Tutorial </b>  </text>
                        </p>
                </div>

                <!--  Navegacion -->   
                
                <div class="d-flex justify-content-around mt-5 text-primary"> 
                        <text @click="tut_step=12"> Anterior </text>
                     
                </div>
                <div class="d-flex justify-content-around m-4 p-4  text-primary">
                        <text class="text-primary" @click='finishTutorial()'><i class="bi bi-lightbulb-off"></i> Cerrar Tutorial </text>
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

