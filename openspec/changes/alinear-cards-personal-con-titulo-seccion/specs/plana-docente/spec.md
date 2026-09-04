## MODIFIED Requirements

### Requirement: Grid de Plana Docente
El sistema SHALL renderizar las cards de Plana Docente en un grid de 2 columnas por fila en desktop y 1 columna en móvil/tablet, con el borde izquierdo del grid alineado exactamente con el borde izquierdo de la barrita de acento del título de su sección (`h2` con `border-left`), y con separación vertical suficiente entre secciones, sin afectar el grid de Plana Jerárquica.

#### Scenario: Grid desktop 2 columnas alineado
- **WHEN** el viewport es ≥ 900px y el usuario está en `portal/nosotros/#docente` o `portal/planadocente/`
- **THEN** las cards de Plana Docente se disponen en 2 por fila, más anchas y cuadradas, con `gap` consistente, y el borde izquierdo del `.docente__grid` coincide horizontalmente con el borde izquierdo de la barrita del `h2` de esa misma sección

#### Scenario: Grid móvil 1 columna alineado
- **WHEN** el viewport es < 768px
- **THEN** las cards se apilan en 1 por fila ocupando el ancho disponible sin overflow horizontal, y el borde izquierdo del grid (1 columna) coincide con el borde izquierdo de la barrita del título

#### Scenario: Jerárquica no afectada
- **WHEN** el usuario ve Plana Jerárquica en la misma página (`#jerarquica`)
- **THEN** el layout jerárquico (niveles piramidales, `.card` en `jerarquica.css`) permanece idéntico al actual

#### Scenario: Alineación horizontal con barrita del título
- **WHEN** se inspecciona cualquier sección de personal (Administración de Centros de Cómputo, Enfermería Técnica, Producción Agropecuaria, Empleabilidad) en `portal/planadocente/` o `portal/nosotros/#docente`
- **THEN** el `border-left` del `h2` y el borde izquierdo del `.docente__grid` comparten el mismo inset respecto al contenedor `.docente` (mismo `padding`/`max-width`/`margin`), sin desfase horizontal visible ni `max-width` centrado que desplace el grid respecto al título

#### Scenario: Separación vertical entre secciones
- **WHEN** se observa la última card de una sección (p. ej. "Claudia Rubio Jiménez") y el `h2` con barrita de la siguiente sección (p. ej. "Enfermería Técnica")
- **THEN** existe `margin-top` ≥ 2.5rem (o `gap` equivalente entre `.docente__area` y siguiente `h2`) entre el final del grid y el título siguiente, sin cards pegadas al título siguiente, manteniendo el `gap:24px` interno del grid y sin alterar el `gap` entre cards
