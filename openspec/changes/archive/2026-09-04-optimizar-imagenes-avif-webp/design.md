## Context

Ver `proposal.md` — portal estático con 792 imágenes (177 MB), 261 bases con trío AVIF+WEBP+JPG/PNG. CSS y 5 HTML usan `<picture>`/`image-set` correctamente, pero `galeria.js` (159 refs), `script.js`/`noticias.js` (noticias) y docentes/enlaces usan solo JPG/PNG directo. JPG es 77 MB (43%) y nunca se necesita como transferencia si se usa AVIF/WEBP. PNG (5.9 MB) duplicado para logos con alfa que AVIF/WEBP ya soportan.

## Goals / Non-Goals

**Goals:**
- Reducir repo ~47% (177→94 MB) eliminando JPG/PNG duplicados manteniendo calidad visual.
- Hacer que TODAS las vistas transfieran AVIF o WEBP, no JPG.
- Centralizar renderizado para que agregar una imagen no requiera decidir formato.

**Non-Goals:**
- Reescribir historial git (`filter-repo`) — solo `git rm` en HEAD.
- Responsive `srcset` con múltiples anchos (w=320/640/1280) — fuera de alcance, solo cambio de formato.
- CDN o optimización on-the-fly — sitio es estático hosteado tal cual.
- Cambiar contenido visual o recortar/comprimir agresivamente más allá de la conversión existente.

## Decisions

**D1: Fallback WEBP, no JPG (A1)**
- Por qué: WEBP 183K vs JPG 782K en hero (4x más liviano), cobertura 97% vs JPG 100%. AVIF cubre 93%, WEBP cubre el 4% restante (Safari 14-15). IE11 (<0.3% tráfico IESTP) vería WEBP también; no justifica mantener JPG.
- Alternativa descartada A2 (JPG recomprimido): mantiene pipeline JPG y no ahorra el 100% del peso.

**D2: Helper centralizado `pictureFor(base, alt)` en `portal/js/include.js` (H1)**
- Por qué: Single point of change. Hoy hay 4 lugares que generan markup de imagen (galeria.js, script.js, nosotros.js, jerarquica.js). Helper genera `<picture><source avif><source webp><img webp></picture>` y maneja `onerror → placeHolderImg`. Si mañana se agrega JXL, se cambia 1 función.
- Alternativa H2 (template inline): duplica strings y olvidos garantizados.
- Firma propuesta: `function pictureFor(base, alt) { return '<picture><source srcset="'+base+'.avif" type="image/avif"><source srcset="'+base+'.webp" type="image/webp"><img src="'+base+'.webp" alt="'+alt+'" loading="lazy" onerror="this.src=placeHolderImg"></picture>'; }` Adaptar para CSS: `imageSetFor(base)` que devuelve `image-set(url("...avif") type("image/avif"), url("...webp") type("image/webp"))`.

**D3: PNG con alfa → AVIF/WEBP con alfa (P1)**
- Por qué: AVIF y WEBP soportan transparencia; los 21 PNG ya tienen par AVIF/WEBP generado y visualmente idéntico. PNG solo pesa más (ej: `logo-transp.png` 240K vs `logo-transp.avif` ~38K).
- Excepción: `whatsapp.svg` se mantiene (vector), favicon `logo-transp.png` evaluar migrar a `logo-transp.webp` pero mantener `.png` solo si el hosting exige PNG para favicon (verificar).

**D4: Borrado solo en HEAD (G1), no `filter-repo`**
- Por qué: Reescribir historial cambia hashes y requiere force-push coordinado. El repo actual (~177 MB) no rompe límites de GitHub; el ahorro futuro de clones (94 MB en main) es suficiente. Si en el futuro el historial pesa, se hace G2 en change separado.

**D5: Validación con script `scripts/validate-images.sh`**
- Por qué: Evita regresión (alguien commitea un JPG). El script lista bases referenciadas en JS/HTML/CSS y verifica existencia de `.avif` y `.webp`. Se corre en pre-commit y CI. Usa `find portal/imagenes -name "*.avif"` vs refs.

## Risks / Trade-offs

- [Riesgo] Borrar JPG antes de migrar JS rompe galería/noticias → Mitigación: orden estricto tasks: migrar refs → validar en local → `git rm` → validar de nuevo.
- [Riesgo] Favicon PNG eliminado rompe pestaña en navegadores viejos → Mitigación: auditar `index.html:15` `<link rel="icon" href="...logo-transp.png">` y probar con `logo-transp.webp` + fallback PNG mínimo (1 archivo), no 21.
- [Riesgo] AVIF con alfa se ve distinto en Safari 16 → Mitigación: QA visual en Safari/Chrome/Firefox de `organigrama-iestp-paijan`, `logo-transp`, `conecta`.
- [Trade-off] Mantener WEBP como fallback implica aún 2 archivos por base (no 1). Se acepta por cobertura 97%→93% gap; pasar a solo AVIF (G) ahorra otros 49 MB pero arriesga Safari 14.
- [Trade-off] No hacer `srcset` responsive deja imágenes de galería a resolución fija; se acepta porque el ahorro principal ya es 47% y responsive es change separado.

## Migration Plan

1. Convertir 5 huérfanos a AVIF+WEBP (`carreras/*_bg.jpg` → avif/webp, `old-egresados_alumnos.webp` → avif).
2. Implementar `pictureFor`/`imageSetFor` en `include.js`.
3. Migrar `galeria.js` (159 refs) de `src: "...jpg"` a `src: base` + helper. Idem `script.js`, `noticias.js`, `jerarquica.js`, `docentes.js`, `nosotros.js`, `enlaces_institucionales.js`.
4. Migrar `portal/css/*.css` `image-set` de `url(...jpg)` a `url(...webp)`.
5. Ejecutar `validate-images.sh` en local — debe pasar.
6. `git rm portal/imagenes/**/*.jpg portal/imagenes/**/*.jpeg portal/imagenes/**/*.png` (excepciones documentadas) + commit.
7. Re-ejecutar validación + QA manual (hero, frontis, galería, noticias, docentes, boletín).
8. Actualizar `STRUCTURE.md:39`, `portal/css/styles.css` comentarios y README si aplica.
9. Rollback: `git revert` del commit de borrado restaura JPG/PNG; helper sigue funcionando porque acepta fallback WEBP (no depende de JPG).

## Open Questions

- ¿Favicon debe migrar a WEBP o mantener 1 PNG mínimo? Verificar hosting `iestpaijan.edu.pe` acepta `logo-transp.webp` como icon.
- ¿El placeholder `script.js:179` debe ser AVIF/WEBP o SVG inline es suficiente?
