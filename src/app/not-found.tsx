import { Accent, ButtonLink, Dots } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="bg-sutileza pt-44 pb-28">
      <div className="container-page max-w-2xl text-center">
        <Dots className="justify-center [&>span]:size-4" />
        <p className="heading mt-6 text-8xl text-barranca">404</p>
        <h1 className="heading mt-6 text-4xl text-barranca sm:text-5xl">
          Esta página <Accent>no está</Accent> en el camino
        </h1>
        <p className="mt-4 text-lg text-ink/75">Puede que el enlace haya cambiado con el nuevo sitio. Te invitamos a volver al inicio.</p>
        <div className="mt-8">
          <ButtonLink href="/">Volver al inicio</ButtonLink>
        </div>
      </div>
    </section>
  );
}
