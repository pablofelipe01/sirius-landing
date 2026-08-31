import type { Metadata } from 'next';

/**
 * Ruta privada: no se enlaza desde el navbar, el footer ni el landing.
 *
 * Marcos de captura pendientes (todos son pantallas de la app, sin personas).
 * Para llenar uno, reemplazar `<div className="marco__lienzo" />` por
 * `<Image src="/porteria/NN-nombre.png" alt="" fill sizes="..." />` o un
 * `<img>` simple; el recorte ya está resuelto por CSS.
 *
 *   01  Consulta de documento — resultado autorizado (apertura)
 *   02  Formulario de programación semanal (líder de área)
 *   03  Consolidado por área (recepción)
 *   04  Pantalla de validación (Control 1)
 *   05  Consulta de documento — resultado autorizado
 *   06  Consulta de documento — resultado no autorizado
 *   07  Confirmación de ingreso con hora
 *   08  Listado de personas dentro de la planta
 *   09  Histórico de ingresos / reporte
 */

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

body:has(.doc-porteria) > nav,
body:has(.doc-porteria) > footer { display: none !important; }
body:has(.doc-porteria) { background: #F4F6F9; }

.doc-porteria{
  --tinta:#141428;
  --tinta-72:rgba(20,20,40,.72);
  --tinta-52:rgba(20,20,40,.52);
  --tinta-38:rgba(20,20,40,.38);
  --barranca:#0154AC;
  --cielo:#00A3FF;
  --alegria:#00B602;
  --papel:#F4F6F9;
  --blanco:#fff;
  --hair:rgba(20,20,40,.10);
  --hair-fuerte:rgba(20,20,40,.16);
  --sombra:0 1px 2px rgba(20,20,40,.04), 0 8px 24px -12px rgba(20,20,40,.18);
  background:var(--papel);
  color:var(--tinta);
  font-family:"Archivo","Helvetica Neue",Arial,sans-serif;
  font-size:16.5px;
  line-height:1.62;
  letter-spacing:-.003em;
  -webkit-font-smoothing:antialiased;
  -webkit-text-size-adjust:100%;
}
.doc-porteria *{box-sizing:border-box}
.doc-porteria .pagina{max-width:1080px;margin:0 auto;padding:0 32px 120px}
.doc-porteria .prosa{max-width:60ch;color:var(--tinta-72)}
.doc-porteria a{color:var(--barranca);text-decoration:none}
.doc-porteria a:focus-visible{outline:2px solid var(--cielo);outline-offset:4px;border-radius:2px}
.doc-porteria h1,.doc-porteria h2,.doc-porteria h3{text-wrap:balance}

/* ---------- Portada ---------- */
.doc-porteria .portada{padding:80px 0 0}
.doc-porteria .marca{
  display:flex;align-items:center;gap:10px;
  font-size:.78rem;font-weight:600;letter-spacing:.09em;text-transform:uppercase;
  color:var(--barranca);margin:0 0 28px;
}
.doc-porteria .marca span{color:var(--tinta-38);font-weight:500}
.doc-porteria .marca i{display:block;width:22px;height:2px;background:var(--barranca);border-radius:2px;font-style:normal}
.doc-porteria h1{
  font-size:clamp(2.7rem,6.4vw,4.4rem);
  line-height:1.0;
  font-weight:700;
  letter-spacing:-.035em;
  margin:0 0 20px;
  max-width:16ch;
}
.doc-porteria .bajada{
  font-family:"Cormorant Garamond",Georgia,serif;
  font-style:italic;
  font-size:clamp(1.3rem,2.6vw,1.7rem);
  line-height:1.4;
  color:var(--tinta-72);
  max-width:38ch;
  margin:0 0 40px;
}
.doc-porteria .dato{
  display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;
  margin:0 0 48px;padding:0;list-style:none;
  border-top:1px solid var(--hair-fuerte);border-bottom:1px solid var(--hair);
}
.doc-porteria .dato li{padding:16px 24px 16px 0;border-right:1px solid var(--hair)}
.doc-porteria .dato li:last-child{border-right:0}
.doc-porteria .dato b{
  display:block;font-size:.72rem;font-weight:600;letter-spacing:.07em;
  text-transform:uppercase;color:var(--tinta-38);margin-bottom:4px;
}
.doc-porteria .dato span{font-size:.98rem;font-weight:500}

/* ---------- Regla de barrera ---------- */
.doc-porteria .barrera{
  height:8px;border-radius:1px;margin:0;
  background:repeating-linear-gradient(115deg,var(--barranca) 0 12px,rgba(1,84,172,.14) 12px 24px);
}
.doc-porteria .separador{margin:88px 0 0;height:1px;background:var(--hair-fuerte)}

/* ---------- Índice ---------- */
.doc-porteria .indice{margin:56px 0 0;padding:0;list-style:none;counter-reset:idx}
.doc-porteria .indice li{border-bottom:1px solid var(--hair)}
.doc-porteria .indice li:first-child{border-top:1px solid var(--hair)}
.doc-porteria .indice a{
  display:grid;grid-template-columns:40px 1fr auto;align-items:baseline;gap:0 8px;
  padding:15px 4px;font-weight:500;color:var(--tinta);
  transition:color .15s ease,padding-left .15s ease;
}
.doc-porteria .indice a::before{
  counter-increment:idx;content:counter(idx,decimal-leading-zero);
  font-size:.78rem;font-weight:600;color:var(--tinta-38);letter-spacing:.04em;
}
.doc-porteria .indice a:hover{color:var(--barranca);padding-left:8px}
.doc-porteria .indice em{font-style:normal;color:var(--tinta-38);font-size:.86rem}

/* ---------- Secciones ---------- */
.doc-porteria section{padding-top:88px}
.doc-porteria .fase{
  display:block;font-size:.72rem;font-weight:600;letter-spacing:.09em;
  text-transform:uppercase;color:var(--barranca);margin-bottom:12px;
}
.doc-porteria h2{
  font-size:clamp(1.65rem,3.2vw,2.15rem);line-height:1.12;letter-spacing:-.028em;
  font-weight:700;margin:0 0 14px;max-width:20ch;
}
.doc-porteria h3{font-size:1.05rem;font-weight:600;margin:0 0 8px;letter-spacing:-.015em}
.doc-porteria p{margin:0 0 16px}

/* ---------- Roles ---------- */
.doc-porteria .roles{
  display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
  margin:36px 0 0;background:var(--hair-fuerte);
  border:1px solid var(--hair-fuerte);border-radius:6px;overflow:hidden;
}
.doc-porteria .rol{padding:22px 20px 24px;background:var(--blanco)}
.doc-porteria .rol b{
  display:block;font-size:.7rem;font-weight:700;letter-spacing:.08em;
  color:var(--tinta-38);margin-bottom:14px;
}
.doc-porteria .rol h3{margin-bottom:6px}
.doc-porteria .rol p{margin:0;color:var(--tinta-72);font-size:.92rem;line-height:1.55}

/* ---------- Pasos ---------- */
.doc-porteria .pasos{margin:44px 0 0}
.doc-porteria .paso{position:relative;display:grid;grid-template-columns:44px 1fr;gap:0 28px;padding-bottom:56px}
.doc-porteria .paso::before{
  content:"";position:absolute;left:21px;top:46px;bottom:8px;width:1px;background:var(--hair-fuerte);
}
.doc-porteria .paso:last-child{padding-bottom:0}
.doc-porteria .paso:last-child::before{display:none}
.doc-porteria .paso__num{
  width:44px;height:44px;border-radius:50%;background:var(--blanco);
  border:1px solid var(--hair-fuerte);color:var(--tinta);
  display:grid;place-items:center;font-weight:600;font-size:.95rem;
  box-shadow:var(--sombra);
}
.doc-porteria .paso__cuerpo{padding-top:8px;min-width:0}
.doc-porteria .quien{
  display:inline-block;font-size:.68rem;font-weight:600;letter-spacing:.08em;
  text-transform:uppercase;color:var(--barranca);
  border:1px solid rgba(1,84,172,.24);border-radius:3px;
  padding:3px 9px;margin:0 0 14px;
}
.doc-porteria .paso p{color:var(--tinta-72);max-width:58ch;margin-bottom:0}

/* ---------- Estados ---------- */
.doc-porteria .estado{
  display:inline-block;font-size:.8rem;font-weight:600;padding:1px 8px;
  border-radius:3px;white-space:nowrap;
}
.doc-porteria .estado--ok{background:rgba(0,182,2,.10);color:#04760a;box-shadow:inset 0 0 0 1px rgba(0,182,2,.22)}
.doc-porteria .estado--no{background:rgba(178,32,32,.08);color:#a81f1f;box-shadow:inset 0 0 0 1px rgba(178,32,32,.20)}

/* ---------- Marcos de captura ---------- */
.doc-porteria .capturas{display:grid;gap:20px;margin:24px 0 0}
.doc-porteria .capturas--par{grid-template-columns:repeat(2,minmax(0,1fr))}
.doc-porteria figure{margin:0;min-width:0}
.doc-porteria .marco{
  background:var(--blanco);border:1px solid var(--hair-fuerte);
  border-radius:8px;overflow:hidden;box-shadow:var(--sombra);
}
.doc-porteria .marco__barra{
  display:flex;align-items:center;gap:6px;height:30px;padding:0 12px;
  border-bottom:1px solid var(--hair);background:rgba(20,20,40,.02);
}
.doc-porteria .marco__barra i{width:8px;height:8px;border-radius:50%;background:var(--hair-fuerte)}
.doc-porteria .marco__lienzo{
  aspect-ratio:16/10;
  background:
    linear-gradient(rgba(20,20,40,.02),rgba(20,20,40,.02)),
    repeating-linear-gradient(135deg,transparent 0 11px,rgba(20,20,40,.035) 11px 12px);
}
.doc-porteria .marco--alto .marco__lienzo{aspect-ratio:16/7}
.doc-porteria .marco img{display:block;width:100%;height:auto}

/* ---------- Casos ---------- */
.doc-porteria .casos{margin:36px 0 0;border-top:1px solid var(--hair-fuerte)}
.doc-porteria .caso{
  padding:20px 0;border-bottom:1px solid var(--hair);
  display:grid;grid-template-columns:minmax(200px,1fr) 1.6fr;gap:6px 40px;
}
.doc-porteria .caso h3{margin:0;font-size:.98rem}
.doc-porteria .caso p{margin:0;color:var(--tinta-72);font-size:.94rem}

/* ---------- Registro ---------- */
.doc-porteria .preguntas{
  display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin:32px 0 0;
  background:var(--hair-fuerte);border:1px solid var(--hair-fuerte);border-radius:6px;overflow:hidden;
}
.doc-porteria .pregunta{padding:20px;background:var(--blanco);font-size:.94rem;color:var(--tinta-72)}
.doc-porteria .pregunta b{display:block;color:var(--tinta);font-weight:600;margin-bottom:4px;font-size:.98rem}

/* ---------- Cierre ---------- */
.doc-porteria .cierre{
  margin-top:96px;padding:44px 40px;background:var(--tinta);color:#fff;border-radius:8px;
}
.doc-porteria .cierre h2{color:#fff;margin-bottom:14px;font-size:1.5rem}
.doc-porteria .cierre p{color:rgba(255,255,255,.74);max-width:56ch;margin:0}

@media (max-width:860px){
  .doc-porteria .roles{grid-template-columns:repeat(2,1fr)}
  .doc-porteria .preguntas{grid-template-columns:1fr}
}
@media (max-width:720px){
  .doc-porteria{font-size:16px}
  .doc-porteria .pagina{padding:0 20px 88px}
  .doc-porteria .portada{padding-top:56px}
  .doc-porteria .roles,.doc-porteria .capturas--par{grid-template-columns:1fr}
  .doc-porteria .dato{grid-template-columns:1fr}
  .doc-porteria .dato li{border-right:0;border-bottom:1px solid var(--hair);padding-right:0}
  .doc-porteria .dato li:last-child{border-bottom:0}
  .doc-porteria .caso{grid-template-columns:1fr;gap:4px}
  .doc-porteria .paso{grid-template-columns:34px 1fr;gap:0 18px;padding-bottom:44px}
  .doc-porteria .paso__num{width:34px;height:34px;font-size:.85rem}
  .doc-porteria .paso::before{left:16px;top:38px}
  .doc-porteria .paso__cuerpo{padding-top:4px}
  .doc-porteria section{padding-top:64px}
  .doc-porteria .cierre{padding:32px 24px}
}
@media print{
  .doc-porteria{background:#fff;font-size:11pt}
  .doc-porteria .indice{display:none}
  .doc-porteria .paso,.doc-porteria figure,.doc-porteria .caso,.doc-porteria .rol{break-inside:avoid}
  .doc-porteria .marco{box-shadow:none}
  .doc-porteria .cierre{background:#fff;color:var(--tinta);border:1px solid var(--hair-fuerte)}
  .doc-porteria .cierre h2{color:var(--tinta)}
  .doc-porteria .cierre p{color:var(--tinta-72)}
}
`;

function Marco({ alto = false }: { alto?: boolean }) {
  return (
    <figure>
      <div className={alto ? 'marco marco--alto' : 'marco'}>
        <div className="marco__barra" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="marco__lienzo" />
      </div>
    </figure>
  );
}

export default function PorteriaGuaicaramoPage() {
  return (
    <div className="doc-porteria">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <main className="pagina">
        <header className="portada">
          <p className="marca">
            <i />
            Guaicaramo <span>· Control de Visitas</span>
          </p>
          <h1>App de Portería</h1>
          <p className="bajada">
            Así se programa, se autoriza y se registra el ingreso de personas y vehículos a la planta.
          </p>
          <ul className="dato">
            <li>
              <b>En operación desde</b>
              <span>26 de mayo de 2026</span>
            </li>
            <li>
              <b>Usan la app</b>
                <span>Personal autorizado de Guaicaramo</span>
            </li>
            <li>
              <b>Tiempo de lectura</b>
              <span>5 minutos</span>
            </li>
          </ul>

          {/* Captura 01 — consulta de documento, resultado autorizado */}
          <Marco alto />
        </header>

        <div className="separador" role="presentation" />

        <nav aria-label="Contenido de la página">
          <ul className="indice">
            <li>
              <a href="#roles">
                Quién participa <em>4 roles</em>
              </a>
            </li>
            <li>
              <a href="#programacion">
                La programación semanal <em>Pasos 1 a 3</em>
              </a>
            </li>
            <li>
              <a href="#porteria">
                En la portería <em>Pasos 4 a 7</em>
              </a>
            </li>
            <li>
              <a href="#casos">
                Casos que se salen del flujo <em>4 situaciones</em>
              </a>
            </li>
            <li>
              <a href="#registro">
                Qué queda registrado <em>Trazabilidad</em>
              </a>
            </li>
          </ul>
        </nav>

        <section id="roles">
          <span className="fase">Quién participa</span>
          <h2>Cuatro roles, una sola información</h2>
          <p className="prosa">
            Cada rol usa los mismos datos en un momento distinto. Nadie repite el trabajo del otro: cada uno agrega una
            capa y la pasa al siguiente.
          </p>
          <div className="roles">
            <div className="rol">
              <b>01</b>
              <h3>Líderes de área</h3>
              <p>Reportan el personal y los visitantes que van a ingresar durante la semana.</p>
            </div>
            <div className="rol">
              <b>02</b>
              <h3>Recepción</h3>
              <p>Consolida lo que envían todas las áreas en una sola programación.</p>
            </div>
            <div className="rol">
              <b>03</b>
              <h3>Control 1</h3>
              <p>Revisa la programación consolidada y la autoriza.</p>
            </div>
            <div className="rol">
              <b>04</b>
              <h3>Portería</h3>
              <p>Verifica a cada persona al llegar y registra la entrada y la salida.</p>
            </div>
          </div>
        </section>

        <section id="programacion">
          <span className="fase">Antes de la visita</span>
          <h2>La programación semanal</h2>
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
                <div className="capturas">
                  {/* Captura 02 — formulario de programación semanal */}
                  <Marco />
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
                <div className="capturas">
                  {/* Captura 03 — consolidado por área */}
                  <Marco />
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
                  disponibles para la portería. Lo que no pasa por aquí, no entra.
                </p>
                <div className="capturas">
                  {/* Captura 04 — pantalla de validación de Control 1 */}
                  <Marco />
                </div>
              </div>
            </article>
          </div>
        </section>

        <div className="separador" role="presentation" />

        <section id="porteria">
          <span className="fase">El día del ingreso</span>
          <h2>En la portería</h2>
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
              </div>
            </article>

            <article className="paso">
              <div className="paso__num">5</div>
              <div className="paso__cuerpo">
                <p className="quien">Portería</p>
                <h3>Verificación en la app</h3>
                <p>
                  El vigilante busca el documento y recibe una de dos respuestas:{' '}
                  <span className="estado estado--ok">Autorizado</span> continúa al registro de ingreso;{' '}
                  <span className="estado estado--no">No autorizado</span> no ingresa hasta que el área responsable lo
                  programe.
                </p>
                <div className="capturas capturas--par">
                  {/* Captura 05 — resultado autorizado */}
                  <Marco />
                  {/* Captura 06 — resultado no autorizado */}
                  <Marco />
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
                <div className="capturas">
                  {/* Captura 07 — confirmación de ingreso con hora */}
                  <Marco />
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
                <div className="capturas">
                  {/* Captura 08 — personas dentro de la planta */}
                  <Marco />
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="casos">
          <span className="fase">Excepciones</span>
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
          <span className="fase">Trazabilidad</span>
          <h2>Qué queda registrado</h2>
          <p className="prosa">
            Cada ingreso y cada salida quedan con fecha, hora, documento, área responsable y quién autorizó. Con eso se
            responden tres preguntas en cualquier momento.
          </p>
          <div className="preguntas">
            <div className="pregunta">
              <b>Quién está dentro</b>
              Las personas que registraron ingreso y todavía no marcan salida.
            </div>
            <div className="pregunta">
              <b>Quién entró un día</b>
              El detalle de un día específico, con hora de entrada y de salida.
            </div>
            <div className="pregunta">
              <b>Quién respondía</b>
              El área que programó la visita y el rol que la autorizó.
            </div>
          </div>
          <div className="capturas">
            {/* Captura 09 — histórico de ingresos / reporte */}
            <Marco alto />
          </div>
        </section>

        <section className="cierre">
          <h2>¿Dudas con la app?</h2>
          <p>
            Escribe a la Dirección de Tecnología de Sirius con el caso, la hora y una captura de lo que viste en
            pantalla. Con eso se resuelve mucho más rápido.
          </p>
        </section>
      </main>
    </div>
  );
}
