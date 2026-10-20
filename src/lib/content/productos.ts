// Productos. Descripciones y beneficios del sitio anterior (página de ventas y sección de productos).

export const productosIntro =
  "Nuestros productos no solo alimentan cultivos: regeneran ecosistemas y empoderan a los agricultores. Biochar producido en nuestra propia biofábrica y biológicos formulados a la medida de cada suelo.";

export type Producto = {
  id: string;
  name: string;
  code: string;
  image: string;
  alt: string;
  text: string;
  benefits: string[];
};

export const productos: Producto[] = [
  {
    id: "biochar-blend",
    name: "Biochar Blend",
    code: "BB",
    image: "/img/productos/biochar-blend.webp",
    alt: "Recipiente con Biochar Blend sobre hojas verdes",
    text: "Una mezcla de biochar premium, compost enriquecido y microorganismos benéficos. Mejora la estructura del suelo, activa la vida microbiana y nutre tus cultivos desde la raíz.",
    benefits: [
      "Mejora la estructura del suelo",
      "Aumenta la retención de agua",
      "Incrementa la actividad microbiana",
      "Potencia el crecimiento de raíces",
      "Reduce la necesidad de fertilizantes químicos",
    ],
  },
  {
    id: "sirius-bacter",
    name: "Sirius Bacter",
    code: "SB",
    image: "/img/productos/sirius-bacter-premium.webp",
    alt: "Frascos con los consorcios microbianos de Sirius Bacter",
    text: "Millones de bacterias y hongos entomopatógenos trabajando juntos por tu cultivo. Mejora la disponibilidad de nutrientes, estimula las raíces y fortalece tu suelo desde lo invisible.",
    benefits: [
      "Estimula el crecimiento radicular",
      "Mejora la absorción de nutrientes",
      "Incrementa la resistencia a enfermedades",
      "Promueve la salud general del suelo",
      "Reduce los requerimientos de fertilizantes",
    ],
  },
  {
    id: "tratamiento-preventivo",
    name: "Tratamiento Preventivo de Plagas",
    code: "TP",
    image: "/img/productos/tratamiento.webp",
    alt: "Frascos del tratamiento preventivo de plagas entre tallos de bambú",
    text: "Tu escudo natural contra plagas. Fórmula biológica a la medida con extractos vegetales y microorganismos aliados. Protege tus cultivos mientras cuidas la biodiversidad.",
    benefits: [
      "Protección natural contra múltiples plagas",
      "Preserva la biodiversidad del ecosistema",
      "No genera resistencia en los patógenos",
      "Compatible con cultivos orgánicos",
      "Aplicación preventiva y curativa",
    ],
  },
];

// PDFs en public/fichas (los mismos que enlaza /palma/ficha)
export const fichas = [
  { name: "Ficha técnica · Biochar Blend", file: "/fichas/biochar-blend-ficha-tecnica.pdf" },
  { name: "Ficha técnica · Sirius Char Filtro", file: "/fichas/sirius-char-filtro-ficha-tecnica.pdf" },
];

export const faqs = [
  {
    q: "¿Cómo puedo comenzar a utilizar sus productos?",
    a: "Nuestros productos son fáciles de usar. Puedes adquirirlos en nuestra tienda o contactarnos para recibir asesoría personalizada según las necesidades específicas de tu cultivo.",
  },
  {
    q: "¿Son efectivos en todo tipo de suelos?",
    a: "Sí, están diseñados para funcionar en diversos tipos de suelos. Para obtener resultados óptimos recomendamos un análisis previo del suelo y así adaptar la solución a tus necesidades.",
  },
  {
    q: "¿Cuánto tiempo tardan en verse los resultados?",
    a: "Los primeros resultados pueden observarse entre 2 y 4 semanas después de la aplicación, según el estado inicial del suelo y el tipo de cultivo. La regeneración del suelo es un proceso continuo que mejora con el tiempo.",
  },
  {
    q: "¿Hacen envíos internacionales?",
    a: "Sí. Los costos y tiempos de envío varían según la ubicación; contacta a nuestro equipo para recibir información detallada sobre envíos a tu región.",
  },
];
