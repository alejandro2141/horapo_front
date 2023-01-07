<script setup>
import { ref } from 'vue'

</script>

<template>
                <!--
                <div @click="active=!active" :style="{ 'background-color': circleColors[index]   ,'border-radius': '50%' ,'width': '8.0em', 'height': '8.0em' }" class="m-2 border  border-2  d-flex justify-content-center align-items-center" :class="{'border-success': active}" > 
                    <div class="text-center mb-2" style="" >
                        <text class=""> {{specialty.name}}  
                        </text>
                        <br> 
                        
                    </div> 
                </div> 
                -->
            <div @click='selectSpecialty(specialty)' >
                <div  id="hexagono3"  :style="{ 'background-color': '#FF0000'        } " class=" border  border-2  d-flex justify-content-center align-items-center"  > 
                    <div id="hexagono3-1"  class="text-center" :style="{ 'background-color': '#00FF00'      } " >
                        <div id="hexagono3-2" class="d-flex justify-content-center align-items-center" :style="{ 'background-color': getBgcolor() , 'color' : getTextColor() } " >
                            <text > {{getSpecialtyName()}} 
                            </text>
                            <br> 
                        </div>
                    </div> 
                </div> 
            </div>



</template>

<style scoped>
#hexagono3 {
  height: 10em;
  margin: -2.2em 0; 
  overflow: hidden;
  transform: rotate(120deg);
  visibility: hidden;
  width: 6.5em;
}
#hexagono3-1 {
  height: 100%;
  overflow: hidden;
  transform: rotate(-60deg);
  width: 100%;
}
#hexagono3-2 {
  height: 100%;
  transform: rotate(-60deg); 
  visibility: visible ;
  width: 100%;
}
</style>


<script>
//const showForm = ref(false)

export default {
   data : function() {
        return {
       // circleColors: ['#ffda9e','#fdf9c4','#ffffaa','#568281','#BBBBBB','#91B8C1','#FFBFA3','#ffe999','#511F73'],
        active : false ,
        }
    },  
 
   props: ['specialty','bgcolor', 'code' ], 
   emits: [ 'specialtySelected' ],
 
   
mounted() {   
       },

    watch: {
            code(val)
            {
                if (val.id != this.specialty.id )        
                {
                this.active = false 
                }

            }

        },

    methods: {

        getTextColor()
        {
            if (this.active)
            {
                return ("#fff")
            }
            else
            {
                return ("#000")
            }
        },

        getBgcolor()
        {
            if (this.active)
            {
                return ("#004BE1")
            }
            else
            {
                return this.bgcolor
            }
        },

        selectSpecialty(specialty)
        {
        console.log("SelectSpecialty :"+JSON.stringify(specialty))    
         
        /*
        console.log("Active :"+this.active)
            if (this.active)
            {
                this.$emit('specialtySelected',specialty)
            }   
        */
        if (!this.active)
        {
            this.active = true
            this.$emit('specialtySelected',specialty)
        }
        else 
        {
            this.active = false  
            // this.$emit('specialtySelected',null)
        }

        
        },

        changeColor()
        {
            console.log("changeColor!!")
        },
        getSpecialtyName()
        {
            if (this.specialty !=null)
            {return this.specialty.name }
            else
            {
                return "nosetname"
            }

        }
        /*
        suggestedSearch(specialty,type)
        {
            console.log("SuggestedSearch specialty:"+specialty+"  type:"+type)
            const params = { 
			    specialty   : specialty    ,
                type : type  ,
                location    : null  ,
            };

            this.$emit("suggestedSearchCall",params );
        }
        */

    },


}

</script>