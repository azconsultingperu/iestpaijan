## 1. Preparación y conversión de huérfanos

- [x] 1.1 Convertir `portal/imagenes/carreras/acc_bg.jpg`, `enfermeria_bg.jpg`, `pagro_bg.jpg` a AVIF+WEBP con calidad equivalente (avifenc/cwebp o skill image-optimizer) y verificar `ls -lh portal/imagenes/carreras/*.{avif,webp}` muestra 6 archivos nuevos
- [x] 1.2 Generar `portal/imagenes/bolsa_trabajo/old-egresados_alumnos.avif` a partir del WEBP existente y verificar `ls portal/imagenes/bolsa_trabajo/old-egresados_alumnos.*` lista avif+webp
- [x] 1.3 Auditar `portal/imagenes/whatsapp.svg` y favicon `portal/imagenes/logo-transp.png` — decidir si favicon mantiene 1 PNG o migra a WEBP, documentar excepción en spec y verificar `<link rel="icon">` en `index.html:15` carga correctamente

## 2. Helper centralizado

- [x] 2.1 Implementar `pictureFor(base, alt)` y `imageSetFor(base)` en `portal/js/include.js` (genera `<picture>` con avif→webp→img webp + `onerror` a `placeHolderImg`) y verificar en consola `typeof pictureFor === 'function'` y que `pictureFor("portal/imagenes/hero","test").includes('image/avif')`
- [x] 2.2 Exponer `placeHolderImg` globalmente si no lo está y verificar que `onerror` reemplaza imagen rota por placeholder sin romper layout (probar con base inexistente)

## 3. Migración JS — referencias por base

- [x] 3.1 Migrar `portal/js/galeria.js` de 159 literales `".jpg"/".jpeg"` a `base` sin extensión + `pictureFor` y verificar `grep -c '\.jpg' portal/js/galeria.js` == 0 y galería renderiza en `portal/galeria/index.html`
- [x] 3.2 Migrar `portal/js/script.js` (array `noticias` portada) y `portal/js/noticias.js` a helper y verificar feed `#news-feed` en `index.html` muestra 6 noticias con AVIF/WEBP en Network
- [x] 3.3 Migrar `portal/js/jerarquica.js`, `portal/js/docentes.js`, `portal/js/nosotros.js`, `portal/js/enlaces_institucionales.js` (fotos docentes, enlaces) a helper y verificar `grep -rn '\.jpg\|\.png' portal/js/*.js | grep -v '.avif\|\.webp'` == 0 para imágenes de contenido
- [x] 3.4 Migrar `portal/js/psicologico.js`, `portal/js/calendario.js`, `portal/js/admision.js` y otros JS con refs de imagen si aplican y verificar sin literales JPG/PNG residuales

## 4. Migración CSS

- [x] 4.1 Reemplazar `image-set(url("...jpg"))` por `url("...webp")` en `portal/css/styles.css:748` (hero) y `portal/css/styles.css:1131` (frontis) y verificar `grep -n 'frontis\.jpg\|hero\.jpg' portal/css/styles.css` == 0
- [x] 4.2 Reemplazar `image-set` en `portal/css/*.css` (licenciamiento, resena, tupa, galeria, transparencia, bienestar, matricula, bolsa_laboral, jerarquica, nosotros, psicologico, admision, etc.) y verificar `grep -rn '\.jpg' portal/css/ | wc -l` == 0

## 5. Migración HTML estático

- [x] 5.1 Verificar `portal/*/index.html` que usan `<picture>` directo (`bolsa_trabajo`, `resena_historica`, `presentacion`, `nosotros`, `organigrama`) ya terminan en `<img src="...webp">` no `...jpg/png` y corregir si quedan JPG/PNG

## 6. Validación pre-borrado

- [x] 6.1 Crear y ejecutar `scripts/validate-images.sh` (lista bases referenciadas en JS/HTML/CSS y verifica existencia de `.avif` y `.webp`) y verificar exit 0 en local
- [x] 6.2 QA visual manual en Chrome/Firefox/Safari (hero, frontis, galería 2026/cachimbo, noticias portada, organigrama, docentes, enlaces) y verificar Network muestra `avif` o `webp` y no `jpg/png`, sin imágenes rotas

## 7. Borrado y documentación

- [x] 7.1 Ejecutar `git rm portal/imagenes/**/*.jpg portal/imagenes/**/*.jpeg portal/imagenes/**/*.png` (respetando excepciones documentadas de favicon/svg) y verificar `find portal/imagenes -name "*.jpg" -o -name "*.png" | wc -l` == excepciones (0-1)
- [x] 7.2 Actualizar `STRUCTURE.md:39` de "3 formatos AVIF y WebP + fallback JPG/PNG" a "2 formatos AVIF+WEBP" y verificar `grep -n AVIF STRUCTURE.md` refleja nueva convención
- [x] 7.3 Actualizar comentarios en `portal/css/styles.css` y docs de pipeline (README si aplica) para indicar que nuevas imágenes se agregan solo como `base.avif` + `base.webp` vía `cwebp`/`avifenc` o skill `image-optimizer`
- [x] 7.4 Re-ejecutar `validate-images.sh` + QA visual post-borrado y verificar `du -sh portal/imagenes` ≈ 94 MB (vs 177 MB) y `git status` sin refs rotas

## 8. Verificación final

- [x] 8.1 Ejecutar `openspec validate --change optimizar-imagenes-avif-webp --strict` y verificar sin errores
- [x] 8.2 Lighthouse / DevTools: comparar peso total de imágenes en portada+galería antes/después y verificar reducción ≥40% y LCP no regresa
