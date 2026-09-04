import { NextRequest, NextResponse } from 'next/server';
import { isAirtableConfigError, registrarLead } from '@/lib/palma/airtable';
import { validateLeadPayload } from '@/lib/palma/validation';
import type { LeadPayload } from '@/lib/palma/types';

function getClientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'sin-ip'
  );
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as LeadPayload;
    const validation = validateLeadPayload(payload);

    if (!validation.ok) {
      return NextResponse.json({ error: 'Datos invalidos', fields: validation.errors }, { status: 400 });
    }

    const result = await registrarLead(payload, getClientIp(request));

    return NextResponse.json({
      success: true,
      message: result.actualizado ? 'Actualizamos tus datos' : 'Registro guardado',
      ...result,
    });
  } catch (error) {
    if (isAirtableConfigError(error)) {
      console.error('Configuracion de Airtable incompleta para leads de feria:', error.message);
      return NextResponse.json(
        {
          error: 'No se pudo guardar el registro',
          message: 'Configuracion incompleta del servidor. Contacta a la Direccion de Tecnologia.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'No se pudo guardar el registro',
        message: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 502 }
    );
  }
}
