## Context

Ver `proposal.md` Why — el grid `.docente__grid` (2 col, `max-width:1020px; margin:0 auto; gap:24px`) está centrado mientras el título `h2` con `border-left:5px solid var(--primary); padding-left:1rem` se ancla al borde del contenedor `.docente`, generando desfase horizontal. Además `.docente__area { margin-bottom:3rem }` deja poco aire entre grid y siguiente `h2`. El componente es reutilizado por loop `portal/js/docentes.js:63` para cada `area` (4 secciones) y se renderiza idéntico en `portal/planadocente/index.html` (`docente.css`) y `portal/nosotros/index.html#docente` (`nosotros.css` espejo). No se toca contenido de card (`portal/css/docente.css:70`).

## Goals / Non-Goals

**Goals:**
- Alinear borde izquierdo del grid con borde izquierdo de la barrita del título en cada sección, en desktop 2-col y mobile 1-col, de forma consistente vía CSS compartido.
- Aumentar separación vertical entre `grid` final de una sección y el `h2` siguiente sin alterar `gap` interno del grid ni diseño interno de card.

**Non-Goals:**
- No cambiar estructura HTML generada por `docentes.js` ni contenido de card (foto, h3, grado, email, botones).
- No modificar grid a 3 columnas, ni tocar `section-banner` o `jerarquica.css`.
- No introducir nuevo layout o framework.

## Decisions

**D1: Alineación vía contenedor compartido, no `margin:0 auto` centrado solo en grid.**
- Por qué: actualmente `h2` no tiene `max-width` y se alinea al `.docente` (`max-width:1200px; padding:2rem 20px`), mientras `.docente__grid` tiene `max-width:1020px; margin:0 auto` que lo centra y lo desplaza 90px a la derecha respecto al título en 1200px. Solución: dar a ambos (`h2` y `.docente__grid`) el mismo `max-width` y `margin` o envolverlos en mismo inset (p. ej. ambos `max-width:1020px; margin:0 auto` o ambos sin `max-width` y con `padding` heredado). Mantiene 2-col sin estrechar excesivo.
- Alternativa descartada: añadir `padding-left` al grid igual al `border-left+padding` del `h2` — corrige alineación pero deja grid más estrecho que título y rompe `gap`.

**D2: `margin-top` en `.docente__area h2` para separación vertical, no `margin-bottom` gigante en grid.**
- Por qué: el espacio debe pertenecer al título siguiente (separador entre secciones), no al grid previo, para que no afecte última sección. `h2 { margin-top:2.5rem }` (además del existente `margin-bottom:1.5rem`) da aire tras "Claudia Rubio Jiménez" → "Enfermería Técnica" sin duplicar espacio si ya hay `margin-bottom` en `.docente__area`. Mantiene ritmo.
- Alternativa: aumentar `.docente__area { margin-bottom:60px→80px }` — también válido pero afecta también espacio tras última sección innecesariamente.

**D3: Fuente de verdad `portal/css/docente.css:44-67` y espejo `portal/css/nosotros.css:584-606`.**
- Por qué: `docente.css` es el único importado por `planadocente`, `nosotros.css` duplica esas reglas para `#docente` en `nosotros`. Ambos deben quedar alineados; editar solo uno reintroduce drift como en mision-vision. No se edita `docentes.js` (solo CSS).
- Alternativa: editar solo `docente.css` — dejaría `nosotros#docente` desalineado.

**D4: Mantener `@media max-width:768px` y `600px` sin tocar.**
- Por qué: en 1-col el grid ya es `1fr` sin `max-width` conflictivo; alineación horizontal en mobile se logra con mismo `padding` del contenedor. No se cambia breakpoint.
- Alternativa: añadir regla móvil específica para `h2` — innecesaria.

## Risks / Trade-offs

- [Alineación reduce ancho útil en desktop si ambos `max-width:1020px`] → Mitigación: 1020px ya es el ancho del grid; alinear `h2` a 1020px no estrecha grid, solo desplaza título 90px a la derecha para coincidir; verificar en 1200px y 1440px que título no queda demasiado inset.
- [Margin-top en h2 puede duplicar espacio si `.docente__area` ya tiene margin-bottom] → Mitigación: ajustar `h2 { margin-top:2.5rem }` y verificar que `gap` entre secciones sea ~3–4rem total, no >5rem; ajustar a 2rem si se ve excesivo.
- [Divergencia `docente.css` vs `nosotros.css`] → Mitigación: tras fix `grep -n "docente__area h2\|docente__grid" portal/css/docente.css portal/css/nosotros.css` debe mostrar valores idénticos.

## Migration Plan

1. Editar `portal/css/docente.css:44-67` — unificar `h2` y `.docente__grid` a mismo `max-width`/`margin` para alinear borde izquierdo con barrita, y añadir `margin-top` a `h2` para separación vertical.
2. Espejar mismos cambios en `portal/css/nosotros.css:584-606` (docente section duplicada).
3. QA en `portal/planadocente/` y `portal/nosotros/#docente` en 1280px/768px/375px: medir alineación izquierda (devtools rect.left de `h2` border vs first `.docente__card`), verificar gap vertical entre "Claudia Rubio Jiménez" card y siguiente `h2`.
4. `openspec validate --changes --strict` 0 errores.

## Open Questions

- ¿Valor exacto de separación vertical: 2.5rem vs 3rem? Se deja a implementación (ambos cumplen "suficiente espacio").
