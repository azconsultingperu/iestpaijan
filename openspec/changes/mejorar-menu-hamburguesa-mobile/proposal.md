## Why

En mobile el panel de navegación (header logo + 7 links) ocupa altura completa pero solo llena la parte superior con texto plano, dejando gran zona vacía inferior y con feedback de activo muy sutil (texto rojo sobre rosa claro). Da sensación de menú incompleto y poco escaneable.

## What Changes

- **Altura ajustada al contenido:** el panel `.nav` en `portal/css/styles.css` SHALL ajustarse al alto real de los 7 links + header + footer (auto con `max-height`/`fit-content`) eliminando espacio vacío inferior; si por diseño debe ser full-screen overlay, SHALL centrar verticalmente la lista `.nav__list` en vez de dejarla anclada arriba.
- **Ícono por link:** agregar ícono a la izquierda de cada link (Inicio, Nosotros, Admisión, Programas, Transparencia, Servicios, Galería) reutilizando set ya disponible `portal/fontawesome/css/all.min.css` (Font Awesome 6) o SVGs inline existentes (ej. `fas fa-flag`/`fa-eye`/`fa-hand-holding-heart` de `mision_vision`), sin agregar librería nueva; mapeo p. ej. `fa-home` Inicio, `fa-info-circle` Nosotros, `fa-clipboard` Admisión, `fa-graduation-cap` Programas, `fa-balance-scale` Transparencia, `fa-concierge-bell` Servicios, `fa-images` Galería.
- **Activo reforzado:** además de `color:var(--primary)`, el item activo SHALL tener fondo más marcado (`rgba(var(--primary-rgb),0.08–0.12)` o `var(--primary)` con `color:#fff`) y/o barra lateral de acento `border-left:4px solid var(--primary)` o `::before` como la usada en `.docente__area h2` / `.presentacion__title::after`, y/o ícono en `var(--primary)` para distinción inmediata.
- **Logo duplicado:** mantener logo del panel (`nav__header` con `logo-transp.png` + "IESTP Paiján" en `portal/js/include.js: headerHTML`) y evaluar ocultar logo del header de fondo (`brand__img`/`brand__text`) con `header.is-menu-open` o similar mientras el menú está abierto, solo si no rompe layout.
- **Scope intacto:** no se cambia listado ni orden de los 7 links, ni trigger hamburguesa (`hamburger`/`#menu-toggle` en `include.js`) ni botón X de cierre (`.nav__close`); solo tamaño del panel + iconos + estilo activo.
- **Archivos confirmados:** componente render `portal/js/include.js: headerHTML` (genera `header`, `nav`, `nav__header`, `nav__list`, `nav__link is-active`) y estilos `portal/css/styles.css` (`.nav`, `.nav__list`, `.hamburger`, `@media` mobile), con toggle en `portal/js/include.js`/`portal/js/script.js`; iconos disponibles `portal/fontawesome/css/all.min.css` ya cargado en todas las páginas.

## Capabilities

### New Capabilities
- `mobile-nav`: Panel de navegación mobile — altura ajustada al contenido, iconos por link, y estilo reforzado del item activo con barra/acento, usando set de iconos existente.

### Modified Capabilities
- (ninguna — `mision-vision-cards`, `plana-docente`, `media-assets` no cambian)

## Impact

- **Código afectado:** `portal/js/include.js` (añade `<i class="fas ...">` por link en `headerHTML`), `portal/css/styles.css` (altura/centrado del `.nav`, `__link` con `gap` para ícono, `is-active` con `background`/`border-left`/`color`), posible clase en `header` para ocultar logo de fondo al abrir. Sin nuevas dependencias ni rutas.
- **Compatibilidad:** solo visual en `max-width:768px/900px`; mantiene clases `.nav`, `.nav__link`, `is-active`, `hamburger is-active`, y comportamiento apertura/cierre.
- **Riesgo:** íconos aumentan ancho del link en móvil estrecho — mitigado con `gap:0.6rem` y `font-size:0.9rem` ya usado en `docente__card`.
