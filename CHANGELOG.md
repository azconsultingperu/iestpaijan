# Changelog

Todos los cambios notables del portal IESTP Paiján se documentan en este archivo.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/). Las fechas corresponden a los commits reales del repositorio.

## [Unreleased] — 2026-08-09

### Added

- `README.md`: documentación del repositorio (stack, estructura, cómo correr, cómo publicar contenido y tokens de diseño), creado desde verificación directa del código.
- `CHANGELOG.md`: historial de cambios (este archivo).
- Accesibilidad: `:focus-visible` global y soporte `prefers-reduced-motion` (desactiva Ken Burns, reveal-on-scroll y overshoots de transición).
- Tokens de borde y sombra en `:root` de `styles.css` (`--radius-xs..pill`, `--shadow-sm/md/lg`); radios de las hojas de estilos del portal migrados a las variables.
- Estado vacío en el feed de noticias de la portada y placeholder SVG cuando una imagen no carga.
- Mensajes de error visibles bajo los campos del formulario de contacto (nombre, correo, teléfono, programa).

### Changed

- Stats del hero con datos verificables: «Matrícula gratuita 100%» y «R.M. de creación 498» reemplazan a «500+ egresados» y «25+ docentes» (cifras sin fuente).
- Formulario de contacto: validación ordenada con `novalidate` y limpieza de errores al escribir; toast de confirmación ya no es bloqueante (flotante, `role="status"`, auto-cierre 4,5 s).
- Tarjetas de noticias de la portada ahora son `<button>` navegables por teclado; los modales (portada, galería, becas) usan `role="dialog"` + `aria-modal`, focus trap con Tab, cierre con `Escape` y restauración de foco.
- Galería: textos alternativos descriptivos por foto y acceso por teclado (Enter/Espacio).
- Headers de sección de la portada unificados en `.section__header--center` (se eliminaron estilos en línea).
- Corregido el estado `:focus` del formulario, que referenciaba variables inexistentes (`--guinda`/`--ring`); ahora usa `--primary` con anillo `rgba(--primary-rgb)`.

## [2026-08-04]

### Changed

- Actualización del set de imágenes del portal (AVIF/WebP optimizados).

## [2026-07-28]

### Changed

- Navegación unificada: pills con iconos, offset de scroll para el header fijo, botones "Volver" y resaltado de la página activa en subpáginas (`include.js`).
- Mejoras en sección Inicio y Hero de la portada.

## [2026-07-27]

### Fixed

- SEO, imágenes, secciones y títulos de páginas.

## [2026-07-26]

### Fixed

- SEO, navegación hamburguesa, imágenes y proporciones (aspect).

## [2026-07-25]

### Changed

- Menú hamburguesa rediseñado.
- Diseño responsive refinado.
- **Rediseño general del portal** ("rediseñando portal iestpaiján").

## [2026-07-23]

### Fixed

- Eslogan actualizado a ¡Crea, Innova e Inspira!.
- Correcciones del indicador de scroll ("Desplázate"): sin borde/fondo, simplificado y posicionado en el borde inferior del hero.
- Eliminada animación CSS que ocultaba tarjetas (visibilidad por defecto).

## Historial anterior

- Correcciones previas del sitio (diseño inicial, migración del antiguo portal institucional). No registradas como entradas por separado en `git log`.