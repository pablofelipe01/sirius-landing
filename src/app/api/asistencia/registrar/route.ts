import { NextRequest, NextResponse } from 'next/server';
import { isAirtableConfigError, registrarAsistencia } from '@/lib/asistencia/airtable';
import { validateAttendancePayload } from '@/lib/asistencia/validation';
import type { AttendancePayload } from '@/lib/asistencia/types';

function getClientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'sin-ip'
  );
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as AttendancePayload;
    const validation = validateAttendancePayload(payload);

    if (!validation.ok) {
      return NextResponse.json(
        { error: 'Datos inválidos', fields: validation.errors },
        { status: 400 }
      );
    }

    const result = await registrarAsistencia(payload, getClientIp(request));

    return NextResponse.json({
      success: true,
      message: result.actualizado
        ? 'Asistencia actualizada correctamente'
        : 'Asistencia registrada correctamente',
      ...result,
    });
  } catch (error) {
    if (isAirtableConfigError(error)) {
      console.error('Configuracion de Airtable incompleta:', error.message);
      return NextResponse.json(
        {
          error: 'No se pudo registrar la asistencia',
          message: 'Configuración incompleta del servidor. Contacta a la Dirección de Tecnología.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'No se pudo registrar la asistencia',
        message: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 502 }
    );
  }
}
