// Inicio. Fuentes: Manual de Marca 2023 (saludo, misión), fichas técnicas de septiembre de 2026
// (productos) y las respuestas de Sirius sobre su origen.

export const hero = {
  greeting: "¡Buenos días en alegría!",
  // El titular se arma en la página para poner "regenera" en la cursiva de marca
  text: "Bioinsumos y biochar para devolverle la vida al suelo. Desde Barranca de Upía, Meta.",
  // Foto fija (no fotograma de video): el arco del hero la muestra grande y debe verse nítida
  image: "/img/productos/biochar-en-mano.webp",
  imageAlt: "Mano sosteniendo material negro sobre un cultivo",
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
