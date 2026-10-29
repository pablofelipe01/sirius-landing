// Contenido global del sitio: menú, pie de página y empresas del grupo.
// Los datos de contacto no se repiten aquí: salen de @/lib/contacto, que es la fuente única.

import {
  DIRECCION,
  EMAIL_CONTACTO,
  HORARIO,
  MAILTO_URL,
  TELEFONOS,
  WHATSAPP_URL,
  TELEFONO_PRINCIPAL,
} from "@/lib/contacto";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navigation: NavItem[] = [
  {
    label: "Somos Sirius",
    href: "/somos-sirius",
    children: [
      { label: "Quiénes somos", href: "/somos-sirius#quienes-somos" },
      { label: "Nuestros valores", href: "/somos-sirius#valores" },
      { label: "Nuestra historia", href: "/somos-sirius#historia" },
      { label: "Misión y visión", href: "/somos-sirius#mision" },
    ],
  },
  {
    label: "Productos",
    href: "/productos",
    children: [
      { label: "Bioinsumos", href: "/productos#bioinsumos" },
      { label: "Biochar y acondicionadores", href: "/productos#biochar" },
      { label: "Fichas técnicas", href: "/productos#fichas" },
    ],
  },
  {
    label: "Biofábrica",
    href: "/biofabrica",
    children: [
      { label: "Pirólisis", href: "/biofabrica#pirolisis" },
      { label: "Biotecnología", href: "/biofabrica#biotecnologia" },
      { label: "Agentics IA", href: "/biofabrica#agentics" },
      { label: "Formulación a la medida", href: "/biofabrica#formulacion" },
    ],
  },
  { label: "Contacto", href: "/contacto" },
];

export const contact = {
  address: DIRECCION,
  phones: TELEFONOS.map((t) => ({ label: t.etiqueta, href: `tel:+${t.numero}` })),
  whatsapp: { label: TELEFONO_PRINCIPAL.etiqueta, href: WHATSAPP_URL },
  email: EMAIL_CONTACTO,
  mailto: MAILTO_URL,
  schedule: [HORARIO.lunesAMiercoles, HORARIO.jueves, HORARIO.viernes],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/sirius.colombia" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sirius-regenerative" },
  ],
};

export const footer = {
  title: "La tierra está esperando. Regeneremos juntos.",
  text: "Bioinsumos y biochar con ficha técnica pública, y acompañamiento agronómico en campo. Desde Barranca de Upía, Meta.",
};

// Empresas del grupo (las mismas de /directorio). width/height: tamaño intrínseco del archivo;
// Allies.tsx lo usa para dar a cada logo la misma superficie visible, sea alargado o cuadrado.
// scale: ajuste óptico para logos con mucho aire interno, que a igual superficie se ven más pequeños.
export type Ally = { name: string; logo?: string; width?: number; height?: number; scale?: number; href?: string };

export const allies: Ally[] = [
  { name: "Guaicaramo", logo: "/logos/guaicaramo.png", width: 1616, height: 643, href: "https://linktr.ee/Guaicaramo" },
  { name: "Del Llano Alto Oleico", logo: "/logos/del-llano.png", width: 2151, height: 2754, scale: 0.9, href: "https://linktr.ee/DelLlanoAltoOleico" },
  { name: "Fundación Guaicaramo", logo: "/logos/fundacion-guaicaramo.png", width: 1869, height: 1300, href: "https://linktr.ee/FundacionGuaicaramo" },
  { name: "Hato Guaicaramo", logo: "/logos/hato-guaicaramo.png", width: 1438, height: 1094, href: "https://linktr.ee/HatoGuaicaramo" },
];
