## Why

La sección "Plana Docente" en `portal/nosotros/#docente` usa cards de 4 columnas con foto circular y solo nombre, lo que se ve genérico y desaprovecha espacio. Se requiere un layout de 2 columnas más ancho y cuadrado, con grado/título, email y dos acciones por docente ("Ver CV" / "Ver Carga Académica") para dar información útil y coherencia con la referencia deseada, sin tocar organigrama ni resto de "Nosotros".

## What Changes

- **Exploración confirmada (3 puntos del encargo):**
  - Cards generadas por JS desde arrays, no HTML estático: `portal/js/docentes.js` (ruta `/planadocente/`), `portal/js/nosotros.js` (consolidado para `portal/nosotros/#jerarquica` + `#docente` — es el que renderiza la URL citada), y `portal/js/jerarquica.js` (solo jerárquica). HTML (`portal/nosotros/index.html:179`, `portal/planadocente/index.html:53`) solo aporta contenedores vacíos `#docente` / `#jerarquica`.
  - Estructura actual por docente: `{ nombre, foto }` únicamente — **no existen** campos `grado`, `email`, `cvUrl`, `cargaAcademicaUrl`. Agregarlos es alcance obligatorio del cambio.
  - El componente se reutiliza en dos lugares: "Plana Jerárquica" (`.card` en `jerarquica.css:64`, layout piramidal por niveles) y "Plana Docente" (`.docente__card` en `docente.css:68`, grid 4 cols). El rediseño aplica **solo a Plana Docente**; Jerárquica queda intacta (misma data shape pero distinto render/CSS).

- Layout Plana Docente: grid de 2 columnas por fila (1 col en móvil), cards más anchas y cuadradas (no 4 en fila).
- Nueva card: foto (cuadrada con radius o circular — criterio diseño), nombre en negrita, grado/título debajo, email debajo, y **dos botones pill/sólidos** lado a lado: "Ver CV" y "Ver Carga Académica" (abren PDF/URL en nueva pestaña). Sin datos, el botón se oculta o deshabilita sin romper layout.
- Extender estructura de datos docente con `grado`, `email`, `cvUrl`, `cargaUrl` (opcionales) en `docentes.js` y `nosotros.js` (y sincronizar ambas fuentes).
- Adaptar CSS `portal/css/docente.css` (grid, card, botones) usando tokens existentes (`--primary`, `--gold`, `--radius-md`, Montserrat) y estilos de `portal/css/styles.css`; no se tocan `jerarquica.css`, `organigrama`, `mision_vision`, `presentacion`.
- Mantener helper de imágenes existente (`picHTML`/`window.pictureFor` AVIF+WEBP) para la foto.

## Capabilities

### New Capabilities
- `plana-docente`: Listado y presentación de docentes — grid, card con foto/nombre/grado/email y acciones CV/Carga, y estructura de datos que soporta los enlaces.

### Modified Capabilities
- (ninguna — `media-assets` no cambia)

## Impact

- **Código afectado:** `portal/js/docentes.js`, `portal/js/nosotros.js` (duplicado docente), `portal/css/docente.css`, datos de docentes (nuevos campos). Explícitamente **no** tocados: `portal/js/jerarquica.js`, `portal/css/jerarquica.css`, `portal/nosotros/index.html` (salvo si se requiere id/clase para grid), `portal/planadocente/index.html`, resto de `portal/nosotros` (organigrama, misión/visión, presentación).
- **Assets/datos:** PDFs de CV y Carga Académica (rutas `portal/documentos/` o URLs externas) — se referencian vía `cvUrl`/`cargaUrl`, no se crean en este change si no existen; card maneja ausencia.
- **Compatibilidad:** Solo visual en Plana Docente; Jerárquica mantiene 4-col grid circular actual.
