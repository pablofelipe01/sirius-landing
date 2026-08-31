import { NextRequest, NextResponse } from 'next/server';
import {
  findEventoByCodigo,
  isAirtableConfigError,
  listEventosPublicos,
  toEventoPublico,
} from '@/lib/asistencia/airtable';

export async function GET(request: NextRequest) {
  try {
    const codigo = request.nextUrl.searchParams.get('codigo')?.trim();

    if (codigo) {
      const evento = await findEventoByCodigo(codigo);
      if (!evento) {
        return NextResponse.json(
          { error: 'Evento no encontrado', message: 'El enlace de asistencia no corresponde a un evento activo.' },
          { status: 404 }
        );
      }

      return NextResponse.json({ evento: toEventoPublico(evento) });
    }

    const eventos = await listEventosPublicos();
    return NextResponse.json({ eventos });
  } catch (error) {
    if (isAirtableConfigError(error)) {
      console.error('Configuracion de Airtable incompleta:', error.message);
      return NextResponse.json(
        {
          error: 'No se pudieron cargar los eventos',
          message: 'Configuración incompleta del servidor. Contacta a la Dirección de Tecnología.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'No se pudieron cargar los eventos',
        message: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 502 }
    );
  }
}
