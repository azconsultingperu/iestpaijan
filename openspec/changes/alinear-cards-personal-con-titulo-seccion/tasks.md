## 1. Alineación horizontal del grid con la barrita del título

- [x] 1.1 Unificar `max-width`/`margin` de `.docente__area h2` y `.docente__grid` en `portal/css/docente.css:49-67` para que el borde izquierdo del grid coincida con el borde izquierdo de la barrita `border-left:5px` del `h2`, y verificar con DevTools que `h2.getBoundingClientRect().left` y `.docente__grid .docente__card:first-child.getBoundingClientRect().left` difieren <2px en `portal/planadocente/` a 1280px y en `portal/nosotros/#docente`
- [x] 1.2 Espejar la misma alineación en `portal/css/nosotros.css:588-606` (`.docente__area h2` y `.docente__grid` idénticos a `docente.css`), y verificar `grep -n "docente__area h2\|docente__grid" portal/css/docente.css portal/css/nosotros.css` muestra valores consistentes y visualmente el grid de Enfermería Técnica no queda inset respecto a su título en desktop 2-col

## 2. Separación vertical entre secciones y responsive

- [x] 2.1 Añadir `margin-top:2.5rem` (o 3rem) a `.docente__area h2` en `portal/css/docente.css:49` para separar el título siguiente del grid previo, y verificar visualmente en `portal/planadocente/` que entre la última card de "Administración de Centros de Cómputo" (Claudia Rubio Jiménez) y el `h2` "Enfermería Técnica" hay ≥2.5rem de aire sin cards pegadas, manteniendo `gap:24px` interno del grid
- [x] 2.2 Espejar `margin-top` del `h2` en `portal/css/nosotros.css:588` y verificar que `:first-child` `.docente__area h2` no genera espacio extra arriba de la primera sección (usar `:not(:first-child)` o compensar), y que en mobile 768px/375px el grid 1-col mantiene alineación izquierda y separación vertical sin overflow
- [x] 2.3 QA visual en `portal/planadocente/` y `portal/nosotros/#docente` en 1280px/768px/375px (2-col y 1-col, alineación izquierda barrita vs grid, gap vertical entre secciones, cards internas sin cambio) y ejecutar `openspec validate --changes --strict` y verificar 0 errores
