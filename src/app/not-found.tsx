import { ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="bg-night-950 pt-40 pb-28 text-white">
      <div className="container-page max-w-2xl text-center">
        <p className="font-display text-7xl font-semibold text-bio-300">404</p>
        <h1 className="font-display mt-6 text-3xl font-semibold sm:text-4xl">Esta página no está en el camino</h1>
        <p className="mt-4 text-white/75">Puede que el enlace haya cambiado con el nuevo sitio. Te invitamos a volver al inicio.</p>
        <div className="mt-8">
          <ButtonLink href="/">Volver al inicio</ButtonLink>
        </div>
      </div>
    </section>
  );
}
