// Inicio. Textos del sitio anterior de Sirius y del Manual de Marca 2023.

export const hero = {
  greeting: "¡Buenos días en alegría!",
  // El titular se arma en la página para poner "regenera" en la serif de marca
  text: "Sirius es más que una marca: es un movimiento vivo que une el alma humana con la tierra. Biochar y biológicos hechos en Barranca de Upía.",
  // Foto fija (no fotograma de video): el arco del hero la muestra grande y debe verse nítida
  image: "/img/productos/biochar-en-mano.webp",
  imageAlt: "Mano sosteniendo biochar sobre un cultivo",
  facts: ["Desde 2018", "Biofábrica propia", "Laboratorio propio"],
  product: {
    name: "Biochar Blend",
    text: "Biochar, compost y microorganismos benéficos",
    image: "/img/productos/biochar-blend.webp",
    href: "/productos#biochar-blend",
  },
};

// Cinta de palabras bajo el hero
export const ticker = ["Biochar", "Biológicos", "Pirólisis", "Laboratorio de suelos", "Formulación a la medida", "Carbono vital"];

export const bento = {
  biochar: {
    title: "Biochar Blend",
    text: "Biochar de alta calidad producido en nuestra biofábrica: mejora la estructura del suelo, retiene agua y activa la vida microbiana.",
    image: "/img/productos/biochar-blend.webp",
    href: "/productos#biochar-blend",
  },
  biologicos: {
    title: "Biológicos",
    text: "Sirius Bacter y control preventivo de plagas: microorganismos que fortalecen las raíces y protegen los cultivos cuidando la biodiversidad.",
    image: "/img/productos/sirius-bacter.webp",
    href: "/productos#sirius-bacter",
  },
  laboratorio: {
    title: "Laboratorio de suelos",
    text: "Medimos la calidad de cada lote y las poblaciones microbianas en el suelo de nuestros clientes.",
    image: "/img/laboratorio/petri.webp",
    href: "/biofabrica#biotecnologia",
  },
  carbono: {
    title: "Calcula tu huella de carbono",
    text: "Y descubre cómo el biochar captura carbono a largo plazo mientras mejora tus suelos.",
    href: "/calculadora",
  },
};

// Los hitos que se muestran en el inicio; la historia completa está en /somos-sirius
export const homeMilestones = [
  { year: "2018", text: "Encendimos la primera planta de pirólisis." },
  { year: "2020", text: "Llegó el equipo de microbiología." },
  { year: "2022", text: "Construimos Rafaela, nuestro reactor propio." },
  { year: "2024", text: "Abrimos nuestro laboratorio de suelos." },
];

export const homeQuote = {
  text: "Tu alma regenera la tierra. La tierra regenera tu alma.",
  source: "Filosofía Sirius",
  mission:
    "Nuestra misión es ser una guía que brinda las herramientas para llevar el campo hacia la regeneración del suelo, de la biodiversidad y de los seres.",
};
