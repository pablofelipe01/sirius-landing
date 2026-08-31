# Dashboard de Bioinsumos 2026

Dashboard web de una sola página que compara el volumen de bioinsumos presupuestado vs. entregado a un cliente agrícola durante 2026.

## 📁 Estructura de Archivos

```
src/
├── app/
│   ├── api/
│   │   └── dashboard-bioinsumos/
│   │       └── route.ts              # API endpoint (servidor)
│   └── bioinsumos/
│       └── page.tsx                  # Componente React del dashboard
└── .env.local                        # Variables de entorno
```

## 🔧 Configuración

### 1. Variables de Entorno

Copia `.env.example` a `.env.local` y llena estos valores (ningún identificador
vive en el código fuente):

```env
AIRTABLE_BASE_ID_SIRIUS_REMISIONES_CORE=
AIRTABLE_API_KEY_SIRIUS_REMISIONES_CORE=
AIRTABLE_TABLE_REMISIONES=
AIRTABLE_TABLE_PRODUCTOS_REMITIDOS=
DASHBOARD_BIOINSUMOS_CLIENTE_ID=
```

**⚠️ IMPORTANTE:**
- Los IDs de base, tablas y cliente son configuración: van en el entorno, no en el repo
- Nunca subas `.env.local` a Git (ya está en `.gitignore`)
- Para obtener tu API key, ve a: https://airtable.com/create/tokens

### 2. Instalación

No requiere dependencias adicionales. El proyecto ya tiene:
- ✅ Next.js (App Router)
- ✅ Recharts (para gráficos)
- ✅ TypeScript
- ✅ Tailwind CSS

### 3. Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir dashboard en el navegador
http://localhost:3000/bioinsumos
```

## 📊 Fuente de Datos

### Base de Airtable
- **Base:** Sirius Remisiones Core (ID en `AIRTABLE_BASE_ID_SIRIUS_REMISIONES_CORE`)
- **Tablas:**
  - `Remisiones` (ID en `AIRTABLE_TABLE_REMISIONES`) - Encabezado de remisiones
  - `Productos Remitidos` (ID en `AIRTABLE_TABLE_PRODUCTOS_REMITIDOS`) - Detalle línea por línea

### Lógica de Filtrado

El endpoint filtra:
1. **Cliente:** el configurado en `DASHBOARD_BIOINSUMOS_CLIENTE_ID`
2. **Estado:** `Entregada`
3. **Año:** `2026`

### Mapeo de Productos

Los productos se agrupan por microorganismo:

| ID Producto | Microorganismo | Categoría |
|-------------|----------------|-----------|
| SIRIUS-PRODUCT-0001 | Trichoderma harzianum | Crop Protection |
| SIRIUS-PRODUCT-0018 | Trichoderma harzianum | Crop Protection |
| SIRIUS-PRODUCT-0002 | Metarhizium anisopliae | Crop Protection |
| SIRIUS-PRODUCT-0003 | Purpureocillium lilacinum | Crop Protection |
| SIRIUS-PRODUCT-0004 | Beauveria bassiana | Crop Protection |
| SIRIUS-PRODUCT-0005 | Bacillus thuringiensis | Crop Protection |
| SIRIUS-PRODUCT-0007 | Siriusbacter | Crop Nutrition |

**Nota:** SIRIUS-PRODUCT-0001 y SIRIUS-PRODUCT-0018 se suman como un mismo microorganismo.

### Presupuesto Anual

El presupuesto está **hardcodeado** en el endpoint (`route.ts`):

```typescript
const PRESUPUESTO = {
  'Trichoderma harzianum': { litros: 8008, categoria: 'Crop Protection' },
  'Beauveria bassiana': { litros: 6537, categoria: 'Crop Protection' },
  'Bacillus thuringiensis': { litros: 2898, categoria: 'Crop Protection' },
  'Purpureocillium lilacinum': { litros: 741, categoria: 'Crop Protection' },
  'Metarhizium anisopliae': { litros: 741, categoria: 'Crop Protection' },
  'Siriusbacter': { litros: 4500, categoria: 'Crop Nutrition' },
};
```

**Para editar el presupuesto:** Modifica el objeto `PRESUPUESTO` en `src/app/api/dashboard-bioinsumos/route.ts`.

## 🎨 Componentes del Dashboard

### 1. Tarjetas KPI (4 tarjetas)
- Presupuesto Total (23.425 L)
- Total Entregado (~9.238 L)
- Diferencia (-14.187 L)
- Avance Global (~39,4%) con barra de progreso

### 2. Gráfico de Barras Agrupadas
Compara presupuestado vs. entregado por microorganismo (eje Y en litros)

### 3. Gráfico de % de Avance
Muestra el porcentaje de avance por microorganismo.
- 🟢 Verde: avance normal
- 🟠 Naranja: supera el 100% (Purpureocillium y Metarhizium)

### 4. Comparativo por Categoría
Dos bloques con cifras y % de avance:
- Crop Protection
- Crop Nutrition

### 5. Tabla de Detalle
Todas las columnas con estado visual:
- 🔴 Rojo: diferencia negativa
- 🟢 Verde: diferencia positiva

### 6. Productos No Presupuestados
Si hay productos que no están en el mapa (ej. Biochar Blend), se muestran en una sección aparte con alerta visual.

## 🎨 Paleta de Colores

```typescript
const COLORS = {
  entregado: '#00B602',      // Verde Sirius
  presupuestado: '#0154AC',  // Azul Sirius
  alerta: '#F59E0B',         // Naranja (>100%)
  negativo: '#EF4444',       // Rojo (diferencias negativas)
};
```

## 🔒 Seguridad

✅ **Cumple con las reglas de seguridad:**
- El API key de Airtable solo se lee en el servidor (`process.env`)
- Nunca se expone al cliente
- El componente React solo consume el endpoint interno
- Toda la lógica de cálculo vive en el servidor

## 📡 API Endpoint

### GET `/api/dashboard-bioinsumos`

**Respuesta (JSON):**

```json
{
  "metadata": {
    "generadoEl": "2026-07-08T14:23:45.123Z",
    "numeroRemisiones": 36,
    "cliente": "<cliente configurado>",
    "periodo": "2026"
  },
  "microorganismos": [
    {
      "nombre": "Trichoderma harzianum",
      "categoria": "Crop Protection",
      "presupuestado": 8008,
      "entregado": 1354,
      "diferencia": -6654,
      "porcentajeAvance": 16.9
    }
    // ... más microorganismos
  ],
  "totales": {
    "presupuestado": 23425,
    "entregado": 9238,
    "diferencia": -14187,
    "porcentajeAvance": 39.4
  },
  "categorias": [
    {
      "nombre": "Crop Protection",
      "presupuestado": 18925,
      "entregado": 7123,
      "porcentajeAvance": 37.6
    },
    {
      "nombre": "Crop Nutrition",
      "presupuestado": 4500,
      "entregado": 2115,
      "porcentajeAvance": 47.0
    }
  ],
  "noPresupuestados": []
}
```

**Estados de Error:**

- `500` - Falta configuración de API key
- `500` - Error al consultar Airtable

## 🚀 Despliegue en Vercel

1. **Variables de Entorno:**
   - Ve a tu proyecto en Vercel
   - Settings → Environment Variables
   - Agrega todas las variables de `.env.example` de la sección Remisiones Core:
     `AIRTABLE_BASE_ID_SIRIUS_REMISIONES_CORE`, `AIRTABLE_API_KEY_SIRIUS_REMISIONES_CORE`,
     `AIRTABLE_TABLE_REMISIONES`, `AIRTABLE_TABLE_PRODUCTOS_REMITIDOS`,
     `DASHBOARD_BIOINSUMOS_CLIENTE_ID`

2. **Deploy:**
   ```bash
   git add .
   git commit -m "Add bioinsumos dashboard"
   git push
   ```

3. **Acceder:**
   - Producción: `https://tu-dominio.vercel.app/bioinsumos`
   - Preview: Se genera automáticamente en cada PR

## 🔄 Actualización de Datos

Los datos se actualizan **en tiempo real** cada vez que se carga la página:
- ✅ Sin caché
- ✅ Consulta directa a Airtable
- ✅ Cálculos en el momento

Para forzar actualización: recargar la página (F5 o Cmd+R)

## 📝 Notas Importantes

1. **Validación de Datos:**
   - Con los datos actuales de Airtable, deberías ver ≈9.238 L entregados de 23.425 L presupuestados
   - Si los números difieren mucho, revisa los filtros en el endpoint

2. **Trichoderma:**
   - Es de aplicación preventiva concentrada en el segundo semestre
   - Por eso su avance es bajo en enero-julio (≈16,9%)

3. **Productos sobre 100%:**
   - Purpureocillium (≈104,6%) y Metarhizium (≈135,4%)
   - Son aplicaciones puntuales de control, por eso superan el presupuesto anual

4. **Formato de Números:**
   - Miles: punto (23.425)
   - Decimales: coma (39,4%)
   - Unidad: litros (L)

## 🛠️ Mantenimiento

### Agregar un Nuevo Producto

Edita el mapa en `route.ts`:

```typescript
const PRODUCTO_A_MICROORGANISMO: Record<string, string> = {
  // ... productos existentes
  'SIRIUS-PRODUCT-0099': 'Nuevo Microorganismo',
};
```

### Cambiar Presupuesto

Edita el objeto `PRESUPUESTO` en `route.ts`:

```typescript
const PRESUPUESTO = {
  'Nuevo Microorganismo': { litros: 5000, categoria: 'Crop Protection' },
  // ... resto del presupuesto
};
```

### Cambiar Cliente o Filtros

Edita las constantes en `route.ts`:

```typescript
const CLIENTE_TARGET = 'CL-0002';  // Cambiar cliente
const ESTADO_ENTREGADA_OPTION_ID = 'selXXXXXXXXXXXXX';  // Cambiar estado
```

## 📞 Soporte

Para dudas o problemas:
- Revisar logs del servidor: `npm run dev` y ver la consola
- Revisar errores en el navegador: DevTools → Console
- Verificar que el API key de Airtable sea válido

---

**Última actualización:** 2026-07-08
