## Context

Ver `proposal.md` — el fix previo (`mejorar-cards-mision-vision-valores`) ya llevó `.mision_vision__contenido` a `gap: 2.5rem`, `.mision_vision__item` a `position:relative; isolation:isolate; transition: transform, box-shadow, border-color` y `hover z-index:1 translateY(-5px)`, y tipografía a `h2 1.4rem var(--primary) / p var(--text-muted) line-height 1.8`. El componente vive duplicado en `portal/mision_vision/index.html:59,75,91` y `portal/nosotros/index.html:135,139,143`, con CSS rector `portal/css/nosotros.css:414-491` y espejo `portal/css/mision_vision.css:37-129`. Tokens disponibles en `portal/css/styles.css:4-29`: `--primary #c62828`, `--primary-dark #9e1a1a`, `--primary-light #e53935`, `--primary-rgb 198,40,40`, `--gold #d4a843`, `--gold-light #e8c76a`, `--gold-rgb 212,168,67`, `--bg-warm`, `--bg-card`, `--text`, `--text-muted`, `--border`, `--radius-lg 16px`, `--shadow-sm/md/lg`. Referentes visuales en el sitio: `pres-values__card` (4 pilares) y `beneficio-card` (6 beneficios) con hover elaborado y `pres-hero`/`section-banner` con degradados `--primary`/`--gold`.

## Goals / Non-Goals

**Goals:**
- Elevar Misión/Visión/Valores de fondo plano a 3 cards con identidad y badge grande, reutilizando solo tokens existentes, sin reintroducir solape.
- Igualar altura y pulir tipografía (`h2` más peso, `p` con `max-width`/`balance`, `Valores` en pills) manteniendo copy/orden/iconos.
- Mantener `nosotros.css` como fuente de verdad y espejar en `mision_vision.css` sin divergencia.

**Non-Goals:**
- No cambiar `section-banner`, anclas `#mision-vision`, rutas, ni contenido textual (Misión/Visión y 7 valores intactos).
- No introducir colores fuera de `styles.css:4-11`, no framework nuevo, no layout carrusel/acordeón, no tocar `styles.css` salvo uso de tokens existentes.
- No reescribir `portal/css/styles.css` tokens globales.

## Decisions

**D1: Fuente de verdad `nosotros.css:414`, espejo `mision_vision.css`; modificadores por card vía clase o `data-variant`.**
- Por qué: mantiene patrón del fix previo (una sola fuente evita drift); modificadores `.mision_vision__item--mision/--vision/--valores` (o `data-card="mision"`) permiten acento distinto sin duplicar estructura. HTML en ambos `index.html` puede añadir envoltura `__badge`/`__body` sin romper `__item` base.
- Alternativa descartada: editar solo `mision_vision.css` — dejaría `#mision-vision` en `nosotros` desalineada; editar `styles.css` global — innecesario.

**D2: Badge circular 56–64px con `linear-gradient(135deg, var(--primary), var(--primary-light))` o `var(--gold)` según card, ícono 24–28px centrado, `box-shadow: 0 8px 20px rgba(var(--primary-rgb),0.18)` en hover.**
- Por qué: reutiliza token y escala usada en `pres-values__icon 56px` y `beneficio-icon-wrap 72px`; 56px equilibra presencia sin romper `padding:2rem`. Gradiente `--primary→--primary-light` para Misión, `--gold→--gold-light` para Visión, combinación/borde para Valores da distinción sin color nuevo.
- Alternativa: ícono 40px inline junto a `h2` — mantiene problema de poca presencia; 72px+ — ocupa demasiado en mobile.

**D3: Acento por card vía `border-top: 3px solid var(--primary/var(--gold))` o `background` de badge diferenciado, no `border-left` ni fondo completo.**
- Por qué: `border-top` es sutil, no afecta `gap` horizontal, y es patrón usado en `beneficio-card::after height:3px`; permite Misión rojo, Visión dorado, Valores rojo+dorado o `rgba(var(--primary-rgb),0.15)` sin inventar paleta. Alternativa `border-left` rompería alineación vertical en grid.
- Alternativa: fondo completo por card en tono claro — mayor riesgo de contraste con `var(--text-muted)`.

**D4: Tipografía `h2 clamp(1.35rem, 2vw, 1.55rem) 700–800 var(--primary)`, `p line-height 1.85 max-width 65ch`, `Valores` pills `flex wrap gap 0.5rem`.**
- Por qué: `1.4rem` actual es correcto pero sube levemente para jerarquía; `65ch` evita bloque plano infinito en 3-col; `line-height 1.85` mejora lectura sin cambiar copy. `p` ya usa `var(--text-muted)` y `line-height 1.8` — ajuste incremental.
- Alternativa: `h2 2rem` — desproporcionado en 3-col; `ch` menor — deja mucho vacío.

**D5: Hover `translateY(-6px) + box-shadow var(--shadow-md/lg) + border-color acento` con `transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`, badge escala `scale(1.05)` y `isolation/z-index:1` ya existente.**
- Por qué: consistente con `pres-values__card:hover translateY(-8px)` y `beneficio-card:hover translateY(-14px) scale(1.03)` pero más sutil (-6px) para no reintroducir solape; badge con leve escala da dinamismo sin mover layout. Respeta `prefers-reduced-motion` previo.
- Alternativa: `scale(1.02)` en card — reintroduce footprint y solape.

**D6: Valores pills `display:flex; flex-wrap:wrap; gap:0.5rem` con `.valor-pill { border:1px solid var(--border) / rgba(var(--primary-rgb),0.12), border-radius:var(--radius-pill), padding:0.45rem 0.85rem, font-size:0.85rem, background:rgba(var(--primary-rgb),0.05) o #fff, box-shadow:var(--shadow-sm) }`**
- Por qué: `flex wrap` maneja 7 ítems en 3-col y en 1-col mobile sin `grid auto-fill` huérfano; `pill` reutiliza `--radius-pill` y `--border` del sistema, tono `rgba(var(--primary-rgb),0.06)` ya usado en `beneficios-spotlight`. Coherente con otras cards pero distintivo.
- Alternativa: mantener `✦` grid `repeat(auto-fill, minmax(150px,1fr))` — ya mejorado pero sigue horizontal con viñeta pequeña; pills dan identidad solicitada.

## Risks / Trade-offs

- [Badge 56px + border-top reduce altura útil para `p` en 3-col] → Mitigación: `padding:2rem` se mantiene, badge `margin:0 auto 1rem` como `pres-values__icon`; verificar en 1280px que `p` no queda con <3 líneas.
- [Acento por card con 3 colores puede verse incoherente] → Mitigación: limitar a 2 tonos (`--primary` y `--gold`) mas variación `rgba`, no 3 colores distintos saturados; validar lado a lado en `portal/nosotros/#mision-vision`.
- [Pills `flex wrap` deja última fila con 1 pill sola desalineada] → Mitigación: `justify-content:flex-start` (o `center` si se prefiere) y `gap` consistente; no forzar `space-between`.
- [Altura igualada en grid puede dejar Valores más alta por 7 pills] → Mitigación: `align-items: stretch` por defecto en grid ya iguala altura; pills envuelven y card crece, aceptable; alternativa `align-items:start` rompería igualdad.
- [Divergencia `mision_vision.css` reaparece] → Mitigación: tras fix, `grep -rn "mision_vision__item" portal/css --include="*.css"` debe mostrar reglas espejo; documentado en tasks.

## Migration Plan

1. Actualizar `portal/css/nosotros.css:414-491` — badge (`__badge`/`__icon`), modificadores `--mision/--vision/--valores` con acento `border-top`/badge, tipografía `h2`/`p` refinada, hover `-6px` + sombra/badge scale, pills para `Valores`, mantener `gap:2.5rem` y `prefers-reduced-motion`.
2. Espejar mismos cambios en `portal/css/mision_vision.css:37-129` (mismo gap, item, badge, acentos, tipografía, hover, pills).
3. Actualizar HTML `portal/nosotros/index.html:135,139,143` y `portal/mision_vision/index.html:59,75,91` — añadir envoltura `div.mision_vision__badge` con `i` dentro y `div.mision_vision__body` si se requiere para badge arriba, y para Valores envolver `ul li` con clase pill (o `span` dentro de `li`); añadir modificador clase por card.
4. QA visual `portal/nosotros/#mision-vision` y `portal/mision_vision/` en 1280px/768px/375px, hover cada card, pills envuelven, `prefers-reduced-motion`, y `grep` de consistencia.
5. `openspec validate --changes --strict` 0 errores.

## Open Questions

- ¿Badge arriba centrado o alineado a la izquierda? Se deja a implementación (centrado es default de `pres-values`, izquierda da más editorial); ambos válidos si se usa mismo en las 3 cards.
- ¿Acento exacto por card (Misión rojo, Visión dorado, Valores combinado) o rotación distinta? Se deja a implementación dentro de paleta `--primary`/`--gold` sin color nuevo.
