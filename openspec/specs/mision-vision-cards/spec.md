# mision-vision-cards Specification

## Purpose
Presentar Misión, Visión y Valores del IESTP Paiján en 3 cards legibles y pulidas dentro del módulo Nosotros, con espacio suficiente y hover sin solapamiento en desktop y móvil.

## Requirements

### Requirement: Espaciado sin solapamiento en hover
El sistema SHALL disponer las 3 cards Misión/Visión/Valores en `grid` de 3 columnas en desktop (`@media min-width:768px { grid-template-columns: repeat(3, 1fr) }`) y 1 columna apilada en mobile/tablet (`<768px`), con `gap: 2.5rem` y altura igualada por fila, sin solapamiento en hover. La card en hover SHALL quedar por encima de sus vecinas con `position: relative; isolation: isolate; z-index: 1` y sin recorte por `overflow`, reutilizando el fix previo de espaciado como base.

#### Scenario: Desktop sin solape
- **WHEN** el viewport es ≥ 768px y el usuario hace hover sobre la card "Misión" en `portal/nosotros/index.html#mision-vision` o en `portal/mision_vision/index.html`
- **THEN** las 3 cards se muestran lado a lado con igual altura, `gap: 2.5rem` visible entre ellas, y la card elevada (`translateY -6px`) no invade el contenido ni el borde de "Visión" y su sombra no es recortada

#### Scenario: Mobile sin solape vertical
- **WHEN** el viewport es < 768px (cards apiladas en 1 columna) y el usuario hace hover/tap sobre una card
- **THEN** las cards se apilan en 1 columna con `gap: 2.5rem` vertical y ancho completo, sin overflow horizontal, y el hover/tap no tapa el título ni el borde de la card siguiente

#### Scenario: Overflow no recorta sombra
- **WHEN** se inspecciona el contenedor `.mision_vision__contenido` y la card en hover
- **THEN** el contenedor no tiene `overflow: hidden` que recorte la sombra; la card en hover usa `isolation: isolate` y `z-index: 1` para quedar por encima

### Requirement: Estilo pulido de la card y hover contenido
Cada card `.mision_vision__item` SHALL tener `background: var(--bg-card)`, `border: 1px solid var(--border)` y sombra base `0 4px 20px rgba(0,0,0,0.04)` (o equivalente refinado), con `border-radius: var(--radius-lg)` y `padding` generoso. El hover SHALL producir elevación leve (`translateY` aprox. -4px a -6px), sombra más profunda (`0 12px 36px` aprox.) y cambio sutil de `border-color`, sin `scale` que aumente el footprint ni desplace el layout; la transición SHALL ser suave (`transform` + `box-shadow` + `border-color`, 250–350ms, `ease`). El ícono SHALL presentarse como badge circular grande (56–72px, `border-radius: 50%`) con fondo en paleta de marca (`--primary` `#c62828` / `--primary-dark` / `--gold` `#d4a843` / `--gold-light`,via `linear-gradient(135deg, var(--primary), var(--primary-light))` o `var(--gold)` según card) y el ícono `fa-flag`/`fa-eye`/`fa-hand-holding-heart` en `color: #fff` o `var(--primary)` según contraste. Cada card SHALL tener acento visual con `border-top` usando solo tokens de `portal/css/styles.css:4-11`. El hover SHALL producir elevación sutil y `border-color` al tono de acento.

#### Scenario: Hover eleva sin expandir
- **WHEN** el usuario hace hover sobre cualquier card
- **THEN** la card se desplaza verticalmente (`translateY(-6px)`) y su sombra se intensifica, pero su ancho/alto no crece por `scale`; el layout de las otras dos cards no se mueve

#### Scenario: Estado base consistente
- **WHEN** ninguna card está en hover y se inspecciona `.mision_vision__item` sin hover
- **THEN** se observa borde sutil (`1px solid var(--border)` + `border-top 3px var(--primary)` unificado), sombra base y `border-radius` idénticos en las 3 cards, con el mismo `padding` (p. ej. `2rem`, `1.5rem` en ≤768px) y badge 60px centrado

#### Scenario: Transición suave y accesible
- **WHEN** el usuario alterna hover rápidamente o tiene `prefers-reduced-motion: reduce`
- **THEN** la transición no parpadea ni hace salto brusco; con `prefers-reduced-motion` la elevación se reduce o se desactiva (`transform:none`) y solo anima `box-shadow`/`border-color` en 0.2s, incluyendo badge `scale(1.05)` desactivado

#### Scenario: Badge grande con color de marca
- **WHEN** se renderiza "Misión" en desktop
- **THEN** se observa un círculo/badge de 60px arriba del título con fondo `linear-gradient(var(--primary), var(--primary-light))` unificado, ícono centrado de 22px, y no el ícono pequeño `h2 i` pegado al título anterior

#### Scenario: Acento distinto por card dentro de paleta
- **WHEN** se comparan las 3 cards lado a lado tras unificación
- **THEN** las 3 comparten acento unificado `border-top 3px var(--primary)` sin colores nuevos fuera de `styles.css:4-11`, manteniendo coherencia con header/hero/banner (se mantiene clase `--mision/--vision/--valores` pero con mismo valor para igualdad visual solicitada)

#### Scenario: Hover eleva sin expandir ni solapar
- **WHEN** el usuario hace hover sobre cualquier card
- **THEN** la card se desplaza `translateY(-6px)`, intensifica sombra y cambia `border-color` a su acento, sin `scale`; el layout de las otras dos no se mueve y no hay solape gracias a `gap: 2.5rem` y `z-index:1`

### Requirement: Jerarquía tipográfica dentro de la card
El sistema SHALL distinguir visualmente el título `h2` (con ícono `fa-flag`/`fa-eye`/`fa-hand-holding-heart` en `var(--primary)` para el texto y `var(--gold)` para el ícono) del cuerpo (`p` con `color: var(--text-muted)`, `line-height: 1.7–1.8`, texto justificado o legible) y de la lista de Valores (`ul li` con viñeta/ícono dorado y `color: var(--text-muted)`), manteniendo el orden Misión → Visión → Valores. Actualizado a `h2 clamp(1.35rem,2vw,1.55rem) 800` y `p line-height 1.85 max-width 65ch`.

#### Scenario: Título destacado vs cuerpo
- **WHEN** se renderiza la card "Misión"
- **THEN** el `h2` con badge es visiblemente más grande (`clamp 1.35rem→1.55rem`, 800, `var(--primary)`) que el `p` debajo (`var(--text-muted)`, `line-height 1.85`, `max-width 65ch`), con `margin-bottom` que separa título de cuerpo

#### Scenario: Lista Valores legible
- **WHEN** se renderiza la card "Valores" con sus 7 ítems (Responsabilidad, Respeto, Honestidad, Justicia, Solidaridad, Paz, Tolerancia)
- **THEN** cada `li` se muestra como pill con `border var(--border)`, `radius-pill`, `bg rgba(var(--primary-rgb),0.05)`, sin viñeta `✦` duplicada, envuelto con `gap` sin overflow

#### Scenario: Título con más peso que cuerpo
- **WHEN** se renderiza "Visión"
- **THEN** el `h2` es visiblemente más grande y de peso 800 en `var(--primary)` que el `p` debajo en `var(--text-muted)` con `line-height` 1.85, con separación `margin-bottom` clara y sin bloque plano sin aire

#### Scenario: Párrafo con ancho controlado
- **WHEN** se inspecciona `p` de Misión/Visión en 1200px
- **THEN** el texto tiene `line-height` 1.85 y `max-width 65ch`, legible sin efecto bloque denso

### Requirement: Contenido, orden e identidad preservados
El sistema SHALL mantener el contenido textual actual, el orden Misión → Visión → Valores y los íconos/colores de marca existentes (`fa-flag`, `fa-eye`, `fa-hand-holding-heart`, `var(--primary)`/`var(--gold)`), sin cambiar el layout de la sección a un esquema distinto (sigue siendo grid 1→3 columnas según breakpoint). No SHALL alterar `section-banner` ni anclas `#mision-vision`.

#### Scenario: Orden y copy intactos
- **WHEN** se compara el HTML antes y después del cambio en `portal/mision_vision/index.html:59,75,91` y `portal/nosotros/index.html:135,139,143`
- **THEN** los 3 bloques siguen en orden Misión/Visión/Valores con los mismos `h2` y `p`/`ul` (solo cambian clases/estilo `__badge`/`__body`/`--mision` y `h2` sin `i` inline), y los íconos siguen siendo flag/eye/hand-holding-heart

#### Scenario: Layout de sección sin reestructurar
- **WHEN** el viewport es ≥ 768px
- **THEN** `.mision_vision__contenido` sigue en `grid-template-columns: repeat(3, 1fr)`; en < 768px sigue en 1 columna. No se introduce un layout de 3 filas distinto ni se reordena la sección dentro de `portal/nosotros/index.html`

### Requirement: Valores como pills/chips coherentes
La card "Valores" SHALL presentar los 7 valores no como fila horizontal con `✦` sino como pills/chips individuales (p. ej. `.valor-pill` con `background: #fff` o `rgba(var(--primary-rgb),0.06)`, `border: 1px solid var(--border)` o `rgba(var(--primary-rgb),0.12)`, `border-radius: var(--radius-pill)`, `padding: 0.45rem 0.85rem`, `font-size: 0.85–0.9rem`, `color: var(--text-muted)` o `var(--text)`, `display: inline-flex` con `gap`), dispuestos en `flex wrap` o `grid auto-fill` con `gap: 0.5–0.6rem` y centrados o alineados, coherentes visualmente con las otras dos cards (mismo `border-radius`, `shadow`, tipografía Montserrat) pero con tratamiento distinto por ser lista.

#### Scenario: Pills visibles con 7 valores completos
- **WHEN** se renderiza "Valores" en desktop y en 375px
- **THEN** se ven 7 pills/chips etiquetados Responsabilidad, Respeto, Honestidad, Justicia, Solidaridad, Paz, Tolerancia, cada uno como elemento separado con borde/sombra sutil y sin `✦` previo, envueltos con `gap` sin overflow horizontal y sin duplicar bullets del navegador

#### Scenario: Coherencia con Misión/Visión pero distinción
- **WHEN** se comparan las 3 cards
- **THEN** "Valores" comparte `background`, `border-radius`, `padding`, `shadow` y tipografía con Misión/Visión, pero su `ul` usa `display:flex; flex-wrap:wrap` (o grid) con pills, no `p` corrido, y mantiene `h2` + badge con acento unificado
