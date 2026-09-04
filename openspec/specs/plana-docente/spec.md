## Purpose

Presentar la Plana Docente del IESTP Paiján con cards informativas y accionables que muestren foto, nombre, grado, email y accesos a CV y Carga Académica en un grid de 2 columnas coherente con la identidad institucional.

## ADDED Requirements

### Requirement: Grid de Plana Docente
El sistema SHALL renderizar las cards de Plana Docente en un grid de 2 columnas por fila en desktop y 1 columna en móvil/tablet, distinto al grid de 4 columnas actual y sin afectar el grid de Plana Jerárquica.

#### Scenario: Grid desktop 2 columnas
- **WHEN** el viewport es ≥ 900px y el usuario está en `portal/nosotros/#docente` o `portal/planadocente/`
- **THEN** las cards de Plana Docente se disponen en 2 por fila, más anchas y cuadradas, con gap consistente

#### Scenario: Grid móvil 1 columna
- **WHEN** el viewport es < 768px
- **THEN** las cards se apilan en 1 por fila ocupando el ancho disponible sin overflow horizontal

#### Scenario: Jerárquica no afectada
- **WHEN** el usuario ve Plana Jerárquica en la misma página (`#jerarquica`)
- **THEN** el layout jerárquico (niveles piramidales, `.card` en `jerarquica.css`) permanece idéntico al actual

### Requirement: Estructura de card docente
Cada card de Plana Docente SHALL mostrar: foto a la izquierda (110px circular) y a la derecha columna con nombre en negrita, grado/título, email y dos botones lado a lado ("Ver CV" y "Ver Carga Académica") dentro de la misma card, en layout horizontal (flex row). La foto SHALL seguir usando el pipeline AVIF+WEBP existente.

#### Scenario: Card completa con datos
- **WHEN** un docente tiene `foto`, `nombre`, `grado="Lic. en Enfermería"`, `email="docente@iestpaijan.edu.pe"`, `cvUrl="/portal/documentos/cv/lic-enfermeria.pdf"`, `cargaUrl="/portal/documentos/carga/2025-2.pdf"`
- **THEN** la card muestra la foto, el nombre en negrita, el grado, el email como texto (o link `mailto:`), y dos botones pill visibles y clicables

#### Scenario: Card con foto fallback
- **WHEN** la foto del docente falla o apunta a `icon_person`
- **THEN** se muestra el placeholder (`window.placeHolderImg` / `icon_person`) sin romper el layout de la card

### Requirement: Datos extendidos del docente
La estructura de datos de cada docente SHALL soportar los campos opcionales `grado` (string), `email` (string), `cvUrl` (string URL/PDF) y `cargaUrl` (string URL/PDF), además de los existentes `nombre` y `foto`. La ausencia de cualquiera de estos campos no SHALL romper el render.

#### Scenario: Datos mínimos sin nuevos campos
- **WHEN** un docente solo tiene `nombre` y `foto` (datos legacy)
- **THEN** la card renderiza nombre+foto, oculta o deshabilita grado/email/botones faltantes, sin error de JS y sin huecos visuales grandes

#### Scenario: Datos extendidos sincronizados
- **WHEN** se edita un docente en `portal/js/docentes.js` y en `portal/js/nosotros.js` (duplicado)
- **THEN** ambos archivos contienen los mismos `grado/email/cvUrl/cargaUrl` para ese docente (criterio de aceptación: `grep` de los 4 campos coincide en ambos)

### Requirement: Acciones CV y Carga Académica
Los botones "Ver CV" y "Ver Carga Académica" SHALL abrir `cvUrl` y `cargaUrl` en nueva pestaña (`target="_blank" rel="noopener"`) cuando existen, dispuestos en la misma fila con `gap: 0.5rem` — "Ver CV" con estilo sólido (`background: var(--primary)`, `color:#fff`) y "Ver Carga Académica" con estilo outline (`background:#fff`, `border:1.5px solid rgba(198,40,40,0.2)`, `color:var(--primary)`), ambos con `border-radius:6px`, `padding:0.45rem 0.9rem`, `width:auto`; si el campo está vacío o inválido, el botón SHALL ocultarse o mostrarse deshabilitado sin navegar a 404. En mobile (<600px) SHALL permitirse apilado si no caben.

#### Scenario: Click Ver CV con URL válida
- **WHEN** el usuario hace click en "Ver CV" de un docente con `cvUrl` válido
- **THEN** se abre el PDF/URL en nueva pestaña y la card permanece en su posición

#### Scenario: Botón oculto sin URL
- **WHEN** un docente no tiene `cvUrl`
- **THEN** el botón "Ver CV" no es visible o está deshabilitado y no genera navegación

#### Scenario: Estilo coherente
- **WHEN** se inspeccionan los dos botones
- **THEN** "Ver CV" usa estilo sólido (`--primary` sólido) y "Ver Carga Académica" usa estilo outline (`background:#fff`, `border:1.5px solid rgba(198,40,40,0.2)`), ambos con `Monteserrat`, `border-radius: 6px`, `padding: 0.45rem 0.9rem`, `width: auto` no estirados, dispuestos en una misma fila con `gap: 0.5rem` (sin apilado en desktop/tablet; apilado permitido solo <600px si no caben), y card con `padding: 1.4rem 1.6rem` con `padding-right: 2rem` extra y `gap: 0.5rem` entre nombre/grado/email/botones (más espacio entre textos, más aire al borde derecho), con estados hover/focus visibles
