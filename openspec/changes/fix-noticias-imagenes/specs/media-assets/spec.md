## MODIFIED Requirements

### Requirement: Migración de referencias JS
Todos los módulos JS que referencian imágenes por extensión SHALL migrar a referencia por base sin extensión mediante el helper. No SHALL quedar literales `".jpg"`, `".jpeg"` o `".png"` para imágenes de contenido en `portal/js/galeria.js`, `portal/js/script.js`, `portal/js/noticias.js`, `portal/js/jerarquica.js`, `portal/js/docentes.js`, `portal/js/nosotros.js`, `portal/js/enlaces_institucionales.js`.

#### Scenario: Script.js noticias sin literales JPG
- **WHEN** se busca `\.jpe?g` en `portal/js/script.js` para entradas de `noticias[]`
- **THEN** el conteo es 0; cada entrada usa base sin extensión (`aviso-2026-1`, `dia_del_trabajador`, `graduacion2026`, `integrantes2026`, `admision/primer_admision/1`, `inicio_clases20252`) y `imgBase + base`

#### Scenario: Noticias usa helper
- **WHEN** `portal/js/script.js` define el array `noticias` o `portal/js/noticias.js` define su array
- **THEN** cada entrada usa `pictureFor(imgBase + base, titulo)` o `imagen: [base]` renderizada vía `pictureFor`/`toBase()` en vez de `imagen: ["...jpg"]`, generando `<picture><source avif><source webp><img webp>` con `onerror` a `placeHolderImg`

### Requirement: Renderizado con picture y fallback WEBP
Toda imagen de contenido SHALL renderizarse mediante `<picture>` con orden `avif` → `webp` → `img webp`, o mediante `image-set` con el mismo orden, usando WEBP como fallback final (no JPG). El helper centralizado `pictureFor(base)` SHALL generar este markup. Para cards de noticias en home, el card y el modal SHALL usar `pictureFor`/`toBase()`.

#### Scenario: Card de noticia en home usa picture
- **WHEN** `portal/js/script.js:initNoticias()` renderiza una noticia en `#news-feed`
- **THEN** el innerHTML del card contiene `<picture><source srcset="...avif" type="image/avif"><source srcset="...webp" type="image/webp"><img src="...webp"` con `alt` y `loading="lazy"`

#### Scenario: Modal de noticia usa base sin extensión
- **WHEN** se abre el modal de una noticia desde el home
- **THEN** `modalImg.src` es `toBase(imagen[0]) + ".webp"` con `onerror` que intenta `.avif` y luego `placeHolderImg`, sin referencia a `.jpg`

### Requirement: Validación y fallback robusto
El sistema SHALL validar en CI/local que toda base referenciada tenga ambos formatos y SHALL mostrar placeholder (`script.js:179` `placeHolderImg` / `window.placeHolderImg`) si un formato falta, sin romper layout.

#### Scenario: Imagen faltante muestra placeholder
- **WHEN** `pictureFor` referencia una base sin `*.avif` en disco
- **THEN** el `onerror` del `<img>` reemplaza por `placeHolderImg` y se loguea warning en console

#### Scenario: Script de validación pasa en CI
- **WHEN** se ejecuta `bash scripts/validate-images.sh`
- **THEN** exit 0 si todas las bases de noticias (`aviso-2026-1`, `fallesimiento_07_05_2026`, `dia_del_trabajador`, `graduacion2026`, `integrantes2026`, `admision/primer_admision/1`, `inicio_clases20252`) tienen `avif+webp`, exit 1 listando bases incompletas
