<script setup>
import { ref } from 'vue'
import axios from 'axios';


</script>

<template>
    <div class="d-flex justify-content-between" >	
        <div class="m-2">
            <a style="font-size: 1em;" > Disp</a>  
        </div>
        
        <div class="m-2 display-2">
        {{daterequired}}
        </div>
        
        <div class="m-2">
            <a style="font-size: 2em;" data-bs-toggle="modal" data-bs-target="#duplicate_day" > 
                <i class="far fa-copy"></i> 
            </a> 
        </div>   
    </div>
</template>

<style scoped>
</style>


<script>

export default {
   data : function() {
        return {
        }   
    },
   	
    props: ['daterequired'],

	created () {
	},
	methods :{
    }
}
</script>

