'use client';

/**
 * Relleno del formulario por nota de voz.
 *
 * El navegador convierte la voz en texto (Web Speech API) y el texto se manda
 * al servidor para que Claude lo separe en campos. Los campos llenos SIEMPRE se
 * devuelven al formulario para que la persona los revise antes de enviar: en un
 * stand con ruido, dictar un correo falla seguido y nadie deberia quedar
 * registrado con un dato mal entendido.
 *
 * Si el navegador no soporta reconocimiento de voz (Firefox, versiones viejas)
 * el bloque no se muestra y queda el formulario escrito, que es el principal.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CamposDictados } from '@/lib/palma/dictado';

type Estado =
  | { fase: 'inactivo' }
  | { fase: 'escuchando' }
  | { fase: 'procesando' }
  | { fase: 'listo'; camposLlenados: number }
  | { fase: 'error'; mensaje: string };

const MENSAJES_ERROR: Record<string, string> = {
  'not-allowed': 'Necesitamos permiso para usar el micrófono. Actívalo e intenta de nuevo.',
  'service-not-allowed': 'Necesitamos permiso para usar el micrófono. Actívalo e intenta de nuevo.',
  'no-speech': 'No escuchamos nada. Acércate al micrófono e intenta de nuevo.',
  'audio-capture': 'No encontramos el micrófono de este dispositivo.',
  network: 'Sin conexión para transcribir. Revisa la señal o llena el formulario a mano.',
};

export default function DictadoVoz({
  onCamposDetectados,
}: {
  onCamposDetectados: (campos: CamposDictados) => void;
}) {
  const [soportado, setSoportado] = useState(false);
  const [estado, setEstado] = useState<Estado>({ fase: 'inactivo' });
  const [transcripcion, setTranscripcion] = useState('');

  const reconocimientoRef = useRef<SpeechRecognition | null>(null);
  /** Texto confirmado por el reconocedor; lo interino se muestra pero no se acumula. */
  const finalRef = useRef('');
  /** Evita procesar dos veces cuando `stop()` y `onend` se disparan juntos. */
  const procesandoRef = useRef(false);

  // La deteccion va en un efecto para no romper la hidratacion: en el servidor
  // no existe `window` y el marcado inicial debe coincidir.
  useEffect(() => {
    const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSoportado(Boolean(Reconocimiento));
  }, []);

  const procesar = useCallback(
    async (texto: string) => {
      const limpio = texto.trim();

      if (limpio.length < 10) {
        setEstado({
          fase: 'error',
          mensaje: 'No alcanzamos a escuchar tus datos. Intenta de nuevo.',
        });
        return;
      }

      setEstado({ fase: 'procesando' });

      try {
        const response = await fetch('/api/palma/dictado', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcripcion: limpio }),
        });
        const data = await response.json();

        if (!response.ok) {
          setEstado({
            fase: 'error',
            mensaje: data?.message || 'No pudimos entender la grabación.',
          });
          return;
        }

        const campos = data.campos as CamposDictados;
        const camposLlenados = Object.values(campos).filter(Boolean).length;

        if (camposLlenados === 0) {
          setEstado({
            fase: 'error',
            mensaje: 'No identificamos ningún dato. Intenta de nuevo o escríbelos abajo.',
          });
          return;
        }

        onCamposDetectados(campos);
        setEstado({ fase: 'listo', camposLlenados });
      } catch {
        setEstado({ fase: 'error', mensaje: 'Revisa tu conexión e intenta de nuevo.' });
      }
    },
    [onCamposDetectados]
  );

  const detener = useCallback(() => {
    reconocimientoRef.current?.stop();
  }, []);

  const iniciar = useCallback(() => {
    const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Reconocimiento) return;

    finalRef.current = '';
    procesandoRef.current = false;
    setTranscripcion('');
    setEstado({ fase: 'escuchando' });

    const reconocimiento = new Reconocimiento();
    reconocimiento.lang = 'es-CO';
    reconocimiento.continuous = true;
    reconocimiento.interimResults = true;
    reconocimiento.maxAlternatives = 1;

    reconocimiento.onresult = (event) => {
      let interino = '';

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const resultado = event.results[i];
        if (resultado.isFinal) {
          finalRef.current += `${resultado[0].transcript} `;
        } else {
          interino += resultado[0].transcript;
        }
      }

      setTranscripcion(`${finalRef.current}${interino}`.trim());
    };

    reconocimiento.onerror = (event) => {
      // 'no-speech' con texto ya capturado no es un error real: se procesa igual.
      if (event.error === 'no-speech' && finalRef.current.trim().length >= 10) return;
      procesandoRef.current = true;
      setEstado({
        fase: 'error',
        mensaje: MENSAJES_ERROR[event.error] || 'No pudimos usar el micrófono. Escribe tus datos abajo.',
      });
    };

    reconocimiento.onend = () => {
      if (procesandoRef.current) return;
      procesandoRef.current = true;
      void procesar(finalRef.current);
    };

    reconocimientoRef.current = reconocimiento;
    reconocimiento.start();
  }, [procesar]);

  // Si la persona navega o cierra mientras graba, se corta el reconocimiento.
  useEffect(() => {
    return () => reconocimientoRef.current?.abort();
  }, []);

  if (!soportado) return null;

  const escuchando = estado.fase === 'escuchando';
  const procesandoAhora = estado.fase === 'procesando';

  return (
    <section className="rounded-3xl border border-green-500/30 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-start gap-3">
        <span aria-hidden className="text-2xl">
          🎤
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-white">Dicta tus datos</h2>
          <p className="mt-1 text-sm text-white/70">
            Di tu nombre, tu correo, tu empresa y tu cargo. Llenamos el formulario y tú revisas
            antes de enviar.
          </p>
        </div>
      </div>

      {escuchando ? (
        <button
          type="button"
          onClick={detener}
          className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 text-base font-bold text-white transition hover:bg-red-700"
        >
          <span className="relative flex h-3 w-3" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
          </span>
          Terminé de hablar
        </button>
      ) : (
        <button
          type="button"
          onClick={iniciar}
          disabled={procesandoAhora}
          className="mt-5 w-full rounded-xl bg-green-600 px-6 py-4 text-base font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-600/60"
        >
          {procesandoAhora
            ? 'Entendiendo lo que dijiste…'
            : estado.fase === 'listo' || estado.fase === 'error'
              ? 'Grabar de nuevo'
              : 'Grabar nota de voz'}
        </button>
      )}

      {(escuchando || transcripcion) && (
        <p
          aria-live="polite"
          className="mt-4 min-h-[3rem] rounded-xl bg-black/30 px-4 py-3 text-sm italic text-white/80"
        >
          {transcripcion || 'Escuchando…'}
        </p>
      )}

      {estado.fase === 'listo' && (
        <p className="mt-4 rounded-xl bg-green-500/20 px-4 py-3 text-sm font-medium text-green-200">
          Llenamos {estado.camposLlenados}{' '}
          {estado.camposLlenados === 1 ? 'campo' : 'campos'}. Revísalos abajo y corrige lo que haga
          falta, sobre todo el correo.
        </p>
      )}

      {estado.fase === 'error' && (
        <p className="mt-4 rounded-xl bg-red-500/20 px-4 py-3 text-sm font-medium text-red-200">
          {estado.mensaje}
        </p>
      )}

      <p className="mt-4 text-xs text-white/40">
        Tu navegador convierte la voz en texto y ese texto se usa solo para llenar este formulario.
      </p>
    </section>
  );
}
