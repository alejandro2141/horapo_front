<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import axios from 'axios'
import { BKND_CONFIG } from '../config123.js'
import ProfesionalGeneralHeader from '../src/components/professionalAccess/ProfesionalGeneralHeader.vue'
import TabLogin from '../src/components/professionalAccess/tabLogin.vue'
import TabCenter from '../src/components/professionalAccess/tabCenter.vue'
import TabAppointment from '../src/components/professionalAccess/tabAppointment.vue'
import TabTimeTable from '../src/components/professionalAccess/tabTimeTable.vue'



</script>

<template>
<div>
    <ProfesionalGeneralHeader :session_params='session_params' v-on:switchView="switchView"  v-on:switchViewTo="switchViewTo" > </ProfesionalGeneralHeader>
    
    <div class='m-0'>
        
        <div  :style="{display:  visible_tab_login }"  class=" position-relative " >	 
            <TabLogin v-on:startSession="startSessionMethod" >  </TabLogin> 		 
        </div>

        <div v-if="visible_tab_centers == 'block'" :style="{display:  visible_tab_centers }"  style="margin-left: 1.5em; margin-right: 1.5em;"  class="position-relative bg-light">
            <TabCenter :session_params="session_params" :global_comunas="global_comunas"  >  </TabCenter> 	
        </div>

        <div v-if="visible_tab_appointments == 'block'" :style="{display:  visible_tab_appointments }"  style="margin-left: 1.5em; margin-right: 1.5em;"  class="position-relative bg-light">
            <TabAppointment :session_params="session_params" v-on:switchView="switchView"  v-on:switchToCenters="switchToCenters"  :global_specialties="global_specialties" :global_comunas="global_comunas" >  </TabAppointment> 	
        </div>

        <div v-if="visible_tab_timetable == 'block'" :style="{display:  visible_tab_timetable }"  style="margin-left: 1.5em; margin-right: 1.5em;"  class="position-relative bg-light">
            <TabTimeTable :session_params="session_params" :global_specialties="global_specialties" :global_comunas="global_comunas"  >  </TabTimeTable> 	
        </div>

    </div>

</div>
</template>

<style scoped>
</style>


<script>

export default {
  data : function() {
    return {
        global_specialties : [],
        global_comunas : [],  

        session : "sesionname",
        session_params : [] ,

        visible_tab_centers: 'none',
        visible_tab_assistants:'none', 
        visible_tab_appointments: 'none',
        visible_tab_login: 'block' ,
        visible_tab_timetable: 'none' ,
        

        product : 'Socks',
        some : './assets/images/socks_blue.jpg',
        inStock : true , 
        muestrame: true,
        personas: ['juan', 'pedro' , 'gonzalo' ],
        counter : 0,
    }
  },

props: [], 
emits: [],

created() {
        console.log("NESTED PROFESSIONAL ACCESS SEARCH Fill Global variables");
        this.loadGlobalSpecialties();
        this.loadGlobalComunas();
},

methods: {

    switchViewTo(val)
    {
        console.log("switchViewTo:"+val);
            this.visible_tab_centers = 'none';
            this.visible_tab_assistants ='none'; 
            this.visible_tab_appointments = 'none';
            this.visible_tab_login = 'none' ;
            this.visible_tab_timetable = 'none' 
        if (val == 1) { this.visible_tab_timetable = 'block' }
        if (val == 2) { this.visible_tab_appointments = 'block' }
        if (val == 3) { this.visible_tab_centers = 'block' }
    },

    async loadGlobalSpecialties() {
                console.log ("APP GET SPECIALTY LIST METHOD"); 
				let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/common_get_specialty_list");
                this.global_specialties = response_json.data.rows;
                console.log("APP global_specialties: "+JSON.stringify(this.global_specialties) );
            },

    async loadGlobalComunas() {
                 console.log ("APP GET COMUNA LIST METHOD"); 
				let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/common_get_comuna_list");
                this.global_comunas = response_json.data.rows;
                console.log("APP Comuna list: "+JSON.stringify(this.global_comunas) );

            },

    switchView(){
        console.log("SwitchView in professional access ");
        if ( this.visible_tab_centers == 'none' ){ 
                //this.visible_tab_centers = 'block' ; 
                //this.visible_tab_appointments = 'none';
                this.switchToCenters();
        }
        else {
                this.visible_tab_centers = 'none' ; 
                this.visible_tab_appointments = 'block';
            }

    },

    switchToCenters(){
                this.visible_tab_centers = 'block' ; 
                this.visible_tab_appointments = 'none';
                
    },

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


