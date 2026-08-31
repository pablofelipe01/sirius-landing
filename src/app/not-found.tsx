import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-32 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-300">404</p>
        <h1 className="mt-4 text-4xl font-black">Página no encontrada</h1>
        <p className="mt-4 text-slate-200">
          La ruta que estás buscando no existe o fue movida.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-green-500 px-6 py-3 font-bold text-white transition hover:bg-green-600"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
