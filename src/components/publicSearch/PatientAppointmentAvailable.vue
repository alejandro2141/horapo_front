<script setup>
import { ref } from 'vue'



//const count = ref(0)
</script>

<template>
    
    
    <div v-if="appointment != null"   style="border: 3px solid rgb(168, 168, 168); border-radius: 10px;"  class="bg-white p-0 mb-1 ">
        
        <div id="app" class="m-0 d-flex  "  >	
            <div class="">
                     &nbsp;
            </div>
            <div>
                <div class="">
                    <div class="display-5" style=" color:#2e5668">	
                   <b> {{ transform_date( appointment.date.substring(0, 10) ) }}</b>
                    
                   {{appointment.start_time.substring(0, 5) }}<text style=" font-size: 0.6em;">hrs</text>  
                    </div>       
                </div>
           
                <div class="display-5" style=" color:#1f9d94">
                    <div >	
                    {{ showSpecialtyName(appointment) }} 
                    </div>       
                </div>
 
                <div class="">
                    <div v-if="appointment.app_type_center" class="">
                       <!-- <i class="h1 bi bi-building"></i> En consulta 	 -->
                        <div class="display-6" style=" color:#1f9d94"> <i class="h5 text-center bi bi-geo-alt"></i> {{comuna_id2name(appointment.comuna) }} </div>
                            <div class="" style="color:#2e5668" >	
                                <i class="fas fa-map-marker-alt "></i>   "{{ appointment.center_name }}"
                            </div> 
                            <div style="color:#2e5668">
                                {{appointment.center_address }}
                            </div>
                    </div>
                    <div v-if="appointment.app_type_home" style="color:#3399FF">
                            <div class="display-5" >
                                <i class=" bi bi-house"></i><text >  Visita a Domicilio:</text> <br>
                            </div>

                            <text v-if=" appointment.location1 != null " >  
                                <i class="bi bi-geo-alt"></i> {{ comuna_id2name(appointment.location1) }} 
                            </text>
                            <text v-if=" appointment.location2 != null " >  
                                <i class="bi bi-geo-alt"></i> {{ comuna_id2name(appointment.location2) }} 
                            </text>
                            <text v-if=" appointment.location3 != null " >  
                                <i class="bi bi-geo-alt"></i> {{ comuna_id2name(appointment.location3) }}
                            </text>
                            <text v-if=" appointment.location4 != null " >  
                                <i class="bi bi-geo-alt"></i> {{ comuna_id2name(appointment.location4) }} 
                            </text>
                            <text v-if=" appointment.location5 != null " >  
                                <i class="bi bi-geo-alt"></i> {{ comuna_id2name(appointment.location5) }} 
                            </text>
                            <text v-if=" appointment.location6 != null " >  
                                <i class="bi bi-geo-alt"></i> {{ comuna_id2name(appointment.location6) }} 
                            </text>


                    </div>
                    <div v-if="appointment.app_type_remote" class="">
                       <i class="bi bi-camera-video"></i> Tele Atención  	                       
                    </div>

                </div>
            
            </div>

            </div>
               
     <text style="color: #bbbbbb;" >#{{appointment.app_id}}</text> 
       </div>

</template>


<style scoped>
</style>


<script>
//const showForm = ref(false)


export default {
  data : function() {
    return {
            }
  },
  
  props: ['appointment','searchParameters' , 'global_comunas' ],

 mounted () {  
        },

methods: {
    showSpecialtyName(app)
    {
        if (this.searchParameters.specialty != null)
        {return this.searchParameters.specialty.name }
        else {
            return (app.specialty_name )
        }
    },
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