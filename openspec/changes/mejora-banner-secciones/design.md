## Context

Ver `proposal.md` — banner `.section-banner` copiado en 28 páginas (33 instancias con 5 hero), estilo compartido en `portal/css/styles.css:1129` y `3883` pero duplicado en 12 hojas por página. Sin helper JS; HTML hardcodeado `<section class="section-banner"><h1><i>...</i> Título</h1></section>` vs hero con `__content/__badge/__title/__icon/__sep/__desc`.

## Goals / Non-Goals

**Goals:**
- Un solo componente/estilo para los 6 cambios visuales (breadcrumb, altura, degradado, wave/diagonal, subtítulo, badge) reutilizado en las 33 instancias.
- Mantener compatibilidad con clases `.section-banner`, `--hero`, `--gold`, `--dark`, `--light` y con páginas que no definan breadcrumb/subtítulo.
- Eliminar duplicados CSS en `portal/css/*.css`.

**Non-Goals:**
- No cambiar contenido de cada página (títulos/íconos actuales se mantienen, solo se envuelven en nuevo markup).
- No backend/CMS para subtítulos; subtítulo es `data-*` estático por página.
- No cambiar imagen de fondo (`frontis`/`hero` con `image-set` AVIF/WEBP) ni pipeline de imágenes.

## Decisions

**D1: Fuente única CSS en `portal/css/styles.css`, helper JS opcional en `portal/js/include.js` (o `banner.js`) para HTML.**
- Por qué: editar `styles.css:1129` y `3883` afecta a los 28 simples y 5 hero sin tocar cada HTML para los 4 cambios puramente CSS (altura, degradado, wave, badge). Para breadcrumb/subtítulo (datos por página) un helper `renderSectionBanner({title, icon, badge, breadcrumb, subtitle})` evita editar 28 HTML manualmente; si se prefiere sin JS, los datos pueden ir como `data-breadcrumb`/`data-subtitle` en el `<section>` y el helper los inyecta al `DOMContentLoaded`.
- Alternativa descartada: editar 28 HTML + 12 CSS manualmente — frágil y no reusable; o crear Web Component — overkill para sitio estático.

**D2: Breadcrumb derivado de `data-breadcrumb` explícito o de `data-page`/`location.pathname`.**
- Por qué: la jerarquía real existe (`Inicio > Nosotros > Plana Jerárquica`, `Inicio > Admisión > Calendario`, etc.) y puede mapearse desde `data-page` ya usado en `include.js` para el nav activo. Si la página define `data-breadcrumb="Inicio › Nosotros › Plana Jerárquica"` se usa literal; si no, se deriva de la URL (`/portal/admision/` → `Inicio › Admisión`). Vacío → oculto sin hueco (`display:none`).
- Alternativa descartada: hardcodear breadcrumb en cada HTML — duplica mantenimiento.

**D3: Altura compacta vía `padding` y `min-height`, no altura fija.**
- Por qué: `section-banner` actual `padding:4rem 1rem` deja mucho vacío; `2.5rem 1rem` + hero `min-height:160px` (antes 220px) reduce 37% la altura sin recortar contenido. En móvil `1.8rem` mantiene proporción. No se usa `height` fijo para no romper con subtítulo largo.
- Alternativa descartada: `height:180px` fijo — rompería con breadcrumb+subtítulo.

**D4: Overlay degradado con `linear-gradient(135deg, rgba(var(--primary-rgb),0.88), rgba(50,8,12,0.55))` + `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,235,190,0.06), transparent 60%)`.**
- Por qué: el actual es `linear-gradient(135deg, rgba(var(--primary-rgb),0.92), rgba(50,8,12,0.85))` plano y opaco; el nuevo deja ver más la foto y da profundidad con el radial sutil ya usado en hero `3883`. Mantiene tono institucional rojo oscuro.
- Alternativa descartada: overlay sólido `rgba(0,0,0,0.5)` — pierde identidad.

**D5: Wave/diagonal como `::after` con SVG inline o `clip-path: ellipse(60% 100% at 50% 100%)` de 24-32px.**
- Por qué: `::after` absoluto `bottom:-1px; height:32px; background: url('data:image/svg+xml,...wave...')` o `clip-path` no afecta flujo, es responsive y no requiere cambiar HTML. Se desactiva en móvil si se quiere (`@media max-width:768px { ::after { height:16px } }`).
- Alternativa descartada: `border-radius` inferior — no da efecto wave; `transform: skewY` — recorta contenido.

**D6: Subtítulo opcional como `data-subtitle` → `.section-banner__desc` (ya existe en hero).**
- Por qué: hero ya tiene `__desc` (`0.95rem`, `opacity:0.72`, `max-width:560px`); reutilizar esa clase para el banner simple evita nueva clase. Si `data-subtitle` vacío, no se inserta el `<p>` y no hay gap extra.
- Alternativa descartada: nuevo campo en JSON global — innecesario para 28 páginas.

**D7: Badge para ícono reutilizando `.section-banner__icon` del hero.**
- Por qué: hero ya define `48px`, `border:1px solid rgba(212,184,86,0.25)`, `background: linear-gradient(135deg, rgba(212,184,86,0.2), rgba(212,184,86,0.08))`, `backdrop-filter:blur(6px)`. Aplicarlo al banner simple (actualmente solo `<i style="font-size:2rem">`) unifica y evita "flotando solo". Tamaño `40px` en móvil ya está resuelto en `styles.css:3985`.

## Risks / Trade-offs

- [Helper JS no carga antes del banner] → Mitigación: helper se ejecuta en `DOMContentLoaded` y también como fallback CSS puro si `data-breadcrumb` ya está en HTML; banner sin JS sigue viéndose sin breadcrumb/subtítulo pero con altura/degradado/wave/badge.
- [Wave recorta contenido en pantallas pequeñas] → Mitigación: `clip-path` solo en `min-width:768px`, o SVG con `preserveAspectRatio="none"` y `height:16px` en móvil.
- [Subtítulo largo desborda] → Mitigación: `max-width:560px`, `line-clamp:2`, `text-wrap:balance`.
- [Duplicados CSS eliminados rompen páginas con overrides] → Mitigación: mantener variantes `--gold/--dark/--light` en `styles.css` y eliminar solo las reglas idénticas a `frontis` en `licenciamiento.css` etc.; verificar con `grep -rn "section-banner" portal/css --include="*.css"`.

## Migration Plan

1. Consolidar CSS: mover todo `.section-banner` y variantes a `portal/css/styles.css` (altura, degradado, wave `::after`, breadcrumb, subtítulo, badge) y borrar duplicados de `portal/css/*.css` (12 archivos).
2. Crear helper `renderSectionBanner` en `portal/js/include.js` (o `banner.js` importado por `include.js`) que lea `data-breadcrumb`/`data-subtitle`/`data-icon` del `<section>` o reciba objeto y genere `<nav class="section-banner__breadcrumb">` + `<div class="section-banner__icon">` + `<h1>` + `<p class="section-banner__desc">` + wave.
3. Actualizar las 28 páginas con banner simple para añadir `data-breadcrumb` y `data-subtitle` (ej. `data-breadcrumb="Inicio › Nosotros › Plana Jerárquica"` `data-subtitle="Conoce a las autoridades..."`) y envolver el `<h1>` con la estructura esperada por el helper (o dejar que el helper la genere). Las 5 hero ya tienen `__content` y solo necesitan `data-*`.
4. Verificar que editar solo `styles.css` + helper se refleja en todas las páginas sin tocar cada HTML para los 4 cambios CSS puros.
5. QA visual en `portal/nosotros/#jerarquica`, `portal/admision/#calendario`, `portal/programas`, `portal/transparencia`, `portal/galeria` (simple y hero) en desktop y móvil.

## Open Questions

- ¿Breadcrumb se genera automáticamente desde `data-page`/`location.pathname` o se hardcodea `data-breadcrumb` por página? Propuesta: ambos — `data-breadcrumb` tiene prioridad, si no existe se deriva de la URL.
- ¿Wave como SVG inline o `clip-path`? Se deja a implementación (SVG da curva más fiel, `clip-path` es más ligero).
