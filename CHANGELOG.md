# Changelog

Todos los cambios notables del portal del IESTP Paiján se documentan en este
archivo. Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).

## [Unreleased]

### Agregado

- `STRUCTURE.md`: mapa del repositorio para mantenimiento (dónde se edita cada contenido, formato de imágenes y scripts de datos).
- `README.md`: ficha institucional del portal (creación en 1987, R.M. N° 498-87-ED, matrícula gratuita, programas, contacto y secciones), verificada directamente en el sitio.
- `CHANGELOG.md`: registro de cambios notables del portal.
- Botón flotante de contacto tipo speed dial (réplica Buttonizer) en `index.html` (inline HTML+CSS+JS) y `portal/js/include.js` + `portal/css/styles.css`: principal WhatsApp `#25D366` (`https://wa.me/51919490297`), sub-botones Llamar `tel:+51919490297` `#4a90d9`, Email `mailto:admision@iestpaijan.edu.pe` `#7a1f2b`, Ubicación `https://www.google.com/maps/search/?api=1&query=...` `#c9a24b`; abanico 90° navaja suiza (`--x:-72/-52/-12`, `--y:-6/-50/-78` desktop, `-62/-44/-8` móvil), animación fade+slide, tooltips, `aria-label`, soporte hover/touch y desplazamiento de `to-top` (`to-top--dial-open` + `body:has()`).

### Cambiado

- README: línea final con enlace a `STRUCTURE.md` (acceso de navegación, sin información técnica en la ficha).
- `portal/css/styles.css`: `.whatsapp-float` oculto, nuevo `.contact-dial` con `z-index:999` sin romper layout, `to-top` con transición `bottom` y `body:has()` fallback.

### Corregido

- El README registra la discrepancia real del sitio sobre la resolución de creación (R.M. N° 498-87-ED en el encabezado/pie frente a R.M. N.° 1176-87-ED citada en la reseña histórica), sin decidir por el visitante.
- Colisión de iconos en abanico: tamaño reducido (`52px/42px`, iconos `26px/18px`) y separación aumentada (`48.3px` vs `42px`); `to-top` ya no tapa el abanico al desplegarse.

## [2026-08-09]

### Agregado

- Sección «Ficha» institucional en el README con datos verificables (eslogan, R.M. de creación y matrícula gratuita).
- Estado vacío y mensajes de error visibles en el formulario de contacto de la portada.
- Accesibilidad: foco visible al navegar con teclado y soporte para quienes prefieren menos movimiento (desactiva animaciones Ken Burns y revelaciones al hacer scroll).

### Corregido

- Datos del hero de la portada reemplazados por cifras verificables: «Matrícula gratuita 100 %», «R.M. de creación 498» y años de experiencia calculados desde 1987, en lugar de cifras sin fuente.
- Formulario de contacto con validación en orden y mensajes de error claros.

### Cambiado

- Navegación unificada en todas las páginas: pestañas con iconos, compensación de scroll y botones «Volver» en las subpáginas.
- Galería: textos alternativos descriptivos en cada foto y acceso completo por teclado.

## [2026-08-04]

### Cambiado

- Rediseño del portal: encabezado con menú adaptable (hamburguesa) y estilos responsivos para móviles.

### Corregido

- Búsqueda optimizada (SEO), títulos de página, imágenes y proporciones de elementos en las secciones.

_Registro descriptivo: solo cambios visibles o de contenido del sitio._