import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'App de Portería — Guaicaramo',
  description:
    'Cómo se programa, se autoriza y se registra el ingreso de personas y vehículos a la planta de Guaicaramo.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@1,400;1,600&display=swap');

/* La página es autónoma: se ocultan el navbar y el footer del sitio */
body:has(.doc-porteria) > nav,
body:has(.doc-porteria) > footer { display: none !important; }
body:has(.doc-porteria) { background: #F1F5F8; }

.doc-porteria{
  --tinta:#1A1A33;
  --tinta-70:rgba(26,26,51,.70);
  --tinta-45:rgba(26,26,51,.45);
  --barranca:#0154AC;
  --alegria:#00B602;
  --cielo:#00A3FF;
  --papel:#F1F5F8;
  --blanco:#fff;
  --hair:rgba(26,26,51,.14);
  background:var(--papel);
  color:var(--tinta);
  font-family:"Archivo","Helvetica Neue",Arial,sans-serif;
  font-size:17px;
  line-height:1.6;
  -webkit-text-size-adjust:100%;
}
.doc-porteria *{box-sizing:border-box}
.doc-porteria .pagina{max-width:1000px;margin:0 auto;padding:0 24px 96px}
.doc-porteria .prosa{max-width:62ch}
.doc-porteria a{color:var(--barranca);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px}
.doc-porteria a:focus-visible,.doc-porteria button:focus-visible{outline:3px solid var(--cielo);outline-offset:3px}

/* ---------- Portada ---------- */
.doc-porteria .portada{padding:72px 0 0}
.doc-porteria .marca{font-size:.92rem;color:var(--barranca);font-weight:600;letter-spacing:.01em;margin:0 0 20px}
.doc-porteria .marca span{color:var(--tinta-45);font-weight:400}
.doc-porteria h1{
  font-size:clamp(2.6rem,7vw,4.6rem);
  line-height:.98;
  font-weight:700;
  letter-spacing:-.025em;
  margin:0 0 18px;
}
.doc-porteria .bajada{
  font-family:"Cormorant Garamond",Georgia,serif;
  font-style:italic;
  font-size:clamp(1.35rem,3vw,1.8rem);
  line-height:1.35;
  color:var(--tinta-70);
  max-width:34ch;
  margin:0 0 28px;
}
.doc-porteria .dato{display:flex;flex-wrap:wrap;gap:8px 28px;font-size:.95rem;color:var(--tinta-70);margin:0 0 36px;padding:0;list-style:none}
.doc-porteria .dato b{color:var(--tinta);font-weight:600}

/* ---------- Barra de barrera ---------- */
.doc-porteria .barrera{
  height:15px;border-radius:2px;margin:44px 0;
  background:repeating-linear-gradient(115deg,var(--barranca) 0 15px,#fff 15px 30px);
  box-shadow:inset 0 0 0 1px rgba(1,84,172,.35);
}

/* ---------- Índice ---------- */
.doc-porteria .indice{margin:0 0 8px;padding:0;list-style:none;border-top:1px solid var(--hair)}
.doc-porteria .indice li{border-bottom:1px solid var(--hair)}
.doc-porteria .indice a{
  display:flex;justify-content:space-between;gap:16px;align-items:baseline;
  padding:14px 2px;text-decoration:none;font-weight:500;
}
.doc-porteria .indice a:hover{color:var(--cielo)}
.doc-porteria .indice em{font-style:normal;color:var(--tinta-45);font-size:.9rem;text-align:right}

/* ---------- Secciones ---------- */
.doc-porteria section{padding-top:64px}
.doc-porteria h2{
  font-size:clamp(1.6rem,3.6vw,2.3rem);line-height:1.1;letter-spacing:-.02em;
  font-weight:700;margin:0 0 10px;
}
.doc-porteria h2 .fase{display:block;font-size:.95rem;font-weight:600;color:var(--barranca);letter-spacing:.01em;margin-bottom:8px}
.doc-porteria h3{font-size:1.15rem;font-weight:600;margin:0 0 8px;letter-spacing:-.01em}
.doc-porteria p{margin:0 0 14px}

/* ---------- Roles ---------- */
.doc-porteria .roles{display:grid;grid-template-columns:repeat(2,1fr);gap:0 40px;margin:28px 0 0;border-top:2px solid var(--tinta)}
.doc-porteria .rol{padding:18px 0;border-bottom:1px solid var(--hair)}
.doc-porteria .rol h3{margin-bottom:4px}
.doc-porteria .rol p{margin:0;color:var(--tinta-70);font-size:.96rem}

/* ---------- Pasos ---------- */
.doc-porteria .pasos{margin:36px 0 0}
.doc-porteria .paso{position:relative;display:grid;grid-template-columns:52px 1fr;gap:0 26px;padding-bottom:44px}
.doc-porteria .paso::before{
  content:"";position:absolute;left:25px;top:56px;bottom:0;width:2px;
  background:repeating-linear-gradient(to bottom,var(--barranca) 0 9px,transparent 9px 18px);
  opacity:.5;
}
.doc-porteria .paso:last-child::before{display:none}
.doc-porteria .paso__num{
  width:52px;height:52px;border-radius:50%;background:var(--blanco);
  border:2px solid var(--barranca);color:var(--barranca);
  display:grid;place-items:center;font-weight:700;font-size:1.15rem;
}
.doc-porteria .paso__cuerpo{padding-top:10px}
.doc-porteria .quien{
  display:inline-block;font-size:.82rem;font-weight:600;color:var(--barranca);
  background:rgba(1,163,255,.12);border-radius:999px;padding:3px 11px;margin:0 0 10px;
}
.doc-porteria .paso p{color:var(--tinta-70);max-width:60ch}
.doc-porteria .paso p strong{color:var(--tinta)}

/* ---------- Estados ---------- */
.doc-porteria .estado{display:inline-block;font-size:.85rem;font-weight:600;padding:2px 10px;border-radius:4px;white-space:nowrap}
.doc-porteria .estado--ok{background:rgba(0,182,2,.13);color:#046b02}
.doc-porteria .estado--no{background:rgba(200,30,30,.11);color:#a81f1f}

/* ---------- Espacios de foto ---------- */
.doc-porteria .fotos{display:grid;gap:16px;margin:18px 0 0}
.doc-porteria .fotos--par{grid-template-columns:repeat(2,1fr)}
.doc-porteria figure{margin:0}
.doc-porteria .foto{
  aspect-ratio:16/9;background:var(--blanco);
  border:1.5px dashed rgba(1,84,172,.5);border-radius:3px;
  display:flex;flex-direction:column;justify-content:flex-end;gap:6px;padding:16px;
}
.doc-porteria .foto--v{aspect-ratio:3/4}
.doc-porteria .foto--pantalla{aspect-ratio:16/10;border-color:rgba(0,182,2,.55);background:#fbfffb}
.doc-porteria .foto__id{font-weight:700;font-size:.85rem;color:var(--barranca)}
.doc-porteria .foto--pantalla .foto__id{color:#046b02}
.doc-porteria .foto__spec{font-size:.86rem;line-height:1.45;color:var(--tinta-70)}
.doc-porteria .foto img{width:100%;height:100%;object-fit:cover;display:block;border-radius:3px}
.doc-porteria figcaption{font-size:.86rem;color:var(--tinta-45);margin-top:7px;max-width:52ch}

/* ---------- Excepciones ---------- */
.doc-porteria .casos{margin:28px 0 0;border-top:2px solid var(--tinta)}
.doc-porteria .caso{padding:16px 0;border-bottom:1px solid var(--hair);display:grid;grid-template-columns:minmax(180px,1fr) 2fr;gap:6px 32px}
.doc-porteria .caso h3{margin:0;font-size:1rem}
.doc-porteria .caso p{margin:0;color:var(--tinta-70);font-size:.96rem}

/* ---------- Cierre ---------- */
.doc-porteria .cierre{margin-top:64px;padding:32px;background:var(--tinta);color:#fff;border-radius:4px}
.doc-porteria .cierre h2{color:#fff;margin-bottom:12px}
.doc-porteria .cierre p{color:rgba(255,255,255,.78);max-width:58ch}
.doc-porteria .cierre a{color:var(--cielo)}

/* ---------- Notas de producción ---------- */
.doc-porteria .notas{margin-top:56px;padding:24px;border:1.5px dashed var(--tinta-45);border-radius:4px;background:#fff}
.doc-porteria .notas h2{font-size:1.2rem}
.doc-porteria .notas ul{margin:0;padding-left:20px;color:var(--tinta-70);font-size:.95rem}
.doc-porteria .notas li{margin-bottom:8px}

@media (max-width:720px){
  .doc-porteria{font-size:16px}
  .doc-porteria .roles,.doc-porteria .fotos--par{grid-template-columns:1fr}
  .doc-porteria .roles{gap:0}
  .doc-porteria .caso{grid-template-columns:1fr}
  .doc-porteria .paso{grid-template-columns:40px 1fr;gap:0 18px}
  .doc-porteria .paso__num{width:40px;height:40px;font-size:1rem}
  .doc-porteria .paso::before{left:19px;top:44px}
  .doc-porteria .paso__cuerpo{padding-top:6px}
}
@media print{
  .doc-porteria{background:#fff}
  .doc-porteria .indice,.doc-porteria .notas{display:none}
  .doc-porteria .paso,.doc-porteria figure,.doc-porteria .caso{break-inside:avoid}
  .doc-porteria .cierre{background:#fff;color:var(--tinta);border:1px solid var(--tinta)}
  .doc-porteria .cierre h2,.doc-porteria .cierre p{color:var(--tinta)}
}
`;

export default function PorteriaGuaicaramoPage() {
  return (
    <div className="doc-porteria">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <main className="pagina">
        <header className="portada">
          <p className="marca">
            Guaicaramo <span>/ Control de Visitas</span>
          </p>
          <h1>App de Portería</h1>
          <p className="bajada">
            Así se programa, se autoriza y se registra el ingreso de personas y vehículos a la planta.
          </p>
          <ul className="dato">
            <li><b>En operación desde</b> 26 de mayo de 2026</li>
            <li><b>Tiempo de lectura</b> 5 minutos</li>
          </ul>

          {/* FOTO 01 · imagen de apertura */}
          <figure>
            <div className="foto">
              <span className="foto__id">Foto 01 — Portería principal</span>
              <span className="foto__spec">
                Plano amplio horizontal (16:9, mínimo 1600&nbsp;px de ancho) de la portería con la barrera cerrada y el
                vigilante en su puesto. Luz de día, sin flash. Es la foto que abre la página, que se vea limpia y
                reconocible.
              </span>
            </div>
            <figcaption>Punto de control de ingreso a Guaicaramo.</figcaption>
          </figure>
        </header>

        <div className="barrera" role="presentation" />

        <nav aria-label="Contenido de la página">
          <ul className="indice">
            <li><a href="#roles">Quién participa <em>4 roles</em></a></li>
            <li><a href="#programacion">Antes de la visita: la programación semanal <em>pasos 1 a 3</em></a></li>
            <li><a href="#porteria">El día del ingreso: en la portería <em>pasos 4 a 7</em></a></li>
            <li><a href="#casos">Casos que se salen del flujo <em>4 situaciones</em></a></li>
            <li><a href="#registro">Qué queda registrado <em>trazabilidad</em></a></li>
          </ul>
        </nav>

        <section id="roles">
          <h2>Quién participa</h2>
          <p className="prosa">
            Cuatro roles usan la misma información en momentos distintos. Nadie repite el trabajo del otro: cada uno
            agrega una capa y la pasa al siguiente.
          </p>
          <div className="roles">
            <div className="rol">
              <h3>Líderes de área</h3>
              <p>Reportan el personal y los visitantes que van a ingresar durante la semana.</p>
            </div>
            <div className="rol">
              <h3>Recepción</h3>
              <p>Consolida lo que envían todas las áreas en una sola programación.</p>
            </div>
            <div className="rol">
              <h3>Control 1</h3>
              <p>Revisa la programación consolidada y la autoriza.</p>
            </div>
            <div className="rol">
              <h3>Portería</h3>
              <p>Verifica a cada persona al llegar y registra la entrada y la salida.</p>
            </div>
          </div>
        </section>

        <section id="programacion">
          <h2>
            <span className="fase">Antes de la visita</span>La programación semanal
          </h2>
          <p className="prosa">
            Todo ingreso empieza días antes de que alguien llegue a la barrera. Si la programación está completa y
            autorizada, la portería solo confirma; no decide.
          </p>

          <div className="pasos">
            <article className="paso">
              <div className="paso__num">1</div>
              <div className="paso__cuerpo">
                <p className="quien">Líder de área</p>
                <h3>Cada área registra su programación</h3>
                <p>
                  El líder entra a la app y registra el personal y los visitantes de su área para la semana: nombre,
                  documento, empresa, fecha y motivo del ingreso.
                </p>
                <div className="fotos fotos--par">
                  <figure>
                    <div className="foto">
                      <span className="foto__id">Foto 02 — Líder de área diligenciando</span>
                      <span className="foto__spec">
                        Persona real de un área usando la app desde su computador o celular, en su puesto de trabajo.
                        Plano medio, que se le vea la cara y la pantalla encendida.
                      </span>
                    </div>
                  </figure>
                  <figure>
                    <div className="foto foto--pantalla">
                      <span className="foto__id">Captura 01 — Formulario de programación</span>
                      <span className="foto__spec">
                        Pantalla del formulario con los campos visibles y datos de prueba. Captura nativa, no foto de la
                        pantalla.
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </article>

            <article className="paso">
              <div className="paso__num">2</div>
              <div className="paso__cuerpo">
                <p className="quien">Recepción</p>
                <h3>Recepción consolida las áreas</h3>
                <p>
                  Recepción revisa qué áreas ya enviaron y quiénes faltan, corrige datos incompletos y arma una sola
                  programación para toda la semana.
                </p>
                <div className="fotos fotos--par">
                  <figure>
                    <div className="foto">
                      <span className="foto__id">Foto 03 — Recepción trabajando</span>
                      <span className="foto__spec">
                        Recepción frente al computador con la app abierta. Plano medio horizontal; el mostrador de
                        recepción de fondo ubica al lector.
                      </span>
                    </div>
                  </figure>
                  <figure>
                    <div className="foto foto--pantalla">
                      <span className="foto__id">Captura 02 — Consolidado por área</span>
                      <span className="foto__spec">
                        Vista con el listado de áreas y su estado (enviado / pendiente). Ideal que se vean los dos
                        estados al mismo tiempo.
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </article>

            <article className="paso">
              <div className="paso__num">3</div>
              <div className="paso__cuerpo">
                <p className="quien">Control 1</p>
                <h3>Control 1 autoriza</h3>
                <p>
                  Control 1 valida la programación consolidada. A partir de ese momento, las personas autorizadas quedan
                  disponibles para la portería.
                </p>
                <div className="fotos">
                  <figure>
                    <div className="foto foto--pantalla">
                      <span className="foto__id">Captura 03 — Pantalla de validación</span>
                      <span className="foto__spec">
                        Vista de Control 1 con la programación y la acción de autorizar. Que se distinga con claridad lo
                        autorizado de lo que está en revisión.
                      </span>
                    </div>
                    <figcaption>La autorización es el punto de corte: lo que no pasa por aquí, no entra.</figcaption>
                  </figure>
                </div>
              </div>
            </article>
          </div>
        </section>

        <div className="barrera" role="presentation" />

        <section id="porteria">
          <h2>
            <span className="fase">El día del ingreso</span>En la portería
          </h2>
          <p className="prosa">
            En la barrera el trabajo es de segundos: identificar, confirmar y registrar. La app responde con un estado
            claro y el vigilante actúa según ese estado.
          </p>

          <div className="pasos">
            <article className="paso">
              <div className="paso__num">4</div>
              <div className="paso__cuerpo">
                <p className="quien">Visitante</p>
                <h3>Llegada a la barrera</h3>
                <p>La persona o el vehículo llega al punto de control y entrega su documento de identidad al vigilante.</p>
                <div className="fotos fotos--par">
                  <figure>
                    <div className="foto">
                      <span className="foto__id">Foto 04 — Vehículo en la barrera</span>
                      <span className="foto__spec">
                        Vehículo detenido frente a la barrera cerrada, con el vigilante acercándose. Horizontal, plano
                        general.
                      </span>
                    </div>
                  </figure>
                  <figure>
                    <div className="foto">
                      <span className="foto__id">Foto 05 — Documento y dispositivo</span>
                      <span className="foto__spec">
                        Plano cerrado de las manos del vigilante con la cédula y el dispositivo donde consulta. La cédula
                        debe ser de prueba o quedar ilegible.
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </article>

            <article className="paso">
              <div className="paso__num">5</div>
              <div className="paso__cuerpo">
                <p className="quien">Portería</p>
                <h3>Verificación en la app</h3>
                <p>
                  El vigilante busca el documento en la app y recibe una de dos respuestas:{' '}
                  <span className="estado estado--ok">Autorizado</span> continúa al registro de ingreso;{' '}
                  <span className="estado estado--no">No autorizado</span> no ingresa hasta que el área responsable lo
                  programe.
                </p>
                <div className="fotos fotos--par">
                  <figure>
                    <div className="foto foto--pantalla">
                      <span className="foto__id">Captura 04 — Resultado autorizado</span>
                      <span className="foto__spec">
                        Pantalla de consulta con un resultado autorizado: nombre, empresa, área que lo programó y
                        vigencia.
                      </span>
                    </div>
                  </figure>
                  <figure>
                    <div className="foto foto--pantalla">
                      <span className="foto__id">Captura 05 — Resultado no autorizado</span>
                      <span className="foto__spec">
                        La misma pantalla con el resultado negativo. Las dos capturas juntas enseñan más que cualquier
                        explicación.
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </article>

            <article className="paso">
              <div className="paso__num">6</div>
              <div className="paso__cuerpo">
                <p className="quien">Portería</p>
                <h3>Registro de ingreso</h3>
                <p>
                  El vigilante confirma el ingreso en la app. Queda la hora exacta, quién entró y por dónde. Ahí se abre
                  la barrera y se entrega la identificación de visitante.
                </p>
                <div className="fotos fotos--par">
                  <figure>
                    <div className="foto foto--pantalla">
                      <span className="foto__id">Captura 06 — Ingreso confirmado</span>
                      <span className="foto__spec">Confirmación de ingreso con la hora registrada.</span>
                    </div>
                  </figure>
                  <figure>
                    <div className="foto">
                      <span className="foto__id">Foto 06 — Ingreso autorizado</span>
                      <span className="foto__spec">
                        Barrera abriéndose o entrega de la escarapela de visitante. Es la foto que cierra la sensación de
                        «ya entró».
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </article>

            <article className="paso">
              <div className="paso__num">7</div>
              <div className="paso__cuerpo">
                <p className="quien">Portería</p>
                <h3>Registro de salida</h3>
                <p>
                  Al salir, el vigilante marca la salida. En cualquier momento del día la app muestra quiénes están
                  dentro de la planta.
                </p>
                <div className="fotos fotos--par">
                  <figure>
                    <div className="foto foto--pantalla">
                      <span className="foto__id">Captura 07 — Personas dentro de la planta</span>
                      <span className="foto__spec">
                        Listado en tiempo real de quienes están adentro, con la acción de registrar salida.
                      </span>
                    </div>
                  </figure>
                  <figure>
                    <div className="foto">
                      <span className="foto__id">Foto 07 — Salida al final del turno</span>
                      <span className="foto__spec">
                        Registro de salida en la portería, de preferencia en luz de tarde para que se lea como el cierre
                        del día.
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="casos">
          <h2>Casos que se salen del flujo</h2>
          <p className="prosa">
            Lo que más pregunta la portería no es el caso normal, es la excepción. Estas cuatro cubren casi todo.
          </p>
          <div className="casos">
            <div className="caso">
              <h3>Llega alguien sin programación</h3>
              <p>
                La app lo marca como no autorizado. La portería confirma con el área responsable y el área lo registra
                antes del ingreso.
              </p>
            </div>
            <div className="caso">
              <h3>La persona no trae documento</h3>
              <p>No se puede verificar la identidad y por lo tanto no se registra el ingreso.</p>
            </div>
            <div className="caso">
              <h3>Ingreso fuera del horario programado</h3>
              <p>Requiere autorización explícita antes de abrir la barrera.</p>
            </div>
            <div className="caso">
              <h3>Se cae internet o la energía</h3>
              <p>Se lleva registro en el formato físico de respaldo y se carga a la app en cuanto vuelve el servicio.</p>
            </div>
          </div>
        </section>

        <section id="registro">
          <h2>Qué queda registrado</h2>
          <p className="prosa">
            Cada ingreso y cada salida quedan con fecha, hora, documento, área responsable y quién autorizó. Con eso se
            puede responder tres preguntas en cualquier momento: quién está dentro de la planta ahora, quién entró un
            día específico y qué área respondía por esa visita.
          </p>
          <div className="fotos">
            <figure>
              <div className="foto foto--pantalla">
                <span className="foto__id">Captura 08 — Histórico o reporte</span>
                <span className="foto__spec">
                  Vista del histórico de ingresos o del reporte que se descarga, con datos de prueba y varias filas para
                  que se entienda el volumen.
                </span>
              </div>
            </figure>
          </div>
        </section>

        <section className="cierre">
          <h2>¿Dudas con la app?</h2>
          <p>
            Escribe a la Dirección de Tecnología de Sirius con el caso, la hora y una captura de lo que viste en
            pantalla. Con eso se resuelve mucho más rápido.
          </p>
        </section>

        {/* Notas de producción: borrar este bloque antes de compartir la versión final */}
        <aside className="notas">
          <h2>Notas para armar esta página</h2>
          <ul>
            <li>
              <strong>Cómo poner una foto:</strong> reemplazar el bloque{' '}
              <code>&lt;div className=&quot;foto&quot;&gt;…&lt;/div&gt;</code> por{' '}
              <code>
                &lt;div className=&quot;foto&quot;&gt;&lt;img src=&quot;/porteria/01-porteria.jpg&quot;
                alt=&quot;descripción&quot; /&gt;&lt;/div&gt;
              </code>
              . Las imágenes van en <code>public/porteria/</code>. El recorte y el tamaño ya están resueltos por CSS.
            </li>
            <li><strong>Total:</strong> 7 fotos de contexto + 8 capturas de pantalla.</li>
            <li>
              <strong>Datos personales:</strong> las capturas deben usar datos de prueba o llevar cédulas y nombres
              difuminados. Las fotos con personas identificables necesitan autorización de uso de imagen.
            </li>
            <li>
              <strong>Capturas:</strong> nativas del dispositivo (nunca foto de la pantalla), tema claro, misma
              resolución en todas.
            </li>
            <li>
              <strong>Fotos:</strong> horizontales, misma franja horaria para que la luz sea consistente, sin flash, la
              app visible pero no legible en detalle.
            </li>
            <li>
              <strong>Verificar antes de publicar:</strong> los nombres de los pasos 1 a 7 y de los casos de excepción
              están redactados según el flujo conocido; confirmar con recepción y Control 1 que coinciden con la
              operación real.
            </li>
          </ul>
        </aside>
      </main>
    </div>
  );
}
