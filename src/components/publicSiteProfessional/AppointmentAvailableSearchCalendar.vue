<script setup>
import { ref } from 'vue'



//const count = ref(0)
</script>

<template>
    
    
    <div v-if="appointment != null"   style="border-radius: 15px; background-color: #2874A6;"  class="text-white p-3 mb-1  ">
        
        <div class="d-flex justify-content-between">
            
            <div class="">
                <div>
                    <text class="fs-4"> 
                        {{ getDateFormat(appointment.date) }}
                            
                    </text>   
                </div>    

                <div>
                    <text class="display-5">
                        {{ getTimeFormat(appointment.start_time) }}
                    </text>
                </div>

            </div>

            <div>
                <i class="bi display-1 bi-chevron-compact-right"></i>
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
        day_name : ['Domingo','Lunes','Martes','Miercoles','jueves','Viernes','Sabado' ] , 
        month_name : ['Enero','Ferero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] , 

            }
  },
  
  props: ['appointment','searchParameters' , 'global_comunas' , 'global_specialties' ],

 mounted () {  
        },

methods: {
    getTimeFormat(time)
    {   
        let aux_time=new Date(time) 
        return (String(aux_time.getHours()).padStart(2,0)+" : "+String(aux_time.getMinutes()).padStart(2,0) )
    },
    getDateFormat(date)
    { 
        let aux_date=new Date(date) 
        return ( this.day_name[aux_date.getDay()]+" "+String(aux_date.getDate()).padStart(2,0)+" "+this.month_name[aux_date.getMonth()]+" "+aux_date.getFullYear()  )       
        /*
        {{day_name[ new Date(appointment.date).getDay()] }} 
        {{ appointment.date.split("-")[2].substring(0,2) }} de {{ month_name[parseInt(appointment.date.split("-")[1]-1 ) ] }} 
        {{appointment.date.split("-")[0] }}
        */
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