## Why

Los banners del portal (28 simples + 5 hero, 33 instancias) comparten la misma composición (foto frontis + overlay granate sólido + ícono dorado + título centrado + línea), lo que genera sensación de plantilla genérica y repetitiva. Se necesita un Banner System reutilizable y escalable que dé identidad diferenciada por tipo de contenido sin duplicar HTML/CSS ni perder coherencia institucional.

## What Changes

- **Auditoría previa (Fase 1):** inventario de todos los banners (principales, secundarios, heros) en `portal/*/index.html` y `portal/css/*.css`; identificación de patrones y diferencias. **BREAKING:** se unifica la estructura HTML y se eliminan duplicados CSS.
- **Sistema base reutilizable:**
  - Estructura HTML común: `.banner` + `__media`/`__overlay`/`__content`/`__eyebrow`/`__title`/`__subtitle`/`__decoration`.
  - Clases CSS base + variantes: `banner--hero`, `banner--split`, `banner--institutional`, `banner--historical`, `banner--academic`, `banner--visual` (solo diferencias por variante, base compartida).
  - Sistema responsive, overlay en degradado, jerarquía tipográfica con `clamp()`, decoración sutil, animaciones discretas (250-600ms, `prefers-reduced-motion`), y criterios de accesibilidad.
- **6 variantes mínimas:**
  1. **Hero Image** (institucional, nosotros, admisión, programas, servicios, transparencia) — foto protagonista, gradient, texto izquierda, eyebrow/subtítulo opcionales.
  2. **Split Banner** (foto de calidad) — izquierda texto / derecha foto horizontal.
  3. **Institutional** (organigrama, plana jerárquica/docente, documentos) — sin foto obligatoria, fondo limpio con patrones geométricos sutiles y decoración dorada/granate.
  4. **Historical** (reseña, aniversarios) — foto histórica, estética editorial, contraste alto, etiqueta `DESDE 1987`.
  5. **Program/Academic** (carreras, especialidades) — estética tecnológica, foto del área, categoría + CTA opcional.
  6. **Gallery/Visual** (galería, noticias, eventos) — protagonismo fotográfico, mínimo texto, overlay dinámico.
- **Identidad y overlay:** paleta granate #8E0F1B / #5E0710, dorado #D6A63A, blanco, grises; overlay en `linear-gradient` con transparencias (no `rgba` plano 0.85), foto siempre reconocible.
- **Migración progresiva:** crear sistema base → variantes → migrar página piloto → validar desktop/móvil → migrar resto → eliminar estilos antiguos.

## Capabilities

### New Capabilities
- `banner-system`: Sistema visual de banners — estructura reutilizable, 6 variantes, clases, responsive, imágenes, tipografía, overlay, decoración, animaciones y accesibilidad.

### Modified Capabilities
- (ninguna — `section-banner` del change previo `mejora-banner-secciones` queda superseded por `banner-system`; `media-assets` y `plana-docente` no cambian)

## Impact

- **Código:** nuevo `portal/css/banner-system.css` (o integrado en `styles.css`) con base + 6 variantes; HTML de 33 banners migrados a estructura común; helper JS opcional para `data-variant`/`data-subtitle` si se quiere selección automática; eliminación de duplicados en 12 `portal/css/*.css`; sin cambio de URLs, navegación ni textos institucionales.
- **Sistemas:** solo HTML/CSS/JS existente, sin frameworks nuevos; compatible con pipeline AVIF/WEBP ya optimizado.
- **Riesgo:** migración de 33 instancias requiere validación visual por variante; se mitiga por fases y manteniendo clases legacy como alias durante la transición.
