<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import axios from 'axios'

import ProfesionalGeneralHeader from '../src/components/professionalAccess/ProfesionalGeneralHeader.vue'
import TabLogin from '../src/components/professionalAccess/tabLogin.vue'
import TabCenter from '../src/components/professionalAccess/tabCenter.vue'
import TabAppointment from '../src/components/professionalAccess/tabAppointment.vue'
import TabTimeTable from '../src/components/professionalAccess/tabTimeTable.vue'
import TabUserConfig from   '../src/components/professionalAccess/tabUserConfig.vue'

import TabListAppTaken from   '../src/components/professionalAccess/tabAppointmentsListReserved.vue'
//import TabListAppTaken from '../src/components/professionalAccess/tabAppointmetsListReserved.vue'
import { BKND_CONFIG } from '../config123.js'
import ProfesionalBugReport from '../src/components/professionalAccess/ProfesionalBugReport.vue'



</script>

<template>
<div >
    
    <ProfesionalGeneralHeader  v-if="session_params!=null"  v-on:setTodayDateFromHeader='setTodayDateFromHeader'   :session_params='session_params' v-on:switchView="switchView"  v-on:switchViewTo="switchViewTo" > </ProfesionalGeneralHeader>
   
    <div   class="m-0 w-100 d-flex justify-content-center">
   
       <div> 
        <div  :style="{display:  visible_tab_login }"  class=" position-relative" >	 
            <TabLogin  v-on:startSession="startSessionMethod" >  </TabLogin> 		 
        </div>
        </div>
 
        <div >
        <div v-if="visible_tab_centers == 'block'" :style="{display:  visible_tab_centers }"    class="  position-relative bg-secondary " >
            <TabCenter :session_params="session_params" :global_comunas="global_comunas" v-on:switchViewTo="switchViewTo" >  </TabCenter> 	
        </div>
        </div>
        
        <div>
        <div v-if="visible_tab_appointments == 'block'" :style="{display:  visible_tab_appointments }"  style=""  class=" bg-white">
            <TabAppointment :forceUpdateTabAppointment="forceUpdateTabAppointment" :setTodayDate="setTodayDate" :key="forceRender" :session_params="session_params" v-on:switchView="switchView"  v-on:switchToCenters="switchToCenters"  :global_specialties="global_specialties" :global_comunas="global_comunas" >  </TabAppointment> 	
        </div>
        </div>

        <div>
        <div v-if="visible_tab_timetable == 'block'" :style="{display:  visible_tab_timetable }"  style=""  class="bg-secondary">
            <TabTimeTable :session_params="session_params" :global_specialties="global_specialties" :global_comunas="global_comunas"  >  </TabTimeTable> 	
        </div>
        </div>
        
        <div>
        <div v-if="visible_tab_userconfig == 'block'" :style="{display:  visible_tab_userconfig }"  style=""  class=" bg-white">
            <TabUserConfig :session_params="session_params" v-on:switchViewTo="switchViewTo" :global_specialties="global_specialties" :global_comunas="global_comunas"  >  </TabUserConfig> 	
        </div>
        </div>

         <div>  
        <div v-if="visible_tab_appListTaken == 'block'" :style="{display:  visible_tab_appListTaken }"  style=""  class="bg-white ">
           <TabListAppTaken :session_params="session_params" :global_specialties="global_specialties" :global_comunas="global_comunas"> </TabListAppTaken>
        </div>
        </div>
        
    </div>

    <ProfesionalBugReport v-if="visible_tab_login !='block' " :session_params="session_params" ></ProfesionalBugReport>
   
</div>
</template>

<style scoped>
body {
    overscroll-behavior: none 
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
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
        //session_params : null ,

        visible_tab_centers: 'none',
        visible_tab_assistants:'none', 
        visible_tab_appointments: 'none',
      //visible_tab_login: 'block' ,
        visible_tab_login: 'none' ,
        visible_tab_timetable: 'none' ,
        visible_tab_userconfig : 'none' , 
        visible_tab_appListTaken : 'none' ,

        product : 'Socks',
        some : './assets/images/socks_blue.jpg',
        inStock : true , 
        muestrame: true,
        personas: ['juan', 'pedro' , 'gonzalo' ],
        counter : 0,

        forceRender:0 ,

         showme: false ,

         setTodayDate : null  ,
         forceUpdateTabAppointment : 0 ,
       
    }
  },

props: [], 
emits: [],

created() {

        this.setSessionFromCode() 
       
        this.loadGlobalSpecialties();
        this.loadGlobalComunas();


    
      //  this.loadProfessionalEspecialties();
},

methods: {

    async setSessionFromCode()
    {
    //get session code from URL
        let uri = window.location.search.substring(1); 
        let params = new URLSearchParams(uri);
        let sessionCode = params.get("sessionCode")

    //here call to get session data 
        if (sessionCode != null )
        {
        let session_data= await this.getSessionParamsFromCode(sessionCode)
        await this.setSessionParamsFromJSON(session_data)
        console.log("SetSessionFromCode session_params.name "+this.session_params.name);
        console.log("SetSessionFromCode session_params.id "+this.session_params.id );
        }

        if ( this.session_params == null ||  this.session_params.professional_id == null)
        {
            this.visible_tab_login='block' 
        }
        else 
        {
            this.visible_tab_appointments = 'block' ;
        }  


    },

    async getSessionParamsFromCode(sessionCode)
    {

        const json = { 
			   sessionCode : sessionCode ,			   
   			   	      };
			console.log ("REQUEST to professional_login_session:"+ JSON.stringify(json)  );
			
			let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/professional_login_session",json);
            console.log ("RESPONSE login:"+JSON.stringify(response_json.data)) ;



            /*
        let session_params = {
        "professional_id":"1",
        "result_code":0,
        "professional_name":"Juan Alejandro Morales Miranda",
        "token":"5302",
        "first_time":true,
        "tutorial_start":false,
        "tutorial_center":false,
        "tutorial_calendar":true,
        "tutorial_menu":true,
                }
                */
        

        return response_json.data
    
    },
   
    setTodayDateFromHeader(dateObj)
    {   console.log("setTodayDateFromHeader in professionalAccess")
        this.setTodayDate = dateObj
        this.forceUpdateTabAppointment=Math.random() 
    },
    
    switchViewTo(val)
    {
        console.log("switchViewTo:"+val);
            this.visible_tab_centers = 'none';
            this.visible_tab_assistants ='none'; 
            this.visible_tab_appointments = 'none';
            this.visible_tab_login = 'none' ;
            this.visible_tab_timetable = 'none' ;
            this.visible_tab_userconfig = 'none' ;
            this.visible_tab_appListTaken = 'none' ;

        if (val == 1) { this.visible_tab_timetable = 'block' }
        if (val == 2) { this.visible_tab_appointments = 'block'; this.forceRender +=1 }
        if (val == 3) { this.visible_tab_centers = 'block' }
        if (val == 4) { this.visible_tab_userconfig = 'block' }
        if (val == 5) {  this.visible_tab_appListTaken = 'block' }


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
    console.log("StartSession method param:"+JSON.stringify(param));
    //set session data. 
    this.setSessionParamsFromJSON(param);
    //switch to view appointments
    location.href = "/nested/professionalAccess.html?sessionCode="+param.sid;
    //this.switchViewToAppointments();
    },

//SET Session Params From JSON 
    async setSessionParamsFromJSON(obj)
	{
       
		for (var key of Object.keys(obj)) 
			{
			console.log(key + " -> " + obj[key]);
			this.session_params[key] = obj[key];
            console.log("---->session for cicle :"+key)
			}  
        
        if (this.session_params.tutorial_start)
        {
            this.session_params.tutorial_start_step1 = true
        }
        await Promise.all(this.session_params)

        console.log("setSessionParamsFromJSON session iniciada para:"+this.session_params['professional_name'] );   
        console.log("setSessionParamsFromJSON session params:"+JSON.stringify(this.session_params));      
        console.log("setSessionParamsFromJSON session params OBJ:"+JSON.stringify(obj));  
	
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


