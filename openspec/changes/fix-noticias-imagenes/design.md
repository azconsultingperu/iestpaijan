## Context

`optimizar-imagenes-avif-webp` eliminó `*.jpg/*.png` y dejó solo `*.avif+*.webp`. `portal/js/noticias.js` y `embed.html` ya usan bases sin extensión + `pictureFor`. `portal/js/script.js` (home) quedó revertido a `.jpeg/.jpg` + `<img>` directo, por eso `#news-feed` da 404 y solo se ve placeholder gris. `include.js` expone `pictureFor/base` y `placeHolderImg` global. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**
- Que las 6 cards de `initNoticias()` en home carguen `avif`/`webp` reales con `<picture>` y modal funcione sin `.jpg`.
- Orden `include.js` antes que `script.js` en `index.html`.

**Non-Goals:**
- No unificar fuente `noticias[]` en `noticiasData.js` (queda para B).
- No tocar `portal/css/noticias.css`, `galeria.js`, `jerarquica.js`, ni reintroducir `.jpg`.
- No cambiar `portal/js/noticias.js` / `embed.html` (ya correctos).

## Decisions

- **Reusar `pictureFor` de `include.js` + helper `toBase()` local** (strip `\.avif|\.webp|\.jpe?g|\.png`) — alternativa `image-set` CSS descartada porque cards son `<img>` dinámicos. Mantiene consistencia con `noticias.js:toBaseN`.
- **Bases sin extensión en el array** — sigue spec `media-assets: Migración de referencias JS`. Ej. `imgBase+"noticias/aviso-2026-1"` en vez de `...-1.jpeg`.
- **Modal con `toBase(imagen[0]) + ".webp"` + `onerror → .avif → placeHolderImg`** — igual que `noticias.js:95`, evita 404 en modal.
- **No crear nuevo CSS** — `noticias.css` ya define `.news-card__image img {object-fit:cover}`; solo cambia markup.

## Risks / Trade-offs

- [Riesgo] `window.pictureFor` undefined si `include.js` carga tarde → Mitigación: mover `<script src="portal/js/include.js">` antes de `script.js` en `index.html` y usar fallback `window.pictureFor ? pictureFor(...) : '<picture>...'`.
- [Riesgo] Cache `?v=13` desactualizada → Mitigación: bump a `?v=14` en `index.html` si aplica.
- [Trade-off] Duplicación `noticias[]` persiste → aceptado para A, documentado para B futuro.

## Migration Plan

1. Editar `portal/js/script.js` (array + `showArticle` + `card.innerHTML`).
2. Editar `index.html` orden scripts.
3. Verificar `grep -n "jpe?g" portal/js/script.js` == 0, `ls portal/imagenes/noticias/*.avif` ok, `bash scripts/validate-images.sh` exit 0, smoke home `#news-feed` con imágenes.
4. Rollback: revert 2 archivos.

## Open Questions

- Ninguna bloqueante.
