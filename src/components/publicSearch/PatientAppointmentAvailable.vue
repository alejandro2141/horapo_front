<script setup>
import { ref } from 'vue'


</script>

<template>
    
    
    <div v-if="appointment != null"   style="border: 2px solid rgb(168, 168, 168); border-radius: 15px;"  class="bg-white p-0 mb-1 ">
        
        <div id="app" class="m-0 d-flex" style="font-size: 1.2em;"  >	
            <div class="">
                     &nbsp;
            </div>
            <div>
                <div class="">
                    <div class="" style="font-size:1.1em ; color:#1f9d94">	 
                    <!--  <b>  {{ transform_date( appointment.date ) }} </b> style="font-size:1.1em ; color:#2e5668"-->
                    {{ transform_time(appointment.start_time)}}<text style="font-size:0.5em">hrs</text>   <text style=" ">{{ showSpecialtyName(appointment.specialty) }} </text>  
                    </div>       
                </div>
            <!--
                <div class="" style=" color:#1f9d94">
                    <div >	
                    {{ showSpecialtyName(appointment.specialty) }} 
                    </div>       
                </div>
            -->
 
                <div class="">
                
                    
                    <div v-if="center_data.center_visit" class="">
                 
                        <div class="" style="">  
                            <div style="color: #781ED1" >
                            <i class="h1 bi bi-building"></i> En Consulta  </div>
                            </div>
                            <div style="color:#2e5668"  >
                               {{comuna_id2name(center_data.comuna)}}
                            </div>
                            <div class="" style="color:#2e5668" >	
                                {{center_data.name}}
                            </div> 
                                                       
                    </div>
                    
                    <div v-if="center_data.home_visit" style="color:#3399FF">
                            <div class="" >
                                <i class=" bi bi-house-door"></i><text >  Visita a Domicilio:</text> <br>
                            </div>
                            <div style="color:#2e5668"  >
                              {{  comuna_id2name(center_data.home_comuna1) }}
                              {{  comuna_id2name(center_data.home_comuna2) }}
                              {{  comuna_id2name(center_data.home_comuna3) }}
                              {{  comuna_id2name(center_data.home_comuna4) }}
                              {{  comuna_id2name(center_data.home_comuna5) }}
                              {{  comuna_id2name(center_data.home_comuna6) }}
                            </div>
                            <div class="" style="color:#2e5668" >	
                                {{center_data.name}}
                            </div>
                    </div>

                    <div v-if="center_data.remote_care" class="">
                         <div class="" style="color:#b36b00" >
                               <i class="bi bi-camera-video"></i> Tele Atención  	 
                              <div style="" class="text-dark" >
                               Todas las comunas 
                              </div>                      
                        </div>
                        <div class="" style="color:#2e5668" >	
                                {{center_data.name}}
                        </div>
                    </div>

                    <div v-if="calendar_data != null && calendar_data.price>1">   ${{ priceFormatter(calendar_data.price)}}</div>
                    

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
        formatter : null ,
        
            }
  },
  
  props: ['center_data' , 'calendar_data'  ,'appointment','searchParameters' , 'global_comunas' , 'global_specialties' ],

 mounted () {  
     // this.center_data = this.session_params.centers.find(elem => elem.id == this.appointment.center_id )
        },

methods: {

    priceFormatter(amount) 
    {
        return   amount.toLocaleString('es-cl');
    },

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
        //let temp = date.split("-") ;
        let temp = new Date(date);
        return ( temp.getDate()+" "+this.getShortMonthName(temp.getMonth()+1)+" "+temp.getFullYear() )
    },

    transform_time(time)
    {
        let tim = new Date(time) ;
        return (""+new String(tim.getHours()).padStart(2,0)+":"+new String(tim.getMinutes()).padStart(2,0) )
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