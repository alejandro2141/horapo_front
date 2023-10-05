<script setup>
import { ref } from 'vue'
import axios from 'axios';
import inputFormComuna from  './InputFormComuna2.vue'
import GenericBlockDateSpecialtyVue from '../GenericBlockDateSpecialty.vue';
import InputFormCenterProfessional from './inputFormCenterProfessional.vue';
import InputFormComunaProfessional from './inputFormComunaProfessional.vue' ;
import Datepicker from 'vuejs3-datepicker';


</script>

<template>

     	<teleport to="body"   >
      <div >
		<div  v-if="showModalCreateCalendar" class="modal bg-secondary scroll" >
		    <transition name="modal">
			<div class="modal-mask ">
			<div class="modal-wrapper d-flex justify-content-center ">
			<div class="modal-container  m-0 p-0 bg-white" style="">
 
                <div class="modal-header">
                        <div class="text-dark " style="font-size: 2em;" >
                        Crear Calendario
                        </div>
                        <div class="p-0 "><i class="text-primary bi bi-x-lg ml-0" style="font-size: 2em;"   v-on:click="showModalCreateCalendar = false"  aria-label="Close"></i>
                        </div>
                </div>

                <div  class="modal-body mt-0"  > 

<!-- NUEVO FORMULARIO CREACION -->

<div  v-if="centers_found_flag">
  
              <text class="text-dark">Aqui puedes crear un nuevo calendario llenado la siguiente información </text>
                   
                    <div class="card mb-0 p-3 w-100 border border-1 border-white bg-white" style="width: 18rem; border-radius: 15px; "   >
                    
                    <div class="card-body p-0 m-0" >
                    
                    <div class="d-flex justify-content-between p-2 w-100 " style="width: 18rem; border-radius: 15px; " >
                                
                               
                    </div>

                <div class=" text-dark w-100">
                    <div class="m-0 ">
                   
                  <!-- CONSULTANCY -->
                  <div class="">
                                   <text>Consulta
                                   </text>
                                    <div class="form-group h3 border border-1 border-primary">
                                         <InputFormCenterProfessional  v-on:centers_found_flag_emit='centers_found_flag_emit' v-on:centersError='centersError' v-on:selectedCenterCode="selectedCenterCode" :session_params="session_params" v-on:switchView="switchView" > </InputFormCenterProfessional> 
                                    </div>
                  </div>   
                    
                  <!-- SPECIALTY -->
                    <div class="mt-2">
                          <div>
                            <text> Especialidad </text>
                          </div>
                        
                          <div class="">
                                    <select   v-model="form_specialty_id" class="bg-white border border-1 border-primary text-dark form-control  " :class="{ 'bg-white border border-1': true }" id="form_specialty_id" >
                                    <option v-for="specialty in specialties" :key="specialty.id" :value="specialty.id">
                                      {{ specialty.name }} 
                                    </option>
                                  </select>        
                          </div>
                    </div>
                    
                    

                  <!-- CALENDAR DATE START-->
                  <div  class="d-flex justify-content-between mt-3">
                          <div class="p-2">
                          Fecha Inicio
                          </div>

                          <div class="p-2 border border-1  border-primary" @click="show_date_start=!show_date_start"  >
                                {{formatDate(form_calendar_start)}} <i class="bi bi-calendar-week"></i>
                          </div>
                  </div>
                  <div v-if="show_date_start">
                          <datepicker :disabled-dates="disabled_dates_start" :prevent-disable-date-selection="preventDisableDateSelection" class="text-dark"   ref="inputRef"  @selected="setCalendarStart" :monday-first="true" :inline="true" v-model="form_calendar_start" :calendar-button="false" input-class='bigText' format="dd"  calendar-button-icon="nada"  name="uniquename"></datepicker>
                  </div>
                  <!--  -->

                  <!-- CALENDAR DATE END -->
                  <div class="d-flex justify-content-between mt-3">
                      <div class="p-2">
                          Fecha Fin
                      </div>
                      <div class="p-2 border border-1 border-primary" @click="show_date_end=!show_date_end"  >
                             {{formatDate(form_calendar_end)}} <i class="bi bi-calendar-week"></i>
                      </div>
                  </div>
                  <div v-if="show_date_end">
                        <datepicker :disabled-dates="disabled_dates_end" :prevent-disable-date-selection="preventDisableDateSelection" class="text-dark"   ref="inputRef"  @selected="setCalendarEnd" :monday-first="true" :inline="true" v-model="form_calendar_end" :calendar-button="false" input-class='bigText' format="dd"  calendar-button-icon="nada"  name="uniquename"></datepicker>
                  </div>
                  <!--  -->

                <!-- TIME START -->
                  <div  class="d-flex justify-content-between mt-3">
                          <text>Hora Inicio </text>

                          <div  class="d-flex flex-row-reverse">
                            <div class="d-flex justify-content-end">
                            <select class="form-select border border-1 border-primary"  v-model="start_hour"   >
                                <option selected>00</option>
                                <option value="00">00</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>                             
                            </select>
                             &nbsp;<text class="h5">:</text>&nbsp;
                            <select class="form-select border border-1 border-primary" v-model="start_minutes"   >
                                <option selected>00</option>
                                <option value="00">00</option>
                                <option value="05">05</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                                <option value="50">50</option>
                                <option value="55">55</option>                           
                            </select>
                            &nbsp;Hrs 

                            </div>
                          </div>



                          <!--
                          <div class="d-flex justify-content-end">
                              <div @click="show_start_hour=!show_start_hour ; show_start_minutes=false" class="p-2 border border-1">
                                  <text >{{start_hour}}</text> 
                              </div>
                              <div class="p-2">:</div>
                              <div @click="show_start_minutes=!show_start_minutes" class="p-2 border border-1">
                                  <text >{{start_minutes}}</text>
                              </div>
                              <div class="p-2">hrs</div>
                          </div>
                        -->


                  </div>
                  <!--
                    <div v-if="show_start_hour" class="text-white">
                      <div class="bg-success text-white border border-1 border-dark">
                        <text class="p-2 h5 ">Seleccione Hora Inicio</text>
                      </div>
      
                      <table class="table caption-top">
                      
                      <tbody class="border border-dark text-dark  bg-white">
                        <tr class="border border-white">
                          <td @click="start_hour='00'; show_start_hour=false" class="p-2 border border-dark text-center">00</td>
                          <td @click="start_hour='01'; show_start_hour=false" class="p-2 border border-dark text-center">01</td>
                          <td @click="start_hour='02'; show_start_hour=false" class="p-2 border border-dark text-center">02</td>
                          <td @click="start_hour='03'; show_start_hour=false" class="p-2 border border-dark text-center">03</td>
                          <td @click="start_hour='04'; show_start_hour=false" class="p-2 border border-dark text-center">04</td>
                          <td @click="start_hour='05'; show_start_hour=false" class="p-2 border border-dark text-center">05</td>
                        </tr>
                        <tr>
                          <td @click="start_hour='06'; show_start_hour=false" class=" border border-dark  text-center">06</td>
                          <td @click="start_hour='07'; show_start_hour=false" class=" border border-dark  text-center">07</td>
                          <td @click="start_hour='08'; show_start_hour=false" class=" border border-dark  text-center">08</td>
                          <td @click="start_hour='09'; show_start_hour=false" class=" border border-dark  text-center">09</td>
                          <td @click="start_hour='10'; show_start_hour=false" class=" border border-dark  text-center">10</td>
                          <td @click="start_hour='11'; show_start_hour=false" class=" border border-dark  text-center">11</td>
                        </tr>
                        <tr>
                          <td @click="start_hour='12'; show_start_hour=false" class=" border border-dark  text-center">12</td>
                          <td @click="start_hour='13'; show_start_hour=false" class=" border border-dark  text-center">13</td>
                          <td @click="start_hour='14'; show_start_hour=false" class=" border border-dark  text-center">14</td>
                          <td @click="start_hour='15'; show_start_hour=false" class=" border border-dark  text-center">15</td>
                          <td @click="start_hour='16'; show_start_hour=false" class=" border border-dark  text-center">16</td>
                          <td @click="start_hour='17'; show_start_hour=false" class=" border border-dark  text-center">17</td>
                        </tr>
                        <tr>
                          <td @click="start_hour='18'; show_start_hour=false" class=" border border-dark  text-center">18</td>
                          <td @click="start_hour='19'; show_start_hour=false" class=" border border-dark  text-center">19</td>
                          <td @click="start_hour='20'; show_start_hour=false" class=" border border-dark  text-center">20</td>
                          <td @click="start_hour='21'; show_start_hour=false" class=" border border-dark  text-center">21</td>
                          <td @click="start_hour='22'; show_start_hour=false" class=" border border-dark  text-center">22</td>
                          <td @click="start_hour='23'; show_start_hour=false" class=" border border-dark  text-center">23</td>
                        </tr>
                      </tbody>
                      </table>
            

                  </div>
                -->


  <!-- MINUTES selector Start -->
                  <!-- 
                  <div v-if="show_start_minutes" class="text-white">
                      <div class="bg-success text-white border border-1 border-dark">
                        <text class="p-2 h5 ">Seleccione Minutos</text>
                      </div>
                     
                      <table class="table caption-top">
                     
                      <tbody class="border border-dark text-dark bg-white">
                        <tr>
                          <td @click="start_minutes='00'; show_start_minutes=false" class="border border-dark  p-2 text-center">00</td>
                          <td @click="start_minutes='05'; show_start_minutes=false" class="border border-dark  p-2 text-center">05</td>
                          <td @click="start_minutes='10'; show_start_minutes=false" class="border border-dark  p-2 text-center">10</td>
                          <td @click="start_minutes='15'; show_start_minutes=false" class="border border-dark  p-2 text-center">15</td>
                          <td @click="start_minutes='20'; show_start_minutes=false" class="border border-dark  p-2 text-center">20</td>
                          <td @click="start_minutes='25'; show_start_minutes=false" class="border border-dark  p-2 text-center">25</td>
                        </tr>
                        <tr>
                          <td @click="start_minutes='30'; show_start_minutes=false" class="border border-dark  text-center">30</td>
                          <td @click="start_minutes='35'; show_start_minutes=false" class="border border-dark  text-center">35</td>
                          <td @click="start_minutes='40'; show_start_minutes=false" class="border border-dark  text-center">40</td>
                          <td @click="start_minutes='45'; show_start_minutes=false" class="border border-dark  text-center">45</td>
                          <td @click="start_minutes='50'; show_start_minutes=false" class="border border-dark  text-center">50</td>
                          <td @click="start_minutes='55'; show_start_minutes=false" class="border border-dark  text-center">55</td>
                        </tr>
                      </tbody>
                      </table>
                    </div>
                  -->
                <!-- CONCLUDE TIME START -->

                <!-- TIME END -->
                  <div  class="d-flex justify-content-between mt-3">
                          <text>Hora Fin</text>



                          <div  class="d-flex flex-row-reverse">
                            <div class="d-flex justify-content-end">
                            <select class="form-select border border-1 border-primary"  v-model="end_hour"   >
                                <option selected>00</option>
                                <option value="00">00</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>                             
                            </select>
                             &nbsp;<text class="h5">:</text>&nbsp;
                            <select class="form-select border border-1 border-primary" v-model="end_minutes"   >
                                <option selected>00</option>
                                <option value="00">00</option>
                                <option value="05">05</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                                <option value="50">50</option>
                                <option value="55">55</option>                           
                            </select>
                            &nbsp;Hrs 

                            </div>
                          </div>
                          <!--
                          <div class="d-flex justify-content-end">
                              <div @click="show_end_hour=!show_end_hour ; show_end_minutes=false" class="p-2 border border-1">
                                  <text >{{end_hour}}</text> 
                              </div>
                              <div class="p-2">:</div>
                              <div @click="show_end_minutes=!show_end_minutes" class="p-2 border border-1">
                                  <text >{{end_minutes}}</text>
                              </div>
                              <div class="p-2">hrs</div>
                          </div>

                        -->

                  </div>
                  <!--
                    <div v-if="show_end_hour" class="">
                      <div class="bg-success text-white border border-1 border-dark">
                        <text class="p-2 h5 ">Seleccione Hora Inicio</text>
                      </div>
                      <table class="table caption-top">
                      
                      <tbody class="border border-dark text-dark bg-white">
                        <tr class="border border-dark">
                          <td @click="end_hour='00'; show_end_hour=false" class="p-2 border border-dark text-center">00</td>
                          <td @click="end_hour='01'; show_end_hour=false" class="p-2 border border-dark text-center">01</td>
                          <td @click="end_hour='02'; show_end_hour=false" class="p-2 border border-dark text-center">02</td>
                          <td @click="end_hour='03'; show_end_hour=false" class="p-2 border border-dark text-center">03</td>
                          <td @click="end_hour='04'; show_end_hour=false" class="p-2 border border-dark text-center">04</td>
                          <td @click="end_hour='05'; show_end_hour=false" class="p-2 border border-dark text-center">05</td>
                        </tr>
                        <tr>
                          <td @click="end_hour='06'; show_end_hour=false" class=" border border-dark  text-center">06</td>
                          <td @click="end_hour='07'; show_end_hour=false" class=" border border-dark  text-center">07</td>
                          <td @click="end_hour='08'; show_end_hour=false" class=" border border-dark  text-center">08</td>
                          <td @click="end_hour='09'; show_end_hour=false" class=" border border-dark  text-center">09</td>
                          <td @click="end_hour='10'; show_end_hour=false" class=" border border-dark  text-center">10</td>
                          <td @click="end_hour='11'; show_end_hour=false" class=" border border-dark  text-center">11</td>
                        </tr>
                        <tr>
                          <td @click="end_hour='12'; show_end_hour=false" class=" border border-dark  text-center">12</td>
                          <td @click="end_hour='13'; show_end_hour=false" class=" border border-dark  text-center">13</td>
                          <td @click="end_hour='14'; show_end_hour=false" class=" border border-dark  text-center">14</td>
                          <td @click="end_hour='15'; show_end_hour=false" class=" border border-dark  text-center">15</td>
                          <td @click="end_hour='16'; show_end_hour=false" class=" border border-dark  text-center">16</td>
                          <td @click="end_hour='17'; show_end_hour=false" class=" border border-dark  text-center">17</td>
                        </tr>
                        <tr>
                          <td @click="end_hour='18'; show_end_hour=false" class=" border border-dark  text-center">18</td>
                          <td @click="end_hour='19'; show_end_hour=false" class=" border border-dark  text-center">19</td>
                          <td @click="end_hour='20'; show_end_hour=false" class=" border border-dark  text-center">20</td>
                          <td @click="end_hour='21'; show_end_hour=false" class=" border border-dark  text-center">21</td>
                          <td @click="end_hour='22'; show_end_hour=false" class=" border border-dark  text-center">22</td>
                          <td @click="end_hour='23'; show_end_hour=false" class=" border border-dark  text-center">23</td>
                        </tr>
                      </tbody>
                      </table>
                    </div>
                  -->

                  <!-- 
                    <div v-if="show_end_minutes" class="text-white">
                      <div class="bg-success text-white border border-1 border-dark">
                          <text>Seleccione Minutos</text>
                      </div>
                      
                      <table class="table caption-top bg-white text-dark">
                      <tbody class="border border-dark text-dark">
                        <tr>
                          <td @click="end_minutes='00'; show_end_minutes=false" class="border border-dark  p-2 text-center">00</td>
                          <td @click="end_minutes='05'; show_end_minutes=false" class="border border-dark  p-2 text-center">05</td>
                          <td @click="end_minutes='10'; show_end_minutes=false" class="border border-dark  p-2 text-center">10</td>
                          <td @click="end_minutes='15'; show_end_minutes=false" class="border border-dark  p-2 text-center">15</td>
                          <td @click="end_minutes='20'; show_end_minutes=false" class="border border-dark  p-2 text-center">20</td>
                          <td @click="end_minutes='25'; show_end_minutes=false" class="border border-dark  p-2 text-center">25</td>
                        </tr>
                        <tr>
                          <td @click="end_minutes='30'; show_end_minutes=false" class="border border-dark  text-center">30</td>
                          <td @click="end_minutes='35'; show_end_minutes=false" class="border border-dark  text-center">35</td>
                          <td @click="end_minutes='40'; show_end_minutes=false" class="border border-dark  text-center">40</td>
                          <td @click="end_minutes='45'; show_end_minutes=false" class="border border-dark  text-center">45</td>
                          <td @click="end_minutes='50'; show_end_minutes=false" class="border border-dark  text-center">50</td>
                          <td @click="end_minutes='55'; show_end_minutes=false" class="border border-dark  text-center">55</td>
                        </tr>
                      </tbody>
                      </table>
                    </div>
                  -->
                <!-- CONCLUDE TIME START -->


                <!-- APP DURATION  -->
                <div  class="d-flex justify-content-between mt-3">
                            <text> Tiempo de atencion: </text>

                            <div  class="d-flex flex-row-reverse">
                            <div class="d-flex justify-content-end">
                                <select class="form-select border border-1 border-primary" v-model="form_app_duration"  >
                                  <option selected>00</option>
                                    <option value="00">00</option>
                                    <option value="05">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                    <option value="30">30</option>
                                    <option value="35">35</option>
                                    <option value="40">40</option>
                                    <option value="45">45</option>
                                    <option value="50">50</option>
                                    <option value="55">55</option>                           
                                </select>
                                <text>&nbsp;  Minutos </text>
                                
                            </div>
                            </div>

                            <!--
                            <div @click="show_duration_minutes=!show_duration_minutes" class="p-2 border border-1">
                                  <text >{{form_app_duration}}</text> Minutos
                            </div>
                          -->
                </div>
              <!--
                <div v-if="show_duration_minutes" class="">
                    <div class="bg-success text-white border border-1 border-dark">
                      <text>Seleccione tiempo de duracion de su cita</text>
                    </div> 
                     <table class="table caption-top bg-white text-dark">
                     
                      <tbody class="border border-1 border-dark ">
                        <tr>
                          <td @click="form_app_duration='00'; show_duration_minutes=false" class="border border-dark  p-2 text-center">00 Min</td>
                          <td @click="form_app_duration='05'; show_duration_minutes=false" class="border border-dark  p-2 text-center">05</td>
                          <td @click="form_app_duration='10'; show_duration_minutes=false" class="border border-dark  p-2 text-center">10</td>
                          <td @click="form_app_duration='15'; show_duration_minutes=false" class="border border-dark  p-2 text-center">15</td>
                          <td @click="form_app_duration='20'; show_duration_minutes=false" class="border border-dark  p-2 text-center">20</td>
                          <td @click="form_app_duration='25'; show_duration_minutes=false" class="border border-dark  p-2 text-center">25</td>
                        </tr>
                        <tr>
                          <td @click="form_app_duration='30'; show_duration_minutes=false" class="border border-dark  text-center">30</td>
                          <td @click="form_app_duration='35'; show_duration_minutes=false" class="border border-dark  text-center">35</td>
                          <td @click="form_app_duration='40'; show_duration_minutes=false" class="border border-dark  text-center">40</td>
                          <td @click="form_app_duration='45'; show_duration_minutes=false" class="border border-dark  text-center">45</td>
                          <td @click="form_app_duration='50'; show_duration_minutes=false" class="border border-dark  text-center">50</td>
                          <td @click="form_app_duration='55'; show_duration_minutes=false" class="border border-dark  text-center">55</td>
                        </tr>
                      </tbody>
                      </table>
                </div>
              -->
                <!-- END  APP DURATION  -->


                <!-- TIEMPO ATENCION ENTRE CITAS  -->
                <div  class="d-flex justify-content-between mt-3">
                           
                  <text> Tiempo entre Citas: </text>

                    <div  class="d-flex flex-row-reverse">
                            <div class="d-flex justify-content-end">
                                <select class="form-select border border-1 border-primary" v-model="form_app_time_between"  >
                                    <option value="00">00</option>
                                    <option value="05">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                    <option value="30">30</option>
                                    <option value="35">35</option>
                                    <option value="40">40</option>
                                    <option value="45">45</option>
                                    <option value="50">50</option>
                                    <option value="55">55</option>                           
                                </select>
                                <text>&nbsp;  Minutos </text>
                                
                            </div>
                      </div>
                          <!--        
                            <div @click="show_timebtw_minutes=!show_timebtw_minutes" class="p-2 border border-1">
                                  <text >{{form_app_time_between}}</text> Minutos
                            </div>
                          -->
                            
                </div>

                <!-- 
                  <div v-if="show_timebtw_minutes" class="test-dark bg-white  border-dark">
                    <div class="text-white bg-success">  
                        <text class="p-2">Entre Citas Tiempo duracion Minutos</text>
                    </div>
                    
                    <table class="table caption-top">
                     
                      <tbody class="border border-white text-dark">
                        <tr>
                          <td @click="form_app_time_between='00'; show_timebtw_minutes=false" class="border border-dark  p-2 text-center">00</td>
                          <td @click="form_app_time_between='05'; show_timebtw_minutes=false" class="border border-dark  p-2 text-center">05</td>
                          <td @click="form_app_time_between='10'; show_timebtw_minutes=false" class="border border-dark  p-2 text-center">10</td>
                          <td @click="form_app_time_between='15'; show_timebtw_minutes=false" class="border border-dark  p-2 text-center">15</td>
                          <td @click="form_app_time_between='20'; show_timebtw_minutes=false" class="border border-dark  p-2 text-center">20</td>
                          <td @click="form_app_time_between='25'; show_timebtw_minutes=false" class="border border-dark  p-2 text-center">25</td>
                        </tr>
                        <tr>
                          <td @click="form_app_time_between='30'; show_timebtw_minutes=false" class="border border-dark  text-center">30</td>
                          <td @click="form_app_time_between='35'; show_timebtw_minutes=false" class="border border-dark  text-center">35</td>
                          <td @click="form_app_time_between='40'; show_timebtw_minutes=false" class="border border-dark  text-center">40</td>
                          <td @click="form_app_time_between='45'; show_timebtw_minutes=false" class="border border-dark  text-center">45</td>
                          <td @click="form_app_time_between='50'; show_timebtw_minutes=false" class="border border-dark  text-center">50</td>
                          <td @click="form_app_time_between='55'; show_timebtw_minutes=false" class="border border-dark  text-center">55</td>
                        </tr>
                      </tbody>
                      </table>
                </div>
              -->
                <!-- END  TIEMPO ATENCION ENTRE CITAS  -->

                <!-- INSERT PRICE   -->
                <div class="mt-3 d-flex justify-content-between">
                  
                  <div>precio </div>

                  <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>

                  <div class="input-group mb-3 w-50">   
                    <div class="input-group-prepend">
                      <span class="input-group-text">$</span>
                    </div>
                    <input v-model="form_app_price" type="text" min="1" max="999999999" maxlength="15" class="form-control border border-1 border-primary" aria-label="Amount (to the nearest dollar)">
                    <!-- 
                      <div class="input-group-append">
                        <span class="input-group-text">.00</span>
                      </div>
                    -->
                  </div>


                </div>

                

                <!-- SELECT COLOR   -->
                <div  class="d-flex justify-content-between mt-3">
                            <text>Seleccione Color de Referencia </text>  
                            <!--  
                            <div  class="col-9 w-25 text-dark" :style="{ 'background-color' : form_calendar_color   }" >
                                <p @click="showColorSelection=!showColorSelection" class="p-2 pt-2 h5"> <i class="bi bi-moisture"></i> </p>
                            
                            </div>
                            -->
                </div>

                <div v-if="true" class="d-flex justify-content-end" >
                    <div v-for="calcol in calendarColorArray"  :key="calcol.id"  >
                       <div class="m-1 p-3 border border-3" @click="form_calendar_color=calcol "  :class="{'border-primary' : (form_calendar_color==calcol )}" :style="{ 'background-color' : calcol   }" > </div>
                    </div>
                </div>
               
              <!-- SELECT DAYS RECURRENCY   -->
                <div class="mt-3">
                  Dias Recurrencia: <br>

                  <div class="d-flex justify-content-between  m-0 p-0">
                    <div class="border border-3 m-1 p-2"  @click="form_recurrency_mon=!form_recurrency_mon" :class="{ 'bg-white p-1': true , 'border-primary' :form_recurrency_mon  }" >Lu</div>
                    <div class="border border-3 m-1 p-2"  @click="form_recurrency_tue=!form_recurrency_tue" :class="{ 'bg-white p-1': true , 'border-primary':form_recurrency_tue }" >Ma</div>
                    <div class="border border-3 m-1 p-2"  @click="form_recurrency_wed=!form_recurrency_wed" :class="{ 'bg-white p-1': true , 'border-primary':form_recurrency_wed }" >Mi</div>
                    <div class="border border-3 m-1 p-2"  @click="form_recurrency_thu=!form_recurrency_thu" :class="{ 'bg-white p-1': true , 'border-primary':form_recurrency_thu }">Ju</div>
                    <div class="border border-3 m-1 p-2"  @click="form_recurrency_fri=!form_recurrency_fri" :class="{ 'bg-white p-1': true , 'border-primary':form_recurrency_fri }">Vie</div>
                  </div>

                  <div class="d-flex justify-content-start m-0 p-0">
                    <div class="border border-3 m-1 p-2" @click="form_recurrency_sat=!form_recurrency_sat" :class="{ 'bg-white p-1': true , 'border-primary':form_recurrency_sat }">Sa</div>
                    <div class="border border-3 m-1 p-2" @click="form_recurrency_sun=!form_recurrency_sun" :class="{ 'bg-white p-1': true , 'border-primary':form_recurrency_sun }">Do</div>
                  </div>

                </div>



                <hr class="text-white ">

                <button type="button" @click="createNewCalendar" class="btn btn-primary m-3" >Crear Calendario </button>
                       
                                 <!--    <p class="text-white">C#{{calendar.calendar_id}} </p> -->
               
                </div>
                </div>
                </div>
                    <!-- end card -->
                </div>   
                    
</div>
<div class="text-white " >
Debe exisitr al menos una consulta antes de crear un Calendario
</div>

          

          </div>
     

            </div> 
            </div> 		
            </div> 
            </transition>
    	</div>

      
  
    </div>
	</teleport> 

</template>



<style scoped>

.modal {
   /*position: static;  */
   /*position: static; */
	/*position: relative; */ 
	/*position: absolute; */ 
	position: fixed; 
	/*position: sticky; */
 /* position: fixed;  */
 /* display: block; */ 
   display: flex; 

}

/*
.modal div {
  display: flex; 
  flex-direction: column; 

}
*/

div.scroll {
       			margin:4px, 4px;
                padding:4px;
                background-color: green;
                width: 100%; 
                /* height: 190%;*/
                overflow-x: auto;
                overflow-y: auto;
                text-align:justify;
      }

/*
.modal-background {
    background-color:#DAEFF3
        }
*/
/************************* */



.modal-mask {
  /*position: fixed;*/
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
 /* display: table;*/
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
 /*width: 100px;*/
  margin: 2px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/************************ */

</style>


<script>

export default {

data: function () {
		return {

            showColorSelection : false  ,

            show_start_hour : false ,
            start_hour : '00' ,
            show_start_minutes : false ,
            start_minutes : '00' ,
            
            
            
			      showModalCreateCalendar  : false ,

            form_start_time : '00:00', 
            form_end_time : '00:00' ,

           
            form_minimum_date : null ,



            form_appointment_center: false ,
            form_appointment_home : false ,
            form_appointment_remote : false , 
            //form_appoirntment_recurrency : [],
           

            form_comunas_id : [] ,
            
            

            specialties : [] , 
            needsCreateCenter : null ,
            /*            
            //required by timepicker
            time : null ,

            centers_found_flag : true ,
            
            showColorSelection : true ,
            
            monday : false ,
            tuesday : false ,
            wednesday : null ,
            thursday : null,
            friday : null ,
            saturday : null ,
            sunday : null, 
            
            showEdit : false ,
            */
           
            //showColorSelection : false ,
            
            //START FORM DATA
            form_specialty_id : null ,
            
            form_center_code  : null ,
            
            show_date_start : false ,
            form_calendar_start: null ,
           
            show_date_end : false ,
            form_calendar_end: null ,

            show_start_hour: false ,
            show_start_minutes : false , 

            show_start_hour : false ,
            start_hour : '00' ,
            show_start_minutes : false ,
            start_minutes : '00' ,

            show_end_hour : false ,
            end_hour : '23' ,
            show_end_minutes : false ,
            end_minutes : '00' ,
            
            form_app_duration : '00' ,
            show_duration_minutes : false,

            show_timebtw_minutes : false,
            form_app_time_between : '00' ,

            form_calendar_color : "#FCFFE9" ,
            calendarColorArray : ["#FF4244","#4ebeef","#AF8536", "#f6a700", "#32b780", "#dd6da4"],
           
            form_recurrency_mon : false  , 
            form_recurrency_tue : false , 
            form_recurrency_wed : false , 
            form_recurrency_thu : false , 
            form_recurrency_fri : false , 
            form_recurrency_sat : false , 
            form_recurrency_sun : false , 
            //END FORM DATA
            
            month_name : ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
            centers_found_flag : true, 

           // maximum_calendar_start : null ,
           // maximum_calendar_end  : null ,

           form_app_price : "0" ,

           preventDisableDateSelection : true ,
           disabled_dates_start : null ,
           disabled_dates_end : null ,
           
		 }
	},

	props: ['session_params','activatorCreateNewCalendar','global_comunas' , 'global_specialties' ],
  emits: ['updateCalendarList','switchView','centers_not_null' ],

    created () {
      console.log("created modalCreateCalendar");
      this.getSpecialties(); 
      this.form_calendar_start = new Date()
      this.form_calendar_end = new Date()

      this.disabled_dates_start = {
        to: new Date(this.form_calendar_start.getTime() ), // Disable all dates up to specific date
        from: new Date(this.form_calendar_start.getTime()+(86400000*60)), 
        preventDisableDateSelection: true
        }
      this.disabled_dates_end = {
        to: new Date(this.form_calendar_start.getTime() ), // Disable all dates up to specific date
        from: new Date(this.form_calendar_start.getTime()+(86400000*60)), 
        preventDisableDateSelection: true
        }
      
      //this.form_calendar_start=current_date.getDate()+"/"+current_date.getMonth()+1+"/"+ current_date.getFullYear() 
    },

    mounted () {
      console.log("mounted modalCreateCalendar");
      },
 
    methods: {
      
      setCalendarStart(date)
      {
        console.log("date Selected en emit :"+date);
        //let aux_date=new Date(date);
        this.form_calendar_start= new Date(date);
        this.form_calendar_end= new Date(date);
         this.disabled_dates_end.to = new Date(date)
     //   this.form_calendar_start=aux_date.getDate()+"/"+month_name[aux_date.getMonth()]+"/"+ aux_date.getFullYear()
        this.show_date_start = false
      },

      setCalendarEnd(date)
      {
        console.log("date Selected en emit :"+date);
        //let aux_date=new Date(date);
        this.form_calendar_end= new Date(date);
       // this.form_calendar_end=aux_date.getDate()+"/"+(aux_date.getMonth()+1)+"/"+ aux_date.getFullYear()
        this.show_date_end = false
      },

      formatDate(val)
      {
        let aux_date=new Date(val);
        let response= aux_date.getDate()+" de "+this.month_name[parseInt(aux_date.getMonth())]+" "+ aux_date.getFullYear()
        return response
      },

      centers_found_flag_emit(val)
      {
      this.centers_found_flag=val
      console.log("MODAL CREATE CALENDAR centers_found_flag : "+this.centers_found_flag);  
      this.$emit('centers_not_null',this.centers_found_flag);
      },
      
      switchView(){
            this.$emit('switchView');
      },

      selectedCenterCode(value)
      {
      console.log("Center selected code: "+value);
      this.form_center_code = value ;
      },

      selectedComunas(value)
      {
      console.log("capture emit comuna List "+JSON.stringify(value));
      let aux=JSON.parse(value) ;
      this.form_comunas_id = [] ;
          for (let i = 0 ; i < aux.length ; i++) {
             this.form_comunas_id.push( aux[i].id );
          }
          console.log("Comuna id array:"+this.form_comunas_id );
      },

      centersError(value) {
      console.log("centersError In modal "+value);
      this.needsCreateCenter = value ; 
      },

        async getSpecialties(){
                console.log ("getSpecialties :" );
                const json = { 
                   professional_id: this.session_params.professional_id ,
                  // professional_id : 1 ,
                   };

                console.log("getSpecialties REQUEST :"+JSON.stringify(json));
                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/get_professional_specialty",json);
                console.log ("getSpecialties  RESPONSE:"+JSON.stringify(response_json.data.rows)) ;
                this.specialties= response_json.data.rows ; 
        },

        async createNewCalendar(){
                console.log("createNewCalendar Request JSON");
                console.log ("createNewCalendar :" );

                let end_date_corrected = new Date(this.form_calendar_end)
                end_date_corrected.setHours(24,0,0,0)
                end_date_corrected = new Date(end_date_corrected.getTime()-3)
               //one milisecond to dont reach next day
               // var day = (60 * 60 * 24 * 1000 )-1000;
               // end_date_corrected = new Date(end_date_corrected.getTime() + (day*2) )  
                
                let start_date_corrected = new Date(this.form_calendar_start)
                start_date_corrected.setHours(0,0,0,0)
                //start_date_corrected = new Date(start_date_corrected.getTime() + (day) )    
/*
                let end_date_correct =             
                var day = 60 * 60 * 24 * 1000;
                var endDate = new Date(startDate.getTime() + day);
*/
              const json = { 
            
                form_calendar_start: start_date_corrected ,
                form_calendar_end: end_date_corrected , 
                 
                //form_start_time : this.form_start_time,
                //form_end_time : this.form_end_time ,
                time_offset: start_date_corrected.getTimezoneOffset(),
                
                //WARGNING THIS OFFSET  SETTING, WILL ONLY WORK FOR CHILEAN TIME, BECAUSE WE HARDCODED THE MINUS
                form_start_time : this.start_hour+":"+this.start_minutes+":00-"+(start_date_corrected.getTimezoneOffset()/60)  ,
                form_end_time : this.end_hour+":"+this.end_minutes+":00-"+(start_date_corrected.getTimezoneOffset()/60) ,
                
                form_specialty_id : this.form_specialty_id, 
                form_app_duration : this.form_app_duration ,
                form_app_time_between : this.form_app_time_between ,

                form_recurrency_mon : this.form_recurrency_mon, 
                form_recurrency_tue : this.form_recurrency_tue , 
                form_recurrency_wed : this.form_recurrency_wed , 
                form_recurrency_thu : this.form_recurrency_thu , 
                form_recurrency_fri : this.form_recurrency_fri , 
                form_recurrency_sat : this.form_recurrency_sat , 
                form_recurrency_sun : this.form_recurrency_sun , 

                form_appointment_center: this. form_appointment_center ,
                form_appointment_home: this.form_appointment_home ,
                form_appointment_remote: this.form_appointment_remote ,

                form_appointment_home_locations: this.form_comunas_id ,
                form_appointment_center_code: this.form_center_code ,
                
                form_calendar_color : this.form_calendar_color ,

                professional_id: this.session_params.professional_id ,

                date: new Date(),

                form_app_price : this.form_app_price.replaceAll('.','')
                
                          };

              console.log("REQUEST :"+JSON.stringify(json));
              
            
              let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_create_calendar",json);
              console.log ("RESPONSE:"+JSON.stringify(response_json.data)) ;
              this.$emit('updateCalendarList');  
              this.showModalCreateCalendar = false ;
              alert("Calendario Creado. Debe ser Activado para que sea publico.");
              
        },


        aprice_formatter(amount) 
        {
          return amount.toLocaleString('es-cl');  
        },


	    },
    
    watch : {

        form_app_price(amount) 
        {
          console.log("amount"+ amount)
          amount = amount.replaceAll('.','');
          console.log("amount-"+ amount)
          console.log("formating amount"+ Number(amount).toLocaleString('es-cl') )
          this.form_app_price = Number(amount).toLocaleString('es-cl')

        },
        
        activatorCreateNewCalendar (newValue){
            console.log ("showModalCreateCalendar !!!"+newValue );  
            this.showModalCreateCalendar = true ;
            
            this.form_calendar_color = this.calendarColorArray[Math.floor(Math.random() * 6)]
 
            this.specialties=this.getSpecialties();
        },
    },
    


}
</script>

