## Purpose

Ofrecer navegación móvil del portal IESTP Paiján con panel de altura ajustada al contenido, links con iconos identificables y estado activo con acento visual claro usando el set de iconos existente.

## ADDED Requirements

### Requirement: Altura del panel ajustada al contenido
El panel de navegación mobile `.nav` SHALL ajustarse al alto real de su contenido (header del panel con logo + lista de 7 links + footer) sin dejar zona vacía grande inferior; si por diseño el overlay es full-screen, la lista `.nav__list` SHALL centrarse verticalmente en vez de quedar anclada arriba con vacío debajo. El comportamiento SHALL mantenerse en `max-width:768px/900px` donde se activa el menú hamburguesa.

#### Scenario: Panel sin zona vacía inferior
- **WHEN** el usuario abre el menú en mobile (≤900px) en cualquier página
- **THEN** el panel ocupa solo el alto necesario para mostrar header + 7 links + footer (o usa `fit-content`/`auto` con `max-height:100dvh` y `overflow:auto` si excede), sin una gran zona blanca vacía debajo de Galería

#### Scenario: Full-screen alternativo centrado
- **WHEN** el diseño requiere overlay a pantalla completa por decisión visual
- **THEN** `.nav__list` se centra verticalmente (flex `justify-content:center` o equivalente) en vez de `flex-start`, de modo que los 7 links no queden pegados arriba

#### Scenario: Cierre y scroll no roto
- **WHEN** el panel está abierto y el usuario hace scroll o toca el overlay/ X
- **THEN** el panel mantiene `overflow:auto` si excede viewport y el cierre con `.nav__close` o `hamburger` funciona sin bloquear scroll del body tras cerrar

### Requirement: Ícono por link de navegación
Cada link del menú mobile SHALL mostrar un ícono a la izquierda del texto, reutilizando `portal/fontawesome/css/all.min.css` (Font Awesome 6 ya cargado) o SVGs inline del sitio, sin agregar librería nueva. Los 7 links SHALL tener iconos coherentes: Inicio (`fa-home`/`fa-house`), Nosotros (`fa-users`/`fa-info-circle`), Admisión (`fa-clipboard-list`/`fa-file-alt`), Programas (`fa-graduation-cap`), Transparencia (`fa-balance-scale`/`fa-file-contract`), Servicios (`fa-concierge-bell`/`fa-hand-holding`), Galería (`fa-images`/`fa-photo-film`), con `gap:0.6–0.8rem` entre ícono y texto, `font-size` ícono 0.95rem y color `var(--text-muted)` o `var(--primary)` según estado, manteniendo orden actual.

#### Scenario: Iconos visibles en cada link
- **WHEN** el usuario abre el menú mobile
- **THEN** cada uno de los 7 textos (Inicio, Nosotros, Admisión, Programas, Transparencia, Servicios, Galería) muestra un `<i class="fas ...">` a su izquierda, alineado verticalmente, sin romper `gap` ni desbordar en 320px

#### Scenario: Set reutilizado sin librería nueva
- **WHEN** se inspecciona el HTML del panel
- **THEN** los íconos usan clases `fas` de Font Awesome ya presente en `portal/fontawesome` o SVG inline existente, sin `<link>` nuevo ni `npm` extra

#### Scenario: Orden preservado
- **WHEN** se compara el listado antes/después en `portal/js/include.js: headerHTML`
- **THEN** el orden Inicio → Nosotros → Admisión → Programas → Transparencia → Servicios → Galería permanece idéntico

### Requirement: Estado activo reforzado
El link activo (`.nav__link.is-active` en `portal/js/include.js`) SHALL distinguirse no solo por `color:var(--primary)` sobre fondo rosado claro, sino también por fondo más marcado (`background: rgba(var(--primary-rgb),0.08–0.12)` o `var(--primary)` con `color:#fff`) y/o barra lateral de acento (`border-left:4px solid var(--primary)` o `::before` de 3–4px como en `.docente__area h2` / `presentacion__title::after`), y/o ícono en `var(--primary)`, para identificación inmediata.

#### Scenario: Activo con barra/acento visible
- **WHEN** el usuario está en "Inicio" y abre el menú
- **THEN** "Inicio" muestra barra/acento vertical a la izquierda (4px `var(--primary)`) y/o fondo `rgba(var(--primary-rgb),0.08)` además de texto `var(--primary)`, distinguible de los otros 6 links en `var(--text-muted)` o `var(--text)`

#### Scenario: Solo un activo a la vez
- **WHEN** el usuario navega a "Programas"
- **THEN** solo "Programas" tiene `is-active` con acento, los demás no

### Requirement: Logo del panel sin duplicado molesto
El logo del panel (`nav__header` con `logo-transp.png` + "IESTP Paiján" en `portal/js/include.js`) SHALL mantenerse, y el logo del header de fondo (`brand__img`/`brand__text`) MAY ocultarse mientras el menú está abierto (p. ej. `header.is-menu-open .brand { opacity:0; pointer-events:none }` o `visibility:hidden`) si es sencillo sin romper layout, para evitar sensación de duplicado.

#### Scenario: Logo panel presente y fondo opcional
- **WHEN** el menú está abierto
- **THEN** el `nav__header` sigue mostrando logo + "IESTP Paiján" y cierre X; el logo de fondo puede estar oculto o atenuado, sin desplazar el header ni romper `hamburger` toggle

#### Scenario: Trigger y cierre intactos
- **WHEN** el usuario toca hamburguesa o X
- **THEN** el menú abre/cierra igual que antes, sin cambiar listado ni orden, con misma animación y overlay
