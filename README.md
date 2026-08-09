# IESTP Paiján — Portal Institucional

Sitio web público del **Instituto de Educación Superior Tecnológico Público Paiján** (Paiján, La Libertad, Perú): portada con oferta académica, admisión, programas, transparencia, servicios, galería y noticias institucionales.

## Stack

- **Frontend:** HTML, CSS y JavaScript vanilla. Sin frameworks, sin build, sin dependencias de runtime.
- **Tipografía:** Montserrat vía Google Fonts (cargada en cada página).
- **Iconos:** Font Awesome localizado en `portal/fontawesome/` (sin CDN).
- **Imágenes:** AVIF/WebP preferidos con respaldo JPEG/SVG (optimizadas; ver `portal/imagenes/`).
- **SEO:** `sitemap.xml`, `robots.txt` y `canonical` ya presentes en la raíz.

No hay servidor propio: el sitio es estático y se publica copiado a cualquier hosting (Apache, Nginx, Netlify, GitHub Pages, etc.).

## Estructura

```
.
├── index.html                 # Portada (hero, beneficios, programas, noticias, contacto)
├── robots.txt
├── sitemap.xml
└── portal/
    ├── admision/              # Proceso de admisión
    ├── acc/ pagro/ enfermeria_tecnica/   # Páginas de los 3 programas
    ├── nosotros/ presentacion/ resena_historica/ mision_vision/ organigrama/ plana_jerarquica/ planadocente/
    ├── transparencia/ documentos_gestion/ estadisticas/ donaciones_inversiones/ licenciamiento/ tupa/
    ├── servicios/ bienestar_empleabilidad/ bolsa_trabajo/ consultorio_psicologico/ servicio_topico/
    ├── galeria/ noticias/ calendario_academico/ becas/ documentos/ matriculas/ manual_campus/ programas/ enlaces_institucionales/
    ├── css/                    # styles.css (tokens) + un CSS por sección (admision.css, becas.css, ...)
    ├── js/
    │   ├── include.js          # Inyecta header/footer/nav en todas las páginas (data-include="shell")
    │   ├── script.js           # Interacciones comunes + feed de noticias de la portada
    │   └── <seccion>.js        # Lógica/fechas por página (becas.js, galeria.js, noticias.js, ...)
    ├── fontawesome/            # Iconos locales
    └── imagenes/               # AVIF/WebP + respaldo (noticias/, galeria_eventos/, carreras/, ...)
```

## Run (desarrollo local)

El sitio **no funciona abierto con `file://`**: los enlaces relativos y el prefetch de PDF (`becas.js` hace `fetch(..., { method: "HEAD" })`) exigen servidores web sobre HTTP. Por eso, desde la **raíz del repositorio**:

```bash
python3 -m http.server 8000
```

y abrir <http://localhost:8000/>.

**Puntos clave:**
- Las rutas del sitio asumen que se sirve la carpeta raíz del repo (así `portal/...` resuelve desde `index.html` y `../` desde cada subpágina). No sirvas solo la carpeta `portal/` desde la raíz o se rompen los includes.
- Portada: `http://localhost:8000/` · Subpáginas: `http://localhost:8000/portal/<seccion>/`.

No hay requisitos de entorno: cualquier servidor HTTP estático funciona igual (Python >= 3, `npx serve`, Nginx...).

## Publicar contenido nuevo

No hay CMS ni base de datos: el contenido se edita directamente en los JS. Convenciones actuales:

| Qué | Dónde |
|---|---|
| Noticias de la portada | array `noticias` en `portal/js/script.js` (`titulo`, `fecha` `dd/mm/aaaa`, `contenido`, `imagen[0..1]`, `categoria`) |
| Noticias de `portal/noticias/` | array `noticias` en `portal/js/noticias.js` (formato propio, con `.close`/`.prev`/`.next` en el modal) |
| Fotos de eventos | `portal/js/galeria.js`: `galeriaData` por año → evento → `imagenes[]` (carpetas `portal/imagenes/galeria_eventos/<año>/...`) |
| Listas de becados | `portal/js/becas.js` (chequea el PDF con HEAD; si no existe muestra mensaje del empty state que ya implementado) |
| Documentos y calendario | `portal/js/documentos.js`, `portal/js/calendario.js` |

Imágenes nuevas: sube primero AVIF/WebP con respaldo, en la carpeta correspondiente de `portal/imagenes/`.

## Diseño (tokens)

La base visual vive en `portal/css/styles.css` `:root`:

| Token | Valor | Uso |
|---|---|---|
| `--primary` / `--gold` | `#c62828` / `#d4a843` | Granate y dorado institucionales |
| `--radius-xs..xl`, `--radius-pill` | 4–24px / 999px | Radios por rol (botones, cards, contenedores, pills) |
| `--shadow-sm/md/lg` | 3 niveles | Elevación |
| `--bg-warm`, `--text`, `--text-muted`, `--border` | Fondo y texto | Neutros |

Reglas de oro del CSS actual: no inventes radios ni sombras nuevas (usa `var(--radius-*)` y `var(--shadow-*)`), colores solo de la paleta institucional, `:focus-visible` global ya existe (no lo borres en override) y `prefers-reduced-motion` está soportado en `styles.css`.

## Mantenimiento conocido

- **Nav/header/footer:** se definen una sola vez en `portal/js/include.js` (templates `headerHTML`/`footerHTML`). Cada página declara `<div data-include="shell" data-root="..." data-home="..." data-page="...">`.
- **CSS por página:** cada sección principal tiene su hoja (`admision.css`, `becas.css`...) que complementa a `styles.css`. No repetir definiciones genéricas en esas hojas.
- **Accesibilidad:** los modales (noticias/galeía/becas) ya tienen `role="dialog"`, focus trap, `Escape` y restauración de foco. Mantener ese patrón al añadir modales nuevos.
- **News modal de portada:** en `index.html`, con IDs `news-modal`, `modal-prev`/`modal-next`, `modal-close`.

## Despliegue

Subir el contenido del repo (sin `.git`) a la raíz del hosting. No se requiere build ni procesamiento previo. El dominio canónico es `https://www.iestpaijan.edu.pe/` (declarado en cada `link rel="canonical"`).