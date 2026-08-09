# STRUCTURE — Mapa del Repositorio

Mapa técnico del repositorio del portal IESTP Paiján para quien lo mantiene o
desarrolla. Todas las rutas verificadas contra el árbol real del proyecto.

```
iestpaijan/
├── index.html                  Portada (hero, beneficios, programas, contacto)
├── robots.txt                  Índices permitidos para buscadores
├── sitemap.xml                 URLs públicas del sitio
└── portal/                     Contiene todo el sitio (estático)
    ├── css/                    Una hoja por sección + styles.css global
    ├── js/                     Un script por sección; los textos/imágenes se declaran ahí
    ├── fontawesome/            Iconos locales
    ├── imagenes/               Imágenes del sitio (AVIF/WebP + fallback)
    ├── documentos/             PDFs oficiales por tema
    ├── <seccion>/index.html    Página por sección (31 secciones)
    └── <programa>/index.html   Páginas de los 3 programas (acc, enfermeria_tecnica, pagro)
```

## Dónde se edita cada contenido

| Contenido | Archivo / ruta |
|---|---|
| Portada (hero, beneficios) | `index.html` |
| Presentación, misión, valores | `portal/presentacion/`, `portal/mision_vision/` |
| Reseña histórica | `portal/resena_historica/index.html` |
| Organigrama / planas | `portal/organigrama/`, `portal/plana_jerarquica/`, `portal/planadocente/` |
| Noticias y eventos | `portal/noticias/` + `portal/js/noticias.js` (las noticias se declaran en el JS) |
| Galería | `portal/galeria/` + `portal/js/galeria.js` (eventos por año, rutas a imágenes) |
| Programas (ACC, Enfermería, PAGRO) | `portal/acc/`, `portal/enfermeria_tecnica/`, `portal/pagro/` |
| Admisión y matrícula | `portal/admision/`, `portal/matriculas/`, `portal/calendario_academico/` |
| Transparencia | `portal/transparencia/`, `portal/tupa/`, `portal/documentos_gestion/`, `portal/estadisticas/`, `portal/donaciones_inversiones/`, `portal/licenciamiento/` |
| Servicios | `portal/servicios/`, `portal/bienestar_empleabilidad/`, `portal/bolsa_trabajo/`, `portal/consultorio_psicologico/`, `portal/servicio_topico/` |
| Encabezado/pie (navegación, redes, contacto) | `portal/js/include.js` (plantillas `headerHTML` / `footerHTML`) |

## Assets

- Imágenes en 3 formatos siempre: **AVIF y WebP** + fallback **JPG/PNG** (mismo nombre, distinta extensión), servidas con `<picture>`.
- Logotipos en `portal/imagenes/` (`logo-transp.*`, `logo-white-*`, `logo-black-*`, `lo_negro.*`).
- Carreras con portadas propias en `portal/imagenes/carreras/`.
- Galería por año y evento: `portal/imagenes/galeria_eventos/<año>/<evento>/`.
- PDFs oficiales en `portal/documentos/` agrupados por tema (admisión, calendario, becas, mallas, gestión, campus).
- Fuentes: Montserrat (Google Fonts) y Font Awesome local en `portal/fontawesome/`.