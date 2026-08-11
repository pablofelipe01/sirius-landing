import { NextResponse } from 'next/server';

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN DE AIRTABLE
// ═══════════════════════════════════════════════════════════════════════════════
const AIRTABLE_BASE_ID = 'appkw74J0rSYx6Xlh'; // Sirius Remisiones Core
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY_SIRIUS_REMISIONES_CORE;

// IDs de tablas
const TABLE_REMISIONES = 'tblVqQjwTXyl4sp9V';
const TABLE_PRODUCTOS_REMITIDOS = 'tbl98nZkdtoqCT47u';

// Nombres de campos - Tabla Remisiones
// Nota: Airtable devuelve nombres de campos, no field IDs en la respuesta
const FIELD_ID_CLIENTE = 'ID Cliente';
const FIELD_ESTADO = 'Estado';
const FIELD_FECHA_REMISION = 'Fecha de Remisión';

// Nombres de campos - Tabla Productos Remitidos
const FIELD_REMISION_VINCULADA = 'Remisión vinculada';
const FIELD_ID_PRODUCTO = 'ID Producto';
const FIELD_CANTIDAD = 'Cantidad';

// Valor de filtro
const CLIENTE_TARGET = 'CL-0001';

// ═══════════════════════════════════════════════════════════════════════════════
// PRESUPUESTO ANUAL 2026 (Litros)
// ═══════════════════════════════════════════════════════════════════════════════
const PRESUPUESTO = {
  'Trichoderma harzianum': { litros: 8008, categoria: 'Crop Protection' },
  'Beauveria bassiana': { litros: 6537, categoria: 'Crop Protection' },
  'Bacillus thuringiensis': { litros: 2898, categoria: 'Crop Protection' },
  'Purpureocillium lilacinum': { litros: 741, categoria: 'Crop Protection' },
  'Metarhizium anisopliae': { litros: 741, categoria: 'Crop Protection' },
  'Siriusbacter': { litros: 4500, categoria: 'Crop Nutrition' },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// MAPA DE PRODUCTOS → MICROORGANISMOS
// ═══════════════════════════════════════════════════════════════════════════════
const PRODUCTO_A_MICROORGANISMO: Record<string, string> = {
  'SIRIUS-PRODUCT-0001': 'Trichoderma harzianum',
  'SIRIUS-PRODUCT-0018': 'Trichoderma harzianum', // Ambos se suman
  'SIRIUS-PRODUCT-0002': 'Metarhizium anisopliae',
  'SIRIUS-PRODUCT-0003': 'Purpureocillium lilacinum',
  'SIRIUS-PRODUCT-0004': 'Beauveria bassiana',
  'SIRIUS-PRODUCT-0005': 'Bacillus thuringiensis',
  'SIRIUS-PRODUCT-0007': 'Siriusbacter',
};

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS TYPESCRIPT
// ═══════════════════════════════════════════════════════════════════════════════
interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

interface MicroorganismoDetalle {
  nombre: string;
  categoria: string;
  presupuestado: number;
  entregado: number;
  diferencia: number;
  porcentajeAvance: number;
}

interface CategoriaResumen {
  nombre: string;
  presupuestado: number;
  entregado: number;
  porcentajeAvance: number;
}

interface ProductoNoPresupuestado {
  idProducto: string;
  entregado: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE CONSULTA A AIRTABLE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Consulta Airtable con paginación automática
 */
async function fetchAirtableRecords(
  tableId: string,
  filterFormula?: string
): Promise<AirtableRecord[]> {
  const allRecords: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams();
    if (filterFormula) {
      params.append('filterByFormula', filterFormula);
    }
    if (offset) {
      params.append('offset', offset);
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableId}?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
    }

    const data: AirtableResponse = await response.json();
    allRecords.push(...data.records);
    offset = data.offset;
  } while (offset);

  return allRecords;
}

/**
 * Obtiene remisiones entregadas del cliente CL-0001 en 2026
 */
async function fetchRemisionesEntregadas(): Promise<Set<string>> {
  console.log('🔍 Buscando remisiones del cliente', CLIENTE_TARGET);

  // Filtro por cliente usando nombre de campo
  const filterFormula = `{${FIELD_ID_CLIENTE}} = '${CLIENTE_TARGET}'`;

  const records = await fetchAirtableRecords(TABLE_REMISIONES, filterFormula);

  console.log('📊 Remisiones encontradas del cliente:', records.length);

  if (records.length > 0) {
    console.log('🔎 Primera remisión:', {
      id: records[0].id,
      idCliente: records[0].fields[FIELD_ID_CLIENTE],
      estado: records[0].fields[FIELD_ESTADO],
      fecha: records[0].fields[FIELD_FECHA_REMISION],
    });
  }

  // Filtrar manualmente por estado y año en el servidor
  const remisionesFiltradas = records.filter((r) => {
    const estado = r.fields[FIELD_ESTADO];
    const fecha = r.fields[FIELD_FECHA_REMISION];

    // Log detallado para las primeras 3
    if (records.indexOf(r) < 3) {
      console.log(`📋 Remisión ${r.id}:`, {
        estado: estado,
        fecha: fecha,
        año: fecha ? new Date(fecha).getFullYear() : null
      });
    }

    // Verificar estado (puede ser string directo o valor de select)
    const estadoMatch = estado === 'Entregada';

    // Verificar año
    const añoMatch = fecha ? new Date(fecha).getFullYear() === 2026 : false;

    return estadoMatch && añoMatch;
  });

  console.log('✅ Remisiones que cumplen filtros:', remisionesFiltradas.length);

  return new Set(remisionesFiltradas.map((r) => r.id));
}

/**
 * Obtiene todos los productos remitidos y filtra por remisiones entregadas
 */
async function fetchProductosRemitidos(
  remisionesEntregadasIds: Set<string>
): Promise<{ porMicroorganismo: Record<string, number>; noPresupuestados: Record<string, number> }> {
  console.log('📦 Obteniendo productos remitidos...');
  const records = await fetchAirtableRecords(TABLE_PRODUCTOS_REMITIDOS);
  console.log(`📦 Total de productos remitidos en la tabla: ${records.length}`);

  const porMicroorganismo: Record<string, number> = {};
  const noPresupuestados: Record<string, number> = {};

  let procesados = 0;
  let vinculados = 0;

  for (const record of records) {
    const remisionVinculada = record.fields[FIELD_REMISION_VINCULADA];
    const idProducto = record.fields[FIELD_ID_PRODUCTO];
    const cantidad = record.fields[FIELD_CANTIDAD];

    // Log para los primeros 3 productos para debug
    if (procesados < 3) {
      console.log(`📋 Producto ejemplo ${procesados + 1}:`, {
        remisionVinculada: remisionVinculada,
        idProducto: idProducto,
        cantidad: cantidad
      });
    }

    // Saltar si no tiene remisión vinculada o no es una de las entregadas
    if (!remisionVinculada || !Array.isArray(remisionVinculada)) continue;

    const remisionId = remisionVinculada[0];
    if (!remisionesEntregadasIds.has(remisionId)) continue;

    vinculados++;

    // Validar cantidad
    if (typeof cantidad !== 'number' || isNaN(cantidad)) continue;

    // Agrupar por microorganismo o marcar como no presupuestado
    const microorganismo = PRODUCTO_A_MICROORGANISMO[idProducto];

    if (microorganismo) {
      porMicroorganismo[microorganismo] = (porMicroorganismo[microorganismo] || 0) + cantidad;
    } else if (idProducto) {
      noPresupuestados[idProducto] = (noPresupuestados[idProducto] || 0) + cantidad;
    }

    procesados++;
  }

  console.log(`✅ Productos vinculados a remisiones entregadas: ${vinculados}`);
  console.log('📊 Por microorganismo:', porMicroorganismo);
  console.log('⚠️ No presupuestados:', noPresupuestados);

  return { porMicroorganismo, noPresupuestados };
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENDPOINT HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

export async function GET() {
  try {
    console.log('🚀 Iniciando consulta del dashboard de bioinsumos...');

    // Validar que existe el API key
    if (!AIRTABLE_API_KEY) {
      console.error('❌ ERROR: Falta API key');
      return NextResponse.json(
        { error: 'Configuración incompleta: falta AIRTABLE_API_KEY_SIRIUS_REMISIONES_CORE' },
        { status: 500 }
      );
    }

    console.log('✅ API key configurada');

    // 1. Obtener remisiones entregadas
    console.log('📦 Paso 1: Obteniendo remisiones entregadas...');
    const remisionesEntregadasIds = await fetchRemisionesEntregadas();
    console.log(`✅ Paso 1 completo: ${remisionesEntregadasIds.size} remisiones encontradas`);

    // 2. Obtener productos remitidos y agrupar
    const { porMicroorganismo, noPresupuestados } = await fetchProductosRemitidos(
      remisionesEntregadasIds
    );

    // 3. Calcular detalle por microorganismo
    const microorganismos: MicroorganismoDetalle[] = Object.entries(PRESUPUESTO).map(
      ([nombre, { litros, categoria }]) => {
        const entregado = Math.round(porMicroorganismo[nombre] || 0);
        const presupuestado = litros;
        const diferencia = entregado - presupuestado;
        const porcentajeAvance = parseFloat(((entregado / presupuestado) * 100).toFixed(1));

        return {
          nombre,
          categoria,
          presupuestado,
          entregado,
          diferencia,
          porcentajeAvance,
        };
      }
    );

    // 4. Calcular totales globales
    const totalPresupuestado = Object.values(PRESUPUESTO).reduce((sum, p) => sum + p.litros, 0);
    const totalEntregado = microorganismos.reduce((sum, m) => sum + m.entregado, 0);
    const totalDiferencia = totalEntregado - totalPresupuestado;
    const porcentajeAvanceGlobal = parseFloat(
      ((totalEntregado / totalPresupuestado) * 100).toFixed(1)
    );

    // 5. Calcular resumen por categoría
    const categorias: CategoriaResumen[] = ['Crop Protection', 'Crop Nutrition'].map(
      (nombreCategoria) => {
        const microorganismosCategoria = microorganismos.filter(
          (m) => m.categoria === nombreCategoria
        );

        const presupuestado = microorganismosCategoria.reduce((sum, m) => sum + m.presupuestado, 0);
        const entregado = microorganismosCategoria.reduce((sum, m) => sum + m.entregado, 0);
        const porcentajeAvance = parseFloat(((entregado / presupuestado) * 100).toFixed(1));

        return {
          nombre: nombreCategoria,
          presupuestado,
          entregado,
          porcentajeAvance,
        };
      }
    );

    // 6. Formatear productos no presupuestados
    const noPresupuestadosArray: ProductoNoPresupuestado[] = Object.entries(noPresupuestados).map(
      ([idProducto, cantidad]) => ({
        idProducto,
        entregado: Math.round(cantidad),
      })
    );

    // 7. Construir respuesta final
    const response = {
      metadata: {
        generadoEl: new Date().toISOString(),
        numeroRemisiones: remisionesEntregadasIds.size,
        cliente: CLIENTE_TARGET,
        periodo: '2026',
      },
      microorganismos,
      totales: {
        presupuestado: totalPresupuestado,
        entregado: totalEntregado,
        diferencia: totalDiferencia,
        porcentajeAvance: porcentajeAvanceGlobal,
      },
      categorias,
      noPresupuestados: noPresupuestadosArray,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error al generar dashboard de bioinsumos:', error);

    return NextResponse.json(
      {
        error: 'Error al consultar los datos',
        message: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 }
    );
  }
}
