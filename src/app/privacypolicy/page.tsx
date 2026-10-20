import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { PageHero } from '@/components/ui';
import { contact } from '@/lib/content/site';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo Sirius Regenerative recopila, utiliza y protege tu información personal.',
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section data-reveal="up" className="border-t border-paper-200 pt-10">
      <h2 className="font-display text-2xl font-semibold text-night-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-night-900 [&_li]:pl-1 [&_strong]:text-night-900 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 [&_ul]:marker:text-bio-500">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Política de privacidad"
        text="Tu privacidad es importante para nosotros. Conoce cómo recopilamos, utilizamos y protegemos tu información personal."
        image="/img/fotos/textura-hoja.webp"
      />

      <div className="container-page max-w-4xl space-y-10 py-20 sm:py-28">
        <div data-reveal="up" className="space-y-4 text-lg leading-relaxed text-muted">
          <p>
            <strong className="text-night-900">Última actualización:</strong> 20 de abril de 2025
          </p>
          <p>
            Sirius Regenerative («nosotros», «nuestra», «nos») se compromete a proteger tu privacidad. Esta Política de Privacidad explica cómo
            recopilamos, utilizamos, divulgamos y salvaguardamos tu información cuando visitas nuestro sitio web y utilizas nuestros servicios.
          </p>
          <p>
            Por favor, lee esta política de privacidad cuidadosamente. Si no estás de acuerdo con sus términos, por favor abstente de utilizar
            nuestro sitio.
          </p>
        </div>

        <Section title="1. Información que recopilamos">
          <h3>Información personal</h3>
          <p>
            Podemos recopilar información personal que nos proporcionas voluntariamente al registrarte en el sitio, realizar una compra,
            suscribirte a nuestro boletín, responder a una encuesta, completar un formulario o comunicarte con nosotros. La información personal
            puede incluir:
          </p>
          <ul>
            <li>Nombre y apellidos</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Dirección postal</li>
            <li>Información de pago</li>
          </ul>
          <h3>Información derivada</h3>
          <p>Nuestro sitio web puede recopilar automáticamente cierta información sobre tu equipo y navegación, incluyendo:</p>
          <ul>
            <li>Dirección IP</li>
            <li>Tipo de navegador</li>
            <li>Páginas visitadas</li>
            <li>Tiempo de acceso</li>
            <li>Sistema operativo</li>
            <li>Proveedor de servicios de Internet</li>
            <li>Páginas de referencia y salida</li>
          </ul>
        </Section>

        <Section title="2. Cómo utilizamos tu información">
          <p>Podemos utilizar la información que recopilamos para:</p>
          <ul>
            <li>Procesar transacciones y enviar pedidos</li>
            <li>Enviar comunicaciones administrativas y de marketing</li>
            <li>Responder a consultas y solicitudes</li>
            <li>Mejorar nuestro sitio web y la experiencia del usuario</li>
            <li>Realizar análisis internos y desarrollar nuevos productos</li>
            <li>Administrar promociones, encuestas o concursos</li>
            <li>Prevenir actividades fraudulentas</li>
            <li>Cumplir con nuestras obligaciones legales</li>
          </ul>
        </Section>

        <Section title="3. Divulgación de tu información">
          <p>No vendemos, intercambiamos ni transferimos tu información personal a terceros sin tu consentimiento, excepto en las siguientes circunstancias:</p>
          <ul>
            <li>
              <strong>Proveedores de servicios:</strong> podemos compartir tu información con terceros que realizan servicios para nosotros, como
              procesamiento de pagos, envío de pedidos, análisis de datos y servicio al cliente.
            </li>
            <li>
              <strong>Requisitos legales:</strong> podemos divulgar tu información si estamos obligados a hacerlo por ley o en respuesta a
              solicitudes válidas de autoridades públicas.
            </li>
            <li>
              <strong>Protección de derechos:</strong> podemos divulgar información para proteger nuestros derechos, privacidad, seguridad o
              propiedad, o la de nuestros clientes y otros.
            </li>
            <li>
              <strong>Transacciones comerciales:</strong> en caso de fusión, adquisición o venta de activos, tu información personal puede ser
              transferida como parte de los activos de la empresa.
            </li>
          </ul>
        </Section>

        <Section title="4. Cookies y tecnologías de seguimiento">
          <p>
            Utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación, analizar el uso del sitio y personalizar el
            contenido. Puedes configurar tu navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie. Sin embargo,
            algunas funciones del sitio pueden no funcionar correctamente si las cookies están desactivadas.
          </p>
        </Section>

        <Section title="5. Seguridad de la información">
          <p>
            Implementamos medidas de seguridad razonables para mantener la seguridad de tu información personal. Sin embargo, ninguna transmisión
            por Internet o sistema de almacenamiento electrónico es completamente seguro, por lo que no podemos garantizar su seguridad absoluta.
          </p>
        </Section>

        <Section title="6. Tus derechos de privacidad">
          <p>Dependiendo de tu ubicación, es posible que tengas ciertos derechos relacionados con tu información personal, que pueden incluir:</p>
          <ul>
            <li>Acceder a tu información personal</li>
            <li>Corregir información inexacta</li>
            <li>Eliminar tu información personal</li>
            <li>Oponerte al procesamiento de tus datos</li>
            <li>Portabilidad de datos</li>
            <li>Retirar el consentimiento</li>
          </ul>
          <p>Para ejercer estos derechos, ponte en contacto con nosotros utilizando la información que aparece al final de esta política.</p>
        </Section>

        <Section title="7. Cambios a esta política">
          <p>
            Podemos actualizar nuestra política de privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva política en
            esta página y actualizando la fecha de «Última actualización».
          </p>
        </Section>

        <Section title="8. Contacto">
          <p>Si tienes preguntas o comentarios sobre esta política de privacidad, puedes contactarnos en:</p>
          <address className="rounded-3xl bg-paper-100 p-6 not-italic">
            <strong>Sirius Regenerative</strong>
            <br />
            {contact.address}
            <br />
            <a href={contact.mailto} className="text-brand-600 hover:underline">
              {contact.email}
            </a>
            <br />
            <a href={contact.phones[0].href} className="text-brand-600 hover:underline">
              {contact.phones[0].label}
            </a>
          </address>
        </Section>
      </div>
    </>
  );
}
