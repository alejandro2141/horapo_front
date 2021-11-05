import axios from 'axios'
/*
let BKND_CONFIG ;
let BKND_REGIONS = [] ;
*/
let BKND_CONFIG = {
 //  BKND_HOST : "http://ec2-18-222-88-128.us-east-2.compute.amazonaws.com:8080",
   BKND_HOST : "http://192.168.0.110:8080",
    BKND_TIME : 1000,
    BNKD_USER : 'abc'
  };
export { BKND_CONFIG } ;


let GLOBAL_COMUNAS = null ; 

let response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/common_get_comuna_list")
if (response_json != null)
{
GLOBAL_COMUNAS=response_json.data.rows;
}
else {
  console.log("errror en el request");
}
export { GLOBAL_COMUNAS } ;


response_json = await axios.post(BKND_CONFIG.BKND_HOST+"/common_get_specialty_list");
let GLOBAL_SPECIALTIES=response_json.data.rows;;
export { GLOBAL_SPECIALTIES } ;


/*
let GLOBAL_REGIONS = [  {id : '1' ,  name : 'Arica y Parinacota' , rnumber : 'XV' },  
                  {id : '2' ,  name : 'Tarapacá' , rnumber : 'I' }, 
                  {id : '3' ,  name : 'Antofagasta' , rnumber : 'II' }, 
                  {id : '4' ,  name : 'Atacama' , rnumber : 'III' }, 
                  {id : '5' ,  name : 'Coquimbo' , rnumber : 'IV' }, 
                  {id : '6' ,  name : 'Valparaiso' , rnumber : 'V' }, 
                  {id : '7' ,  name : 'Santiago' , rnumber : 'RM' } 
               ] ;
export { GLOBAL_REGIONS } ;

let GLOBAL_SPECIALTY = [  
                  {id : '1' ,  name : 'KINESIOLOGIA'   },  
                  {id : '2' ,  name : 'PSICOLOGIA'   },
                  {id : '3' ,  name : 'KINESIOLOGIA INFANTIL'   },
                  {id : '4' ,  name : 'KINESIOLOGIA LABORAL'   },
                  {id : '5' ,  name : 'NUTRICION'   }, 
               ] ;
export { GLOBAL_SPECIALTY } ;

let GLOBAL_COMUNA = [    
                      {id : '01101' , name : 'ARICA' },
                      {id : '01106' ,	name : 'CAMARONES' },
                      {id : '01201' ,	name : 'IQUIQUE' },
                      {id : '01203' ,	name : 'PICA' },
                      {id : '01204' ,	name : 'POZO ALMONTE' },
                      {id : '01206' ,	name : 'HUARA' },
                      {id : '01208' ,	name : 'CAMINA' },
                      {id : '01210' ,	name : 'COLCHANE' },
                      {id : '01211' ,	name : 'ALTO HOSPICIO' },  
                      {id : '01301' ,	name : 'PUTRE' },	
                      {id : '01302' ,	name : 'GENERAL LAGOS' },	
                      {id : '02101' ,	name : 'TOCOPILLA' },	
                      {id : '02103' ,	name : 'MARIA ELENA' },	
                      {id : '02201' ,	name : 'ANTOFAGASTA' },	
                      {id : '02202' ,	name : 'TALTAL' },	
                      {id : '02203' ,	name : 'MEJILLONES' },	
                      {id : '02206' ,	name : 'SIERRA GORDA' },	
                      {id : '02301' ,	name : 'CALAMA' },	
                      {id : '02302' ,	name : 'OLLAGUE' },	
                      {id : '02303' ,	name : 'SAN PEDRO DE ATACAMA' },	
                      {id : '03101' ,	name : 'CHANARAL' },	
                      {id : '03102' ,	name : 'DIEGO DE ALMAGRO' },
                      {id : '03201' ,	name : 'COPIAPO' },	
                      {id : '03202' ,	name : 'CALDERA' },	
                      {id : '03203' ,	name : 'TIERRA AMARILLA' },	
                      {id : '03301' ,	name : 'VALLENAR' },
                      {id : '03302' ,	name : 'FREIRINA' },
                      {id : '03303' ,	name : 'HUASCO' },	
                      {id : '03304' ,	name : 'ALTO DEL CARMEN' },	
                      {id : '04101' ,	name : 'LA SERENA' },	
                      {id : '04102' ,	name : 'LA HIGUERA' },	
                      {id : '04103' ,	name : 'COQUIMBO' },	
                      {id : '04104' ,	name : 'ANDACOLLO' },	
                      {id : '04105' ,	name : 'VICUNA' },
                      {id : '04106' ,	name : 'PAIHUANO' },
                      {id : '04201' ,	name : 'OVALLE' },	
                      {id : '04203' ,	name : 'MONTE PATRIA' },	
                      {id : '04204' ,	name : 'PUNITAQUI' },	
                      {id : '04205' ,	name : 'COMBARBALA' },	
                      {id : '04206' ,	name : 'RIO HURTADO' },	
                      {id : '04301' ,	name : 'ILLAPEL' },	
                      {id : '04302' ,	name : 'SALAMANCA' },	
                      {id : '04303' ,	name : 'LOS VILOS' },	
                      {id : '04304' ,	name : 'CANELA' },	
                      {id : '05101' ,	name : 'ISLA DE PASCUA' },
                      {id : '05201' ,	name : 'LA LIGUA' },	
                      {id : '05202' ,	name : 'PETORCA' },	
                      {id : '05203' ,	name : 'CABILDO' },	
                      {id : '05204' ,	name : 'ZAPALLAR' },
                      {id : '05205' ,	name : 'PAPUDO' },	
                      {id : '05301' ,	name : 'VALPARAISO' },	
                      {id : '05302' ,	name : 'VINA DEL MAR' },	
                      {id : '05303' ,	name : 'VILLA ALEMANA' },	
                      {id : '05304' ,	name : 'QUILPUE' },	
                      {id : '05305' ,	name : 'CASABLANCA' },	
                      {id : '05306' ,	name : 'QUINTERO' },	
                      {id : '05307' ,	name : 'PUCHUNCAVI' },	
                      {id : '05308' ,	name : 'JUAN FERNANDEZ' },	
                      {id : '05309' ,	name : 'CONCON' },	
                      {id : '05401' ,	name : 'SAN ANTONIO' },	
                      {id : '05402' ,	name : 'SANTO DOMINGO' },	
                      {id : '05403' ,	name : 'CARTAGENA' },	
                      {id : '05404' ,	name : 'EL TABO' },	
                      {id : '05405' ,	name : 'EL QUISCO' },
                      {id : '05406' ,	name : 'ALGARROBO' },	
                      {id : '05501' ,	name : 'QUILLOTA' },
                      {id : '05502' ,	name : 'NOGALES' },	
                      {id : '05503' ,	name : 'HIJUELAS' },	
                      {id : '05504' ,	name : 'LA CALERA' },	
                      {id : '05505' ,	name : 'LA CRUZ' },	
                      {id : '05506' ,	name : 'LIMACHE' },	
                      {id : '05507' ,	name : 'OLMUE' },	
                      {id : '05601' ,	name : 'SAN FELIPE' },	
                      {id : '05602' ,	name : 'PANQUEHUE' },	
                      {id : '05603' ,	name : 'CATEMU' },	
                      {id : '05604' ,	name : 'PUTAENDO' },	
                      {id : '05605' ,	name : 'SANTA MARIA' },	
                      {id : '05606' ,	name : 'LLAY-LLAY' },	
                      {id : '05701' ,	name : 'LOS ANDES' },	
                      {id : '05702' ,	name : 'CALLE LARGA' },	
                      {id : '05703' ,	name : 'SAN ESTEBAN' },	
                      {id : '05704' ,	name : 'RINCONADA' },	
                      {id : '06101' ,	name : 'RANCAGUA' },	
                      {id : '06102' ,	name : 'MACHALI' },	
                      {id : '06103' ,	name : 'GRANEROS' },	
                      {id : '06104' ,	name : 'SAN FRANCISCO DE MOSTAZAL' },	
                      {id : '06105' ,	name : 'DONIHUE' },	
                      {id : '06106' ,	name : 'COLTAUCO' },	
                      {id : '06107' ,	name : 'CODEGUA' },	
                      {id : '06108' ,	name : 'PEUMO' },	
                      {id : '06109' ,	name : 'LAS CABRAS' },	
                      {id : '06110' ,	name : 'SAN VICENTE' },	
                      {id : '06111' ,	name : 'PICHIDEGUA' },	
                      {id : '06112' ,	name : 'RENGO' },	
                      {id : '06113' ,	name : 'REQUINOA' },
                      {id : '06114' ,	name : 'OLIVAR' },	
                      {id : '06115' ,	name : 'MALLOA' },	
                      {id : '06116' ,	name : 'COINCO' },
                      {id : '06117' ,	name : 'QUINTA DE TILCOCO' },	
                      {id : '06201' ,	name : 'SAN FERNANDO' },	
                      {id : '06202' ,	name : 'CHIMBARONGO' },	
                      {id : '06203' ,	name : 'NANCAGUA' },	
                      {id : '06204' ,	name : 'PLACILLA' },	
                      {id : '06205' ,	name : 'SANTA CRUZ' },	
                      {id : '06206' ,	name : 'LOLOL' },	
                      {id : '06207' ,	name : 'PALMILLA' },	
                      {id : '06208' ,	name : 'PERALILLO' },
                      {id : '06209' ,	name : 'CHEPICA' },	
                      {id : '06214' ,	name : 'PUMANQUE' }	          
            ] ;
/*
01101	ARICA	001
01106	CAMARONES	295
01201	IQUIQUE	002
01203	PICA	004
01204	POZO ALMONTE	005
01206	HUARA	003
01208	CAMINA	296
01210	COLCHANE	297
01211	ALTO HOSPICIO	347
01301	PUTRE	294
01302	GENERAL LAGOS	293
02101	TOCOPILLA	006
02103	MARIA ELENA	298
02201	ANTOFAGASTA	007
02202	TALTAL	009
02203	MEJILLONES	008
02206	SIERRA GORDA	299
02301	CALAMA	010
02302	OLLAGUE	300
02303	SAN PEDRO DE ATACAMA	301
03101	CHANARAL	011
03102	DIEGO DE ALMAGRO	012
03201	COPIAPO	013
03202	CALDERA	014
03203	TIERRA AMARILLA	015
03301	VALLENAR	016
03302	FREIRINA	017
03303	HUASCO	018
03304	ALTO DEL CARMEN	302
04101	LA SERENA	019
04102	LA HIGUERA	020
04103	COQUIMBO	021
04104	ANDACOLLO	022
04105	VICUNA	023
04106	PAIHUANO	024
04201	OVALLE	025
04203	MONTE PATRIA	026
04204	PUNITAQUI	027
04205	COMBARBALA	029
04206	RIO HURTADO	028
04301	ILLAPEL	030
04302	SALAMANCA	032
04303	LOS VILOS	033
04304	CANELA	031
05101	ISLA DE PASCUA	041
05201	LA LIGUA	059
05202	PETORCA	055
05203	CABILDO	056
05204	ZAPALLAR	058
05205	PAPUDO	057
05301	VALPARAISO	034
05302	VINA DEL MAR	037
05303	VILLA ALEMANA	039
05304	QUILPUE	038
05305	CASABLANCA	040
05306	QUINTERO	035
05307	PUCHUNCAVI	036
05308	JUAN FERNANDEZ	321
05309	CONCON	340
05401	SAN ANTONIO	042
05402	SANTO DOMINGO	043
05403	CARTAGENA	046
05404	EL TABO	047
05405	EL QUISCO	045
05406	ALGARROBO	044
05501	QUILLOTA	048
05502	NOGALES	052
05503	HIJUELAS	051
05504	LA CALERA	050
05505	LA CRUZ	049
05506	LIMACHE	053
05507	OLMUE	054
05601	SAN FELIPE	060
05602	PANQUEHUE	062
05603	CATEMU	063
05604	PUTAENDO	061
05605	SANTA MARIA	064
05606	LLAY-LLAY	065
05701	LOS ANDES	066
05702	CALLE LARGA	067
05703	SAN ESTEBAN	069
05704	RINCONADA	068
06101	RANCAGUA	105
06102	MACHALI	106
06103	GRANEROS	107
06104	SAN FRANCISCO DE MOSTAZAL	111
06105	DONIHUE	112
06106	COLTAUCO	113
06107	CODEGUA	110
06108	PEUMO	115
06109	LAS CABRAS	116
06110	SAN VICENTE	117
06111	PICHIDEGUA	118
06112	RENGO	121
06113	REQUINOA	119
06114	OLIVAR	120
06115	MALLOA	122
06116	COINCO	114
06117	QUINTA DE TILCOCO	123
06201	SAN FERNANDO	124
06202	CHIMBARONGO	125
06203	NANCAGUA	126
06204	PLACILLA	127
06205	SANTA CRUZ	128
06206	LOLOL	129
06207	PALMILLA	130
06208	PERALILLO	131
06209	CHEPICA	132
06214	PUMANQUE	135

06301	PICHILEMU	137
06302	NAVIDAD	138
06303	LITUECHE	136
06304	LA ESTRELLA	139
06305	MARCHIGUE	134
06306	PAREDONES	133
07101	CURICO	140
07102	TENO	142
07103	ROMERAL	141
07104	RAUCO	143
07105	LICANTEN	145
07106	VICHUQUEN	146
07107	HUALANE	144
07108	MOLINA	147
07109	SAGRADA FAMILIA	148
07201	TALCA	150
07202	SAN CLEMENTE	151
07203	PELARCO	152
07204	RIO CLARO	149
07205	PENCAHUE	153
07206	MAULE	154
07207	CUREPTO	155
07208	CONSTITUCION	157
07209	EMPEDRADO	158
07210	SAN RAFAEL	341
07301	LINARES	159
07302	YERBAS BUENAS	160
07303	COLBUN	161
07304	LONGAVI	162
07305	PARRAL	164
07306	RETIRO	165
07309	VILLA ALEGRE	163
07310	SAN JAVIER	156
07401	CAUQUENES	166
07402	PELLUHUE	320
07403	CHANCO	167
08101	CHILLAN	168
08102	PINTO	169
08103	COIHUECO	170
08104	QUIRIHUE	172
08105	NINHUE	174
08106	PORTEZUELO	171
08107	COBQUECURA	175
08108	TREHUACO	173
08109	SAN CARLOS	176
08110	NIQUEN	177
08111	SAN FABIAN	178
08112	SAN NICOLAS	179
08113	BULNES	180
08114	SAN IGNACIO	181
08115	QUILLON	182
08116	YUNGAY	183
08117	PEMUCO	184
08118	EL CARMEN	185
08119	RANQUIL	187
08120	COELEMU	186
08121	CHILLAN VIEJO	342
08201	CONCEPCION	188
08202	PENCO	191
08203	HUALQUI	192
08204	FLORIDA	193
08205	TOME	190
08206	TALCAHUANO	189
08207	CORONEL	194
08208	LOTA	195
*/

//export { GLOBAL_COMUNA } ;


//app.config.globalProperties.BKD_HOST = 'http://192.168.0.110:8080'
//app.config.globalProperties.BKD_HOST = 'http://ec2-18-222-88-128.us-east-2.compute.amazonaws.com:8080'

