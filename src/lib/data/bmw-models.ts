export interface BmwModelData {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  msrpMxn: number;
  engineCapacityCc: number;
  powerHp: number;
  torqueNm: number;
  seatHeightMm: number;
  unladenWeightKg: number;
  topSpeedKmh: number;
  fuelEfficiencyKml: number;
  description: string;
  heroImage: string;
  galleryImages: string[];
  pros: string[];
  cons: string[];
  colors: { name: string; hex: string }[];
  accessories: { name: string; priceMxn: number }[];
  faq?: { question: string; answer: string }[];
  specs?: { category: string; key: string; value: string }[];
}

export const BMW_MODELS_DATA: BmwModelData[] = [
  {
    "slug": "g310gs",
    "name": "BMW G 310 GS",
    "tagline": "El espíritu GS listo para la selva urbana y tu primera aventura.",
    "category": "Adventure",
    "msrpMxn": 138000,
    "engineCapacityCc": 313,
    "powerHp": 34,
    "torqueNm": 28,
    "seatHeightMm": 835,
    "unladenWeightKg": 175,
    "topSpeedKmh": 143,
    "fuelEfficiencyKml": 30.3,
    "description": "Ligera, ágil y versátil. La G 310 GS lleva el ADN inconfundible de la familia GS a un formato de 313 cc ideal para desplazamientos diarios y rutas de fin de semana.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473226/motorrax/models/g310gs/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473222/motorrax/models/g310gs/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473223/motorrax/models/g310gs/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473224/motorrax/models/g310gs/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473225/motorrax/models/g310gs/gallery-4.jpg"
    ],
    "pros": [
      "Ligereza extrema de 175 kg",
      "Excelente rendimiento de combustible",
      "Ergonomía erguida de visibilidad total"
    ],
    "cons": [
      "Velocidad de crucero moderada en autopistas rápidas"
    ],
    "colors": [
      {
        "name": "Cosmic Black",
        "hex": "#151515"
      },
      {
        "name": "Style Rallye Kanthal Red",
        "hex": "#D60000"
      }
    ],
    "accessories": [
      {
        "name": "Topcase urbano 30L",
        "priceMxn": 6800
      },
      {
        "name": "Barras de protección de motor",
        "priceMxn": 4200
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Tipo de motor",
        "value": "Monocilíndrico de 4 tiempos enfriado por agua, 4 válvulas"
      },
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "313 cc"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "34 HP a 9,250 rpm"
      },
      {
        "category": "Motor",
        "key": "Par Motor",
        "value": "28 Nm a 7,500 rpm"
      },
      {
        "category": "Prestaciones",
        "key": "Velocidad Máxima",
        "value": "143 km/h"
      },
      {
        "category": "Chasis / Frenos",
        "key": "Freno delantero",
        "value": "Disco único 300 mm, pinza de 4 pistones"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "175 kg"
      }
    ]
  },
  {
    "slug": "f800gs",
    "name": "BMW F 800 GS",
    "tagline": "El equilibrio ideal para tu movilidad diaria y viajes todoterreno.",
    "category": "Adventure",
    "msrpMxn": 295000,
    "engineCapacityCc": 895,
    "powerHp": 87,
    "torqueNm": 91,
    "seatHeightMm": 815,
    "unladenWeightKg": 227,
    "topSpeedKmh": 190,
    "fuelEfficiencyKml": 23.2,
    "description": "Con 87 hp y una altura de asiento accesible de 815 mm, la nueva F 800 GS es la entrada perfecta al segmento de aventura de cilindrada media.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473207/motorrax/models/f800gs/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473204/motorrax/models/f800gs/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473205/motorrax/models/f800gs/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473205/motorrax/models/f800gs/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473206/motorrax/models/f800gs/gallery-4.jpg"
    ],
    "pros": [
      "Asiento bajo accesible (815 mm)",
      "Pantalla TFT de 6.5 pulgadas de serie",
      "Gran economía de uso"
    ],
    "cons": [
      "Menor recorrido de suspensión que la F 900 GS"
    ],
    "colors": [
      {
        "name": "Lightwhite Uni",
        "hex": "#FFFFFF"
      },
      {
        "name": "Racing Blue",
        "hex": "#0055A5"
      }
    ],
    "accessories": [
      {
        "name": "Soportes de maleta laterales",
        "priceMxn": 9500
      },
      {
        "name": "Puños calefactables",
        "priceMxn": 5200
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Tipo de motor",
        "value": "Bicilíndrico en línea de 4 tiempos enfriado por agua"
      },
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "895 cc"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "87 HP a 6,750 rpm"
      },
      {
        "category": "Motor",
        "key": "Par Motor",
        "value": "91 Nm a 6,750 rpm"
      },
      {
        "category": "Prestaciones",
        "key": "Velocidad Máxima",
        "value": "190 km/h"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "227 kg"
      }
    ]
  },
  {
    "slug": "f900gs",
    "name": "BMW F 900 GS",
    "tagline": "Off-road puro, ligereza radical y 105 HP.",
    "category": "Adventure",
    "msrpMxn": 348000,
    "engineCapacityCc": 895,
    "powerHp": 105,
    "torqueNm": 93,
    "seatHeightMm": 870,
    "unladenWeightKg": 219,
    "topSpeedKmh": 210,
    "fuelEfficiencyKml": 22.7,
    "description": "Enduro de viaje aligerada (-14 kg) con escape Akrapovič de serie y geometría pura para terracerías exigentes.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473211/motorrax/models/f900gs/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473207/motorrax/models/f900gs/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473208/motorrax/models/f900gs/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473209/motorrax/models/f900gs/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473210/motorrax/models/f900gs/gallery-4.jpg"
    ],
    "pros": [
      "Reducción de peso masiva y escape Akrapovič",
      "Suspensiones Showa completamente ajustables",
      "ADN 70% todoterreno"
    ],
    "cons": [
      "Asiento alto para pilotos bajos"
    ],
    "colors": [
      {
        "name": "Blackstorm Metallic",
        "hex": "#111111"
      },
      {
        "name": "GS Trophy Lightwhite",
        "hex": "#FFFFFF"
      }
    ],
    "accessories": [
      {
        "name": "Protector de manillar Enduro",
        "priceMxn": 4500
      },
      {
        "name": "Bolsa de tanque impermeabilizada",
        "priceMxn": 6200
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Tipo de motor",
        "value": "Bicilíndrico en línea de 895 cc"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "105 HP a 8,500 rpm"
      },
      {
        "category": "Motor",
        "key": "Par Motor",
        "value": "93 Nm a 6,750 rpm"
      },
      {
        "category": "Prestaciones",
        "key": "Velocidad Máxima",
        "value": "210 km/h"
      },
      {
        "category": "Chasis / Frenos",
        "key": "Suspensión delantera",
        "value": "Horquilla telescópica invertida Showa 43 mm ajustables"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "219 kg"
      }
    ]
  },
  {
    "slug": "f900gs-adventure",
    "name": "BMW F 900 GS Adventure",
    "tagline": "Autonomía sin límites para viajes continentales extremos.",
    "category": "Adventure",
    "msrpMxn": 375000,
    "engineCapacityCc": 895,
    "powerHp": 105,
    "torqueNm": 93,
    "seatHeightMm": 875,
    "unladenWeightKg": 246,
    "topSpeedKmh": 210,
    "fuelEfficiencyKml": 22.7,
    "description": "Equipada con tanque de 23 Litros, defensas de motor completas y parabrisas touring alto para expediciones largas sin detenerte a recargar.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473214/motorrax/models/f900gs-adventure/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473211/motorrax/models/f900gs-adventure/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473212/motorrax/models/f900gs-adventure/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473212/motorrax/models/f900gs-adventure/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473213/motorrax/models/f900gs-adventure/gallery-4.jpg"
    ],
    "pros": [
      "Tanque gigante de 23 Litros",
      "Protección aerodinámica superior",
      "Defensas de protección integradas"
    ],
    "cons": [
      "Mayor peso con tanque lleno"
    ],
    "colors": [
      {
        "name": "Blackstorm Metallic",
        "hex": "#111111"
      },
      {
        "name": "Ride White Uni",
        "hex": "#FFFFFF"
      }
    ],
    "accessories": [
      {
        "name": "Maletas de aluminio expedition",
        "priceMxn": 34000
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "895 cc"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "105 HP a 8,500 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Capacidad de Tanque",
        "value": "23 Litros"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "246 kg"
      }
    ]
  },
  {
    "slug": "r1300gs",
    "name": "BMW R 1300 GS",
    "tagline": "El nuevo estándar mundial de la aventura legendaria.",
    "category": "Adventure",
    "msrpMxn": 512000,
    "engineCapacityCc": 1300,
    "powerHp": 145,
    "torqueNm": 149,
    "seatHeightMm": 850,
    "unladenWeightKg": 237,
    "topSpeedKmh": 225,
    "fuelEfficiencyKml": 20.8,
    "description": "Con 145 hp y 149 Nm de par motor, la R 1300 GS redefine el dinamismo en todo terreno con suspensión adaptativa de altura DSA y faro matricial LED.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473263/motorrax/models/r1300gs/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473260/motorrax/models/r1300gs/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473260/motorrax/models/r1300gs/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473261/motorrax/models/r1300gs/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473262/motorrax/models/r1300gs/gallery-4.jpg"
    ],
    "pros": [
      "Motor Boxer 1,300 cc con ShiftCam",
      "Control adaptativo de altura desciende a 820 mm",
      "Cardán sin mantenimiento"
    ],
    "cons": [
      "Precio en configuraciones Option 719"
    ],
    "colors": [
      {
        "name": "Light White Uni",
        "hex": "#FFFFFF"
      },
      {
        "name": "Option 719 Aurelius Green",
        "hex": "#1B3B2B"
      }
    ],
    "accessories": [
      {
        "name": "Maletas Vario electrónicas",
        "priceMxn": 32000
      },
      {
        "name": "Faros auxiliares LED",
        "priceMxn": 14200
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Tipo de motor",
        "value": "Bicilíndrico Boxer de 4 tiempos enfriado por aire/líquido con ShiftCam"
      },
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "1,300 cc"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "145 HP a 7,750 rpm"
      },
      {
        "category": "Motor",
        "key": "Par Motor",
        "value": "149 Nm a 6,500 rpm"
      },
      {
        "category": "Prestaciones",
        "key": "Velocidad Máxima",
        "value": "225 km/h"
      },
      {
        "category": "Transmisión",
        "key": "Transmisión secundaria",
        "value": "Cardán helicoidal"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "237 kg"
      }
    ]
  },
  {
    "slug": "r1300gs-adventure",
    "name": "BMW R 1300 GS Adventure",
    "tagline": "La fortaleza inexpugnable para la vuelta al mundo.",
    "category": "Adventure",
    "msrpMxn": 575000,
    "engineCapacityCc": 1300,
    "powerHp": 145,
    "torqueNm": 149,
    "seatHeightMm": 870,
    "unladenWeightKg": 269,
    "topSpeedKmh": 220,
    "fuelEfficiencyKml": 20.4,
    "description": "Tanque de 30 Litros, armadura de defensas integradas y transmisión automatizada ASA opcional para cruzar desiertos y cordilleras.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473266/motorrax/models/r1300gs-adventure/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473263/motorrax/models/r1300gs-adventure/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473264/motorrax/models/r1300gs-adventure/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473265/motorrax/models/r1300gs-adventure/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473265/motorrax/models/r1300gs-adventure/gallery-4.jpg"
    ],
    "pros": [
      "Autonomía de más de 600 km por tanque",
      "Carenado y protección masiva",
      "Opción de transmisión ASA sin maneta de embrague"
    ],
    "cons": [
      "Dimensiones imponentes"
    ],
    "colors": [
      {
        "name": "Racing Red",
        "hex": "#D60000"
      },
      {
        "name": "Option 719 Karakorum",
        "hex": "#1C2D37"
      }
    ],
    "accessories": [
      {
        "name": "Kit completo de maletas de aluminio 3 piezas",
        "priceMxn": 48000
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "1,300 cc Boxer"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "145 HP a 7,750 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Capacidad de Tanque",
        "value": "30 Litros"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "269 kg"
      }
    ]
  },
  {
    "slug": "g310r",
    "name": "BMW G 310 R",
    "tagline": "Maniobrabilidad dinámicas y estilo dinámico para la ciudad.",
    "category": "Roadster",
    "msrpMxn": 125000,
    "engineCapacityCc": 313,
    "powerHp": 34,
    "torqueNm": 28,
    "seatHeightMm": 785,
    "unladenWeightKg": 164,
    "topSpeedKmh": 143,
    "fuelEfficiencyKml": 30.3,
    "description": "La roadster más ligera e intuitiva. Posición deportiva relajada y respuesta inmediata del motor de 313 cc para conquistar la jungla urbana.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473229/motorrax/models/g310r/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473226/motorrax/models/g310r/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473227/motorrax/models/g310r/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473228/motorrax/models/g310r/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473228/motorrax/models/g310r/gallery-4.jpg"
    ],
    "pros": [
      "Ligereza suprema de 164 kg",
      "Asiento bajo de 785 mm",
      "Acelerador electrónico Ride-by-Wire"
    ],
    "cons": [
      "Orientación puramente urbana"
    ],
    "colors": [
      {
        "name": "Cosmic Black 2",
        "hex": "#111111"
      },
      {
        "name": "Sport Limestone Metallic",
        "hex": "#7A8288"
      }
    ],
    "accessories": [
      {
        "name": "Palancas ajustables M",
        "priceMxn": 3800
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "313 cc"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "34 HP a 9,250 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "164 kg"
      }
    ]
  },
  {
    "slug": "f900r",
    "name": "BMW F 900 R",
    "tagline": "El roadster dinámico e intuitivo con 105 HP.",
    "category": "Roadster",
    "msrpMxn": 268000,
    "engineCapacityCc": 895,
    "powerHp": 105,
    "torqueNm": 92,
    "seatHeightMm": 815,
    "unladenWeightKg": 211,
    "topSpeedKmh": 216,
    "fuelEfficiencyKml": 23.8,
    "description": "Líneas musculosas, faro LED adaptativo e iluminación adaptativa en curva para devorar tramos de curvas con total control.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473218/motorrax/models/f900r/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473215/motorrax/models/f900r/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473216/motorrax/models/f900r/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473216/motorrax/models/f900r/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473217/motorrax/models/f900r/gallery-4.jpg"
    ],
    "pros": [
      "Excelente relación precio-potencia",
      "Faro Headlight Pro adaptativo",
      "Asistente de cambio de marchas Pro"
    ],
    "cons": [
      "Poca protección contra el viento en autopista"
    ],
    "colors": [
      {
        "name": "San Marino Blue",
        "hex": "#0047AB"
      },
      {
        "name": "Blackstorm Metallic",
        "hex": "#0F0F0F"
      }
    ],
    "accessories": [
      {
        "name": "Spoiler de motor deportivo",
        "priceMxn": 5400
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "895 cc"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "105 HP a 8,500 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "211 kg"
      }
    ]
  },
  {
    "slug": "s1000r",
    "name": "BMW S 1000 R",
    "tagline": "Naked superdeportiva de 165 HP con ADN de superbike.",
    "category": "Roadster",
    "msrpMxn": 398000,
    "engineCapacityCc": 999,
    "powerHp": 165,
    "torqueNm": 114,
    "seatHeightMm": 830,
    "unladenWeightKg": 199,
    "topSpeedKmh": 255,
    "fuelEfficiencyKml": 16.1,
    "description": "Derivada directamente de la S 1000 RR pero al desnudo. 165 HP en un peso ultraligero de 199 kg para una aceleración explosiva.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473277/motorrax/models/s1000r/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473274/motorrax/models/s1000r/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473274/motorrax/models/s1000r/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473275/motorrax/models/s1000r/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473276/motorrax/models/s1000r/gallery-4.jpg"
    ],
    "pros": [
      "165 HP con respuesta instantánea de 4 cilindros",
      "Chasis ultraligero Flex Frame",
      "Control de freno motor MSR"
    ],
    "cons": [
      "Suspensión rígida en calles deterioradas"
    ],
    "colors": [
      {
        "name": "Blizzard White",
        "hex": "#FAFAFA"
      },
      {
        "name": "M Motorsport",
        "hex": "#0055A5"
      }
    ],
    "accessories": [
      {
        "name": "Escape de titanio Akrapovič corto",
        "priceMxn": 24000
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "999 cc 4 cilindros"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "165 HP a 11,000 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "199 kg"
      }
    ]
  },
  {
    "slug": "f900xr",
    "name": "BMW F 900 XR",
    "tagline": "Deportividad ergonómica para rutas infinitas.",
    "category": "Sport",
    "msrpMxn": 315000,
    "engineCapacityCc": 895,
    "powerHp": 105,
    "torqueNm": 92,
    "seatHeightMm": 825,
    "unladenWeightKg": 219,
    "topSpeedKmh": 216,
    "fuelEfficiencyKml": 23.8,
    "description": "Combina la agilidad de una roadster con la postura erguida de una touring para ofrecer una experiencia sport-touring impecable.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473221/motorrax/models/f900xr/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473218/motorrax/models/f900xr/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473219/motorrax/models/f900xr/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473220/motorrax/models/f900xr/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473220/motorrax/models/f900xr/gallery-4.jpg"
    ],
    "pros": [
      "Ergonomía confortable con parabrisas ajustable",
      "105 HP muy aprovechables",
      "Puntos de fijación de maleta integrados"
    ],
    "cons": [
      "Menor potencia que la S 1000 XR"
    ],
    "colors": [
      {
        "name": "Racing Red",
        "hex": "#D60000"
      },
      {
        "name": "Triple Black",
        "hex": "#1A1A1A"
      }
    ],
    "accessories": [
      {
        "name": "Maletas laterales de viaje",
        "priceMxn": 18500
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "895 cc Bicilíndrico"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "105 HP a 8,500 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "219 kg"
      }
    ]
  },
  {
    "slug": "s1000xr",
    "name": "BMW S 1000 XR",
    "tagline": "Deportividad de cuatro cilindros con confort de touring.",
    "category": "Sport",
    "msrpMxn": 455000,
    "engineCapacityCc": 999,
    "powerHp": 170,
    "torqueNm": 114,
    "seatHeightMm": 840,
    "unladenWeightKg": 227,
    "topSpeedKmh": 255,
    "fuelEfficiencyKml": 16.1,
    "description": "La perfecta fusión entre la aceleración de una superbike y la comodidad ergónomica para viajes a alta velocidad.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473281/motorrax/models/s1000xr/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473278/motorrax/models/s1000xr/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473279/motorrax/models/s1000xr/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473279/motorrax/models/s1000xr/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473280/motorrax/models/s1000xr/gallery-4.jpg"
    ],
    "pros": [
      "170 HP sin vibraciones a alto ritmo",
      "Suspensión Dynamic ESA de serie",
      "Asiento de nuevo contorno ergonómico"
    ],
    "cons": [
      "Consumo a ritmo de autopista"
    ],
    "colors": [
      {
        "name": "Gravity Blue Metallic",
        "hex": "#002B49"
      },
      {
        "name": "Blackstorm Metallic",
        "hex": "#111111"
      }
    ],
    "accessories": [
      {
        "name": "Parabrisas touring alto",
        "priceMxn": 5800
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "999 cc 4 cilindros"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "170 HP a 11,000 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "227 kg"
      }
    ]
  },
  {
    "slug": "s1000rr",
    "name": "BMW S 1000 RR",
    "tagline": "La superbike definitiva para pista y carretera.",
    "category": "Sport",
    "msrpMxn": 468000,
    "engineCapacityCc": 999,
    "powerHp": 210,
    "torqueNm": 113,
    "seatHeightMm": 824,
    "unladenWeightKg": 197,
    "topSpeedKmh": 303,
    "fuelEfficiencyKml": 15.6,
    "description": "210 HP, alerones aerodinámicos de serie y sensor de inclinación Slide Control para dominar tanto el trazado de circuito como la carretera.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473277/motorrax/models/s1000rr/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473277/motorrax/models/s1000rr/hero.jpg"
    ],
    "pros": [
      "210 HP a 13,750 rpm con ShiftCam",
      "Alerones aerodinámicos integrados de serie",
      "Brake Slide Assist para Pista"
    ],
    "cons": [
      "Posición exigente para uso urbano largo"
    ],
    "colors": [
      {
        "name": "Lightwhite Uni M",
        "hex": "#FFFFFF"
      },
      {
        "name": "Blackstorm Metallic",
        "hex": "#111111"
      }
    ],
    "accessories": [
      {
        "name": "Escape M Akrapovič de titanio",
        "priceMxn": 48000
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "999 cc 4 cilindros ShiftCam"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "210 HP a 13,750 rpm"
      },
      {
        "category": "Prestaciones",
        "key": "Velocidad Máxima",
        "value": "303 km/h"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "197 kg"
      }
    ]
  },
  {
    "slug": "m1000r",
    "name": "BMW M 1000 R",
    "tagline": "La Hyper-Naked M de 210 HP sin concesiones.",
    "category": "M",
    "msrpMxn": 545000,
    "engineCapacityCc": 999,
    "powerHp": 210,
    "torqueNm": 113,
    "seatHeightMm": 830,
    "unladenWeightKg": 199,
    "topSpeedKmh": 280,
    "fuelEfficiencyKml": 15.6,
    "description": "El segundo modelo M de BMW Motorrad. 210 HP desprotegidos contra el viento, alerones M winglets y la máxima tecnología de competición.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473241/motorrax/models/m1000r/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473238/motorrax/models/m1000r/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473239/motorrax/models/m1000r/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473239/motorrax/models/m1000r/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473240/motorrax/models/m1000r/gallery-4.jpg"
    ],
    "pros": [
      "210 HP en una Naked radical",
      "Alerones aerodinámicos M",
      "Frenos de carreras M de titanio"
    ],
    "cons": [
      "Empuje de viento masivo a más de 200 km/h"
    ],
    "colors": [
      {
        "name": "Lightwhite M",
        "hex": "#FFFFFF"
      },
      {
        "name": "Blackstorm Metallic M",
        "hex": "#0D0D0D"
      }
    ],
    "accessories": [
      {
        "name": "Kit de carbono M completo",
        "priceMxn": 62000
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "999 cc 4 cilindros M ShiftCam"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "210 HP a 13,750 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "199 kg"
      }
    ]
  },
  {
    "slug": "m1000xr",
    "name": "BMW M 1000 XR",
    "tagline": "El hiper-crossover de 201 HP para viajes a alta velocidad.",
    "category": "M",
    "msrpMxn": 625000,
    "engineCapacityCc": 999,
    "powerHp": 201,
    "torqueNm": 113,
    "seatHeightMm": 850,
    "unladenWeightKg": 223,
    "topSpeedKmh": 280,
    "fuelEfficiencyKml": 15.3,
    "description": "Combina la postura ergonómica de una touring alta con el motor M de cuatro cilindros en línea y alerones M-winglets.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473248/motorrax/models/m1000xr/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473245/motorrax/models/m1000xr/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473246/motorrax/models/m1000xr/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473247/motorrax/models/m1000xr/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473247/motorrax/models/m1000xr/gallery-4.jpg"
    ],
    "pros": [
      "201 HP en postura ergonómica",
      "Alerones aerodinámicos M",
      "Frenos M de titanio"
    ],
    "cons": [
      "Orientación puramente asfáltica de alto rendimiento"
    ],
    "colors": [
      {
        "name": "M Motorsport Lightwhite",
        "hex": "#FFFFFF"
      },
      {
        "name": "Blackstorm Metallic M",
        "hex": "#0D0D0D"
      }
    ],
    "accessories": [
      {
        "name": "Rines de fibra de carbono M",
        "priceMxn": 85000
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "999 cc 4 cilindros M"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "201 HP a 12,750 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "223 kg"
      }
    ]
  },
  {
    "slug": "m1000rr",
    "name": "BMW M 1000 RR",
    "tagline": "Homologada para WorldSBK. Rendimiento de circuito puro.",
    "category": "M",
    "msrpMxn": 885000,
    "engineCapacityCc": 999,
    "powerHp": 212,
    "torqueNm": 113,
    "seatHeightMm": 832,
    "unladenWeightKg": 193,
    "topSpeedKmh": 314,
    "fuelEfficiencyKml": 15,
    "description": "La superbike de homologación WorldSBK con rines M Carbon, carenado aerodinámico M 2.0 y bielas de titanio Pankl.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473244/motorrax/models/m1000rr/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473242/motorrax/models/m1000rr/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473242/motorrax/models/m1000rr/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473243/motorrax/models/m1000rr/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473244/motorrax/models/m1000rr/gallery-4.jpg"
    ],
    "pros": [
      "Componentes de Campeonato Mundial Superbike",
      "Alerones M 2.0 que generan 22.6 kg de carga a 300 km/h",
      "Rines de carbono M"
    ],
    "cons": [
      "Uso puramente enfocado en coleccionistas y Pista"
    ],
    "colors": [
      {
        "name": "M Competition Lightwhite",
        "hex": "#FFFFFF"
      }
    ],
    "accessories": [
      {
        "name": "Paquete M Competition completo",
        "priceMxn": 120000
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "999 cc M de carreras"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "212 HP a 14,500 rpm"
      },
      {
        "category": "Prestaciones",
        "key": "Velocidad Máxima",
        "value": "314 km/h"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "193 kg"
      }
    ]
  },
  {
    "slug": "r12",
    "name": "BMW R 12",
    "tagline": "La Cruiser purista de motor Boxer 1,170 cc.",
    "category": "Heritage",
    "msrpMxn": 345000,
    "engineCapacityCc": 1170,
    "powerHp": 95,
    "torqueNm": 110,
    "seatHeightMm": 754,
    "unladenWeightKg": 227,
    "topSpeedKmh": 203,
    "fuelEfficiencyKml": 19.6,
    "description": "Geometría de conducción baja estilo cruiser relajado. Motor Boxer enfriado por aire/aceite con chasis tubular de una pieza.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473252/motorrax/models/r12/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473249/motorrax/models/r12/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473250/motorrax/models/r12/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473250/motorrax/models/r12/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473251/motorrax/models/r12/gallery-4.jpg"
    ],
    "pros": [
      "Asiento bajo accesible de 754 mm",
      "Entrega de torque suave y profunda",
      "Estilo Cruiser relajado"
    ],
    "cons": [
      "Menor altura libre al suelo en inclinaciones extremas"
    ],
    "colors": [
      {
        "name": "Blackstorm Metallic",
        "hex": "#111111"
      },
      {
        "name": "Avus Silver Metallic",
        "hex": "#8A9197"
      }
    ],
    "accessories": [
      {
        "name": "Alforjas laterales de piel",
        "priceMxn": 16500
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "1,170 cc Boxer"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "95 HP a 6,500 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "227 kg"
      }
    ]
  },
  {
    "slug": "r12ninet",
    "name": "BMW R 12 nineT",
    "tagline": "El roadster icónico purista de acabado artesanal.",
    "category": "Heritage",
    "msrpMxn": 372000,
    "engineCapacityCc": 1170,
    "powerHp": 109,
    "torqueNm": 115,
    "seatHeightMm": 795,
    "unladenWeightKg": 220,
    "topSpeedKmh": 215,
    "fuelEfficiencyKml": 19.6,
    "description": "Tanque de aluminio pulido a mano, subchasis modular y doble tubo de escape de acero inoxidable con el sonido inconfundible del Boxer aire/aceite.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473259/motorrax/models/r12ninet/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473256/motorrax/models/r12ninet/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473257/motorrax/models/r12ninet/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473257/motorrax/models/r12ninet/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473258/motorrax/models/r12ninet/gallery-4.jpg"
    ],
    "pros": [
      "Acabados premium artesanales en aluminio",
      "Posición roadster purista",
      "Gran capacidad de personalización"
    ],
    "cons": [
      "Sin protección aerodinámica"
    ],
    "colors": [
      {
        "name": "Blackstorm Metallic",
        "hex": "#111111"
      },
      {
        "name": "Option 719 San Remo Green",
        "hex": "#1B3B2B"
      }
    ],
    "accessories": [
      {
        "name": "Escape Akrapovič doble de titanio",
        "priceMxn": 22000
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "1,170 cc Boxer"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "109 HP a 7,250 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "220 kg"
      }
    ]
  },
  {
    "slug": "r12gs",
    "name": "BMW R 12 G/S",
    "tagline": "Herencia Dakar legendaria con capacidad todoterreno moderna.",
    "category": "Heritage",
    "msrpMxn": 395000,
    "engineCapacityCc": 1170,
    "powerHp": 109,
    "torqueNm": 115,
    "seatHeightMm": 820,
    "unladenWeightKg": 227,
    "topSpeedKmh": 200,
    "fuelEfficiencyKml": 19.6,
    "description": "El espíritu retro del Dakar en formato scrambler/enduro con modos de manejo Dirt/Road y motor Boxer enfriado por aire.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473649/motorrax/models/r12gs/jowgfs3xettkuenmhxtl.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473735/motorrax/models/r12gs/ockzidqwp0xcfant39ok.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473736/motorrax/models/r12gs/iia0m3oyqmro2buoqhg8.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473737/motorrax/models/r12gs/xgo9uvkwm0lz18o45vpk.jpg"
    ],
    "pros": [
      "Estilo retro Dakar inconfundible",
      "Torque suave desde bajas revoluciones",
      "Geometría scrambler polivalente"
    ],
    "cons": [
      "Menor capacidad de carga que la R1300GS"
    ],
    "colors": [
      {
        "name": "Classic Dakar White",
        "hex": "#F5F5F5"
      },
      {
        "name": "Avus Black",
        "hex": "#1A1A1A"
      }
    ],
    "accessories": [
      {
        "name": "Rejilla protectora de faro estilo rallye",
        "priceMxn": 3800
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "1,170 cc Boxer Aire/Aceite"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "109 HP a 7,250 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "227 kg"
      }
    ]
  },
  {
    "slug": "r18classic",
    "name": "BMW R 18 Classic",
    "tagline": "El Big Boxer de 1,802 cc para devorar el continente.",
    "category": "Heritage",
    "msrpMxn": 428000,
    "engineCapacityCc": 1802,
    "powerHp": 91,
    "torqueNm": 158,
    "seatHeightMm": 710,
    "unladenWeightKg": 365,
    "topSpeedKmh": 180,
    "fuelEfficiencyKml": 17.8,
    "description": "El motor Boxer con la mayor cilindrada fabricado por BMW. Equipado con parabrisas desmontable, alforjas de piel y eje cardán al descubierto.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473270/motorrax/models/r18classic/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473268/motorrax/models/r18classic/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473268/motorrax/models/r18classic/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473269/motorrax/models/r18classic/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473269/motorrax/models/r18classic/gallery-4.jpg"
    ],
    "pros": [
      "158 Nm de par motor a solo 3,000 rpm",
      "Diseño inspirado en la icónica R 5 de 1936",
      "Marcha atrás eléctrica opcional"
    ],
    "cons": [
      "Peso de 365 kg"
    ],
    "colors": [
      {
        "name": "Blackstorm Metallic con líneas dobles",
        "hex": "#0A0A0A"
      }
    ],
    "accessories": [
      {
        "name": "Sistema de escape Vance & Hines",
        "priceMxn": 34000
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "1,802 cc Big Boxer"
      },
      {
        "category": "Motor",
        "key": "Par Motor",
        "value": "158 Nm a 3,000 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "365 kg"
      }
    ]
  },
  {
    "slug": "r18roctane",
    "name": "BMW R 18 Roctane",
    "tagline": "Bagger custom oscura con actitud indomable.",
    "category": "Heritage",
    "msrpMxn": 445000,
    "engineCapacityCc": 1802,
    "powerHp": 91,
    "torqueNm": 158,
    "seatHeightMm": 720,
    "unladenWeightKg": 374,
    "topSpeedKmh": 180,
    "fuelEfficiencyKml": 17.8,
    "description": "Rueda delantera de 21 pulgadas, maletas rígidas en color de la carrocería y acabado totalmente oscurecido en negro mate.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473273/motorrax/models/r18roctane/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473271/motorrax/models/r18roctane/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473271/motorrax/models/r18roctane/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473272/motorrax/models/r18roctane/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473273/motorrax/models/r18roctane/gallery-4.jpg"
    ],
    "pros": [
      "Rueda delantera de 21 pulgadas imponente",
      "Maletas rígidas tipo Bagger",
      "Acabado oscuro exclusivo"
    ],
    "cons": [
      "Maniobrabilidad en lugares estrechos"
    ],
    "colors": [
      {
        "name": "Mineral Grey Metallic",
        "hex": "#3B3D40"
      },
      {
        "name": "Manhattan Metallic Matte",
        "hex": "#424744"
      }
    ],
    "accessories": [
      {
        "name": "Manillar Ape Hanger M",
        "priceMxn": 12500
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "1,802 cc Big Boxer"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "374 kg"
      }
    ]
  },
  {
    "slug": "k1600gt",
    "name": "BMW K 1600 GT",
    "tagline": "El dinamismo supremo de 6 cilindros en línea.",
    "category": "Tour",
    "msrpMxn": 645000,
    "engineCapacityCc": 1649,
    "powerHp": 160,
    "torqueNm": 180,
    "seatHeightMm": 810,
    "unladenWeightKg": 343,
    "topSpeedKmh": 200,
    "fuelEfficiencyKml": 16.9,
    "description": "El mítico motor de 6 cilindros en línea entrega 160 HP y 180 Nm con una suavidad absoluta. Pantalla de 10.25 pulgadas con navegación integrada.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473233/motorrax/models/k1600gt/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473230/motorrax/models/k1600gt/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473231/motorrax/models/k1600gt/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473231/motorrax/models/k1600gt/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473232/motorrax/models/k1600gt/gallery-4.jpg"
    ],
    "pros": [
      "Suavidad incomparable de 6 cilindros",
      "180 Nm de torque",
      "Faro adaptativo de LED y marcha atrás"
    ],
    "cons": [
      "Peso de 343 kg"
    ],
    "colors": [
      {
        "name": "Blackstorm Metallic",
        "hex": "#111111"
      },
      {
        "name": "Option 719 Havanna",
        "hex": "#3D2E24"
      }
    ],
    "accessories": [
      {
        "name": "Sistema de sonido Marshall Gold Series",
        "priceMxn": 28000
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Tipo de motor",
        "value": "6 cilindros en línea de 4 tiempos enfriado por agua"
      },
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "1,649 cc"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "160 HP a 6,750 rpm"
      },
      {
        "category": "Motor",
        "key": "Par Motor",
        "value": "180 Nm a 5,250 rpm"
      },
      {
        "category": "Prestaciones",
        "key": "Velocidad Máxima",
        "value": "200 km/h"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "343 kg"
      }
    ]
  },
  {
    "slug": "k1600gtl",
    "name": "BMW K 1600 GTL",
    "tagline": "El lujo absoluto para viajes en pareja de primera clase.",
    "category": "Tour",
    "msrpMxn": 695000,
    "engineCapacityCc": 1649,
    "powerHp": 160,
    "torqueNm": 180,
    "seatHeightMm": 750,
    "unladenWeightKg": 358,
    "topSpeedKmh": 200,
    "fuelEfficiencyKml": 16.9,
    "description": "Touring de ultra lujo con respaldo para copiloto, top case integrado, suspensión electrónica Dynamic ESA y sistema de sonido Marshall.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473237/motorrax/models/k1600gtl/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473234/motorrax/models/k1600gtl/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473235/motorrax/models/k1600gtl/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473235/motorrax/models/k1600gtl/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473236/motorrax/models/k1600gtl/gallery-4.jpg"
    ],
    "pros": [
      "Máximo confort de copiloto con top case y respaldo",
      "Asiento ultra accesible de 750 mm",
      "Marcha atrás eléctrica"
    ],
    "cons": [
      "Dimensiones grandes para garajes estrechos"
    ],
    "colors": [
      {
        "name": "Manhattan Metallic",
        "hex": "#4A4E51"
      },
      {
        "name": "Option 719 Meteoric Dust II",
        "hex": "#22252A"
      }
    ],
    "accessories": [
      {
        "name": "Faros auxiliares LED",
        "priceMxn": 16500
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "1,649 cc 6 cilindros"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "160 HP a 6,750 rpm"
      },
      {
        "category": "Motor",
        "key": "Par Motor",
        "value": "180 Nm a 5,250 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "358 kg"
      }
    ]
  },
  {
    "slug": "r1250rt",
    "name": "BMW R 1250 RT",
    "tagline": "La touring ejecutiva Boxer con radar de crucero ACC.",
    "category": "Tour",
    "msrpMxn": 525000,
    "engineCapacityCc": 1254,
    "powerHp": 136,
    "torqueNm": 143,
    "seatHeightMm": 805,
    "unladenWeightKg": 279,
    "topSpeedKmh": 225,
    "fuelEfficiencyKml": 20.8,
    "description": "Protección aerodinámica perfecta, pantalla de 10.25 pulgadas y motor ShiftCam 1,254 cc para devorar autopistas.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473255/motorrax/models/r1250rt/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473252/motorrax/models/r1250rt/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473253/motorrax/models/r1250rt/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473254/motorrax/models/r1250rt/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473255/motorrax/models/r1250rt/gallery-4.jpg"
    ],
    "pros": [
      "Protección de viento total",
      "Radar de crucero adaptativo ACC",
      "Navegación en mapa completo TFT"
    ],
    "cons": [
      "Próxima renovación por R 1300 RT"
    ],
    "colors": [
      {
        "name": "Alpine White Uni",
        "hex": "#FFFFFF"
      },
      {
        "name": "Triple Black",
        "hex": "#1A1A1A"
      }
    ],
    "accessories": [
      {
        "name": "Sistema de audio integrado",
        "priceMxn": 24000
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "1,254 cc Boxer ShiftCam"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "136 HP a 7,750 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "279 kg"
      }
    ]
  },
  {
    "slug": "r1300rt",
    "name": "BMW R 1300 RT",
    "tagline": "El estándar de próxima generación en viajes ejecutivos.",
    "category": "Tour",
    "msrpMxn": 589000,
    "engineCapacityCc": 1300,
    "powerHp": 145,
    "torqueNm": 149,
    "seatHeightMm": 820,
    "unladenWeightKg": 268,
    "topSpeedKmh": 230,
    "fuelEfficiencyKml": 20.8,
    "description": "Con 145 HP, suspensión DSA inteligente y radar de crucero ACC de última generación para viajes de primera clase.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473267/motorrax/models/r1300rt/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473267/motorrax/models/r1300rt/hero.jpg"
    ],
    "pros": [
      "145 HP con suspensión DSA",
      "Reducción de peso respecto a R 1250 RT",
      "Radar de crucero activo"
    ],
    "cons": [
      "Precio en versiones Option 719"
    ],
    "colors": [
      {
        "name": "Alpine White Uni",
        "hex": "#FFFFFF"
      },
      {
        "name": "Option 719 Meteoric Dust",
        "hex": "#3A3D40"
      }
    ],
    "accessories": [
      {
        "name": "Top Case con luz de freno integrada",
        "priceMxn": 35000
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "1,300 cc Boxer"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "145 HP a 7,750 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "268 kg"
      }
    ]
  },
  {
    "slug": "c400x",
    "name": "BMW C 400 X",
    "tagline": "El maxi-scooter urbano ágil y tecnológico.",
    "category": "Urban Mobility",
    "msrpMxn": 185000,
    "engineCapacityCc": 350,
    "powerHp": 34,
    "torqueNm": 35,
    "seatHeightMm": 775,
    "unladenWeightKg": 206,
    "topSpeedKmh": 139,
    "fuelEfficiencyKml": 28.5,
    "description": "Maxi-scooter diseñado para esquivar el tráfico urbano con sistema de almacenamiento Flexcase expandible y conectividad TFT.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473196/motorrax/models/c400x/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473193/motorrax/models/c400x/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473194/motorrax/models/c400x/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473195/motorrax/models/c400x/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473195/motorrax/models/c400x/gallery-4.jpg"
    ],
    "pros": [
      "Sistema Flexcase para guardar casco",
      "Frenos de disco doble con ABS Pro",
      "Excelente consumo urbano"
    ],
    "cons": [
      "Espacio de almacenamiento restringido en marcha"
    ],
    "colors": [
      {
        "name": "Alpine White",
        "hex": "#FFFFFF"
      },
      {
        "name": "Callisto Grey Metallic",
        "hex": "#52575C"
      }
    ],
    "accessories": [
      {
        "name": "Topcase 30L",
        "priceMxn": 7200
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "350 cc Monocilíndrico"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "34 HP a 7,500 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "206 kg"
      }
    ]
  },
  {
    "slug": "c400gt",
    "name": "BMW C 400 GT",
    "tagline": "El maxi-scooter Gran Turismo para la ciudad y periferia.",
    "category": "Urban Mobility",
    "msrpMxn": 205000,
    "engineCapacityCc": 350,
    "powerHp": 34,
    "torqueNm": 35,
    "seatHeightMm": 775,
    "unladenWeightKg": 214,
    "topSpeedKmh": 139,
    "fuelEfficiencyKml": 28.5,
    "description": "Versión Gran Turismo con mayor protección aerodinámica, asiento confort con respaldo lumbar e iluminación full LED.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473193/motorrax/models/c400gt/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473190/motorrax/models/c400gt/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473190/motorrax/models/c400gt/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473191/motorrax/models/c400gt/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473192/motorrax/models/c400gt/gallery-4.jpg"
    ],
    "pros": [
      "Mayor protección contra viento",
      "Asiento confort con apoyo lumbar",
      "Conectividad total"
    ],
    "cons": [
      "Velocidad máxima urbana (139 km/h)"
    ],
    "colors": [
      {
        "name": "Blackstorm Metallic",
        "hex": "#111111"
      },
      {
        "name": "Callisto Grey Metallic",
        "hex": "#52575C"
      }
    ],
    "accessories": [
      {
        "name": "Parabrisas alto confort",
        "priceMxn": 4800
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Cilindrada",
        "value": "350 cc"
      },
      {
        "category": "Motor",
        "key": "Potencia",
        "value": "34 HP a 7,500 rpm"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "214 kg"
      }
    ]
  },
  {
    "slug": "ce04",
    "name": "BMW CE 04",
    "tagline": "La revolución de la movilidad urbana 100% eléctrica.",
    "category": "Urban Mobility",
    "msrpMxn": 325000,
    "engineCapacityCc": 0,
    "powerHp": 42,
    "torqueNm": 62,
    "seatHeightMm": 780,
    "unladenWeightKg": 231,
    "topSpeedKmh": 120,
    "fuelEfficiencyKml": 0,
    "description": "Diseño futurista, motor eléctrico de 42 HP y torque instantáneo de 62 Nm con autonomía de 130 km e ideología cero emisiones.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473203/motorrax/models/ce04/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473200/motorrax/models/ce04/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473201/motorrax/models/ce04/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473202/motorrax/models/ce04/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473202/motorrax/models/ce04/gallery-4.jpg"
    ],
    "pros": [
      "Torque eléctrico instantáneo de 62 Nm",
      "Diseño futurista vanguardista",
      "Carga rápida en tomacorriente doméstico"
    ],
    "cons": [
      "Autonomía de 130 km enfocado en ciudad"
    ],
    "colors": [
      {
        "name": "Lightwhite Uni",
        "hex": "#FFFFFF"
      },
      {
        "name": "Imperial Blue Metallic",
        "hex": "#002366"
      }
    ],
    "accessories": [
      {
        "name": "Cargador rápido BMW i Wallbox",
        "priceMxn": 18500
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Tipo de Motor",
        "value": "Motor eléctrico síncrono enfriado por líquido"
      },
      {
        "category": "Motor",
        "key": "Potencia Máxima",
        "value": "42 HP a 4,900 rpm"
      },
      {
        "category": "Motor",
        "key": "Par Motor",
        "value": "62 Nm a 1,500 rpm"
      },
      {
        "category": "Prestaciones",
        "key": "Autonomía según WMTC",
        "value": "130 km"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "231 kg"
      }
    ]
  },
  {
    "slug": "ce02",
    "name": "BMW CE 02",
    "tagline": "El eParkourer eléctrico para la nueva generación urbana.",
    "category": "Urban Mobility",
    "msrpMxn": 175000,
    "engineCapacityCc": 0,
    "powerHp": 15,
    "torqueNm": 55,
    "seatHeightMm": 750,
    "unladenWeightKg": 132,
    "topSpeedKmh": 95,
    "fuelEfficiencyKml": 0,
    "description": "Ni scooter ni moto: un eParkourer divertido, ultraligero (132 kg) y maniobrable para jóvenes urbanos sin emisiones.",
    "heroImage": "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473200/motorrax/models/ce02/hero.jpg",
    "galleryImages": [
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473197/motorrax/models/ce02/gallery-1.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473197/motorrax/models/ce02/gallery-2.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473198/motorrax/models/ce02/gallery-3.jpg",
      "https://res.cloudinary.com/dcy26pw70/image/upload/v1785473199/motorrax/models/ce02/gallery-4.jpg"
    ],
    "pros": [
      "Peso ultraligero de 132 kg",
      "Torque instantáneo de 55 Nm",
      "Manejo extremadamente divertido"
    ],
    "cons": [
      "Velocidad máxima de 95 km/h"
    ],
    "colors": [
      {
        "name": "Cosmic Black 2 / Granite Grey",
        "hex": "#1C1D1F"
      }
    ],
    "accessories": [
      {
        "name": "Bolsas de transporte laterales",
        "priceMxn": 6200
      }
    ],
    "specs": [
      {
        "category": "Motor",
        "key": "Potencia Máxima",
        "value": "15 HP"
      },
      {
        "category": "Motor",
        "key": "Par Motor",
        "value": "55 Nm"
      },
      {
        "category": "Prestaciones",
        "key": "Autonomía",
        "value": "90 km"
      },
      {
        "category": "Dimensiones",
        "key": "Peso en orden de marcha",
        "value": "132 kg"
      }
    ]
  }
];
