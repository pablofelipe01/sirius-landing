import Image from "next/image";
import { allies } from "@/lib/content/site";

// Tamaño óptico: todos los logos ocupan la misma superficie (ancho × alto), no la misma altura.
// Con altura fija un logo alargado se ve enorme y uno cuadrado diminuto. Los topes evitan que se salgan de la placa.
const LOGO_AREA = 7000; // px²
const LOGO_MAX_W = 160;
const LOGO_MAX_H = 84;

function logoSize(width: number, height: number, scale = 1) {
  const ratio = width / height;
  let h = Math.sqrt((LOGO_AREA * scale * scale) / ratio);
  h = Math.min(h, LOGO_MAX_H, LOGO_MAX_W / ratio);
  return { width: Math.round(h * ratio), height: Math.round(h) };
}

// Empresas del grupo en una fila de placas fijas (son pocas: no hace falta una cinta en movimiento)
export function Allies() {
  return (
    <ul data-reveal-stagger className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {allies.map(({ name, logo, width = 2, height = 1, scale, href }) => {
        const size = logoSize(width, height, scale);
        return (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={name}
              className="flex h-32 items-center justify-center rounded-[1.75rem] border border-line bg-white px-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-sutileza hover:shadow-[0_16px_30px_-18px_rgba(1,84,172,0.45)]"
            >
              {logo ? <Image src={logo} alt={name} width={size.width} height={size.height} style={size} className="object-contain" /> : name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
