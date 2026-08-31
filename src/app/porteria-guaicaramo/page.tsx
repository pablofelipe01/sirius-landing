import type { Metadata } from 'next';

/**
 * Ruta privada: no se enlaza desde el navbar, el footer ni el landing.
 *
 * Marcos de captura pendientes (todas son pantallas de las apps, sin personas).
 * Para llenar uno, reemplazar `<div className="marco__lienzo" />` por un
 * `<img src="/porteria/NN-nombre.png" alt="" />`; el recorte ya lo resuelve el CSS.
 *
 *   01  Guaicaramo Visitas — pantalla de entrada .............. /home.jpeg
 *   02  Guaicaramo Visitas — registrar visitante ...... /Registro-Visitantes.jpeg
 *   03  Guaicaramo Visitas — bandeja de autorización ..... /Autoriza Visita.jpeg
 *   04  Guaicaramo Portería — consulta ............. /Guaicaramo Porteria.jpeg
 *   05  Guaicaramo Portería — autorizado ........... /Consulta Autorizado.jpeg
 *   06  Guaicaramo Portería — sin autorización . /Consulta No autorizado.jpeg
 *   07  Registros de visitas / histórico ......................... pendiente
 */

export const metadata: Metadata = {
  title: 'Registro y Control de Visitantes — Guaicaramo',
  description:
    'Cómo se registra, se autoriza y se controla el ingreso de visitantes a la plantación de Guaicaramo.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

body:has(.doc-porteria) > nav,
body:has(.doc-porteria) > footer { display: none !important; }
body:has(.doc-porteria) { background: #F9F7EB; }

.doc-porteria{
  /* Paleta tomada de guaicaramo.com */
  --crema:#F9F7EB;
  --crema-2:#F9F8F0;
  --arena:#EBE8D5;
  --verde-claro:#E8ECDB;
  --verde:#38562F;
  --oliva:#7A9D4B;
  --oliva-fuerte:#88A60B;
  --tierra:#AA6B39;
  --naranja:#E28909;
  --rojo:#E94C28;
  --texto:#6C6C64;
  --texto-suave:#8E8E86;
  --hair:rgba(56,86,47,.14);
  --hair-suave:rgba(56,86,47,.08);
  --sombra:0 2px 4px rgba(56,86,47,.04), 0 14px 34px -18px rgba(56,86,47,.28);
  background:var(--crema);
  color:var(--texto);
  font-family:"Poppins","Helvetica Neue",Arial,sans-serif;
  font-size:16.5px;
  font-weight:400;
  line-height:1.68;
  -webkit-font-smoothing:antialiased;
  -webkit-text-size-adjust:100%;
}
.doc-porteria *{box-sizing:border-box}
.doc-porteria .pagina{max-width:1140px;margin:0 auto;padding:0 32px 120px}
.doc-porteria .prosa{max-width:62ch}
.doc-porteria a{color:var(--oliva);text-decoration:none}
.doc-porteria a:hover{color:var(--rojo)}
.doc-porteria a:focus-visible{outline:2px solid var(--oliva);outline-offset:4px;border-radius:4px}
.doc-porteria h1,.doc-porteria h2,.doc-porteria h3{color:var(--verde);text-wrap:balance}

/* ---------- Portada ---------- */
.doc-porteria .portada{padding:76px 0 0}
.doc-porteria .marca{
  display:inline-flex;align-items:center;gap:9px;
  font-size:.74rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;
  color:var(--verde);background:var(--verde-claro);
  border-radius:50px;padding:7px 18px;margin:0 0 28px;
}
.doc-porteria .marca span{color:var(--oliva);font-weight:500}
.doc-porteria .marca i{display:block;width:8px;height:8px;border-radius:50%;background:var(--oliva-fuerte);font-style:normal}
.doc-porteria h1{
  font-size:clamp(2.4rem,5.6vw,3.9rem);
  line-height:1.1;
  font-weight:700;
  letter-spacing:-.02em;
  margin:0 0 20px;
  max-width:16ch;
}
.doc-porteria .bajada{
  font-size:clamp(1.05rem,2vw,1.3rem);
  font-weight:400;
  line-height:1.6;
  color:var(--oliva);
  max-width:44ch;
  margin:0 0 40px;
}
.doc-porteria .dato{
  display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;
  margin:0 0 44px;padding:0;list-style:none;
}
.doc-porteria .dato li{
  background:var(--crema-2);border:1px solid var(--hair-suave);
  border-radius:16px;padding:18px 22px;
}
.doc-porteria .dato b{
  display:block;font-size:.68rem;font-weight:600;letter-spacing:.11em;
  text-transform:uppercase;color:var(--oliva);margin-bottom:6px;
}
.doc-porteria .dato span{font-size:1rem;font-weight:500;color:var(--verde)}

.doc-porteria .separador{margin:84px 0 0;height:1px;background:var(--hair)}

/* ---------- Índice ---------- */
.doc-porteria .indice{margin:52px 0 0;padding:0;list-style:none;counter-reset:idx}
.doc-porteria .indice li{border-bottom:1px solid var(--hair-suave)}
.doc-porteria .indice li:first-child{border-top:1px solid var(--hair-suave)}
.doc-porteria .indice a{
  display:grid;grid-template-columns:44px 1fr auto;align-items:baseline;gap:0 8px;
  padding:16px 4px;font-weight:500;color:var(--verde);
  transition:color .18s ease,padding-left .18s ease;
}
.doc-porteria .indice a::before{
  counter-increment:idx;content:counter(idx,decimal-leading-zero);
  font-size:.76rem;font-weight:600;color:var(--oliva);letter-spacing:.06em;
}
.doc-porteria .indice a:hover{color:var(--rojo);padding-left:8px}
.doc-porteria .indice em{font-style:normal;color:var(--texto-suave);font-size:.85rem;font-weight:400}

/* ---------- Secciones ---------- */
.doc-porteria section{padding-top:84px}
.doc-porteria .fase{
  display:inline-block;font-size:.68rem;font-weight:600;letter-spacing:.12em;
  text-transform:uppercase;color:var(--oliva);
  background:var(--verde-claro);border-radius:50px;padding:6px 16px;margin-bottom:16px;
}
.doc-porteria h2{
  font-size:clamp(1.6rem,3vw,2.1rem);line-height:1.2;letter-spacing:-.015em;
  font-weight:800;margin:0 0 14px;max-width:22ch;
}
.doc-porteria h3{font-size:1.05rem;font-weight:600;margin:0 0 8px}
.doc-porteria p{margin:0 0 16px}

/* ---------- Perfiles ---------- */
.doc-porteria .roles{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:32px 0 0}
.doc-porteria .rol{
  padding:24px 22px 26px;background:var(--crema-2);
  border:1px solid var(--hair-suave);border-radius:18px;
}
.doc-porteria .rol b{
  display:inline-block;font-size:.64rem;font-weight:600;letter-spacing:.1em;
  text-transform:uppercase;color:var(--tierra);
  background:rgba(170,107,57,.10);border-radius:50px;padding:4px 12px;margin-bottom:16px;
}
.doc-porteria .rol h3{margin-bottom:8px;font-size:1.12rem;font-weight:700}
.doc-porteria .rol p{margin:0;font-size:.9rem;line-height:1.6}

/* ---------- Aplicaciones ---------- */
.doc-porteria .apps{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin:32px 0 0}
.doc-porteria .app{
  padding:30px 30px 32px;background:var(--verde-claro);
  border:1px solid var(--hair-suave);border-radius:22px;
}
.doc-porteria .app b{
  display:inline-block;font-size:.64rem;font-weight:600;letter-spacing:.1em;
  text-transform:uppercase;color:#fff;background:var(--verde);
  border-radius:50px;padding:5px 14px;margin-bottom:14px;
}
.doc-porteria .app h3{margin-bottom:10px;font-size:1.3rem;font-weight:700}
.doc-porteria .app p{margin:0;font-size:.94rem}
.doc-porteria .app ul{margin:16px 0 0;padding:0;list-style:none}
.doc-porteria .app li{
  font-size:.88rem;padding:9px 0 9px 20px;position:relative;
  border-top:1px solid rgba(56,86,47,.10);
}
.doc-porteria .app li::before{
  content:"";position:absolute;left:2px;top:18px;
  width:7px;height:7px;border-radius:50%;background:var(--oliva-fuerte);
}

/* ---------- Pasos ---------- */
.doc-porteria .pasos{margin:40px 0 0}
.doc-porteria .paso{position:relative;display:grid;grid-template-columns:46px 1fr;gap:0 28px;padding-bottom:52px}
.doc-porteria .paso::before{
  content:"";position:absolute;left:22px;top:50px;bottom:6px;width:2px;
  background:var(--verde-claro);border-radius:2px;
}
.doc-porteria .paso:last-child{padding-bottom:0}
.doc-porteria .paso:last-child::before{display:none}
.doc-porteria .paso__num{
  width:46px;height:46px;border-radius:50%;background:var(--verde);
  color:#fff;display:grid;place-items:center;font-weight:600;font-size:1rem;
}
.doc-porteria .paso__cuerpo{padding-top:8px;min-width:0}
.doc-porteria .quien{
  display:inline-block;font-size:.66rem;font-weight:600;letter-spacing:.1em;
  text-transform:uppercase;color:var(--verde);
  background:var(--verde-claro);border-radius:50px;padding:5px 14px;margin:0 0 14px;
}
.doc-porteria .paso h3{font-size:1.2rem;font-weight:700;margin-bottom:10px}
.doc-porteria .paso p{max-width:60ch;margin-bottom:0}
.doc-porteria .campos{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 0;padding:0;list-style:none}
.doc-porteria .campos li{
  font-size:.8rem;color:var(--verde);background:var(--crema-2);
  border:1px solid var(--hair-suave);border-radius:50px;padding:5px 14px;
}

/* ---------- Estados ---------- */
.doc-porteria .estado{
  display:inline-block;font-size:.78rem;font-weight:600;padding:2px 12px;
  border-radius:50px;white-space:nowrap;
}
.doc-porteria .estado--ok{background:rgba(122,157,75,.16);color:#4E7028}
.doc-porteria .estado--no{background:rgba(233,76,40,.12);color:var(--rojo)}

/* ---------- Marcos de captura ---------- */
.doc-porteria .capturas{display:grid;gap:20px;margin:26px 0 0}
.doc-porteria .capturas--par{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}
.doc-porteria .capturas--tres{grid-template-columns:repeat(3,minmax(0,1fr));align-items:start}
.doc-porteria figure{margin:0;min-width:0}
.doc-porteria .marco{
  background:#fff;border:1px solid var(--hair-suave);
  border-radius:18px;overflow:hidden;box-shadow:var(--sombra);
}
.doc-porteria .marco__barra{
  display:flex;align-items:center;gap:6px;height:32px;padding:0 14px;
  border-bottom:1px solid var(--hair-suave);background:var(--crema-2);
}
.doc-porteria .marco__barra i{width:8px;height:8px;border-radius:50%;background:rgba(56,86,47,.18)}
.doc-porteria .marco__lienzo{
  aspect-ratio:16/10;background:var(--crema-2);
  background-image:repeating-linear-gradient(135deg,transparent 0 11px,rgba(56,86,47,.05) 11px 12px);
}
.doc-porteria .marco--alto .marco__lienzo{aspect-ratio:16/7}
.doc-porteria .marco--movil{max-width:290px;border-radius:22px}
.doc-porteria .marco--movil .marco__lienzo{aspect-ratio:9/16}
.doc-porteria .marco img{display:block;width:100%;height:auto}

/* ---------- Casos ---------- */
.doc-porteria .casos{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:32px 0 0}
.doc-porteria .caso{
  padding:22px 24px 24px;background:var(--crema-2);
  border:1px solid var(--hair-suave);border-radius:18px;
}
.doc-porteria .caso h3{margin:0 0 8px;font-size:1.02rem;font-weight:600}
.doc-porteria .caso p{margin:0;font-size:.92rem}

/* ---------- Trazabilidad ---------- */
.doc-porteria .traza{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:32px 0 0}
.doc-porteria .traza div{
  padding:24px;background:var(--arena);border-radius:18px;font-size:.92rem;
}
.doc-porteria .traza b{display:block;color:var(--verde);font-weight:700;margin-bottom:6px;font-size:1rem}
.doc-porteria .nota{margin:20px 0 0;font-size:.86rem;color:var(--texto-suave);max-width:60ch}

/* ---------- Cierre ---------- */
.doc-porteria .cierre{
  margin-top:92px;padding:48px 44px;background:var(--verde);color:#fff;border-radius:24px;
}
.doc-porteria .cierre h2{color:#fff;margin-bottom:14px;font-size:1.6rem}
.doc-porteria .cierre p{color:rgba(255,255,255,.80);max-width:58ch;margin:0}

@media (max-width:1024px){
  .doc-porteria .roles{grid-template-columns:repeat(2,1fr)}
  .doc-porteria .capturas--tres{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:860px){
  .doc-porteria .traza,.doc-porteria .apps,.doc-porteria .casos{grid-template-columns:1fr}
  .doc-porteria .dato{grid-template-columns:1fr}
}
@media (max-width:720px){
  .doc-porteria{font-size:16px}
  .doc-porteria .pagina{padding:0 20px 88px}
  .doc-porteria .portada{padding-top:52px}
  .doc-porteria .roles,.doc-porteria .capturas--par,.doc-porteria .capturas--tres{grid-template-columns:1fr}
  .doc-porteria .paso{grid-template-columns:36px 1fr;gap:0 18px;padding-bottom:42px}
  .doc-porteria .paso__num{width:36px;height:36px;font-size:.88rem}
  .doc-porteria .paso::before{left:17px;top:40px}
  .doc-porteria .paso__cuerpo{padding-top:4px}
  .doc-porteria section{padding-top:62px}
  .doc-porteria .app{padding:24px 22px 26px}
  .doc-porteria .cierre{padding:34px 26px;border-radius:20px}
}
@media print{
  .doc-porteria{background:#fff;font-size:11pt}
  .doc-porteria .indice{display:none}
  .doc-porteria .paso,.doc-porteria figure,.doc-porteria .caso,.doc-porteria .rol,.doc-porteria .app{break-inside:avoid}
  .doc-porteria .marco{box-shadow:none}
  .doc-porteria .cierre{background:#fff;color:var(--verde);border:1px solid var(--hair)}
  .doc-porteria .cierre h2{color:var(--verde)}
  .doc-porteria .cierre p{color:var(--texto)}
}
/* ---------- Cifras ---------- */
.doc-porteria .cifras{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:32px 0 0}
.doc-porteria .cifra{padding:26px 24px;background:var(--verde-claro);border-radius:18px}
.doc-porteria .cifra strong{
  display:block;font-size:clamp(1.9rem,3.4vw,2.5rem);font-weight:800;
  line-height:1.1;color:var(--verde);letter-spacing:-.02em;margin-bottom:6px;
}
.doc-porteria .cifra span{
  display:block;font-size:.78rem;font-weight:600;letter-spacing:.08em;
  text-transform:uppercase;color:var(--oliva);
}
.doc-porteria .pie{margin:16px 0 0;font-size:.84rem;color:var(--texto-suave);max-width:70ch}

/* ---------- Restriccion y respuesta ---------- */
.doc-porteria .contraste{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin:32px 0 0}
.doc-porteria .bloque{padding:30px 30px 32px;border-radius:22px;border:1px solid var(--hair-suave)}
.doc-porteria .bloque--limite{background:var(--arena)}
.doc-porteria .bloque--respuesta{background:var(--verde-claro)}
.doc-porteria .bloque b{
  display:inline-block;font-size:.64rem;font-weight:600;letter-spacing:.1em;
  text-transform:uppercase;border-radius:50px;padding:5px 14px;margin-bottom:14px;
}
.doc-porteria .bloque--limite b{color:#fff;background:var(--tierra)}
.doc-porteria .bloque--respuesta b{color:#fff;background:var(--verde)}
.doc-porteria .bloque h3{margin-bottom:10px;font-size:1.25rem;font-weight:700}
.doc-porteria .bloque p{margin:0;font-size:.94rem}
.doc-porteria .bloque p + p{margin-top:12px}

@media (max-width:1024px){
  .doc-porteria .cifras{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:860px){
  .doc-porteria .contraste{grid-template-columns:1fr}
}

`;

function Marco({
  src,
  alt = '',
  alto = false,
  movil = false,
  barra = true,
}: {
  src?: string;
  alt?: string;
  alto?: boolean;
  movil?: boolean;
  barra?: boolean;
}) {
  const clases = ['marco', alto ? 'marco--alto' : '', movil ? 'marco--movil' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <figure>
      <div className={clases}>
        {barra && (
          <div className="marco__barra" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {src ? <img src={src} alt={alt} /> : <div className="marco__lienzo" />}
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
            Guaicaramo <span>· Control de Visitantes</span>
          </p>
          <h1>Registro y Control de Visitantes</h1>
          <p className="bajada">
            Quién entra a la plantación, quién lo autorizó y a qué hora entró y salió.
          </p>
          <ul className="dato">
            <li>
              <b>En operación desde</b>
              <span>26 de mayo de 2026</span>
            </li>
            <li>
              <b>Alcance</b>
              <span>Visitantes de la plantación</span>
            </li>
            <li>
              <b>Punto de control</b>
              <span>Control&nbsp;1</span>
            </li>
          </ul>

          {/* Captura 01 — Guaicaramo Visitas, pantalla de entrada */}
          <Marco src="/home.jpeg" alt="Pantalla de entrada de Guaicaramo Visitas" />
        </header>

        <div className="separador" role="presentation" />

        <nav aria-label="Contenido de la página">
          <ul className="indice">
            <li>
              <a href="#problema">
                El punto de partida <em>Cómo se controlaba antes</em>
              </a>
            </li>
            <li>
              <a href="#mesh">
                Por qué una red mesh <em>La restricción y la respuesta</em>
              </a>
            </li>
            <li>
              <a href="#perfiles">
                Los cuatro perfiles <em>Quién hace qué</em>
              </a>
            </li>
            <li>
              <a href="#aplicaciones">
                Las dos aplicaciones <em>Visitas y Portería</em>
              </a>
            </li>
            <li>
              <a href="#recorrido">
                El recorrido de una visita <em>Del registro a la salida</em>
              </a>
            </li>
            <li>
              <a href="#casos">
                Excepciones y contingencia <em>4 situaciones</em>
              </a>
            </li>
            <li>
              <a href="#registro">
                Qué queda registrado <em>Trazabilidad</em>
              </a>
            </li>
            <li>
              <a href="#resultados">
                Lo que cambió <em>Cifras en operación</em>
              </a>
            </li>
          </ul>
        </nav>

        <section id="problema">
          <span className="fase">El punto de partida</span>
          <h2>Nadie sabía con certeza quién estaba adentro</h2>
          <p className="prosa">
            Antes de este sistema no existía un control formal de visitantes. Lo que había era una mezcla: la minuta
            en papel de la portería, llamadas por radio al área para confirmar a quien llegaba, y listas sueltas en
            Excel y WhatsApp. Cada ingreso dependía de que alguien contestara.
          </p>
          <div className="casos">
            <div className="caso">
              <h3>Sin saber quién estaba dentro</h3>
              <p>
                En un momento cualquiera del día no había forma de responder cuántas personas ajenas había en la
                plantación ni quiénes eran.
              </p>
            </div>
            <div className="caso">
              <h3>La barrera se demoraba</h3>
              <p>
                El visitante esperaba en el punto de control mientras el vigilante confirmaba por radio o por teléfono
                con el área que lo esperaba.
              </p>
            </div>
            <div className="caso">
              <h3>Sin trazabilidad</h3>
              <p>
                Después no se podía reconstruir quién entró, a qué hora, a qué proceso ni con la autorización de
                quién.
              </p>
            </div>
            <div className="caso">
              <h3>Sin exigencia externa</h3>
              <p>
                Ninguna auditoría ni certificación lo pidió: el sistema nació por iniciativa del área, al ver el
                hueco de control.
              </p>
            </div>
          </div>
        </section>

        <section id="mesh">
          <span className="fase">Por qué una red mesh</span>
          <h2>El control se decide donde no hay señal</h2>
          <p className="prosa">
            La decisión de dejar entrar o no se toma en la barrera, y la barrera es el punto con peor conectividad de
            la operación. Un sistema que dependiera de internet habría dejado sin control el único lugar donde el
            control importa.
          </p>
          <div className="contraste">
            <div className="bloque bloque--limite">
              <b>La restricción</b>
              <h3>En la portería no hay red</h3>
              <p>
                No hay señal celular confiable, no llega el wifi ni la fibra de la empresa, y lo poco que había se
                caía a cada rato.
              </p>
              <p>
                Con una aplicación atada a la nube, cada caída de señal habría devuelto la portería al papel y al
                radio.
              </p>
            </div>
            <div className="bloque bloque--respuesta">
              <b>La respuesta</b>
              <h3>Una malla propia hasta la barrera</h3>
              <p>
                Nodos enlazados entre sí llevan la información desde el punto de control hasta donde sí hay internet.
                El portero consulta y registra sin depender de la señal de la zona.
              </p>
              <p>
                Si la conexión se pierde por completo, lo que hace el portero queda en cola y se sincroniza cuando el
                servicio vuelve.
              </p>
            </div>
          </div>
          <p className="pie">
            La malla la montó en campo el mismo equipo que desarrolló las aplicaciones, y queda como infraestructura
            para otros sistemas: está proyectada para rastreo de rutas y para consultas que funcionen sin internet.
          </p>
        </section>

        <section id="perfiles">
          <span className="fase">Los cuatro perfiles</span>
          <h2>Quién hace qué</h2>
          <p className="prosa">
            El sistema separa a quien invita, a quien autoriza y a quien deja entrar. Ninguna de las tres cosas la
            resuelve una sola persona, y la barrera no decide: confirma lo que ya fue autorizado.
          </p>
          <div className="roles">
            <div className="rol">
              <b>Registra la visita</b>
              <h3>Invita</h3>
              <p>Las personas que registran al visitante que van a recibir, con sus datos y sus acompañantes.</p>
            </div>
            <div className="rol">
              <b>Aprueba el ingreso</b>
              <h3>Autoriza</h3>
              <p>Alta gerencia y los jefes de proceso. Autorizan o deniegan; sin su aprobación el visitante no entra.</p>
            </div>
            <div className="rol">
              <b>Superadministrador</b>
              <h3>Recepción</h3>
              <p>Ve todas las visitas del sistema, de todos los procesos.</p>
            </div>
            <div className="rol">
              <b>Verifica en la barrera</b>
              <h3>Portería</h3>
              <p>Consulta a quien llega y registra la hora de ingreso y la de salida en Control&nbsp;1.</p>
            </div>
          </div>
        </section>

        <section id="aplicaciones">
          <span className="fase">Las dos aplicaciones</span>
          <h2>Una para la oficina, otra para la barrera</h2>
          <p className="prosa">
            Están separadas porque el problema es distinto en cada punto: en la oficina hay red; en la barrera, muchas
            veces no.
          </p>
          <div className="apps">
            <div className="app">
              <b>Aplicación web</b>
              <h3>Guaicaramo Visitas</h3>
              <p>Es donde se registra la visita, se aprueba y se consulta lo que ha pasado.</p>
              <ul>
                <li>Invita — registra al visitante y a sus acompañantes</li>
                <li>Autoriza — aprueba el ingreso y recibe las solicitudes</li>
                <li>Recepción — ve todas las visitas</li>
              </ul>
            </div>
            <div className="app">
              <b>Aplicación móvil · Control 1</b>
              <h3>Guaicaramo Portería</h3>
              <p>
                Instalada en el punto de control. Se conecta por red mesh, así que el portero puede consultar aunque en
                la zona no haya señal celular ni wifi.
              </p>
              <ul>
                <li>Consulta por cédula o por placa</li>
                <li>Responde autorizado o no autorizado</li>
                <li>Registra el ingreso y la salida</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="separador" role="presentation" />

        <section id="recorrido">
          <span className="fase">El recorrido de una visita</span>
          <h2>Del registro a la salida</h2>
          <p className="prosa">
            Una visita pasa por tres manos antes de que se abra la barrera, y por una cuarta cuando sale.
          </p>

          <div className="pasos">
            <article className="paso">
              <div className="paso__num">1</div>
              <div className="paso__cuerpo">
                <p className="quien">Invita</p>
                <h3>Se registra la visita</h3>
                <p>
                  Quien recibe al visitante lo registra en Guaicaramo Visitas, con sus datos, cómo llega y hasta
                  cuándo necesita el ingreso. Los acompañantes se agregan con cédula y nombre propios, no como un número.
                </p>
                <ul className="campos">
                  <li>Cédula</li>
                  <li>Nombre completo</li>
                  <li>Vehículo o a pie</li>
                  <li>Placa</li>
                  <li>Proceso de destino</li>
                  <li>Motivo de la visita</li>
                  <li>Fecha de vencimiento</li>
                  <li>Acompañantes</li>
                </ul>
                <div className="capturas">
                  {/* Captura 02 — Guaicaramo Visitas, registrar visitante */}
                  <Marco src="/Registro-Visitantes.jpeg" alt="Formulario de registro de visitante en Guaicaramo Visitas" />
                </div>
              </div>
            </article>

            <article className="paso">
              <div className="paso__num">2</div>
              <div className="paso__cuerpo">
                <p className="quien">Autoriza</p>
                <h3>Se aprueba el ingreso</h3>
                <p>
                  Alta gerencia o el jefe del proceso de destino revisa las visitas pendientes y las autoriza o las
                  deniega. La autorización tiene fecha de vencimiento y deja de estar vigente a las 5:00 PM de ese día.
                </p>
                <div className="capturas">
                  {/* Captura 03 — Guaicaramo Visitas, bandeja de autorización */}
                  <Marco
                    src="/Autoriza%20Visita.jpeg"
                    alt="Bandeja de visitas pendientes por autorizar en Guaicaramo Visitas"
                  />
                </div>
              </div>
            </article>

            <article className="paso">
              <div className="paso__num">3</div>
              <div className="paso__cuerpo">
                <p className="quien">Portería</p>
                <h3>Consulta en Control 1</h3>
                <p>
                  Guaicaramo Portería abre directo en la consulta. Cuando el visitante llega, el portero busca por
                  cédula o por placa y la app responde{' '}
                  <span className="estado estado--ok">Autorizado</span> o{' '}
                  <span className="estado estado--no">No autorizado</span>. La consulta funciona por red mesh, sin
                  depender de la señal en la zona.
                </p>
                <div className="capturas capturas--tres">
                  {/* Captura 04 — Guaicaramo Portería, pantalla de consulta */}
                  <Marco
                    src="/Guaicaramo%20Porteria.jpeg"
                    alt="Pantalla de consulta por cédula y placa en Guaicaramo Portería"
                    movil
                    barra={false}
                  />
                  {/* Captura 05 — Guaicaramo Portería, resultado autorizado */}
                  <Marco
                    src="/Consulta%20Autorizado.jpeg"
                    alt="Resultado autorizado en Guaicaramo Portería"
                    movil
                    barra={false}
                  />
                  {/* Captura 06 — Guaicaramo Portería, resultado sin autorización */}
                  <Marco
                    src="/Consulta%20No%20autorizado.jpeg"
                    alt="Resultado sin autorización en Guaicaramo Portería"
                    movil
                    barra={false}
                  />
                </div>
              </div>
            </article>

            <article className="paso">
              <div className="paso__num">4</div>
              <div className="paso__cuerpo">
                <p className="quien">Portería</p>
                <h3>Ingreso a la plantación</h3>
                <p>
                  Sobre el resultado autorizado, el portero registra la entrada y queda la hora. Antes de entrar, el
                  visitante autoriza el tratamiento de sus datos personales: es condición para ingresar a la
                  plantación.
                </p>
              </div>
            </article>

            <article className="paso">
              <div className="paso__num">5</div>
              <div className="paso__cuerpo">
                <p className="quien">Portería</p>
                <h3>Registro de salida</h3>
                <p>
                  Al salir, el portero marca la salida. Con eso se sabe en cualquier momento del día quiénes siguen
                  dentro de la plantación.
                </p>
                <div className="capturas">
                  {/* Captura 06 — histórico de ingresos y salidas */}
                  <Marco alto />
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="casos">
          <span className="fase">Excepciones y contingencia</span>
          <h2>Cuando el caso no es el normal</h2>
          <div className="casos">
            <div className="caso">
              <h3>El visitante sale sin autorización</h3>
              <p>
                El portero no puede autorizar el ingreso. La app notifica en Guaicaramo Visitas para que se resuelva, y
                la decisión le llega al portero en la misma pantalla.
              </p>
            </div>
            <div className="caso">
              <h3>Llega después del vencimiento</h3>
              <p>
                Pasadas las 5:00 PM del día de vencimiento la autorización deja de estar vigente y se requiere una
                nueva.
              </p>
            </div>
            <div className="caso">
              <h3>Se cae la red o la energía</h3>
              <p>El registro se lleva en el formato físico de respaldo del punto de control.</p>
            </div>
            <div className="caso">
              <h3>Contratistas y personal propio</h3>
              <p>No se controlan por este sistema. El alcance actual son los visitantes de la plantación.</p>
            </div>
          </div>
        </section>

        <section id="registro">
          <span className="fase">Trazabilidad</span>
          <h2>Qué queda registrado</h2>
          <p className="prosa">
            Cada visita deja una cadena completa: quién la pidió, quién la aprobó y qué pasó en la barrera.
          </p>
          <div className="traza">
            <div>
              <b>La visita</b>
              Cédula, nombre, acompañantes, proceso de destino, motivo, placa si llega en vehículo y fecha de
              vencimiento.
            </div>
            <div>
              <b>Las responsabilidades</b>
              Quién registró la visita y quién la autorizó.
            </div>
            <div>
              <b>El movimiento</b>
              Hora de ingreso y hora de salida en Control&nbsp;1.
            </div>
          </div>
          <p className="nota">El sistema no guarda el dispositivo desde el que se hizo cada acción.</p>
        </section>

        <section id="resultados">
          <span className="fase">Lo que cambió</span>
          <h2>Un control que se puede demostrar</h2>
          <p className="prosa">
            Hoy se sabe en cualquier momento quién está dentro de la plantación, la barrera resuelve sin llamar a
            nadie, cada ingreso tiene un responsable con nombre y el histórico es consultable hacia atrás.
          </p>
          <div className="cifras">
            <div className="cifra">
              <strong>1.581</strong>
              <span>Visitantes registrados</span>
            </div>
            <div className="cifra">
              <strong>1.003</strong>
              <span>Registros de visitas</span>
            </div>
            <div className="cifra">
              <strong>1.538</strong>
              <span>Ingresos autorizados</span>
            </div>
            <div className="cifra">
              <strong>42</strong>
              <span>Ingresos rechazados</span>
            </div>
          </div>
          <p className="pie">Acumulado desde el 26 de mayo de 2026.</p>
        </section>

        <section className="cierre">
          <h2>¿Dudas o fallas con el sistema?</h2>
          <p>
            El sistema fue desarrollado por Pablo Acebedo y David Hernández. Repórtales el caso con la hora y una
            captura de lo que viste en pantalla.
          </p>
        </section>
      </main>
    </div>
  );
}
