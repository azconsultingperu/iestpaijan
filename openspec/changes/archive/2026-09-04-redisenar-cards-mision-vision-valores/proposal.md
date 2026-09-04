## Why

El fix previo (`mejorar-cards-mision-vision-valores`, ya aplicado) resolvió solapamiento/hover de las 3 cards Misión/Visión/Valores, pero el diseño sigue plano: mismo fondo blanco, mismo borde, ícono pequeño pegado al título y lista de Valores en grid horizontal sin jerarquía. Para elevar la sección al nivel visual del resto del portal (beneficios, pilares, hero) se necesita un rediseño con identidad por card reutilizando la paleta existente.

## What Changes

- **Layout confirmado y refinado:** mantener `grid 3 columnas en desktop / 1 columna en mobile-tablet` (ya resuelto en `portal/css/nosotros.css:419` y `portal/css/mision_vision.css:42` con `gap: 2.5rem`) y asegurar altura igualada y respiración sin solape en hover (base ya sin riesgo).
- **Iconos con presencia:** pasar de ícono pequeño inline (`h2 i`) a badge circular grande (56–72px) con fondo en colores de marca ya usados en header/banner (`--primary`/`--gold` + degradados), centrado arriba o alineado, sin inventar paleta nueva.
- **Identidad por card con tokens existentes:** acento distinto por card sin salir de `portal/css/styles.css:4-11` (`--primary #c62828`, `--primary-dark #9e1a1a`, `--gold #d4a843`, `--gold-light #e8c76a` + `--primary-rgb`/`--gold-rgb`): p. ej. borde superior, fondo de badge o detalle sutil diferente para Misión / Visión / Valores, derivado de rojo/vino y dorado.
- **Jerarquía tipográfica:** título `h2` más grande/peso (`clamp` o `1.5–1.7rem`, `700–800`) con más `margin-bottom`, cuerpo `p` con `line-height 1.8–1.9` y `max-width/ch` controlado para evitar bloque plano; `Valores` mantiene coherencia tipográfica con las otras dos.
- **Hover elaborado sutil:** elevación + sombra (`var(--shadow-md/lg)`) + `border-color` en acento de cada card, consistente con `pres-values__card:hover` y `beneficio-card:hover`, sin invadir vecina (ya con `isolation`/`z-index`).
- **Valores como pills/chips:** transformar los 7 valores (Responsabilidad, Respeto, Honestidad, Justicia, Solidaridad, Paz, Tolerancia) de fila con `✦` a mini-pills/chips (o lista con chip por valor) con borde/sombra sutil, misma tipografía `var(--text-muted)` pero con tratamiento visual propio dentro de la card.
- **Copy intacto:** no se cambia texto de Misión/Visión ni orden Misión → Visión → Valores, solo contenedor/diseño; `section-banner` y anclas `#mision-vision` sin cambios.

## Capabilities

### New Capabilities
- (ninguna — se evoluciona capability existente)

### Modified Capabilities
- `mision-vision-cards`: Rediseño visual de las 3 cards Misión/Visión/Valores — layout 3-col, badges de ícono con paleta existente, acentos por card, jerarquía tipográfica, hover elaborado y Valores en pills/chips.

## Impact

- **Código afectado:** `portal/nosotros/index.html:134-155` (estructura cards, posible envoltura `__icon`/`__badge`/`__body`) y `portal/mision_vision/index.html:53-113`; CSS rector `portal/css/nosotros.css:414-491` (fuente de verdad) y espejo `portal/css/mision_vision.css:37-129` que debe quedar alineado; tokens reutilizados de `portal/css/styles.css:4-29` (`--primary`, `--primary-rgb`, `--gold`, `--gold-rgb`, `--border`, `--radius-lg`, `--shadow-*`). Sin nuevas dependencias ni rutas.
- **Compatibilidad:** solo visual; mantiene clases `.mision_vision`, `__contenido`, `__item` (extendidas con modificadores opcionales `--mision/--vision/--valores` o `data-variant`) y `h2/p/ul li` existentes. No rompe `#mision-vision` ni `section-banner`.
- **Riesgo:** acento por card puede verse inconsistente si no se ciñe a paleta — mitigado al limitar a variaciones de `--primary`/`--gold` ya usadas en header/hero/banner.
