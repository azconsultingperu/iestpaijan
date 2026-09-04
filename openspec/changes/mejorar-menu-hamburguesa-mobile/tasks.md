## 1. Altura del panel y estructura

- [ ] 1.1 Ajustar altura de `.nav` en `portal/css/styles.css` a `height:auto; max-height:100dvh; overflow:auto` (o `100vh` con `fit-content`) para que se ajuste al contenido real de 7 links + header + footer, eliminando vacío inferior, y verificar en DevTools mobile ≤900px que el panel abierto no deja zona blanca vacía bajo Galería y que con `fit-content` el alto es < viewport cuando corresponde
- [ ] 1.2 Si se mantiene overlay full-screen por diseño, centrar `.nav__list` verticalmente (`display:flex; flex-direction:column; justify-content:center` o `.nav { justify-content:center }`) en `portal/css/styles.css`, y verificar que los 7 links quedan centrados verticalmente en vez de anclados arriba en viewport alto

## 2. Iconos por link y activo reforzado

- [ ] 2.1 Añadir ícono Font Awesome a la izquierda de cada `a.nav__link` en `portal/js/include.js: headerHTML` (Inicio `fa-house`, Nosotros `fa-users`, Admisión `fa-file-lines`, Programas `fa-graduation-cap`, Transparencia `fa-scale-balanced`, Servicios `fa-handshake-angle`, Galería `fa-images`) con `gap:0.7rem` y `font-size:0.95rem` en `portal/css/styles.css` `.nav__link`, reutilizando `portal/fontawesome/css/all.min.css` ya cargado, y verificar `grep -c "fa-" portal/js/include.js | grep nav` ≥7 y visualmente cada link muestra ícono alineado sin desborde en 320px
- [ ] 2.2 Reforzar `.nav__link.is-active` en `portal/css/styles.css` con `background:rgba(var(--primary-rgb),0.08)` + `border-left:4px solid var(--primary)` o `::before` 4px + `color:var(--primary)` y `i{color:var(--primary)}`, y verificar en mobile que "Inicio" activo muestra barra y fondo además de color, distinguible de los otros 6

## 3. Logo y cierre

- [ ] 3.1 Mantener logo del panel `nav__header` con `logo-transp.png` + "IESTP Paiján" y evaluar ocultar logo de fondo `.brand` cuando `.nav.is-open` / `body.nav-open` está activo (`header .brand { opacity:0; pointer-events:none; transition:opacity 0.2s }` o similar en `portal/css/styles.css` + clase en `portal/js/include.js` toggle), sin romper layout ni `hamburger`/`nav__close`, y verificar que al cerrar el logo de fondo vuelve con transición
- [ ] 3.2 Verificar triggers intactos: abrir con `hamburger #menu-toggle`, cerrar con `.nav__close` X y overlay en `portal/js/include.js`/`script.js`, sin cambiar orden/listado, y que iconos no rompen `is-active` por `data-page`
- [ ] 3.3 QA visual en 320px/375px/768px/900px y desktop >900px (panel sin vacío, 7 iconos visibles alineados, activo con barra/fondo, logo panel presente, X funciona, no duplicado molesto) y ejecutar `openspec validate --changes --strict` y verificar 0 errores
