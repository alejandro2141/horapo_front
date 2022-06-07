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
import TabUserConfig from '../src/components/professionalAccess/tabUserConfig.vue'



</script>

<template>
<div>
    <ProfesionalGeneralHeader :session_params='session_params' v-on:switchView="switchView"  v-on:switchViewTo="switchViewTo" > </ProfesionalGeneralHeader>
    
    <div class='m-0'>
        
        <div  :style="{display:  visible_tab_login }"  class=" position-relative " >	 
            <TabLogin v-on:startSession="startSessionMethod" >  </TabLogin> 		 
        </div>

        <div v-if="visible_tab_centers == 'block'" :style="{display:  visible_tab_centers }"  style="margin-left: 0.5em; margin-right: 0.5em;"  class="position-relative bg-white ">
            <TabCenter :session_params="session_params" :global_comunas="global_comunas" v-on:switchViewTo="switchViewTo" >  </TabCenter> 	
        </div>

        <div v-if="visible_tab_appointments == 'block'" :style="{display:  visible_tab_appointments }"  style="margin-left: 0.0em; margin-right: 0.5em;"  class=" bg-white">
            <TabAppointment  :key="forceRender" :session_params="session_params" v-on:switchView="switchView"  v-on:switchToCenters="switchToCenters"  :global_specialties="global_specialties" :global_comunas="global_comunas" >  </TabAppointment> 	
        </div>

        <div v-if="visible_tab_timetable == 'block'" :style="{display:  visible_tab_timetable }"  style="margin-left: 0.5em; margin-right: 0.5em;"  class=" bg-white">
            <TabTimeTable :session_params="session_params" :global_specialties="global_specialties" :global_comunas="global_comunas"  >  </TabTimeTable> 	
        </div>

        <div v-if="visible_tab_userconfig == 'block'" :style="{display:  visible_tab_userconfig }"  style="margin-left: 0.5em; margin-right: 0.5em;"  class=" bg-white">
            <TabUserConfig :session_params="session_params" v-on:switchViewTo="switchViewTo" :global_specialties="global_specialties" :global_comunas="global_comunas"  >  </TabUserConfig> 	
        </div>

    </div>

</div>
</template>

<style scoped>
</style>


<script>

export default {

    setup() {
        const date = ref(new Date());
        
        return {
            date,
        }
    },

  data : function() {
    return {
        global_specialties : [],
        global_comunas : [],  
        global_professional_specialties : [] ,
        global_professional_centers : [] ,
        global_session_data : [] ,

        session : "sesionname",
        session_params : [] ,

        visible_tab_centers: 'none',
        visible_tab_assistants:'none', 
        visible_tab_appointments: 'none',
        visible_tab_login: 'block' ,
        visible_tab_timetable: 'none' ,
        visible_tab_userconfig : 'none' , 

        product : 'Socks',
        some : './assets/images/socks_blue.jpg',
        inStock : true , 
        muestrame: true,
        personas: ['juan', 'pedro' , 'gonzalo' ],
        counter : 0,

        forceRender:0 ,
       
    }
  },

props: [], 
emits: [],

created() {
        console.log("NESTED PROFESSIONAL ACCESS SEARCH Fill Global variables");
        this.loadGlobalSpecialties();
        this.loadGlobalComunas();
    
      //  this.loadProfessionalEspecialties();
},

methods: {

    switchViewTo(val)
    {
        console.log("switchViewTo:"+val);
            this.visible_tab_centers = 'none';
            this.visible_tab_assistants ='none'; 
            this.visible_tab_appointments = 'none';
            this.visible_tab_login = 'none' ;
            this.visible_tab_timetable = 'none' ;
            this.visible_tab_userconfig = 'none' ;

        if (val == 1) { this.visible_tab_timetable = 'block' }
        if (val == 2) { this.visible_tab_appointments = 'block'; this.forceRender +=1 }
        if (val == 3) { this.visible_tab_centers = 'block' }
        if (val == 4) { this.visible_tab_userconfig = 'block' }
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

/*
    async loadProfessionalEspecialties() {             
                console.log ("getSpecialties :" );
                const json = { 
                   professional_id: this.session_params.professional_id ,
                  // professional_id : 1 ,
                   };

                console.log("REQUEST get_professional_specialty :"+JSON.stringify(json));
                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/get_professional_specialty",json);
                console.log ("RESPONSE  get_professional_specialty:"+JSON.stringify(response_json.data.rows)) ;
                this.global_professional_specialties= response_json.data.rows ; 
            },
*/

    async loadProfessionalCenters() {             
                const json = { 
                professional_id : this.session_params.professional_id ,			   
                            };
                console.log ("GET CENTERS REQUEST :"+ JSON.stringify(json)  );
                let response_json = await axios.post(this.BKND_CONFIG.BKND_HOST+"/professional_get_centers",json);
                this.global_professional_centers = response_json.data.rows;
                console.log ("RESPONSE CENTERS:"+JSON.stringify(this.global_professional_centers)) ;                       
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


