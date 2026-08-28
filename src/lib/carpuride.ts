export const CARPURIDE_HOME = "https://carpuride.com/?ref=motorrax";
export const CARPURIDE_COLLECTION =
  "https://carpuride.com/collections/bs-motorcycle-series?ref=motorrax";
export const CARPURIDE_502_702 =
  "https://carpuride.com/collections/bs-motorcycle-series/products/carpuride-w702bs-motorcycle-stereo?ref=motorrax";
export const CARPURIDE_602 =
  "https://carpuride.com/collections/bs-motorcycle-series/products/carpuride-w602bs-motorcycle-stereo?ref=motorrax";

export const carpurideModels = [
  {
    name: "Carpuride W502BS",
    shortName: "W502BS",
    screen: '5"',
    bestFor: "Cockpits compactos y vista despejada",
    productUrl: CARPURIDE_502_702,
  },
  {
    name: "Carpuride W602BS",
    shortName: "W602BS",
    screen: '6"',
    bestFor: "El mejor equilibrio entre lectura y tamaño",
    productUrl: CARPURIDE_602,
  },
  {
    name: "Carpuride W702BS",
    shortName: "W702BS",
    screen: '7"',
    bestFor: "Máxima visibilidad en touring y adventure",
    productUrl: CARPURIDE_502_702,
  },
] as const;

export const commonFeatures = [
  "Apple CarPlay y Android Auto inalámbricos",
  "Control mediante BMW Wonder Wheel / Multi-Controller",
  "Datos de la moto: velocidad, RPM, kilometraje y TPMS compatible",
  "Pantalla táctil IPS de 1,000 nits con brillo automático",
  "Protección IP67 y operación de -20 °C a 60 °C",
  "Bluetooth dual 5.0, intercomunicador, brújula y barómetro",
  "Instalación plug-and-play en la base de navegación original BMW",
  "Actualizaciones OTA y soporte para tarjeta de hasta 256 GB",
] as const;

