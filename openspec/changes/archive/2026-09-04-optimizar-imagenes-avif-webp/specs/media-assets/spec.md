## Purpose

Gestión de assets de imagen del portal IESTP Paiján con formatos modernos (AVIF+WEBP), renderizado eficiente y validación automática para reducir peso del repo y acelerar carga sin perder compatibilidad.

## ADDED Requirements

### Requirement: Formatos soportados
El sistema SHALL almacenar cada imagen de contenido únicamente en formatos AVIF y WEBP (dúo). No SHALL existir archivos JPG, JPEG o PNG duplicados para una misma base donde ya existan AVIF+WEBP. Excepción: `portal/imagenes/whatsapp.svg` y favicon `logo-transp.png` si se requiere por compatibilidad de favicon (evaluar `logo-transp.webp` como alternativa).

#### Scenario: Base con dúo válido
- **WHEN** existe `portal/imagenes/hero.avif` y `portal/imagenes/hero.webp`
- **THEN** no existe `portal/imagenes/hero.jpg` ni `hero.png` en el repo

#### Scenario: Validación de trío residual
- **WHEN** se ejecuta el script de validación `scripts/validate-images.sh` (o equivalente)
- **THEN** reporta como error toda base que aún tenga `*.jpg/*.jpeg/*.png` junto a `*.avif/*.webp`

#### Scenario: Huérfanos convertidos
- **WHEN** se listan las 5 bases huérfanas (`carreras/acc_bg`, `carreras/enfermeria_bg`, `carreras/pagro_bg`, `bolsa_trabajo/old-egresados_alumnos`, etc.)
- **THEN** cada una tiene par `*.avif` + `*.webp` generados con calidad equivalente y sin `*.jpg` remanente

### Requirement: Renderizado con picture y fallback WEBP
Toda imagen de contenido SHALL renderizarse mediante `<picture>` con orden `avif` → `webp` → `img webp`, o mediante `image-set` con el mismo orden, usando WEBP como fallback final (no JPG). El helper centralizado `pictureFor(base)` SHALL generar este markup.

#### Scenario: Helper genera picture correcto
- **WHEN** se invoca `pictureFor("portal/imagenes/hero")` o `pictureFor("../imagenes/galeria_eventos/2026/cachimbo/1")`
- **THEN** el HTML contiene `<source srcset="....avif" type="image/avif">`, `<source srcset="....webp" type="image/webp">` y `<img src="....webp" alt="...">`

#### Scenario: CSS usa image-set sin JPG
- **WHEN** se inspecciona `portal/css/styles.css` (hero) o cualquier `portal/css/*.css` con `image-set`
- **THEN** la declaración es `image-set(url("...avif") type("image/avif"), url("...webp") type("image/webp"), url("...webp"))` sin referencia a `*.jpg` o `*.png`

#### Scenario: Galería usa formatos livianos
- **WHEN** la galería renderiza un evento con 16 imágenes
- **THEN** cada imagen transfiere AVIF (~40-70K) o WEBP (~60-90K), no JPG (~130-200K), verificable en DevTools Network

### Requirement: Migración de referencias JS
Todos los módulos JS que referencian imágenes por extensión SHALL migrar a referencia por base sin extensión mediante el helper. No SHALL quedar literales `".jpg"`, `".jpeg"` o `".png"` para imágenes de contenido en `portal/js/galeria.js`, `portal/js/script.js`, `portal/js/noticias.js`, `portal/js/jerarquica.js`, `portal/js/docentes.js`, `portal/js/nosotros.js`, `portal/js/enlaces_institucionales.js`.

#### Scenario: Galería sin literales JPG
- **WHEN** se busca `\.jpg` en `portal/js/galeria.js`
- **THEN** el conteo es 0 (antes 159)

#### Scenario: Noticias usa helper
- **WHEN** `portal/js/script.js` define el array `noticias` o `portal/js/noticias.js` define su array
- **THEN** cada entrada usa `pictureFor(imgBase + "noticias/...")` o `imagen: pictureFor(...)` en vez de `imagen: ["...jpg"]`

### Requirement: Validación y fallback robusto
El sistema SHALL validar en CI/local que toda base referenciada tenga ambos formatos y SHALL mostrar placeholder (`script.js:179` `placeHolderImg`) si un formato falta, sin romper layout.

#### Scenario: Imagen faltante muestra placeholder
- **WHEN** `pictureFor` referencia una base sin `*.avif` en disco
- **THEN** el `onerror` del `<img>` reemplaza por `placeHolderImg` y se loguea warning en console

#### Scenario: Script de validación pasa en CI
- **WHEN** se ejecuta `npm run validate:images` o `bash scripts/validate-images.sh` pre-commit
- **THEN** exit 0 si todas las bases tienen avif+webp, exit 1 listando bases incompletas

### Requirement: Documentación de pipeline
La documentación SHALL actualizar `STRUCTURE.md` para reflejar "2 formatos AVIF+WEBP" y SHALL describir el pipeline para agregar nuevas imágenes (usar skill `image-optimizer` o `cwebp`/`avifenc`).

#### Scenario: Nueva imagen sigue convención
- **WHEN** un colaborador agrega `portal/imagenes/galeria_eventos/2027/nuevo/1.jpg` original
- **THEN** la guía indica convertir a `1.avif` + `1.webp` y referenciar por base sin extensión, no commitear el `1.jpg`

#### Scenario: Docs actualizadas
- **WHEN** se lee `STRUCTURE.md:39`
- **THEN** dice "AVIF y WEBP (mismo nombre, distinta extensión), servidas con `<picture>`" sin mención a JPG/PNG como tercera copia
