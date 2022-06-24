<script setup>
import { ref } from 'vue'



//const count = ref(0)
</script>

<template>
    
    
    <div v-if="appointment != null"   style="border-radius: 15px; background-color: #2874A6;"  class="text-white p-3 mb-1  ">
        
        <div class="">
            <div>
                <text class="fs-3"> {{day_name[ new Date(appointment.date).getDay()+1] }} &nbsp; </text>
                <text class="fs-3"> {{ appointment.date.split("-")[2].substring(0,2) }} de {{ month_name[parseInt(appointment.date.split("-")[1]-1 ) ] }} </text>
                <text class="fs-3">&nbsp;  {{appointment.date.split("-")[0] }}   </text>   
            </div>    

            <div>
                <text class="display-2">
                    {{appointment.start_time.split(":")[0].padStart(2,0)  }} : {{appointment.start_time.split(":")[1].padStart(2,0)  }} 
                </text>
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
        day_name : [ 'Domingo','Lunes','Martes','Miercoles','jueves','Viernes','Sabado'] , 
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