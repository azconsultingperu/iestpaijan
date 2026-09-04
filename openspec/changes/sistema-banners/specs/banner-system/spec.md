## Purpose

Proveer un Banner System reutilizable, consistente y escalable para todo el portal IESTP Paiján que permita variantes visuales por tipo de contenido sin duplicar HTML/CSS y manteniendo la identidad institucional.

## ADDED Requirements

### Requirement: Estructura HTML reutilizable
El sistema SHALL definir una estructura HTML común para todos los banners con elementos `.banner`, `__media`, `__overlay`, `__content`, `__eyebrow`, `__title`, `__subtitle` y `__decoration`.

#### Scenario: Estructura común presente
- **WHEN** se inspecciona cualquier banner del portal
- **THEN** el markup contiene `.banner` con `.banner__media`, `.banner__overlay` y `.banner__content` con `__eyebrow`/`__title`/`__subtitle` opcionales

### Requirement: Variantes visuales
El sistema SHALL proveer 6 variantes diferenciadas: `banner--hero`, `banner--split`, `banner--institutional`, `banner--historical`, `banner--academic`, `banner--visual`, cada una con composición y uso definido.

#### Scenario: Variante hero para páginas institucionales
- **WHEN** una página usa `banner--hero` (nosotros, admisión, programas, servicios, transparencia)
- **THEN** muestra foto protagonista, gradient, texto izquierda, eyebrow y subtítulo opcionales

#### Scenario: Variante split con foto de calidad
- **WHEN** una página usa `banner--split` con foto horizontal de calidad
- **THEN** el banner se divide izquierda texto / derecha foto, y en móvil se apila verticalmente

#### Scenario: Variante institutional sin foto obligatoria
- **WHEN** una página usa `banner--institutional` (organigrama, plana docente, autoridades)
- **THEN** el banner usa fondo limpio con patrones geométricos sutiles y decoración dorada/granate, sin requerir foto

### Requirement: Clases CSS reutilizables y arquitectura
El sistema SHALL exponer clases base `.banner*` con estilos compartidos y variantes con solo diferencias, sin duplicación por página.

#### Scenario: Base compartida
- **WHEN** se inspecciona `portal/css/banner-system.css` o `styles.css`
- **THEN** los estilos comunes (layout, overlay base, tipografía) están en `.banner`, y cada variante solo añade diferencias (no duplica toda la regla)

#### Scenario: Agregar nuevo banner sin CSS nuevo
- **WHEN** se crea una nueva página y se asigna `class="banner banner--academic"`
- **THEN** el banner se ve correcto sin escribir CSS nuevo, solo seleccionando variante y definiendo `data-title`/`data-subtitle`

### Requirement: Sistema responsive
El sistema SHALL funcionar en desktop, tablet y móvil con tipografía y composición adaptadas y sin alturas rígidas que rompan el layout.

#### Scenario: Desktop horizontal
- **WHEN** viewport ≥ 1024px y variante `banner--split`
- **THEN** el banner mantiene composición horizontal con título grande y foto amplia

#### Scenario: Móvil compacto
- **WHEN** viewport < 600px
- **THEN** el banner no excede 220px de altura, títulos se limitan a 2-3 líneas, split se apila verticalmente e imágenes se recortan con `object-fit: cover`

### Requirement: Reglas para imágenes y overlay
El sistema SHALL definir reglas para imágenes (uso de `image-set` AVIF/WEBP, foto protagonista no cubierta totalmente) y overlay en `linear-gradient` con transparencias.

#### Scenario: Overlay con degradado
- **WHEN** se inspecciona `.banner__overlay`
- **THEN** el background es `linear-gradient` con transparencias (ej. `rgba(142,15,27,0.92)` → `rgba(142,15,27,0.10)`) y la foto sigue reconocible, no `rgba` plano 0.85

### Requirement: Jerarquía tipográfica
Cada banner SHALL exponer `__eyebrow`, `__title` y `__subtitle` con jerarquía clara usando `font-weight` alto, `line-height` compacto, tamaños fluidos con `clamp()` y contraste elevado.

#### Scenario: Jerarquía visible
- **WHEN** un banner define eyebrow, título y subtítulo
- **THEN** el eyebrow es `0.72rem` uppercase tracking, título es `clamp(1.8rem, 4vw, 2.8rem)` `700-800`, subtítulo es `0.95rem` muted, con contraste AA sobre el overlay

### Requirement: Decoración y iconografía opcional
La decoración SHALL usar recursos sutiles (líneas, retículas, formas circulares, transparencias, detalles dorados) sin saturar, y los íconos no SHALL ser obligatorios en todos los banners.

#### Scenario: Decoración sutil
- **WHEN** se inspecciona un banner `banner--institutional`
- **THEN** se ven líneas o retícula a `opacity:0.06-0.12` y detalles dorados discretos, sin animación infinita

#### Scenario: Ícono opcional
- **WHEN** un banner no define ícono
- **THEN** el layout no deja hueco y el título se centra correctamente sin el badge

### Requirement: Animaciones y accesibilidad
Las animaciones SHALL ser discretas (fade, translateY 8-12px, scale 1.02, 250-600ms, easing suave) y respetar `prefers-reduced-motion`; todos los banners SHALL cumplir contraste, semántica, `alt` y navegación por teclado.

#### Scenario: Animación discreta
- **WHEN** un banner entra en viewport en desktop sin `prefers-reduced-motion`
- **THEN** el contenido hace `fade` + `translateY(12px)` en 400ms y la imagen `scale(1.02)` sin parallax exagerado

#### Scenario: Reduced motion respetado
- **WHEN** el usuario tiene `prefers-reduced-motion: reduce`
- **THEN** no se ejecutan animaciones de entrada ni scale de imagen
