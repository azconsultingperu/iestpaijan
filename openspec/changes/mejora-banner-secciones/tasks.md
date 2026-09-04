## 1. Consolidar CSS del banner (fuente única)

- [ ] 1.1 Unificar `.section-banner` y variantes (`--hero`, `--gold`, `--dark`, `--light`) en `portal/css/styles.css:1129` y `3883` con los 6 cambios (breadcrumb, altura `2.5rem`, degradado, wave `::after`, subtítulo, badge) y verificar `grep -rn "section-banner" portal/css --include="*.css" | wc -l` solo en `styles.css` (sin duplicados en `licenciamiento.css` etc.)
- [ ] 1.2 Eliminar reglas duplicadas de `.section-banner` / `image-set` / `::before` de `portal/css/licenciamiento.css`, `resena.css`, `tupa.css`, `galeria.css`, `transparencia.css` y otros 7 archivos que repiten `frontis` y verificar `grep -rn "section-banner" portal/css/*.css --include="*.css" | grep -v "styles.css" | wc -l` == 0

## 2. Helper reutilizable para HTML

- [ ] 2.1 Crear helper `renderSectionBanner` en `portal/js/include.js` (o `portal/js/banner.js` importado) que lea `data-breadcrumb`, `data-subtitle`, `data-icon` del `<section>` o reciba objeto y genere `<nav class="section-banner__breadcrumb">` + badge + título + subtítulo + wave, con fallback a derivar breadcrumb de `data-page`/`location.pathname` y ocultar breadcrumb/subtítulo si vacío sin hueco, y verificar `grep -rn "renderSectionBanner\|section-banner__breadcrumb" portal/js --include="*.js" | wc -l` ≥ 1

## 3. Actualizar páginas con datos del banner (33 instancias)

- [ ] 3.1 Añadir `data-breadcrumb` y `data-subtitle` a las 28 páginas con banner simple (`portal/nosotros` 4 banners, `portal/admision` 3, `portal/planadocente`, `portal/bolsa_trabajo`, `portal/transparencia`, etc.) y a las 5 hero (`portal/acc`, `enfermeria_tecnica`, `pagro`, `programas`, `admision` hero) — ej. `data-breadcrumb="Inicio › Nosotros › Plana Jerárquica"` `data-subtitle="Conoce a las autoridades..."`, envolver `<h1>` con estructura esperada por el helper, y verificar `grep -rn "data-breadcrumb\|data-subtitle" portal --include="*.html" | wc -l` ≥ 28
- [ ] 3.2 Verificar que sin `data-breadcrumb`/`data-subtitle` el banner no deja hueco (breadcrumb/subtítulo `display:none` y gap compacto) en `portal/nosotros/#jerarquica` sin datos

## 4. Validación visual y no-regresión

- [ ] 4.1 Verificar que editar solo `portal/css/styles.css` (altura, degradado, wave, badge) se refleja en todas las páginas sin tocar cada HTML para los 4 cambios CSS puros — abrir `portal/nosotros/#jerarquica`, `portal/admision/#calendario`, `portal/programas`, `portal/transparencia`, `portal/galeria` y confirmar breadcrumb, altura compacta, degradado, wave y badge
- [ ] 4.2 Ejecutar `openspec validate --change mejora-banner-secciones --strict` y verificar 0 errores, y `grep -rn "section-banner" portal --include="*.html" | wc -l` sigue 33 instancias sin roturas
