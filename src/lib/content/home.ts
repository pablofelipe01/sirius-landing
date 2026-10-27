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
    // Polvo que cae sobre los frascos de biológicos; el poster es su primer fotograma
    video: "/video/web/biologicos-polvo.mp4",
    poster: "/video/web/biologicos-polvo.webp",
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

// Galería horizontal: solo fotos y clips propios del campo, la biofábrica y el laboratorio. Los pies
// van en la voz de la marca (cálida, alegre) y no prometen resultados; lo que se ve está en `alt`. Los clips salen del video de marca (public/video1.mp4)
// y de los videos de producto, recortados en public/video/web.
export const galeria = [
  { image: "/img/campo/mano-biochar.webp", alt: "Mano sosteniendo biochar sobre plantas jóvenes", caption: "La tierra en buenas manos" },
  { image: "/video/web/hormigas.webp", video: "/video/web/hormigas.mp4", alt: "Hormigas arrieras cargando un pedazo de hoja", caption: "Trabajo en equipo" },
  { image: "/img/campo/aplicacion.webp", alt: "Persona aplicando un producto Sirius al suelo", caption: "Manos a la tierra" },
  { image: "/img/fotos/textura-hongo.webp", alt: "Colonia de hongo en anillos sobre un medio de cultivo", caption: "Pequeños gigantes" },
  { image: "/video/web/capibara.webp", video: "/video/web/capibara.mp4", alt: "Chigüiro en el agua junto a una garza", caption: "Vecinos del agua" },
  { image: "/img/procesos/plantulas.webp", alt: "Plántulas en hileras sobre suelo oscuro", caption: "Todo empieza pequeño" },
  { image: "/img/laboratorio/petri.webp", alt: "Colonias de microorganismos en una caja de Petri", caption: "Ciencia viva" },
  { image: "/img/laboratorio/microscopia.webp", alt: "Imagen ampliada en blanco y negro de una superficie porosa", caption: "El mundo en miniatura" },
  { image: "/img/procesos/biochar-granulado.webp", alt: "Gránulos oscuros de biochar en primer plano", caption: "Nacido del fuego" },
  { image: "/img/campo/palma-aerea.webp", alt: "Vista aérea de un cultivo de palma", caption: "La palma, desde arriba" },
  { image: "/video/web/milpies.webp", video: "/video/web/milpies.mp4", alt: "Milpiés caminando sobre la hojarasca", caption: "Obreros del suelo" },
  { image: "/img/fotos/textura-hoja.webp", alt: "Nervaduras rojas y verdes de una hoja vistas de cerca", caption: "Cada nervadura cuenta" },
  { image: "/img/procesos/app-campo.webp", alt: "Persona consultando datos en un celular", caption: "Datos con los pies en la tierra" },
  { image: "/img/campo/aerea.webp", alt: "Vista aérea de un sendero entre cultivos", caption: "Caminos que se abren" },
  { image: "/img/campo/atardecer.webp", alt: "Sol entre nubes al atardecer", caption: "Hasta mañana, en alegría" },
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
