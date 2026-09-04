## Purpose

Unificar y mejorar el banner superior de secciones del portal IESTP Paiján como componente reutilizable con breadcrumb, altura compacta, overlay en degradado, transición wave/diagonal, subtítulo opcional e ícono en badge.

## ADDED Requirements

### Requirement: Componente único de banner
El sistema SHALL proveer un único componente/estilo para el banner de secciones (`.section-banner` / helper JS), reutilizado en todas las páginas con patrón, en vez de HTML/CSS copiado por página.

#### Scenario: Una sola fuente de verdad
- **WHEN** se edita el estilo o markup del banner en `portal/css/styles.css` (o helper `portal/js/banner.js` / `include.js`)
- **THEN** el cambio se refleja en las 28 páginas con banner simple y en las 5 hero sin editar cada HTML manualmente (salvo datos `data-breadcrumb`/`data-subtitle` por página)

#### Scenario: Sin duplicados por página
- **WHEN** se inspecciona `portal/css/licenciamiento.css`, `tupa.css`, `galeria.css`, etc.
- **THEN** no contienen reglas duplicadas de `.section-banner` / `image-set` / `::before`; toda la definición vive en `styles.css`

### Requirement: Breadcrumb sutil
Cada banner SHALL mostrar un breadcrumb sutil arriba del título (ej. "Inicio › Nosotros › Plana Jerárquica") derivado de la jerarquía real de la página. Si no se define, SHALL ocultarse sin hueco.

#### Scenario: Breadcrumb con datos
- **WHEN** la página define `data-breadcrumb="Inicio › Nosotros › Plana Jerárquica"` o `data-page="plana_jerarquica"` mapeado a jerarquía
- **THEN** el banner muestra el breadcrumb en `0.72rem`, `opacity:0.85`, centrado arriba del título

#### Scenario: Breadcrumb ausente
- **WHEN** la página no define breadcrumb ni es derivable de la URL
- **THEN** el banner no muestra breadcrumb y no deja espacio vertical extra

### Requirement: Altura compacta
El banner SHALL tener altura vertical reducida respecto al actual (`padding: 4rem 1rem` → `2.5rem 1rem` desktop, `2.5rem → 1.8rem` móvil; hero `min-height:220px → 160px`).

#### Scenario: Altura desktop reducida
- **WHEN** viewport ≥ 768px
- **THEN** `.section-banner` tiene `padding: 2.5rem 1rem` y `.section-banner--hero` `min-height:160px` y `padding: 3rem 1rem 2.5rem`

### Requirement: Overlay en degradado
El overlay del banner SHALL ser un degradado institucional (rojo oscuro `rgba(var(--primary-rgb),0.88)` → tono más oscuro/transparente `rgba(50,8,12,0.55)` + radial sutil `rgba(255,235,190,0.06)`) en vez de color plano, dejando ver más la imagen de fondo.

#### Scenario: Degradado visible
- **WHEN** se inspecciona `.section-banner::before` o `.section-banner--hero::before`
- **THEN** el `background` contiene `linear-gradient(135deg, rgba(var(--primary-rgb),0.88), rgba(50,8,12,0.55))` y `radial-gradient` sutil, no un `rgba` plano único

### Requirement: Transición inferior suave
El borde inferior del banner SHALL tener transición suave hacia el contenido (wave SVG o `clip-path: ellipse` / diagonal `2-3deg`) en vez de corte recto.

#### Scenario: Wave/diagonal presente
- **WHEN** se inspecciona el banner en desktop
- **THEN** existe un elemento `::after` o SVG con `clip-path` / `background: url(wave.svg)` que genera curva/diagonal sutil de ~24-32px de altura, sin afectar el flujo del contenido

### Requirement: Subtítulo opcional
Cada banner SHALL soportar un subtítulo de una línea debajo del título (ej. "Conoce a las autoridades del IESTP Paiján"), definido por página vía `data-subtitle` o parámetro del helper; si no existe SHALL ocultarse sin hueco ni salto de layout.

#### Scenario: Subtítulo con datos
- **WHEN** la página define `data-subtitle="Conoce a las autoridades..."`
- **THEN** el banner muestra `.section-banner__desc` debajo del título en `0.95rem`, `opacity:0.72`, centrado

#### Scenario: Subtítulo ausente sin hueco
- **WHEN** la página no define subtítulo
- **THEN** no se renderiza `.section-banner__desc` y el gap entre título y sep se mantiene compacto

### Requirement: Ícono en badge
El ícono del banner SHALL mantenerse pero enmarcado en un badge circular con borde sutil (reutilizando `section-banner__icon` del hero: `48px`, `border:1px solid rgba(212,184,86,0.25)`, `background: linear-gradient(...)`, `backdrop-filter:blur`), no flotando solo.

#### Scenario: Badge visible
- **WHEN** el banner define `<span class="section-banner__icon"><i class="fas ..."></i></span>`
- **THEN** el ícono se ve dentro de un badge `48px` con borde sutil y fondo semitransparente, centrado arriba del título
