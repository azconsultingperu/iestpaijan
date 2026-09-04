## Context

Ver `proposal.md` Why — panel `.nav` en `portal/css/styles.css` (activo en `max-width:900px`/`768px` con `.nav.is-open` + `.nav-overlay` y `header` fijo) ocupa altura completa con `height:100vh`/`100dvh` y deja vacío bajo los 7 links; cada `a.nav__link` es texto plano sin ícono en `portal/js/include.js: headerHTML`; el activo solo usa `color:var(--primary)` + fondo rosado claro; `nav__header` duplica logo del `brand` de fondo.

## Goals / Non-Goals

**Goals:**
- Ajustar altura del panel a contenido o centrar lista para eliminar vacío inferior, sin romper overlay ni scroll.
- Añadir íconos Font Awesome existentes por link y reforzar `is-active` con fondo/barra, reutilizando tokens del sitio.
- Mantener trigger hamburguesa/X y logo del panel.

**Non-Goals:**
- No cambiar orden/listado de los 7 links ni añadir/remover secciones.
- No tocar lógica de apertura/cierre ni rutas, ni introducir librería de iconos nueva, ni reescribir tokens globales en `styles.css`.

## Decisions

**D1: Altura `auto` + `max-height:100dvh` + `overflow:auto`; centrado solo si full-screen es requerido.**
- Por qué: `height:100vh` fuerza vacío si contenido < viewport (7 links ~300px en 800px viewport deja 500px blanco). `height:auto; max-height:100dvh; overflow:auto` ajusta a contenido y scrollea si excede. Si diseño exige full-screen (decisión visual), usar `.nav { display:flex; flex-direction:column; justify-content:center }` o `.nav__list { flex:1; justify-content:center }` para centrar, no `align-items` arriba.
- Alternativa: `height:100dvh` fijo + `padding-bottom` — mantiene vacío.

**D2: Íconos Font Awesome `fas` ya cargado (`all.min.css`) con `gap:0.7rem` en `.nav__link`, sin SVG nuevo.**
- Por qué: `portal/fontawesome` ya está en todas las páginas y se usa con `fas fa-flag` etc. en `mision_vision`; evita bundle extra. Mapeo: `fa-house` Inicio, `fa-users`/`fa-circle-info` Nosotros, `fa-file-lines` Admisión, `fa-graduation-cap` Programas, `fa-scale-balanced` Transparencia, `fa-handshake-angle`/`fa-bell-concierge` Servicios, `fa-images` Galería. `font-size:0.95rem` ícono, `color:var(--text-muted)` normal, `var(--primary)` en activo, mantiene `gap` y no desborda en 320px.
- Alternativa: SVGs inline como en `beneficio-icon-wrap` — más markup y duplicación.

**D3: Activo con `background:rgba(var(--primary-rgb),0.08)` + `border-left:4px solid var(--primary)` o `::before` 4px + `color:var(--primary)` y `i {color:var(--primary)}`.**
- Por qué: combina dos señales (fondo + barra) como en `.docente__area h2` y `presentacion__title`, más visible que solo texto. `4px` es el ancho usado en `docente__area h2 border-left:5px`, sutil pero escaneable. No se usa `font-weight` solo.
- Alternativa: solo `font-weight:700` — insuficiente; solo fondo sólido `var(--primary)` con texto blanco — más invasivo.

**D4: Logo fondo ocultable con `header.menu-open .brand { opacity:0 }` o `visibility:hidden` vía clase `is-menu-open` en `body`/`header`, manteniendo `nav__header` logo.**
- Por qué: evita duplicado visual sin quitar logo del panel (requerido). `opacity` con `pointer-events:none` es reversible y no remueve layout; `display:none` desplazaría hamburguesa. Se añade clase en `include.js` toggle junto a `body.nav-open`.
- Alternativa: ocultar `nav__header` logo — incumple "mantener logo del panel".

## Risks / Trade-offs

- [Altura auto puede hacer panel corto en pantallas altas, se ve como drawer pequeño] → Mitigación: usar `min-height:fit-content` + `max-height:100dvh` y si se quiere full-screen, centrar lista con flex como D1 alternativo.
- [Íconos aumentan ancho y pueden envolver en 320px] → Mitigación: `gap:0.7rem`, `font-size:0.9rem` para link, `white-space:nowrap` no forzado, `flex-wrap` permitido.
- [Barra 4px + fondo puede chocar con `border-radius` del link] → Mitigación: barra como `::before` absoluto con `border-radius:0 4px 4px 0` o `border-left` con `border-radius: var(--radius-sm)` y `overflow:hidden` en link.
- [Ocultar logo de fondo puede confundir al cerrar si transición no revierte] → Mitigación: toggle con clase en `body` que se quita en `closeNav()`, transición `opacity 0.2s ease` reversible.

## Migration Plan

1. Editar `portal/js/include.js: headerHTML` — añadir `<i class="fas ...">` por link con mapeo anterior, manteniendo texto y `data-page`.
2. Editar `portal/css/styles.css` — altura `.nav` a `auto/max-height`, `.nav__list` gap/centrado, `.nav__link` con `gap` para ícono y `is-active` con fondo/barra; añadir regla para ocultar `brand` cuando `body.nav-open` si se implementa.
3. Verificar que `portal/fontawesome/css/all.min.css` sigue cargado (ya lo está) y que `hamburger`/`nav__close` siguen funcionando.
4. QA mobile 320/375/768/900px: altura sin vacío, iconos alineados, activo con barra visible, logo panel presente, cierre X intacto.
5. `openspec validate --changes --strict` 0 errores.

## Open Questions

- ¿Altura auto ajustada vs full-screen centrado? Se deja a implementación (ambos cumplen spec; se prefiere auto con `max-height`).
