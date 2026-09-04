## Purpose

Presentar Misión, Visión y Valores del IESTP Paiján en 3 cards legibles y pulidas dentro del módulo Nosotros, con espacio suficiente y hover sin solapamiento en desktop y móvil.

## ADDED Requirements

### Requirement: Espaciado sin solapamiento en hover
El sistema SHALL disponer las 3 cards Misión/Visión/Valores con separación suficiente para que el hover (elevación/sombra) nunca invada ni tape visualmente la card contigua, en desktop (grid 3 columnas) y en mobile (1 columna apilada). La card en hover SHALL quedar por encima de sus vecinas sin recorte por overflow del contenedor.

#### Scenario: Desktop sin solape
- **WHEN** el viewport es ≥ 768px y el usuario hace hover sobre la card "Misión" en `portal/nosotros/index.html#mision-vision` o en `portal/mision_vision/index.html`
- **THEN** la card se eleva sin superponerse al contenido ni al borde de "Visión"; queda un gutter visible entre ambas durante todo el hover y ninguna sombra es recortada por el grid

#### Scenario: Mobile sin solape vertical
- **WHEN** el viewport es < 768px (cards apiladas en 1 columna) y el usuario hace hover/tap sobre una card
- **THEN** la card elevada no tapa el título ni el borde superior de la card siguiente; el espacio vertical entre cards absorbe la elevación y la sombra

#### Scenario: Overflow no recorta sombra
- **WHEN** se inspecciona el contenedor `.mision_vision__contenido` y la card en hover
- **THEN** el contenedor no tiene `overflow: hidden` que recorte la sombra; la card en hover usa `z-index`/`isolation` para quedar por encima de sus hermanas

### Requirement: Estilo pulido de la card y hover contenido
Cada card `.mision_vision__item` SHALL tener fondo `var(--bg-card)`, borde sutil `1px solid var(--border)` y sombra base `0 4px 20px rgba(0,0,0,0.04)` (o equivalente refinado), con `border-radius: var(--radius-lg)` y `padding` generoso. El hover SHALL producir elevación leve (`translateY` aprox. -4px a -6px), sombra más profunda (`0 12px 36px` aprox.) y cambio sutil de `border-color`, sin `scale` que aumente el footprint ni desplace el layout; la transición SHALL ser suave (`transform` + `box-shadow` + `border-color`, 250–350ms, `ease`).

#### Scenario: Hover eleva sin expandir
- **WHEN** el usuario hace hover sobre cualquier card
- **THEN** la card se desplaza verticalmente y su sombra se intensifica, pero su ancho/alto no crece por `scale`; el layout de las otras dos cards no se mueve

#### Scenario: Estado base consistente
- **WHEN** ninguna card está en hover y se inspecciona `.mision_vision__item` sin hover
- **THEN** se observa borde sutil, sombra base y `border-radius` idénticos en las 3 cards, con el mismo `padding` (p. ej. `2rem`, `1.5rem` en ≤768px)

#### Scenario: Transición suave y accesible
- **WHEN** el usuario alterna hover rápidamente o tiene `prefers-reduced-motion: reduce`
- **THEN** la transición no parpadea ni hace salto brusco; con `prefers-reduced-motion` la elevación se reduce o se desactiva sin perder el cambio de sombra/borde

### Requirement: Jerarquía tipográfica dentro de la card
El sistema SHALL distinguir visualmente el título `h2` (con ícono `fa-flag`/`fa-eye`/`fa-hand-holding-heart` en `var(--primary)` para el texto y `var(--gold)` para el ícono) del cuerpo (`p` con `color: var(--text-muted)`, `line-height: 1.7–1.8`, texto justificado o legible) y de la lista de Valores (`ul li` con viñeta/ícono dorado y `color: var(--text-muted)`), manteniendo el orden Misión → Visión → Valores.

#### Scenario: Título destacado vs cuerpo
- **WHEN** se renderiza la card "Misión"
- **THEN** el `h2` con ícono es visiblemente más grande y de color `var(--primary)` que el `p` debajo, con `gap` entre ícono y texto y `margin-bottom` que separa título de cuerpo

#### Scenario: Lista Valores legible
- **WHEN** se renderiza la card "Valores" con sus 7 ítems (Responsabilidad, Respeto, Honestidad, Justicia, Solidaridad, Paz, Tolerancia)
- **THEN** cada `li` muestra viñeta dorada (`var(--gold)`, `✦` o check) alineada, sin bullets duplicados del navegador, con `padding-left` y `gap` consistentes

### Requirement: Contenido, orden e identidad preservados
El sistema SHALL mantener el contenido textual actual, el orden Misión → Visión → Valores y los íconos/colores de marca existentes (`fa-flag`, `fa-eye`, `fa-hand-holding-heart`, `var(--primary)`/`var(--gold)`), sin cambiar el layout de la sección a un esquema distinto (sigue siendo grid 1→3 columnas según breakpoint). No SHALL alterar `section-banner` ni anclas `#mision-vision`.

#### Scenario: Orden y copy intactos
- **WHEN** se compara el HTML antes y después del cambio en `portal/mision_vision/index.html:59,75,91` y `portal/nosotros/index.html:135,139,143`
- **THEN** los 3 bloques siguen en orden Misión/Visión/Valores con los mismos `h2` y `p`/`ul` (solo cambian clases/estilo si el CSS lo requiere, no el texto)

#### Scenario: Layout de sección sin reestructurar
- **WHEN** el viewport es ≥ 768px
- **THEN** `.mision_vision__contenido` sigue en `grid-template-columns: repeat(3, 1fr)`; en < 768px sigue en 1 columna. No se introduce un layout de 3 filas distinto ni se reordena la sección dentro de `portal/nosotros/index.html`
