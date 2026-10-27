// Inicio. Fuentes: Manual de Marca 2023 (saludo, misión), fichas técnicas de septiembre de 2026
// (productos) y las respuestas de Sirius sobre su origen.

export const hero = {
  greeting: "¡Buenos días en alegría!",
  // El titular se arma en la página para poner "regenera" en la cursiva de marca
  text: "Bioinsumos y biochar para devolverle la vida al suelo. Desde Barranca de Upía, Meta.",
  // Video en bucle dentro del arco; el poster es su primer fotograma, para que no salte al arrancar
  video: "/video/web/biochar-en-mano.mp4",
  poster: "/video/web/biochar-en-mano.webp",
  imageAlt: "Mano sosteniendo biochar sobre un cultivo",
  facts: ["7 productos con ficha técnica", "Sirius Char con Registro ICA 14623", "Acompañamiento agronómico en campo"],
  product: {
    name: "Biochar Blend",
    text: "Biochar, compost enriquecido y un consorcio bacteriano vivo",
    image: "/img/productos/biochar-blend.webp",
    href: "/productos#biochar-blend",
  },
};

// Cinta de palabras bajo el hero
export const ticker = ["Biochar", "Bioinsumos", "Pirólisis controlada", "Cascarilla de palma", "Fermentación", "Acompañamiento en campo"];

export const bento = {
  biochar: {
    title: "Biochar Blend",
    text: "Biochar de pirólisis controlada y compost enriquecido, inoculados en biofábrica con un consorcio bacteriano vivo. Acondicionador orgánico para la siembra de palma.",
    image: "/img/productos/biochar-blend.webp",
    href: "/productos#biochar-blend",
  },
  biologicos: {
    title: "Bioinsumos",
    text: "Sirius Bacter, Trichoderma harzianum, Beauveria bassiana y Metarhizium anisopliae: bacterias y hongos en suspensión concentrada, cada uno con su ficha técnica.",
    image: "/img/productos/sirius-bacter.webp",
    href: "/productos#bioinsumos",
  },
  siriusChar: {
    title: "Sirius Char",
    text: "Acondicionador inorgánico de cascarilla de palma de aceite, con Registro de Venta ICA N.º 14623.",
    image: "/img/procesos/biochar-salida.webp",
    href: "/productos#sirius-char",
  },
  acompanamiento: {
    title: "Acompañamiento en campo",
    text: "Acompañamiento agronómico con agendamiento previo. La dosis de los acondicionadores se define con el análisis de suelo.",
    href: "/contacto",
  },
};

// Ventana en arco bajo el hero: la frase del Manual de Marca (p. 6) partida a los dos lados del arco
export const ventana = {
  left: "Sirius es",
  right: "regeneración",
  video: "/video/web/biochar-flor.mp4",
  poster: "/video/web/biochar-flor.webp",
};

// Galería horizontal: solo fotos propias del campo, la biofábrica y el laboratorio. Los pies dicen
// lo que se ve, no prometen resultados.
export const galeria = [
  { image: "/img/campo/mano-biochar.webp", alt: "Mano sosteniendo biochar sobre plantas jóvenes", caption: "Biochar en la mano" },
  { image: "/img/campo/aplicacion.webp", alt: "Persona aplicando un producto Sirius al suelo", caption: "Aplicación en campo" },
  { image: "/img/procesos/plantulas.webp", alt: "Plántulas en hileras sobre suelo oscuro", caption: "Plántulas" },
  { image: "/img/laboratorio/petri.webp", alt: "Colonias de microorganismos en una caja de Petri", caption: "Laboratorio" },
  { image: "/img/campo/palma-aerea.webp", alt: "Vista aérea de un cultivo de palma", caption: "Cultivo de palma" },
  { image: "/img/procesos/app-campo.webp", alt: "Persona consultando datos en un celular", caption: "Registro de datos" },
  { image: "/img/campo/aerea.webp", alt: "Vista aérea de un sendero entre cultivos", caption: "Desde el aire" },
];

// Origen: lo que Sirius contó sobre por qué nació y lo que las fichas dicen de sus procesos
export const origen = {
  title: "Nacimos para darle un nuevo uso a los residuos de la palma",
  text: "Sirius nació para aprovechar los residuos agrícolas de la palma y para contrarrestar los efectos negativos del cambio climático.",
  puntos: [
    { title: "Materia prima", text: "Cascarilla de palma de aceite, un residuo agroindustrial." },
    { title: "Pirólisis controlada", text: "La transforma en biochar: la base de Sirius Char y Sirius Char (F)." },
    { title: "Fermentación", text: "De materias primas naturales salen nuestros bioinsumos vivos." },
  ],
};

// Manual de Marca 2023, p. 6
export const homeQuote = {
  text: "Let's get Sirius! Sirius es regeneración",
  source: "Manual de Marca Sirius",
  mission:
    "Nuestra misión es ser una guía que brinda las herramientas para llevar el campo hacia la regeneración del suelo, de la biodiversidad y de los seres.",
};
