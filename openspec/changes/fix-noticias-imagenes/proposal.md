## Why

En `portal/imagenes/noticias/` ya solo existen `*.avif`+`*.webp` (tras `optimizar-imagenes-avif-webp`), pero `portal/js/script.js` (el que pinta `#news-feed` en el home) sigue referenciando `*.jpeg/*.jpg` y renderiza con `<img src=".jpeg">` sin `<picture>`. Resultado: 404 siempre → `onerror` → placeholder gris `#efece6` y el usuario percibe "no hay imagen". Es regresión del revert.

## What Changes

- Migrar `portal/js/script.js:initNoticias()` a bases sin extensión (`aviso-2026-1`, `dia_del_trabajador`, `graduacion2026`, `integrantes2026`, `admision/primer_admision/1`, `inicio_clases20252`) vía `toBase()` + `window.pictureFor(base, alt)` para cards.
- Migrar `showArticle()` del modal a `toBase()` + `src webp` con fallback `avif`/`placeHolderImg` (como ya hace `portal/js/noticias.js`).
- Asegurar orden de carga `include.js` antes que `script.js` en `index.html` para que `pictureFor` esté disponible al pintar.
- No tocar `portal/js/noticias.js` ni `portal/noticias/embed.html` (ya correctos); no reintroducir `.jpg`.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `media-assets`: corrige regresión del Requirement "Migración de referencias JS" y "Renderizado con picture y fallback WEBP" — `script.js` vuelve a usar helper y bases sin extensión, sin literales `.jpg/.jpeg` para noticias.

## Impact

- Código: `portal/js/script.js`, `index.html` (orden scripts). Sin impacto en `portal/imagenes/**` ni en `portal/css/noticias.css`.
- Validación: `grep -c "\.jpeg\|\.jpg" portal/js/script.js` debe dar 0 para noticias; `scripts/validate-images.sh` sigue pasando.
- Riesgo bajo: cambio aislado al home, sin breaking.
