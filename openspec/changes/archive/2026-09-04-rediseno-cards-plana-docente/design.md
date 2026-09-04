## Context

Ver `proposal.md` — la Plana Docente se renderiza desde arrays JS (`docentesData` en `portal/js/docentes.js` y duplicado en `portal/js/nosotros.js` para `portal/nosotros/#docente`), con `portal/js/jerarquica.js` aparte para Jerárquica. Estado actual: `docentesData` solo `{nombre,foto}`, grid `portal/css/docente.css:62` `repeat(auto-fill, minmax(220px,1fr))` (4 cols), card `portal/css/docente.css:68` con `img` 120px circular + `h3` nombre. Jerárquica usa `.card` en `jerarquica.css:64` layout flex por niveles, no debe tocarse.

## Goals / Non-Goals

**Goals:**
- Grid 2 cols docente, cards cuadradas anchas con grado/email/2 botones pill, usando tokens existentes.
- Extender data docente con `grado/email/cvUrl/cargaUrl` opcionales y sincronizar `docentes.js` ↔ `nosotros.js`.
- Reutilizar pipeline AVIF+WEBP (`picHTML`/`window.pictureFor`) para la foto.

**Non-Goals:**
- No rediseñar Jerárquica, organigrama, misión/visión, presentación ni `portal/nosotros/index.html` salvo contenedor `#docente`.
- No crear PDFs de CV/Carga; solo enlaces (rutas `portal/documentos/` o externas) — ausencia se maneja con botón oculto.
- No responsive multi-width `srcset` ni backend/CMS para docentes.

## Decisions

**D1: Solo grid/cards docente, no Jerárquica (scope).**
- Por qué: el encargo pide "solo Plana Docente". `nosotros.js` contiene ambos bloques; se toca solo el bloque `docenteContainer`/`docentesData`. Jerárquica sigue con `jerarquica.css` y `niveles`.
- Alternativa descartada: unificar CSS de ambas planas — rompería la pirámide jerárquica.

**D2: Estructura de datos extendida opcional `{grado,email,cvUrl,cargaUrl}` en JS.**
- Por qué: cambiar solo HTML dejaría botones sin href. Los 4 campos son opcionales para no bloquear migración incremental; legacy sin ellos sigue renderizando.
- Alternativa descartada: JSON externo / fetch — sitio es estático sin build; mantener arrays JS evita cambiar pipeline.

**D3: Grid 2 cols con `display:grid; grid-template-columns: repeat(2,1fr)` + breakpoint <768px → 1fr.**
- Por qué: `auto-fill 220px` actual fuerza 4 cols; 2 cols pide cards más anchas y cuadradas como referencia. 2 es fijo y predecible, coincide con spec "2 por fila".
- Alternativa descartada: `auto-fill minmax(320px,1fr)` — sería 2 cols en desktop grande pero 1 col en laptop mediana; 2 fijas es más fiel a mock.

**D4: Card horizontal (foto izquierda 110px circular + columna derecha), nombre `font-weight:700`, grado `0.92rem` muted, email `0.84rem` link, y 2 botones compactos — "Ver CV" sólido (`background: var(--primary)`) y "Ver Carga Académica" outline (`background:#fff`, `border:1.5px solid rgba(198,40,40,0.2)`), ambos `border-radius:6px`, `padding: 0.45rem 0.9rem`, `width:auto` (`flex:0 0 auto`), `gap:0.5rem` en fila única (`flex-wrap:nowrap` desktop/tablet, `wrap` solo <600px), y card con `padding: 1.4rem 1.6rem` con `padding-right:2rem` extra y `gap:0.5rem` entre nombre/grado/email/botones (más aire entre textos y al borde derecho, antes `gap:0.25rem` muy compacto).**
- Por qué: revertir "Carga" a outline como antes da peso visual diferenciado y evita fondo rojo dominante; aumentar `gap` a `0.5rem` da más respiración entre textos y aumentar `padding-right` evita que "Ver Carga Académica" se corte; mantiene horizontal y reaprovecha `--primary`/`--gold`, `6px`, Montserrat.
- Alternativa descartada: ambos sólidos — "Carga" con fondo rojo saturaba la card y el gap 0.25rem dejaba textos apretados.

**D5: Foto via `picHTML`/`window.pictureFor` existente (AVIF+WEBP), no `<img>` directo.**
- Por qué: ya está integrado en el último change `media-assets`; mantiene validación y fallback placeholder.

**D6: Botones "Ver CV" sólido + "Ver Carga" outline, en misma fila `gap:0.5rem` (`nowrap` desktop, `wrap` solo <600px), `target="_blank" rel="noopener"` y guard `if (!cvUrl) hide/disable`, con card `gap:0.5rem` entre textos y `padding-right:2rem` extra.**
- Por qué: evita 404, garantiza fila única y corrige corte del botón derecho; outline para "Carga" quita fondo rojo como pide el ajuste.

## Risks / Trade-offs

- [Doble fuente docente diverge] `docentes.js` y `nosotros.js` duplican `docentesData` → Mitigación: tarea explícita de sincronizar ambos; considerar en futuro extraer a `portal/js/docentes-data.js` compartido (fuera de alcance, solo nota).
- [PDF no existe aún] `cvUrl/cargaUrl` apuntan a 404 → Mitigación: spec exige botón oculto/deshabilitado si URL vacía; validar con `fetch HEAD` opcional en QA.
- [Email sin validación] texto libre → Mitigación: no validar formato en spec, solo render `mailto:` si contiene `@`.
- [Jerárquica tocada por error] editar `docente.css` podría filtrar a `.card` genérico → Mitigación: scope estricto a `.docente__card`, `.docente__grid`, `.docente__actions`; grep de `.card`/`.nivel` no modificado.
- [Trade-off] 2 cols fijas pierden densidad en pantallas ultra-wide → Se acepta por fidelidad a mock; grid sigue centrado con `max-width:1200px`.

## Migration Plan

1. Extender `docentesData` en `docentes.js` y `nosotros.js` con `grado,email,cvUrl,cargaUrl` (strings vacíos donde falte dato real).
2. Actualizar render de `docentes.js` y bloque docente en `nosotros.js` para generar card con grado/email/botones (usando `picHTML` para foto).
3. Reemplazar `docente.css:62` grid a `repeat(2,1fr)` + `@media (max-width:768px){ repeat(1,1fr)}` y rediseñar `.docente__card` (foto, tipografía, `.docente__meta`, `.docente__actions .btn` pill).
4. Verificar que `jerarquica.js/css` no cambian y que `organigrama/mision/presentacion` intactos.
5. Validar `openspec validate --strict` y QA visual en `portal/nosotros/#docente` y `portal/planadocente/` (2 cols, botones abren nueva pestaña, sin botones si URL vacía).

## Open Questions

- ¿De dónde vienen los CV y Cargas reales (¿`portal/documentos/cv/` y `portal/documentos/carga/` ya existen o se crean vacíos con placeholder `#`)? No bloquea spec (botón oculto si vacío).
- ¿Foto mantiene circular 120px o pasa a cuadrada con `radius-md`? Se deja a criterio diseño final en implementación, no cambia spec (foto arriba, nombre negrita).
