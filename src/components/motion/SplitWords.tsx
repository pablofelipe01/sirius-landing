import { Children, type ElementType, type ReactNode } from "react";

// Parte un titular en palabras para las animaciones de ScrollReveal. Sigue siendo Server Component:
// solo arma el marcado. Los textos se parten por espacios; los elementos (p. ej. <Accent>) quedan
// como una sola pieza.
function tokens(children: ReactNode) {
  return Children.toArray(children).flatMap((child) => (typeof child === "string" ? child.split(/(\s+)/).filter(Boolean) : [child]));
}

// Palabras que suben desde una máscara (data-split). El margen negativo compensa el relleno que deja
// sitio a los descendentes y a la cola de la cursiva, que la máscara cortaría.
export function SplitWords({
  children,
  as: Tag = "span",
  delay,
  className = "",
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} data-split="" data-split-delay={delay} className={className}>
      {tokens(children).map((t, i) =>
        typeof t === "string" && /^\s+$/.test(t) ? (
          " "
        ) : (
          <span key={i} className="-mb-[0.14em] -mr-[0.08em] inline-block overflow-hidden pr-[0.08em] pb-[0.14em] align-bottom">
            <span data-split-word="" className="inline-block">
              {t}
            </span>
          </span>
        ),
      )}
    </Tag>
  );
}

// Párrafo cuyas palabras se encienden al ritmo del scroll (data-scrub-text). Sin JS se lee completo.
export function ScrubText({ children, as: Tag = "p", className = "" }: { children: ReactNode; as?: ElementType; className?: string }) {
  return (
    <Tag data-scrub-text="" className={className}>
      {tokens(children).map((t, i) =>
        typeof t === "string" && /^\s+$/.test(t) ? (
          " "
        ) : (
          <span key={i} data-scrub-word="">
            {t}
          </span>
        ),
      )}
    </Tag>
  );
}
