<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import GeneralHeader from '../src/components/GeneralHeader.vue'
import TabLogin from '../src/components/professionalAccess/tabLogin.vue'
import TabCenter from '../src/components/professionalAccess/tabCenter.vue'
import TabAppointment from '../src/components/professionalAccess/tabAppointment.vue'

</script>

<template>
    <GeneralHeader></GeneralHeader>
 <!--   	
     <div v-if="session_params['professional_name']" :style="{display :  visible_tab_centers }" class="position-relative w-100" > 
        <TabCenter   :session_params="session_params"  > </TabCenter>  
    </div>
   <tab-assistants v-if="session_params['professional_name']" :style="{display:  visible_tab_assistants }" :session_params="session_params"  class="position-relative  w-100" > </tab-assistants> 
--> 
<div class="bg-light">
    <div v-if="session_params['professional_name']" :style="{display:  visible_tab_appointments }"    class="position-relative w-100">
        <TabAppointment :session_params="session_params" >  </TabAppointment> 	
    </div>

    <div :style="{display:  visible_tab_login }"  class="position-relative w-100" >	 
        <TabLogin v-on:startSession="startSessionMethod" >  </TabLogin> 		 
    </div>
</div>

</template>

<style scoped>
</style>


<script>

export default {
  data : function() {
    return {
        session : "sesionname",
        session_params : [] ,

        visible_tab_centers: 'none',
        visible_tab_assistants:'none', 
        visible_tab_appointments: 'none',
        visible_tab_login: 'block',
        

        product : 'Socks',
        some : './assets/images/socks_blue.jpg',
        inStock : true , 
        muestrame: true,
        personas: ['juan', 'pedro' , 'gonzalo' ],
        counter : 0,
    }
  },

methods: {
//Start Session
    startSessionMethod (param)
    {
    console.log("StartSession method:"+param.token );
    //set session data. 
    this.setSessionParamsFromJSON(param);
    //switch to view appointments
    this.switchViewToAppointments();
    },
//SET Session Params From JSON 
    setSessionParamsFromJSON(obj)
	{
        console.log("session params from JSON");
		for (var key of Object.keys(obj)) 
			{
			console.log(key + " -> " + obj[key]);
			this.session_params[key] = obj[key];
			}
        console.log("session iniciada para:"+this.session_params['professional_name'] );
	},
//Set View
    switchViewToAppointments()
    {
        this.visible_tab_centers = 'none';
        this.visible_tab_assistants ='none'; 
        this.visible_tab_appointments = 'block';
        this.visible_tab_login = 'none' ;
    },
//SWITCH TABS
switch_tab : function () {
    console.log("SwitchTab Function vue : ");
//setTimeout(() => this.elementVisible = false, 1000)

            if (this.visible_tab_appointments == 'block' )
            {
            this.visible_tab_appointments = 'none' 
            this.visible_tab_assistants = 'block' ;
            }
            else{				
                if (this.visible_tab_assistants == 'block')
                {
                this.visible_tab_centers = 'block' ;
                this.visible_tab_assistants = 'none' ;
                }
                else {
                        if (this.visible_tab_centers == 'block')
                        {
                        this.visible_tab_centers = 'none' ;
                        this.visible_tab_appointments = 'block' ;	
                        }
                    }
            }
    
    },

},


}
</script>


