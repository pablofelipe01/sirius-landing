// Parte un texto en palabras enmascaradas para que ScrollReveal las haga subir una a una
// (ver data-split). Las palabras siguen siendo texto real, con espacios reales entre ellas, para que
// copiar, buscar y los lectores de pantalla las lean una sola vez y en orden.
export function SplitWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span data-split data-split-delay={String(delay)}>
      {words.map((w, i) => (
        <span key={i}>
          {i > 0 && " "}
          {/* El padding inferior evita que la máscara recorte los descendentes (g, p, j) */}
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span data-split-word className="inline-block">
              {w}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}
