## 1. Core - migrar script.js a bases + pictureFor

- [x] 1.1 Migrar array `noticias[]` en `portal/js/script.js` a bases sin extensión (`aviso-2026-1`, `fallesimiento_07_05_2026`, `dia_del_trabajador`, `graduacion2026`/`integrantes2026`, `admision/primer_admision/1`, `inicio_clases20252`) vía `imgBase + base` y verificar `grep -n "\.jpeg\|\.jpg" portal/js/script.js | grep noticias` == 0
- [x] 1.2 Añadir helper `toBase()` y `pictureFor` fallback en `script.js:initNoticias` y renderizar cards con `<picture><source avif><source webp><img webp>` (como `noticias.js`) y verificar `grep -n "pictureFor\|toBase" portal/js/script.js` ≥ 2 y `grep -n "card.innerHTML" portal/js/script.js` contiene `picture`
- [x] 1.3 Migrar `showArticle()` del modal a `toBase(imagen[0]) + ".webp"` con `onerror` → `.avif` → `window.placeHolderImg` y verificar que `grep -n "modalImg.src" portal/js/script.js` no contiene `.jpg`

## 2. Orden de carga

- [x] 2.1 Verificar que `index.html` carga `portal/js/include.js` antes que `portal/js/script.js` y que `window.pictureFor` está disponible al pintar `initNoticias`, verificando orden con `grep -n "script src" index.html`

## 3. Validación

- [x] 3.1 Ejecutar `bash scripts/validate-images.sh` y verificar exit 0 y que `ls portal/imagenes/noticias/*.avif portal/imagenes/noticias/*.webp portal/imagenes/admision/primer_admision/1.avif` existen
- [x] 3.2 Smoke manual del home: abrir `index.html#noticias` y verificar que las 6 cards muestran foto real (no placeholder gris) y que el modal navega prev/next sin 404 (Network sin 404 para `*.jpeg`)
