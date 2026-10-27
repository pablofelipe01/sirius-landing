// Productos. Cada texto sale de la ficha técnica del producto (versiones de septiembre de 2026,
// en public/fichas). Las afirmaciones técnicas se presentan como lo que dice la ficha.

export const productosIntro =
  "Dos líneas para el suelo y el cultivo: bioinsumos en suspensión concentrada y acondicionadores a base de biochar. Cada producto tiene su ficha técnica pública.";

export type Dato = { label: string; value: string };

export type Producto = {
  id: string;
  name: string;
  /** Categoría tal como la rotula la ficha técnica */
  rotulo: string;
  image: string;
  alt: string;
  text: string;
  datos: Dato[];
  cultivos: string;
  ficha: string;
};

export type Linea = {
  id: string;
  name: string;
  intro: string;
  productos: Producto[];
};

export const lineas: Linea[] = [
  {
    id: "bioinsumos",
    name: "Bioinsumos",
    intro: "Productos biológicos vivos, obtenidos por fermentación de materias primas naturales. Se despachan en entregas fraccionadas, según el cronograma de aplicación en finca.",
    productos: [
      {
        id: "sirius-bacter",
        name: "Sirius Bacter",
        rotulo: "Inoculante biológico · biofertilizante",
        image: "/img/productos/sirius-bacter-premium.webp",
        alt: "Frascos con líquidos de colores sobre una mesa",
        text: "Consorcio líquido de tres bacterias promotoras del crecimiento vegetal: Azospirillum brasilense, Azotobacter chroococcum y Pseudomonas fluorescens. Según su ficha técnica, aporta fijación biológica de nitrógeno, solubilización de fósforo y producción de auxinas, que estimulan la emisión de raíces secundarias.",
        datos: [
          { label: "Concentración", value: "1×10⁸ UFC/mL (consorcio)" },
          { label: "Presentación", value: "20 litros" },
          { label: "Vida útil", value: "90 días desde fabricación" },
          { label: "Aplicación", value: "Al suelo: drench, riego o aspersión dirigida a la zona radicular" },
        ],
        cultivos: "Palma de aceite, solanáceas, frutales, hortalizas, cereales, pastos y forrajeras",
        ficha: "/fichas/sirius-bacter-ficha-tecnica.pdf",
      },
      {
        id: "trichoderma",
        name: "Trichoderma harzianum",
        rotulo: "Agente microbial para control de enfermedades",
        image: "/img/laboratorio/petri.webp",
        alt: "Colonias de microorganismos en una caja de Petri",
        text: "Bioinsumo formulado a base del hongo antagonista Trichoderma harzianum en suspensión concentrada. Su ficha técnica lo indica para programas de manejo integrado de enfermedades causadas por hongos fitopatógenos habitantes del suelo y para el acondicionamiento biológico de la rizosfera.",
        datos: [
          { label: "Concentración", value: "1×10⁸ conidias viables/mL" },
          { label: "Presentación", value: "20 litros" },
          { label: "Vida útil", value: "90 días desde fabricación" },
          { label: "Aplicación", value: "Al suelo: drench, riego o tratamiento de semilla" },
        ],
        cultivos: "Palma de aceite, plátano y banano, aguacate, cítricos, café, arroz, papa, tomate y hortalizas, flores y follajes, forestales y viveros, forrajeras",
        ficha: "/fichas/trichoderma-harzianum-ficha-tecnica.pdf",
      },
      {
        id: "beauveria",
        name: "Beauveria bassiana",
        rotulo: "Agente microbial · bioinsecticida de uso agrícola",
        image: "/img/productos/tratamiento.webp",
        alt: "Frascos con líquidos entre tallos de bambú",
        text: "Bioinsumo formulado a base del hongo entomopatógeno Beauveria bassiana en suspensión concentrada. Su ficha técnica lo indica como agente de control biológico de insectos plaga en programas de manejo integrado; en palma de aceite lista a Rhynchophorus palmarum y Strategus aloeus.",
        datos: [
          { label: "Concentración", value: "1×10⁸ conidias viables/mL" },
          { label: "Presentación", value: "20 litros" },
          { label: "Vida útil", value: "90 días desde fabricación" },
          { label: "Aplicación", value: "Foliar o al suelo, según la plaga objetivo" },
        ],
        cultivos: "Palma de aceite, cítricos, café, aguacate, papa, forestales, plátano y banano",
        ficha: "/fichas/beauveria-bassiana-ficha-tecnica.pdf",
      },
      {
        id: "metarhizium",
        name: "Metarhizium anisopliae",
        rotulo: "Agente microbial · bioinsecticida de uso agrícola",
        image: "/img/laboratorio/microscopio.webp",
        alt: "Objetivo de microscopio sobre una muestra",
        text: "Bioinsumo formulado a base del hongo entomopatógeno Metarhizium anisopliae en suspensión concentrada. Su ficha técnica lo indica como agente de control biológico de insectos plaga en programas de manejo integrado; en palma de aceite lista a Strategus aloeus y Rhynchophorus palmarum.",
        datos: [
          { label: "Concentración", value: "1×10⁸ conidias viables/mL" },
          { label: "Presentación", value: "20 litros" },
          { label: "Vida útil", value: "90 días desde fabricación" },
          { label: "Aplicación", value: "Al suelo o foliar" },
        ],
        cultivos: "Palma de aceite, cítricos, café, caña de azúcar, papa y aguacate",
        ficha: "/fichas/metarhizium-anisopliae-ficha-tecnica.pdf",
      },
    ],
  },
  {
    id: "biochar",
    name: "Biochar y acondicionadores",
    intro: "Biochar obtenido por pirólisis controlada de cascarilla de palma de aceite, solo o mezclado con compost enriquecido.",
    productos: [
      {
        id: "biochar-blend",
        name: "Biochar Blend",
        rotulo: "Acondicionador orgánico de suelos",
        image: "/img/productos/biochar-blend.webp",
        alt: "Recipiente con material granulado negro sobre hojas verdes",
        text: "Insumo compuesto por biochar de pirólisis controlada y compost enriquecido, inoculado en biofábrica con un consorcio bacteriano vivo de Azotobacter, Azospirillum y Pseudomonas. Según su ficha técnica, mejora la estructura, la funcionalidad y la resiliencia del suelo. No reemplaza el plan de fertilización: lo complementa.",
        datos: [
          { label: "Presentación", value: "Bolsas de 20 a 25 kg y a granel" },
          { label: "Dosis en palma", value: "1 a 2 kg por palma, en el hueco de siembra" },
          { label: "Aplicación", value: "La mitad al fondo del hueco antes de sembrar y la mitad sobre el plato" },
        ],
        cultivos: "Palma de aceite, en siembra",
        ficha: "/fichas/biochar-blend-ficha-tecnica.pdf",
      },
      {
        id: "sirius-char",
        name: "Sirius Char",
        rotulo: "Acondicionador inorgánico de suelos · biochar",
        image: "/img/procesos/biochar-salida.webp",
        alt: "Material negro saliendo de un proceso de pirólisis",
        text: "Acondicionador inorgánico en polvo seco, obtenido por pirólisis controlada de cascarilla de palma de aceite. Según su ficha técnica, aporta una matriz carbonosa porosa y estable que modifica la retención de humedad, la capacidad de intercambio catiónico y la reacción del suelo donde se incorpora. Su ficha no lo aconseja en suelos alcalinos, salinos o sódicos.",
        datos: [
          { label: "Registro", value: "Registro de Venta ICA N.º 14623" },
          { label: "Presentaciones", value: "Sacos de 10, 20, 40 y 50 kg; big bags de 500 y 1.000 kg; bolsas de 500 y 1.000 g" },
          { label: "Aplicación", value: "Localizada en la zona radicular, incorporada al suelo y humedecida" },
        ],
        cultivos: "Palma de aceite, cacao y café",
        ficha: "/fichas/sirius-char-ficha-tecnica.pdf",
      },
      {
        id: "sirius-char-f",
        name: "Sirius Char (F)",
        rotulo: "Material filtrante · biochar",
        image: "/img/procesos/reactor.webp",
        alt: "Interior de un reactor de pirólisis",
        text: "Biochar obtenido por pirólisis controlada de cascarilla de palma de aceite, ofrecido como medio de contacto para biofiltros y humedales construidos. Es de uso no agrícola: no se ampara en el Registro de Venta ICA del uso agrícola. Su ficha presenta resultados preliminares.",
        datos: [
          { label: "Empaque", value: "Big bags de 500 kg" },
          { label: "Otros formatos", value: "Volúmenes y granulometrías que se acuerdan por proyecto" },
        ],
        cultivos: "No aplica: uso en biofiltros y humedales construidos",
        ficha: "/fichas/sirius-char-filtro-ficha-tecnica.pdf",
      },
    ],
  },
];

export const productos = lineas.flatMap((l) => l.productos);

export const faqs = [
  {
    q: "¿Cómo empiezo a usar sus productos?",
    a: "Escríbenos y cuéntanos tu cultivo. Las fichas técnicas incluyen acompañamiento agronómico en campo con agendamiento previo, y la dosis de los acondicionadores se define según el análisis de suelo.",
  },
  {
    q: "¿Cómo se despachan los bioinsumos?",
    a: "Son productos biológicos vivos: el despacho se programa en entregas fraccionadas, acordadas según el cronograma de aplicación en finca. Su vida útil es de 90 días desde fabricación y se almacenan entre 15 y 30 °C, sin congelar.",
  },
  {
    q: "¿A qué hora conviene aplicar Sirius Bacter y Trichoderma?",
    a: "Sus fichas indican aplicar antes de las 7 a. m. o después de las 4 p. m., con menos de 28 °C y humedad relativa superior a 70 %, porque los microorganismos son sensibles a la radiación ultravioleta y a la desecación.",
  },
  {
    q: "¿Sirius Char sirve para cualquier suelo?",
    a: "No. Su ficha no lo aconseja en suelos alcalinos (pH superior a 7,0 – 7,5), salinos o sódicos, y recomienda una prueba previa en un área reducida la primera vez que se usa en un cultivo, una variedad o un tipo de suelo.",
  },
  {
    q: "¿Dónde encuentro la información técnica?",
    a: "Cada producto tiene su ficha técnica en PDF, con composición, presentación, uso y manejo. Puedes descargarlas en la sección Fichas técnicas de esta página.",
  },
];
