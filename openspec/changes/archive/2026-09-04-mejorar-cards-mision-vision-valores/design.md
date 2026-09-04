## Context

Ver `proposal.md` — las 3 cards viven duplicadas en `portal/mision_vision/index.html:59,75,91` y `portal/nosotros/index.html:135,139,143`. El CSS rector es `portal/css/nosotros.css:415` (`.mision_vision`, `__contenido` grid, `__item` card con hover `translateY(-4px)` + `box-shadow: 0 12px 36px`) y `portal/css/mision_vision.css:38` (página dedicada, sin hover — solo grid y tipografía). El gap actual es `2rem` sin colchón para la sombra; el contenedor no aísla stacking, así que la sombra/transform invade al vecino. El nivel visual objetivo es `pres-values__card` (`nosotros.css:425`) que ya resuelve hover sin solape con `gap: 1.5rem`, `border: 1px solid var(--border)` y `translateY(-8px)` sin `scale`.

## Goals / Non-Goals

**Goals:**
- Aumentar separación efectiva entre cards para absorber la elevación/sombra sin solape en 3-col (≥768px) y 1-col (<768px).
- Pulir card (borde/sombra base, hover contenido, transición) y jerarquía `h2` vs `p`/`ul` sin tocar copy/orden/íconos.
- Unificar `nosotros.css` y `mision_vision.css` visualmente (mismo `__item` en ambas rutas) con fuente única de verdad.

**Non-Goals:**
- No reestructurar la sección `portal/nosotros/index.html` (no mover `#mision-vision`, no cambiar número de columnas, no tocar `section-banner`).
- No introducir nuevo layout (p. ej. carrusel o acordeón) ni cambiar íconos/colores de marca.
- No crear `banner-system` ni tocar tokens globales salvo si falta uno ya usado (`--border`, `--radius-lg`, `--bg-card` ya existen).

## Decisions

**D1: Fuente de verdad CSS = `portal/css/nosotros.css:415`, espejo en `mision_vision.css`.**
- Por qué: `nosotros.css` ya define card con `background`, `border-radius`, `box-shadow`, `transition` y `hover`; `mision_vision.css` solo define grid+tipografía sin hover — hoy hay divergencia. Consolidar estilos de `.mision_vision__item` en `nosotros.css` y replicar (o importar vía misma regla) en `mision_vision.css` evita que la página dedicada se quede atrás.
- Alternativa descartada: editar solo `mision_vision.css` — dejaría `#mision-vision` en `nosotros` sin fix, que es donde más se ve el solape.

**D2: Gap `2rem → 2rem-2.5rem` + `padding` de sección `2rem 1rem 4rem` intacto, sin `margin` por card.**
- Por qué: el grid ya usa `gap: 2rem`; subir a `2.25rem` o `2.5rem` da ~8-12px extra por lado, suficiente para que `0 12px 36px` no toque al vecino. `margin` por card rompería el `repeat(3, 1fr)` alineado y complica el responsive. `gap` es la separación canónica del grid y ya está en ambos CSS (`mision_vision.css:48`, `nosotros.css:422`).
- Alternativa: `gap: 1.5rem` + `padding` por card — se evaluó pero reduce colchón justamente donde el hover más lo necesita.

**D3: Hover contenido sin `scale`, con `isolation`/`z-index` y `transform: translateY(-4px ~ -6px)`.**
- Por qué: `scale(1.02)` expande footprint y garantiza solape aunque haya gap; `translateY` solo mueve verticalmente dentro del gap vertical. Añadir `position: relative; z-index: 1` y `isolation: isolate` en hover asegura que la card elevada pinte por encima sin necesitar `overflow: visible` hack. Es el patrón que ya usa `pres-values__card:hover` sin `scale`.
- Alternativa descartada: `scale` + `z-index` — más vistoso pero reintroduce el bug reportado.

**D4: Transición `transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease` (sin `all`).**
- Por qué: `transition: all` anima propiedades no deseadas (color, background) y es más costoso. Limitar a 3 propiedades da hover pulido y respeta `prefers-reduced-motion` al desactivar solo `transform`.
- Alternativa: `transition: all 0.3s ease` — más simple pero menos predecible.

**D5: Jerarquía tipográfica refinada, no reinventada.**
- Por qué: `h2` ya usa `1.4rem`, `var(--primary)`, `gap: 0.6rem`, `i { color: var(--gold) }` en `nosotros.css:439`; `p` usa `line-height: 1.8`, `var(--text-muted)` en `452`; `ul li` usa `✦` dorado en `473`. Solo ajustar `font-weight`, `letter-spacing` sutil y `margin-bottom` para separar título/cuerpo, sin cambiar escala tipográfica global. Mantiene coherencia con `pres-values__card h3/p`.
- Alternativa: introducir `h3` o nuevo tamaño — rompería orden semántico actual (`h2` por card).

**D6: `prefers-reduced-motion` reduce `translateY` a `0` o `2px`.**
- Por qué: accesibilidad ya presente en `portal/css/styles.css` para `Ken Burns` y `reveal-on-scroll`; aplicar mismo patrón a `.mision_vision__item` mantiene consistencia.
- Alternativa: ignorar —incumple expectativa de usuarios con `reduce`.

## Risks / Trade-offs

- [Gap mayor reduce densidad en desktop 3-col] → Mitigación: `2.5rem` máximo; verificar en `1366px` que las 3 cards siguen en una fila sin wrap y con ancho legible (~320px c/u).
- [z-index en hover tapa `section-banner` vecino si la card está al tope] → Mitigación: `z-index: 1` solo en hover y `position: relative` por card, no `z-index` global; la sección ya tiene `padding: 2rem 1rem 4rem` que da colchón vertical.
- [Sombra recortada por `container` con `overflow: hidden`] → Mitigación: auditar `.container` y `.mision_vision` — hoy no tienen `overflow: hidden`; si lo tienen, cambiar a `overflow: visible` o `clip` solo horizontal.
- [Divergencia `mision_vision.css` vs `nosotros.css` reaparece] → Mitigación: tras el fix, `grep -rn "mision_vision__item" portal/css --include="*.css"` debe mostrar reglas idénticas o import compartido; documentado en `tasks.md`.
- [Valores `ul` con `grid repeat(auto-fill, minmax(150px,1fr))` puede dejar 1 ítem huérfano en 2-col] → Mitigación: en card estrecha (< 360px) forzar `grid-template-columns: 1fr` vía `@media max-width: 380px` o `1fr 1fr` ya existente en `nosotros.css:809`.

## Migration Plan

1. Editar `portal/css/nosotros.css:419` `gap` y `425` `__item` (sombra/borde/transición + `:hover` con `z-index`/`isolation` + tipografía) — fuente de verdad.
2. Alinear `portal/css/mision_vision.css:44,50` con los mismos valores (gap, card, hover, `h2 i`, `p`, `ul li`) para que `portal/mision_vision/index.html` no diverja; eliminar `color: #333` hardcodeado (`38`) si queda, usar `var(--text)`/`var(--text-muted)`.
3. Sin cambios HTML salvo si se necesita wrapper (no previsto); verificar duplicado `portal/nosotros/index.html:134` (hay `</div>` extra — no tocar si no es necesario).
4. QA visual: `portal/nosotros/#mision-vision` y `portal/mision_vision/` en `1280px`, `768px`, `375px`; hover en cada card, `prefers-reduced-motion`, y `grep` de consistencia.
5. `openspec validate --change mejorar-cards-mision-vision-valores --strict` sin errores.

## Open Questions

- ¿Gap final `2.25rem` o `2.5rem`? Se deja a implementación tras QA en `1280px` vs `1440px` (ambos válidos si no hay solape).
- ¿Sombra base `0 4px 20px rgba(0,0,0,0.04)` se mantiene o se afina a `0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02)` como `pres-values__card`? Se deja a implementación si el spec no lo exige exacto.
