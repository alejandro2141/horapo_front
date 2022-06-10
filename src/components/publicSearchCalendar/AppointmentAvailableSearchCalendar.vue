<script setup>
import { ref } from 'vue'



//const count = ref(0)
</script>

<template>
    
    
    <div v-if="appointment != null"   style="border-radius: 15px; background-color: #2874A6;"  class="text-white fs-4 p-3 mb-1  ">
        
        <text>{{ appointment.date.split("-")[2].substring(0,2)  }} de {{ month_name[parseInt(appointment.date.split("-")[1]-1 ) ] }} </text>
        <br><text>{{appointment.date.split("-")[0] }}   </text>   
 


    {{appointment.start_time}} 
    <!-- 
        <div id="app" class="m-0 d-flex  "  >	
            <div class="">
                     &nbsp;
            </div>
            <div>
                <div class="">
                    <div class="display-5" style=" color:#2e5668">	 
                   <b>  {{ transform_date( appointment.date.substring(0, 10) ) }} </b>
                    
                 {{appointment.start_time}} <text style=" font-size: 0.6em;">hrs</text>  
                    </div>       
                </div>
           
                <div class="display-5" style=" color:#1f9d94">
                    <div >	
                    {{ showSpecialtyName(appointment.specialty1) }} 
                    </div>       
                </div>
 
                <div class="">

                    <div v-if="appointment.center_visit" class="">
                 
                        <div class="display-6" style="">  
                            <div style="color: #781ED1" >
                            <i class="h1 bi bi-building"></i> En Consulta  </div>
                            </div>
                            <div style="" class="text-dark display-6" >
                               {{comuna_id2name(appointment.center_visit_location)}}
                            </div>
                            <div class="" style="color:#2e5668" >	
                                {{appointment.center_name}}
                            </div> 
                            <div style="color:#2e5668">
                               {{appointment.center_address}}
                            </div>
                            
                    </div>
                    
                    <div v-if="appointment.home_visit" style="color:#3399FF">
                            <div class="display-5" >
                                <i class=" bi bi-house-door"></i><text >  Visita a Domicilio:</text> <br>
                            </div>
                            <div style="" class="text-dark display-6" >
                              {{  comuna_id2name(appointment.home_visit_location1) }}
                              {{  comuna_id2name(appointment.home_visit_location2) }}
                              {{  comuna_id2name(appointment.home_visit_location3) }}
                              {{  comuna_id2name(appointment.home_visit_location4) }}
                              {{  comuna_id2name(appointment.home_visit_location5) }}
                              {{  comuna_id2name(appointment.home_visit_location6) }}
                            </div>
                    </div>

                    <div v-if="appointment.remote_care" class="">
                         <div class="display-5" style="color:#b36b00" >
                               <i class="bi bi-camera-video"></i> Tele Atención  	 
                              <div style="" class="text-dark display-6" >
                               Todas las comunas 
                              </div>                      
                        </div>
                    </div>

                </div>
            
            </div>

            </div>

                
     <text style="color: #ffffff;" >#{{appointment.calendar_id}}</text> 
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
        day_name : ['Lunes','Martes','Miercoles','jueves','Viernes','Sabado','Domingo'] , 
        month_name : ['Enero','Ferero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] , 

            }
  },
  
  props: ['appointment','searchParameters' , 'global_comunas' , 'global_specialties' ],

 mounted () {  
        },

methods: {

     showSpecialtyName(id){
            let temp= this.global_specialties.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }

        },
    /*
    showSpecialtyName(app)
    {
        if (this.searchParameters.specialty != null)
        {return this.searchParameters.specialty.name }
        else {
            return (app.specialty_name )
        }
    },
    */
    comuna_id2name(id)
    {
            let temp= this.global_comunas.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
    },

    transform_date(date)
    {
        let temp = date.split("-") ;
        return (""+temp[2]+" "+this.getShortMonthName(temp[1])+" "+temp[0])
    },
    getShortMonthName(month)
    {
              console.log("MONTH:"+parseInt(month));
              let months = ['nodata','Ene.','Feb.' ,'Marz.','Abr.','May.','Jun.','Jul.','Ago.','Sept.','Oct.','Nov.','Dic.' ]
              return months[parseInt(month)];
    },
        
        
        },

}
</script>