## 1. Auditoría e inventario (Fase 1)

- [x] 1.1 Auditar todos los banners existentes y mapear cada página a variante (hero, split, institutional, historical, academic, visual) y verificar `grep -rn "section-banner\|banner--" portal --include="*.html" | wc -l` coincide con inventario 33 instancias documentado

## 2. Sistema base (Fase 2)

- [x] 2.1 Crear estructura base `.banner` con `__media/__overlay/__content/__eyebrow/__title/__subtitle/__decoration` en `portal/css/styles.css` (o `banner-system.css` importado) con overlay degradado, tipografía `clamp()`, decoración sutil y animación 250-600ms con `prefers-reduced-motion`, y verificar `grep -n "\.banner" portal/css/styles.css | wc -l` ≥ 10 y alias `.section-banner` presente para compatibilidad
- [x] 2.2 Definir reglas para imágenes (`image-set` AVIF/WEBP) y overlay `linear-gradient` con foto reconocible y verificar `grep -n "image-set" portal/css/styles.css | head` muestra `frontis`/`hero` sin `rgba` plano 0.85

## 3. Variantes (Fase 3)

- [x] 3.1 Implementar 6 variantes `banner--hero`, `banner--split`, `banner--institutional`, `banner--historical`, `banner--academic`, `banner--visual` con solo diferencias (split `grid-template-columns:1fr 1fr` y apilado móvil, institutional sin foto con patrones, etc.) y verificar `grep -rn "banner--" portal/css --include="*.css" | wc -l` ≥ 6
- [x] 3.2 Implementar responsive sin alturas rígidas (`min-height` flexible, `object-fit:cover`, `clamp()` en títulos) y verificar en viewport 375px, 768px y 1200px que no hay overflow ni títulos de >3 líneas cortados

## 4. Piloto (Fase 4)

- [x] 4.1 Migrar página piloto `portal/nosotros` (hero + institutional para organigrama) y `portal/acc` (academic) a nueva estructura `banner banner--*` con `data-variant`/`data-subtitle` y verificar `grep -n "banner--" portal/nosotros/index.html | wc -l` ≥ 2 y render correcto en desktop/móvil

## 5. Migración progresiva (Fase 5-6)

- [x] 5.1 Migrar las 30 instancias restantes (`portal/admision` 3 banners, `portal/programas`, `portal/transparencia`, `portal/galeria`, etc.) a estructura común con `data-subtitle` opcional y verificar `grep -rn "class=\"banner" portal --include="*.html" | wc -l` ≥ 33
- [x] 5.2 Verificar accesibilidad y animaciones: contraste AA, semántica `h1`/`h2`, `alt` en `__media`, navegación por teclado y `prefers-reduced-motion` sin animación, y verificar `grep -rn "prefers-reduced-motion" portal/css --include="*.css" | wc -l` ≥ 1

## 6. Limpieza y validación final (Fase 7-8)

- [x] 6.1 Eliminar estilos duplicados de `.section-banner` en `portal/css/*.css` (12 archivos) manteniendo solo base en `styles.css` y verificar `grep -rn "section-banner" portal/css --include="*.css" | grep -v "styles.css" | wc -l` == 0
- [x] 6.2 Ejecutar `openspec validate --change sistema-banners --strict` y verificar 0 errores, y revisión visual final de las 6 variantes en desktop/móvil sin páginas rotas ni URLs cambiadas
