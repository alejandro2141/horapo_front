<script setup>
import { ref } from 'vue'



//const count = ref(0)
</script>

<template>
     
    <div v-if="appointment != null"   style="border: 1px solid rgb(168, 168, 168); border-radius: 10px;"  class="bg-white p-0 mb-1 ">
        <div id="app" class="m-0 d-flex  "  >	
            <div class="">
                     &nbsp;
            </div>
            <div>
                <div class="">
                    <div class="display-5">	
                    {{appointment.date.substring(0, 10) }}  {{appointment.start_time.substring(0, 5) }} hrs  
                    </div>       
                </div>
           
                <div class="display-6">
                    <div class="">	
                    {{ showSpecialtyName(appointment) }}
                    </div>       
                </div>
                <div class="">
                        <div class="">	
                        <i class="fas fa-map-marker-alt "></i>   "{{ appointment.center_name }}"
                        </div>       
                </div>
                <div class="">
                    <div class="">	
                  <div class="display-6"> <i class="h5 text-center bi bi-geo-alt"></i> {{comuna_id2name(appointment.comuna) }} </div>

                    {{appointment.center_address }}
                    </div>       
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
            return (app.specialty_name)
        }
    },
    comuna_id2name(id)
    {
            let temp= this.global_comunas.find(elem => elem.id ==  id  )
            if (temp != null) { return temp.name }
            else { return null }
    },
        
        
        },

}
</script>