const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Directorio digital: datos ──
// Las 6 zonas de la fraternidad (orden de los filtros).
const ZONAS = ["Jaguar", "Tiburón", "Delfín", "Colibrí", "Águila", "Teocalli"];

// Grupos registrados a nivel nacional (capturados vía formulario de registro).
const GRUPOS = [
  {
    "zona": "Jaguar",
    "nombre": "Alas de Libertad",
    "ciudad": "Tixkokob",
    "lider": "P. Martin Madera",
    "whatsapp": "9911106068",
    "facebook": null,
    "direccion": "Calle 21 n.62 x 10 y 12"
  },
  {
    "zona": "Jaguar",
    "nombre": "Altabrisa",
    "ciudad": "Merida,Yucatán",
    "lider": "Areleyna González Albornoz",
    "whatsapp": "9992342628",
    "facebook": null,
    "direccion": "C. 7 # 365 x 2A col. Díaz Ordaz"
  },
  {
    "zona": "Jaguar",
    "nombre": "Anhelo del Alma",
    "ciudad": "Timucuy, Yucatan",
    "lider": "Edgar Osalde",
    "whatsapp": "9982435298",
    "facebook": null,
    "direccion": "Calle 22 x 31 y 33"
  },
  {
    "zona": "Jaguar",
    "nombre": "Caucel Pueblo",
    "ciudad": "Mérida caucel pueblo",
    "lider": "Gerardo Javier peech lira",
    "whatsapp": "9971004990",
    "facebook": "https://www.facebook.com/share/p/1DvHwCfTBL/",
    "direccion": "Calle 21 num 113 x 24 y 26 caucel pueblo"
  },
  {
    "zona": "Jaguar",
    "nombre": "Conkal",
    "ciudad": "Conkal yucatan",
    "lider": "Cristhian Esteve Osorio Reyna",
    "whatsapp": "9994178016",
    "facebook": null,
    "direccion": "Calle 19 s/n xcuyun Yucatán"
  },
  {
    "zona": "Jaguar",
    "nombre": "Creo en Ti",
    "ciudad": "Yucatán, Mérida",
    "lider": "Patricia Briceño Gamboa",
    "whatsapp": "9993277221",
    "facebook": null,
    "direccion": ""
  },
  {
    "zona": "Jaguar",
    "nombre": "Diversidad la Cuna",
    "ciudad": "Mérida, Yucatán",
    "lider": "David González",
    "whatsapp": "9993339355",
    "facebook": "https://www.facebook.com/share/1GhMs5LMdc/?mibextid=wwXIfr",
    "direccion": "C. 60 #739 por 91 y 93 Col. Centro"
  },
  {
    "zona": "Jaguar",
    "nombre": "El Taller del Maestro",
    "ciudad": "Tixpeual yuc",
    "lider": "Maxima antonia bastarrachea Aguilar",
    "whatsapp": "9992675554",
    "facebook": null,
    "direccion": ""
  },
  {
    "zona": "Jaguar",
    "nombre": "Fe, Esperanza y Fortaleza",
    "ciudad": "Mérida Yucatán",
    "lider": "Lidia Maria Ceballos Santiago",
    "whatsapp": "9991488540",
    "facebook": null,
    "direccion": ""
  },
  {
    "zona": "Jaguar",
    "nombre": "Forjando Un Camino",
    "ciudad": "Yaxkukul",
    "lider": "Gilberto Domínguez",
    "whatsapp": "9991367790",
    "facebook": null,
    "direccion": "Rancho la concepción carretera nolo - yaxkukul"
  },
  {
    "zona": "Jaguar",
    "nombre": "Francisco de Montejo",
    "ciudad": "Merida",
    "lider": "Carlos González",
    "whatsapp": "9843146184",
    "facebook": null,
    "direccion": "C. 57A 371, Francisco de Montejo II, 97203 Mérida, Yuc."
  },
  {
    "zona": "Jaguar",
    "nombre": "Fuerza y Libertad",
    "ciudad": "Mérida, Yucatán",
    "lider": "Joel Mena Cordero",
    "whatsapp": "9618013021",
    "facebook": "https://www.facebook.com/share/1DPCja93Tb/",
    "direccion": "C. 18 40, Morelos Oriente, 97174 Mérida, Yuc."
  },
  {
    "zona": "Jaguar",
    "nombre": "Fénix",
    "ciudad": "Tekax Yucatán",
    "lider": "María Elizabeth Góngora Cervantes",
    "whatsapp": "9971241864",
    "facebook": null,
    "direccion": "Calle 58 num 193 x 47 y 49"
  },
  {
    "zona": "Jaguar",
    "nombre": "Grupo Mulchéchen",
    "ciudad": "Mulchéchen",
    "lider": "Angel xooc",
    "whatsapp": "9993574304",
    "facebook": "https://www.facebook.com/share/1DYx69Jrv5/",
    "direccion": "Angel xooc"
  },
  {
    "zona": "Jaguar",
    "nombre": "Grupo Tizimin Yucatán",
    "ciudad": "Tizimin Yucatán",
    "lider": "Luis Pablo Coral Martín",
    "whatsapp": "9995079116",
    "facebook": null,
    "direccion": "Calle 21 # 535 x 50"
  },
  {
    "zona": "Jaguar",
    "nombre": "Grupo Uman yuc",
    "ciudad": "Uman yuc",
    "lider": "Miriam marlin pacheco sanchez",
    "whatsapp": "9991277489",
    "facebook": null,
    "direccion": "C 16 num 285 13 y 13a num"
  },
  {
    "zona": "Jaguar",
    "nombre": "Homún",
    "ciudad": "Merida Yucatán",
    "lider": "José Edilberto",
    "whatsapp": "9991999883",
    "facebook": null,
    "direccion": "Homun"
  },
  {
    "zona": "Jaguar",
    "nombre": "Itzincab",
    "ciudad": "Yucatán",
    "lider": "Landy Esther",
    "whatsapp": "9999082571",
    "facebook": null,
    "direccion": "Calle 42 x 29 s/n Hda, tzincab palomeque"
  },
  {
    "zona": "Jaguar",
    "nombre": "Ixil",
    "ciudad": "Ixil, Merida, Yucatan",
    "lider": "P. Jesus Tun",
    "whatsapp": "9999912295",
    "facebook": "https://www.facebook.com/share/p/18fHXyeoui/",
    "direccion": "C 17 #81 y 14 Ixil Yucatán"
  },
  {
    "zona": "Jaguar",
    "nombre": "La Cuna",
    "ciudad": "Mérida Yucatán",
    "lider": "Ruby D.",
    "whatsapp": "9994130149",
    "facebook": "https://www.facebook.com/lacunagdll",
    "direccion": "C. 60 729, Centro, 97000 Mérida, Yuc."
  },
  {
    "zona": "Jaguar",
    "nombre": "La Fe Que Obra",
    "ciudad": "Yucatán",
    "lider": "Verónica Guadalupe Montero Herrera",
    "whatsapp": "9995694800",
    "facebook": null,
    "direccion": "Calle 53a num 346 x 20 y 22 juan Pablo ll"
  },
  {
    "zona": "Jaguar",
    "nombre": "La Legion Progreso",
    "ciudad": "Yucatan",
    "lider": "Erick Javier Segura Navarrete",
    "whatsapp": "9993841785",
    "facebook": "https://www.facebook.com/share/1AsjqLs1ug/",
    "direccion": "CALLE 19 #101 ENTRE 30 Y 32 C.P. 97330"
  },
  {
    "zona": "Jaguar",
    "nombre": "La Legión",
    "ciudad": "Yucatán, Temax",
    "lider": "Esaú Camargo Casanova",
    "whatsapp": "9991037429",
    "facebook": "https://www.facebook.com/share/1GwiwJcHij/",
    "direccion": "Calle 26 # 118-A entre 35by 37. Temax, Yucatán"
  },
  {
    "zona": "Jaguar",
    "nombre": "La Legión",
    "ciudad": "Kanasín",
    "lider": "José Enrique Ake reyes",
    "whatsapp": "9992440275",
    "facebook": "https://www.facebook.com/share/1E4bS2JaZx/",
    "direccion": "Calle 9c x 40 y 40a fraccionamiento sol kanasin"
  },
  {
    "zona": "Jaguar",
    "nombre": "La Legión",
    "ciudad": "Mérida",
    "lider": "Alejandro Pacheco Colli",
    "whatsapp": "9995081320",
    "facebook": "https://www.facebook.com/share/1BHpa9LHBp/",
    "direccion": "Calle 77 #734 entre 94 y 94-A los almendros C.D"
  },
  {
    "zona": "Jaguar",
    "nombre": "La Legión 4",
    "ciudad": "Mérida, Yucatán",
    "lider": "Alejandro Antonio otero acuña",
    "whatsapp": "9995886012",
    "facebook": "https://www.facebook.com/share/1CqpARv1ee/",
    "direccion": "Calle 39 A #849POR 108 y 110 ciricotes ciudad caucel"
  },
  {
    "zona": "Jaguar",
    "nombre": "La Legión Azul",
    "ciudad": "Mérida Yucatán",
    "lider": "Azucena Cruz Berrios",
    "whatsapp": "9992780789",
    "facebook": "https://www.facebook.com/share/18hrZPuekD/",
    "direccion": "Calle 69 num 1006 a x124 y 126 col Nueva Mulsay 2 CP 97249"
  },
  {
    "zona": "Jaguar",
    "nombre": "La Legión Oriente",
    "ciudad": "Mérida Yucatán",
    "lider": "Lupita Espinosa",
    "whatsapp": "9994625062",
    "facebook": "https://www.facebook.com/share/1DoVzaW54w/",
    "direccion": "22 # 298 x 35 y 39 Colonia Amalia Solorzano II"
  },
  {
    "zona": "Jaguar",
    "nombre": "La Legión Sur",
    "ciudad": "Mérida",
    "lider": "Monica Ramos Cabrera",
    "whatsapp": "9992429408",
    "facebook": "https://www.facebook.com/profile.php?id=61575993182409",
    "direccion": "C. 72 910, San Antonio Xluch I, 97290 Mérida, Yuc."
  },
  {
    "zona": "Jaguar",
    "nombre": "Motul",
    "ciudad": "Yucatán",
    "lider": "Anselmo pareja mut",
    "whatsapp": "9911725189",
    "facebook": null,
    "direccion": "Calle- 31 A x 30 y 28 Motul centro"
  },
  {
    "zona": "Jaguar",
    "nombre": "Refugio Espiritual",
    "ciudad": "Merida yucatan",
    "lider": "Marisol valdez",
    "whatsapp": "9994163820",
    "facebook": null,
    "direccion": "Calle 71a 683 x 86 y 84 almendros 2 ciudad caulcel"
  },
  {
    "zona": "Jaguar",
    "nombre": "Renacer Sotuta",
    "ciudad": "Sotuta, Yucatán",
    "lider": "Eduardo Pérez Gongora",
    "whatsapp": "9994168626",
    "facebook": null,
    "direccion": "Calle 19, entre 20 y 22, S/N"
  },
  {
    "zona": "Jaguar",
    "nombre": "Templarios",
    "ciudad": "Mérida",
    "lider": "Rolando Cortázar",
    "whatsapp": "9991000389",
    "facebook": "https://www.facebook.com/share/1D9jS4MZCe/",
    "direccion": "Calle 71 #790 x 100 y 102 almendros 3, ciudad Caucel"
  },
  {
    "zona": "Jaguar",
    "nombre": "Tercera Promesa",
    "ciudad": "Merida yucatan",
    "lider": "Yajaira pacheco povedano",
    "whatsapp": "9995082600",
    "facebook": null,
    "direccion": "C157c 108 #19 x30y32 perlas billa bonita"
  },
  {
    "zona": "Jaguar",
    "nombre": "Umán",
    "ciudad": "Uman",
    "lider": "Luis Alfonso Mex Martinez",
    "whatsapp": "9993554171",
    "facebook": null,
    "direccion": "Calle 13 no. 89 por 16 Col. Mejorada uman"
  },
  {
    "zona": "Jaguar",
    "nombre": "Un Corazón Agradecido",
    "ciudad": "Mérida,Yucatán",
    "lider": "Aldo Guillen",
    "whatsapp": "9994233193",
    "facebook": null,
    "direccion": "Calle 24 x 14 y 16"
  },
  {
    "zona": "Jaguar",
    "nombre": "Un Nuevo Despertar",
    "ciudad": "Mérida, Yucatán",
    "lider": "P. Daniel Octavio López González",
    "whatsapp": "9992440631",
    "facebook": null,
    "direccion": "Col. Nueva Chichén, calle -25, entre 20 y 22a, #507"
  },
  {
    "zona": "Tiburón",
    "nombre": "70 Veces 7",
    "ciudad": "Valladolid",
    "lider": "P.ivan",
    "whatsapp": "9851098695",
    "facebook": null,
    "direccion": "Calle 56 por 41 y 43 col. Bacalar"
  },
  {
    "zona": "Tiburón",
    "nombre": "Adn Playa del Carmen",
    "ciudad": "Playa del Carmen",
    "lider": "Román alexis Marín Díaz",
    "whatsapp": "9842076328",
    "facebook": "https://www.facebook.com/share/1EU72uJLaH/",
    "direccion": "Playa del carmen quintana Roo 30 avenida colocio con colocio y 25 norte"
  },
  {
    "zona": "Tiburón",
    "nombre": "Cancún",
    "ciudad": "Cancún Q Roo",
    "lider": "Roberto Juan Carlos Rojas Morales (Armando)",
    "whatsapp": "9987760123",
    "facebook": null,
    "direccion": "Region 92 sobre ruta 4 y av kabah"
  },
  {
    "zona": "Tiburón",
    "nombre": "Chetumal",
    "ciudad": "Chetumal QROO",
    "lider": "Fabián Manuel kuc Peña",
    "whatsapp": "9831716821",
    "facebook": null,
    "direccion": ""
  },
  {
    "zona": "Tiburón",
    "nombre": "Concédeme la Serenidad",
    "ciudad": "Felipe Carrillo Puerto Quintana Roo",
    "lider": "Martha Eugenia Martinez Balam",
    "whatsapp": "9831065106",
    "facebook": "https://www.facebook.com/share/1DZFaqjaN1/",
    "direccion": "Calle 51 x50A Col. Javier Rojo Gómez en Felipe Carrillo Puerto Quintana Roo"
  },
  {
    "zona": "Tiburón",
    "nombre": "Cozumel",
    "ciudad": "Cozumel",
    "lider": "Jose Antonio Maldonado Chable",
    "whatsapp": "9875646516",
    "facebook": "https://www.facebook.com/share/1LRMwHffqq/",
    "direccion": "Calle 95 sur bis con Morelos Col. Repobladores, San Miguel de Cozumel, Mexico, 77600"
  },
  {
    "zona": "Tiburón",
    "nombre": "El Faro",
    "ciudad": "Tulum",
    "lider": "Adrián Irineo",
    "whatsapp": "9983216038",
    "facebook": null,
    "direccion": "Colonia Triunfadores Tulum Q. Roo"
  },
  {
    "zona": "Tiburón",
    "nombre": "Esencia del Alma",
    "ciudad": "Valladolid Yucatán",
    "lider": "Pamela Mendoza Vivas",
    "whatsapp": "9851004750",
    "facebook": null,
    "direccion": "Calle 31 núm. 196D por 36 y 39 col. Santa Lucía"
  },
  {
    "zona": "Tiburón",
    "nombre": "Espita",
    "ciudad": "Espita",
    "lider": "Maria Isabel Yam Dzul",
    "whatsapp": "9868610427",
    "facebook": null,
    "direccion": "Calle 22 entre 15 y 17 Espita Yucatan"
  },
  {
    "zona": "Tiburón",
    "nombre": "Felipe carrillo puerto",
    "ciudad": "Felipe carrillo puerto",
    "lider": "Gabriel jesus canul manzanero",
    "whatsapp": "9838092970",
    "facebook": null,
    "direccion": ""
  },
  {
    "zona": "Tiburón",
    "nombre": "Fuente de Vida",
    "ciudad": "Valladolid yucatan",
    "lider": "Pedro Cocom",
    "whatsapp": "9851156393",
    "facebook": null,
    "direccion": "Calle 14 / 37 y 39 col militar Valladolid yuc"
  },
  {
    "zona": "Tiburón",
    "nombre": "Génesis",
    "ciudad": "Quintana roo",
    "lider": "Belisario moreno",
    "whatsapp": "9841794272",
    "facebook": "https://www.facebook.com/share/1A3E3AkmZJ/",
    "direccion": "Fraccionamiento villamar 2 av azores casa #10"
  },
  {
    "zona": "Tiburón",
    "nombre": "Hunab Kú",
    "ciudad": "Playa del Carmen",
    "lider": "Vicente Vallin",
    "whatsapp": "9841182129",
    "facebook": "https://www.facebook.com/share/1CAG6NrgXX/?mibextid=wwXIfr",
    "direccion": "Calle 17 sur entre 85 y 95 sur colonia ejido"
  },
  {
    "zona": "Tiburón",
    "nombre": "La Buena Voluntad",
    "ciudad": "Quintanas roo",
    "lider": "Jose David alvarez flores",
    "whatsapp": "9871055246",
    "facebook": null,
    "direccion": "Calle camarón a un costado del templo azul colonia 55."
  },
  {
    "zona": "Tiburón",
    "nombre": "Metamorfosis",
    "ciudad": "Tulum",
    "lider": "Diana Hernández",
    "whatsapp": "9841780747",
    "facebook": null,
    "direccion": "Av satélite /Bubulek / tulum"
  },
  {
    "zona": "Tiburón",
    "nombre": "Nueva Vida",
    "ciudad": "Canacun",
    "lider": "Fatima Canto Villanueva",
    "whatsapp": "9983410833",
    "facebook": null,
    "direccion": "region 99mza 27 lote 1x a.v 135 y calle 8"
  },
  {
    "zona": "Tiburón",
    "nombre": "Paso Doce",
    "ciudad": "Valladolid",
    "lider": "Patricio Alejandro Rodríguez Cervera",
    "whatsapp": "9851095789",
    "facebook": "https://www.facebook.com/share/1Dz9kektTN/",
    "direccion": "Calle 51 x 50 y 52 Esquina Barrio de Sisal frente al templo testigos de jehova"
  },
  {
    "zona": "Tiburón",
    "nombre": "Pegaso",
    "ciudad": "Quintana Roo",
    "lider": "Miguel angel hernandez",
    "whatsapp": "9842563311",
    "facebook": null,
    "direccion": "Col las flores Av olivos con constituyentes"
  },
  {
    "zona": "Tiburón",
    "nombre": "Playacar",
    "ciudad": "Playa del Carmen",
    "lider": "Marisol Arana",
    "whatsapp": "9842149974",
    "facebook": "https://www.facebook.com/share/14eR7xtxAQd/",
    "direccion": "Calle 120 entre 12 y 14, colonia Ejido"
  },
  {
    "zona": "Tiburón",
    "nombre": "Polaris",
    "ciudad": "Cancun",
    "lider": "Fernando Jimenez",
    "whatsapp": "9982598087",
    "facebook": null,
    "direccion": "REGION 221"
  },
  {
    "zona": "Tiburón",
    "nombre": "Refugio del Alma",
    "ciudad": "Piste yuc",
    "lider": "Jose luis flores",
    "whatsapp": "9858527226",
    "facebook": null,
    "direccion": "Calle 11 x 22 S N"
  },
  {
    "zona": "Tiburón",
    "nombre": "Renacer Q. Roo",
    "ciudad": "Cancun Quintana Roo",
    "lider": "Hector Dzul Pech",
    "whatsapp": "9983036062",
    "facebook": "https://www.facebook.com/",
    "direccion": "AV TORCASITA ENTRE TALLERES Y RUTA 5"
  },
  {
    "zona": "Tiburón",
    "nombre": "Sembrando Amor",
    "ciudad": "Chetumal",
    "lider": "Luis Ariel Caamal Canul",
    "whatsapp": "9831399822",
    "facebook": null,
    "direccion": "Calle naranjal esquina pascual coral No.278 colonia nueva esperanza"
  },
  {
    "zona": "Tiburón",
    "nombre": "Tizimín",
    "ciudad": "Tizimin Yucatán",
    "lider": "Ileana Inés cen balam",
    "whatsapp": "9861074542",
    "facebook": null,
    "direccion": "C. 46-A 428a, Centro, 97703 Tizimín, Yuc."
  },
  {
    "zona": "Tiburón",
    "nombre": "Transformación",
    "ciudad": "Cancun Quintana Roo",
    "lider": "Luis Gerardo Ramos Diaz",
    "whatsapp": "9992386290",
    "facebook": null,
    "direccion": "Región 73 manzana 2 lote 3 calle 32 entre CTM y Lombardo"
  },
  {
    "zona": "Tiburón",
    "nombre": "Tulum",
    "ciudad": "Tulum",
    "lider": "Kevin Alejandro May Noh",
    "whatsapp": "9841676098",
    "facebook": "https://www.facebook.com/share/1D1SvAPihd/",
    "direccion": "C. Faisan, entre C. 12 y 2 D, Col. Tumben kaa, Tulum, Quintana Roo"
  },
  {
    "zona": "Tiburón",
    "nombre": "Valladolid",
    "ciudad": "Valladolid, Yucatán",
    "lider": "Roger Oswaldo Casanova Uc",
    "whatsapp": "9858590500",
    "facebook": null,
    "direccion": "Calle 44 No. 157 A x 27A y 29 Colonia Santa Lucía"
  },
  {
    "zona": "Tiburón",
    "nombre": "Vuelo",
    "ciudad": "Valladolid",
    "lider": "Isabel Cervera Sosa",
    "whatsapp": "9851118097",
    "facebook": null,
    "direccion": "Calle 41 num 309 entre 66 y 68 Col Emiliano Zapata"
  },
  {
    "zona": "Tiburón",
    "nombre": "Ángeles",
    "ciudad": "Cozumel",
    "lider": "Garma",
    "whatsapp": "9871128263",
    "facebook": null,
    "direccion": "40 avenida entre 5 e hidalgo"
  },
  {
    "zona": "Delfín",
    "nombre": "Aliento de Vida",
    "ciudad": "Ciudad del Carmen",
    "lider": "Gabriela Uribe",
    "whatsapp": "9383791314",
    "facebook": null,
    "direccion": "Av. Puerto de Campeche, entre Río Pital y Río Chumpan, Col. La Rivera"
  },
  {
    "zona": "Delfín",
    "nombre": "Camino a la Felicidad",
    "ciudad": "Ciudad del Carmen, camp",
    "lider": "Karina del Rosario Colli",
    "whatsapp": "9381577605",
    "facebook": null,
    "direccion": "C Guadalupe Victoria #65 Col Insurgentes"
  },
  {
    "zona": "Delfín",
    "nombre": "Camino a la Felicidad",
    "ciudad": "Cd del Carmen Campeche",
    "lider": "Maria Conchita Gómez Rico",
    "whatsapp": "9381244142",
    "facebook": null,
    "direccion": ""
  },
  {
    "zona": "Delfín",
    "nombre": "Campeche",
    "ciudad": "Campeche",
    "lider": "Madrina Pamela",
    "whatsapp": "9811935952",
    "facebook": "https://www.facebook.com/share/1EDuBk4WNW/",
    "direccion": "Calle Querétaro entre Perú y Paraguay colonia Santana"
  },
  {
    "zona": "Delfín",
    "nombre": "Cd del carmen",
    "ciudad": "Carmen",
    "lider": "Veronica lopez",
    "whatsapp": "9381284306",
    "facebook": null,
    "direccion": "Avenida camarón esquina con 70 col. Justo Cierra"
  },
  {
    "zona": "Delfín",
    "nombre": "Grupo Ciudad del Carmen",
    "ciudad": "Ciudad del Carmen",
    "lider": "Carlos Alfredo Mendoza González",
    "whatsapp": "9384056163",
    "facebook": null,
    "direccion": "Calle 33 entre 44 y 46 colonia Tila"
  },
  {
    "zona": "Delfín",
    "nombre": "Primera Tradición",
    "ciudad": "Champotón, Campeche",
    "lider": "Roberto Contreras castillo",
    "whatsapp": "9844313664",
    "facebook": null,
    "direccion": "Calle 15b entre 16 y 18 col. Manguitos Champotón Campeche"
  },
  {
    "zona": "Delfín",
    "nombre": "Primera Tradición",
    "ciudad": "Campeche",
    "lider": "José Manuel Hernández bolaina",
    "whatsapp": "9381255923",
    "facebook": "https://www.facebook.com/share/1AymvefKny/?mibextid=wwXIfr",
    "direccion": "Calle 53a entre 70 y 70a colonia Morelos"
  },
  {
    "zona": "Delfín",
    "nombre": "Refugio Espiritual",
    "ciudad": "Carmen",
    "lider": "Ivan García",
    "whatsapp": "9381580524",
    "facebook": null,
    "direccion": "Calle 29b entre 24 y 26 Col Centro"
  },
  {
    "zona": "Delfín",
    "nombre": "Renacimiento",
    "ciudad": "",
    "lider": "Carlos Sánchez Velasco",
    "whatsapp": "9381711161",
    "facebook": "https://www.facebook.com/share/1BYiucNkn1/?mibextid=wwXIfr",
    "direccion": "Avenida puerto del Carmen Colonia Renovación 1 frente a la casa de los maestros."
  },
  {
    "zona": "Delfín",
    "nombre": "Teocalli",
    "ciudad": "Carmen",
    "lider": "Víctor Naal",
    "whatsapp": "9384055697",
    "facebook": null,
    "direccion": "Colonia Tecolutla Calle 45 por 36 y 38"
  },
  {
    "zona": "Águila",
    "nombre": "El Arte de Vivir",
    "ciudad": "Gómez Palacio, Durango",
    "lider": "Koryna Gallegos",
    "whatsapp": "8711578238",
    "facebook": null,
    "direccion": "Miguel Auza 1132 colonia El foce"
  },
  {
    "zona": "Águila",
    "nombre": "El Honor de Servir",
    "ciudad": "Torreón, Coahuila",
    "lider": "Fernanda Romero",
    "whatsapp": "8715136951",
    "facebook": "https://www.facebook.com/share/1XMZKMgnAH/?mibextid=wwXIfr",
    "direccion": "Nogal Americano #63 Rincón de los nogales"
  }
];


/* ==========================================================
   FGDLL · Script compartido
   Módulos: navegación, reveal, directorio, calendario, portal, ética
   ========================================================== */

const FGDLL = (() => {
  const qs = (s, scope = document) => scope.querySelector(s);
  const qsa = (s, scope = document) => [...scope.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const icons = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>'
  };

  let activeZona = 'Todas';
  let searchQuery = '';

  const escapeHTML = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const fmtTel = (n = '') => {
    const d = String(n).replace(/\D/g, '');
    return d.length === 10 ? d.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3') : n;
  };

  function initBase() {
    const year = qs('#year');
    if (year) year.textContent = new Date().getFullYear();

    const header = qs('#header');
    if (header) {
      const setShadow = () => header.classList.toggle('scrolled', window.scrollY > 8);
      setShadow();
      window.addEventListener('scroll', setShadow, { passive: true });
    }

    const navToggle = qs('#navToggle');
    const navMobile = qs('#navMobile');
    if (navToggle && navMobile) {
      navToggle.addEventListener('click', () => {
        const isOpen = navMobile.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      });
      qsa('[data-close-menu]', navMobile).forEach(link => link.addEventListener('click', () => closeMobileNav()));
    }

    initReveal();
    initActiveNav();
  }

  function closeMobileNav() {
    const navToggle = qs('#navToggle');
    const navMobile = qs('#navMobile');
    if (!navToggle || !navMobile) return;
    navMobile.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú');
  }

  function initReveal() {
    const els = qsa('.reveal');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
  }

  function initActiveNav() {
    const links = qsa('.nav a[data-nav]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    const sections = links.map(link => qs(link.getAttribute('href'))).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => { link.classList.remove('active'); link.removeAttribute('aria-current'); });
        const active = qs(`.nav a[href="#${entry.target.id}"]`);
        if (active) { active.classList.add('active'); active.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(section => observer.observe(section));
  }

  function dirCardHTML(g) {
    const wa = g.whatsapp ? 'https://wa.me/52' + String(g.whatsapp).replace(/\D/g, '') : null;
    const mapa = g.direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${g.direccion} ${g.ciudad || ''}`) : null;
    return `<article class="dir-card">
      <span class="zona-badge-sm">Zona ${escapeHTML(g.zona || '')}</span>
      <h3>${escapeHTML(g.nombre || 'Grupo sin nombre')}</h3>
      ${g.ciudad ? `<div class="dir-ciudad">${escapeHTML(g.ciudad)}</div>` : ''}
      ${g.lider ? `<div class="dir-leader"><span>Persona de contacto</span>${escapeHTML(g.lider)}</div>` : ''}
      <div class="dir-rows">
        ${g.direccion ? `<div class="dir-row">${icons.pin}<span>${escapeHTML(g.direccion)}</span></div>` : ''}
        ${g.whatsapp ? `<div class="dir-row">${icons.wa}<span>WhatsApp +52 ${escapeHTML(fmtTel(g.whatsapp))}</span></div>` : ''}
      </div>
      <div class="dir-actions">
        ${wa ? `<a class="wa" href="${wa}" target="_blank" rel="noopener">${icons.wa} Escribir</a>` : ''}
        ${mapa ? `<a class="map" href="${mapa}" target="_blank" rel="noopener">${icons.map} Cómo llegar</a>` : ''}
        ${g.facebook ? `<a class="fb" href="${escapeHTML(g.facebook)}" target="_blank" rel="noopener">${icons.fb} Facebook</a>` : ''}
      </div>
    </article>`;
  }

  function getFilteredGroups() {
    const q = searchQuery.trim().toLowerCase();
    return GRUPOS.filter(g => {
      const zonaOk = activeZona === 'Todas' || g.zona === activeZona;
      if (!zonaOk) return false;
      if (!q) return true;
      return [g.zona, g.nombre, g.ciudad, g.lider, g.direccion]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }

  function renderDirGrid() {
    const dirGrid = qs('#dirGrid');
    if (!dirGrid) return;
    const list = getFilteredGroups();
    dirGrid.innerHTML = list.length
      ? list.map(dirCardHTML).join('')
      : `<div class="dir-empty">No encontramos grupos con ese filtro. Intenta buscar por zona, ciudad o nombre.</div>`;
  }

  function renderDirFilter() {
    const dirFilter = qs('#dirFilter');
    if (!dirFilter) return;
    const count = (z) => GRUPOS.filter(g => g.zona === z).length;
    dirFilter.innerHTML = ['Todas', ...ZONAS].map(z => {
      const n = z === 'Todas' ? GRUPOS.length : count(z);
      const cls = z === activeZona ? 'chip active' : 'chip';
      return `<button type="button" class="${cls}" data-zona="${escapeHTML(z)}">${escapeHTML(z)}${n ? `<i>${n}</i>` : ''}</button>`;
    }).join('');
    qsa('.chip', dirFilter).forEach(chip => chip.addEventListener('click', () => {
      activeZona = chip.dataset.zona || 'Todas';
      renderDirFilter();
      renderDirGrid();
    }));
  }

  function initDirectory() {
    const dirGrid = qs('#dirGrid');
    const dirFilter = qs('#dirFilter');
    if (!dirGrid || !dirFilter || typeof GRUPOS === 'undefined') return;

    const statGrupos = qs('#statGrupos');
    if (statGrupos) statGrupos.textContent = `${GRUPOS.length}+`;

    qsa('[data-zona-count]').forEach(el => {
      const z = el.getAttribute('data-zona-count');
      const n = GRUPOS.filter(g => g.zona === z).length;
      el.textContent = n ? `${n} grupo${n === 1 ? '' : 's'}` : 'Próximamente';
    });

    const search = qs('#dirSearch');
    if (search) search.addEventListener('input', () => { searchQuery = search.value; renderDirGrid(); });

    qsa('.zona-card[data-zona]').forEach(card => {
      card.addEventListener('click', () => {
        activeZona = card.dataset.zona || 'Todas';
        renderDirFilter();
        renderDirGrid();
        qs('#directorio')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });

    renderDirFilter();
    renderDirGrid();
  }

  function initCalendar() {
    qsa('.cal-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        qsa('.cal-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        qsa('.cal-panel').forEach(p => { p.classList.remove('active'); p.setAttribute('hidden', ''); });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const panel = qs('#cal-' + tab.dataset.cal);
        if (panel) { panel.classList.add('active'); panel.removeAttribute('hidden'); }
      });
    });
  }

  function initPortalTabs() {
    qsa('.tab-btn[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const wrap = btn.closest('.panel') || document;
        qsa('.tab-btn[data-tab]', wrap).forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        qsa('.tab-panel', wrap).forEach(panel => panel.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        qs('#tab-' + btn.dataset.tab, wrap)?.classList.add('active');
      });
    });
  }

  function initEthics() {
    const buttons = qsa('[data-ethics]');
    const sections = qsa('.ethics-section');
    if (!buttons.length || !sections.length) return;

    const show = (name) => {
      sections.forEach(section => section.classList.toggle('active', section.id === 'etica-' + name));
      buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.ethics === name));
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    buttons.forEach(btn => btn.addEventListener('click', () => show(btn.dataset.ethics)));

    const form = qs('#reportForm');
    if (form) form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const code = 'FGDLL-' + new Date().getFullYear() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
      qs('#reportCode').textContent = code;
      qs('#reportCodeBox').classList.add('active');
      qs('#reportCodeBox').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });

    const check = qs('#checkFolio');
    if (check) check.addEventListener('click', () => {
      const input = qs('#folioInput');
      if (input && !input.value.trim()) {
        input.focus();
        return;
      }
      qsa('#folioTimeline .timeline-item').forEach((item, idx) => item.classList.toggle('active', idx === 0));
      alert('Este demo muestra una ruta de seguimiento. Para producción debe conectarse a una base segura.');
    });
  }

  function init() {
    initBase();
    initDirectory();
    initCalendar();
    initPortalTabs();
    initEthics();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', FGDLL.init);
