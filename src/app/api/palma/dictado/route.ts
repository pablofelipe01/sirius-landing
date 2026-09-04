import { NextRequest, NextResponse } from 'next/server';
import { isMissingEnvError } from '@/lib/env';
import {
  MAX_CARACTERES_TRANSCRIPCION,
  extraerCamposDeTranscripcion,
} from '@/lib/palma/dictado';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { transcripcion?: unknown };
    const transcripcion = typeof body.transcripcion === 'string' ? body.transcripcion.trim() : '';

    if (transcripcion.length < 10) {
      return NextResponse.json(
        { error: 'Transcripcion vacia', message: 'No alcanzamos a escuchar nada. Intenta de nuevo.' },
        { status: 400 }
      );
    }

    if (transcripcion.length > MAX_CARACTERES_TRANSCRIPCION) {
      return NextResponse.json(
        { error: 'Transcripcion muy larga', message: 'La grabacion es demasiado larga.' },
        { status: 413 }
      );
    }

    const campos = await extraerCamposDeTranscripcion(transcripcion);

    return NextResponse.json({ success: true, campos });
  } catch (error) {
    if (isMissingEnvError(error)) {
      console.error('Falta configurar el dictado por voz:', error.message);
      return NextResponse.json(
        {
          error: 'Dictado no disponible',
          message: 'El dictado por voz no esta configurado. Llena el formulario a mano.',
        },
        { status: 503 }
      );
    }

    console.error('Error extrayendo campos de la nota de voz:', error);
    return NextResponse.json(
      {
        error: 'No pudimos entender la grabacion',
        message: 'No pudimos entender la grabacion. Revisa el formulario y completalo a mano.',
      },
      { status: 502 }
    );
  }
}
