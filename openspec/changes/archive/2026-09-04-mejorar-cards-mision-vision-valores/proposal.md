## Why

En el módulo "Nosotros" (`portal/nosotros/index.html#mision-vision`) y en la página dedicada (`portal/mision_vision/index.html`) las 3 cards Misión/Visión/Valores (`.mision_vision__item`) están demasiado juntas (`gap: 2rem` sin margen de respiración para el hover). El hover actual (`transform: translateY(-4px)` + `box-shadow: 0 12px 36px`) se solapa con la card vecina por falta de gap y de `z-index`/aislamiento. Además comparten el mismo fondo blanco plano sin jerarquía tipográfica ni distinción sutil, por debajo del nivel visual del resto del portal (p. ej. `pres-values__card` en `portal/css/nosotros.css:425`).

## What Changes

- **Gap/spacing sin solapamiento:** aumentar `gap` del grid `.mision_vision__contenido` y/o añadir `padding`/margen alrededor de las cards para que la elevación del hover no invada el espacio de la card contigua, en desktop (3 columnas) y en mobile (1 columna apilada). Incluir `isolation`/`z-index` en hover para que la card elevada quede por encima sin recorte por `overflow`.
- **Polish visual de la card (sin cambiar contenido ni orden):** borde sutil (`1px solid var(--border)` ya existe, refinar tono), sombra base `0 4px 20px rgba(0,0,0,0.04)` refinada, transición pulida (`transform` + `box-shadow` + `border-color` con easing), hover con leve elevación (`translateY -4px ~ -6px`) y sombra más profunda sin `scale` que expanda el footprint; mantener `border-radius: var(--radius-lg)` y `background: var(--bg-card)`.
- **Jerarquía tipográfica:** reforzar contraste entre `h2` (título + ícono `fa-flag`/`fa-eye`/`fa-hand-holding-heart` en `var(--primary)`/`var(--gold)`) y `p`/`ul li` (texto en `var(--text-muted)` con `line-height 1.7-1.8`), sin cambiar copy ni orden Misión → Visión → Valores.
- **Alcance de archivos (confirmado):** componente HTML en `portal/mision_vision/index.html:59,75,91` y `portal/nosotros/index.html:135,139,143` duplicado; CSS rector en `portal/css/mision_vision.css:38` y `portal/css/nosotros.css:415` (este último es el que hoy rige el hover y debe ser fuente de la mejora). No tocar `portal/css/styles.css` salvo tokens ya existentes.
- **No-objetivos:** no cambiar a layout de 3 columnas distinto (ya existe en `@media min-width:768px`), no reordenar sección, no cambiar íconos/colores de marca, no tocar `section-banner`.

## Capabilities

### New Capabilities
- `mision-vision-cards`: Cards Misión/Visión/Valores — spacing, hover sin solapamiento, estilo de contenedor y jerarquía tipográfica dentro del layout actual del módulo Nosotros.

### Modified Capabilities
- (ninguna — `media-assets` y `plana-docente` no cambian)

## Impact

- **Código afectado:** `portal/css/nosotros.css:414-479` (fuente principal del hover/gap) y `portal/css/mision_vision.css:38-92` (página dedicada, debe quedar alineada); HTML de `portal/mision_vision/index.html` y `portal/nosotros/index.html` no requiere cambio estructural salvo opcionalmente añadir clase o wrapper si el diseño lo exige (se prefiere solo CSS). Sin cambio de rutas ni de contenido.
- **Compatibilidad:** solo visual; mantiene clases `.mision_vision`, `__contenido`, `__item`, `h2`, `p`, `ul li`. No rompe anclas `#mision-vision`.
- **Riesgo:** gap mayor reduce densidad en desktop — mitigado con `gap` equilibrado y `padding` de sección `2rem 1rem 4rem` existente; hover con `z-index` no debe crear stacking context que tape el `section-banner` vecino.
