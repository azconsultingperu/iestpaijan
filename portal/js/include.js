(function () {
  'use strict';

  /* ── Config from data attributes ── */
  // data-root="" for root index page, data-root="../" for portal/* pages
  //   Root:  links use "portal/xxx/", images use "portal/imagenes/..."
  //   Portal: links use "../xxx/", images use "../imagenes/..."
  // data-home: target for Brand + Inicio links
  //   Root:  "#" or "#inicio"
  //   Portal: "../../" (goes up to site root)

  /* ── Templates ── */
  function headerHTML(root, home) {
    var p = root;
    var i = root + 'imagenes/';
    function socialIcon(kind) {
      var icons = {
        facebook: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
        instagram: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>',
        youtube: '<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
        tiktok: '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.66-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>'
      };
      return '<svg viewBox="0 0 24 24" fill="currentColor">' + (icons[kind] || '') + '</svg>';
    }

    function navIcon(kind) {
      var svg = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" class="nav__icon">';
      var paths = {
        inicio: '<path d="M2.5 9.5L10 3l7.5 6.5"/><path d="M4 8v8a1 1 0 001 1h3v-4h4v4h3a1 1 0 001-1V8"/>',
        nosotros: '<path d="M10 10a3 3 0 100-6 3 3 0 000 6z"/><path d="M4 17v-1a4 4 0 014-4h4a4 4 0 014 4v1"/>',
        admision: '<path d="M14 2H6a2 2 0 00-2 2v16l6-2 6 2V4a2 2 0 00-2-2z"/>',
        programas: '<path d="M4 6h16M4 12h16M4 18h12"/>',
        acc: '<path d="M4 4h12v12H4z"/><path d="M16 8l4 4-4 4"/><path d="M8 16v4h4"/>',
        pagro: '<path d="M10 2v12M6 8a4 4 0 008 0"/><path d="M2 18h16"/>',
        enfermeria: '<path d="M12 4v14M5 11h14"/>',
        transparencia: '<path d="M10 4a6 6 0 00-6 6c0 2.5 1.5 4.7 3.7 5.8L10 17l2.3-1.2A6 6 0 0016 10a6 6 0 00-6-6z"/><path d="M10 8v2"/><circle cx="10" cy="12.5" r=".5"/>',
        documentos: '<path d="M4 4h8l4 4v12H4z"/><path d="M12 4v4h4"/>',
        estadisticas: '<path d="M2 18h16M5 14l3-5 4 3 4-6"/>',
        donaciones: '<path d="M10 18s-6-4-6-7a3.5 3.5 0 017 0 3.5 3.5 0 017 0c0 3-6 7-6 7z"/>',
        licenciamiento: '<path d="M7 9l3-3 3 3"/><path d="M10 6v8"/><rect x="4" y="12" width="12" height="6" rx="1"/>',
        tupa: '<path d="M4 4h8l4 4v12H4z"/><path d="M12 4v4h4"/><path d="M7 12h6M7 15h4"/>',
        servicios: '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.8-3.8a1 1 0 000-1.4L19.7 2.5a1 1 0 00-1.4 0l-3.8 3.8z"/><path d="M9.5 14.5l-7 7M14 2l4 4"/>',
        biblioteca: '<path d="M2 4h4a3 3 0 013 3v13a2 2 0 00-2-2H2z"/><path d="M18 4h-4a3 3 0 00-3 3v13a2 2 0 012-2h5z"/>',
        campus: '<path d="M10 2v16M2 6h16"/><rect x="2" y="6" width="16" height="12" rx="2"/><path d="M6 18v4h8v-4"/>',
        servicios_inst: '<path d="M2 12l10-9 10 9"/><path d="M4 10v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><path d="M9 21v-6h6v6"/>',
        bienestar: '<path d="M10 18s-6-4-6-7a3.5 3.5 0 017 0 3.5 3.5 0 017 0c0 3-6 7-6 7z"/>',
        psicologico: '<path d="M17 13a5 5 0 01-10 0c0-3 2-5 5-5s5 2 5 5z"/><path d="M10 11v2M10 15v.01"/>',
        bolsa: '<path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/><rect x="2" y="7" width="16" height="13" rx="2"/><path d="M2 11h16M8 14h4"/>',
        topico: '<path d="M12 4v14M5 11h14"/><circle cx="12" cy="11" r="7"/>',
        otros: '<circle cx="5" cy="10" r="1"/><circle cx="10" cy="10" r="1"/><circle cx="15" cy="10" r="1"/>',
        enlaces: '<path d="M9 15l6-6"/><path d="M11 6l.5-.5a3.5 3.5 0 015 5L15 12"/><path d="M9 12l-1.5 1.5a3.5 3.5 0 015 5L11 18"/>',
        manual: '<path d="M4 4h8l4 4v12H4z"/><path d="M12 4v4h4"/><path d="M8 11h4M8 14h4"/>',
        galeria: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
        contacto: '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>'
      };
      return svg + (paths[kind] || '') + '</svg>';
    }

    return [
      '<div id="page-loader" class="page-loader"><div class="page-loader__ring"><img src="' + i + 'logo-transp.png" alt="IESTP PAIJÁN" class="page-loader__logo"></div></div>',
      '<header id="site-header" class="header">',
      '<div class="container header__inner">',
      '<a class="brand" href="' + home + '">',
      '<div class="brand__top">',
      '<img src="' + i + 'logo-transp.png" alt="IESTP Paiján" class="brand__img">',
      '<div class="brand__text">',
      '<span class="brand__name">IESTP Paiján</span>',
      '<span class="brand__registration">R.M. N° 498-87-ED</span>',
      '</div>',
      '</div>',
      '<span class="brand__slogan">¡Crea, Innova e Inspira!</span>',
      '</a>',
      '<button id="menu-toggle" class="hamburger" aria-label="Abrir menú" aria-expanded="false">',
      '<span class="hamburger__line"></span>',
      '<span class="hamburger__line"></span>',
      '<span class="hamburger__line"></span>',
      '</button>',
      '<div id="main-nav" class="nav">',
      '<div class="nav__header">',
      '<div class="nav__header-brand">',
      '<img src="' + i + 'logo-transp.png" alt="IESTP Paiján">',
      '<span>IESTP Paiján</span>',
      '</div>',
      '<button class="nav__close" aria-label="Cerrar menú"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>',
      '</div>',
      '<ul class="nav__list">',
      '<li class="nav__item"><a href="' + home + '" class="nav__link" data-page="inicio">' + navIcon('inicio') + 'Inicio</a></li>',

      '<li class="nav__item"><a href="' + p + 'nosotros/" class="nav__link" data-page="nosotros">' + navIcon('nosotros') + 'Nosotros</a></li>',

      '<li class="nav__item"><a href="' + p + 'admision/" class="nav__link" data-page="admision">' + navIcon('admision') + 'Admisión</a></li>',

      '<!-- Programas -->',
      '<li class="nav__item has-submenu">',
      '<a href="#programas" class="nav__link">' + navIcon('programas') + 'Programas</a>',
      '<div class="submenu"><ul>',
      '<li><a href="' + p + 'acc/" data-page="acc">' + navIcon('acc') + 'Administración de Centros de Cómputo</a></li>',
      '<li><a href="' + p + 'pagro/" data-page="pagro">' + navIcon('pagro') + 'Producción Agropecuaria</a></li>',
      '<li><a href="' + p + 'enfermeria_tecnica/" data-page="enfermeria">' + navIcon('enfermeria') + 'Enfermería Técnica</a></li>',
      '</ul></div>',
      '</li>',

      '<!-- Transparencia -->',
      '<li class="nav__item has-submenu">',
      '<a href="' + p + 'transparencia/" class="nav__link" data-page="transparencia">' + navIcon('transparencia') + 'Transparencia</a>',
      '<div class="submenu"><ul>',
      '<li><a href="' + p + 'transparencia/" data-page="transparencia">' + navIcon('transparencia') + 'Transparencia</a></li>',
      '<li><a href="' + p + 'transparencia/#documentos" data-page="transparencia">' + navIcon('documentos') + 'Documentos de Gestión</a></li>',
      '<li><a href="' + p + 'transparencia/#estadisticas" data-page="transparencia">' + navIcon('estadisticas') + 'Estadísticas</a></li>',
      '<li><a href="' + p + 'transparencia/#donaciones" data-page="transparencia">' + navIcon('donaciones') + 'Donaciones e Inversiones</a></li>',
      '<li><a href="' + p + 'transparencia/#licenciamiento" data-page="transparencia">' + navIcon('licenciamiento') + 'Licenciamiento</a></li>',
      '<li><a href="' + p + 'transparencia/#tupa" data-page="transparencia">' + navIcon('tupa') + 'TUPA</a></li>',
      '</ul></div>',
      '</li>',

      '<!-- Servicios -->',
      '<li class="nav__item has-submenu">',
      '<a href="' + p + 'servicios/" class="nav__link" data-page="servicios">' + navIcon('servicios') + 'Servicios</a>',
      '<div class="submenu"><ul>',
      '<li><a href="https://www.alphaeditorialcloud.com/library" target="_blank">' + navIcon('biblioteca') + 'Biblioteca Virtual</a></li>',
      '<li><a href="https://campusvirtual.iestpaijan.edu.pe/login/index.php" target="_blank">' + navIcon('campus') + 'Campus virtual</a></li>',
      '<li><a href="' + p + 'servicios/" data-page="servicios">' + navIcon('servicios_inst') + 'Servicios Institucionales</a></li>',
      '<li><a href="' + p + 'servicios/#bienestar" data-page="servicios">' + navIcon('bienestar') + 'Bienestar y Empleabilidad</a></li>',
      '<li><a href="' + p + 'servicios/#psicologico" data-page="servicios">' + navIcon('psicologico') + 'Consultorio Psicológico</a></li>',
      '<li><a href="' + p + 'servicios/#bolsa" data-page="servicios">' + navIcon('bolsa') + 'Bolsa de Trabajo</a></li>',
      '<li><a href="' + p + 'servicios/#topico" data-page="servicios">' + navIcon('topico') + 'Servicio Tópico</a></li>',
      '</ul></div>',
      '</li>',

      '<!-- Otros -->',
      '<li class="nav__item has-submenu">',
      '<a href="#" class="nav__link">' + navIcon('otros') + 'Otros</a>',
      '<div class="submenu"><ul>',
      '<li><a href="' + p + 'enlaces_institucionales/" data-page="enlaces">' + navIcon('enlaces') + 'Enlaces Institucionales</a></li>',
      '<li><a href="' + p + 'manual_campus/" data-page="manual">' + navIcon('manual') + 'Manual de campus virtual</a></li>',
      '<li><a href="' + p + 'galeria/" data-page="galeria">' + navIcon('galeria') + 'Galería</a></li>',
      '<li><a href="' + home.replace(/#$/, '') + '#contacto">' + navIcon('contacto') + 'Contacto</a></li>',
      '</ul></div>',
      '</li>',
      '</ul>',
      '<div class="nav__footer">',
      '<div class="nav__footer-label">Síguenos</div>',
      '<div class="nav__footer-social">',
      '<a href="https://www.facebook.com/iestp.paijan.9" aria-label="Facebook" target="_blank" rel="noopener noreferrer">' + socialIcon('facebook') + '</a>',
      '<a href="https://www.instagram.com/iestpaijan/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">' + socialIcon('instagram') + '</a>',
      '<a href="https://www.youtube.com/@iestppaijan8712" aria-label="YouTube" target="_blank" rel="noopener noreferrer">' + socialIcon('youtube') + '</a>',
      '<a href="https://www.tiktok.com/@iestpaijan" aria-label="TikTok" target="_blank" rel="noopener noreferrer">' + socialIcon('tiktok') + '</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '</header>',
      '<div class="nav-overlay" id="nav-overlay"></div>'
    ].join('\n');
  }

  function footerHTML(root) {
    var p = root;
    var i = root + 'imagenes/';
    return [
      '<footer class="footer">',
      '<div class="container">',
      '<div class="footer__inner">',

      '<div class="footer__col footer__brand">',
      '<div class="footer__brand-top">',
      '<img src="' + i + 'logo-transp.png" alt="IESTP PAIJÁN" class="footer__logo">',
      '<div class="footer__brand-text">',
      '<span class="footer__brand-name">IESTP Paiján</span>',
      '<span class="footer__brand-registration">R.M. N° 498-87-ED</span>',
      '</div>',
      '</div>',
      '<p class="footer__desc">¡Crea, Innova e Inspira!</p>',
      '<div class="footer__contact">',
      '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> 919490297</span>',
      '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> admision@iestpaijan.edu.pe</span>',
      '</div>',
      '</div>',

      '<div class="footer__col">',
      '<h4 class="footer__title">Programas</h4>',
      '<ul class="footer__list">',
      '<li><a href="' + p + 'acc/">Administración de Centros de Cómputo</a></li>',
      '<li><a href="' + p + 'enfermeria_tecnica/">Enfermería Técnica</a></li>',
      '<li><a href="' + p + 'pagro/">Producción Agropecuaria</a></li>',
      '</ul>',
      '</div>',

      '<div class="footer__col">',
      '<h4 class="footer__title">Institución</h4>',
      '<ul class="footer__list">',
      '<li><a href="' + p + 'nosotros/">Nosotros</a></li>',
      '<li><a href="' + p + 'admision/">Admisión</a></li>',
      '<li><a href="' + p + 'transparencia/">Transparencia</a></li>',
      '<li><a href="' + p + 'servicios/">Servicios</a></li>',
      '</ul>',
      '</div>',

      '<div class="footer__col">',
      '<h4 class="footer__title">Enlaces</h4>',
      '<ul class="footer__list">',
      '<li><a href="https://registra.minedu.gob.pe/#!/" target="_blank">Registra</a></li>',
      '<li><a href="https://titula.minedu.gob.pe/" target="_blank">Titula</a></li>',
      '<li><a href="https://conecta.minedu.gob.pe/" target="_blank">Conecta</a></li>',
      '<li><a href="https://avanza.minedu.gob.pe/" target="_blank">Avanza</a></li>',
      '</ul>',
      '</div>',

      '</div>',
      '<div class="footer__bottom">',
      '<div class="footer__social">',
      '<a href="https://www.facebook.com/iestp.paijan.9" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>',
      '<a href="https://www.instagram.com/iestpaijan/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>',
      '<a href="https://www.youtube.com/@iestppaijan8712" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>',
      '<a href="https://www.tiktok.com/@iestppaijan" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>',
      '<a href="https://wa.me/51919490297" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>',
      '</div>',
      '<p class="footer__copyright">&copy; <span id="year"></span> <strong>IESTP PAIJÁN</strong> — Todos los derechos reservados</p>',
      '</div>',
      '</div>',
      '</footer>',

      '<button id="to-top" class="to-top" aria-label="Volver arriba">&#8593;</button>',
      '<a href="https://wa.me/51919490297" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>'
    ].join('\n');
  }

  /* ── Inject header / footer ── */
  function injectShell() {
    var rootEl = document.querySelector('[data-include="shell"]');
    if (!rootEl) return;
    var root = rootEl.getAttribute('data-root') || '';
    var home = rootEl.getAttribute('data-home') || root;
    var page = rootEl.getAttribute('data-page') || '';

    rootEl.insertAdjacentHTML('beforebegin', headerHTML(root, home));
    rootEl.remove();
    document.body.insertAdjacentHTML('beforeend', footerHTML(root));

    /* ── Highlight active page ── */
    if (page) {
      var sel = 'a[data-page="' + page + '"]';
      var links = document.querySelectorAll(sel);
      for (var i = 0; i < links.length; i++) {
        links[i].classList.add('is-active');
      }
    }
  }

  /* ── To-top button ── */
  function initToTop() {
    var btn = document.getElementById('to-top');
    if (!btn) return;
    function toggle() {
      btn.classList.toggle('is-visible', (window.pageYOffset || document.documentElement.scrollTop) > 300);
    }
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
    btn.onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  }

  /* ── Page loader (oculto en visitas repetidas) ── */
  function initPageLoader() {
    var l = document.getElementById('page-loader');
    if (!l) return;
    if (sessionStorage.getItem('loaded')) {
      l.classList.add('is-hidden');
    } else {
      sessionStorage.setItem('loaded', '1');
      window.addEventListener('load', function () {
        setTimeout(function () { l.classList.add('is-hidden'); }, 200);
      });
    }
  }

  /* ── Year in footer ── */
  function initYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ── Init ── */
  function run() {
    injectShell();
    initToTop();
    initPageLoader();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
