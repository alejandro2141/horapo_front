const app = Vue.createApp({
    data(){
        return {
            email : null ,
           }   
    },
    
    mounted () {    
       },
    
    methods: {

            async sendRecoverApp()
            {
               console.log("sendRecoverApp");  
                
               // var r =confirm("Continuar con la Reservar esta cita?");
               var r = true;
                 
               if (r == true) {
                    const json = { 
                        email : this.email,
                                };

                    console.log ("Send Recover Appointments   REQUEST :"+ JSON.stringify(json)  );

                    let response_json = await axios.post(this.dbhost+"/recover_appointments",json );
                    console.log ("Send Recover Appointments RESPONSE:"+JSON.stringify(response_json.data)) ;
                    window.alert("Las citas registradas seran enviadas a su correo");
                    window.location.replace("index.html");

    
                    }
                //location.href = "professional_view_appointments_agenda.html?"+this.getUrlParam() ;
                //location.reload();
            },
    



        },
    
    })
    