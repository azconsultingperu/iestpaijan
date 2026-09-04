## Why

El banner superior de secciones (`section-banner`) se replica con HTML copiado en 28 páginas y con dos variantes (simple y `section-banner--hero`), con padding excesivo, overlay plano y sin breadcrumb/subtítulo. Unificarlo en un solo componente reduce mantenimiento y mejora jerarquía visual en toda la web.

## What Changes

- **Exploración confirmada:**
  - No es componente reutilizable: HTML del banner está copiado y pegado en cada página (no hay partial/include JS). Estilo compartido sí existe en `portal/css/styles.css:1129` (`.section-banner`) y `portal/css/styles.css:3883` (`.section-banner--hero`), pero 12 hojas específicas (`licenciamiento.css`, `tupa.css`, etc.) duplican la misma regla `background: image-set(...)` y `::before` (ver `portal/css/licenciamiento.css:2`).
  - Patrón aparece en **28 páginas** con banner simple (`portal/acc`, `portal/admision` (3 banners), `portal/becas`, `portal/bienestar_empleabilidad`, `portal/bolsa_trabajo`, `portal/calendario_academico`, `portal/consultorio_psicologico`, `portal/documentos_gestion`, `portal/donaciones_inversiones`, `portal/enfermeria_tecnica` (2 hero), `portal/enlaces_institucionales`, `portal/estadisticas`, `portal/galeria`, `portal/licenciamiento`, `portal/manual_campus`, `portal/matriculas`, `portal/mision_vision`, `portal/nosotros` (4 banners), `portal/organigrama`, `portal/pagro` (hero), `portal/planadocente`, `portal/plana_jerarquica`, `portal/programas` (hero), `portal/resena_historica`, `portal/servicios`, `portal/servicio_topico`, `portal/transparencia`, `portal/tupa`) + 5 hero adicionales (`portal/acc`, `enfermeria_tecnica`, `pagro`, `programas`, `admision`). Total **33 instancias**.
  - Cambio en un solo lugar **es posible solo para CSS** (`styles.css`): editar `.section-banner` afecta a los 28 simples automáticamente. Para HTML (breadcrumb, subtítulo, badge, wave) hay que replicar manualmente en cada archivo o crear helper JS (`portal/js/banner.js` / función en `include.js`) que genere el markup desde datos de la página.

- **Diseño unificado del banner (aplica a todas las instancias):**
  1. Breadcrumb sutil arriba del título (`Inicio › Sección › Subsección`), derivado de `data-breadcrumb` o de la jerarquía de la URL/`data-page`.
  2. Altura reducida: `padding: 4rem 1rem` → `2.5rem 1rem` (desktop), `2.5rem → 1.8rem` en móvil; `min-height` del hero `220px → 160px`.
  3. Overlay de degradado institucional (rojo oscuro `rgba(var(--primary-rgb),0.88)` → más oscuro/transparente `rgba(50,8,12,0.55)` + radial sutil) en vez de plano, dejando ver más la imagen `frontis`/`hero`.
  4. Borde inferior con transición suave (wave SVG o `clip-path: ellipse` / diagonal `2-3deg`) hacia el contenido, en vez de corte recto.
  5. Subtítulo opcional una línea bajo el título (por sección, ej. "Conoce a las autoridades..."), definido como `data-subtitle` en el HTML de cada página o como parámetro del helper JS; si no existe se oculta sin hueco.
  6. Ícono enmarcado en badge circular con borde sutil (`section-banner__icon` ya existe en hero: `48px`, `border:1px solid rgba(212,184,86,0.25)`, `backdrop-filter:blur`), reutilizar ese estilo para el banner simple (actualmente `font-size:2rem` suelto sin badge).

## Capabilities

### New Capabilities
- `section-banner`: Banner superior reutilizable de secciones — estructura, breadcrumb, altura, overlay degradado, wave/diagonal, subtítulo opcional, badge de ícono y variante hero/simple unificada.

### Modified Capabilities
- (ninguna — `media-assets` y `plana-docente` no cambian)

## Impact

- **Código afectado:** `portal/css/styles.css` (único lugar para los 6 cambios visuales), nuevo `portal/js/banner.js` o `portal/js/include.js` (helper `renderSectionBanner`), y **33 HTML** de banners para añadir `data-breadcrumb`/`data-subtitle` y/o reemplazar markup por llamada al helper. Se eliminan duplicados en `portal/css/*.css` (12 archivos) que repiten `.section-banner`.
- **Compatibilidad:** Solo visual; mantiene clases `.section-banner` y `--hero`/`--gold`/`--dark`/`--light` para no romper páginas. Breadcrumb y subtítulo son opcionales.
- **Riesgo:** Replicar HTML en 28 archivos es costoso; helper JS centraliza pero requiere que cada página defina sus datos (breadcrumb/subtítulo) — se mitiga con defaults derivados de la URL.
