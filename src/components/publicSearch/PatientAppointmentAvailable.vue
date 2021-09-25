<script setup>
import { ref } from 'vue'

defineProps({
  appointment : Object
})

//const count = ref(0)
</script>

<template>
     
    <div v-if="appointment != null"  class="border-0  p-0 mb-0 bg-light">
        <div id="app" class="m-0 d-flex  "  >	
            <div class="bg-primary">
                     &nbsp;
            </div>
            <div>
                <div class="">
                    <div class="display-4">	
                    Fecha {{appointment.date.substring(0, 10) }}  
                    </div>       
                </div>
                <div class="">
                    <div class="display-4">	
                    Hora {{appointment.start_time.substring(0, 5) }}  
                    </div>       
                </div>
                <div class="display-5">
                    <div class="">	
                    {{appointment.specialty_name }}
                    </div>       
                </div>
                <div class="">
                        <div class="">	
                        <i class="fas fa-map-marker-alt"></i>   {{ appointment.center_name }}
                        </div>       
                </div>
                <div class="">
                    <div class="">	
                    Dirección:  {{appointment.center_address }}
                    </div>       
                </div>
            
            </div>
        </div>
        <hr>
    </div>

</template>


<style scoped>
</style>


<script>
//const showForm = ref(false)


export default {
  data() {
    return {
        }
  },

 mounted () {  
        },

methods: {
        },

}
</script>