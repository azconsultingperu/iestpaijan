## Context

Ver `proposal.md` — 33 instancias de banner con HTML copiado (28 simples + 5 hero) y CSS duplicado en 12 hojas (`licenciamiento.css:2`, `tupa.css:2`, etc.) con mismo `image-set`/`::before`. Estilo compartido ya existe en `portal/css/styles.css:1129` (simple, `4rem` padding, overlay plano) y `3883` (hero), pero no hay componente reutilizable. Sin cambios, cada ajuste visual requiere editar 28 HTML + 12 CSS. El sitio es estático (HTML/CSS/JS, Montserrat, Font Awesome, pipeline AVIF/WEBP) sin build.

## Goals / Non-Goals

**Goals:**
- Un sistema base `.banner` con 6 variantes completas, reutilizable para las 33 instancias actuales y futuras sin CSS nuevo por banner.
- Overlay con degradado y foto reconocible, jerarquía tipográfica con `clamp()`, decoración sutil e iconografía opcional.
- Responsive sin alturas rígidas y accesible (contraste, semántica, `prefers-reduced-motion`).

**Non-Goals:**
- No crear PDFs/contenido nuevo para subtítulos; subtítulo es `data-*` opcional por página.
- No introducir frameworks (React, Tailwind) ni dependencias pesadas; solo HTML/CSS/JS existente.
- No cambiar URLs, navegación ni textos institucionales durante la migración.

## Decisions

**D1: Fuente única CSS en `portal/css/styles.css` (o `banner-system.css` importado) para base + 6 variantes, helper JS ligero en `portal/js/include.js` para HTML.**
- Por qué: `styles.css` ya es el único importado en todas las páginas; consolidar allí evita duplicar 12 hojas y permite que los 4 cambios puramente CSS (altura, degradado, wave, badge) se propaguen sin tocar HTML. Para breadcrumb/subtítulo (datos por página) un helper `renderBanner({variant, title, icon, eyebrow, subtitle, image})` que lea `data-*` del `<section>` evita editar 28 HTML manualmente.
- Alternativa descartada: editar 28 HTML + 12 CSS manualmente — frágil; Web Component — overkill para estático.

**D2: Variantes como modificadores `banner--hero|split|institutional|historical|academic|visual` sobre base `.banner`.**
- Por qué: BEM ya usado en el proyecto (`beneficios-card`, `docente__grid`); base contiene layout, overlay base, tipografía y animación; cada variante solo añade diferencias (ej. `split` añade `display:grid; grid-template-columns:1fr 1fr`, `historical` añade `border-left:4px solid var(--gold)` y etiqueta `DESDE 1987`). Agregar un nuevo banner es solo `class="banner banner--academic"`.
- Alternativa descartada: 6 bloques CSS independientes — duplica base.

**D3: Estructura HTML común con `__media`/`__overlay`/`__content` y `__eyebrow`/`__title`/`__subtitle`/`__decoration`.**
- Por qué: permite reordenar (hero: texto izquierda, split: texto izq/foto der) sin cambiar CSS base; `__media` usa `image-set` AVIF/WEBP ya optimizado. Mantener `.section-banner` como alias legacy (`@extend` o duplicar selector) para no romper páginas no migradas durante la transición.
- Alternativa descartada: mantener dos estructuras (simple vs hero) — perpetúa duplicación.

**D4: Overlay con `linear-gradient(90deg, rgba(var(--primary-rgb),0.92) 0%, rgba(var(--primary-rgb),0.65) 50%, rgba(var(--primary-rgb),0.10) 100%)` + `radial-gradient` sutil, no `rgba` plano.**
- Por qué: el actual `rgba(100,0,15,0.85)` cubre toda la foto; el degradado deja protagonista a la derecha (texto a la izquierda) y mantiene legibilidad del texto. Foto sigue reconocible como pide el brief.
- Alternativa descartada: `mix-blend-mode` — inconsistente en Safari y complica contraste.

**D5: Tipografía con `clamp()` y jerarquía `eyebrow 0.72rem` / `title clamp(1.8rem,4vw,2.8rem) 800` / `subtitle 0.95rem` + decoración `::after` línea dorada.**
- Por qué: `clamp()` ya usado en `hero__title` y `beneficios-title`; eyebrow da contexto sin breadcrumb largo. Decoración sutil (línea 48px, retícula `opacity:0.04`) no satura.
- Alternativa descartada: `font-size` fijo — rompe en móvil.

**D6: Animación `fade + translateY(12px)` 400ms `cubic-bezier(0.22,1,0.36,1)` y `scale(1.02)` en imagen, con `@media (prefers-reduced-motion: reduce) { animation:none }`.**
- Por qué: coincide con `cardEntrance` y `heroTextIn` ya en el sitio (600ms); 250-600ms es discreto y respeta accesibilidad.
- Alternativa descartada: parallax/zoom agresivo — distrae y rompe `prefers-reduced-motion`.

**D7: Responsive sin alturas rígidas, `object-fit:cover` y `min-height` flexible.**
- Por qué: `height:220px` fijo causa overflow con subtítulo largo; `min-height:160px` + `padding:2.5rem` + `flex` permite crecer. Split en móvil pasa a `grid-template-columns:1fr` y reordena `__media` arriba.
- Alternativa descartada: `height` fijo — ya causa problemas en `programa-detail`.

## Risks / Trade-offs

- [Helper JS no carga] → Mitigación: CSS funciona sin JS (banner se ve sin breadcrumb/subtítulo pero con altura/degradado/wave/badge); helper se ejecuta en `DOMContentLoaded` y como fallback lee `data-*` ya en HTML.
- [Foto histórica de baja calidad] → Mitigación: variante `historical` permite usar `background-color` + patrón si no hay foto; no obligatoria.
- [33 HTML por migrar] → Mitigación: migración por fases (piloto 3 páginas, luego resto); mantener alias `.section-banner` durante transición para no romper deploy parcial.
- [Wave recorta contenido en móvil] → Mitigación: `::after` con `height:32px` desktop, `16px` móvil, o `clip-path` solo `min-width:768px`.
- [Duplicados CSS eliminados rompen overrides] → Mitigación: conservar variantes `--gold/--dark/--light` en base y eliminar solo reglas idénticas a `frontis`.

## Migration Plan

1. **Fase 1 — Auditoría:** confirmar inventario (33 instancias) y mapear cada página a variante (ej. `nosotros`→hero, `organigrama`→institutional, `resena_historica`→historical, `acc/pagro/enfermeria`→academic, `galeria`→visual).
2. **Fase 2 — Base:** crear `.banner` base en `styles.css:1129` (o `banner-system.css`) con `__media/__overlay/__content/__eyebrow/__title/__subtitle/__decoration`, overlay degradado, tipografía `clamp()`, decoración y animación, y alias `.section-banner` → `.banner`.
3. **Fase 3 — Variantes:** implementar 6 modificadores con solo diferencias (hero, split, institutional, historical, academic, visual) y responsive.
4. **Fase 4 — Piloto:** migrar `portal/nosotros` (hero + institutional) y `portal/acc` (academic) a nueva estructura, validar desktop/móvil y accesibilidad.
5. **Fase 5 — Resto:** migrar las 30 instancias restantes añadiendo `data-variant`/`data-subtitle` donde aplique.
6. **Fase 6 — Limpieza:** borrar duplicados de `portal/css/*.css` y reglas legacy `.section-banner` no usadas, manteniendo compatibilidad temporal.
7. **Fase 7 — Revisión final:** `openspec validate --strict`, Lighthouse y contraste AA, `prefers-reduced-motion`.

## Open Questions

- ¿Subtítulo se define como `data-subtitle` en el HTML de cada página o como parámetro del helper JS? Propuesta: `data-subtitle` tiene prioridad, si no existe no se renderiza.
- ¿Wave como SVG inline o `clip-path`? Se deja a implementación (SVG más fiel, `clip-path` más ligero).
