## Why

En el módulo "Nosotros" las secciones de personal (Administración de Centros de Cómputo, Enfermería Técnica, Producción Agropecuaria, Empleabilidad y otras) muestran desalineación: el grid de cards (2 columnas) no coincide horizontalmente con la barrita de acento del título de sección, y la última card de una sección queda muy pegada al título de la siguiente por falta de separación vertical. Corrige percepción de falta de orden y mejora ritmo visual.

## What Changes

- **Alineación horizontal:** el borde izquierdo del grid `.docente__grid` de cada sección SHALL alinearse exactamente con el borde izquierdo de la barrita (`border-left`) del `h2` de esa misma sección, compartiendo el mismo inset/margen izquierdo que el título, de forma consistente en todas las secciones generadas por el loop reutilizado (`portal/js/docentes.js:63` `docente__area`).
- **Aplicación global:** el ajuste SHALL aplicarse a TODAS las secciones de personal del módulo (no solo Enfermería Técnica), al ser un único componente/layout reutilizado por cada `area` en `docentesData`.
- **Espaciado vertical entre secciones:** agregar `margin-top` suficiente entre el final del grid de una sección y el `h2` con barrita de la siguiente sección para evitar cercanía (ej. cards de "Claudia Rubio Jiménez" → título "Enfermería Técnica"), sin afectar el `margin-bottom` interno de cada card.
- **Scope limitado:** no se cambia contenido interno de la card (foto 110px, nombre, grado, email, botones Ver CV / Ver Carga Académica) ni su diseño (`portal/css/docente.css:70` `.docente__card`), solo alineación del contenedor grid y separación entre secciones; mantiene responsive 2-col desktop / 1-col mobile.
- **Archivos confirmados:** componente render en `portal/js/docentes.js:60-101` (crea `section.docente__area > h2 + div.docente__grid > .docente__card`) duplicado lógicamente en `portal/planadocente/index.html` y `portal/nosotros/index.html#docente`; estilos en `portal/css/docente.css:44-67` (`.docente__area`, `h2`, `.docente__grid`) y espejo en `portal/css/nosotros.css:584-606` que debe quedar alineado.

## Capabilities

### New Capabilities
- (ninguna)

### Modified Capabilities
- `plana-docente`: Alineación horizontal del grid de cards con la barrita del título de sección y separación vertical entre secciones de personal.

## Impact

- **Código afectado:** `portal/css/docente.css:44-67` (`.docente__area`, `.docente__area h2`, `.docente__grid`) y espejo `portal/css/nosotros.css:584-606`; posible ajuste menor en `portal/js/docentes.js` solo si se requiere wrapper (se prefiere solo CSS). Sin cambio de datos (`docentesData`), rutas ni `section-banner`.
- **Compatibilidad:** solo visual/layout; mantiene clases `.docente__area`, `h2`, `.docente__grid`, `.docente__card` y responsive `@media max-width:768px` 1-col.
- **Riesgo:** alinear grid reduciendo `max-width` centrado puede estrechar cards en desktop — mitigado manteniendo `gap 24px` y `max-width` compartido entre título y grid.
