## Why

El portal almacena 792 imágenes (177 MB) con tríos AVIF+WEBP+JPG/PNG, pero el navegador solo descarga una. JPG/PNG nunca se transfieren en CSS (`image-set`) ni en `<picture>`, y en JS (galería, noticias, docentes) directamente se ignoran los formatos livianos cargando solo JPG. Resultado: 82.9 MB de JPG/PNG (47% del repo) acumulan peso en git, ralentizan clones y, paradójicamente, la galería sigue transfiriendo el formato más pesado.

## What Changes

- **BREAKING** Eliminar todos los `*.jpg`, `*.jpeg` y `*.png` duplicados donde exista equivalente `*.avif` + `*.webp` (261 bases, ~82.9 MB). Mantener solo el dúo AVIF+WEBP.
- Convertir los 5 casos huérfanos (`carreras/*_bg.jpg`, `bolsa_trabajo/old-egresados_alumnos.webp`, `whatsapp.svg` se mantiene) a AVIF+WEBP.
- Migrar `portal/js/galeria.js`, `portal/js/script.js` (noticias portada), `portal/js/noticias.js`, `portal/js/jerarquica.js`, `portal/js/docentes.js`, `portal/js/nosotros.js`, `portal/js/enlaces_institucionales.js` y similares de referencia directa `.jpg/.png` a helper centralizado `pictureFor(base)` que genera `<picture><source avif><source webp><img webp></picture>` o `image-set` equivalente.
- Actualizar `portal/css/styles.css` y `portal/css/*.css` donde `image-set` aún lista `url(...jpg)` como último fallback, reemplazando por `url(...webp)`.
- Actualizar `STRUCTURE.md` y documentación de assets ("3 formatos siempre" → "2 formatos AVIF+WEBP").
- Validación: script de verificación que toda base referenciada en JS/HTML/CSS tenga `*.avif` y `*.webp` existentes; fallback a placeholder si falta.

## Capabilities

### New Capabilities
- `media-assets`: Gestión de assets de imagen del portal — formatos soportados, helper de renderizado, validación y pipeline de conversión para nuevas imágenes.

### Modified Capabilities
- (ninguna existente — `openspec/specs` está vacío, se crea capability nueva)

## Impact

- **Código afectado**: `portal/imagenes/**` (borrado 265 archivos), `portal/js/galeria.js`, `portal/js/script.js`, `portal/js/noticias.js`, `portal/js/jerarquica.js`, `portal/js/docentes.js`, `portal/js/nosotros.js`, `portal/js/enlaces_institucionales.js`, `portal/js/include.js` (nuevo helper), `portal/css/styles.css` + 15 `portal/css/*.css` con `image-set`, `STRUCTURE.md`.
- **Sistemas**: Deploy estático (sin backend), git remote (reducción de ~47% en futuros clones; historial no reescrito).
- **Compatibilidad**: AVIF 93% + WEBP 97% cobertura 2026. Fallback WEBP cubre Safari 14-15. Pérdida de soporte IE11/Android <5 sin impacto medible para el público objetivo.
- **Riesgo**: Si se borra JPG antes de migrar JS, 159 imágenes de galería + noticias rompen. Mitigado por orden de tareas (migrar refs → verificar → borrar).
