## 1. Datos — extender estructura docente

- [x] 1.1 Extender `portal/js/docentes.js` con campos opcionales `grado`, `email`, `cvUrl`, `cargaUrl` por docente (string, vacío si no hay dato) y verificar `grep -c "grado\|cvUrl\|cargaUrl" portal/js/docentes.js` ≥ 1 por docente y `node -e "const d=require('./portal/js/docentes.js')"` no rompe o `grep` muestra llaves con 4 campos
- [x] 1.2 Sincronizar mismos `grado/email/cvUrl/cargaUrl` en `portal/js/nosotros.js` bloque `docentesData` (duplicado) y verificar `diff <(grep -o "grado[^,]*" portal/js/docentes.js | sort) <(grep -o "grado[^,]*" portal/js/nosotros.js | sort)` vacío o `grep -c grado` coincide en ambos archivos
- [x] 1.3 Verificar que `portal/js/jerarquica.js` no se modifica (aún solo `{cargo,nombre,foto}`) y que estructura docente no rompe `icon_person` fallback — `grep -c "cvUrl" portal/js/jerarquica.js` == 0

## 2. Estilo — grid y card Plana Docente

- [x] 2.1 Actualizar `portal/css/docente.css` grid: `docente__grid` de `repeat(auto-fill, minmax(220px,1fr))` a `repeat(2,1fr)` gap 24-32px, y breakpoint `@media (max-width:768px)` → `repeat(1,1fr)`, verificar en `portal/nosotros/#docente` y `portal/planadocente/` 2 cols desktop / 1 col móvil sin overflow
- [x] 2.2 Rediseñar `.docente__card` en `portal/css/docente.css` + `portal/css/nosotros.css`: layout horizontal foto izquierda (`.docente__pic` 110px circular) + `.docente__body` columna derecha, nombre `font-weight:700`, grado `0.92rem` muted, email `0.84rem` (mailto), 2 botones **CV sólido + Carga outline** (`btn--primary` + `btn--secondary`), `radius:6px`, `padding:0.45rem 0.9rem`, `width:auto`, **misma fila** `gap:0.5rem` (`nowrap` desktop, `wrap` solo <600px), card `padding:1.4rem 1.6rem` con `padding-right:2rem` extra y `gap:0.5rem` entre nombre/grado/email/botones — verificar sin tocar `jerarquica.css`

## 3. Render — cards con datos y acciones

- [x] 3.1 Actualizar render en `portal/js/docentes.js` para generar card horizontal `.docente__pic`+`.docente__body` con `picHTML(foto)`, `h3` nombre, `grado`, `email`, y `<div class="docente__actions"><a Ver CV sólido `btn--primary`><a Ver Carga outline `btn--secondary`></a></div>` (`fa-file-alt` + `fa-calendar-alt`), **misma fila** `gap:0.5rem`, `width:auto`, `gap:0.5rem` entre textos, card `padding-right:2rem` — verificar `grep -c "Ver CV" ==1` y `docente__actions` row
- [x] 3.2 Actualizar mismo render en `portal/js/nosotros.js` bloque docente con idéntica lógica horizontal + **CV sólido + Carga outline en misma fila** (`btn--primary` + `btn--secondary`), `gap:0.5rem` entre textos, `padding-right:2rem` — verificar `#jerarquica` sin `docente__actions` y `#docente` con card horizontal

## 4. Validación y no-regresión

- [x] 4.1 Ejecutar `openspec validate --change rediseno-cards-plana-docente --strict` y verificar 0 errores
- [x] 4.2 QA visual: abrir `portal/nosotros/#docente` y `portal/planadocente/`, verificar 2 cols, foto AVIF/WEBP, nombre negrita, grado/email visibles, botones Ver CV/Carga abren nueva pestaña (o ocultos si URL vacía), y que `portal/nosotros/#jerarquica` sigue piramidal sin cambios; verificar `grep -c "\.docente__card\|\.docente__grid"` solo en `docente.css`/`docentes.js`/`nosotros.js`
